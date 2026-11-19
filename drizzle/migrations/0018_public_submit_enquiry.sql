CREATE OR REPLACE FUNCTION public.submit_enquiry(_name text, _email text, _phone text, _service text, _message text)
RETURNS uuid LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _id uuid;
BEGIN
  IF length(trim(_name)) < 2 OR length(_name) > 100 OR _email !~ '^[^@\s]+@[^@\s]+\.[^@\s]+$' OR length(_email) > 255
     OR length(coalesce(_phone,'')) > 30 OR length(coalesce(_service,'')) > 80 OR length(trim(_message)) < 5 OR length(_message) > 3000 THEN
    RAISE EXCEPTION 'Please check your details and try again.';
  END IF;
  IF (SELECT count(*) FROM public.enquiries WHERE email = _email AND created_at > now() - interval '10 minutes') >= 3 THEN
    RAISE EXCEPTION 'Too many enquiries. Please try again in a few minutes.';
  END IF;
  INSERT INTO public.enquiries(name,email,phone,service,message)
  VALUES (trim(_name), trim(_email), coalesce(_phone,''), coalesce(_service,''), trim(_message)) RETURNING id INTO _id;
  RETURN _id;
END $$;
REVOKE ALL ON FUNCTION public.submit_enquiry(text,text,text,text,text) FROM PUBLIC;
GRANT EXECUTE ON FUNCTION public.submit_enquiry(text,text,text,text,text) TO anon, authenticated, service_role;