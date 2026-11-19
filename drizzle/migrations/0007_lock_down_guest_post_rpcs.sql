REVOKE EXECUTE ON FUNCTION public.submit_guest_post(text,text,text,uuid,text,text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.submit_guest_post_v2(text,text,text,uuid,uuid,text[],jsonb,text,text) FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.submit_guest_post_v2(text,text,text,uuid,uuid,text[],jsonb,text,text,text,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.submit_guest_post_v2(text,text,text,uuid,uuid,text[],jsonb,text,text,text,text) TO authenticated, service_role;