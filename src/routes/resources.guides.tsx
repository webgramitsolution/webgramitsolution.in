import { ServiceHero, serviceHeroImage } from "@/components/service-hero";
import { SITE_URL } from "@/lib/site-identity";
import { projectGuides } from "@/lib/project-guides";
import { HeroHeading } from "@/components/hero-heading";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";

const URL = SITE_URL + "/resources/guides";
const heroImage = SITE_URL + serviceHeroImage("website-guides");
const title = "Website & Ecommerce Guides for Business Owners | Webgram IT Solution";
const description =
  "Step-by-step guides from Webgram IT Solution on planning a business website, launching an ecommerce or B2B store, choosing WooCommerce vs Shopify, speed and SEO basics.";

export const Route = createFileRoute("/resources/guides")({
  head: () => ({
    links: [{ rel: "canonical", href: URL }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
  }),
  component: GuidesPage,
});

const guides: Array<{ id: string; title: string; intro: string; steps: Array<[string, string]> }> =
  [
    {
      id: "plan-business-website",
      title: "How to plan a business website that brings enquiries",
      intro:
        "A good website starts with clear goals, not colours. Use this checklist before you speak to any developer.",
      steps: [
        [
          "Define one main goal",
          "Calls, enquiries, bookings or online sales — decide what success means so every page pushes towards it.",
        ],
        [
          "List your pages",
          "Home, About, Services (one page per service), Portfolio, Contact and legal pages are the minimum for trust and SEO.",
        ],
        [
          "Collect content early",
          "Logo, service details, real photos, prices or ranges and customer reviews speed up the project more than anything else.",
        ],
        [
          "Plan for mobile first",
          "Most Indian visitors arrive on phones. Check buttons, forms and text size on a small screen before desktop.",
        ],
        [
          "Add tracking from day one",
          "Connect Google Search Console, Analytics and your Google Business Profile so you can measure real enquiries.",
        ],
      ],
    },
    {
      id: "launch-ecommerce-store",
      title: "Launching your first ecommerce store: a practical checklist",
      intro:
        "Selling online is more than uploading products. These are the steps we follow for D2C stores like Houskase and Mukesh Murtikar.",
      steps: [
        [
          "Organise your catalogue",
          "Group products into clear categories, write unique descriptions and use consistent, well-lit product photos.",
        ],
        [
          "Set up payments and shipping",
          "Add UPI, cards and COD if needed, then define shipping zones, charges and free-shipping thresholds.",
        ],
        [
          "Build trust signals",
          "Show return policy, contact details, secure-payment badges and genuine customer reviews near the buy button.",
        ],
        [
          "Make checkout short",
          "Fewer fields, guest checkout and auto-filled addresses reduce abandoned carts.",
        ],
        [
          "Plan launch marketing",
          "Prepare offers, Instagram reels, WhatsApp broadcasts and Google Shopping feeds before going live.",
        ],
      ],
    },
    {
      id: "b2b-commerce-basics",
      title: "B2B and wholesale commerce: what your portal needs",
      intro:
        "Wholesale buyers order differently from retail shoppers. A B2B portal should match the way they already buy.",
      steps: [
        [
          "Customer-specific pricing",
          "Show tier or group prices only after login so each buyer sees their own rates.",
        ],
        [
          "Minimum order quantities",
          "Enforce MOQ and pack sizes automatically to avoid manual corrections.",
        ],
        [
          "Quotes and RFQs",
          "Let buyers request quotes for large orders and convert approved quotes into orders in one click.",
        ],
        [
          "Quick reorder",
          "Saved lists and order history help repeat buyers place orders in seconds.",
        ],
        [
          "Integrations",
          "Connect ERP, inventory and accounting so stock and invoices stay accurate.",
        ],
      ],
    },
    {
      id: "woocommerce-vs-shopify",
      title: "WooCommerce vs Shopify: which one should you choose?",
      intro:
        "Both platforms are excellent. The right one depends on budget, control and how much you want to customise.",
      steps: [
        [
          "Choose WooCommerce for control",
          "You own the hosting and code, can customise anything and avoid monthly platform fees — ideal for content-rich or custom stores.",
        ],
        [
          "Choose Shopify for speed",
          "Hosting, security and updates are handled for you, so you can launch quickly with a predictable monthly plan.",
        ],
        [
          "Compare total cost",
          "Add themes, apps, transaction fees and hosting over two to three years, not just the first month.",
        ],
        [
          "Think about growth",
          "If you need B2B pricing, custom workflows or deep integrations, a customised WooCommerce or custom build usually scales better.",
        ],
      ],
    },
    {
      id: "speed-and-seo",
      title: "Speed and SEO basics every website owner should know",
      intro:
        "Fast, well-structured pages rank better and convert more visitors. Start with these quick wins.",
      steps: [
        [
          "Compress images",
          "Use modern formats like WebP and correct sizes; images are usually the heaviest part of a page.",
        ],
        [
          "Write unique titles and descriptions",
          "Every page needs its own title and meta description that matches what people search for.",
        ],
        [
          "Use clear headings",
          "One H1 per page and logical H2/H3 sections help both readers and search engines.",
        ],
        [
          "Keep the Google Business Profile updated",
          "Same name, address and phone as your website builds local trust and map visibility.",
        ],
        [
          "Submit a sitemap",
          "Add your sitemap in Google Search Console and Bing Webmaster Tools so new pages are discovered quickly.",
        ],
      ],
    },
  ];

function GuidesPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ServiceHero slug="website-guides">
        <div className="ecom-shell relative flex h-full items-center py-6">
          <div className="max-w-[540px]">
            <HeroHeading
              className="text-[30px] font-medium leading-tight"
              lines={["Guides for Growing", "Your Business Online"]}
              accent="text-[#f4c657]"
            />
            <p className="mt-3 max-w-md text-sm leading-relaxed text-on-dark/90 md:text-base">
              Plan your website, compare ecommerce platforms and get your online store or B2B portal
              ready to launch.
            </p>
            <Button asChild className="mt-4 min-h-11">
              <a href="#guides-list">
                Browse Guides <ArrowRight aria-hidden="true" />
              </a>
            </Button>
          </div>
        </div>
      </ServiceHero>
      <section
        id="guides-list"
        aria-label="Website and ecommerce guides"
        className="scroll-mt-32 py-10 md:py-14"
      >
        <div className="header-shell grid gap-8 md:grid-cols-[240px_minmax(0,1fr)]">
          <nav
            aria-label="Guides"
            className="h-fit rounded-lg border border-border bg-card p-4 shadow-card md:sticky md:top-28"
          >
            <p className="text-[14px] font-semibold uppercase text-primary">In this page</p>
            <ul className="mt-2 grid gap-1">
              {guides.map((guide) => (
                <li key={guide.id}>
                  <a
                    href={`#${guide.id}`}
                    className="block py-1.5 text-[15px] text-navy hover:text-primary"
                  >
                    {guide.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <div className="grid gap-8">
            <section className="grid gap-3 sm:grid-cols-2" aria-label="Project checklists">
              {Object.values(projectGuides).map((guide) => (
                <a
                  key={guide.path}
                  href={guide.path}
                  className="rounded-lg border border-border bg-card p-4 shadow-card hover:border-primary"
                >
                  <h2 className="text-lg text-navy">{guide.lines.join(" ")}</h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {guide.description}
                  </p>
                </a>
              ))}
            </section>
            {guides.map((guide, index) => (
              <article
                key={guide.id}
                id={guide.id}
                className="scroll-mt-28 rounded-xl border border-border bg-card p-5 shadow-card md:p-7"
              >
                <p className="text-[13px] font-semibold uppercase text-primary">
                  Guide {index + 1}
                </p>
                <h2 className="mt-1 text-[24px] text-navy">{guide.title}</h2>
                <p className="mt-2 text-[16px] leading-7 text-muted-foreground">{guide.intro}</p>
                <ol className="mt-5 grid gap-4">
                  {guide.steps.map(([step, text]) => (
                    <li key={step} className="flex gap-3">
                      <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-primary" />
                      <div>
                        <h3 className="text-[17px] text-navy">{step}</h3>
                        <p className="mt-1 text-[16px] leading-7 text-muted-foreground">{text}</p>
                      </div>
                    </li>
                  ))}
                </ol>
              </article>
            ))}
            <div className="rounded-xl bg-sky-soft p-6">
              <h2 className="text-[22px] text-navy">Need help applying these guides?</h2>
              <p className="mt-1 text-[16px] text-muted-foreground">
                Our team can audit your website or plan your new store for free.
              </p>
              <Button
                asChild
                className="mt-4 h-11 bg-gold px-6 text-[15px] font-semibold text-navy hover:bg-gold/90"
              >
                <Link to="/contact">
                  Talk to an Expert <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
