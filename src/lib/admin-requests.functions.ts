import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireAdmin } from "./admin-auth.functions";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
type Review = Tables["homepage_reviews"]["Row"];
const uuid = z.string().uuid();
const statuses = z.discriminatedUnion("queue", [
  z.object({ queue: z.literal("enquiries"), status: z.enum(["new", "contacted", "closed"]), id: uuid }),
  z.object({ queue: z.literal("indexing"), status: z.enum(["pending", "done", "rejected"]), id: uuid }),
  z.object({ queue: z.literal("tickets"), status: z.enum(["open", "closed"]), id: uuid }),
]);
const requestTables = { enquiries: "enquiries", indexing: "indexing_requests", tickets: "support_tickets" } as const;
const reviewInput = z.object({
  id: uuid.nullable(),
  customer_name: z.string().trim().min(1).max(255),
  customer_role: z.string().trim().max(255),
  company_name: z.string().trim().max(255),
  review_text: z.string().trim().min(20).max(5000),
  rating: z.number().int().min(1).max(5),
  is_published: z.boolean(),
  display_order: z.number().int().min(0).max(100000),
});

export const getAdminRequests = createServerFn({ method: "GET" }).middleware([requireAdmin]).handler(async () => {
  const { rows } = await import("./mysql.server");
  const [enquiries, indexing, tickets, reviews] = await Promise.all([
    rows<Tables["enquiries"]["Row"]>("SELECT * FROM enquiries ORDER BY created_at DESC"),
    rows<Tables["indexing_requests"]["Row"]>("SELECT * FROM indexing_requests ORDER BY created_at DESC"),
    rows<Tables["support_tickets"]["Row"]>("SELECT * FROM support_tickets ORDER BY created_at DESC"),
    rows<Review>("SELECT * FROM homepage_reviews ORDER BY display_order, created_at DESC"),
  ]);
  return { enquiries, indexing, tickets, reviews };
});

export const updateRequestStatus = createServerFn({ method: "POST" }).middleware([requireAdmin])
  .inputValidator((input: unknown) => statuses.parse(input))
  .handler(async ({ data }) => {
    const { write } = await import("./mysql.server");
    await write(`UPDATE ${requestTables[data.queue]} SET status = ? WHERE id = ?`, [data.status, data.id]);
  });

export const saveHomepageReview = createServerFn({ method: "POST" }).middleware([requireAdmin])
  .inputValidator((input: unknown) => reviewInput.parse(input))
  .handler(async ({ data }) => {
    const { saveRecord } = await import("./mysql.server");
    const { id, ...review } = data;
    const result = await saveRecord("homepage_reviews", id ?? crypto.randomUUID(), { ...review, updated_at: new Date() }, Boolean(id));
    if (!result.affectedRows) throw new Error("Review not found.");
    const { invalidateReviewCache } = await import("./review-data.server");
    invalidateReviewCache();
  });

export const deleteHomepageReview = createServerFn({ method: "POST" }).middleware([requireAdmin])
  .inputValidator((input: unknown) => z.object({ id: uuid }).parse(input))
  .handler(async ({ data }) => {
    const { write } = await import("./mysql.server");
    await write("DELETE FROM homepage_reviews WHERE id = ?", [data.id]);
    const { invalidateReviewCache } = await import("./review-data.server");
    invalidateReviewCache();
  });
