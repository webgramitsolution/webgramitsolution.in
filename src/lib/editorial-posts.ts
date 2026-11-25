import { readEditorialArticle } from "./editorial-article-content";

export const editorialAuthor = {
  path: "/authors/webgram-editorial-team",
  name: "Webgram IT Solution Editorial Team",
  description:
    "Website and ecommerce guides from the Webgram IT Solution team in New Delhi, India, covering platform selection, launch operations and post-launch support.",
} as const;

const articles = [
  [
    "shopify-vs-woocommerce-india",
    "Shopify vs WooCommerce for Indian Businesses",
    "Compare Shopify and WooCommerce across ownership, operating costs, Indian checkout requirements and the work your team takes on after launch.",
    "Two desktop storefronts being compared at a merchant’s desk",
    "Shopify vs WooCommerce in India",
  ],
  [
    "ecommerce-development-quote-checklist",
    "Ecommerce Website Development Cost and Quote Checklist",
    "Learn what an ecommerce quote should include, which charges recur and how to compare two development estimates against the same scope.",
    "A business owner and consultant reviewing an ecommerce estimate",
    "Ecommerce Website Cost and Quote Checklist",
  ],
  [
    "b2b-ecommerce-portal-pricing-quotes-approvals",
    "B2B Ecommerce Portals for Pricing, Quotes and Approvals",
    "Plan dealer logins, contract pricing, minimum orders, quote workflows and approvals for a wholesale ecommerce portal.",
    "A wholesale team reviewing a bulk order and quotation",
    "B2B Portal Pricing, Quotes and Approvals",
  ],
  [
    "ecommerce-website-requirements-brief",
    "Ecommerce Website Requirements Your Developer Can Use",
    "Write a clear ecommerce development brief with a sample catalogue, checkout rules, integration owners and acceptance criteria.",
    "Wireframes and product samples on a developer’s desk",
    "Ecommerce Website Requirements Brief",
  ],
  [
    "ecommerce-website-maintenance-checklist",
    "Ecommerce Maintenance Checklist for Updates and Backups",
    "Define the maintenance scope for an online store, including updates, backup recovery, checkout checks and support escalation.",
    "A developer checking store backups and monitoring status",
    "Ecommerce Website Maintenance Checklist",
  ],
  [
    "payment-gateway-integration-launch-checklist",
    "Payment Gateway Integration and Store Launch Checklist",
    "Test checkout before launch with successful, failed and cancelled payments, webhook retries, refunds and settlement reconciliation.",
    "A merchant testing mobile payment and desktop checkout",
    "Payment Gateway Integration Checklist",
  ],
  [
    "ecommerce-inventory-crm-integration-plan",
    "Ecommerce Inventory and CRM Integration Planning",
    "Map source systems, SKU and customer identifiers, retry behaviour and alert ownership before connecting ecommerce to stock and CRM tools.",
    "An inventory manager scanning stock beside a laptop",
    "Ecommerce Inventory and CRM Integration",
  ],
  [
    "ecommerce-redesign-protect-product-urls",
    "How to Protect Product URLs During an Ecommerce Redesign",
    "Keep valuable product URLs, map 301 redirects and retest mobile checkout when redesigning or replatforming an ecommerce store.",
    "A designer reviewing product screens during a storefront redesign",
    "Protect Product URLs During Ecommerce Redesign",
  ],
  [
    "multi-vendor-marketplace-development-scope",
    "What to Scope Before Building a Multi-Vendor Marketplace",
    "Define seller approval, catalogue rules, commissions, payouts and refunds before building a multi-vendor ecommerce marketplace.",
    "A marketplace operator coordinating stock from different suppliers",
    "Multi-Vendor Marketplace Development Scope",
  ],
  [
    "website-handover-accounts-source-code-support",
    "Website Handover for Accounts, Source Code and Support",
    "Confirm domain and store ownership, repository access, licence renewals and post-launch support before accepting a website handover.",
    "A developer and business owner reviewing website handover materials",
    "Website Handover, Source Code and Support",
  ],
] as const;

export const editorialPosts = articles.map(([slug, title, excerpt, coverAlt, seoTitle]) => {
  const article = readEditorialArticle(slug);
  return {
    id: slug,
    slug,
    title,
    excerpt,
    author_name: editorialAuthor.name,
    authorPath: editorialAuthor.path,
    featured_image: `/images/blog-covers/${slug}.webp`,
    featured_image_alt: coverAlt,
    published_at: "2026-11-22",
    updated_at: null,
    category: null,
    subcategory: null,
    category_id: null,
    subcategory_id: null,
    tags: [],
    seo_title: seoTitle,
    seo_description: excerpt,
    noindex: false,
    view_count: 0,
    ...article,
  };
});

export const editorialBlogCards = editorialPosts.map(({ content: _content, ...card }) => card);
