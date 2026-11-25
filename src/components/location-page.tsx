import { getIndustry, type IndustrySlug } from "@/lib/industry-page-data";
import { LocationHeroPicture } from "@/components/location-hero-picture";
import { locationServiceFocus } from "@/lib/location-service-focus";
import { HeroHeading } from "@/components/hero-heading";
import { localSearch, locationAnswers } from "@/lib/location-search";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, CheckCircle2, Clock3, KeyRound, MapPin, MessageCircle, Search, ShoppingBag, ShoppingCart, Smartphone, Wrench, ClipboardList, Palette, Code2, ShieldCheck, Rocket, type LucideIcon } from "lucide-react";

import { ScrollingFrame } from "@/components/portfolio-showcase";
import { SiteHeader } from "@/components/site-header";
import { TrustFacts } from "@/components/trust-facts";
import { locations, locationGroups, projectsForLocation, type ServiceLocation } from "@/lib/locations";
import { portfolio } from "@/lib/portfolio";

import { locationVisual } from "@/lib/location-visuals";
import { IMAGES, maintenanceImages, technologyStack } from "@/lib/site-images";
import corporateImage from "@/assets/corporate-websites.jpg";
import businessImage from "@/assets/business-websites.jpg";
import shopifyImage from "@/assets/shopify-hero.jpg";
import wooImage from "@/assets/woocommerce-hero.jpg";

const industryAliases: Partial<Record<string, IndustrySlug>> = {
  apparel: "fashion",
  "apparel wholesale": "fashion",
  "b2b wholesale": "wholesale",
  boutiques: "fashion",
  distributors: "distribution",
  "electrical products": "electronics",
  "electrical supplies": "electronics",
  "electronics retail": "electronics",
  "fashion & apparel": "fashion",
  "home décor": "furniture",
  "industrial & electrical": "electronics",
  "industrial wholesale": "wholesale",
  "lifestyle retail": "retail",
  "local retailers": "retail",
  "local retail": "retail",
  manufacturers: "manufacturing",
  "retail brands": "retail",
  "wholesale suppliers": "wholesale",
  "wholesale traders": "wholesale",
};

const serviceImages = [IMAGES.ecommerce, IMAGES.b2b, corporateImage, wooImage, IMAGES.custom, maintenanceImages.hero, shopifyImage, businessImage];

const process = [
  [Search, "Discovery", "Review your buyers, catalogue and growth goals."],
  [ClipboardList, "Scope", "Agree page structure, features and integrations."],
  [Palette, "Design", "Review responsive layouts and key user journeys."],
  [Code2, "Build", "Develop the website, content tools and workflows."],
  [ShieldCheck, "Test", "Check mobile pages, forms, checkout and redirects."],
  [Rocket, "Launch", "Go live, hand over and agree ongoing support."],
] as const;

const locationTech = technologyStack.filter(({ name }) => ["WordPress", "WooCommerce", "React.js", "Next.js", "Node.js"].includes(name));

const services: [string, string, LucideIcon, string][] = [
  ["Ecommerce Website Design & Development", "/solutions/ecommerce-development", ShoppingCart, "Online stores with product catalogues, secure checkout, payments and shipping."],
  ["B2B & B2C Ecommerce Websites", "/solutions/b2b-commerce", Building2, "Trade logins, bulk ordering, quote requests and customer-specific pricing."],
  ["Business & Corporate Websites", "/solutions/website-design-development", Smartphone, "Mobile-first company websites built to explain services and win enquiries."],
  ["Custom WooCommerce Website Development", "/services/woocommerce", ShoppingCart, "WordPress ecommerce website design with product variants, checkout and shipping."],
  ["Custom Ecommerce Solutions", "/services/web-portal-development", Wrench, "Commerce applications, account dashboards and workflow portals tailored to your operations."],
  ["Website Maintenance & SEO", "/services/website-maintenance", Search, "Updates, backups, speed fixes and on-page SEO after your website launches."],
  ["Shopify & WooCommerce Websites", "/services/shopify", ShoppingCart, "Shopify theme design, storefront migration and platform selection support."],
  ["Website Redesign & Development", "/services/website-design", Smartphone, "Update mobile layouts, enquiry flows and redirects for an existing website."],
];

