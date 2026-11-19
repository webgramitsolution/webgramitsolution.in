DROP POLICY IF EXISTS "Signed in users read blog settings" ON public.blog_settings;
REVOKE SELECT ON public.blog_settings FROM authenticated;
GRANT SELECT, INSERT, UPDATE, DELETE ON public.blog_settings TO authenticated;
CREATE POLICY "Admins read blog settings"
ON public.blog_settings
FOR SELECT
TO authenticated
USING (public.has_role(auth.uid(), 'admin'::public.app_role));