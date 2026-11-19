/** Approved public FAQ answers, shared by the FAQ page, its schema and the Contact page. */
export type FaqItem = [question: string, answer: string];

export const faqGroups: Array<{ title: string; items: FaqItem[] }> = [
  {
    title: "About Webgram",
    items: [
      ["What does Webgram IT Solution do?", "Webgram IT Solution is a Delhi-based web development company that designs and builds business websites, ecommerce stores, B2B commerce platforms, marketplaces and custom web portals, along with API integrations, maintenance and speed optimisation."],
      ["Where is Webgram IT Solution located?", "Our office is in Sangam Vihar, New Delhi. We work with businesses across India, including Delhi, Noida, Gurugram and Faridabad."],
      ["Which areas does Webgram IT Solution serve?", "We serve clients across Delhi, Noida, Gurgaon, Faridabad, South Delhi and all of Delhi NCR. We also work with businesses across India and internationally."],
      ["Can I see websites you have built?", "Yes. Visit our Portfolio page to see live websites such as Houskase, King Sports Management, Regal Consulting Group and Fresh & Bright Cleaners."],
    ],
  },
  {
    title: "Projects & pricing",
    items: [
      ["How much does a website cost?", "Cost depends on the number of pages, features, integrations and content. After a short discussion we share a fixed itemised quote. Contact us at +91 7551120242 or info@webgramitsolution.com."],
      ["How long does a website project take?", "A business website usually takes 2 to 4 weeks. Ecommerce stores take around 4 to 8 weeks. B2B portals or marketplaces depend on the workflows and integrations involved."],
      ["Can you work on my existing website?", "Yes. We redesign, fix, speed up and extend existing WordPress, WooCommerce, Shopify and custom websites."],
      ["What do you need from me to start?", "Your logo, business details, service or product information, photos and any reference websites you like. We guide you through everything else."],
    ],
  },
  {
    title: "Platforms & features",
    items: [
      ["Which platforms does Webgram IT Solution use?", "We use WordPress, WooCommerce, Shopify and modern JavaScript frameworks like React and Next.js. We recommend the platform that fits your goals and budget."],
      ["Can Webgram build a B2B or wholesale ecommerce store?", "Yes. We build B2B portals with customer-specific pricing, MOQ, RFQ and quotes, bulk ordering, credit terms and ERP integration."],
      ["Will my website work on mobile and be SEO ready?", "Every website we build is mobile-first, fast-loading and includes clean page structure, meta tags, sitemaps and structured data."],
      ["What is the best platform for an ecommerce website in India?", "WooCommerce is ideal for businesses needing full customization and ownership. Shopify suits those wanting a faster setup with less technical management. We help you choose based on your budget, products and business goals."],
      ["Do you build multi-vendor marketplace websites?", "Yes. We build multi-vendor marketplaces with seller tools, commission management, payouts and order management for businesses across India."],
      ["Can you integrate payment gateways, CRMs and ERPs?", "Yes. We integrate Indian and international payment gateways, shipping and logistics, CRMs, ERPs and custom third-party APIs."],
    ],
  },
  {
    title: "Support",
    items: [
      ["Do you provide support after the website is launched?", "Yes. We offer maintenance plans that include updates, backups, security monitoring and content changes."],
      ["Who owns the website after it is built?", "You do. After final payment the website, content and domain are fully yours."],
      ["How do I contact Webgram IT Solution?", "Call +91 7551120242, email info@webgramitsolution.com or use the contact form on the website. We usually reply within one business day."],
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
