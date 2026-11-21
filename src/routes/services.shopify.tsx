import { ServicePlanning } from "@/components/service-planning";
import { servicePlans } from "@/lib/service-planning";
import { createFileRoute } from "@tanstack/react-router";

import { LatestBlogPosts } from "@/components/latest-blog-posts";
import { ShopifyPage } from "@/components/shopify-page";
import { servicePageSchema } from "@/lib/schema";
import { getSubpage } from "@/lib/menu-pages";
import { BUSINESS_ID, WEBSITE_ID, SITE_URL } from "@/lib/site-identity";
import { SHOPIFY_DESCRIPTION, SHOPIFY_TITLE, SHOPIFY_URL, shopifyFaqs } from "@/lib/shopify-content";

export const Route = createFileRoute("/services/shopify")({
  head: () => ({
    links: [{ rel: "canonical", href: SHOPIFY_URL }],
    meta: [
      { title: SHOPIFY_TITLE },
      { name: "description", content: SHOPIFY_DESCRIPTION },
      { property: "og:title", content: SHOPIFY_TITLE },
      { property: "og:description", content: SHOPIFY_DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SHOPIFY_URL },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: new URL(servicePlans.shopify.image, SITE_URL).href },
      { name: "twitter:image", content: new URL(servicePlans.shopify.image, SITE_URL).href },
    ],
    scripts: [
      ...servicePageSchema("services", "Services", "shopify", getSubpage("services", "shopify")),
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          "@id": `${SHOPIFY_URL}#faq`,
          url: SHOPIFY_URL,
          inLanguage: "en-IN",
          isPartOf: { "@id": WEBSITE_ID },
          about: { "@id": BUSINESS_ID },
          mainEntity: shopifyFaqs.map(([name, text]) => ({
            "@type": "Question",
            name,
            acceptedAnswer: { "@type": "Answer", text },
          })),
        }),
      },
    ],
  }),
  component: () => (
    <>
      <ShopifyPage />
      <ServicePlanning plan={servicePlans.shopify} />
      <LatestBlogPosts />
    </>
  ),
});
