import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const pingSearchEngines = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d) => z.object({ urls: z.array(z.string().url()).min(1).max(100), requestId: z.string().uuid().optional() }).parse(d))
  .handler(async ({ data, context }) => {
    const { data: isAdmin } = await context.supabase.rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin) throw new Error("Forbidden");
    const { submitGoogle, submitIndexNow, isOwnUrl } = await import("./indexing.server");
    const own = data.urls.filter(isOwnUrl);
    let google: { url: string; ok: boolean; status: number; message: string }[] = [];
    let googleError = "";
    try { if (own.length) google = await submitGoogle(own); } catch (e) { googleError = e instanceof Error ? e.message : "Google failed"; }
    const bing = await submitIndexNow(data.urls).catch(() => ({ ok: false, status: 0 }));
    if (data.requestId && (google.every((g) => g.ok) || bing.ok)) {
      await context.supabase.from("indexing_requests").update({ status: "done" } as never).eq("id", data.requestId);
    }
    return { google, googleError, skippedForGoogle: data.urls.length - own.length, bing };
  });
