import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "./admin-auth.functions";

export const submitToIndexNow = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((d) => z.object({ urls: z.array(z.string().url()).min(1).max(100), requestId: z.string().uuid().optional() }).parse(d))
  .handler(async ({ data }) => {
    const { submitIndexNow, isOwnUrl } = await import("./indexing.server");
    if (!data.urls.every(isOwnUrl)) {
      throw new Error("Use HTTPS URLs on webgramitsolution.in.");
    }
    const result = await submitIndexNow(data.urls);
    if (data.requestId && result.ok) {
      const { write } = await import("./mysql.server");
      await write("UPDATE indexing_requests SET status = 'done' WHERE id = ?", [data.requestId]);
    }
    return result;
  });
