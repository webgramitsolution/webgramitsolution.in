import shopifyImage from "@/assets/shopify-hero.jpg";
import wooImage from "@/assets/woocommerce-hero.jpg";
import { IMAGES } from "./site-images";

export type ServicePlan = {
  title: string;
  summary: string;
  image: string;
  alt: string;
  choices: { title: string; text: string }[];
  links: { href: string; label: string }[];
};

export const servicePlans = {
  ecommerce: {
    title: "Choose how to build your online store",
    summary: "Launch or rebuild a D2C online store with mobile product pages, payment and shipping integrations, and a platform your team can maintain.",
    image: IMAGES.ecommerce,
    alt: "Illustration of an ecommerce storefront on desktop and mobile",
    choices: [
      { title: "D2C ecommerce website design", text: "Plan collection pages, mobile product pages, variant selection and payment options around how shoppers discover and compare your products." },
      { title: "Shopify or WooCommerce development", text: "Choose Shopify for managed hosting and theme tools, or WooCommerce when WordPress control and custom extensions matter more." },
      { title: "Custom ecommerce development", text: "Scope unusual checkout rules, multi-warehouse inventory or ERP integration after mapping who owns product, stock and order data." },
    ],
    links: [{ href: "/services/shopify", label: "Shopify store development" }, { href: "/services/woocommerce", label: "WooCommerce store development" }, { href: "/locations/delhi", label: "Ecommerce developers in Delhi" }],
  },
  b2b: {
    title: "Plan a B2B ecommerce portal around your sales workflow",
    summary: "Give trade buyers dealer logins, contract pricing, order minimums and quotation workflows. Scope GST invoicing, credit terms and multi-warehouse inventory around your operations.",
    image: IMAGES.b2b,
    alt: "Illustration of a B2B commerce dashboard",
    choices: [
      { title: "Dealer and distributor portal", text: "Give approved trade accounts their own price lists, pack sizes and repeat orders. Define who approves a new account before launch." },
      { title: "B2B ordering and quotation", text: "Use direct ordering for standard stock and RFQs for negotiated orders. Map how the sales team returns quotes and tracks approvals." },
      { title: "ERP and inventory integration", text: "Map warehouse-specific stock, account credit and GST invoice data to the systems that own them. Define approval routes for credit purchases and exceptions before launch." },
    ],
    links: [{ href: "/solutions/marketplace-development", label: "Multi-vendor B2B marketplace development" }, { href: "/locations/delhi-ncr", label: "B2B ecommerce development in Delhi NCR" }],
  },
  marketplace: {
    title: "B2B marketplace website development",
    summary: "Build a multi-vendor marketplace for buyers to discover suppliers, compare catalogues and request quotes. Decide early whether your platform collects payments or hands qualified enquiries to vendors.",
    image: IMAGES.marketplace,
    alt: "Illustration of a multi-vendor marketplace storefront",
    choices: [
      { title: "Supplier registration and verification", text: "Plan a supplier application, approval workflow and role-based dashboard. Decide which documents your operators need before a vendor can publish products." },
      { title: "B2B product discovery and bulk RFQs", text: "Structure product attributes, minimum order quantities and location filters. Route buyer enquiries to the right suppliers and track responses from a shared history." },
      { title: "Marketplace order and commission rules", text: "For on-platform orders, define who sets shipping, handles returns and reconciles payouts. For a directory, prioritise enquiry quality and vendor response times." },
    ],
    links: [{ href: "/solutions/b2b-commerce", label: "Compare a single-supplier B2B portal" }, { href: "/services/web-portal-development", label: "Custom buyer and supplier portals" }, { href: "/contact", label: "Get a marketplace project quote" }],
  },
  shopify: {
    title: "Shopify store design, migration and development",
    summary: "Choose a Shopify website design that fits your catalogue and operations. We plan Shopify theme customisation, storefront migrations and Indian payment and shipping integrations.",
    image: shopifyImage,
    alt: "Shopify storefront concept displayed across devices",
    choices: [
      { title: "Shopify theme design", text: "Organise navigation, collections, product information and mobile layouts before selecting apps. Define which content your team will edit in the Shopify theme editor." },
      { title: "Shopify store migration", text: "Map products, variants, collections and old URLs before launch. Review redirect coverage and verify orders, payments and shipping with controlled test cases." },
      { title: "Shopify development for Indian D2C brands", text: "Confirm your payment gateway, COD rules, shipping partner and app costs before launch. Checkout changes depend on your Shopify plan and the integration." },
    ],
    links: [{ href: "/solutions/ecommerce-development", label: "Compare ecommerce platforms" }, { href: "/locations/gurugram", label: "Website designers serving Gurgaon and Gurugram" }],
  },
  woocommerce: {
    title: "Custom WooCommerce Website Development",
    summary: "Our WordPress ecommerce website design covers catalogues, checkout and store updates for businesses that want control over their hosting, plugins and catalogue rules.",
    image: wooImage,
    alt: "WooCommerce online store design concept",
    choices: [
      { title: "Custom WooCommerce store setup", text: "Plan product types, variants, filters and stock tracking. Confirm who can change product and checkout settings before handing the store over." },
      { title: "WordPress ecommerce migration", text: "Inventory existing URLs and export your catalogue before moving. Test taxes, discounts, webhooks and order emails on staging." },
      { title: "WooCommerce payment, delivery and maintenance", text: "Scope Razorpay, COD and shipment tracking according to your needs. Budget for compatible plugin updates, backups and performance checks as the store grows." },
    ],
    links: [{ href: "/services/shopify", label: "Compare Shopify development" }, { href: "/locations/faridabad", label: "Ecommerce website developers serving Faridabad" }],
  },
  design: {
    title: "Business & Corporate Website Design",
    summary: "Work with a Delhi NCR website agency on corporate sites, mobile redesigns and enquiry pages. We plan the site around what visitors need to learn or do.",
    image: IMAGES.platforms,
    alt: "Business site and dashboard design mockups across devices",
    choices: [
      { title: "Corporate website design", text: "Show what you offer, who you serve and how buyers can contact you. Use relevant case studies and service details to answer evaluation questions." },
      { title: "Responsive redesign", text: "Identify the pages visitors already use, then redesign navigation, forms and layouts while keeping important URLs and content accessible." },
      { title: "Landing page and enquiry design", text: "Match the page to a specific buyer need. Keep the next action clear and ask only for fields the sales team needs at first contact." },
    ],
    links: [{ href: "/solutions/website-design-development", label: "Full-cycle website design and development" }, { href: "/locations/south-delhi", label: "Website design in South Delhi" }],
  },
  development: {
    title: "Website development from discovery to handover",
    summary: "We scope responsive business websites, CMS development and integrations for Delhi NCR companies. Start with the content you need to publish and the actions visitors should be able to complete.",
    image: IMAGES.custom,
    alt: "Illustration of a custom website and application development workspace",
    choices: [
      { title: "CMS and content ownership", text: "Decide which pages your team should edit, what requires review and who maintains the website after launch." },
      { title: "Business website development", text: "Define the enquiry journey, tracking requirements and any CRM, payment or scheduling integration. Build and test each workflow before launch." },
      { title: "Migration and technical SEO", text: "Map redirects, verify canonical URLs and re-test forms and analytics. Keep a deployment checklist for DNS, HTTPS and sitemap validation." },
    ],
    links: [{ href: "/services/website-design", label: "Responsive website design services" }, { href: "/locations/noida", label: "Website developers serving Noida" }, { href: "/locations", label: "All Delhi NCR service areas" }],
  },
} satisfies Record<string, ServicePlan>;
