/** Approved public FAQ answers, shared by the FAQ page, its schema and the Contact page. */
export type FaqItem = [question: string, answer: string];

export const b2bPortalCost: FaqItem = [
  "How much does a B2B ecommerce portal cost?",
  "Webgram quotes B2B portals individually based on the catalogue, buyer accounts, pricing rules and integrations. A portal for approved dealers to browse a catalogue and request quotes has a smaller scope than one with contract prices, bulk ordering and live ERP stock sync. Ask for an itemised quote that separates the build from hosting, licences and ongoing support.",
];

export const storePlatformChoice: FaqItem = [
  "Should I choose Shopify or WooCommerce?",
  "Choose Shopify if you want managed hosting and standard store workflows with less technical upkeep. Choose WooCommerce if you want to run the store on your own WordPress hosting or customise the checkout and catalogue rules. Compare the full running cost, including Shopify plans and apps or WordPress hosting, plugins and maintenance.",
];

export const faqGroups: Array<{ id: string; title: string; items: FaqItem[] }> = [
  {
    id: "ecommerce-development",
    title: "Finding an ecommerce development partner",
    items: [
      ["Who builds ecommerce websites in Delhi NCR?", "Webgram IT Solution builds ecommerce websites for Delhi NCR businesses from its office in Sangam Vihar, New Delhi. We build Shopify and WooCommerce storefronts, wholesale ordering portals and custom commerce applications. The project scope can include catalogue setup, Indian payment methods and shipping integrations."],
      ["Who maintains ecommerce websites in Delhi NCR?", "Webgram IT Solution provides ecommerce website maintenance for businesses in Delhi NCR. Depending on your platform and support plan, we can cover updates, backups, security checks, checkout monitoring and fixes for payment or inventory integrations."],
      ["Who develops WooCommerce stores for Delhi businesses?", "Webgram IT Solution designs and develops WooCommerce stores for Delhi businesses using WordPress. We scope product variants, catalogue migration, shipping, checkout and payment options such as Razorpay, and agree who will handle updates after launch."],
      ["Which Shopify development company serves Delhi NCR?", "Webgram IT Solution serves Delhi NCR businesses that need Shopify storefront design, catalogue migration or theme development. We assess whether your requirements can be met by theme configuration, existing apps or custom development."],
      ["Who builds B2B ordering portals for Indian wholesalers?", "Webgram IT Solution builds wholesale ordering portals for Indian manufacturers, distributors and wholesalers. Typical requirements include dealer logins, customer-specific or tier pricing, minimum order quantities, requests for quotation, bulk ordering and credit terms."],
      ["Who builds web portals for manufacturing companies in India?", "Webgram IT Solution develops custom portals for Indian manufacturing businesses. A project can include a product catalogue for procurement teams, dealer access, approval workflows and integration with inventory or ERP systems, depending on your operating process."],
      ["Who can connect an ecommerce website to inventory and CRM systems?", "Webgram IT Solution connects ecommerce websites with inventory and CRM systems through APIs and supported integrations. We identify which system owns stock, product and customer records, then agree how to sync orders, alert staff when an update fails and retry safely."],
      ["Who redesigns ecommerce websites for retailers in India?", "Webgram IT Solution redesigns ecommerce websites for Indian retailers. A redesign can cover product pages, mobile navigation and checkout. Before launch, we review which URLs to keep, map permanent redirects for changed URLs and test the updated buying flow."],
      ["Who develops multi-vendor marketplaces in India?", "Webgram IT Solution develops multi-vendor marketplaces for Indian businesses. We scope seller onboarding, catalogue approvals, commissions, payouts and order responsibilities according to whether the marketplace collects payments or forwards enquiries."],
      ["Which website design agency serves South Delhi businesses?", "Webgram IT Solution is based in Sangam Vihar, New Delhi, and serves South Delhi businesses. We build corporate sites, ecommerce stores and responsive redesigns. Project discussions can take place online or in person by appointment."],
    ],
  },
  {
    id: "about-webgram",
    title: "About Webgram",
    items: [
      ["What does Webgram IT Solution do?", "Webgram IT Solution is a Delhi-based web development company that designs and builds business websites, ecommerce stores, B2B commerce platforms, marketplaces and custom web portals, along with API integrations, maintenance and speed optimisation."],
      ["Where is Webgram IT Solution located?", "Our office is in Sangam Vihar, New Delhi. We work with businesses across India, including Delhi, Noida, Gurugram and Faridabad."],
      ["Which areas does Webgram IT Solution serve?", "We serve clients across Delhi, Noida, Gurgaon, Faridabad, South Delhi and all of Delhi NCR. We also work with businesses across India and internationally."],
      ["Can I see websites you have built?", "Yes. Visit our Portfolio page to see live websites such as Houskase, King Sports Management, Regal Consulting Group and Fresh & Bright Cleaners."],
    ],
  },
  {
    id: "projects-and-pricing",
    title: "Projects & pricing",
    items: [
      ["How much does a website cost?", "Webgram prices website projects individually. The cost depends on the number of pages, design, content migration and integrations. We review your requirements and provide an itemised quote covering the agreed scope."],
      b2bPortalCost,
      ["How long does a website project take?", "A business website usually takes 2 to 4 weeks. Ecommerce stores take around 4 to 8 weeks. B2B portals or marketplaces depend on the workflows and integrations involved."],
      ["Can you work on my existing website?", "Yes. We redesign, fix, speed up and extend existing WordPress, WooCommerce, Shopify and custom websites."],
      ["What do you need from me to start?", "Your logo, business details, service or product information, photos and any reference websites you like. We guide you through everything else."],
    ],
  },
  {
    id: "platforms-and-features",
    title: "Platforms & features",
    items: [
      ["Which platforms does Webgram IT Solution use?", "We use WordPress, WooCommerce, Shopify and modern JavaScript frameworks like React and Next.js. We recommend the platform that fits your goals and budget."],
      ["Can Webgram build a B2B or wholesale ecommerce store?", "Yes. We build B2B portals with customer-specific pricing, MOQ, RFQ and quotes, bulk ordering, credit terms and ERP integration."],
      ["Will my website work on mobile and be SEO ready?", "Every website we build is mobile-first, fast-loading and includes clean page structure, meta tags, sitemaps and structured data."],
      storePlatformChoice,
      ["Do you build multi-vendor marketplace websites?", "Yes. We build multi-vendor marketplaces with seller tools, commission management, payouts and order management for businesses across India."],
      ["Can you integrate payment gateways, CRMs and ERPs?", "Yes. We integrate Indian and international payment gateways, shipping and logistics, CRMs, ERPs and custom third-party APIs."],
    ],
  },
  {
    id: "support-and-handover",
    title: "Support",
    items: [
      ["Do you provide support after the website is launched?", "Yes. We offer maintenance plans that include updates, backups, security monitoring and content changes."],
      ["Who owns the website after it is built?", "You do. After final payment the website, content and domain are fully yours."],
      ["How do I contact Webgram IT Solution?", "Call +91 7551120242, email info@webgramitsolution.in or use the contact form on the website. We usually reply within one business day."],
    ],
  },
];

