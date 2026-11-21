import { createFileRoute } from "@tanstack/react-router";
import { EcommerceBuyerGuide } from "@/components/ecommerce-buyer-guide";
import { SiteHeader } from "@/components/site-header";
import { ecommerceBuyerGuide as guide } from "@/lib/ecommerce-buyer-guide";
import { BUSINESS_ID, SITE_URL, publicPageSchema } from "@/lib/site-identity";

const url = SITE_URL + guide.path;
const image = SITE_URL + guide.image;

export const Route = createFileRoute("/blog/ecommerce-website-development-india-guide")({
  head: () => ({
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title: "Ecommerce Website Development in India | 10-Step Guide" },
      { name: "description", content: guide.description },
      { property: "og:type", content: "article" },
      { property: "og:title", content: guide.title },
      { property: "og:description", content: guide.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: guide.imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [...publicPageSchema(guide.path, guide.title, guide.description), {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": url + "#article",
        headline: guide.title,
        description: guide.description,
        mainEntityOfPage: url,
        image,
        inLanguage: "en-IN",
        author: { "@id": BUSINESS_ID },
        publisher: { "@id": BUSINESS_ID },
      }),
    }],
  }),
  component: () => <><SiteHeader /><main><EcommerceBuyerGuide /></main></>,
});
