import { createFileRoute } from "@tanstack/react-router";

import { LocationsHub } from "@/components/location-page";

const URL = "https://webgramitsolution.in/locations";
const TITLE = "Website Development Locations in Delhi NCR | Webgram IT Solution";
const DESCRIPTION = "Website and ecommerce development for Delhi, South Delhi, Noida, Gurugram, Faridabad and Delhi NCR businesses by Webgram IT Solution, New Delhi.";

export const Route = createFileRoute("/locations/")({
  head: () => ({
    links: [{ rel: "canonical", href: URL }],
    meta: [
      { title: TITLE },
      { name: "description", content: DESCRIPTION },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESCRIPTION },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:image", content: "https://webgramitsolution.in/images/locations/delhi-ncr.webp" },
    ],
    scripts: [{ type: "application/ld+json", children: JSON.stringify({ "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: "https://webgramitsolution.in/" }, { "@type": "ListItem", position: 2, name: "Locations", item: URL }] }) }],
  }),
  component: LocationsHub,
});
