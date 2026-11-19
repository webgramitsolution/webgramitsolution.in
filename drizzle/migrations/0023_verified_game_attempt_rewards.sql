CREATE TABLE public.game_attempts (
 id uuid PRIMARY KEY DEFAULT gen_random_uuid(), user_id uuid NOT NULL, level integer NOT NULL CHECK(level BETWEEN 1 AND 20),
 started_at timestamptz NOT NULL DEFAULT now(), completed_at timestamptz
);
GRANT SELECT ON public.game_attempts TO authenticated;
GRANT ALL ON public.game_attempts TO service_role;
ALTER TABLE public.game_attempts ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Own game attempts" ON public.game_attempts FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE OR REPLACE FUNCTION public.start_game_attempt(_level integer) RETURNS uuid
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _uid uuid := auth.uid(); _done integer; _id uuid;
BEGIN
 IF _uid IS NULL THEN RAISE EXCEPTION 'Sign in first.'; END IF;
 IF _level IS NULL OR _level NOT BETWEEN 1 AND 20 THEN RAISE EXCEPTION 'Invalid level.'; END IF;
 PERFORM pg_advisory_xact_lock(hashtext(_uid::text));
 SELECT count(*) INTO _done FROM public.game_progress WHERE user_id = _uid;
 IF _level > _done + 1 THEN RAISE EXCEPTION 'Complete the previous level first.'; END IF;
 -- One active attempt per player prevents reusing glass purchases across attempts.
 UPDATE public.game_attempts SET completed_at = now() WHERE user_id = _uid AND completed_at IS NULL;
 INSERT INTO public.game_attempts(user_id,level) VALUES (_uid,_level) RETURNING id INTO _id;
 RETURN _id;
END $$;
REVOKE ALL ON FUNCTION public.start_game_attempt(integer) FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.start_game_attempt(integer) TO authenticated;
CREATE OR REPLACE FUNCTION public.award_verified_game_attempt(_attempt_id uuid, _user_id uuid) RETURNS jsonb
LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
DECLARE _attempt public.game_attempts%ROWTYPE; _done integer; _reward integer := 0;
BEGIN
 IF _user_id IS NULL THEN RAISE EXCEPTION 'User required.'; END IF;
 PERFORM pg_advisory_xact_lock(hashtext(_user_id::text));
 SELECT * INTO _attempt FROM public.game_attempts WHERE id = _attempt_id AND user_id = _user_id AND completed_at IS NULL FOR UPDATE;
 IF NOT FOUND THEN RAISE EXCEPTION 'Attempt unavailable.'; END IF;
 SELECT count(*) INTO _done FROM public.game_progress WHERE user_id = _user_id;
 IF _attempt.level > _done + 1 THEN RAISE EXCEPTION 'Complete the previous level first.'; END IF;
 UPDATE public.game_attempts SET completed_at = now() WHERE id = _attempt_id;
 INSERT INTO public.game_progress(user_id,level) VALUES (_user_id,_attempt.level) ON CONFLICT DO NOTHING;
 IF FOUND THEN
  _reward := public.game_level_reward(_attempt.level);
  INSERT INTO public.credit_ledger(user_id,amount,reason) VALUES (_user_id,_reward,'Game level ' || _attempt.level);
 END IF;
 RETURN jsonb_build_object('reward',_reward,'balance',public.credit_balance(_user_id));
END $$;
REVOKE ALL ON FUNCTION public.award_verified_game_attempt(uuid,uuid) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.award_verified_game_attempt(uuid,uuid) TO service_role;
CREATE OR REPLACE FUNCTION public.complete_game_level(_level integer) RETURNS integer
LANGUAGE plpgsql SECURITY INVOKER SET search_path = public AS $$
BEGIN RAISE EXCEPTION 'Submit verified puzzle moves through the game.' USING ERRCODE = '42501'; END $$;
REVOKE ALL ON FUNCTION public.complete_game_level(integer) FROM PUBLIC, anon, authenticated, service_role;
COMMENT ON FUNCTION public.complete_game_level(integer) IS 'DEPRECATED: level-only claims disabled; verified server-side move replay required.';