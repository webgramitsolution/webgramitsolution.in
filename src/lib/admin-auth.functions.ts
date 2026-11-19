import { createMiddleware, createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const requireAdmin = createMiddleware({ type: "function" })
  .middleware([requireSupabaseAuth])
  .server(async ({ next, context }) => {
    const { isAdmin } = await import("./mysql.server");
    if (!(await isAdmin(context.userId))) throw new Error("Administrator access required.");
    return next({ context: { userId: context.userId } });
  });

export const getAdminAccess = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { isAdmin } = await import("./mysql.server");
    return isAdmin(context.userId);
  });
