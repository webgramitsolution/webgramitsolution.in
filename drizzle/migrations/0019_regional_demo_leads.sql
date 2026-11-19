CREATE TABLE public.regional_demo_leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  region text NOT NULL CHECK (region IN ('ae','kw')),
  full_name text NOT NULL,
  company_email text NOT NULL,
  whatsapp text NOT NULL,
  project_scope text NOT NULL,
  webhook_status text NOT NULL DEFAULT 'pending',
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE, DELETE ON public.regional_demo_leads TO authenticated;
GRANT ALL ON public.regional_demo_leads TO service_role;
ALTER TABLE public.regional_demo_leads ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Admins manage regional leads" ON public.regional_demo_leads FOR ALL TO authenticated
  USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE OR REPLACE FUNCTION public.submit_regional_lead(_region text, _name text, _email text, _whatsapp text, _scope text)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _id uuid; _recent int;
BEGIN
  IF _region NOT IN ('ae','kw') THEN RAISE EXCEPTION 'Invalid region'; END IF;
  IF length(trim(_name)) NOT BETWEEN 2 AND 100 THEN RAISE EXCEPTION 'Please enter your full name.'; END IF;
  IF _email !~* '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(_email) > 255 THEN RAISE EXCEPTION 'Please enter a valid company email.'; END IF;
  IF _whatsapp !~ '^\+[0-9][0-9 ]{6,18}$' THEN RAISE EXCEPTION 'WhatsApp number must start with a country code, e.g. +971.'; END IF;
  IF length(trim(_scope)) NOT BETWEEN 10 AND 3000 THEN RAISE EXCEPTION 'Please describe your project scope.'; END IF;
  SELECT count(*) INTO _recent FROM regional_demo_leads WHERE lower(company_email) = lower(trim(_email)) AND created_at > now() - interval '10 minutes';
  IF _recent >= 3 THEN RAISE EXCEPTION 'Too many requests. Please try again shortly.'; END IF;
  INSERT INTO regional_demo_leads(region, full_name, company_email, whatsapp, project_scope)
  VALUES (_region, trim(_name), lower(trim(_email)), trim(_whatsapp), trim(_scope)) RETURNING id INTO _id;
  RETURN _id;
END $$;
CREATE OR REPLACE FUNCTION public.mark_regional_lead_webhook(_id uuid, _status text)
RETURNS void LANGUAGE sql SECURITY DEFINER SET search_path = public AS $$
  UPDATE regional_demo_leads SET webhook_status = _status
  WHERE id = _id AND webhook_status = 'pending' AND _status IN ('sent','failed','not_configured') AND created_at > now() - interval '5 minutes';
$$;
REVOKE ALL ON FUNCTION public.submit_regional_lead(text,text,text,text,text) FROM PUBLIC;
REVOKE ALL ON FUNCTION public.mark_regional_lead_webhook(uuid,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_regional_lead(text,text,text,text,text) TO anon, authenticated;
GRANT EXECUTE ON FUNCTION public.mark_regional_lead_webhook(uuid,text) TO anon, authenticated;