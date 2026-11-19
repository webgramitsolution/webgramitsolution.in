CREATE OR REPLACE FUNCTION public.game_level_reward(_level integer) RETURNS integer LANGUAGE sql IMMUTABLE SET search_path = public AS $$
  SELECT CASE WHEN _level <= 3 THEN 20 WHEN _level = 4 THEN 50 WHEN _level = 5 THEN 80 WHEN _level = 6 THEN 110 WHEN _level = 7 THEN 150 ELSE 200 + (_level - 8) * 50 END
$$;

CREATE OR REPLACE FUNCTION public.complete_game_level(_level integer) RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _uid uuid := auth.uid(); _done integer;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'Please sign in first.'; END IF;
  IF _level < 1 OR _level > 20 THEN RAISE EXCEPTION 'Invalid level.'; END IF;
  PERFORM pg_advisory_xact_lock(hashtext(_uid::text));
  SELECT count(*) INTO _done FROM public.game_progress WHERE user_id = _uid;
  IF _level > _done + 1 THEN RAISE EXCEPTION 'Complete the previous level first.'; END IF;
  INSERT INTO public.game_progress (user_id, level) VALUES (_uid, _level) ON CONFLICT DO NOTHING;
  IF FOUND THEN
    INSERT INTO public.credit_ledger (user_id, amount, reason) VALUES (_uid, public.game_level_reward(_level), 'Game level ' || _level);
  END IF;
  RETURN public.credit_balance(_uid);
END $$;

CREATE OR REPLACE FUNCTION public.add_blog_comment(_post_id uuid, _body text, _author_name text) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _uid uuid := auth.uid();
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.blog_posts WHERE id = _post_id AND status = 'published' AND published_at <= now()) THEN RAISE EXCEPTION 'Article not found.'; END IF;
  IF _body ~* '(https?://|www\.)' THEN RAISE EXCEPTION 'Links are not allowed in comments.'; END IF;
  PERFORM public._spend(_uid, 50, 'Blog comment');
  INSERT INTO public.blog_comments (post_id, user_id, author_name, body) VALUES (_post_id, _uid, left(_author_name, 80), _body);
END $$;

CREATE OR REPLACE FUNCTION public.request_instant_indexing(_url text) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF _url !~* '^https?://' THEN RAISE EXCEPTION 'Enter a valid URL.'; END IF;
  PERFORM public._spend(auth.uid(), 500, 'Instant indexing');
  INSERT INTO public.indexing_requests (user_id, url) VALUES (auth.uid(), _url);
END $$;

CREATE TABLE public.share_clicks (
  user_id uuid NOT NULL, post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE, platform text NOT NULL,
  clicked_at timestamptz NOT NULL DEFAULT now(), PRIMARY KEY (user_id, post_id, platform));
GRANT SELECT ON public.share_clicks TO authenticated;
GRANT ALL ON public.share_clicks TO service_role;
ALTER TABLE public.share_clicks ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own share clicks" ON public.share_clicks FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.engagement_rewards (
  user_id uuid NOT NULL, post_id uuid NOT NULL REFERENCES public.blog_posts(id) ON DELETE CASCADE, kind text NOT NULL,
  started_at timestamptz NOT NULL DEFAULT now(), rewarded_at timestamptz, PRIMARY KEY (user_id, post_id, kind));
GRANT SELECT ON public.engagement_rewards TO authenticated;
GRANT ALL ON public.engagement_rewards TO service_role;
ALTER TABLE public.engagement_rewards ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own engagement rewards" ON public.engagement_rewards FOR SELECT TO authenticated USING (auth.uid() = user_id);

CREATE OR REPLACE FUNCTION public.record_share_click(_post_id uuid, _platform text) RETURNS integer LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _uid uuid := auth.uid();
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'Please sign in first.'; END IF;
  IF _platform NOT IN ('facebook','instagram','linkedin','pinterest','tumblr','x') THEN RAISE EXCEPTION 'Unknown platform.'; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.blog_posts WHERE id = _post_id AND status = 'published' AND published_at <= now()) THEN RAISE EXCEPTION 'Article not found.'; END IF;
  INSERT INTO public.share_clicks (user_id, post_id, platform) VALUES (_uid, _post_id, _platform) ON CONFLICT DO NOTHING;
  RETURN (SELECT count(*)::integer FROM public.share_clicks WHERE user_id = _uid AND post_id = _post_id);
END $$;

CREATE OR REPLACE FUNCTION public.claim_share_bonus(_post_id uuid) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _uid uuid := auth.uid(); _n integer; _last timestamptz;
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'Please sign in first.'; END IF;
  SELECT count(*), max(clicked_at) INTO _n, _last FROM public.share_clicks WHERE user_id = _uid AND post_id = _post_id;
  IF _n < 6 THEN RAISE EXCEPTION 'Share on all 6 platforms first.'; END IF;
  IF now() - _last < interval '27 seconds' THEN RAISE EXCEPTION 'Please wait a few more seconds.'; END IF;
  INSERT INTO public.engagement_rewards (user_id, post_id, kind, rewarded_at) VALUES (_uid, _post_id, 'share', now()) ON CONFLICT DO NOTHING;
  IF NOT FOUND THEN RETURN false; END IF;
  INSERT INTO public.credit_ledger (user_id, amount, reason) VALUES (_uid, 30, 'Shared article on 6 platforms');
  RETURN true;
END $$;

CREATE OR REPLACE FUNCTION public.start_blog_read(_post_id uuid) RETURNS void LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  IF auth.uid() IS NULL THEN RETURN; END IF;
  IF NOT EXISTS (SELECT 1 FROM public.blog_posts WHERE id = _post_id AND status = 'published' AND published_at <= now()) THEN RETURN; END IF;
  INSERT INTO public.engagement_rewards (user_id, post_id, kind) VALUES (auth.uid(), _post_id, 'read')
  ON CONFLICT (user_id, post_id, kind) DO UPDATE SET started_at = now() WHERE public.engagement_rewards.rewarded_at IS NULL;
END $$;

CREATE OR REPLACE FUNCTION public.claim_read_reward(_post_id uuid) RETURNS boolean LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _uid uuid := auth.uid();
BEGIN
  IF _uid IS NULL THEN RAISE EXCEPTION 'Please sign in first.'; END IF;
  UPDATE public.engagement_rewards SET rewarded_at = now()
  WHERE user_id = _uid AND post_id = _post_id AND kind = 'read' AND rewarded_at IS NULL AND now() - started_at >= interval '60 seconds';
  IF NOT FOUND THEN RETURN false; END IF;
  INSERT INTO public.credit_ledger (user_id, amount, reason) VALUES (_uid, 20, 'Read full article');
  RETURN true;
END $$;

GRANT EXECUTE ON FUNCTION public.record_share_click(uuid, text), public.claim_share_bonus(uuid), public.start_blog_read(uuid), public.claim_read_reward(uuid) TO authenticated;