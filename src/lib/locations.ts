export type ServiceLocation = {
  slug: string;
  city: string;
  keyword: string;
  title: string;
  description: string;
  intro: string;
  areas: string[];
  industries: string[];
  projectFocus?: { title: string; text: string }[];
};

export const locations: ServiceLocation[] = [
  {
    slug: "delhi",
    city: "Delhi",
    keyword: "Ecommerce Website Development Company in Delhi",
    title: "Ecommerce Website Development Company in Delhi | Webgram IT Solution",
    description: "Webgram IT Solution is an ecommerce website development company in Delhi building fast, SEO-ready online stores, WooCommerce shops and custom ecommerce platforms.",
    intro: "From our office in Sangam Vihar, New Delhi, we design and develop ecommerce websites for Delhi retailers, wholesalers and D2C brands — with a focus on fast pages, search-friendly structure and clear checkout.",
    areas: ["Connaught Place", "Karol Bagh", "Chandni Chowk", "Lajpat Nagar", "Dwarka", "Rohini", "Janakpuri", "Laxmi Nagar"],
    industries: ["Fashion & apparel", "Electronics", "Wholesale traders", "Home décor", "Healthcare supplies", "Handicrafts"],
    projectFocus: [
      { title: "Turn a retail catalogue into a shoppable store", text: "For Delhi retailers, the starting point is an organised catalogue: product variants, stock availability, useful filters and clear delivery information. We plan the journey from discovery to checkout around your products rather than a generic template." },
      { title: "Support wholesale and direct orders separately", text: "Businesses selling to both shoppers and trade buyers can use separate account journeys, bulk quantities and quote requests. Decide which prices are public and which require an approved trade login before development begins." },
      { title: "Prepare your launch materials", text: "Bring product photographs, SKU data, payment preferences and delivery rules to the discovery meeting. These inputs help define an achievable launch scope and avoid incomplete product pages." },
    ],
  },
  {
    slug: "noida",
    city: "Noida",
    keyword: "Website Development Company in Noida",
    title: "Website Development Company in Noida | Webgram IT Solution",
    description: "Looking for a website development company in Noida? We build business websites, ecommerce stores and custom web portals for Noida and Greater Noida companies.",
    intro: "We help Noida startups, IT firms, manufacturers and service businesses launch professional websites and ecommerce stores that generate enquiries and sales, with SEO built in from day one.",
    areas: ["Sector 18", "Sector 62", "Sector 63", "Noida Extension", "Greater Noida", "Sector 135"],
    industries: ["IT & SaaS", "Manufacturing", "Education", "Real estate", "Startups", "Professional services"],
    projectFocus: [
      { title: "Make technical services easier to evaluate", text: "For Noida IT and service businesses, we structure service pages around the buyer’s questions: scope, integrations, delivery stages and the next step. Demo and enquiry journeys can differ from a standard shopping checkout." },
      { title: "Connect enquiries to your workflow", text: "Plan the fields your sales team actually needs, the destination for each enquiry and any CRM hand-off. We can scope authenticated portals or API integrations when a brochure website is not enough." },
      { title: "Plan a maintainable first release", text: "For startups, prioritise the pages and journeys needed at launch, then separate future portal features into later releases. Agree who owns content updates and how new services will be added." },
    ],
  },
  {
    slug: "faridabad",
    city: "Faridabad",
    keyword: "Ecommerce Website Developer in Faridabad",
    title: "Ecommerce Website Developer in Faridabad | Webgram IT Solution",
    description: "Hire an experienced ecommerce website developer in Faridabad for WooCommerce stores, B2B catalogues and industrial product websites with clear specifications and enquiry paths.",
    intro: "Faridabad's manufacturers and traders trust us to build product catalogues, B2B ordering websites and online stores — including industrial projects like Adlite Electricals.",
    areas: ["NIT Faridabad", "Sector 15", "Ballabgarh", "Old Faridabad", "Greater Faridabad", "Sector 37"],
    industries: ["Industrial & electrical", "Auto parts", "Manufacturing", "Wholesale", "Retail", "Engineering"],
    projectFocus: [
      { title: "Build a catalogue buyers can compare", text: "Industrial websites need more than attractive product tiles. For Faridabad suppliers, we plan specification tables, model numbers, document downloads and enquiry routes so procurement teams can compare suitable products." },
      { title: "Choose quote requests or online ordering", text: "Custom-priced machinery and bulk electrical supplies may need quote requests instead of immediate checkout. Standard products can support quantity-based ordering; the right approach depends on your pricing and fulfilment rules." },
      { title: "Prepare reliable product information", text: "Collect specifications, unit sizes, stock rules and approved product photographs before catalogue import. Consistent data makes filtering and future catalogue maintenance more useful." },
    ],
  },
  {
    slug: "gurugram",
    city: "Gurugram",
    keyword: "Website Designing Company in Gurgaon",
    title: "Website Designing Company in Gurgaon (Gurugram) | Webgram IT Solution",
    description: "Premium website designing company in Gurgaon creating corporate websites, ecommerce stores and conversion-focused landing pages for Gurugram businesses.",
    intro: "We design modern, mobile-first corporate and ecommerce websites for Gurugram companies — including wholesale ecommerce for My Party Suppliers — focused on brand trust and lead generation.",
    areas: ["Cyber City", "Golf Course Road", "Sohna Road", "Udyog Vihar", "MG Road", "Sector 29"],
    industries: ["Corporate & consulting", "B2B wholesale", "Real estate", "Hospitality", "Startups", "Healthcare"],
    projectFocus: [
      { title: "Give corporate buyers a clear evaluation path", text: "For Gurugram consulting and corporate businesses, we organise capability pages, approved project examples and contact journeys around decision-makers. A clear service scope matters more than decorative claims." },
      { title: "Design for qualified B2B enquiries", text: "Lead forms can collect company context and project requirements without making the first enquiry lengthy. Wholesale businesses may instead need trade accounts, bulk ordering and account-specific pricing." },
      { title: "Keep brand and sales requirements aligned", text: "Start with your approved brand assets, service information and sales process. Agree the pages each audience needs and the measurable actions to review after launch, such as completed enquiries or demo bookings." },
    ],
  },
  {
    slug: "delhi-ncr",
    city: "Delhi NCR",
    keyword: "B2B Ecommerce Website Development Company in Delhi NCR",
    title: "B2B Ecommerce Website Development Company in Delhi NCR | Webgram",
    description: "B2B ecommerce website development company in Delhi NCR building wholesale portals, dealer–distributor ordering, bulk pricing and ERP-ready B2B stores.",
    intro: "We build B2B ecommerce platforms for Delhi NCR manufacturers, distributors and wholesalers — with tiered pricing, bulk orders, quote requests, credit terms and dealer logins.",
    areas: ["Delhi", "Noida", "Gurugram", "Faridabad", "Ghaziabad", "Greater Noida"],
    industries: ["Distributors", "Manufacturers", "Importers", "Wholesale suppliers", "Pharma distribution", "FMCG"],
  },
  {
    slug: "south-delhi",
    city: "South Delhi",
    keyword: "Website Designing Company in South Delhi",
    title: "Website Designing Company in South Delhi | Webgram IT Solution",
    description: "Local website designing company in South Delhi (Sangam Vihar) building business websites, online stores and SEO-ready pages for South Delhi brands.",
    intro: "Based in Sangam Vihar, we are a South Delhi website designing company you can meet in person — building business websites and ecommerce stores for local shops, clinics and brands.",
    areas: ["Saket", "Hauz Khas", "Greater Kailash", "Malviya Nagar", "Sangam Vihar", "Kalkaji", "Nehru Place", "Vasant Kunj"],
    industries: ["Local retail", "Clinics & healthcare", "Restaurants", "Boutiques", "Coaching institutes", "Professional services"],
  },
];

