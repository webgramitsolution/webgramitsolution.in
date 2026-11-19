ALTER TABLE public.blog_categories
  ADD COLUMN IF NOT EXISTS parent_id uuid REFERENCES public.blog_categories(id) ON DELETE RESTRICT;

CREATE INDEX IF NOT EXISTS blog_categories_parent_id_idx ON public.blog_categories(parent_id);

ALTER TABLE public.blog_posts
  ADD COLUMN IF NOT EXISTS subcategory_id uuid REFERENCES public.blog_categories(id) ON DELETE RESTRICT,
  ADD COLUMN IF NOT EXISTS tags text[] NOT NULL DEFAULT '{}'::text[],
  ADD COLUMN IF NOT EXISTS faqs jsonb NOT NULL DEFAULT '[]'::jsonb;

CREATE INDEX IF NOT EXISTS blog_posts_subcategory_id_idx ON public.blog_posts(subcategory_id);
CREATE INDEX IF NOT EXISTS blog_posts_tags_idx ON public.blog_posts USING gin(tags);

CREATE OR REPLACE FUNCTION public.validate_blog_category_depth()
RETURNS trigger
LANGUAGE plpgsql
SET search_path = public
AS $$
BEGIN
  IF NEW.parent_id IS NOT NULL THEN
    IF NEW.parent_id = NEW.id THEN
      RAISE EXCEPTION 'A category cannot be its own parent.';
    END IF;
    IF EXISTS (SELECT 1 FROM public.blog_categories WHERE id = NEW.parent_id AND parent_id IS NOT NULL) THEN
      RAISE EXCEPTION 'Only one subcategory level is allowed.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER validate_blog_category_depth_trigger
BEFORE INSERT OR UPDATE OF parent_id ON public.blog_categories
FOR EACH ROW EXECUTE FUNCTION public.validate_blog_category_depth();

CREATE OR REPLACE FUNCTION public.submit_guest_post_v2(
  _title text,
  _excerpt text,
  _content text,
  _category_id uuid,
  _subcategory_id uuid,
  _tags text[],
  _faqs jsonb,
  _image text,
  _author_name text
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
  _words := array_length(regexp_split_to_array(trim(_content), '\s+'), 1);
  IF _words < 800 THEN RAISE EXCEPTION 'Article must have at least 800 words (currently %).', _words; END IF;
  IF _content ~* '(https?://|www\.|<a[\s>]|\[[^\]]*\]\()' OR _excerpt ~* '(https?://|www\.)' OR _title ~* '(https?://|www\.)' THEN
    RAISE EXCEPTION 'External links are not allowed in guest articles.';
  END IF;
  IF _category_id IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.blog_categories WHERE id = _category_id AND parent_id IS NULL AND is_active = true
  ) THEN RAISE EXCEPTION 'Choose a valid primary category.'; END IF;
  IF _subcategory_id IS NULL OR NOT EXISTS (
    SELECT 1 FROM public.blog_categories WHERE id = _subcategory_id AND parent_id = _category_id AND is_active = true
  ) THEN RAISE EXCEPTION 'Choose a valid subcategory.'; END IF;
  IF jsonb_typeof(_faqs) <> 'array' OR jsonb_array_length(_faqs) <> 5 OR EXISTS (
    SELECT 1 FROM jsonb_array_elements(_faqs) item
    WHERE length(trim(COALESCE(item->>'question', ''))) < 5 OR length(trim(COALESCE(item->>'answer', ''))) < 5
  ) THEN RAISE EXCEPTION 'Add exactly 5 complete FAQs.'; END IF;
  IF cardinality(COALESCE(_tags, '{}'::text[])) > 10 THEN RAISE EXCEPTION 'Use no more than 10 tags.'; END IF;
  PERFORM public._spend(_uid, 400, 'Guest blog post');
  _slug := trim(both '-' from regexp_replace(lower(_title), '[^a-z0-9]+', '-', 'g')) || '-' || substr(md5(random()::text), 1, 6);
  INSERT INTO public.blog_posts (
    title, slug, excerpt, content, featured_image, featured_image_alt, category_id, subcategory_id, tags, faqs,
    author_id, author_name, status, published_at
  ) VALUES (
    _title, _slug, _excerpt, _content, NULLIF(_image, ''), _title, _category_id, _subcategory_id,
    COALESCE(_tags, '{}'::text[]), _faqs, _uid, _author_name, 'published', now() + interval '30 minutes'
  );
  RETURN _slug;
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_guest_post_v2(text,text,text,uuid,uuid,text[],jsonb,text,text) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_guest_post_v2(text,text,text,uuid,uuid,text[],jsonb,text,text) TO service_role;