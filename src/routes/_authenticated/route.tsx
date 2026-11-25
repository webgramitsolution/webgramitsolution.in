import { useQueryClient } from "@tanstack/react-query";
import { useEffect } from "react";
import { createFileRoute, Outlet, redirect, useRouter } from "@tanstack/react-router";

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
  component: AdminRoute,
});

function AdminRoute() {
  const queryClient = useQueryClient();
  const router = useRouter();

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;
    void import("@/integrations/supabase/client").then(({ supabase }) => {
      if (cancelled) return;
      const { data } = supabase.auth.onAuthStateChange((event, session) => {
        if (event !== "SIGNED_IN" && event !== "SIGNED_OUT" && event !== "USER_UPDATED") return;
        void router.invalidate();
        if (session) void queryClient.invalidateQueries();
      });
      unsubscribe = () => data.subscription.unsubscribe();
    }).catch((error) => console.error("Could not listen for admin sign-in changes", error));
    return () => {
      cancelled = true;
      unsubscribe?.();
    };
  }, [queryClient, router]);

  return <Outlet />;
}
