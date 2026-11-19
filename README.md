# Webgram IT Solution

India-focused ecommerce, Shopify, WooCommerce, web design and B2B portal agency website. The application uses TanStack Start, React, Nitro and Supabase. Canonical public URLs use `https://webgramitsolution.in`.

## Local development

Use Node.js 22.12+ or 24. Copy `.env.example` to `.env` and fill in your project values. For the current Supabase project, use the same public URL and publishable key in both the server and Vite variables.

```sh
npm ci
npm run dev
```

## Hostinger Cloud

Use the Node.js web app feature in hPanel. Build with `npm ci && npm run build` and run `npm start` or `node .output/server/index.mjs`. Nitro serves the static assets from `.output/public` and renders routes, sitemaps, server functions and feeds on Node. If uploading a prebuilt app, include the entire `.output` directory.

Set the environment variables from `.env.example` in hPanel. Supply the Vite values during the build and the server values at runtime. Attach `webgramitsolution.in` to the app and enable HTTPS. At the old .com host, configure a permanent redirect to the corresponding .in path, including the query string. Route www to the apex too. Verify Supabase Auth Site URL and allowed callbacks for the .in domain before testing admin login.

For email, use a verified Hostinger mailbox and the Hostinger-provided SPF, DKIM and DMARC DNS settings. Set `ENQUIRY_INBOX` to the monitored team inbox. The existing .com contact mailbox is the default until you configure an alternative. Submit one controlled enquiry, then verify the admin record, team email and client acknowledgement before directing traffic to the site.

## Lead follow-up

The public quote form saves leads to the existing Supabase enquiries table via the `submit_enquiry` RPC. The secured admin requests area remains the lead inbox and supports replies. The server sends a team notification and a branded customer acknowledgement. A delivery failure leaves the saved enquiry available in the admin inbox and records the failed channel and enquiry ID in server logs.

Zoho CRM Free supports up to three users and is an option for a small sales team using manual lead entry or CSV import. Check Zoho’s current edition limits and whether your automation provider and Zoho plan support the required write action before choosing automated sync. To use the optional webhook, set `ENQUIRY_CRM_WEBHOOK_URL` to a private HTTPS endpoint you control. Map name, email, phone, service, business, budget, timeline and message to the CRM, and deduplicate using the enquiry `id` or `Idempotency-Key` header. The endpoint receives personal information from the quote request. The existing admin inbox can be used without any external CRM.

## Search and content

Submit `https://webgramitsolution.in/sitemap.xml` to Google Search Console and Bing Webmaster Tools after deployment. The sitemap includes public menu pages, India service locations, published articles and primary blog categories. Legal, admin and legacy routes stay outside the sitemap. Update `src/lib/menu-pages.ts` when adding a service or software landing page, and use the existing page and schema helpers for visible, factual content.
