ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS noindex boolean NOT NULL DEFAULT false;

CREATE OR REPLACE FUNCTION public.submit_guest_post_v2(
  _title text,
  _excerpt text,
  _content text,
  _category_id uuid,
  _subcategory_id uuid,
  _tags text[],
  _faqs jsonb,
  _image text,
  _author_name text,
  _seo_title text DEFAULT '',
  _seo_description text DEFAULT ''
)
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  _uid uuid := auth.uid();
  _slug text;
  _words integer;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'Sign in to submit an article.'; END IF;
  _words := array_length(regexp_split_to_array(trim(_content), '\s+'), 1);
  IF _words < 800 THEN RAISE EXCEPTION 'Article must have at least 800 words (currently %).', _words; END IF;
  IF _content ~* '(https?://|www\.|<a[\s>]|\[[^\]]*\]\()' OR _excerpt ~* '(https?://|www\.)' OR _title ~* '(https?://|www\.)' THEN RAISE EXCEPTION 'External links are not allowed in guest articles.'; END IF;
  IF length(trim(_seo_title)) < 10 OR length(trim(_seo_title)) > 180 THEN RAISE EXCEPTION 'Meta title must be between 10 and 180 characters.'; END IF;
  IF length(trim(_seo_description)) < 50 OR length(trim(_seo_description)) > 320 THEN RAISE EXCEPTION 'Meta description must be between 50 and 320 characters.'; END IF;
  IF _category_id IS NULL OR NOT EXISTS (SELECT 1 FROM public.blog_categories WHERE id = _category_id AND parent_id IS NULL AND is_active = true) THEN RAISE EXCEPTION 'Choose a valid primary category.'; END IF;
  IF _subcategory_id IS NULL OR NOT EXISTS (SELECT 1 FROM public.blog_categories WHERE id = _subcategory_id AND parent_id = _category_id AND is_active = true) THEN RAISE EXCEPTION 'Choose a valid subcategory.'; END IF;
  IF jsonb_typeof(_faqs) <> 'array' OR jsonb_array_length(_faqs) <> 5 OR EXISTS (SELECT 1 FROM jsonb_array_elements(_faqs) item WHERE length(trim(COALESCE(item->>'question', ''))) < 5 OR length(trim(COALESCE(item->>'answer', ''))) < 5) THEN RAISE EXCEPTION 'Add exactly 5 complete FAQs.'; END IF;
  IF cardinality(COALESCE(_tags, '{}'::text[])) < 1 OR cardinality(COALESCE(_tags, '{}'::text[])) > 10 THEN RAISE EXCEPTION 'Add between 1 and 10 tags.'; END IF;
  PERFORM public._spend(_uid, 400, 'Guest blog post');
  _slug := trim(both '-' from regexp_replace(lower(_title), '[^a-z0-9]+', '-', 'g')) || '-' || substr(md5(random()::text), 1, 6);
  INSERT INTO public.blog_posts (title,slug,excerpt,content,featured_image,featured_image_alt,category_id,subcategory_id,tags,faqs,author_id,author_name,status,published_at,seo_title,seo_description,noindex)
  VALUES (_title,_slug,_excerpt,_content,NULLIF(_image,''),_title,_category_id,_subcategory_id,COALESCE(_tags,'{}'::text[]),_faqs,_uid,_author_name,'published',now()+interval '30 minutes',trim(_seo_title),trim(_seo_description),false);
  RETURN _slug;
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_guest_post_v2(text,text,text,uuid,uuid,text[],jsonb,text,text,text,text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_guest_post_v2(text,text,text,uuid,uuid,text[],jsonb,text,text,text,text) TO service_role;