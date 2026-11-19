import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    // Loaded on demand so public pages do not download the sign-in client up front.
    const { supabase } = await import("@/integrations/supabase/client");
    const { data, error } = await supabase.auth.getUser();
    if (error || !data.user) throw redirect({ to: "/auth" });
    const { getAdminAccess } = await import("@/lib/admin-auth.functions");
    if (!(await getAdminAccess())) {
      await supabase.auth.signOut({ scope: "local" });
      throw redirect({ to: "/auth" });
    }
    return { user: data.user };
  },
  component: () => <Outlet />,
});
