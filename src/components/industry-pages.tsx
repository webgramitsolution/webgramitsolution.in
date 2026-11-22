import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2, ChevronDown, ClipboardList, Settings2 } from "lucide-react";
import { HeroHeading } from "@/components/hero-heading";
import { SiteHeader } from "@/components/site-header";
import { getIndustry, industries, industriesDirectory, industryImage, type Industry, type IndustrySlug } from "@/lib/industry-page-data";

const primaryButton = "inline-flex min-h-11 items-center justify-center gap-2 rounded-md bg-gold px-4 py-2 text-sm font-semibold text-on-dark hover:opacity-90 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2";

function IndustryPicture({ slug, alt, hero = false }: { slug: IndustrySlug | "directory"; alt: string; hero?: boolean }) {
  const base = industryImage(slug);
  return (
    <picture className={hero ? "block h-full" : "block"}>
      <source type="image/avif" srcSet={`${base}-640.avif 640w, ${base}-1536.avif 1536w`} sizes={hero ? "(min-width: 768px) 52vw, 100vw" : "(min-width: 1024px) 31vw, (min-width: 640px) 48vw, 100vw"} />
      <img src={`${base}.webp`} alt={alt} width={1536} height={480} loading={hero ? "eager" : "lazy"} fetchPriority={hero ? "high" : "auto"} className={hero ? "block h-52 w-full object-cover md:absolute md:inset-0 md:h-full" : "block aspect-[2.2] w-full object-cover"} />
    </picture>
  );
}

function IndustryHero({ industry }: { industry?: Industry }) {
  const slug = industry?.slug ?? "directory";
  const lines = industry?.hero ?? ["Ecommerce & Web Development", "for Indian Industries"] as const;
  return (
    <header className="overflow-hidden bg-navy text-on-dark">
      <div className="grid items-stretch md:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
        <div className="mx-auto flex w-full max-w-[740px] flex-col justify-center px-4 py-8 md:mr-0 md:min-h-[330px] md:py-10 lg:px-8">
          <nav aria-label="Breadcrumb" className="mb-4 flex flex-wrap gap-x-2 text-sm text-on-dark/80">
            <Link to="/" className="hover:underline">Home</Link>
            <span aria-hidden="true">/</span>
            {industry ? <><Link to="/industries" className="hover:underline">Industries</Link><span aria-hidden="true">/</span><span aria-current="page">{industry.page.title}</span></> : <span aria-current="page">Industries</span>}
          </nav>
          <HeroHeading className="text-[30px] leading-[1.12] lg:text-[39px]" lines={lines} accent="text-sky" />
          <p className="mt-3 max-w-[34rem] text-sm leading-6 text-on-dark/85 md:text-base">{industry?.description ?? industriesDirectory.description}</p>
          <div className="mt-5 flex flex-wrap gap-3">
            {industry ? <Link to="/contact" className={primaryButton}>Discuss your project <ArrowRight className="size-4" aria-hidden="true" /></Link> : <a href="#industry-directory" className={primaryButton}>Browse industries <ArrowRight className="size-4" aria-hidden="true" /></a>}
            <Link to="/work/portfolio" className="inline-flex min-h-11 items-center rounded-md border border-on-dark/50 px-4 py-2 text-sm font-semibold text-on-dark hover:bg-on-dark/10">View our work</Link>
          </div>
        </div>
        <div className="relative min-w-0">
          <IndustryPicture slug={slug} alt={industry?.alt ?? "Illustration of a business owner reviewing an ecommerce catalogue"} hero />
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden bg-gradient-to-r from-navy via-transparent via-30% to-transparent md:block" />
        </div>
      </div>
    </header>
  );
}

