type ProjectGuide = {
  path: `/resources/${string}`;
  title: string;
  lines: readonly [string, string];
  description: string;
  sections: readonly (readonly [string, string, string])[];
  links: readonly (readonly [string, string])[];
};

export const projectGuides = {
  redesign: {
    path: "/resources/ecommerce-redesign-checklist",
    title: "Ecommerce Redesign Checklist | URLs, Checkout & SEO",
    lines: ["Ecommerce Redesign", "and Migration Checklist"],
    description: "Plan an ecommerce redesign in India with a checklist for product URLs, 301 redirects, Shopify and WooCommerce migration, checkout testing and launch monitoring.",
    sections: [
      ["Record how your current store performs", "Export product, category and campaign URLs before design begins. Use Search Console, analytics and your sitemap to find pages with traffic, links or orders. Save the URL, page type, current canonical and proposed destination in a shared spreadsheet.", "Capture mobile checkout completion, payment failures, top landing pages and organic clicks before launch. Pick the same reports and comparison window for the new site so routine seasonal changes do not get confused with migration issues."],
      ["Preserve product URLs and map redirects", "Keep URLs that already serve the same product and match the new catalogue. For changed URLs, map the old address to the closest equivalent destination and use a permanent redirect. Send old variants to an equivalent product only when it still answers the same buying need.", "Test each priority redirect in staging. Look for chains, loops and destinations that return errors. Update internal links, canonicals and the XML sitemap to use the final URLs. Include deleted products in the review so the team can decide which addresses have a suitable replacement."],
      ["Rehearse the catalogue and customer migration", "Test a sample import before migrating the whole catalogue. Include products with multiple variants, sale prices, out-of-stock stock states, tax classes and large image galleries. Verify that SKUs, images, stock counts and product URLs map correctly.", "Shopify and WooCommerce handle exports, accounts and extensions differently. Confirm whether customers need to reactivate accounts and how order history will be retained. Agree who handles orders or stock changes that occur between the first export and launch."],
      ["Test checkout, shipping and payments on mobile", "Run a complete order from product page to confirmation in supported browsers. Include guest checkout, a returning customer, coupons, GST where relevant and both serviceable and unserviceable PIN codes. Test shipping rates, COD and the payment methods your store offers.", "Check what happens when a payment fails or is cancelled and when the gateway sends a repeated notification. Confirm that inventory changes once, order status is correct, and the buyer gets the right messages. Test a cancellation and refund as part of the same rehearsal."],
      ["Launch with an owner and rollback plan", "Assign an owner for DNS, redirects, checkout and support. Keep a current backup and agree what failures trigger a rollback, such as confirmed payments with no corresponding orders. After going live, test key product URLs and submit an updated sitemap.", "Review 404s, indexing reports, gateway failures and completed checkouts over the following weeks. Prioritise errors on high-traffic landing pages and active campaigns. Record what changed and when so the team can diagnose problems without guessing."],
    ],
    links: [
      ["Website redesign services", "/services/website-design"],
      ["Ecommerce buyer’s guide", "/blog/ecommerce-website-development-india-guide"],
      ["Google Search Central site-move documentation", "https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes"],
    ],
  },
  handover: {
    path: "/resources/website-handover-checklist",
    title: "Website Handover Checklist | Access, Backups & Support",
    lines: ["Website Handover", "Checklist for Business Owners"],
    description: "Use this website handover checklist to confirm domain and admin access, source code, licences, backups, documentation and post-launch support.",
    sections: [
      ["Verify control of the domain and hosting", "Sign in to the registrar, hosting provider and DNS manager with company-controlled accounts. Check the recovery email, multi-factor authentication, billing owner and renewal date. Confirm who can update DNS during an outage or migration.", "Record the services that depend on DNS, including email, verification records and third-party domains. Keep a copy of the configuration and note who can approve changes. For hosted ecommerce platforms, confirm the store owner account and who controls the connected domain."],
      ["Collect the files, code and licences you agreed to receive", "For a custom website, confirm access to the repository, deployment workflow, database schema and the instructions needed to run or rebuild the project. For a platform-based site, collect the theme, approved design files and product or content exports available under the agreement.", "Document paid apps, fonts, themes, plugins and image licences. Mark who owns each licence and when it renews. Record which credentials belong in a password manager and which staff members need access. Use account invitations or secure sharing for the transfer."],
      ["Ask the team to demonstrate everyday tasks", "Have a member of your team sign in and complete the jobs they will do regularly. On a store, that might mean changing stock, exporting orders and processing a refund. On a corporate site, test publishing a page and checking that a form reaches the right inbox.", "Ask for a short recorded walkthrough or written checklist. Record who can edit content, who approves changes and how to restore an earlier version. Confirm access to analytics and Search Console, then check that your main conversion events are recording correctly."],
      ["Validate backups and document integrations", "Record what is backed up, where copies are stored and how long they are retained. Confirm who can recover the website and database. Test a restore on a safe environment and discuss how to handle orders or content added after the last backup.", "List every payment, shipping, CRM and inventory integration, its account owner and where errors are reported. Write a short procedure for a payment mismatch or failed order sync, including which logs support staff can check and how to escalate the issue."],
      ["Agree the support scope before signing off", "Write down which defects fall within the post-launch support period, how feature requests are priced and when someone will respond to an incident. Confirm who monitors the website and who can approve urgent fixes outside business hours.", "End the handover by checking that your team can sign in, recover access and perform key tasks independently. List any outstanding issues with owners and target dates. Store the checklist with contracts and renewal details so it stays available when staff change."],
    ],
    links: [
      ["Website maintenance and support", "/services/website-maintenance"],
      ["Ecommerce redesign checklist", "/resources/ecommerce-redesign-checklist"],
      ["Talk to the Webgram team", "/contact"],
    ],
  },
} as const satisfies Record<string, ProjectGuide>;
