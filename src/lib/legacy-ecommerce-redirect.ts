export const LEGACY_ECOMMERCE_PATH =
  "/boost-your-business-with-webgram-it-solution-the-leading-ecommerce-website-development-company-in-delhi";
export const ECOMMERCE_ARTICLE_URL =
  "https://webgramitsolution.in/blog/professional-ecommerce-website-development-company-in-delhi-ncr-build-your-online-store-with-webgram-it-solution";

export function legacyEcommerceRedirect(request: Request): Response {
  const destination = new URL(ECOMMERCE_ARTICLE_URL);
  destination.search = new URL(request.url).search;
  return new Response(null, {
    status: 301,
    headers: { Location: destination.href },
  });
}
