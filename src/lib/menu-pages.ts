export type Subpage = {
  title: string;
  tagline: string;
  description: string;
  points: string[];
  planning?: { heading: string; text: string };
};

export type MenuSection = {
  label: string;
  base: string;
  pages: Record<string, Subpage>;
};

export type SectionKey = "solutions" | "services" | "industries" | "work" | "resources";

export const menuSections: Record<SectionKey, MenuSection> = {
  solutions: {
    label: "Solutions",
    base: "/solutions",
    pages: {
      "ecommerce-development": {
        title: "Ecommerce Development",
        tagline: "High-converting online stores",
        description:
          "We build high-performance B2C ecommerce websites designed for speed, conversions and scalability — from catalog to checkout.",
        points: ["Custom storefront design", "Secure payment integration", "Mobile-first shopping experience", "SEO-ready architecture"],
      },
      "b2b-commerce": {
        title: "B2B Commerce",
        tagline: "Wholesale selling, simplified",
        description:
          "Wholesale pricing, MOQ, RFQ, customer groups, credit terms and bulk ordering — everything your B2B buyers expect, in one platform.",
        points: ["Customer-specific pricing", "Bulk & repeat ordering", "RFQ and quote management", "Credit terms and approvals"],
      },
      "website-design-development": {
        title: "Website Design & Development",
        tagline: "Professional websites that bring real results",
        description:
          "We design and develop modern, high-performing websites that build your brand, attract customers and support measurable business growth.",
        points: ["Business-focused strategy", "Creative modern design", "Responsive development", "Ongoing support"],
      },
      "marketplace-development": {
        title: "B2B Marketplace Development",
        tagline: "Multi-vendor commerce, built to scale",
        description: "Multi-vendor B2B marketplace website development for supplier onboarding, product discovery, wholesale enquiries and order management.",
        points: ["Vendor onboarding", "Commission workflows", "Product moderation", "Order management"],
      },
    },
  },
  services: {
    label: "Services",
    base: "/services",
    pages: {
      "web-portal-development": {
        title: "Web Portal Development",
        tagline: "Portals that connect and simplify",
        description:
          "Custom customer, vendor, employee and admin portals with role-based access, custom workflows, advanced dashboards and secure integrations.",
        points: ["Customer & vendor portals", "Role-based dashboards", "Custom workflows", "Secure & scalable builds"],
      },
      "website-design": {
        title: "Website Design",
        tagline: "Designs that build trust",
        description:
          "User-focused website designs that reflect your brand and guide visitors toward enquiry, purchase or signup.",
        points: ["UI/UX design", "Brand-aligned visuals", "Responsive layouts", "Conversion-focused flows"],
      },
      wordpress: {
        title: "WordPress",
        tagline: "A CMS your team can edit",
        planning: { heading: "Plan your WordPress CMS and handover", text: "Identify the pages and forms your team needs to update, and who can publish. We scope reusable page blocks, author permissions, updates and backups around your workflow." },
        description:
          "WordPress website development from Delhi NCR. Get a custom theme, editable CMS, migration and ongoing support for your business website.",
        points: ["Custom themes", "Plugin development", "Easy content management", "SEO-friendly setup"],
      },
      woocommerce: {
        title: "WooCommerce",
        tagline: "WordPress-powered stores",
        description:
          "Full-featured online stores on WooCommerce with custom product types, payments and shipping rules.",
        points: ["Store setup & design", "Payment gateways", "Shipping & tax rules", "Extension customization"],
      },
      shopify: {
        title: "Shopify",
        tagline: "Launch & grow on Shopify",
        description:
          "Shopify store setup, theme customization and app integration for brands that want to sell quickly and scale smoothly.",
        points: ["Store setup", "Theme customization", "App integrations", "Migration support"],
      },
      "api-integration": {
        title: "API Integration",
        tagline: "Connect your systems",
        description:
          "We connect your website with ERPs, CRMs, payment gateways, logistics and any third-party service your business relies on.",
        points: ["ERP & CRM sync", "Payment gateways", "Logistics integration", "Custom APIs"],
      },
      "website-maintenance": {
        title: "Website Maintenance",
        tagline: "Always updated, always secure",
        description:
          "Ongoing updates, backups, security monitoring and content changes so your website stays healthy around the clock.",
        points: ["Regular updates", "Daily backups", "Security monitoring", "Content updates"],
      },
    },
  },
  industries: {
    label: "Industries",
    base: "/industries",
    pages: {
      manufacturing: {
        title: "Manufacturing",
        tagline: "Digital commerce for manufacturers",
        description:
          "B2B portals and digital catalogs that help manufacturers reach distributors and buyers directly.",
        points: ["Digital product catalogs", "Dealer & distributor portals", "Bulk order management", "Quote requests"],
      },
      retail: {
        title: "Retail",
        tagline: "Modern retail experiences",
        description: "Omnichannel retail websites that connect your physical stores with online shoppers.",
        points: ["Omnichannel selling", "Inventory sync", "Click & collect", "Loyalty programs"],
      },
      wholesale: {
        title: "Wholesale",
        tagline: "Wholesale ordering made easy",
        description: "Self-serve wholesale portals with tiered pricing, credit terms and quick reordering.",
        points: ["Tiered pricing", "Quick reorder", "Credit management", "Sales rep tools"],
      },
      furniture: {
        title: "Furniture",
        tagline: "Showrooms that sell online",
        description: "Visual-first furniture stores with room views, customization options and delivery scheduling.",
        points: ["Visual catalogs", "Product customization", "Delivery scheduling", "Room planners"],
      },
      fashion: {
        title: "Fashion",
        tagline: "Style meets technology",
        description: "Fashion ecommerce with lookbooks, size guides, easy returns and seasonal collections.",
        points: ["Lookbooks & collections", "Size & fit guides", "Easy returns", "Seasonal campaigns"],
      },
      electronics: {
        title: "Electronics",
        tagline: "Spec-driven selling",
        description: "Electronics stores with detailed specs, comparisons, warranties and EMI options.",
        points: ["Spec comparisons", "Warranty management", "EMI options", "Accessory bundling"],
      },
      beauty: {
        title: "Beauty & Personal Care",
        tagline: "Online stores for beauty brands",
        description: "Product discovery and repeat ordering for beauty and personal care brands.",
        points: ["Ingredient and usage information", "Routine bundles", "Product variants", "Reorder journeys"],
      },
      distribution: {
        title: "Distribution",
        tagline: "Connect reseller orders and warehouse stock",
        description: "Distributor portals for trade ordering, inventory coordination and approvals.",
        points: ["Reseller accounts", "Multi-warehouse inventory", "Approval workflows", "Order sync"],
      },
      "building-materials": {
        title: "Building Materials",
        tagline: "Heavy commerce, handled",
        description: "B2B platforms for building material suppliers with bulk pricing and logistics coordination.",
        points: ["Bulk pricing", "Project-based ordering", "Logistics coordination", "Dealer networks"],
      },
    },
  },
  work: {
    label: "Work",
    base: "/work",
    pages: {
      "case-studies": {
        title: "Case Studies",
        tagline: "Real projects across industries",
        description:
          "Explore live ecommerce, healthcare, staffing, sports, hospitality and industrial websites built to turn complex offers into clear customer journeys.",
        points: ["Nine published client websites", "India and Canada delivery", "Ecommerce and lead-generation builds", "Direct links to every live project"],
      },
      portfolio: {
        title: "Portfolio",
        tagline: "Our recent work",
        description: "A selection of websites, stores and platforms we have designed and developed for our clients.",
        points: ["Ecommerce stores", "Business websites", "Web applications", "Brand experiences"],
      },
      "client-stories": {
        title: "Client Stories",
        tagline: "What clients say about working with Webgram",
        planning: { heading: "Discuss a project like yours", text: "Ask about comparable projects and what the team delivered. Use the public portfolio to review the live catalogue, service pages or enquiry journey before your first call." },
        description: "Hear directly from the businesses we partner with about their growth journey with Webgram.",
        points: ["Client testimonials", "Success stories", "Long-term partnerships", "Growth journeys"],
      },
    },
  },
  resources: {
    label: "Resources",
    base: "/resources",
    pages: {
      guides: {
        title: "Guides",
        tagline: "Step-by-step playbooks",
        description: "Practical guides to help you plan, launch and grow your digital commerce business.",
        points: ["Launch checklists", "Platform comparisons", "SEO playbooks", "Growth frameworks"],
      },
      faqs: {
        title: "FAQs",
        tagline: "Quick answers",
        description: "Answers to the most common questions about our services, process and pricing.",
        points: ["Project timelines", "Pricing questions", "Support details", "Process overview"],
      },
      insights: {
        title: "Insights",
        tagline: "Data-driven perspectives",
        description: "Research and insights on digital commerce trends, consumer behavior and technology shifts.",
        points: ["Industry reports", "Trend analysis", "Consumer insights", "Market data"],
      },
    },
  },
};

export function getSubpage(section: SectionKey, slug: string): Subpage | undefined {
  const pages = menuSections[section].pages;
  return Object.hasOwn(pages, slug) ? pages[slug] : undefined;
}
