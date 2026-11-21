import { localSearch } from "@/lib/location-search";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { LocationPage } from "@/components/location-page";
import { getLocation } from "@/lib/locations";

const BASE = "https://webgramitsolution.in";

export const Route = createFileRoute("/locations/$city")({
  loader: ({ params }) => {
    const location = getLocation(params.city);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Location not found" }, { name: "robots", content: "noindex" }] };
    const description = localSearch[params.city]?.description ?? loaderData.description;
    const url = `${BASE}/locations/${params.city}`;
    return {
      links: [{ rel: "canonical", href: url }],
      meta: [
        { title: loaderData.title },
        { name: "description", content: description },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        { property: "og:image", content: `${BASE}/images/locations/${params.city}.webp` },
        { name: "twitter:image", content: `${BASE}/images/locations/${params.city}.webp` },
      ],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Service", name: loaderData.keyword, serviceType: "Website & Ecommerce Development", description, areaServed: { "@type": ["delhi-ncr", "south-delhi"].includes(params.city) ? "Place" : "City", name: loaderData.city, containedInPlace: { "@type": "Country", name: "India" } }, provider: { "@id": `${BASE}/#business` }, url },
            { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "Home", item: `${BASE}/` }, { "@type": "ListItem", position: 2, name: "Locations", item: `${BASE}/locations` }, { "@type": "ListItem", position: 3, name: loaderData.city, item: url }] },
          ],
        }),
      }],
    };
  },
  component: Page,
});

function Page() {
  return <LocationPage location={Route.useLoaderData()} />;
}
