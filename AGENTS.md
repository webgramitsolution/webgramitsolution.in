<!-- LOVABLE:BEGIN -->

> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.

<!-- LOVABLE:END -->

# AGENTS.md

- Routes: `/`, `/contact`, `/about`, dynamic solution/service/work/resource pages, public blog and secured admin.
- Shared public header is sticky; shared footer is mounted at root. Dashboard sidebars remain sticky while content scrolls.
- Blog lists/articles share a category header; missing pages share the not-found view with HTTP 404.
- Menu data uses `src/lib/menu-pages.ts`; generic pages use `SubpageTemplate`; dedicated pages retain custom layouts.
- Keep desktop composition on tablets; only phones compact or stack. Heroes are 348px on tablet/desktop and taller on phones; imagery uses contain.
- Subpage hero presentation is shared through the contact-hero/site-hero/ecom-hero CSS selectors, excluding homepage hero-shell, so heading line count and phone overlays stay consistent; WooCommerce/Shopify artwork uses `ecom-hero-art`.
- Arabic hero artwork is cropped into a left-side region via language-aware shared CSS, never horizontally mirrored, so printed artwork stays legible.
- Technology rows keep readable fixed-width logo items with contained horizontal overflow when one row cannot fit.
- Manrope and semantic h1–h6/paragraph rules are global; page utilities may refine responsive presentation.
- Keep ImageKit URLs verbatim and supplied Next.js/API Integration logos.
- Email delivery uses Hostinger SMTP through a server-only helper.
- Blog management requires a server-checked MySQL admin allowlist; public posts require published status and elapsed publish time.
- Guest section is retired: no guest routes, sign-up or comment form, and guest/credit/game RPCs are revoked from visitors so it cannot be used directly; old credit records stay append-only.
- AdSense is consent-gated and limited to blog lists/articles and legal rails; disclosure helpers set ad counts; no sitewide/footer ads.
- Blog previews share a limit selector; excerpts stay in search/social data. Related links rank by category/tags/recency without duplicates.
- Article disclosure keeps full HTML on one URL; hidden ads/rewards mount only after expansion.
- Ads share one renderer, one initialization per visible unit and consent events across navigation.
- AdSense slot 9892982015 serves blog category bands and slot 6145308694 serves sticky side rails; auto/anchor ads are not part of the site layout.
- Legal content lives on dedicated public routes linked from the shared footer.
- Legal pages, including the dedicated India DPDP Policy, share one structured long-form renderer. The B2B Marketplace Development page covers multi-vendor workflows and links to the single-supplier B2B Commerce page.
- Homepage reviews are public only when published; administrators manage review visibility and ordering through the secured requests area.
- Primary blog categories have indexable `/blog/category/:slug` pages and belong in the dynamic sitemap; subcategories remain filters.
- Public blog/category/sitemap URLs use the canonical apex `https://webgramitsolution.in`.
- Legacy article aliases use explicit HTTP 301 routes to confirmed equivalent canonical articles, preserving query parameters; aliases stay out of the sitemap.
- `/services/website-design` and `/services/shopify` have dedicated static routes so their custom pages, metadata and visible-FAQ schema cannot fall through the generic service renderer.
- Service CTA bands share `TrustFacts` and FAQ answers come from one approved content module (pickFaqs throws on unknown questions), so no page shows invented counts or placeholder answers.
- Runtime data uses Hostinger MySQL through server functions. Supabase Auth verifies admin identities and MySQL holds the admin allowlist. Enquiries use server validation and a per-email database lock to enforce the submission limit.
- Self-hosted builds use Nitro `node-server` (`npm run build` → `npm start`) since Hostinger runs Node.js; Lovable builds override the preset.
- Search pings: admin-only server fn calls Google Indexing API and IndexNow (key file in public/); RSS at /feed.xml.
- Share the supplied testimonial strip above the public footer; never duplicate it in pages.
- Portfolio/website previews use bundled assets for self-hosting; PortfolioCard has a compact grid variant to preserve readable details.
- India is the only marketed region. Historical `/ae` and `/kw` URLs redirect to the homepage.
- Public structured data uses the shared site identity and linked page IDs; include only evidenced facts and visible answers, not unsupported rating, price, founder or search-action claims, to keep machine-readable business information consistent.
- FAQ JSON-LD is generated from the same grouped answers shown on the FAQ page and shares its page identity, preventing hidden or inconsistent answers; homepage head changes belong in the index route rather than a standalone HTML file.
- Agent readiness: start.ts serves a negotiated Markdown homepage at `/` and advertises llms.txt in the Link header; WebMCP tools stay read-only.
- `/locations` pages share `location-page.tsx`; `projectsForLocation` shows only genuine city/NCR portfolio items.
- Blog FAQs use `normalizeBlogFaqs` for both the visible section and FAQPage schema, so they always match.
- Speed: GTM loads asynchronously from the shared document head, Manrope self-hosted, sign-in client loaded on demand, ImageKit sized via `ikResize`.
