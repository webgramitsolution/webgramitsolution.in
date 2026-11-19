REVOKE ALL ON FUNCTION public.submit_guest_post(text, text, text, uuid, text, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.submit_guest_post_v2(text, text, text, uuid, uuid, text[], jsonb, text, text) FROM PUBLIC, anon, authenticated;
REVOKE ALL ON FUNCTION public.get_guest_post_cost() FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.set_guest_post_cost(integer) FROM PUBLIC, anon;
REVOKE ALL ON FUNCTION public.submit_guest_post_v2(text, text, text, uuid, uuid, text[], jsonb, text, text, text, text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.get_guest_post_cost() TO authenticated;
GRANT EXECUTE ON FUNCTION public.set_guest_post_cost(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.submit_guest_post_v2(text, text, text, uuid, uuid, text[], jsonb, text, text, text, text) TO authenticated;