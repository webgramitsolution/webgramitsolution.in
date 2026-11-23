import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowDown, ArrowRight, Building2, Check, Layers3, Mail, ShoppingBag } from "lucide-react";
import { HeroHeading } from "@/components/hero-heading";
import { ServiceHero, serviceHeroImage } from "@/components/service-hero";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { publicPageSchema, SITE_URL } from "@/lib/site-identity";

const path = "/pricing";
const title = "Website Development Pricing & Quotes | Webgram IT Solution";
const description = "See what affects the cost of a Webgram website, ecommerce store or B2B portal, and how to request a project-specific quote.";
const heroImage = SITE_URL + serviceHeroImage("project-pricing");

export const Route = createFileRoute("/pricing")({
  head: () => ({
    links: [{ rel: "canonical", href: SITE_URL + path }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:url", content: SITE_URL + path },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
    scripts: publicPageSchema(path, title, description),
  }),
  component: PricingPage,
});

const projectTypes = [
  {
    title: "Business websites",
    slug: "website-design-development",
    linkText: "Explore business websites",
    image: "business",
    icon: Building2,
    description: "For corporate websites, redesigns and lead-generation pages.",
    costDrivers: ["Page count and reusable templates", "Content migration and CMS setup", "Enquiry forms and integrations"],
  },
  {
    title: "Ecommerce stores",
    slug: "ecommerce-development",
    linkText: "Explore ecommerce stores",
    image: "ecommerce",
    icon: ShoppingBag,
    description: "For new Shopify or WooCommerce stores and platform migrations.",
    costDrivers: ["Catalogue size and product variants", "Checkout, payments and shipping", "Store migration and stock sync"],
  },
  {
    title: "B2B portals and marketplaces",
    slug: "b2b-commerce",
    linkText: "Explore B2B commerce",
    image: "b2b",
    icon: Layers3,
    description: "For wholesale ordering, dealer accounts and multi-vendor commerce.",
    costDrivers: ["Buyer and supplier roles", "Trade pricing and approval workflows", "ERP, inventory and order integrations"],
  },
] as const;

const quoteItems = [
  ["Development scope", "The pages, features, integrations and migration work your project needs."],
  ["Delivery and handover", "Expected milestones, testing, launch and ownership of the website and accounts."],
  ["Recurring costs", "Hosting, platform fees, third-party subscriptions and ongoing support where applicable."],
] as const;

function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ServiceHero slug="project-pricing">
          <div className="ecom-shell relative flex h-full items-center py-6">
            <div className="max-w-[540px]">
              <HeroHeading
                className="text-[30px] leading-tight md:!text-[clamp(32px,3.4vw,46px)] md:!font-semibold"
                lines={["Project Pricing", "Built Around Your Scope"]}
                accent="text-[#f4c657]"
              />
              <p className="mt-4 max-w-md text-sm leading-relaxed text-on-dark/90 md:text-base">
                Websites, online stores and B2B platforms are priced per project. Share your requirements for an itemised quote.
              </p>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button asChild className="min-h-11">
                  <Link to="/contact">Request a Project Quote <ArrowRight aria-hidden="true" /></Link>
                </Button>
                <Button asChild variant="outline" className="min-h-11 border-on-dark/60 bg-transparent text-on-dark hover:bg-on-dark/10 hover:text-on-dark">
                  <a href="#pricing-factors">Explore Cost Factors <ArrowDown aria-hidden="true" /></a>
                </Button>
              </div>
            </div>
          </div>
        </ServiceHero>

        <section id="pricing-factors" aria-labelledby="pricing-factors-title" className="scroll-mt-32 bg-sky-soft py-9 md:py-12">
          <div className="page-shell">
            <h2 id="pricing-factors-title" className="text-2xl font-semibold text-navy md:text-3xl">What determines the cost?</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              {projectTypes.map(({ title: name, slug, linkText, image, icon: Icon, description: summary, costDrivers }) => (
                <article key={slug} className="flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card">
                  <img
                    src={`/images/pricing/${image}.webp`}
                    alt=""
                    width={640}
                    height={400}
                    loading="lazy"
                    decoding="async"
                    className="aspect-[8/5] w-full object-cover"
                  />
                  <div className="flex flex-1 flex-col p-5 lg:p-6">
                    <h3 className="flex items-center gap-2 text-lg font-semibold text-navy">
                      <Icon className="size-5 shrink-0 text-primary" aria-hidden="true" />{name}
                    </h3>
                    <p className="mt-2 text-sm leading-6 text-muted-foreground">{summary}</p>
                    <ul className="mt-4 flex-1 space-y-2 border-t border-border pt-4 text-sm text-navy">
                      {costDrivers.map((driver) => (
                        <li key={driver} className="flex gap-2">
                          <Check className="mt-0.5 size-4 shrink-0 text-primary" aria-hidden="true" />{driver}
                        </li>
                      ))}
                    </ul>
                    <Link to="/solutions/$slug" params={{ slug }} className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-primary hover:underline">
                      {linkText} <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-card py-9 md:py-12" aria-labelledby="quote-breakdown">
          <div className="page-shell grid items-start gap-6 lg:grid-cols-[.8fr_1.2fr]">
            <div>
              <h2 id="quote-breakdown" className="text-2xl font-semibold text-navy md:text-3xl">What goes into a quote?</h2>
              <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">
                Ask for these items to be listed separately so you can compare upfront costs and ongoing commitments.
              </p>
            </div>
            <dl className="divide-y divide-border rounded-xl border border-border bg-sky-soft px-5 md:px-6">
              {quoteItems.map(([label, detail]) => (
                <div key={label} className="grid gap-1 py-4 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="font-semibold text-navy">{label}</dt>
                  <dd className="text-sm leading-6 text-muted-foreground">{detail}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>

        <section className="bg-navy py-8 text-on-dark" aria-labelledby="pricing-enquiry">
          <div className="page-shell flex flex-wrap items-center justify-between gap-6">
            <div className="max-w-xl">
              <h2 id="pricing-enquiry" className="text-2xl font-semibold">Tell us what you want to build</h2>
              <p className="mt-2 text-sm leading-6 text-on-dark/85">
                Share your goals, existing website, key integrations and target launch date so we can scope your project.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-4">
              <Button asChild className="min-h-11"><Link to="/contact">Request a Project Quote <ArrowRight aria-hidden="true" /></Link></Button>
              <a href="mailto:info@webgramitsolution.in" className="inline-flex min-h-11 items-center gap-2 text-sm font-semibold underline underline-offset-4">
                <Mail className="size-4" aria-hidden="true" /> Email Us
              </a>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
