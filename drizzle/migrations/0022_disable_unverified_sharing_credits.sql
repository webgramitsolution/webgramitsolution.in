CREATE OR REPLACE FUNCTION public.claim_share_bonus(_post_id uuid)
RETURNS boolean LANGUAGE sql SECURITY INVOKER SET search_path = public AS $$ SELECT false $$;
REVOKE ALL ON FUNCTION public.claim_share_bonus(uuid) FROM PUBLIC, anon, authenticated;
COMMENT ON FUNCTION public.claim_share_bonus(uuid) IS 'DEPRECATED: sharing buttons remain available but unverified sharing no longer awards credits.';