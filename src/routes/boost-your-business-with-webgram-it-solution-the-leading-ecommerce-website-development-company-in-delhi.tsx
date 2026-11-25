import { createFileRoute, redirect } from "@tanstack/react-router";
import { ECOMMERCE_ARTICLE_URL, legacyEcommerceRedirect } from "@/lib/legacy-ecommerce-redirect";

export const Route = createFileRoute(
  "/boost-your-business-with-webgram-it-solution-the-leading-ecommerce-website-development-company-in-delhi",
)({
  server: {
    handlers: {
      GET: ({ request }) => legacyEcommerceRedirect(request),
      HEAD: ({ request }) => legacyEcommerceRedirect(request),
    },
  },
  beforeLoad: ({ location }) => {
    throw redirect({
      href: `${ECOMMERCE_ARTICLE_URL}${location.searchStr}${location.hash ? `#${location.hash}` : ""}`,
      statusCode: 301,
      replace: true,
    });
  },
});
