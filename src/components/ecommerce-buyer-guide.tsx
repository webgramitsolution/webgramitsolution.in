import { HeroHeading } from "@/components/hero-heading";
import "./ecommerce-buyer-guide.css";

export function EcommerceBuyerGuide() {
  return (
    <article className="buyer-guide" aria-labelledby="article-title">
    <header>
    <a className="brand" href="/blog">Webgram Blog</a>
    <HeroHeading id="article-title" className="guide-title" lines={["Ecommerce Website Development in India", "A 10-Step Buyer’s Guide"]} />
    <p className="dek">Start with how customers buy, how your team fulfils orders and what you need to own after launch. Those decisions shape your platform, development quote and rollout.</p>
    <p>Whether you run a Delhi NCR wholesale business or a D2C brand selling across India, use this guide to turn an ecommerce idea into a brief you can compare across development partners.</p>
    </header>
    <div className="gallery" aria-label="Ecommerce project examples">
    <figure><img src="/images/ecommerce-guide/shopify.webp" width="480" height="360" alt="Shopify storefront layouts on laptop and mobile screens" /><figcaption>Shopify storefront design</figcaption></figure>
    <figure><img src="/images/ecommerce-guide/woocommerce.webp" width="480" height="360" alt="WooCommerce storefront and WordPress commerce design" /><figcaption>WooCommerce storefront design</figcaption></figure>
    <figure><img src="/images/ecommerce-guide/wholesale.webp" width="480" height="360" alt="Wholesale commerce and business buyer workflow illustration" /><figcaption>B2B buyer workflows</figcaption></figure>
    <figure><img src="/images/ecommerce-guide/retail.webp" width="480" height="360" alt="Fashion ecommerce website design example" /><figcaption>Retail catalogue design</figcaption></figure>
    </div>
    <nav className="contents" aria-label="In this guide">
    <strong>In this guide</strong>
    <ul>
    <li><a href="#platform">Platform</a></li><li><a href="#quote">Project quote</a></li><li><a href="#wholesale">B2B workflows</a></li><li><a href="#brief">Developer brief</a></li><li><a href="#maintenance">Maintenance</a></li><li><a href="#payments">Payments</a></li><li><a href="#integrations">Integrations</a></li><li><a href="#redesign">Redesign</a></li><li><a href="#marketplace">Marketplace</a></li><li><a href="#handover">Handover</a></li>
    </ul>
    </nav>
    <div className="editorial">
    <section id="platform">
    <h2>1. Shopify vs WooCommerce</h2>
    <p>Choose Shopify if you want managed hosting and a store your team can operate through Shopify’s admin. Choose WooCommerce if WordPress is central to your business and you want more control over hosting, content and extensions. List any checkout, wholesale or reporting requirement before choosing. A feature that needs a paid app or custom integration can change the economics of either platform.</p>
    <p>Compare the first year of platform or hosting charges, apps, support and payment fees. Ask whoever will run the store to try adding a product and processing a refund.</p>
    <p><a href="/services/shopify">Shopify development</a> · <a href="/services/woocommerce">WooCommerce development</a> · <a href="https://help.shopify.com/en/manual/intro-to-shopify">Shopify documentation</a></p>
    </section>
    <section id="quote">
    <h2>2. What should a development quote include?</h2>
    <p>A useful ecommerce development quote itemises design, catalogue setup, checkout, integrations, testing, launch and handover. It should say how many templates or products are included, who supplies content and what happens when requirements change. Ask which fees recur for hosting, plugins, gateway transactions and ongoing support.</p>
    <p>Compare quotes against the same scope. For example, importing 500 clean products from a spreadsheet is a different task from consolidating inconsistent SKUs, images and tax categories. Agree what each milestone must demonstrate before you approve it. Ask who signs off and who owns any migration work.</p>
    <p><a href="/solutions/ecommerce-development">Ecommerce development services</a></p>
    </section>
    <section id="wholesale">
    <h2>3. Which workflows belong in a B2B portal?</h2>
    <p>Start with the rules your sales team uses today. Map who can register, which buyers get contract pricing and when orders require approval. Prioritise tier pricing, minimum order quantities, quote requests, bulk ordering and credit terms according to how your dealers buy.</p>
    <p>Test one order end to end. A dealer signs in, sees the right price, submits a bulk order and receives an invoice after approval. Confirm who can override pricing or credit limits, what the ERP receives and how rejected orders are explained to the buyer. Repeat the test with a second buyer group.</p>
    <p><a href="/solutions/b2b-commerce">B2B ecommerce and dealer portals</a></p>
    </section>
    <section id="brief">
    <h2>4. What should you send your developer?</h2>
    <p>Give your developer a sample product sheet, customer profiles, target markets, brand assets and examples of the buying journeys you need. Specify payment methods, shipping zones, returns rules and existing systems. Name the person who approves each item and list your launch deadline and budget range.</p>
    <p>Write requirements as observable outcomes. “A shopper in an eligible PIN code can see a delivery charge before payment” gives a team a testable goal. Share an anonymised export if customer data is involved. Mark what must ship on day one, what can follow and what depends on another vendor.</p>
    <p><a href="/contact">Discuss your ecommerce requirements</a></p>
    </section>
    <section id="maintenance">
    <h2>5. What does ecommerce maintenance cover?</h2>
    <p>Define who handles updates, backups, monitoring and urgent incidents. For WooCommerce, confirm who tests WordPress and plugin updates in staging, how often backups run and how you recover an order placed after the last backup. For Shopify, review app permissions, theme changes and the integrations your store relies on.</p>
    <p>Ask for support hours, expected response times and the process for feature requests. Make sure responsibility for checking the checkout and monitoring failed integrations after launch appears in the support scope. Agree how the team will communicate findings and document fixes.</p>
    <p><a href="/services/website-maintenance">Website maintenance services</a></p>
    </section>
    <section id="payments">
    <h2>6. What should you test before enabling payments?</h2>
    <p>Test successful, failed and cancelled payments in your gateway’s test environment. Check that the order status matches the confirmed payment, that customers receive the right email and that refunds appear in both systems. Validate webhooks and repeat deliveries so a retried event cannot create a duplicate order.</p>
    <p>Test supported payment methods, including UPI where offered, on a real mobile device. Confirm how the team reconciles orders against settlements. Once production credentials and webhook settings are configured, run an approved low-value live payment and refund to verify the complete workflow.</p>
    <p><a href="https://razorpay.com/docs/payments/payment-gateway/">Razorpay payment gateway documentation</a></p>
    </section>
    <section id="integrations">
    <h2>7. How should inventory and CRM integrations sync?</h2>
    <p>Decide which system owns each record before writing an integration. Your inventory tool might own stock counts, your storefront might create orders and your CRM might own lead follow-up. Write down which direction each record travels, how systems recognise the same SKU or customer and how quickly updates must appear.</p>
    <p>Plan for a timeout, a duplicate request and a partial failure. Decide who receives alerts and how they can safely retry from the last confirmed state. Test with sample data covering stock changes, cancellations, returns and customers who place more than one order.</p>
    <p><a href="/services/api-integration">API and business system integrations</a></p>
    </section>
    <section id="redesign">
    <h2>8. How can a redesign protect URLs and checkout?</h2>
    <p>Export current URLs, including product and category pages with traffic or backlinks. Keep valuable URLs where possible. For changed URLs, map each old address to its closest replacement and implement permanent redirects. Check canonical tags, internal links and the XML sitemap before launch.</p>
    <p>Run a full checkout regression on mobile. Verify cart totals, coupons, shipping, taxes, order confirmations and payment status. After launch, review search indexing, 404s and checkout completions. Keep a copy of the old URL map and record when each issue was fixed so you can investigate drops by page or device.</p>
    <p><a href="https://developers.google.com/search/docs/crawling-indexing/site-move-with-url-changes">Google Search Central’s site move documentation</a></p>
    </section>
    <section id="marketplace">
    <h2>9. What should a multi-vendor marketplace scope cover?</h2>
    <p>Decide who approves sellers and products, who takes payment, who fulfils orders and who handles disputes. Write down commission rules, payout timing, returns and cancellation responsibilities. A directory that passes enquiries to suppliers has a different workflow from a marketplace that splits payment across sellers.</p>
    <p>Use a sample cart with items from two vendors. Map shipping charges, order notifications, a partial refund and the corresponding payout adjustments. Then specify what the buyer, seller and marketplace operator should see at each step. Bring your accounting and operations teams into that review.</p>
    <p><a href="/solutions/marketplace-development">Multi-vendor marketplace development</a></p>
    </section>
    <section id="handover">
    <h2>10. What should you receive at website handover?</h2>
    <p>Agree in writing who owns the domain, hosting, store account, analytics, code and licences. At handover, request business-controlled administrator access, an inventory of paid subscriptions, launch and backup instructions, the redirect map and a record of known issues. For custom builds, confirm repository access and deployment instructions.</p>
    <p>Ask for a walkthrough of everyday tasks such as changing prices, processing refunds and exporting orders. Verify that someone on your team can sign in using their own account. Transfer access through account invitations or a secure password manager, and agree when post-launch support begins and ends.</p>
    <p>Before the final sign-off, note who renews the domain and licences, who receives outage alerts and which contact can approve emergency work. Store that checklist where your team can find it during an incident.</p>
    </section>
    </div>
    <section className="closing" aria-labelledby="next">
    <h2 id="next">Before you request a quote</h2>
    <p>Bring a product sample, your buying and fulfilment rules, a list of integrations and the launch date. Ask your development partner to turn these into an itemised scope with responsibilities and acceptance checks.</p>
    <a href="/resources/faqs">Read Webgram’s FAQs</a> · <a href="/contact">Request a project quote</a>
    </section>
    </article>
  );
}
