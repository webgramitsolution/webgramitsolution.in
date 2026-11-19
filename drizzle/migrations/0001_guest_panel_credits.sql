CREATE TABLE public.game_progress (
  user_id uuid NOT NULL,
  level integer NOT NULL CHECK (level BETWEEN 1 AND 10),
  completed_at timestamptz NOT NULL DEFAULT now(),
  PRIMARY KEY (user_id, level)
);
GRANT SELECT ON public.game_progress TO authenticated;
GRANT ALL ON public.game_progress TO service_role;
ALTER TABLE public.game_progress ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own progress" ON public.game_progress FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.credit_ledger (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  amount integer NOT NULL,
  reason text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX credit_ledger_user_idx ON public.credit_ledger (user_id, created_at DESC);
GRANT SELECT ON public.credit_ledger TO authenticated;
GRANT ALL ON public.credit_ledger TO service_role;
ALTER TABLE public.credit_ledger ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own ledger" ON public.credit_ledger FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.blog_comments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  user_id uuid NOT NULL,
  author_name text NOT NULL,
  body text NOT NULL CHECK (char_length(body) BETWEEN 2 AND 2000),
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX blog_comments_post_idx ON public.blog_comments (post_id, created_at);
GRANT SELECT ON public.blog_comments TO anon, authenticated;
GRANT DELETE ON public.blog_comments TO authenticated;
GRANT ALL ON public.blog_comments TO service_role;
ALTER TABLE public.blog_comments ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone reads comments" ON public.blog_comments FOR SELECT TO anon, authenticated USING (true);
CREATE POLICY "Admins delete comments" ON public.blog_comments FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.share_rewards (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE,
  platform text NOT NULL CHECK (platform IN ('facebook','x','linkedin','whatsapp')),
  share_day date NOT NULL DEFAULT current_date,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, platform, share_day)
);
GRANT SELECT ON public.share_rewards TO authenticated;
GRANT ALL ON public.share_rewards TO service_role;
ALTER TABLE public.share_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own shares" ON public.share_rewards FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.indexing_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  url text NOT NULL CHECK (char_length(url) BETWEEN 8 AND 2000),
  status text NOT NULL DEFAULT 'pending' CHECK (status IN ('pending','done','rejected')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, UPDATE ON public.indexing_requests TO authenticated;
GRANT ALL ON public.indexing_requests TO service_role;
ALTER TABLE public.indexing_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own indexing" ON public.indexing_requests FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin updates indexing" ON public.indexing_requests FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.web_stories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  title text NOT NULL CHECK (char_length(title) BETWEEN 3 AND 150),
  slides jsonb NOT NULL DEFAULT '[]'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, DELETE ON public.web_stories TO authenticated;
GRANT ALL ON public.web_stories TO service_role;
ALTER TABLE public.web_stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own stories" ON public.web_stories FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Admin deletes stories" ON public.web_stories FOR DELETE TO authenticated USING (public.has_role(auth.uid(), 'admin'));

CREATE TABLE public.support_tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  subject text NOT NULL CHECK (char_length(subject) BETWEEN 3 AND 150),
  message text NOT NULL CHECK (char_length(message) BETWEEN 5 AND 3000),
  status text NOT NULL DEFAULT 'open' CHECK (status IN ('open','closed')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE ON public.support_tickets TO authenticated;
GRANT ALL ON public.support_tickets TO service_role;
ALTER TABLE public.support_tickets ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own tickets" ON public.support_tickets FOR SELECT TO authenticated USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin'));
CREATE POLICY "Create own tickets" ON public.support_tickets FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id AND status = 'open');
CREATE POLICY "Admin updates tickets" ON public.support_tickets FOR UPDATE TO authenticated USING (public.has_role(auth.uid(), 'admin')) WITH CHECK (public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Authors read own posts" ON public.blog_posts FOR SELECT TO authenticated USING (author_id = auth.uid());

CREATE OR REPLACE FUNCTION public.credit_balance(_user_id uuid)
RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE(SUM(amount), 0)::integer FROM public.credit_ledger WHERE user_id = _user_id
$$;

CREATE OR REPLACE FUNCTION public._spend(_uid uuid, _amount integer, _reason text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'Please sign in first.'; END IF;
  PERFORM pg_advisory_xact_lock(hashtext(_uid::text));
  IF (SELECT count(*) FROM public.game_progress WHERE user_id = _uid) < 5 THEN
    RAISE EXCEPTION 'Complete at least 5 game levels to unlock credits.';
  END IF;
  IF public.credit_balance(_uid) < _amount THEN
    RAISE EXCEPTION 'Not enough credits. % credits required.', _amount;
  END IF;
  INSERT INTO public.credit_ledger (user_id, amount, reason) VALUES (_uid, -_amount, _reason);
END $$;
REVOKE ALL ON FUNCTION public._spend(uuid, integer, text) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.my_credit_balance()
RETURNS integer LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT public.credit_balance(auth.uid())
$$;
REVOKE ALL ON FUNCTION public.credit_balance(uuid) FROM PUBLIC, anon, authenticated;

CREATE OR REPLACE FUNCTION public.complete_game_level(_level integer)
RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _uid uuid := auth.uid(); _done integer;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'Please sign in first.'; END IF;
  IF _level < 1 OR _level > 10 THEN RAISE EXCEPTION 'Invalid level.'; END IF;
  SELECT count(*) INTO _done FROM public.game_progress WHERE user_id = _uid;
  IF _level > _done + 1 THEN RAISE EXCEPTION 'Complete the previous level first.'; END IF;
  INSERT INTO public.game_progress (user_id, level) VALUES (_uid, _level) ON CONFLICT DO NOTHING;
  IF FOUND THEN
    INSERT INTO public.credit_ledger (user_id, amount, reason) VALUES (_uid, 20, 'Game level ' || _level);
  END IF;
  RETURN public.credit_balance(_uid);
END $$;

CREATE OR REPLACE FUNCTION public.submit_guest_post(_title text, _excerpt text, _content text, _category_id uuid, _image text, _author_name text)
RETURNS text LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _uid uuid := auth.uid(); _slug text; _words integer;
BEGIN
  _words := array_length(regexp_split_to_array(trim(_content), '\s+'), 1);
  IF _words < 800 THEN RAISE EXCEPTION 'Article must have at least 800 words (currently %).', _words; END IF;
  IF _content ~* '(https?://|www\.|<a[\s>]|\[[^\]]*\]\()' OR _excerpt ~* '(https?://|www\.)' OR _title ~* '(https?://|www\.)' THEN
    RAISE EXCEPTION 'External links are not allowed in guest articles.';
  END IF;
  PERFORM public._spend(_uid, 400, 'Guest blog post');
  _slug := trim(both '-' from regexp_replace(lower(_title), '[^a-z0-9]+', '-', 'g')) || '-' || substr(md5(random()::text), 1, 6);
  INSERT INTO public.blog_posts (title, slug, excerpt, content, featured_image, featured_image_alt, category_id, author_id, author_name, status, published_at)
  VALUES (_title, _slug, _excerpt, _content, NULLIF(_image, ''), _title, _category_id, _uid, _author_name, 'published', now() + interval '30 minutes');
  RETURN _slug;
END $$;

CREATE OR REPLACE FUNCTION public.add_blog_comment(_post_id uuid, _body text, _author_name text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _uid uuid := auth.uid();
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.blog_posts WHERE id = _post_id AND status = 'published' AND published_at <= now()) THEN
    RAISE EXCEPTION 'Article not found.';
  END IF;
  IF _body ~* '(https?://|www\.)' THEN RAISE EXCEPTION 'Links are not allowed in comments.'; END IF;
  PERFORM public._spend(_uid, 100, 'Blog comment');
  INSERT INTO public.blog_comments (post_id, user_id, author_name, body) VALUES (_post_id, _uid, left(_author_name, 80), _body);
END $$;

CREATE OR REPLACE FUNCTION public.claim_share_reward(_post_id uuid, _platform text)
RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _uid uuid := auth.uid();
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'Please sign in first.'; END IF;
  INSERT INTO public.share_rewards (user_id, post_id, platform) VALUES (_uid, _post_id, _platform) ON CONFLICT DO NOTHING;
  IF FOUND THEN
    INSERT INTO public.credit_ledger (user_id, amount, reason) VALUES (_uid, 10, 'Shared on ' || _platform);
    RETURN true;
  END IF;
  RETURN false;
END $$;

CREATE OR REPLACE FUNCTION public.request_instant_indexing(_url text)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF _url !~* '^https?://' THEN RAISE EXCEPTION 'Enter a valid URL.'; END IF;
  PERFORM public._spend(auth.uid(), 100, 'Instant indexing');
  INSERT INTO public.indexing_requests (user_id, url) VALUES (auth.uid(), _url);
END $$;

CREATE OR REPLACE FUNCTION public.create_web_story(_title text, _slides jsonb)
RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF jsonb_typeof(_slides) <> 'array' OR jsonb_array_length(_slides) < 1 THEN RAISE EXCEPTION 'Add at least one slide.'; END IF;
  PERFORM public._spend(auth.uid(), 200, 'Web story');
  INSERT INTO public.web_stories (user_id, title, slides) VALUES (auth.uid(), _title, _slides);
END $$;

REVOKE ALL ON FUNCTION public.complete_game_level(integer), public.submit_guest_post(text,text,text,uuid,text,text), public.add_blog_comment(uuid,text,text), public.claim_share_reward(uuid,text), public.request_instant_indexing(text), public.create_web_story(text,jsonb), public.my_credit_balance() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.complete_game_level(integer), public.submit_guest_post(text,text,text,uuid,text,text), public.add_blog_comment(uuid,text,text), public.claim_share_reward(uuid,text), public.request_instant_indexing(text), public.create_web_story(text,jsonb), public.my_credit_balance() TO authenticated;