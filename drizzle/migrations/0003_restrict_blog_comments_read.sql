DROP POLICY IF EXISTS "Anyone reads comments" ON public.blog_comments;
CREATE POLICY "Comments visible on live posts" ON public.blog_comments FOR SELECT TO anon, authenticated
USING (EXISTS (SELECT 1 FROM public.blog_posts p WHERE p.id = blog_comments.post_id AND p.status = 'published' AND p.published_at <= now()));
CREATE POLICY "Authors see own comments" ON public.blog_comments FOR SELECT TO authenticated USING (auth.uid() = user_id);
REVOKE SELECT ON public.blog_comments FROM anon;
GRANT SELECT (id, post_id, author_name, body, created_at) ON public.blog_comments TO anon;