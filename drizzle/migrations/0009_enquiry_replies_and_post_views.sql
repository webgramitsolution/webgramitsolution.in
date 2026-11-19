ALTER TABLE public.enquiries ADD COLUMN IF NOT EXISTS reply_message text, ADD COLUMN IF NOT EXISTS replied_at timestamptz;
ALTER TABLE public.blog_posts ADD COLUMN IF NOT EXISTS view_count integer NOT NULL DEFAULT 0;
CREATE OR REPLACE FUNCTION public.increment_post_view(_slug text)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE public.blog_posts SET view_count = view_count + 1
  WHERE slug = _slug AND status = 'published' AND published_at <= now();
$$;
REVOKE ALL ON FUNCTION public.increment_post_view(text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.increment_post_view(text) TO anon, authenticated, service_role;