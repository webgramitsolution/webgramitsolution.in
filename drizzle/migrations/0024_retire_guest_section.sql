DO $$
DECLARE fn regprocedure;
BEGIN
  FOR fn IN
    SELECT p.oid::regprocedure FROM pg_proc p JOIN pg_namespace n ON n.oid = p.pronamespace
    WHERE n.nspname = 'public' AND p.proname IN (
      'submit_guest_post','submit_guest_post_v2','start_game_attempt','complete_game_level','buy_game_glass',
      'award_verified_game_attempt','claim_read_reward','start_blog_read','claim_share_bonus','claim_share_reward',
      'create_web_story','request_instant_indexing','get_guest_post_cost','set_guest_post_cost','my_credit_balance'
    )
  LOOP
    EXECUTE format('REVOKE EXECUTE ON FUNCTION %s FROM PUBLIC, anon, authenticated', fn);
    EXECUTE format('COMMENT ON FUNCTION %s IS %L', fn, 'DEPRECATED: guest section retired; not callable by visitors');
  END LOOP;
END $$;