import { localSearch } from "@/lib/location-search";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Building2, CheckCircle2, Clock3, KeyRound, MapPin, MessageCircle, Phone, Search, ShoppingCart, Smartphone, Wrench, type LucideIcon } from "lucide-react";

import { ScrollingFrame } from "@/components/portfolio-showcase";
import { SiteHeader } from "@/components/site-header";
import { TrustFacts } from "@/components/trust-facts";
import { locations, projectsForLocation, type ServiceLocation } from "@/lib/locations";
import { portfolio } from "@/lib/portfolio";

const services: [string, string, LucideIcon, string][] = [
  ["Ecommerce Website Development", "/solutions/ecommerce-development", ShoppingCart, "Online stores with product catalogues, secure checkout, payments and shipping."],
  ["B2B Ecommerce & Wholesale Portals", "/solutions/b2b-commerce", Building2, "Trade logins, bulk ordering, quote requests and customer-specific pricing."],
  ["Business & Corporate Websites", "/solutions/website-design-development", Smartphone, "Mobile-first company websites built to explain services and win enquiries."],
  ["WooCommerce Development", "/services/woocommerce", ShoppingCart, "Custom WooCommerce stores with Razorpay, COD and Shiprocket integrations."],
  ["Custom Web Portals", "/services/web-portal-development", Wrench, "Dashboards, member areas and workflow portals for your team and customers."],
  ["Website Maintenance & SEO", "/services/website-maintenance", Search, "Updates, backups, speed fixes and on-page SEO after your website launches."],
  ["Shopify Website Design", "/services/shopify", ShoppingCart, "Shopify theme design, store migration, payments and shipping setup."],
];

const reasons: [string, string][] = [
  ["SEO-ready builds", "Clean code, fast pages, schema and local SEO setup so customers can find you on Google."],
  ["Mobile-first design", "Every page is designed for phones first, where most of your customers browse and buy."],
  ["Payments & shipping", "Razorpay, UPI, COD and shipping integrations configured for Indian customers."],
  ["Local support", "A Delhi-based team you can call, WhatsApp or meet during and after launch."],
];

const glance: [LucideIcon, string, string][] = [
  [MapPin, "Office", "Sangam Vihar, New Delhi"],
  [Clock3, "Working hours", "Mon–Sat, 10 AM – 7 PM"],
  [MessageCircle, "Reply time", "Usually within one business day"],
  [KeyRound, "Ownership", "You own the website, content and domain"],
];

const heroDescriptions: Record<string, string> = {
  delhi: "Illustrative photo of a Delhi market retailer packing ecommerce orders",
  noida: "Illustrative photo of a developer working in a Noida software office",
  faridabad: "Illustrative photo of a Faridabad industrial supplier checking electrical stock",
  gurugram: "Illustrative photo of glass office towers in Gurugram",
  "delhi-ncr": "Illustrative photo of Delhi NCR wholesale staff reviewing inventory on a laptop",
  "south-delhi": "Illustrative photo of a South Delhi boutique owner working on a laptop",
};

const imageFor = (slug: string) => `/images/locations/${slug}.webp`;

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <p className="flex items-center gap-2 text-[13px] font-bold uppercase tracking-[0.14em] text-primary"><span className="h-0.5 w-7 bg-primary" />{children}</p>;
}

