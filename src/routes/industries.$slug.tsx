import { createFileRoute, notFound } from "@tanstack/react-router";
import { IndustryDetail } from "@/components/industry-pages";
import { getIndustry, industryImage } from "@/lib/industry-page-data";
import { BUSINESS_ID, publicPageSchema, SITE_URL } from "@/lib/site-identity";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const industry = getIndustry(params.slug);
    if (!industry) throw notFound();
    return industry;
  },
  head: ({ loaderData: industry }) => {
    if (!industry) return {};
    const path = `/industries/${industry.slug}`;
    const url = SITE_URL + path;
    const title = `${industry.heading} | Webgram`;
    const image = SITE_URL + industryImage(industry.slug) + ".webp";
    const [question, answer] = industry.faq;
    return {
      links: [{ rel: "canonical", href: url }],
      meta: [
        { title },
        { name: "description", content: industry.description },
        { property: "og:title", content: title },
        { property: "og:description", content: industry.description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:image", content: image },
        { property: "og:image:alt", content: industry.alt },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "twitter:image", content: image },
      ],
      scripts: [...publicPageSchema(path, title, industry.description), {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Service", name: industry.heading, description: industry.description, url, image, provider: { "@id": BUSINESS_ID }, areaServed: { "@type": "Country", name: "India" } },
            { "@type": "FAQPage", "@id": url + "#faq", mainEntity: [{ "@type": "Question", name: question, acceptedAnswer: { "@type": "Answer", text: answer } }] },
            { "@type": "BreadcrumbList", itemListElement: ["Home", "Industries", industry.page.title].map((name, index) => ({ "@type": "ListItem", position: index + 1, name, item: [SITE_URL + "/", SITE_URL + "/industries", url][index] })) },
          ],
        }),
      }],
    };
  },
  component: Page,
});

function Page() {
  const industry = Route.useLoaderData();
  return <IndustryDetail industry={industry} />;
}
