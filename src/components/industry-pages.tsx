import { Link } from "@tanstack/react-router";
import {
  ArrowRight,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
  Code2,
  Headphones,
  PackageCheck,
  Search,
  Settings2,
  ShieldCheck,
} from "lucide-react";
import { HeroHeading } from "@/components/hero-heading";
import { SiteHeader } from "@/components/site-header";
import { TrustFacts } from "@/components/trust-facts";
import { portfolio } from "@/lib/portfolio";
import {
  getIndustry,
  industries,
  industriesDirectory,
  industryImage,
  type Industry,
  type IndustrySlug,
} from "@/lib/industry-page-data";

const primaryButton =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-on-dark hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

function IndustryPicture({
  slug,
  alt,
  hero = false,
}: {
  slug: IndustrySlug | "directory";
  alt: string;
  hero?: boolean;
}) {
  const base = industryImage(slug);
  return (
    <picture className={hero ? "block h-full" : "block"}>
      <source
        type="image/avif"
        srcSet={`${base}-640.avif 640w, ${base}-1536.avif 1536w`}
        sizes={
          hero
            ? "(min-width: 768px) 52vw, 100vw"
            : "(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"
        }
      />
      <img
        src={`${base}.webp`}
        alt={alt}
        width={1536}
        height={480}
        loading={hero ? "eager" : "lazy"}
        fetchPriority={hero ? "high" : "auto"}
        className={
          hero
            ? "block h-52 w-full object-cover md:absolute md:inset-0 md:h-full"
            : "block aspect-[2.2] w-full object-cover"
        }
      />
    </picture>
  );
}

function IndustryHero({ industry }: { industry?: Industry }) {
  const slug = industry?.slug ?? "directory";
  const lines =
    industry?.hero ?? (["Ecommerce & Web Development", "for Indian Industries"] as const);
  return (
    <header className="overflow-hidden bg-navy text-on-dark">
      <div className="grid items-stretch md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="mx-auto flex w-full max-w-[740px] flex-col justify-center px-4 py-8 md:mr-0 md:min-h-[330px] md:py-10 lg:px-8">
          <nav
            aria-label="Breadcrumb"
            className="sr-only focus-within:not-sr-only focus-within:mb-3 focus-within:flex focus-within:flex-wrap focus-within:gap-x-2 text-sm text-on-dark/80"
          >
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <span aria-hidden="true">/</span>
            {industry ? (
              <>
                <Link to="/industries" className="hover:underline">
                  Industries
                </Link>
                <span aria-hidden="true">/</span>
                <span aria-current="page">{industry.page.title}</span>
              </>
            ) : (
              <span aria-current="page">Industries</span>
            )}
          </nav>
          <HeroHeading
            className="text-[30px] leading-[1.12] lg:text-[39px]"
            lines={lines}
            accent="text-sky"
          />
          <p className="mt-3 max-w-[34rem] text-sm leading-6 text-on-dark/85 md:text-base">
            {industry?.description ?? industriesDirectory.description}
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            {industry ? (
              <Link to="/contact" className={primaryButton}>
                Discuss your project <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            ) : (
              <a href="#industry-directory" className={primaryButton}>
                Browse industries <ArrowRight className="size-4" aria-hidden="true" />
              </a>
            )}
            <Link
              to="/work/portfolio"
              className="inline-flex min-h-11 items-center rounded-md border border-on-dark/50 px-4 py-2 text-sm font-semibold text-on-dark hover:bg-on-dark/10"
            >
              View our work
            </Link>
          </div>
        </div>
        <div className="relative min-w-0">
          <IndustryPicture
            slug={slug}
            alt={
              industry?.alt ?? "Illustration of a business owner reviewing an ecommerce catalogue"
            }
            hero
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-navy to-transparent to-12% md:block"
          />
        </div>
      </div>
    </header>
  );
}

