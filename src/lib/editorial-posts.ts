import { ecommerceBuyerGuideContent } from "./ecommerce-buyer-guide";

export const editorialAuthor = {
  path: "/authors/webgram-editorial-team",
  name: "Webgram IT Solution Editorial Team",
  description: "Website and ecommerce guides from the Webgram IT Solution team in New Delhi, India, covering platform selection, launch operations and post-launch support.",
} as const;

const articles = [
  ["shopify-vs-woocommerce-india", "Shopify vs WooCommerce for Indian Businesses", "Compare Shopify and WooCommerce across ownership, operating costs, Indian checkout requirements and the work your team takes on after launch.", "shopify", "/services/shopify", "Shopify development",
    "Shopify is usually easier to operate if you want hosted infrastructure and standard store tools. WooCommerce is worth evaluating when you already run WordPress, need more control over hosting or rely on WordPress-specific content and extensions.",
    "Build the same sample store in each platform. Include an item with variants, a sale price and an out-of-stock size. Have someone from your own team update a product, cancel an order and issue a refund. Check the apps needed for local shipping, payment methods and wholesale prices before comparing fees.",
    "Shopify’s documentation", "https://help.shopify.com/en/manual/intro-to-shopify"],
  ["ecommerce-development-quote-checklist", "Ecommerce Website Development Cost and Quote Checklist", "Learn what an ecommerce quote should include, which charges recur and how to compare two development estimates against the same scope.", "retail", "/solutions/ecommerce-development", "Ecommerce development",
    "An ecommerce quote should separate implementation costs from ongoing expenses. Ask for the scope by deliverable and check which product imports, theme changes, testing and migration work fall within it.",
    "Request a line for each external dependency, including hosting, apps, licences, gateway fees and maintenance. For a 500-product migration, specify who cleans duplicate SKUs and missing images. Compare estimates using the same sample catalogue, payment flow and acceptance criteria.",
    "", ""],
  ["b2b-ecommerce-portal-pricing-quotes-approvals", "B2B Ecommerce Portals for Pricing, Quotes and Approvals", "Plan dealer logins, contract pricing, minimum orders, quote workflows and approvals for a wholesale ecommerce portal.", "wholesale", "/solutions/b2b-commerce", "B2B commerce solutions",
    "Begin with the sales rules that make wholesale different from retail. Decide who can see prices, who can request a quote and when an order needs human approval.",
    "Test the same SKU under two dealer accounts with different contracts. Try an order that falls below the minimum quantity, one that exceeds credit and one whose quote has expired. Record how the portal should explain each case and what the sales or accounting team must see.",
    "", ""],
  ["ecommerce-website-requirements-brief", "Ecommerce Website Requirements Your Developer Can Use", "Write a clear ecommerce development brief with a sample catalogue, checkout rules, integration owners and acceptance criteria.", "retail", "/contact", "Discuss your project brief",
    "Give the developer a brief that describes what customers and staff must be able to do. Include example products, payment and delivery rules, and the systems that must exchange data.",
    "Choose a small set of launch scenarios. For example, a shopper enters a serviceable PIN code, sees shipping charges and pays for a product with a discount. Specify how to handle an unserviceable address. Share anonymised sample records and name the person who accepts each workflow.",
    "", ""],
  ["ecommerce-website-maintenance-checklist", "Ecommerce Maintenance Checklist for Updates and Backups", "Define the maintenance scope for an online store, including updates, backup recovery, checkout checks and support escalation.", "woocommerce", "/services/website-maintenance", "Website maintenance and support",
    "An ecommerce maintenance plan should name the owner of updates, checkout checks, backup recovery and incident response. Ask who checks app and gateway changes as well as the website itself.",
    "A monthly report can list changes applied, backups verified, recent errors and any upcoming renewal or update risks. Agree how a failed checkout is prioritised, who can approve urgent work and whether data recovery is in scope. Test a restore with sample orders in staging before relying on the backup.",
    "", ""],
  ["payment-gateway-integration-launch-checklist", "Payment Gateway Integration and Store Launch Checklist", "Test checkout before launch with successful, failed and cancelled payments, webhook retries, refunds and settlement reconciliation.", "retail", "/solutions/ecommerce-development", "Ecommerce checkout development",
    "Test a payment gateway by following the entire order timeline from cart to settlement. A successful screen alone does not tell you whether the store recorded the correct payment and order status.",
    "In test mode, verify a success, a failure, a customer cancellation and a refund. Replay permitted test webhook events and confirm the same payment event does not create a second order. Record the order and payment references so the finance team can match them against a test report.",
    "Razorpay payment gateway documentation", "https://razorpay.com/docs/payments/payment-gateway/"],
  ["ecommerce-inventory-crm-integration-plan", "Ecommerce Inventory and CRM Integration Planning", "Map source systems, SKU and customer identifiers, retry behaviour and alert ownership before connecting ecommerce to stock and CRM tools.", "wholesale", "/services/api-integration", "API integration services",
    "Decide which system has final authority over products, orders, stock and customer records. Draw a simple map showing the direction each update travels and how the systems identify the same record.",
    "Run three test orders including a cancellation and one partial return. Simulate a temporary timeout and confirm the retry does not double-count the stock adjustment. Agree how long staff can wait for updates and what alert tells them a record needs manual attention.",
    "", ""],
  ["ecommerce-redesign-protect-product-urls", "How to Protect Product URLs During an Ecommerce Redesign", "Keep valuable product URLs, map 301 redirects and retest mobile checkout when redesigning or replatforming an ecommerce store.", "retail", "/resources/ecommerce-redesign-checklist", "Ecommerce migration checklist",
    "Make URL preservation and checkout testing part of the project scope. Export your product, collection and campaign addresses with traffic or links before anyone changes page slugs.",
    "Keep the addresses that still describe the same product. For changes, map old URLs to equivalent destinations and test direct permanent redirects. When the redesigned checkout goes live, compare key landing-page visits and checkout completions against your baseline. Check payment failures and 404 reports separately.",
    "Google Search Central’s site move documentation", "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes"],
  ["multi-vendor-marketplace-development-scope", "What to Scope Before Building a Multi-Vendor Marketplace", "Define seller approval, catalogue rules, commissions, payouts and refunds before building a multi-vendor ecommerce marketplace.", "wholesale", "/solutions/marketplace-development", "Marketplace development",
    "Scope the operating model first. Confirm who approves sellers, who owns the customer relationship and who collects payment. Those decisions determine whether you need a directory, a quote marketplace or a transactional marketplace.",
    "Walk through an order that contains items from two sellers. Assign who handles each shipment and what happens when a buyer returns one item. Confirm how commission is calculated and when the payout adjustment appears. Have operations and finance approve the event sequence before development.",
    "", ""],
  ["website-handover-accounts-source-code-support", "Website Handover for Accounts, Source Code and Support", "Confirm domain and store ownership, repository access, licence renewals and post-launch support before accepting a website handover.", "woocommerce", "/resources/website-handover-checklist", "Complete website handover checklist",
    "A handover should leave your team able to run the site and recover access independently. Agree in writing which accounts, files, licences and documents transfer.",
    "Have two staff members sign in with their own accounts and complete routine tasks. Test editing a page, exporting an order or restoring a staging backup as appropriate. Record who renews the domain and licences, who receives alerts, and which issues the developer will fix during the support period.",
    "", ""],
] as const;

