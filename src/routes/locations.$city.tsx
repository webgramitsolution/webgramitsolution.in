import { localSearch, locationAnswers } from "@/lib/location-search";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { LocationPage } from "@/components/location-page";
import { locationVisual } from "@/lib/location-visuals";
import { getLocation } from "@/lib/locations";

const BASE = "https://webgramitsolution.in";

export const Route = createFileRoute("/locations/$city")({
  loader: ({ params, location: requestLocation }) => {
    if (params.city === "gurgaon") throw redirect({ href: `/locations/gurugram${requestLocation.searchStr}`, statusCode: 301 });
    const location = getLocation(params.city);
    if (!location) throw notFound();
    return location;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return { meta: [{ title: "Location not found" }, { name: "robots", content: "noindex" }] };
    const description = localSearch[params.city]?.description ?? loaderData.description;
    const faqs = locationAnswers(loaderData);
    const visual = locationVisual(loaderData);
    const image = BASE + visual.src;
    const areaType = loaderData.place ?? (["delhi-ncr", "south-delhi"].includes(params.city) ? "Place" : "City");
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
        { property: "og:image", content: image },
        { property: "og:image:alt", content: visual.alt },
        { name: "twitter:image", content: image },
      ],
      scripts: [{
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            { "@type": "Service", name: loaderData.keyword, serviceType: "Website & Ecommerce Development", description, areaServed: { "@type": areaType, name: loaderData.city, ...(areaType === "Country" ? {} : { containedInPlace: { "@type": "Country", name: "India" } }) }, provider: { "@id": `${BASE}/#business` }, image, url },
            ...(faqs.length ? [{
              "@type": "FAQPage",
              "@id": `${url}#faq`,
              mainEntity: faqs.map(([question, answer]) => ({
                "@type": "Question",
                name: question,
                acceptedAnswer: { "@type": "Answer", text: answer },
              })),
            }] : []),
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
