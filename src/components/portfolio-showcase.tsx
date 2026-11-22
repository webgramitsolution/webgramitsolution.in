import { ArrowUpRight, CheckCircle2, ExternalLink, MapPin } from "lucide-react";

import type { PortfolioItem } from "@/lib/portfolio";
import { technologyStack } from "@/lib/site-images";

export function ScrollingFrame({ item, height = 400, eager = false }: { item: PortfolioItem; height?: number; eager?: boolean }) {
  return (
    <a href={item.url} target="_blank" rel="noopener" aria-label={`Open ${item.name} live website`} className="group block overflow-hidden rounded-xl border border-border bg-card shadow-card transition-shadow hover:shadow-lg">
      <div className="flex items-center gap-1.5 border-b border-border bg-muted px-3 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-destructive/70" />
        <span className="h-2.5 w-2.5 rounded-full bg-gold" />
        <span className="h-2.5 w-2.5 rounded-full bg-primary/60" />
        <span className="ml-2 flex min-w-0 flex-1 items-center gap-1.5 truncate rounded-md border border-border/70 bg-card px-2.5 py-1 text-[13px] text-navy">
          <span className="truncate">{item.url}</span><ExternalLink className="ml-auto h-3.5 w-3.5 shrink-0 text-primary" />
        </span>
      </div>
      <div className="portfolio-frame relative overflow-hidden bg-white" style={{ height, ["--frame-h" as string]: `${height}px` }}>
        <img src={item.image} alt={`${item.name} full live website preview, designed by Webgram IT Solution`} loading={eager ? "eager" : "lazy"} fetchPriority={eager ? "high" : "auto"} decoding="async" width={1440} className="portfolio-scroll block h-auto w-full" />
        <span className="absolute bottom-3 right-3 rounded-full bg-navy/90 px-3 py-1.5 text-[12px] font-semibold text-white opacity-0 shadow-md transition-opacity group-hover:opacity-100">Open live website</span>
      </div>
    </a>
  );
}

export function PortfolioCard({ item, compact = false, eager = false }: { item: PortfolioItem; compact?: boolean; eager?: boolean }) {
  const technologies = technologyStack.filter((t) => t.name !== "More");
  const metadataSize = compact ? "text-xs leading-4" : "text-[14px]";

  return (
    <article className={compact ? "flex min-w-0 flex-col gap-3 rounded-lg border border-border bg-card p-3 shadow-card" : "grid gap-6 rounded-lg border border-border bg-card p-4 shadow-card md:grid-cols-2 md:p-6 lg:gap-8"}>
      <ScrollingFrame item={item} height={compact ? 260 : 460} eager={eager} />
      <div className={`flex min-w-0 flex-col ${compact ? "flex-1" : ""}`}>
        <div className={`flex flex-wrap items-center justify-between ${compact ? "gap-x-2 gap-y-1" : "gap-2"}`}>
          <p className={`font-semibold text-primary ${metadataSize}`}>{item.category}</p>
          <p className={`flex items-center gap-1 text-muted-foreground ${metadataSize}`}><MapPin className={compact ? "size-3.5 shrink-0" : "size-4 shrink-0"} aria-hidden="true" />{item.location}</p>
        </div>
        <h2 className={compact ? "mt-2 text-[18px] leading-tight text-navy" : "mt-2 text-[26px] leading-tight text-navy md:text-[30px]"}>{item.name}</h2>
        <p className={`text-muted-foreground ${compact ? "mt-2 text-sm leading-[1.55]" : "mt-3 text-[16px] leading-7"}`}>{item.summary}</p>
        <h3 className={`text-navy ${compact ? "mt-4 text-[17px]" : "mt-6 text-[19px]"}`}>Key Features</h3>
        <span className="mt-2 block h-0.5 w-8 bg-navy" />
        <ul className={compact ? "mt-3 grid gap-2" : "mt-4 grid gap-3 sm:grid-cols-2"}>
          {item.delivered.map((point) => <li key={point} className={`flex gap-2 text-navy ${compact ? "items-start text-[13px] leading-[1.45]" : "items-center text-[15px]"}`}><CheckCircle2 className={`shrink-0 text-primary ${compact ? "mt-0.5 size-3.5" : "size-4"}`} aria-hidden="true" />{point}</li>)}
        </ul>
        <div className={`border-t border-border ${compact ? "mt-4 pt-3" : "mt-6 pt-5"}`}>
          <p className={`font-semibold text-navy ${compact ? "text-[13px]" : "text-[14px]"}`}>Technology used</p>
          <div className="technology-row mt-3 grid snap-x snap-proximity grid-flow-col auto-cols-[78px] gap-1.5 overflow-x-auto">
            {technologies.map((technology) => (
              <div key={technology.name} className="flex min-w-0 snap-start flex-col items-center gap-1.5 text-center">
                <span className="grid h-12 w-12 place-items-center rounded-xl border border-border bg-gradient-to-b from-card to-muted p-2 shadow-card transition-transform hover:-translate-y-0.5">
                  <img src={technology.src} alt={`${technology.name} technology`} width={48} height={48} loading="lazy" className="h-full w-full object-contain" />
                </span>
                <span className={`w-full font-medium leading-5 text-navy ${compact ? "text-xs" : "text-[13px]"}`}>{technology.name}</span>
              </div>
            ))}
          </div>
        </div>
        <div className={compact ? "mt-auto pt-4" : "mt-6 md:mt-auto md:pt-6"}>
          <a href={item.url} target="_blank" rel="noopener" className={`inline-flex items-center gap-1.5 rounded-md bg-navy font-semibold text-on-dark hover:opacity-90 ${compact ? "min-h-10 px-4 py-2 text-sm" : "px-5 py-3 text-[15px]"}`}>Visit Live Website <ArrowUpRight className="h-4 w-4" /></a>
          <p className="mt-2 text-[13px] text-muted-foreground">{item.domain}</p>
        </div>
      </div>
    </article>
  );
}
