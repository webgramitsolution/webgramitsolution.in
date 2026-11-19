ALTER TABLE public.game_progress DROP CONSTRAINT game_progress_level_check;
ALTER TABLE public.game_progress ADD CONSTRAINT game_progress_level_check CHECK (level >= 1 AND level <= 20);

CREATE OR REPLACE FUNCTION public.complete_game_level(_level integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _uid uuid := auth.uid();
  _done integer;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Please sign in first.';
  END IF;
  IF _level < 1 OR _level > 20 THEN
    RAISE EXCEPTION 'Invalid level.';
  END IF;
  SELECT count(*) INTO _done FROM public.game_progress WHERE user_id = _uid;
  IF _level > _done + 1 THEN
    RAISE EXCEPTION 'Complete the previous level first.';
  END IF;
  INSERT INTO public.game_progress (user_id, level)
  VALUES (_uid, _level)
  ON CONFLICT DO NOTHING;
  IF FOUND THEN
    INSERT INTO public.credit_ledger (user_id, amount, reason)
    VALUES (_uid, 20, 'Game level ' || _level);
  END IF;
  RETURN public.credit_balance(_uid);
END
$function$;