const attributions = {
  shopify: "Shopify storefront design on laptop and mobile",
  woocommerce: "WooCommerce storefront design on desktop and mobile",
  wholesale: "Wholesale ecommerce workflow illustration",
  retail: "Fashion retail ecommerce design example",
} as const;

const sourceSections = ecommerceBuyerGuideContent.split(/\n\n## \d+\. /).slice(1);
export const editorialPosts = articles.map(([slug, title, excerpt, image, service, label, answer, test, sourceLabel, source], index) => {
  const section = sourceSections[index]?.split(/\n\n## /)[0] ?? "";
  const paragraphs = section.split("\n\n").slice(1).filter((item) => !item.startsWith("["));
  return {
    id: slug, slug, title, excerpt,
    author_name: editorialAuthor.name,
    authorPath: editorialAuthor.path,
    featured_image: `/images/ecommerce-guide/${image}.webp`,
    featured_image_alt: attributions[image],
    published_at: "2026-11-22",
    updated_at: null,
    category: null, subcategory: null, category_id: null, subcategory_id: null, tags: [],
    seo_title: title,
    seo_description: excerpt,
    faqs: [], noindex: false, view_count: 0,
    content: [
      answer,
      "## What to agree before development",
      ...paragraphs,
      "## How to test your plan",
      test,
      "## Related resources",
      `[${label}](${service}) · [Ecommerce planning series](/blog/ecommerce-website-development-india-guide)${source ? ` · [${sourceLabel}](${source})` : ""}`,
    ].join("\n\n"),
  };
});

export const editorialBlogCards = editorialPosts.map(({ content: _content, ...card }) => card);
