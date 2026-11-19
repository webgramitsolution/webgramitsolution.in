CREATE OR REPLACE FUNCTION public.buy_game_glass()
RETURNS integer
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $function$
DECLARE
  _uid uuid := auth.uid();
  _done integer;
  _balance integer;
BEGIN
  IF _uid IS NULL THEN
    RAISE EXCEPTION 'Please sign in first.';
  END IF;
  SELECT count(*) INTO _done FROM public.game_progress WHERE user_id = _uid;
  IF _done < 5 THEN
    RAISE EXCEPTION 'Complete 5 levels before using credits.';
  END IF;
  SELECT public.credit_balance(_uid) INTO _balance;
  IF _balance < 10 THEN
    RAISE EXCEPTION 'You need 10 credits to buy an empty glass.';
  END IF;
  INSERT INTO public.credit_ledger (user_id, amount, reason)
  VALUES (_uid, -10, 'Extra game glass');
  RETURN public.credit_balance(_uid);
END
$function$;

GRANT EXECUTE ON FUNCTION public.buy_game_glass() TO authenticated;
GRANT EXECUTE ON FUNCTION public.buy_game_glass() TO service_role;