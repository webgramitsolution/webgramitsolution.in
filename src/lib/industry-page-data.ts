import { industryContent } from "./industry-content";
import { menuSections } from "./menu-pages";

const profiles = {
  manufacturing: {
    hero: ["Dealer & Distributor Portals", "for Manufacturers"],
    alt: "Illustration of a manufacturing engineer reviewing precision components with a tablet",
    workflow: "A distributor signs in, compares approved specifications and adds standard parts to a bulk order. A made-to-order item goes to the sales team as an RFQ, with its drawing, quantity and delivery requirements attached.",
    faq: ["Can a manufacturing portal show different prices for different dealers?", "Yes. Account-specific price lists can be part of the build. Agree who approves dealer accounts, where contract prices are maintained and which price rule applies when a quote and a quantity tier overlap."],
    related: ["distribution", "wholesale", "building-materials"],
  },
  retail: {
    hero: ["Retail Ecommerce Websites", "for Shops and Store Networks"],
    alt: "Illustration of a shop owner packing a collection order at a retail counter",
    workflow: "A shopper selects a product, checks availability for their PIN code and chooses delivery or collection. The assigned branch receives the order and marks it ready when stock has been checked.",
    faq: ["Can an online store support pickup at more than one branch?", "Yes. Decide which products and branches offer pickup, how the store confirms stock and when the customer should receive a collection message."],
    related: ["fashion", "furniture", "electronics"],
  },
  wholesale: {
    hero: ["Wholesale Ordering Websites", "and Trade Accounts"],
    alt: "Illustration of wholesale staff checking packaged products and trade quantities",
    workflow: "An approved buyer reorders by SKU or from order history. The portal verifies pack quantities and contract prices, then sends an exception to sales when a credit limit or unusual quantity needs review.",
    faq: ["Do buyers have to see wholesale prices before logging in?", "No. A public catalogue can provide product specifications while showing trade prices, order history and credit terms only to approved buyers."],
    related: ["distribution", "manufacturing", "building-materials"],
  },
  furniture: {
    hero: ["Furniture & Home Décor", "Ecommerce Stores"],
    alt: "Illustration of a furniture specialist presenting fabric and wood finishes in a showroom",
    workflow: "A shopper checks dimensions and compares finish options. A stocked item goes to checkout, while a made-to-order configuration prompts an enquiry with measurements, requested finish and a delivery PIN code.",
    faq: ["Can a furniture website combine direct sales and quotation requests?", "Yes. Standard products can be shoppable and custom pieces can accept a quote request. Define which options change the price, lead time or installation requirement before build."],
    related: ["retail", "building-materials", "fashion"],
  },
  fashion: {
    hero: ["Fashion Ecommerce Websites", "for Apparel & Lifestyle Brands"],
    alt: "Illustration of a fashion merchandiser checking garments on a clothing rail",
    workflow: "A shopper opens a collection on mobile, checks garment measurements and selects a stocked colour and size. The order reflects the selected variant and points to the applicable exchange policy.",
    faq: ["How should size guides work on a fashion ecommerce site?", "Place the size guide next to the size selector and show measurements relevant to that product. Agree whether measurements describe the garment or the wearer so shoppers can compare them correctly."],
    related: ["retail", "beauty", "wholesale"],
  },
  electronics: {
    hero: ["Electronics Ecommerce Websites", "with Product Comparisons"],
    alt: "Illustration of an electronics retailer comparing devices at a technology counter",
    workflow: "A shopper filters a category by technical requirements, compares two models and checks accessory compatibility. The product page shows what comes in the box and the relevant warranty and delivery information.",
    faq: ["Can electronics products be compared by technical specifications?", "Yes. Use consistent fields for each product type, such as capacity, connector type and supported accessories. Decide which differences matter to buyers before importing the catalogue."],
    related: ["retail", "distribution", "manufacturing"],
  },
  beauty: {
    hero: ["Beauty & Personal Care", "Ecommerce Websites"],
    alt: "Illustration of a beauty brand founder arranging skincare product samples",
    workflow: "A shopper reads ingredient and usage information, compares sizes and chooses a product or routine bundle. When they reorder, the catalogue shows whether the same product and size are still available.",
    faq: ["Can a beauty store sell bundles and individual products from the same stock?", "Yes, if your inventory model supports component-level stock. Define which products each bundle uses and how their availability is calculated before offering the bundle."],
    related: ["fashion", "retail", "wholesale"],
  },
  distribution: {
    hero: ["Inventory & Ordering Portals", "for Distributors"],
    alt: "Illustration of a distribution manager scanning cartons in a warehouse",
    workflow: "A reseller submits an order, the portal identifies a fulfilment branch and stock is reserved in the agreed system. An unavailable line stays visible to the order team so they can propose a partial shipment or revised delivery date.",
    faq: ["Can a distributor portal show stock from multiple warehouses?", "Yes, provided the source data is reliable. Agree the refresh frequency, how reservations affect available quantity and when staff must intervene before committing to a delivery date."],
    related: ["wholesale", "manufacturing", "electronics"],
  },
  "building-materials": {
    hero: ["B2B Catalogue Websites", "for Building Material Suppliers"],
    alt: "Illustration of a supplier examining tile, stone and concrete samples",
    workflow: "A contractor compares product specifications and submits a project enquiry with the required quantity, site PIN code and unloading instructions. The supplier checks stock and delivery conditions before confirming a quote.",
    faq: ["Can building material orders use different units and freight quotes?", "Yes. Define the units used for pricing and stock, such as pieces, bags or square metres. Capture site and unloading details when the delivery charge needs a manual quote."],
    related: ["manufacturing", "distribution", "furniture"],
  },
} as const satisfies Record<keyof typeof industryContent, {
  hero: readonly [string, string];
  alt: string;
  workflow: string;
  faq: readonly [string, string];
  related: readonly (keyof typeof industryContent)[];
}>;

export type IndustrySlug = keyof typeof industryContent;

export function getIndustry(slug: string) {
  if (!Object.hasOwn(industryContent, slug)) return undefined;
  const key = slug as IndustrySlug;
  const page = menuSections.industries.pages[key];
  if (!page) return undefined;
  return { slug: key, page, ...industryContent[key], ...profiles[key] };
}

export const industries = Object.keys(menuSections.industries.pages).flatMap((slug) => {
  const industry = getIndustry(slug);
  return industry ? [industry] : [];
});

export type Industry = NonNullable<ReturnType<typeof getIndustry>>;

export const industriesDirectory = {
  path: "/industries",
  title: "Industries We Serve | Ecommerce and B2B Portals | Webgram",
  description: "Explore website development, ecommerce storefronts and B2B portals for Indian manufacturers, retailers, wholesalers, distributors and D2C brands.",
} as const;

export const industryImage = (slug: IndustrySlug | "directory") => `/images/industries/${slug}`;
