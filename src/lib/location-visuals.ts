import type { ServiceLocation } from "./locations";

const images: Record<string, readonly [file: string, alt: string, size: number]> = {
  delhi: ["delhi", "Illustration of a retailer packing ecommerce orders", 504],
  noida: ["noida", "Illustration of a developer working in a software office", 504],
  faridabad: ["faridabad", "Illustration of an industrial supplier checking electrical stock", 504],
  gurugram: ["gurugram", "Illustration of office towers", 504],
  "delhi-ncr": [
    "delhi-ncr",
    "Illustration of wholesale staff reviewing inventory on a laptop",
    504,
  ],
  "south-delhi": ["south-delhi", "Illustration of a boutique owner working on a laptop", 504],
  ludhiana: [
    "ludhiana-engineering",
    "Illustration of an engineer preparing an online catalogue in a workshop",
    760,
  ],
  "greater-kailash": [
    "greater-kailash",
    "Illustration of fashion boutique owner preparing a customer order",
    356,
  ],
  "hauz-khas": ["hauz-khas", "Illustration of gallery curator reviewing a printed catalogue", 356],
  saket: ["saket", "Illustration of retailer packing an order at a shopping centre", 356],
  "vasant-kunj": [
    "vasant-kunj",
    "Illustration of home lighting retailer reviewing a display sample",
    356,
  ],
  "green-park": [
    "green-park",
    "Illustration of clinic receptionist arranging an appointment by phone",
    356,
  ],
  "malviya-nagar": [
    "malviya-nagar",
    "Illustration of caf\u00e9 owner preparing takeaway orders",
    356,
  ],
  "new-friends-colony": [
    "new-friends-colony",
    "Illustration of hospitality manager reviewing a booking on a laptop",
    356,
  ],
  "panchsheel-park": [
    "panchsheel-park",
    "Illustration of architect examining a scale model in a design studio",
    356,
  ],
  "connaught-place": [
    "connaught-place",
    "Illustration of business professional using a laptop beside a colonnade",
    356,
  ],
  chanakyapuri: [
    "chanakyapuri",
    "Illustration of professional reviewing documents at a modern office",
    356,
  ],
  "vasant-vihar": [
    "vasant-vihar",
    "Illustration of apparel shop owner checking a garment at a desk",
    356,
  ],
  "jor-bagh": ["jor-bagh", "Illustration of designer reviewing material samples in a studio", 356],
  "lajpat-nagar": [
    "lajpat-nagar",
    "Illustration of apparel retailer organising fabric and customer orders",
    356,
  ],
  "nehru-place": [
    "nehru-place",
    "Illustration of computer parts retailer checking merchandise at a counter",
    356,
  ],
  janakpuri: [
    "janakpuri",
    "Illustration of medical practice receptionist working at a computer",
    356,
  ],
  "west-delhi": [
    "west-delhi",
    "Illustration of showroom consultant checking a product enquiry",
    356,
  ],
  shahdara: ["shahdara", "Illustration of wholesale textile supplier checking inventory", 356],
  dwarka: ["dwarka", "Illustration of neighbourhood store worker at a pickup counter", 356],
  "geetanjali-enclave": [
    "geetanjali-enclave",
    "Illustration of architect reviewing plans and a small building model",
    356,
  ],
  chhatarpur: ["chhatarpur", "Illustration of event planner working at a garden venue", 356],
  "rajouri-garden": [
    "rajouri-garden",
    "Illustration of furniture showroom professional reviewing design samples",
    356,
  ],
  "okhla-industrial-area": [
    "okhla-industrial-area",
    "Illustration of electronics supplier scanning stock at a workbench",
    356,
  ],
  "naraina-industrial-area": [
    "naraina-industrial-area",
    "Illustration of fabrication worker inspecting a machined steel component",
    356,
  ],
  "mayapuri-industrial-area": [
    "mayapuri-industrial-area",
    "Illustration of auto parts supplier checking a component against inventory",
    356,
  ],
  "wazirpur-industrial-area": [
    "wazirpur-industrial-area",
    "Illustration of metalware supplier checking shelves of stainless steel products",
    356,
  ],
  "bawana-industrial-area": [
    "bawana-industrial-area",
    "Illustration of packaging worker preparing cartons at a production line",
    356,
  ],
  "narela-industrial-area": [
    "narela-industrial-area",
    "Illustration of warehouse worker using a tablet beside stock racks",
    356,
  ],
  "patparganj-industrial-area": [
    "patparganj-industrial-area",
    "Illustration of industrial distributor checking packaged electrical stock",
    356,
  ],
  "kirti-nagar-industrial-area": [
    "kirti-nagar-industrial-area",
    "Illustration of furniture workshop technician examining a wooden frame",
    356,
  ],
  "jhilmil-industrial-area": [
    "jhilmil-industrial-area",
    "Illustration of electrical supplies worker checking items on storage racks",
    356,
  ],
  "mangolpuri-industrial-area": [
    "mangolpuri-industrial-area",
    "Illustration of industrial wholesaler reviewing a parts catalogue",
    356,
  ],
  "badli-industrial-area": [
    "badli-industrial-area",
    "Illustration of technician working on an industrial motor assembly",
    356,
  ],
  "udyog-nagar": [
    "udyog-nagar",
    "Illustration of building materials supplier examining a panel sample",
    356,
  ],
  gujarat: [
    "gujarat",
    "Illustration of export warehouse manager reviewing stock and shipments",
    356,
  ],
  ahmedabad: ["ahmedabad", "Illustration of textile showroom owner presenting folded stock", 356],
  surat: ["surat", "Illustration of textile team inspecting garments at a production counter", 356],
  vadodara: ["vadodara", "Illustration of industrial engineer cataloguing process equipment", 356],
  rajkot: ["rajkot", "Illustration of workshop engineer beside cast metal parts", 356],
  india: [
    "india",
    "Illustration of ecommerce team packing customer orders in a fulfilment space",
    356,
  ],
  "defence-colony": [
    "defence-colony",
    "Illustration of consultant reviewing a project on a desktop screen",
    356,
  ],
};

const regionalFallback = {
  "delhi-neighbourhoods": [
    "delhi-neighbourhood",
    "Illustration of a laptop in a boutique workspace",
    760,
  ],
  "delhi-industrial": [
    "delhi-industrial",
    "Illustration of a tablet catalogue in a manufacturing workshop",
    760,
  ],
  india: ["gujarat-commerce", "Illustration of a textile and trade warehouse", 760],
} as const;

export function locationVisual(location: ServiceLocation) {
  const [file, alt, size] =
    images[location.slug] ?? regionalFallback[location.zone ?? "delhi-neighbourhoods"];
  return { src: `/images/locations/${file}.webp`, alt, size };
}