export function IndustriesDirectory() {
  return <>
    <SiteHeader />
    <main>
      <IndustryHero />
      <section id="industry-directory" className="scroll-mt-28 bg-sky-soft py-8 md:py-12">
        <div className="page-shell">
          <h2 className="text-2xl text-navy md:text-3xl">Find your industry</h2>
          <p className="mt-2 max-w-2xl text-sm leading-6 text-muted-foreground">See how catalogue, ordering and fulfilment requirements shape the websites and portals we build for different businesses.</p>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((industry) => (
              <Link key={industry.slug} to="/industries/$slug" params={{ slug: industry.slug }} className="group flex min-w-0 flex-col overflow-hidden rounded-lg border border-border bg-card shadow-card hover:border-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
                <IndustryPicture slug={industry.slug} alt={industry.alt} />
                <div className="flex flex-1 flex-col p-4">
                  <h3 className="text-xl text-navy">{industry.page.title}</h3>
                  <p className="mb-4 mt-2 flex-1 text-sm leading-6 text-muted-foreground">{industry.description}</p>
                  <span className="inline-flex items-center gap-2 text-sm font-semibold text-primary">Explore {industry.page.title.toLowerCase()} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden="true" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  </>;
}

export function IndustryDetail({ industry }: { industry: Industry }) {
  return <>
    <SiteHeader />
    <main>
      <IndustryHero industry={industry} />
      <section className="bg-sky-soft py-7">
        <div className="page-shell">
          <h2 className="text-2xl text-navy">What we build for {industry.page.title.toLowerCase()}</h2>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {industry.page.points.map((point) => (
              <li key={point} className="flex items-center gap-2 rounded-md border border-border bg-card p-3 text-sm font-semibold text-navy">
                <CheckCircle2 className="size-4 shrink-0 text-primary" aria-hidden="true" />{point}
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className="page-shell py-8 md:py-10">
        <h2 className="text-2xl text-navy md:text-3xl">What to plan before development</h2>
        <div className="mt-4 grid gap-4 md:grid-cols-2">
          {industry.sections.map(([title, text], index) => {
            const Icon = index === 0 ? ClipboardList : Settings2;
            return <article key={title} className="rounded-lg border border-border bg-card p-5 shadow-card">
              <Icon className="size-6 text-primary" aria-hidden="true" />
              <h3 className="mt-3 text-lg text-navy">{title}</h3>
              <p className="mt-2 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>;
          })}
        </div>
      </section>
      <section className="bg-sky-soft py-7">
        <div className="page-shell grid gap-5 md:grid-cols-2">
          <div>
            <h2 className="text-2xl text-navy">Example buyer workflow</h2>
            <p className="mt-2 max-w-xl text-sm leading-6 text-muted-foreground">{industry.workflow}</p>
          </div>
          <div>
            <h2 className="text-2xl text-navy">Common question</h2>
            <details className="group mt-3 rounded-md border border-border bg-card p-4">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-semibold text-navy [&::-webkit-details-marker]:hidden">
                {industry.faq[0]}<ChevronDown className="size-4 shrink-0 group-open:rotate-180" aria-hidden="true" />
              </summary>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{industry.faq[1]}</p>
            </details>
          </div>
        </div>
      </section>
      <section className="bg-navy py-7 text-on-dark">
        <div className="page-shell flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-2xl">Planning a website or portal?</h2>
          <div className="flex flex-wrap items-center gap-4">
            <a href={industry.next.href} className="text-sm font-semibold text-on-dark underline underline-offset-4">{industry.next.label}</a>
            <Link to="/contact" className={primaryButton}>Request a project quote <ArrowRight className="size-4" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
      <nav className="page-shell py-7" aria-label="Related industries">
        <h2 className="text-xl text-navy">Related industries</h2>
        <ul className="mt-3 flex flex-wrap gap-3">
          {industry.related.map((slug) => {
            const next = getIndustry(slug);
            return next ? <li key={slug}><Link to="/industries/$slug" params={{ slug }} className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-primary hover:underline">{next.page.title}<ArrowRight className="size-4" aria-hidden="true" /></Link></li> : null;
          })}
        </ul>
      </nav>
    </main>
  </>;
}