const reasons: [string, string][] = [
  ["SEO-ready builds", "Clean code, fast pages, schema and local SEO setup so customers can find you on Google."],
  ["Mobile-first design", "Every page is designed for phones first, where most of your customers browse and buy."],
  ["Payments & shipping", "Razorpay, UPI, COD and shipping integrations configured for Indian customers."],
  ["Local support", "A Delhi-based team you can call, WhatsApp or meet during and after launch."],
];

const glance: [LucideIcon, string, string][] = [
  [MapPin, "New Delhi", "Office"],
  [Clock3, "Mon–Sat", "Support"],
  [Smartphone, "Mobile-First", "Design"],
  [MessageCircle, "Project", "Consultation"],
  [KeyRound, "Website", "Ownership"],
];

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-primary"><span className="h-0.5 w-7 bg-primary" />{children}</p>;
}

export function LocationPage({ location: l }: { location: ServiceLocation }) {
  const content = localSearch[l.slug];
  const focus = new Map(locationServiceFocus[l.slug] ?? []);
  const featured = [...new Set([...focus.keys(), ...(content?.priority ?? []), ...services.keys()])];
  const faqs = locationAnswers(l);
  const projects = projectsForLocation(l.slug, portfolio);
  const nearby = locations.filter((location) => location.slug !== l.slug && location.zone === l.zone).slice(0, 5);
  const image = locationVisual(l);
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="ecom-hero location-hero relative overflow-hidden bg-navy text-on-dark">
        <LocationHeroPicture slug={l.slug} alt={image.alt} fallback={{ src: image.src, width: image.size, height: image.size }} />
        <div className="ecom-shell relative flex h-full items-center py-5">
          <div className="max-w-[520px]">
            <nav aria-label="Breadcrumb" className="sr-only">
              <Link tabIndex={-1} to="/" className="hover:text-on-dark">Home</Link><span aria-hidden="true">›</span>
              <Link tabIndex={-1} to="/locations" className="hover:text-on-dark">Locations</Link><span aria-hidden="true">›</span>
              <span aria-current="page" className="text-on-dark">{l.city}</span>
            </nav>
            <HeroHeading className="text-[27px] font-medium leading-[1.08] sm:text-[33px] md:text-[36px] lg:text-[39px]" title={l.keyword} accent="text-gold" />
            <p className="mt-3 max-w-[470px] text-[13px] leading-[1.45] text-on-dark/90 md:text-[14px]">{l.intro}</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex min-h-10 items-center gap-2 rounded-md bg-gold px-6 text-[13px] font-bold text-on-dark hover:bg-gold/90">Get a Free Consultation <ArrowRight className="h-4 w-4" /></Link>
              <Link to="/work/portfolio" className="inline-flex min-h-10 items-center gap-2 rounded-md border border-on-dark/70 px-6 text-[13px] font-bold text-on-dark hover:bg-on-dark/10">View Our Work <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <ul aria-label="Webgram at a glance" className="mt-4 grid max-w-[500px] grid-cols-3 gap-3 sm:grid-cols-5">
              {glance.map(([Icon, label, value]) => (
                <li key={label} className="text-center text-[12px] font-semibold leading-[1.25]">
                  <span className="mx-auto mb-1.5 grid size-9 place-items-center rounded-full border border-on-dark/50"><Icon className="size-4" aria-hidden="true" /></span>
                  {label}<br />{value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="bg-card py-6 md:py-7">
        <div className="ecom-shell grid gap-5 lg:grid-cols-[1fr_2fr] lg:items-center">
          <div>
            <Eyebrow>Why choose Webgram</Eyebrow>
            <h2 className="mt-2 text-[23px] leading-tight text-navy md:text-[27px]">Why {l.city} businesses choose Webgram IT Solution</h2>
          </div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {reasons.map(([title, description]) => (
              <article key={title} className="rounded-md border border-border bg-card p-3.5 shadow-card">
                <CheckCircle2 className="size-7 text-primary" aria-hidden="true" />
                <h3 className="mt-2 text-sm font-extrabold text-navy">{title}</h3>
                <p className="mt-1 text-sm leading-snug text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-sky-soft py-6 md:py-7">
        <div className="ecom-shell">
          <Eyebrow>Our services</Eyebrow>
          <h2 className="mt-2 text-[23px] leading-tight text-navy md:text-[27px]">Website services for {l.city} businesses</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {featured.map((index) => {
              const [name, to, Icon, text] = services[index]!;
              const visual = serviceImages[index];
              return (
                <a key={to} href={to} className="group flex min-w-0 flex-col overflow-hidden rounded-md border border-border bg-card shadow-card transition-colors hover:border-primary">
                  {visual ? <img src={visual} alt="" width={800} height={450} loading="lazy" className="h-[132px] w-full object-cover" /> : null}
                  <div className="flex flex-1 flex-col p-3.5">
                    <div className="flex items-center gap-2.5">
                      <span className="grid size-9 shrink-0 place-items-center rounded-md bg-primary-soft text-primary"><Icon className="size-5" aria-hidden="true" /></span>
                      <h3 className="text-sm font-extrabold leading-snug text-navy">{focus.get(index) ?? name}</h3>
                    </div>
                    <p className="mt-2 flex-1 text-sm leading-snug text-muted-foreground">{text}</p>
                    <span className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">Explore service <ArrowRight className="h-4 w-4" aria-hidden="true" /></span>
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {l.projectFocus ? (
        <section className="bg-sky-soft py-6 md:py-7">
          <div className="ecom-shell">
            <Eyebrow>Project planning</Eyebrow>
            <h2 className="mt-2 text-[23px] leading-tight text-navy md:text-[27px]">Planning your website in {l.city}</h2>
            <ol className="mt-7 grid grid-cols-[repeat(auto-fit,minmax(min(100%,15rem),1fr))] gap-4">
              {l.projectFocus.map((focus, index) => (
                <li key={focus.title} className="min-w-0 rounded-xl border border-border bg-card p-6 shadow-card">
                  <span className="grid h-10 w-10 place-items-center rounded-full bg-navy text-[16px] font-semibold text-on-dark">{index + 1}</span>
                  <h3 className="mt-4 text-[19px] leading-snug text-navy">{focus.title}</h3>
                  <p className="mt-3 text-[15px] leading-7 text-muted-foreground">{focus.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>
      ) : null}

      <section className="py-6 md:py-7">
        <div className="ecom-shell grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-7">
            <h2 className="text-[22px] text-navy md:text-[24px]">Industries we serve in {l.city}</h2>
            <ul className="mt-5 flex flex-wrap gap-2">
              {l.industries.map((label) => {
                const name = label.toLowerCase();
                const industry = getIndustry(industryAliases[name] ?? name);
                const className = "block rounded-full border border-border bg-primary-soft px-3.5 py-1.5 text-[14px] font-medium text-navy";
                return (
                  <li key={label}>
                    {industry ? (
                      <Link to="/industries/$slug" params={{ slug: industry.slug }} className={`${className} hover:border-primary hover:text-primary hover:underline`}>{label}</Link>
                    ) : <span className={className}>{label}</span>}
                  </li>
                );
              })}
            </ul>
            <Link to="/industries" className="mt-4 inline-block text-sm font-semibold text-primary hover:underline">Explore all industries</Link>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-7">
            <h2 className="text-[22px] text-navy md:text-[24px]">Areas we cover</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">{l.areas.map((a) => <li key={a} className="flex min-w-0 items-center gap-2 text-[15px] text-navy"><MapPin className="h-4 w-4 shrink-0 text-primary" /><span className="min-w-0">{a}</span></li>)}</ul>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-sky-soft py-6 md:py-7">
        <div className="ecom-shell">
          <Eyebrow>Our development process</Eyebrow>
          <h2 className="mt-2 text-[23px] leading-tight text-navy md:text-[27px]">From requirements to a live website</h2>
          <ol className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6 xl:gap-3">
            {process.map(([Icon, title, description], index) => (
              <li key={title} className="relative grid grid-cols-[40px_minmax(0,1fr)] gap-2">
                {index < process.length - 1 && <span aria-hidden="true" className="absolute left-9 right-0 top-5 hidden h-px bg-primary/25 xl:block" />}
                <span className="relative grid size-10 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="size-5" aria-hidden="true" /></span>
                <div className="relative">
                  <span aria-hidden="true" className="bg-sky-soft pr-2 text-xs font-bold text-primary">{String(index + 1).padStart(2, "0")}</span>
                  <h3 className="mt-0.5 text-sm font-extrabold text-navy">{title}</h3>
                  <p className="mt-1 text-sm leading-snug text-muted-foreground">{description}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="bg-card py-6 md:py-7">
        <div className="ecom-shell">
          <h2 className="ecom-eyebrow text-primary">Platforms and technology we use</h2>
          <ul className="mt-4 grid grid-cols-3 gap-2.5 sm:grid-cols-6">
            {locationTech.map(({ name, src }) => (
              <li key={name} className="grid min-w-0 justify-items-center gap-2 rounded-md border border-border bg-card p-3 text-center text-sm font-semibold text-navy shadow-card">
                {src && <img src={src} alt="" width={32} height={32} loading="lazy" className="size-8 object-contain" />}{name}
              </li>
            ))}
            <li className="grid justify-items-center gap-2 rounded-md border border-border bg-card p-3 text-center text-sm font-semibold text-navy shadow-card">
              <ShoppingBag className="size-8 text-primary" aria-hidden="true" />Shopify
            </li>
          </ul>
        </div>
      </section>

      {projects.items.length ? (
        <section className="bg-sky-soft py-6 md:py-7">
          <div className="ecom-shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0">
                <Eyebrow>Our work</Eyebrow>
                <h2 className="mt-2 text-[23px] leading-tight text-navy md:text-[27px]">{projects.local ? (projects.withNcr ? `Websites we built in ${l.city} & Delhi NCR` : `Websites we built in ${l.city}`) : "Websites we built across Delhi NCR"}</h2>
              </div>
              <Link to="/work/$slug" params={{ slug: "portfolio" }} className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary">View full portfolio <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
              {projects.items.map((item) => (
                <article key={item.url} className="flex min-w-0 flex-col gap-2 overflow-hidden rounded-md border border-border bg-card p-2 shadow-card">
                  <ScrollingFrame item={item} height={144} />
                  <div className="px-1 pb-2">
                    <p className="flex items-center gap-1 text-[13px] text-muted-foreground"><MapPin className="h-3.5 w-3.5" />{item.location}</p>
                    <h3 className="mt-1 text-[18px] text-navy">{item.name}</h3>
                    <p className="mt-1 text-[14px] font-medium text-primary">{item.category}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      <section className="bg-card py-6 md:py-7">
        <div id="faq" className="ecom-shell">
          <Eyebrow>Frequently asked questions</Eyebrow>
          <h2 className="mt-2 text-[23px] leading-tight text-navy md:text-[27px]">Questions about websites in {l.city}</h2>
          <div className="mt-4 divide-y divide-border rounded-md border border-border bg-sky-soft px-4">
            {faqs.map(([question, answer]) => (
              <details key={question} className="py-3">
                <summary className="cursor-pointer font-bold text-navy">{question}</summary>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-navy py-7 text-on-dark">
        <img src={image.src} alt="" width={image.size} height={image.size} loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-20" />
        <div className="bg-cta-overlay absolute inset-0" aria-hidden="true" />
        <div className="ecom-shell relative grid gap-7 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="min-w-0">
            <h2 className="text-[26px] leading-tight md:text-[30px]">Ready to discuss your {l.city} website?</h2>
            <p className="mt-3 max-w-[560px] text-[16px] leading-7 text-on-dark/85">Share your goals and we will suggest the right platform, scope and timeline, with a fixed itemised quote after discussion.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex min-h-10 items-center gap-2 rounded-md bg-gold px-4 text-sm font-semibold text-navy hover:opacity-90">Get a Free Quote <ArrowRight className="size-4" aria-hidden="true" /></Link>
              <a href="tel:+917551120242" className="inline-flex min-h-10 items-center rounded-md border border-on-dark/60 px-4 text-sm font-semibold hover:bg-on-dark/10">Talk to an Expert</a>
            </div>
          </div>
          <TrustFacts />
        </div>
      </section>

      <section className="py-6">
        <div className="ecom-shell">
          <h2 className="text-[20px] text-navy">Explore other service areas</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {nearby.map((x) => (
              <Link key={x.slug} to="/locations/$city" params={{ city: x.slug }} className="flex min-w-0 items-center gap-2 rounded-lg border border-border bg-card px-4 py-3 text-[15px] font-medium text-navy shadow-card hover:border-primary hover:text-primary">
                <MapPin className="h-4 w-4 shrink-0 text-primary" /><span className="min-w-0">{x.city}</span><ArrowRight className="ml-auto h-4 w-4 shrink-0" />
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

/** Hub listing every city page. */
export function LocationsHub() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="ecom-hero location-hero relative overflow-hidden bg-navy text-on-dark">
        <LocationHeroPicture slug="directory" alt="" fallback={{ src: IMAGES.ecommerce, width: 800, height: 450 }} />
        <div className="ecom-shell relative flex h-full items-center py-5">
          <div className="w-full max-w-[540px]">
            <nav aria-label="Breadcrumb" className="sr-only"><Link tabIndex={-1} to="/">Home</Link><span aria-hidden="true">›</span><span aria-current="page">Locations</span></nav>
            <HeroHeading className="text-[27px] font-medium leading-[1.08] sm:text-[33px] md:text-[36px] lg:text-[39px]" lines={["Website Development", "Service Areas Across India"]} accent="text-gold" />
            <p className="mt-3 max-w-[470px] text-[13px] leading-[1.45] text-on-dark/90 md:text-[14px]">From our office in Sangam Vihar, New Delhi, we build websites and ecommerce platforms for businesses in Delhi NCR and work remotely with teams in Gujarat, Ludhiana and across India.</p>
            <a href="#service-areas" className="mt-4 inline-flex min-h-10 items-center gap-2 rounded-md bg-gold px-4 text-sm font-semibold text-navy hover:opacity-90">Browse service areas <ArrowRight className="size-4" aria-hidden="true" /></a>
          </div>
        </div>
      </section>
      <section id="service-areas" className="scroll-mt-24 bg-sky-soft py-6 md:py-7">
        <div className="ecom-shell space-y-8">
          {locationGroups.map((group) => (
            <section key={group.title}>
              <h2 className="mb-4 text-[23px] font-extrabold text-navy md:text-[27px]">{group.title}</h2>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {group.locations.map((l) => {
                  const image = locationVisual(l);
                  return (
                    <Link key={l.slug} to="/locations/$city" params={{ city: l.slug }} className="group flex min-w-0 flex-col overflow-hidden rounded-md border border-border bg-card shadow-card transition-colors hover:border-primary">
                      <img src={image.src} alt={image.alt} width={image.size} height={image.size} loading="lazy" className="aspect-[16/10] w-full object-cover object-[center_38%]" />
                      <div className="flex flex-1 flex-col p-3.5">
                      <p className="flex items-center gap-2 text-[14px] font-semibold text-primary"><MapPin className="h-4 w-4" />{l.city}</p>
                      <h3 className="mt-2 text-[17px] leading-snug text-navy">{l.keyword}</h3>
                      <p className="mt-2 flex-1 text-sm leading-snug text-muted-foreground">{localSearch[l.slug]?.description ?? l.description}</p>
                      <span className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary">View {l.city} page <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </section>
    </div>
  );
}