export const getLocation = (slug: string) => locations.find((l) => l.slug === slug);

const NCR_PLACES = ["Delhi", "Gurgaon", "Gurugram", "Noida", "Faridabad", "Ghaziabad"];
const CITY_ALIASES: Record<string, string[]> = {
  delhi: ["Delhi"],
  "south-delhi": ["South Delhi"],
  noida: ["Noida"],
  faridabad: ["Faridabad"],
  gurugram: ["Gurgaon", "Gurugram"],
  "delhi-ncr": NCR_PLACES,
};

/** Real portfolio projects for a city page; fills remaining places with genuine Delhi NCR projects, never overseas ones. */
export function projectsForLocation<T extends { location: string }>(slug: string, items: T[]): { local: boolean; items: T[]; withNcr: boolean } {
  const names = CITY_ALIASES[slug] ?? [];
  const local = items.filter((item) => names.some((name) => item.location.includes(name)));
  const ncr = items.filter((item) => !local.includes(item) && NCR_PLACES.some((name) => item.location.includes(name)));
  if (local.length && slug !== "delhi-ncr") return { local: true, items: [...local, ...ncr].slice(0, 4), withNcr: local.length < 4 && ncr.length > 0 };
  return { local: false, items: [...local, ...ncr].slice(0, 4), withNcr: false };
}
