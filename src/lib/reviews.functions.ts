import { createClient } from "@supabase/supabase-js";
import { createServerFn } from "@tanstack/react-start";

import type { Database } from "@/integrations/supabase/types";

// Published reviews change rarely, so the server reuses them for a few minutes
// instead of asking the database on every homepage visit.
const REVIEW_CACHE_MS = 5 * 60 * 1000;
let reviewCache: { at: number; rows: unknown } | undefined;

export const getPublishedHomepageReviews = createServerFn({ method: "GET" }).handler(async () => {
  if (reviewCache && Date.now() - reviewCache.at < REVIEW_CACHE_MS) {
    return reviewCache.rows as Awaited<ReturnType<typeof loadPublishedReviews>>;
  }
  const rows = await loadPublishedReviews();
  reviewCache = { at: Date.now(), rows };
  return rows;
});

async function loadPublishedReviews() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Reviews service is not configured.");

  const client = createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
  const { data, error } = await client
    .from("homepage_reviews")
    .select("id,customer_name,customer_role,company_name,review_text,rating,avatar_url,display_order")
    .eq("is_published", true)
    .order("display_order")
    .order("created_at", { ascending: false });
  if (error) throw error;
  // Only show detailed, genuine-looking reviews (no one- or two-line reviews).
  return (data ?? []).filter((review) => {
    const text = (review.review_text ?? "").trim();
    return text.length >= 140 && text.split(/\s+/).length >= 25;
  });
}
