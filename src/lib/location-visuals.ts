import type { ServiceLocation } from "./locations";

const namedImages: Record<string, string> = {
  delhi: "Illustration of a Delhi retailer packing ecommerce orders",
  noida: "Illustration of a developer working in a Noida software office",
  faridabad: "Illustration of an industrial supplier checking electrical stock",
  gurugram: "Illustration of office towers in Gurugram",
  "delhi-ncr": "Illustration of wholesale staff reviewing inventory on a laptop",
  "south-delhi": "Illustration of a Delhi boutique owner working on a laptop",
};

const regionalImages = {
  "delhi-neighbourhoods": ["delhi-neighbourhood", "Illustration of a laptop in a Delhi boutique workspace"],
  "delhi-industrial": ["delhi-industrial", "Illustration of a tablet catalogue in a Delhi manufacturing workshop"],
  india: ["gujarat-commerce", "Illustration of an Indian textile and trade warehouse"],
} as const;

export function locationVisual(location: ServiceLocation) {
  const [file, alt] = location.slug === "ludhiana"
    ? ["ludhiana-engineering", "Illustration of an engineer working on a catalogue in a Ludhiana workshop"]
    : location.zone
      ? regionalImages[location.zone]
      : [location.slug, namedImages[location.slug]];
  return { src: `/images/locations/${file}.webp`, alt, size: location.zone ? 760 : 504 };
}
