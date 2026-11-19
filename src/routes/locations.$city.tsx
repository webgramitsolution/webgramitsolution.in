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
    const url = `${BASE}/locations/${params.city}`;
    return {
      links: [{ rel: "canonical", href: url }],
      meta: [
        { title: loaderData.title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: loaderData.title },
        { property: "og:description", content: loaderData.description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
      ],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Service", name: loaderData.keyword, serviceType: "Website & Ecommerce Development", areaServed: { "@type": "City", name: loaderData.city }, provider: { "@id": `${BASE}/#business` }, url },
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
