import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "./admin-auth.functions";

export const pingSearchEngines = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d) => z.object({ urls: z.array(z.string().url()).min(1).max(100), requestId: z.string().uuid().optional() }).parse(d))
  .handler(async ({ data }) => {
    const { submitGoogle, submitIndexNow, isOwnUrl } = await import("./indexing.server");
    const own = data.urls.filter(isOwnUrl);
    let google: { url: string; ok: boolean; status: number; message: string }[] = [];
    let googleError = "";
    try { if (own.length) google = await submitGoogle(own); } catch (e) { googleError = e instanceof Error ? e.message : "Google failed"; }
    const bing = await submitIndexNow(data.urls).catch(() => ({ ok: false, status: 0 }));
    if (data.requestId && ((google.length > 0 && google.every((g) => g.ok)) || bing.ok)) {
      const { write } = await import("./mysql.server");
      await write("UPDATE indexing_requests SET status = 'done' WHERE id = ?", [data.requestId]);
    }
    return { google, googleError, skippedForGoogle: data.urls.length - own.length, bing };
  });
