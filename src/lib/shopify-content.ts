import type { FaqItem } from "@/lib/faq-content";

/** Visible copy for the dedicated Shopify service page; FAQ schema is generated from the same answers. */
export const SHOPIFY_URL = "https://webgramitsolution.in/services/shopify";
export const SHOPIFY_TITLE = "Shopify Website Development Company in Delhi NCR | Webgram IT Solution";
export const SHOPIFY_DESCRIPTION =
  "Shopify store setup, custom theme design, Razorpay and GoKwik checkout, Shiprocket shipping, WATI WhatsApp and Judge.me reviews for Indian brands. Delhi NCR based, serving Pan-India and overseas.";

export const shopifyDirectAnswer = {
  question: "What does a Shopify development company do?",
  answer:
    "A Shopify development company sets up and customises your Shopify store so you can start selling online. Webgram IT Solution, based in New Delhi, handles store setup, theme design, product upload, Indian payments (Razorpay, GoKwik checkout, COD), Shiprocket shipping, WhatsApp updates through WATI, Judge.me product reviews, SEO basics and launch support for brands across India and abroad.",
};

export const shopifyServices = [
  ["Shopify Store Setup", "Store settings, domain, taxes, policies, shipping zones and payment options configured for India."],
  ["Custom Theme Design", "Brand-led theme customisation that looks right on phones first, then on desktop."],
  ["Product & Collection Upload", "Products, variants, collections, filters and SEO-friendly product pages."],
  ["Indian Payments & COD", "Razorpay and GoKwik checkout with COD options, so buyers can pay the way they prefer."],
  ["Shipping & Order Tracking", "Shiprocket and courier integration with order tracking updates for customers."],
  ["WhatsApp & Reviews", "WATI or interakt WhatsApp notifications and Judge.me product reviews to build trust."],
  ["Store Migration", "Move products, customers and pages from WooCommerce or another platform to Shopify."],
  ["Speed & SEO Basics", "Image optimisation, clean page titles, meta tags and structured product information."],
] as const;

export const shopifyComparison = [
  { feature: "Setup speed", a: "Faster: hosting, security and checkout are managed by Shopify", b: "Needs hosting, WordPress and plugin setup", best: "Shopify for a quick launch" },
  { feature: "Monthly cost", a: "Shopify subscription plus paid apps", b: "Hosting plus optional paid plugins", best: "WooCommerce for lower running cost" },
  { feature: "Customisation", a: "Theme and app based; deep changes are limited", b: "Full code access and custom features", best: "WooCommerce for unique workflows" },
  { feature: "Maintenance", a: "Platform updates handled by Shopify", b: "You or your developer update plugins and WordPress", best: "Shopify for low upkeep" },
  { feature: "Indian checkout & COD", a: "Razorpay, GoKwik and COD via apps", b: "Razorpay, PayU and COD via plugins", best: "Both work well in India" },
  { feature: "B2B / wholesale (MOQ, RFQ)", a: "Possible with apps or higher plans", b: "Flexible with custom development", best: "WooCommerce or a custom B2B portal" },
  { feature: "Ownership & portability", a: "Store runs on Shopify's platform", b: "Self-hosted; full control of files and data", best: "WooCommerce for full control" },
];

export const shopifyFaqs: FaqItem[] = [
  ["How long does it take to build a Shopify store?", "Ecommerce stores usually take around 4 to 8 weeks. The exact time depends on the number of products, design changes and integrations such as GoKwik, Shiprocket or WhatsApp."],
  ["How much does Shopify store development cost?", "Cost depends on design, number of products, apps and integrations. After a short discussion we share a fixed itemised quote. Shopify's own subscription and any paid apps are billed separately by Shopify and the app providers."],
  ["Can you integrate Razorpay, GoKwik checkout and Shiprocket on Shopify?", "Yes. We set up Razorpay and GoKwik checkout with COD options, Shiprocket for shipping and tracking, WATI or interakt for WhatsApp updates and Judge.me for product reviews."],
  ["Should I choose Shopify or WooCommerce?", "WooCommerce is ideal for businesses needing full customization and ownership. Shopify suits those wanting a faster setup with less technical management. We help you choose based on your budget, products and business goals."],
  ["Can you move my existing store to Shopify?", "Yes. We migrate products, collections, customers and important pages from WooCommerce or another platform to Shopify, and set up redirects so existing links keep working."],
  ["Who owns the Shopify store after it is built?", "You do. After final payment the website, content and domain are fully yours."],
  ["Do you provide support after the store goes live?", "Yes. We offer maintenance plans that include updates, backups, security monitoring and content changes."],
  ["Do you build Shopify stores outside Delhi NCR?", "Yes. We are based in Sangam Vihar, New Delhi and work with brands across Delhi NCR, the rest of India and overseas clients."],
];
