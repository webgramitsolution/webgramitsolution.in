# Webgram IT Solution

India-focused ecommerce, Shopify, WooCommerce, web design and B2B portal agency website. The application uses TanStack Start, React and Nitro with Hostinger MySQL for application data and Supabase Auth for admin identity. Canonical public URLs use `https://webgramitsolution.in`.

## Local development

Use Node.js 22.12+ or 24. Copy `.env.example` to `.env` and fill in your project values. Use the same Supabase Auth project URL and publishable key in the server and Vite variables.

```sh
npm ci
npm run db:setup
npm run dev
```

## Hostinger Cloud

Use the Node.js web app feature in hPanel. Build with `npm ci && npm run build` and run `npm start` or `node .output/server/index.mjs`. Nitro serves the static assets from `.output/public` and renders routes, sitemaps, server functions and feeds on Node. If uploading a prebuilt app, include the entire `.output` directory.

Set the environment variables from `.env.example` in hPanel. Supply the Vite values during the build and the server values at runtime. Attach `webgramitsolution.in` to the app and enable HTTPS. At the old .com host, configure a permanent redirect to the corresponding .in path, including the query string. Route www to the apex too. Verify Supabase Auth Site URL and allowed callbacks for the .in domain before testing admin login.

For email, use a verified Hostinger mailbox and the Hostinger-provided SPF, DKIM and DMARC DNS settings. Set `ENQUIRY_INBOX` to the monitored team inbox. The existing .com contact mailbox is the default until you configure an alternative. Submit one controlled enquiry, then verify the admin record, team email and client acknowledgement before directing traffic to the site.

A fresh deployment initializes the MySQL tables on its first database request. Set `DB_ADMIN_USER_ID` in hPanel to the existing administrator's Supabase Auth user UUID before testing admin sign-in.

## Move existing data to Hostinger MySQL

1. Provision a dedicated MySQL database. Hostinger can set `DB_HOST`, `DB_PORT`, `DB_NAME`, `DB_USER` and `DB_PASSWORD` automatically. Use `127.0.0.1` on the Hostinger app server. Preserve these entries when adding the Supabase Auth and SMTP settings in hPanel.
2. Before switching traffic, back up both databases and temporarily pause changes to the source. Apply `mysql/schema.sql` in the destination using phpMyAdmin or run `npm run db:setup` from a shell that can access the destination.
3. From a secure shell that can access both databases, set `MIGRATION_SOURCE_DATABASE_URL` to the Supabase project’s direct or session-pooler **Postgres** connection string, using a role with read access to the source tables. Run `npm run db:import-supabase`. Enable `DB_SSL=true` for a remote MySQL connection that requires TLS. The importer reads a consistent snapshot, copies the active app tables and admin role assignments, and commits the MySQL changes together. Reruns skip IDs already present. For a fresh database, use `DB_ADMIN_USER_ID` with the existing admin’s Supabase Auth user UUID when running `npm run db:setup`.
4. Verify the imported row counts, an existing blog URL, draft visibility, admin login and access, and the enquiry inbox. Deploy the verified branch with the hPanel Node.js settings above and test the quote form and SMTP delivery on the production domain.

Keep the migration connection string in the secure shell used for the import. The deployed app needs only Supabase Auth settings, MySQL settings and optional delivery settings.

## Lead follow-up

The public quote form saves leads to the `enquiries` table in Hostinger MySQL. The secured admin requests area remains the lead inbox and supports replies. The server sends a team notification and a branded customer acknowledgement. A delivery failure leaves the saved enquiry available in the admin inbox and records the failed channel and enquiry ID in server logs.

Zoho CRM Free supports up to three users and is an option for a small sales team using manual lead entry or CSV import. Check Zoho’s current edition limits and whether your automation provider and Zoho plan support the required write action before choosing automated sync. To use the optional webhook, set `ENQUIRY_CRM_WEBHOOK_URL` to a private HTTPS endpoint you control. Map name, email, phone, service, business, budget, timeline and message to the CRM, and deduplicate using the enquiry `id` or `Idempotency-Key` header. The endpoint receives personal information from the quote request. The existing admin inbox can be used without any external CRM.

## Search and content

Submit `https://webgramitsolution.in/sitemap.xml` to Google Search Console and Bing Webmaster Tools after deployment. The sitemap includes public menu pages, India service locations, published articles and primary blog categories. Legal, admin and legacy routes stay outside the sitemap. Update `src/lib/menu-pages.ts` when adding a service or software landing page, and use the existing page and schema helpers for visible, factual content.
