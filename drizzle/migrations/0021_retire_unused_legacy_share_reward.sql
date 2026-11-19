-- The application uses the six-platform sharing flow, never this legacy reward endpoint.
-- Retire the unused endpoint without changing current sharing buttons or rewards.
CREATE OR REPLACE FUNCTION public.claim_share_reward(_post_id uuid, _platform text)
RETURNS boolean
LANGUAGE plpgsql
SECURITY INVOKER
SET search_path = public
AS $$
BEGIN
  RAISE EXCEPTION 'This legacy sharing reward is no longer available.' USING ERRCODE = '42501';
END;
$$;
REVOKE ALL ON FUNCTION public.claim_share_reward(uuid, text) FROM PUBLIC, anon, authenticated;
COMMENT ON FUNCTION public.claim_share_reward(uuid, text) IS 'DEPRECATED: unused legacy reward endpoint disabled; application uses the six-platform sharing flow.';