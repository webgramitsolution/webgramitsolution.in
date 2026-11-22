import { WebsiteIndustriesSection, WebsiteTechnologySection, WebsiteTypesSection } from "@/components/website-capability-sections";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Blocks, ChevronDown, ClipboardList, Code2, LayoutTemplate, Rocket, ShieldCheck, Workflow } from "lucide-react";
import { HeroHeading } from "@/components/hero-heading";
import { ServiceHero } from "@/components/service-hero";
import { SiteHeader } from "@/components/site-header";
import { TrustFacts } from "@/components/trust-facts";
import { Button } from "@/components/ui/button";
import { wordpressFaqs } from "@/lib/faq-content";

const services = [
  [LayoutTemplate, "Custom WordPress themes", "Design responsive business websites with reusable blocks for service pages, case studies and landing pages."],
  [Blocks, "CMS and editorial workflows", "Give editors the right publishing permissions and structured fields for the content they manage most often."],
  [Code2, "Plugins and integrations", "Connect enquiry forms, analytics and CRM workflows. Scope custom plugins around requirements your existing tools do not cover."],
  [Workflow, "Migration and redesign", "Audit existing URLs, content and media. Test redirects and enquiry forms before switching the live site."],
  [ShieldCheck, "Maintenance and backups", "Plan update testing, backup restoration and support responsibilities around your hosting and publishing schedule."],
  [ClipboardList, "Training and handover", "Give your team a walkthrough, admin access and documentation for publishing, plugins and routine checks."],
] as const;

const process = [
  ["Scope", "Agree page types, content ownership, editorial roles and integrations."],
  ["Design and build", "Prototype key pages, then build the theme and reusable CMS blocks."],
  ["Test and migrate", "Check mobile layouts, form delivery, accessibility and redirects on staging."],
  ["Launch and hand over", "Publish once checks pass and train the people who will run the site."],
] as const;

export function WordPressPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ServiceHero slug="wordpress">
          <div className="ecom-shell relative flex h-full items-center py-5">
            <div className="max-w-[540px]">
              <HeroHeading className="text-[30px] font-medium leading-tight" lines={["Custom WordPress Websites", "Built for Easy Editing"]} accent="text-[#f4c657]" />
              <p className="mt-3 max-w-[470px] text-sm leading-relaxed text-on-dark/90">
                Custom WordPress themes, reusable content blocks and publishing workflows. Our Delhi NCR team builds, redesigns and migrates websites your team can manage after launch.
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                <Button asChild className="h-10 bg-gold px-5 text-sm font-bold text-navy hover:bg-gold/90">
                  <Link to="/contact">Get a Free Consultation <ArrowRight /></Link>
                </Button>
                <Button asChild variant="outline" className="h-10 border-on-dark/70 bg-transparent px-5 text-sm font-bold text-on-dark hover:bg-on-dark/10 hover:text-on-dark">
                  <Link to="/work/portfolio">View Our Work <ArrowRight /></Link>
                </Button>
              </div>
              <ul className="mt-4 flex flex-wrap gap-x-5 gap-y-2 text-sm">
                <li className="flex items-center gap-2"><LayoutTemplate aria-hidden="true" className="size-4" /> Custom themes</li>
                <li className="flex items-center gap-2"><Blocks aria-hidden="true" className="size-4" /> Editable CMS</li>
                <li className="flex items-center gap-2"><Rocket aria-hidden="true" className="size-4" /> Migration support</li>
              </ul>
            </div>
          </div>
        </ServiceHero>

        <section className="bg-card py-7 md:py-9">
          <div className="ecom-shell rounded-xl border border-border bg-sky-soft py-5">
            <h2 className="text-xl text-navy">What does a WordPress development company do?</h2>
            <p className="mt-2 max-w-3xl text-sm leading-6 text-muted-foreground">
              It builds or redesigns websites on WordPress and configures the editing experience for your team. We plan reusable page blocks, publishing access, enquiry forms, integrations and post-launch support around how your business operates.
            </p>
          </div>
        </section>

        <section className="bg-sky-soft py-8 md:py-10" aria-labelledby="wordpress-services">
          <div className="ecom-shell">
            <h2 id="wordpress-services" className="ecom-title">WordPress Development Services</h2>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {services.map(([Icon, title, description]) => (
                <article key={title} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <Icon aria-hidden="true" className="size-6 text-primary" />
                  <h3 className="mt-3 text-base font-semibold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <WebsiteTypesSection wordpress />

        <section className="bg-card py-8 md:py-10" aria-labelledby="wordpress-process">
          <div className="ecom-shell">
            <h2 id="wordpress-process" className="ecom-title">Our WordPress Development Process</h2>
            <ol className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {process.map(([title, description], index) => (
                <li key={title} className="rounded-xl border border-border bg-card p-5">
                  <span className="text-sm font-semibold text-primary">Step {index + 1}</span>
                  <h3 className="mt-2 text-base font-semibold text-navy">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-muted-foreground">{description}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <WebsiteIndustriesSection />
        <WebsiteTechnologySection wordpress />

        <section className="bg-sky-soft py-8 md:py-10" aria-labelledby="wordpress-faq">
          <div className="ecom-shell">
            <h2 id="wordpress-faq" className="ecom-title">WordPress Development FAQs</h2>
            <div className="mt-5 grid items-start gap-3 md:grid-cols-2">
              {wordpressFaqs.map(([question, answer]) => (
                <details key={question} className="group rounded-lg border border-border bg-card px-5 py-4">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-navy">
                    {question}<ChevronDown aria-hidden="true" className="size-5 shrink-0 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-6 text-muted-foreground">{answer}</p>
                </details>
              ))}
            </div>
            <p className="mt-5 text-sm text-muted-foreground">
              Explore <Link to="/services/$slug" params={{ slug: "woocommerce" }} className="font-semibold text-primary underline">WooCommerce development</Link> for online stores or <Link to="/services/$slug" params={{ slug: "website-maintenance" }} className="font-semibold text-primary underline">website maintenance</Link> for an existing site.
            </p>
          </div>
        </section>

        <section aria-labelledby="wordpress-quote" className="bg-navy py-8 text-on-dark md:py-10">
          <div className="ecom-shell grid items-center gap-6 lg:grid-cols-2">
            <div>
              <h2 id="wordpress-quote" className="text-2xl font-semibold">Build a WordPress site your team can run</h2>
              <p className="mt-3 max-w-lg text-sm leading-6 text-on-dark/85">Share your current site, the pages your team needs and the integrations you rely on. We’ll use those details to scope the build.</p>
              <Button asChild className="mt-4 h-10 bg-gold px-5 text-sm font-bold text-navy hover:bg-gold/90">
                <Link to="/contact">Request a Project Quote <ArrowRight /></Link>
              </Button>
            </div>
            <TrustFacts />
          </div>
        </section>
      </main>
    </>
  );
}
