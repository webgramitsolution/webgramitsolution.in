type IndustryContent = {
  heading: string;
  description: string;
  sections: readonly [title: string, copy: string][];
  next: { href: string; label: string };
};

export const industryContent = {
  manufacturing: {
    heading: "Dealer and Distributor Portals for Manufacturers",
    description:
      "Help Indian manufacturers share technical catalogues, manage dealer access and handle bulk orders or RFQs from a single B2B portal.",
    sections: [
      [
        "Give procurement teams usable specifications",
        "Organise products by model, application and specification. Attach current drawings or datasheets and decide which technical documents are public.",
      ],
      [
        "Set dealer account and order rules",
        "Define who approves dealer registration, how regional price lists work and which orders need a quotation. Agree how the portal reads approved stock and pricing from your ERP.",
      ],
    ],
    next: { href: "/solutions/b2b-commerce", label: "Explore dealer ordering portals" },
  },
  retail: {
    heading: "Retail Ecommerce Websites for Shops and Store Networks",
    description:
      "Connect retail catalogues and physical shops with mobile ecommerce, inventory visibility, delivery or collection options and clear returns information.",
    sections: [
      [
        "Decide how shoppers receive their orders",
        "Plan local delivery zones, collection hours and return locations. If online stock depends on branches, define how availability is shown before checkout.",
      ],
      [
        "Keep your catalogue and promotions manageable",
        "Agree which products, prices and offers appear online, and who publishes changes. Set expectations for syncing promotions with your POS or inventory system.",
      ],
    ],
    next: {
      href: "/solutions/ecommerce-development",
      label: "Explore retail storefront development",
    },
  },
  wholesale: {
    heading: "Wholesale Ordering Websites and Trade Accounts",
    description:
      "Move wholesale reorders online with pack quantities, account-based price lists, credit terms and sales representative workflows.",
    sections: [
      [
        "Make regular orders easier to repeat",
        "Let buyers reorder from saved lists or order history. Show prices by pack or unit and enforce minimum quantities before they submit an order.",
      ],
      [
        "Handle exceptions without losing order context",
        "Agree which buyers can purchase on credit, who approves an exception and when a sales representative can place an order on a customer’s behalf.",
      ],
    ],
    next: { href: "/solutions/b2b-commerce", label: "Compare wholesale portal features" },
  },
  furniture: {
    heading: "Furniture and Home Décor Ecommerce Stores",
    description:
      "Help buyers compare materials, dimensions and delivery options with a furniture ecommerce website built around real catalogue details.",
    sections: [
      [
        "Make measurements and options easy to compare",
        "Show dimensions, finish options, material and assembly requirements alongside photography. Identify what is stocked, made to order or available by quote.",
      ],
      [
        "Set realistic delivery expectations",
        "Clarify serviceable locations, large-item shipping and installation options. Capture the right access and delivery details before fulfilment.",
      ],
    ],
    next: {
      href: "/services/woocommerce",
      label: "Explore custom catalogue options in WooCommerce",
    },
  },
  fashion: {
    heading: "Fashion Ecommerce Websites for Apparel and Lifestyle Brands",
    description:
      "Plan a fashion storefront with collection drops, size and fit information, mobile product pages and clear exchange journeys.",
    sections: [
      [
        "Help shoppers choose the right fit",
        "Pair item-specific measurements with size charts, variant photography and availability. Show exchange terms on product pages so shoppers can decide before checkout.",
      ],
      [
        "Plan how your team will launch collections",
        "Agree how to group seasonal products, schedule releases and handle sold-out variants. Keep filters and navigation stable as your assortment expands.",
      ],
    ],
    next: { href: "/services/shopify", label: "Explore Shopify theme design for fashion" },
  },
  electronics: {
    heading: "Electronics Ecommerce Websites with Product Comparisons",
    description:
      "Build electronics storefronts with model-level specifications, compatible accessories, warranty information and structured product filters.",
    sections: [
      [
        "Make model differences clear",
        "Set consistent fields for technical specifications, region or model variants and included accessories. Group comparable products to make shortlisting easier.",
      ],
      [
        "Explain warranty and fulfilment before checkout",
        "Show relevant warranty terms, shipping limits and service contact details. Confirm inventory and financing options for each category before promising them online.",
      ],
    ],
    next: {
      href: "/solutions/ecommerce-development",
      label: "Explore ecommerce catalogue development",
    },
  },
  "building-materials": {
    heading: "B2B Catalogue Websites for Building Material Suppliers",
    description:
      "Publish material specifications, bulk packs and project enquiries for contractors, dealers and building material procurement teams.",
    sections: [
      [
        "Design around project quantities and units",
        "Show whether materials are priced by piece, weight or area and organise technical data by application. Give buyers enough context to request the correct quantity.",
      ],
      [
        "Qualify site deliveries and quote requests",
        "Collect project location, delivery window and unloading needs where relevant. Route non-standard orders to staff when freight or credit terms require approval.",
      ],
    ],
    next: { href: "/solutions/b2b-commerce", label: "Explore B2B quote and order workflows" },
  },
  beauty: {
    heading: "Beauty and Personal Care Ecommerce Websites",
    description:
      "Build a beauty storefront for Indian D2C brands with ingredient information, product routines, bundles and reorder journeys.",
    sections: [
      [
        "Make ingredients and product use easy to find",
        "Put ingredient lists, size, application instructions and relevant cautions where shoppers compare products. Have your team review claims before publication.",
      ],
      [
        "Plan bundles, variants and repeat purchases",
        "Decide how kits share stock with standalone products and clarify how offers apply across variants. Use order history and catalogue links to help customers find a product again.",
      ],
    ],
    next: { href: "/services/shopify", label: "Explore Shopify development for D2C stores" },
  },
  distribution: {
    heading: "Inventory and Ordering Portals for Distributors",
    description:
      "Build distribution portals that connect reseller orders, branch inventory, approvals and back-office workflows.",
    sections: [
      [
        "Map how orders move between branches",
        "Define where stock is reserved, how warehouses fulfil orders and when staff should intervene. Clarify whether customers see live or periodically synced availability.",
      ],
      [
        "Decide which manual tasks to automate first",
        "Identify repeated order entry, availability checks or approval handoffs. Prioritise the workflows with clearly defined owners and reliable source data.",
      ],
    ],
    next: { href: "/services/api-integration", label: "Explore inventory and order integrations" },
  },
} satisfies Record<string, IndustryContent>;
