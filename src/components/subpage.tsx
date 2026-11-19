import { Link } from "@tanstack/react-router";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import type { Subpage } from "@/lib/menu-pages";

export function SubpageTemplate({ sectionLabel, page }: { sectionLabel: string; page: Subpage }) {
  return (
    <div id="top" className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="ecom-waves bg-navy py-12 text-on-dark md:py-16">
        <div className="header-shell">
          <p className="mb-3 text-sm font-bold text-gold">{sectionLabel}</p>
          <h1 className="page-title max-w-[720px] leading-[1.12]">{page.title}<br /><span className="text-gold">{page.tagline}</span></h1>
          <p className="page-lead mt-3 max-w-[620px] text-on-dark/80">{page.description}</p>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="header-shell grid gap-8 md:grid-cols-[1.2fr_1fr] md:items-start">
          <div>
            <h2 className="content-title text-navy">Plan your project</h2>
            <p className="content-body mt-3 text-muted-foreground">Share your goals, required features and expected launch date. We’ll discuss the scope before preparing a quote.</p>
            <Button asChild className="mt-6 h-11 bg-gold px-6 text-[14px] font-bold text-navy hover:bg-gold/90">
              <Link to="/contact">
                Request a Quote <ArrowRight className="ml-1 h-4 w-4" />
              </Link>
            </Button>
          </div>
          <ul aria-label="What we can build" className="rounded-lg border border-border bg-card p-5 shadow-card">
            {page.points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 border-b border-border py-2.5 text-[15px] font-medium text-navy last:border-0">
                <CheckCircle2 className="h-4 w-4 shrink-0 text-primary" />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
