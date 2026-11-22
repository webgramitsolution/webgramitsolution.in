import { HeroHeading } from "@/components/hero-heading";
import { ArrowRight, CreditCard, RefreshCw, Store } from "lucide-react";
import type { ServicePlan } from "@/lib/service-planning";

const storefrontIcons = [Store, RefreshCw, CreditCard];

export function ServicePlanning({ plan, headline = false, whiteIntro = false, storefront = false }: { plan: ServicePlan; headline?: boolean; whiteIntro?: boolean; storefront?: boolean }) {
  const headingClass = `max-w-2xl text-3xl font-extrabold leading-tight text-navy ${storefront ? "tracking-tight md:text-[clamp(2rem,3.1vw,3rem)]" : "md:text-4xl"}`;
  const CardHeading = headline ? "h2" : "h3";

  return (
    <section className={`border-y border-border py-12 md:py-16 ${storefront ? "bg-gradient-to-br from-white to-violet-soft/60" : "bg-sky-soft"}`}>
      <div className="page-shell">
        <div className={`grid items-center gap-7 md:grid-cols-[1.05fr_0.95fr] ${storefront ? "rounded-3xl border border-violet/15 bg-white p-5 shadow-card md:gap-9 md:p-8 lg:p-10" : whiteIntro ? "rounded-2xl bg-white p-5 md:p-7" : ""}`}>
          <div>
            {headline ? <HeroHeading className={headingClass} title={plan.title} /> : <h2 className={`${headingClass} ${storefront ? "text-pretty" : "text-balance"}`}>{plan.title}</h2>}
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">{plan.summary}</p>
          </div>
          {storefront ? (
            <div className="min-w-0 rounded-2xl border border-violet/15 bg-violet-soft/50 p-2 shadow-card">
              <img src={plan.image} alt={plan.alt} width={1536} height={768} loading="lazy" className="block h-auto w-full rounded-xl" />
            </div>
          ) : <img src={plan.image} alt={plan.alt} loading={headline ? "eager" : "lazy"} fetchPriority={headline ? "high" : undefined} width={plan.imageSize?.width ?? 800} height={plan.imageSize?.height ?? 450} className={`w-full ${plan.imageSize ? "h-auto object-contain" : "aspect-[16/9] rounded-2xl bg-card object-cover shadow-card"}`} />}
        </div>
        <div className={`grid gap-4 md:grid-cols-3 ${storefront ? "mt-5" : "mt-8"}`}>
          {plan.choices.map(({ title, text }, index) => {
            const Icon = storefront ? storefrontIcons[index] : undefined;
            return (
              <article key={title} className={`border bg-card p-6 shadow-card ${storefront ? "rounded-2xl border-violet/15" : "rounded-xl border-border"}`}>
                {Icon && <span className="mb-4 inline-grid size-10 place-items-center rounded-xl bg-violet-soft text-violet"><Icon className="size-5" aria-hidden="true" /></span>}
                <CardHeading className="text-lg font-extrabold text-navy">{title}</CardHeading>
                <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
              </article>
            );
          })}
        </div>
        <nav aria-label="Related services and locations" className="mt-7 flex flex-wrap gap-x-6 gap-y-4">
          {plan.links.map(({ href, label }) => <a key={href} href={href} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">{label} <ArrowRight className="h-4 w-4 shrink-0" /></a>)}
        </nav>
      </div>
    </section>
  );
}
