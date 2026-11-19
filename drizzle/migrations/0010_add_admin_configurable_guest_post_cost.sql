CREATE TABLE public.blog_settings (
  id boolean PRIMARY KEY DEFAULT true CHECK (id = true),
  guest_post_cost integer NOT NULL DEFAULT 400 CHECK (guest_post_cost BETWEEN 0 AND 100000),
  updated_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_by uuid
);
GRANT SELECT ON public.blog_settings TO authenticated;
GRANT ALL ON public.blog_settings TO service_role;
ALTER TABLE public.blog_settings ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Signed in users read blog settings"
ON public.blog_settings
FOR SELECT
TO authenticated
USING (true);
CREATE POLICY "Admins manage blog settings"
ON public.blog_settings
FOR ALL
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (public.has_role(auth.uid(), 'admin'::public.app_role));
INSERT INTO public.blog_settings (id, guest_post_cost) VALUES (true, 400);

CREATE OR REPLACE FUNCTION public.get_guest_post_cost()
RETURNS integer
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT COALESCE((SELECT guest_post_cost FROM public.blog_settings WHERE id = true), 400)
$$;
GRANT EXECUTE ON FUNCTION public.get_guest_post_cost() TO authenticated;

CREATE OR REPLACE FUNCTION public.set_guest_post_cost(_cost integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NOT public.has_role(auth.uid(), 'admin'::public.app_role) THEN
    RAISE EXCEPTION 'Administrator access required.';
  END IF;
  IF _cost < 0 OR _cost > 100000 THEN
    RAISE EXCEPTION 'Guest post cost must be between 0 and 100000 credits.';
  END IF;
  INSERT INTO public.blog_settings (id, guest_post_cost, updated_at, updated_by)
  VALUES (true, _cost, now(), auth.uid())
  ON CONFLICT (id) DO UPDATE SET
    guest_post_cost = EXCLUDED.guest_post_cost,
    updated_at = EXCLUDED.updated_at,
    updated_by = EXCLUDED.updated_by;
  RETURN _cost;
END;
$$;
GRANT EXECUTE ON FUNCTION public.set_guest_post_cost(integer) TO authenticated;

CREATE OR REPLACE FUNCTION public.submit_guest_post_v2(_title text, _excerpt text, _content text, _category_id uuid, _subcategory_id uuid, _tags text[], _faqs jsonb, _image text, _author_name text, _seo_title text DEFAULT ''::text, _seo_description text DEFAULT ''::text)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _slug text;
  _words integer;
  _post_cost integer := public.get_guest_post_cost();
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'Sign in to submit an article.'; END IF;
  _words := array_length(regexp_split_to_array(trim(_content), '\s+'), 1);
  IF _words < 800 THEN RAISE EXCEPTION 'Article must have at least 800 words (currently %).', _words; END IF;
  IF _content ~* '(https?://|www\.|<a[\s>]|\[[^\]]*\]\()' OR _excerpt ~* '(https?://|www\.)' OR _title ~* '(https?://|www\.)' THEN
    RAISE EXCEPTION 'External links are not allowed in guest articles.';
  END IF;
  IF length(trim(_seo_title)) < 10 OR length(trim(_seo_title)) > 180 THEN RAISE EXCEPTION 'Meta title must be between 10 and 180 characters.'; END IF;
  IF length(trim(_seo_description)) < 50 OR length(trim(_seo_description)) > 320 THEN RAISE EXCEPTION 'Meta description must be between 50 and 320 characters.'; END IF;
  IF _category_id IS NULL OR NOT EXISTS (SELECT 1 FROM public.blog_categories WHERE id = _category_id AND parent_id IS NULL AND is_active = true) THEN RAISE EXCEPTION 'Choose a valid primary category.'; END IF;
  IF _subcategory_id IS NULL OR NOT EXISTS (SELECT 1 FROM public.blog_categories WHERE id = _subcategory_id AND parent_id = _category_id AND is_active = true) THEN RAISE EXCEPTION 'Choose a valid subcategory.'; END IF;
  IF jsonb_typeof(_faqs) <> 'array' OR jsonb_array_length(_faqs) <> 5 OR EXISTS (SELECT 1 FROM jsonb_array_elements(_faqs) item WHERE length(trim(COALESCE(item->>'question', ''))) < 5 OR length(trim(COALESCE(item->>'answer', ''))) < 5) THEN RAISE EXCEPTION 'Add exactly 5 complete FAQs.'; END IF;
  IF cardinality(COALESCE(_tags, '{}'::text[])) < 1 OR cardinality(COALESCE(_tags, '{}'::text[])) > 10 THEN RAISE EXCEPTION 'Add between 1 and 10 tags.'; END IF;
  IF _post_cost > 0 THEN PERFORM public._spend(_uid, _post_cost, 'Guest blog post'); END IF;
  _slug := trim(both '-' from regexp_replace(lower(_title), '[^a-z0-9]+', '-', 'g')) || '-' || substr(md5(random()::text), 1, 6);
  INSERT INTO public.blog_posts (title,slug,excerpt,content,featured_image,featured_image_alt,category_id,subcategory_id,tags,faqs,author_id,author_name,status,published_at,seo_title,seo_description,noindex)
  VALUES (_title,_slug,_excerpt,_content,NULLIF(_image,''),_title,_category_id,_subcategory_id,COALESCE(_tags,'{}'::text[]),_faqs,_uid,_author_name,'published',now()+interval '30 minutes',trim(_seo_title),trim(_seo_description),false);
  RETURN _slug;
END;
$$;