export function LocationPage({ location: l }: { location: ServiceLocation }) {
  const content = localSearch[l.slug];
  const featured = content ? [...content.priority, ...services.keys()].filter((value, index, all) => all.indexOf(value) === index).map((i) => services[i]!) : services;
  const projects = projectsForLocation(l.slug, portfolio);
  const others = locations.filter((x) => x.slug !== l.slug);
  const img = imageFor(l.slug);
  const imgAlt = heroDescriptions[l.slug];
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="location-hero relative flex flex-col overflow-hidden bg-navy text-on-dark md:block md:h-[420px]">
        <img src={img} alt={imgAlt} width={504} height={504} fetchPriority="high" className="order-last aspect-[16/9] w-full object-cover object-center md:absolute md:inset-y-0 md:right-0 md:h-full md:w-[58%]" />
        <div className="absolute inset-0 hidden bg-gradient-to-r from-navy via-navy/75 to-transparent md:block" aria-hidden="true" />
        <div className="page-shell relative flex h-full items-center py-10 md:py-0">
          <div className="min-w-0 max-w-[620px]">
            <nav aria-label="Breadcrumb" className="sr-only">
              <Link tabIndex={-1} to="/" className="hover:text-on-dark">Home</Link><span aria-hidden="true">›</span>
              <Link tabIndex={-1} to="/locations" className="hover:text-on-dark">Locations</Link><span aria-hidden="true">›</span>
              <span aria-current="page" className="text-on-dark">{l.city}</span>
            </nav>
            <h1 className="text-balance text-[30px] font-medium leading-[1.15] md:text-[36px] lg:text-[40px]">{l.keyword}</h1>
            <p className="mt-3 text-[16px] leading-7 text-on-dark/90">{l.intro}</p>
            <div className="mt-5 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex h-11 items-center gap-2 rounded-md bg-gold px-6 text-[15px] font-semibold text-navy hover:opacity-90">Get a Free Quote <ArrowRight className="h-4 w-4" /></Link>
              <a href="tel:+917551120242" className="inline-flex h-11 items-center gap-2 rounded-md border border-on-dark/60 px-6 text-[15px] font-semibold text-on-dark hover:bg-on-dark/10"><Phone className="h-4 w-4" />+91 75511 20242</a>
            </div>
          </div>
        </div>
      </section>

      <section aria-label="Webgram at a glance" className="border-b border-border bg-card">
        <ul className="page-shell grid grid-cols-2 gap-4 py-5 lg:grid-cols-4">
          {glance.map(([Icon, label, value]) => (
            <li key={label} className="flex min-w-0 items-start gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
              <span className="min-w-0"><span className="block text-[13px] text-muted-foreground">{label}</span><span className="block text-[15px] font-semibold leading-6 text-navy">{value}</span></span>
            </li>
          ))}
        </ul>
      </section>

      <section className="py-12 md:py-16">
        <div className="page-shell">
          <Eyebrow>Our services</Eyebrow>
          <h2 className="mt-2 text-[26px] leading-tight text-navy md:text-[30px]">Website services for {l.city} businesses</h2>
          <div className="mt-7 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map(([name, to, Icon, text]) => (
              <a key={to} href={to} className="group flex min-w-0 flex-col rounded-xl border border-border bg-card p-5 shadow-card transition-colors hover:border-primary">
                <span className="grid h-11 w-11 place-items-center rounded-lg bg-primary-soft text-primary"><Icon className="h-5 w-5" /></span>
                <h3 className="mt-4 text-[18px] leading-snug text-navy">{name}</h3>
                <p className="mt-2 flex-1 text-[15px] leading-6 text-muted-foreground">{text}</p>
                <span className="mt-4 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary">Learn more <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {l.projectFocus ? (
        <section className="bg-sky-soft py-12 md:py-16">
          <div className="page-shell">
            <Eyebrow>Project planning</Eyebrow>
            <h2 className="mt-2 text-[26px] leading-tight text-navy md:text-[30px]">Planning your website in {l.city}</h2>
            <ol className="mt-7 grid gap-4 md:grid-cols-3">
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

      <section className="py-12 md:py-16">
        <div className="page-shell grid gap-5 md:grid-cols-2">
          <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-7">
            <h2 className="text-[22px] text-navy md:text-[24px]">Industries we serve in {l.city}</h2>
            <div className="mt-5 flex flex-wrap gap-2">{l.industries.map((i) => <span key={i} className="rounded-full border border-border bg-primary-soft px-3.5 py-1.5 text-[14px] font-medium text-navy">{i}</span>)}</div>
          </div>
          <div className="rounded-xl border border-border bg-card p-6 shadow-card md:p-7">
            <h2 className="text-[22px] text-navy md:text-[24px]">Areas we cover</h2>
            <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 sm:grid-cols-3">{l.areas.map((a) => <li key={a} className="flex min-w-0 items-center gap-2 text-[15px] text-navy"><MapPin className="h-4 w-4 shrink-0 text-primary" /><span className="min-w-0">{a}</span></li>)}</ul>
          </div>
        </div>
      </section>

      {projects.items.length ? (
        <section className="bg-sky-soft py-12 md:py-16">
          <div className="page-shell">
            <div className="flex flex-wrap items-end justify-between gap-4">
              <div className="min-w-0">
                <Eyebrow>Our work</Eyebrow>
                <h2 className="mt-2 text-[26px] leading-tight text-navy md:text-[30px]">{projects.local ? (projects.withNcr ? `Websites we built in ${l.city} & Delhi NCR` : `Websites we built in ${l.city}`) : "Websites we built across Delhi NCR"}</h2>
              </div>
              <Link to="/work/$slug" params={{ slug: "portfolio" }} className="inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary">View full portfolio <ArrowRight className="h-4 w-4" /></Link>
            </div>
            <div className="mt-7 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {projects.items.map((item) => (
                <article key={item.url} className="flex min-w-0 flex-col gap-3 rounded-xl border border-border bg-card p-3 shadow-card">
                  <ScrollingFrame item={item} height={220} />
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

      <section className="py-12 md:py-16">
        <div className="page-shell">
          <div className="grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="rounded-2xl border border-border bg-sky-soft p-6 md:p-8">
            <h2 className="text-2xl font-extrabold text-navy">Questions about websites in {l.city}</h2>
            <div className="mt-4 divide-y divide-border">
              {content?.answers.map(([question, answer]) => (
                <details key={question} className="py-4">
                  <summary className="cursor-pointer font-bold text-navy">{question}</summary>
                  <p className="mt-3 leading-7 text-muted-foreground">{answer}</p>
                </details>
              ))}
            </div>
          </div>
          <div className="min-w-0">
          <Eyebrow>Why Webgram</Eyebrow>
          <h2 className="mt-2 text-[26px] leading-tight text-navy md:text-[30px]">Why {l.city} businesses choose Webgram IT Solution</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {reasons.map(([t, d]) => (
              <div key={t} className="rounded-xl border border-border bg-card p-5 shadow-card"><CheckCircle2 className="h-6 w-6 text-primary" /><h3 className="mt-3 text-[18px] text-navy">{t}</h3><p className="mt-2 text-[15px] leading-6 text-muted-foreground">{d}</p></div>
            ))}
          </div>
          </div>
          </div>
        </div>
      </section>

      <section className="bg-navy py-12 text-on-dark md:py-14">
        <div className="page-shell grid gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-center">
          <div className="min-w-0">
            <h2 className="text-[26px] leading-tight md:text-[30px]">Ready to discuss your {l.city} website?</h2>
            <p className="mt-3 max-w-[560px] text-[16px] leading-7 text-on-dark/85">Share your goals and we will suggest the right platform, scope and timeline, with a fixed itemised quote after discussion.</p>
            <Link to="/contact" className="mt-6 inline-flex h-11 items-center gap-2 rounded-md bg-gold px-6 text-[15px] font-semibold text-navy hover:opacity-90">Get a Free Quote <ArrowRight className="h-4 w-4" /></Link>
          </div>
          <TrustFacts />
        </div>
      </section>

      <section className="py-10 md:py-12">
        <div className="page-shell">
          <h2 className="text-[20px] text-navy">We also serve</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
            {others.map((x) => (
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
      <section className="location-hero relative overflow-hidden bg-navy text-on-dark">
        <div className="page-shell relative py-12 md:py-14">
          <nav aria-label="Breadcrumb" className="sr-only"><Link tabIndex={-1} to="/" className="hover:text-on-dark">Home</Link><span aria-hidden="true">›</span><span aria-current="page" className="text-on-dark">Locations</span></nav>
          <h1 className="max-w-[780px] text-balance text-[30px] font-medium leading-[1.15] md:text-[38px]">Website & Ecommerce Development Across Delhi NCR</h1>
          <p className="mt-4 max-w-[700px] text-[16px] leading-7 text-on-dark/85 md:text-[17px]">From our office in Sangam Vihar, New Delhi, we build websites and online stores for businesses in Delhi, Noida, Gurugram, Faridabad and nearby areas.</p>
        </div>
      </section>
      <section className="py-12 md:py-16">
        <div className="page-shell grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {locations.map((l) => (
            <Link key={l.slug} to="/locations/$city" params={{ city: l.slug }} className="group flex min-w-0 flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-colors hover:border-primary">
              <img src={imageFor(l.slug)} alt={heroDescriptions[l.slug]} width={504} height={504} loading="lazy" className="aspect-[2/1] w-full object-cover object-right" />
              <div className="flex flex-1 flex-col p-6">
              <p className="flex items-center gap-2 text-[14px] font-semibold text-primary"><MapPin className="h-4 w-4" />{l.city}</p>
              <h2 className="mt-3 text-[20px] leading-snug text-navy">{l.keyword}</h2>
              <p className="mt-3 flex-1 text-[15px] leading-6 text-muted-foreground">{localSearch[l.slug]?.description ?? l.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-[15px] font-semibold text-primary">View {l.city} page <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" /></span>
              </div>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
