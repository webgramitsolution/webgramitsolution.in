import { SiteHeader } from "@/components/site-header";
import { BlogAdBand, BlogAdsConsent } from "@/components/blog-ads";
import { FileText, ShieldCheck, Info } from "lucide-react";

export type LegalSection = { title: string; paragraphs: string[]; bullets?: string[] };

const HERO = "https://ik.imagekit.io/x3cipokny/icon/guest%20post%20banner.png";

export function LegalPage({ eyebrow, title, summary, updated, sections }: { eyebrow: string; title: string; summary: string; updated: string; sections: LegalSection[] }) {
  return <div className="min-h-screen bg-sky-soft text-foreground">
    <SiteHeader />
    <main>
      <section className="relative overflow-hidden bg-sky-soft bg-cover bg-right bg-no-repeat" style={{ backgroundImage: `url(${HERO})` }} aria-label={title}>
        <span className="absolute inset-y-0 left-0 w-[72%] bg-sky-soft/90 md:hidden" aria-hidden="true" />
        <div className="page-shell relative py-9 md:py-12">
          <div className="max-w-[58%] lg:max-w-[620px]">
            <p className="text-xs font-extrabold uppercase tracking-wide text-primary">{eyebrow}</p>
            <h1 className="mt-1.5 text-3xl font-extrabold leading-tight text-navy lg:text-4xl">{title}</h1>
            <p className="mt-3 max-w-lg text-[16px] leading-7 text-muted-foreground">{summary}</p>
            <p className="mt-4 text-[13px] font-bold uppercase tracking-wider text-navy opacity-70">Last updated: {updated}</p>
          </div>
        </div>
      </section>

      <div className="page-shell grid gap-6 py-8 md:grid-cols-[1fr_minmax(0,180px)] xl:grid-cols-[180px_1fr_180px]">
        <aside className="hidden xl:block"><div className="sticky top-32"><BlogAdBand rail position="detailLeft" label="Advertisement — left" /></div></aside>

        <div className="space-y-4">
          {sections.map((section, i) => (
            <article key={section.title} className="rounded-lg border border-border bg-card p-5 shadow-card md:p-6">
              <div className="flex items-start gap-4">
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-md bg-primary-soft text-primary">
                  {i % 3 === 0 ? <FileText className="h-5 w-5" /> : i % 3 === 1 ? <ShieldCheck className="h-5 w-5" /> : <Info className="h-5 w-5" />}
                </span>
                <div className="min-w-0 flex-1">
                  <h2 className="text-[21px] text-navy md:text-[24px]">{section.title}</h2>
                  <div className="mt-3 space-y-4 text-[15px] leading-7 text-muted-foreground md:text-[16px]">
                    {section.paragraphs.map((paragraph, idx) => <p key={idx}>{paragraph}</p>)}
                  </div>
                  {section.bullets ? (
                    <ul className="mt-4 list-disc space-y-2 pl-5 text-[15px] leading-7 text-muted-foreground md:text-[16px]">
                      {section.bullets.map((item, idx) => <li key={idx}>{item}</li>)}
                    </ul>
                  ) : null}
                </div>
              </div>
            </article>
          ))}
        </div>

        <aside className="hidden md:block"><div className="sticky top-32"><BlogAdBand rail position="detailRight" label="Advertisement — right" /></div></aside>
      </div>
      <BlogAdsConsent />
    </main>
  </div>;
}