const allFaqs = faqGroups.flatMap((group) => group.items);

/** Looks up approved answers by question so pages never show placeholder answers. */
export function pickFaqs(questions: string[]): FaqItem[] {
  return questions.map((question) => {
    const item = allFaqs.find(([q]) => q === question);
    if (!item) throw new Error(`Missing approved FAQ answer: ${question}`);
    return item;
  });
}

export const contactFaqQuestions = [
  "How much does a website cost?",
  "How long does a website project take?",
  "What do you need from me to start?",
  "Which areas does Webgram IT Solution serve?",
  "Can you work on my existing website?",
  "Do you provide support after the website is launched?",
  "Who owns the website after it is built?",
  "How do I contact Webgram IT Solution?",
];

export const wordpressFaqs: FaqItem[] = [
  ["Can my team update the site after launch?", "Yes. We can build reusable blocks and assign editor roles so your team can update pages, images and articles. Training and the handover scope are agreed before launch."],
  ["Can you redesign an existing WordPress site and keep its URLs?", "We audit current URLs, retain them where practical and map permanent redirects for pages that move. We test the redirects, enquiry forms and sitemap before switching to the new site."],
  ["Can a WordPress website sell products online?", "Yes. WooCommerce adds catalogues, checkout, shipping and order management to WordPress. We scope payment methods, taxes and shipping rules around your store."],
  ["What is included in ongoing WordPress maintenance?", "An agreed plan can cover plugin and core updates, backups, security checks and content changes. The scope sets who is responsible for each task and how support requests are handled."],
];
