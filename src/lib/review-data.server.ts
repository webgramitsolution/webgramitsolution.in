import { rows } from "./mysql.server";
import type { Database } from "@/integrations/supabase/types";

// Published reviews change rarely, so the server reuses them for a few minutes
// instead of asking the database on every homepage visit.
const REVIEW_CACHE_MS = 5 * 60 * 1000;
let reviewCache: { at: number; rows: unknown } | undefined;

export async function getPublishedReviews() {
  if (reviewCache && Date.now() - reviewCache.at < REVIEW_CACHE_MS) {
    return reviewCache.rows as Awaited<ReturnType<typeof loadPublishedReviews>>;
  }
  const rows = await loadPublishedReviews();
  reviewCache = { at: Date.now(), rows };
  return rows;
}

async function loadPublishedReviews() {
  type Review = Database["public"]["Tables"]["homepage_reviews"]["Row"];
  const data = await rows<Pick<Review, "id" | "customer_name" | "customer_role" | "company_name" | "review_text" | "rating" | "avatar_url" | "display_order">>(
    "SELECT id,customer_name,customer_role,company_name,review_text,rating,avatar_url,display_order FROM homepage_reviews WHERE is_published = TRUE ORDER BY display_order, created_at DESC",
  );
  // Only show detailed, genuine-looking reviews (no one- or two-line reviews).
  return data.filter((review) => {
    const text = (review.review_text ?? "").trim();
    return text.length >= 140 && text.split(/\s+/).length >= 25;
  });
}

export function invalidateReviewCache() {
  reviewCache = undefined;
}
