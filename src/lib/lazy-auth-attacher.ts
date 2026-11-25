import { createMiddleware } from "@tanstack/react-start";

/**
 * Same job as the generated attachSupabaseAuth (adds the signed-in visitor's
 * bearer token to server-function calls), but loads the sign-in client only
 * when a server function is actually called, keeping it out of the first page
 * download for every visitor.
 */
export const attachSupabaseAuthLazily = createMiddleware({ type: "function" }).client(
  async ({ next }) => {
    const { supabase } = await import("@/integrations/supabase/client");
    const { data } = await supabase.auth.getSession();
    const token = data.session?.access_token;
    return next({
      headers: token ? { Authorization: `Bearer ${token}` } : {},
    });
  },
);
