import { createServerFn } from "@tanstack/react-start";

export const getPublishedHomepageReviews = createServerFn({ method: "GET" }).handler(async () => {
  const { getPublishedReviews } = await import("./review-data.server");
  return getPublishedReviews();
});
