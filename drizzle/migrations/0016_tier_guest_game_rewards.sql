CREATE OR REPLACE FUNCTION public.complete_game_level(_level integer)
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _uid uuid := auth.uid();
  _done integer;
  _reward integer;
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
  _reward := 20 + (((_level - 1) / 3) * 10);
  INSERT INTO public.game_progress (user_id, level)
  VALUES (_uid, _level)
  ON CONFLICT DO NOTHING;
  IF FOUND THEN
    INSERT INTO public.credit_ledger (user_id, amount, reason)
    VALUES (_uid, _reward, 'Game level ' || _level);
  END IF;
  RETURN public.credit_balance(_uid);
END
$function$;

GRANT EXECUTE ON FUNCTION public.complete_game_level(integer) TO authenticated;
GRANT EXECUTE ON FUNCTION public.complete_game_level(integer) TO service_role;