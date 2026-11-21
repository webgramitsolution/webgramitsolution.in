type LocalSearch = {
  description: string;
  priority: readonly number[];
  answers: readonly (readonly [string, string])[];
};

export const localSearch: Record<string, LocalSearch> = {
  delhi: {
    description: "Delhi ecommerce website developers for Shopify store design, WooCommerce development, mobile checkout and B2B ordering portals. Speak with our New Delhi team.",
    priority: [0, 6, 3],
    answers: [
      ["Can a Delhi retailer hire Webgram for Shopify or WooCommerce development?", "Yes. Our New Delhi team scopes design and development for both platforms. We compare catalogue structure, hosting preferences, checkout needs and the cost of maintaining your store."],
      ["What should I share for an ecommerce website quote in Delhi?", "Share your catalogue size, existing website, payment and shipping requirements, and whether customers need separate retail and trade accounts."],
    ],
  },
  noida: {
    description: "Website developers serving Noida and Greater Noida. Plan a corporate website, WordPress business site, ecommerce store, or custom portal with CRM integration.",
    priority: [2, 4, 0],
    answers: [
      ["Do you develop lead-generation websites for Noida IT and SaaS companies?", "Yes. We help organise service pages, demo requests and case studies, then scope enquiry routing and CRM integration around your sales process."],
      ["Can you connect a new Noida business website to a customer portal?", "Yes. We first map account roles, what information users need to see, and how the portal will exchange data with your existing systems."],
    ],
  },
  faridabad: {
    description: "Ecommerce website developers serving Faridabad manufacturers and traders. Build industrial product catalogues, WooCommerce stores and B2B request-a-quote portals.",
    priority: [1, 0, 3],
    answers: [
      ["Do you build industrial product catalogue websites for Faridabad manufacturers?", "Yes. We can organise model numbers, specifications and downloadable documents around how procurement teams compare products and request quotes."],
      ["Can Faridabad wholesalers sell online and still quote custom prices?", "Yes. Standard products can have online ordering while bulk or custom orders use a quote request. We scope those journeys around your product and price rules."],
    ],
  },
  gurugram: {
    description: "Website design and development for Gurgaon and Gurugram businesses. Corporate websites, mobile-first redesigns, ecommerce stores and B2B lead generation.",
    priority: [2, 1, 0],
    answers: [
      ["Do you offer corporate website design in Gurgaon and Gurugram?", "Yes. Our Delhi-based team serves Gurugram companies. We plan service pages, brand layouts, approved case studies and contact journeys with your marketing and sales teams."],
      ["Can Webgram redesign an existing Gurgaon website and keep its key URLs?", "Yes. We review existing pages before redesigning the site, preserve valuable URLs where possible, and prepare redirects for the ones that need to change."],
    ],
  },
  "delhi-ncr": {
    description: "B2B ecommerce developers in Delhi NCR for wholesale websites, dealer ordering, supplier marketplaces, quote requests and ERP or inventory integration.",
    priority: [1, 4, 0],
    answers: [
      ["What is the difference between a B2B portal and a B2B marketplace?", "A B2B portal serves one supplier’s approved dealers or trade buyers. A marketplace supports multiple suppliers with vendor onboarding, catalogue moderation and enquiry or order routing."],
      ["Can you integrate a Delhi NCR wholesale portal with our ERP?", "We can scope catalogue, inventory, pricing and order integrations after reviewing your ERP’s API access, data ownership and how often stock and prices need to update."],
    ],
  },
  "south-delhi": {
    description: "Website design company based in Sangam Vihar, South Delhi. Responsive business websites, redesigns, local enquiry pages and online stores for shops and services.",
    priority: [2, 0, 5],
    answers: [
      ["Where can I meet your South Delhi website design team?", "Our office is in Sangam Vihar, New Delhi. Contact us before visiting so we can set up a time to discuss your website."],
      ["Do you redesign websites for South Delhi shops and professional services?", "Yes. We can update the mobile layout, navigation, service pages and enquiry forms. For shops, we can also scope a catalogue or a checkout flow if you plan to sell online."],
    ],
  },
};
