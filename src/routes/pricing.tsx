import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { publicPageSchema, SITE_URL } from "@/lib/site-identity";

const path = "/pricing";
const title = "Website Development Pricing & Quotes | Webgram IT Solution";
const description = "See what affects the cost of a Webgram website, ecommerce store or B2B portal, and how to request a project-specific quote.";

export const Route = createFileRoute("/pricing")({
  head: () => ({
    links: [{ rel: "canonical", href: SITE_URL + path }],
    meta: [{ title }, { name: "description", content: description }],
    scripts: publicPageSchema(path, title, description),
  }),
  component: PricingPage,
});

const factors = [
  ["Business websites", "Page count, design requirements, content migration, editable templates and enquiry forms."],
  ["Ecommerce stores", "Catalogue size, variants, platform, payment and shipping setup, and migration from an existing store."],
  ["B2B portals and marketplaces", "Buyer and supplier roles, trade pricing, approval flows, inventory connections and integrations."],
] as const;

function PricingPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <section className="bg-navy py-10 text-on-dark md:py-14">
          <div className="page-shell">
            <h1 className="text-3xl font-semibold md:text-4xl">Project Pricing &amp; Quotes</h1>
            <p className="mt-3 max-w-2xl leading-relaxed text-on-dark/85">
              Website, ecommerce and B2B development is priced per project. Webgram prepares a quote after reviewing your requirements.
            </p>
          </div>
        </section>
        <section className="bg-sky-soft py-8 md:py-10">
          <div className="page-shell">
            <h2 className="text-2xl font-semibold text-navy">What determines the cost?</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {factors.map(([heading, detail]) => (
                <article key={heading} className="rounded-lg border border-border bg-card p-5">
                  <h3 className="text-lg font-semibold text-navy">{heading}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{detail}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="bg-card py-8 md:py-10">
          <div className="page-shell">
            <h2 className="text-2xl font-semibold text-navy">Request an itemised quote</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
              Share your project goals, existing URL, key integrations and expected launch date. Ask for development, hosting,
              third-party subscriptions and ongoing support to be itemised so you can compare the full cost.
            </p>
            <Button asChild className="mt-4">
              <Link to="/contact">Request a Project Quote <ArrowRight aria-hidden="true" /></Link>
            </Button>
            <p className="mt-4 text-sm text-muted-foreground">
              You can also email <a className="text-primary underline" href="mailto:info@webgramitsolution.in">info@webgramitsolution.in</a>.
            </p>
          </div>
        </section>
      </main>
    </>
  );
}
