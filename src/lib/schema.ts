import { BUSINESS_ID, SITE_URL } from "./site-identity";

/** Describe visible services without generating hidden FAQ or fixed-price claims. */
export function servicePageSchema(
  section: string,
  _sectionLabel: string,
  slug: string,
  page: { title: string; description: string; points: string[] } | undefined,
) {
  if (!page) return [];
  const url = `${SITE_URL}/${section}/${slug}`;
  return [
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Service",
        "@id": `${url}#service`,
        name: page.title,
        description: page.description,
        url,
        serviceType: page.title,
        areaServed: { "@type": "Country", name: "India" },
        provider: { "@id": BUSINESS_ID },
        hasOfferCatalog: {
          "@type": "OfferCatalog",
          name: page.title,
          itemListElement: page.points.map((p) => ({
            "@type": "Offer",
            itemOffered: { "@type": "Service", name: p },
          })),
        },
      }),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: `${SITE_URL}/` },
          { "@type": "ListItem", position: 2, name: page.title, item: url },
        ],
      }),
    },
  ];
}
