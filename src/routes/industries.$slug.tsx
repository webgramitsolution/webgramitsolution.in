import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { getSubpage } from "@/lib/menu-pages";
import { publicPageSchema, SITE_URL } from "@/lib/site-identity";

const searchTitles: Record<string, string> = {
  manufacturing: "B2B Portal Development for Manufacturers in India",
  retail: "Retail Ecommerce Website Development in India",
  wholesale: "Wholesale Ordering Portal Development in India",
  furniture: "Furniture Ecommerce Website Development in India",
  fashion: "Fashion Ecommerce Website Development in India",
  electronics: "Electronics Ecommerce Website Development in India",
  "building-materials": "B2B Websites for Building Material Suppliers in India",
};

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const page = getSubpage("industries", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const path = `/industries/${params.slug}`;
    const title = `${searchTitles[params.slug]} | Webgram`;
    const description = loaderData.description;
    return {
      links: [{ rel: "canonical", href: `${SITE_URL}${path}` }],
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}${path}` },
        { property: "og:type", content: "website" },
      ],
      scripts: publicPageSchema(path, title, description),
    };
  },
  component: IndustriesPage,
});

function IndustriesPage() {
  return <SubpageTemplate sectionLabel="Industries" page={Route.useLoaderData()} />;
}
