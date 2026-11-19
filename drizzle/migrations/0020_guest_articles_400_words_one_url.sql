CREATE OR REPLACE FUNCTION public.validate_guest_article_content(_title text, _excerpt text, _content text)
RETURNS void LANGUAGE plpgsql SET search_path = public AS $$
DECLARE _body text; _readable text; _words integer; _links integer;
BEGIN
  _body := regexp_replace(COALESCE(_content,''), '!\[[^\]]*\]\(https://[^\s)]+\)', ' ', 'gi');
  _readable := regexp_replace(_body, '\[([^\]]*)\]\([^)]*\)', '\1', 'g');
  _readable := regexp_replace(_readable, 'https?://[^\s<>"'')\]]+|www\.[^\s<>"'')\]]+', ' ', 'gi');
  _readable := trim(regexp_replace(_readable, '[:*_\[\]#>\-]', ' ', 'g'));
  _words := CASE WHEN _readable = '' THEN 0 ELSE cardinality(regexp_split_to_array(_readable, '\s+')) END;
  IF _words < 400 THEN RAISE EXCEPTION 'Article must have at least 400 words (currently %).', _words; END IF;
  SELECT count(*) INTO _links FROM regexp_matches(_body || E'\n' || COALESCE(_excerpt,'') || E'\n' || COALESCE(_title,''), 'https?://[^\s<>"'')\]]+|www\.[^\s<>"'')\]]+', 'gi');
  IF _links > 1 THEN RAISE EXCEPTION 'Only one external URL is allowed per guest article; HTTPS images are separate.'; END IF;
  IF _content ~* '</?[a-z][^>]*>|\]\(\s*(javascript|data|vbscript):' THEN RAISE EXCEPTION 'Use safe Markdown instead of HTML or unsafe links.'; END IF;
END $$;
REVOKE ALL ON FUNCTION public.validate_guest_article_content(text,text,text) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.validate_guest_article_content(text,text,text) TO authenticated;
DO $$
DECLARE r record; definition text; start_at integer; end_at integer; marker text;
BEGIN
  FOR r IN SELECT p.oid FROM pg_proc p JOIN pg_namespace n ON n.oid=p.pronamespace WHERE n.nspname='public' AND p.proname IN ('submit_guest_post','submit_guest_post_v2') LOOP
    definition := pg_get_functiondef(r.oid);
    start_at := strpos(definition, '_words :=');
    end_at := 0;
    FOREACH marker IN ARRAY ARRAY['  IF _image', '  IF _category_id', '  PERFORM public._spend'] LOOP
      IF strpos(definition, marker) > start_at AND (end_at = 0 OR strpos(definition, marker) < end_at) THEN end_at := strpos(definition, marker); END IF;
    END LOOP;
    IF start_at = 0 OR end_at = 0 THEN RAISE EXCEPTION 'Unexpected guest submission function structure'; END IF;
    definition := substr(definition,1,start_at-1) || 'PERFORM public.validate_guest_article_content(_title, _excerpt, _content);' || E'\n' || substr(definition,end_at);
    EXECUTE definition;
  END LOOP;
END $$;
DO $$
BEGIN
  PERFORM public.validate_guest_article_content('Title','Excerpt',repeat('business ',400));
  PERFORM public.validate_guest_article_content('Title','Excerpt',repeat('business ',400) || '[Source](https://example.com) ![Image](https://example.com/image.jpg)');
  BEGIN
    PERFORM public.validate_guest_article_content('Title','Excerpt',repeat('business ',399));
    RAISE EXCEPTION '399-word validation test failed';
  EXCEPTION WHEN raise_exception THEN IF SQLERRM NOT LIKE 'Article must have at least 400 words%' THEN RAISE; END IF; END;
  BEGIN
    PERFORM public.validate_guest_article_content('Title','Excerpt',repeat('business ',400) || ' https://example.com https://other.com');
    RAISE EXCEPTION 'Two-link validation test failed';
  EXCEPTION WHEN raise_exception THEN IF SQLERRM NOT LIKE 'Only one external URL%' THEN RAISE; END IF; END;
END $$;