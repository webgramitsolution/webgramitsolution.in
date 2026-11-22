import { createFileRoute } from "@tanstack/react-router";
import { IndustriesDirectory } from "@/components/industry-pages";
import { industries, industriesDirectory as directory, industryImage } from "@/lib/industry-page-data";
import { publicPageSchema, SITE_URL } from "@/lib/site-identity";

const url = SITE_URL + directory.path;
const image = SITE_URL + industryImage("directory") + ".webp";

export const Route = createFileRoute("/industries/")({
  head: () => ({
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title: directory.title },
      { name: "description", content: directory.description },
      { property: "og:title", content: directory.title },
      { property: "og:description", content: directory.description },
      { property: "og:url", content: url },
      { property: "og:type", content: "website" },
      { property: "og:image", content: image },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [...publicPageSchema(directory.path, directory.title, directory.description, "CollectionPage"), {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "ItemList",
        "@id": url + "#industry-directory",
        itemListElement: industries.map(({ slug, page }, index) => ({
          "@type": "ListItem", position: index + 1, name: page.title, url: `${url}/${slug}`,
        })),
      }),
    }],
  }),
  component: IndustriesDirectory,
});
