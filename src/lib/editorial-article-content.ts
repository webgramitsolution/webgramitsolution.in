import type { BlogFaq } from "./blog-faqs";

const articles = import.meta.glob<string>("./editorial-articles/*.md", {
  query: "?raw",
  import: "default",
  eager: true,
});

const galleryAlts: Record<string, readonly [string, string, string, string]> = {
  "shopify-vs-woocommerce-india": [
    "Retailer organising product variants",
    "Store admin screens under evaluation",
    "Platform budget worksheet and calculator",
    "Store employee testing checkout on a phone",
  ],
  "ecommerce-development-quote-checklist": [
    "Business owner reviewing a project estimate",
    "Product catalogue spreadsheet and sample products",
    "Project milestone planning at a team meeting",
    "Annotated checkout wireframe",
  ],
  "b2b-ecommerce-portal-pricing-quotes-approvals": [
    "Dealer catalogue and wholesale cartons",
    "B2B buyer reading a written quotation",
    "Sales manager reviewing a wholesale order",
    "Packed goods prepared for distributor dispatch",
  ],
  "ecommerce-website-requirements-brief": [
    "Sample products for a catalogue brief",
    "Mobile storefront wireframe sketch",
    "Team discussing ecommerce website requirements",
    "Developer testing a store cart prototype",
  ],
  "ecommerce-website-maintenance-checklist": [
    "Store operations technician checking a dashboard",
    "Developer testing changes on a staging site",
    "Technician reviewing a backup drive",
    "Merchant checking an order workflow",
  ],
  "payment-gateway-integration-launch-checklist": [
    "Merchant testing checkout on a phone",
    "Payment terminal beside a checkout screen",
    "Store employee reviewing a refund",
    "Finance team member checking settlement records",
  ],
  "ecommerce-inventory-crm-integration-plan": [
    "Warehouse worker scanning a product barcode",
    "Product mapping records at a workstation",
    "Support employee reviewing customer records",
    "Store team checking returned stock",
  ],
  "ecommerce-redesign-protect-product-urls": [
    "Designer comparing two product page layouts",
    "Worksheet mapping old and new product URLs",
    "Retailer testing checkout on a mobile device",
    "Team checking store traffic after launch",
  ],
  "multi-vendor-marketplace-development-scope": [
    "Suppliers presenting samples to a marketplace operator",
    "Seller preparing product photographs for listings",
    "Warehouse worker sorting parcels by seller",
    "Finance operator reviewing payout records",
  ],
  "website-handover-accounts-source-code-support": [
    "Business owner going through a handover checklist",
    "Developer showing a repository on a laptop",
    "Store employee practising catalogue updates",
    "Technician demonstrating a backup restore",
  ],
};

export function readEditorialArticle(slug: string): { content: string; faqs: BlogFaq[] } {
  const article = articles[`./editorial-articles/${slug}.md`];
  const images = galleryAlts[slug];
  if (!article || !images) throw new Error(`Missing editorial content or gallery for ${slug}`);

  const [body, faqText] = article.trim().split("\n\n## Frequently asked questions\n");
  if (!body || !faqText) throw new Error(`Missing editorial FAQ section for ${slug}`);

  const faqs = faqText
    .trim()
    .split(/^### /m)
    .filter(Boolean)
    .map((item) => {
      const newline = item.indexOf("\n");
      return { question: item.slice(0, newline).trim(), answer: item.slice(newline + 1).trim() };
    });
  const introEnd = body.indexOf("\n\n");
  const gallery = [
    ":::gallery-four",
    images
      .map((alt, index) => `![${alt}](/images/blog-galleries/${slug}-${index + 1}.webp)`)
      .join("\n---\n"),
    ":::",
  ].join("\n");
  const content = [body.slice(0, introEnd), gallery, body.slice(introEnd + 2)].join("\n\n");

  return { content, faqs };
}
