import { HeroHeading } from "@/components/hero-heading";
import { ArrowRight } from "lucide-react";
import type { ServicePlan } from "@/lib/service-planning";

export function ServicePlanning({ plan, headline = false, whiteIntro = false }: { plan: ServicePlan; headline?: boolean; whiteIntro?: boolean }) {
  const headingClass = "max-w-2xl text-3xl font-extrabold leading-tight text-navy md:text-4xl";
  const CardHeading = headline ? "h2" : "h3";

  return (
    <section className="border-y border-border bg-sky-soft py-12 md:py-16">
      <div className="page-shell">
        <div className={`grid items-center gap-7 md:grid-cols-[1.05fr_0.95fr] ${whiteIntro ? "rounded-2xl bg-white p-5 md:p-7" : ""}`}>
          <div>
            {headline ? <HeroHeading className={headingClass} title={plan.title} /> : <h2 className={`${headingClass} text-balance`}>{plan.title}</h2>}
            <p className="mt-4 max-w-xl text-base leading-7 text-muted-foreground">{plan.summary}</p>
          </div>
          <img src={plan.image} alt={plan.alt} loading={headline ? "eager" : "lazy"} fetchPriority={headline ? "high" : undefined} width={plan.imageSize?.width ?? 800} height={plan.imageSize?.height ?? 450} className={`w-full ${plan.imageSize ? "h-auto object-contain" : "aspect-[16/9] rounded-2xl bg-card object-cover shadow-card"}`} />
        </div>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {plan.choices.map(({ title, text }) => (
            <article key={title} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <CardHeading className="text-lg font-extrabold text-navy">{title}</CardHeading>
              <p className="mt-3 text-sm leading-6 text-muted-foreground">{text}</p>
            </article>
          ))}
        </div>
        <nav aria-label="Related services and locations" className="mt-7 flex flex-wrap gap-x-6 gap-y-4">
          {plan.links.map(({ href, label }) => <a key={href} href={href} className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">{label} <ArrowRight className="h-4 w-4 shrink-0" /></a>)}
        </nav>
      </div>
    </section>
  );
}