export function IndustriesDirectory() {
  return (
    <>
      <SiteHeader />
      <main>
        <IndustryHero />
        <section id="industry-directory" className="scroll-mt-28 bg-sky-soft py-8 md:py-12">
          <div className="page-shell">
            <h2 className="text-2xl text-navy md:text-3xl">Find your industry</h2>
            <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">
              Our New Delhi team builds ecommerce websites and B2B portals for businesses across
              India. Explore the catalogue, ordering and fulfilment needs of each sector.
            </p>
            <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {industries.map((industry) => (
                <Link
                  key={industry.slug}
                  to="/industries/$slug"
                  params={{ slug: industry.slug }}
                  className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary"
                >
                  <IndustryPicture slug={industry.slug} alt={industry.alt} />
                  <div className="flex flex-1 flex-col p-4">
                    <h3 className="text-xl text-navy">{industry.page.title}</h3>
                    <p className="mb-4 mt-2 flex-1 text-sm leading-6 text-muted-foreground">
                      {industry.description}
                    </p>
                    <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">
                      Explore {industry.page.title.toLowerCase()}{" "}
                      <ArrowRight
                        className="size-4 transition-transform group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
    </>
  );
}

const projectProcess = [
  [Search, "Discovery", "Map buyers, team roles and the systems that handle products and orders."],
  [
    ClipboardList,
    "Scope",
    "Agree catalogue fields, workflows, launch milestones and who signs off.",
  ],
  [Code2, "Build", "Create the storefront or portal and configure the agreed integrations."],
  [
    ShieldCheck,
    "Test",
    "Verify a complete buyer journey and review stock, price and order exceptions.",
  ],
  [
    Headphones,
    "Handover",
    "Confirm team access, operating instructions and the plan for ongoing support.",
  ],
] as const;

const platformLinks = {
  shopify: [
    "Shopify",
    "Hosted retail storefronts with theme and app configuration.",
    "/services/shopify",
  ],
  woo: [
    "WooCommerce",
    "WordPress commerce with configurable catalogue and checkout workflows.",
    "/services/woocommerce",
  ],
  portal: [
    "Custom web portals",
    "Account roles, quote workflows and internal dashboards.",
    "/services/web-portal-development",
  ],
  api: [
    "API integrations",
    "Connect your storefront or portal to inventory, CRM, ERP or order tools.",
    "/services/api-integration",
  ],
} as const;

const industryPlatforms: Record<IndustrySlug, readonly (keyof typeof platformLinks)[]> = {
  manufacturing: ["portal", "api", "woo"],
  retail: ["shopify", "woo", "api"],
  wholesale: ["portal", "woo", "api"],
  furniture: ["woo", "shopify", "portal"],
  fashion: ["shopify", "woo", "api"],
  electronics: ["woo", "shopify", "api"],
  beauty: ["shopify", "woo", "api"],
  distribution: ["portal", "api", "woo"],
  "building-materials": ["portal", "woo", "api"],
};

const examples: Partial<Record<IndustrySlug, readonly string[]>> = {
  manufacturing: ["adliteelectricals.com"],
  retail: ["houskase.com", "mukeshmurtikar.com"],
  wholesale: ["mypartysuppliers.com", "chaatewala.com"],
  furniture: ["mukeshmurtikar.com"],
  electronics: ["adliteelectricals.com"],
  distribution: ["navalmedical.com", "chaatewala.com"],
};

const sectionTitle = "mt-1 text-[23px] leading-tight text-navy md:text-[27px]";

export function IndustryDetail({ industry }: { industry: Industry }) {
  const matches = new Set(examples[industry.slug] ?? []);
  const projects = portfolio.filter((item) => matches.has(item.domain));

  return (
    <>
      <SiteHeader />
      <main>
        <IndustryHero industry={industry} />

        <section className="bg-card py-6 md:py-8">
          <div className="ecom-shell grid items-center gap-5 lg:grid-cols-[1fr_2fr]">
            <div>
              <p className="ecom-eyebrow text-primary">Why choose Webgram</p>
              <h2 className={sectionTitle}>{industry.searchFocus[0]}</h2>
              <p className="mt-2 max-w-md text-sm leading-6 text-muted-foreground">
                {industry.searchFocus[1]}
              </p>
            </div>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {industry.sections.map(([title, text], index) => {
                const Icon = index === 0 ? ClipboardList : Settings2;
                return (
                  <article
                    key={title}
                    className="rounded-md border border-border bg-card p-4 shadow-card"
                  >
                    <Icon className="size-7 text-primary" aria-hidden="true" />
                    <h3 className="mt-2 text-base text-navy">{title}</h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{text}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-sky-soft py-6 md:py-8">
          <div className="ecom-shell">
            <p className="ecom-eyebrow text-primary">Features and workflows</p>
            <h2 className={sectionTitle}>What we build for {industry.page.title.toLowerCase()}</h2>
            <ul className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {industry.page.points.map((point) => (
                <li
                  key={point}
                  className="flex items-center gap-2 rounded-md border border-border bg-card p-3 text-sm font-semibold text-navy"
                >
                  <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden="true" />
                  {point}
                </li>
              ))}
            </ul>
            <div className="mt-4 flex items-start gap-3 rounded-md border border-border bg-card p-4">
              <PackageCheck className="size-6 shrink-0 text-primary" aria-hidden="true" />
              <div>
                <h3 className="text-base text-navy">Example buyer workflow</h3>
                <p className="mt-1 max-w-4xl text-sm leading-6 text-muted-foreground">
                  {industry.workflow}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-card py-6 md:py-8">
          <div className="ecom-shell">
            <p className="ecom-eyebrow text-primary">Our development process</p>
            <h2 className={sectionTitle}>From project scope to launch</h2>
            <ol className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {projectProcess.map(([Icon, title, copy], index) => (
                <li key={title} className="relative grid grid-cols-[2.5rem_minmax(0,1fr)] gap-2">
                  {index < projectProcess.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="absolute left-9 right-0 top-5 hidden h-px bg-primary/30 lg:block"
                    />
                  )}
                  <span className="relative grid size-10 place-items-center rounded-full bg-primary-soft text-primary">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <div className="relative">
                    <span
                      aria-hidden="true"
                      className="bg-card pr-2 text-xs font-bold text-primary"
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <h3 className="mt-0.5 text-sm font-semibold text-navy">{title}</h3>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">{copy}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="bg-sky-soft py-6 md:py-8">
          <div className="ecom-shell">
            <p className="ecom-eyebrow text-primary">Technologies and platforms</p>
            <h2 className={sectionTitle}>Platform options for your build</h2>
            <div className="mt-4 grid gap-3 md:grid-cols-3">
              {industryPlatforms[industry.slug].map((key) => {
                const [name, copy, href] = platformLinks[key];
                return (
                  <a
                    key={key}
                    href={href}
                    className="group rounded-md border border-border bg-card p-4 shadow-card hover:border-primary"
                  >
                    <span className="flex items-center gap-2 text-base font-semibold text-navy">
                      {name}
                      <ArrowRight className="size-4 text-primary" aria-hidden="true" />
                    </span>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">{copy}</p>
                  </a>
                );
              })}
            </div>
          </div>
        </section>

        <section className="bg-card py-6 md:py-8">
          <div className="ecom-shell">
            <div className="flex flex-wrap items-end justify-between gap-3">
              <div>
                <p className="ecom-eyebrow text-primary">Our work</p>
                <h2 className={sectionTitle}>
                  {projects.length ? "Related live projects" : "Explore our website portfolio"}
                </h2>
              </div>
              <Link
                to="/work/portfolio"
                className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm font-semibold text-primary hover:underline"
              >
                View portfolio <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
            {projects.length > 0 && (
              <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {projects.map((project) => (
                  <a
                    key={project.domain}
                    href={project.url}
                    className="overflow-hidden rounded-md border border-border bg-card shadow-card hover:border-primary"
                  >
                    <img
                      src={project.image}
                      alt={`${project.name} website preview`}
                      width={640}
                      height={360}
                      className="h-28 w-full object-cover object-top"
                      loading="lazy"
                    />
                    <div className="p-3">
                      <h3 className="text-base text-navy">{project.name}</h3>
                      <p className="mt-1 text-sm text-muted-foreground">{project.category}</p>
                    </div>
                  </a>
                ))}
              </div>
            )}
            {!projects.length && (
              <p className="mt-2 text-sm leading-6 text-muted-foreground">
                Browse real storefronts, wholesale catalogues and business websites to see how the
                project scope translates to a live site.
              </p>
            )}
          </div>
        </section>

        <section className="bg-sky-soft py-6 md:py-8">
          <div className="ecom-shell grid gap-5 md:grid-cols-2">
            <div>
              <h2 className="text-xl text-navy">Common question</h2>
              <details className="group mt-3 rounded-md border border-border bg-card p-4">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-navy [&::-webkit-details-marker]:hidden">
                  {industry.faq[0]}
                  <ChevronDown
                    className="size-4 shrink-0 group-open:rotate-180"
                    aria-hidden="true"
                  />
                </summary>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{industry.faq[1]}</p>
              </details>
            </div>
            <nav aria-label="Related industries">
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <h2 className="text-xl text-navy">Related industries</h2>
                <Link
                  to="/industries"
                  className="text-sm font-semibold text-primary hover:underline"
                >
                  View all industries
                </Link>
              </div>
              <ul className="mt-3 flex flex-wrap gap-2">
                {industry.related.map((slug) => {
                  const next = getIndustry(slug);
                  return next ? (
                    <li key={slug}>
                      <Link
                        to="/industries/$slug"
                        params={{ slug }}
                        className="inline-flex items-center gap-2 rounded-md border border-border bg-card px-3 py-2 text-sm text-primary hover:underline"
                      >
                        {next.page.title}
                        <ArrowRight className="size-4" aria-hidden="true" />
                      </Link>
                    </li>
                  ) : null;
                })}
              </ul>
            </nav>
          </div>
        </section>

        <section className="relative overflow-hidden bg-navy py-7 text-on-dark">
          <div aria-hidden="true" className="ecom-waves pointer-events-none absolute inset-0" />
          <div className="ecom-shell relative grid items-center gap-6 lg:grid-cols-2">
            <div>
              <p className="ecom-eyebrow text-sky">Planning your next project?</p>
              <h2 className="mt-1 text-[25px] leading-tight md:text-[29px]">
                Let’s plan a site that supports your buyers
              </h2>
              <p className="mt-2 text-sm leading-6 text-on-dark/85">
                Share your catalogue, current tools and the ordering or enquiry process you want to
                improve.
              </p>
              <div className="mt-4 flex flex-wrap items-center gap-4">
                <Link to="/contact" className={primaryButton}>
                  Request a project quote <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
                <a
                  href={industry.next.href}
                  className="text-sm font-semibold text-on-dark underline underline-offset-4"
                >
                  {industry.next.label}
                </a>
              </div>
            </div>
            <TrustFacts />
          </div>
        </section>
      </main>
    </>
  );
}
