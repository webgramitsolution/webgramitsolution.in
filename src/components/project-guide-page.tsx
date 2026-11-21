import { HeroHeading } from "@/components/hero-heading";
import { SiteHeader } from "@/components/site-header";
import { BUSINESS_ID, publicPageSchema, SITE_URL } from "@/lib/site-identity";
import type { projectGuides } from "@/lib/project-guides";

type Guide = (typeof projectGuides)[keyof typeof projectGuides];

export function projectGuideHead(guide: Guide) {
  const url = SITE_URL + guide.path;
  return {
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title: guide.title },
      { name: "description", content: guide.description },
      { property: "og:type", content: "article" },
      { property: "og:title", content: guide.title },
      { property: "og:description", content: guide.description },
      { property: "og:url", content: url },
    ],
    scripts: [...publicPageSchema(guide.path, guide.title, guide.description), {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Article",
        "@id": url + "#article",
        headline: guide.lines.join(" "),
        description: guide.description,
        mainEntityOfPage: url,
        inLanguage: "en-IN",
        author: { "@id": BUSINESS_ID },
        publisher: { "@id": BUSINESS_ID },
      }),
    }],
  };
}

export function ProjectGuidePage({ guide }: { guide: Guide }) {
  return <>
    <SiteHeader />
    <main>
      <article>
        <header className="bg-navy py-9 text-on-dark md:py-12">
          <div className="page-shell">
            <a href="/resources/guides" className="text-sm text-on-dark/85 underline underline-offset-4">Website and ecommerce guides</a>
            <HeroHeading className="mt-3 max-w-3xl text-3xl md:text-4xl" lines={guide.lines} />
            <p className="mt-3 max-w-2xl text-sm leading-6 text-on-dark/85 md:text-base">{guide.description}</p>
          </div>
        </header>
        <div className="page-shell grid gap-6 py-8 md:grid-cols-[15rem_minmax(0,1fr)]">
          <nav aria-label="In this checklist" className="h-fit rounded-lg border border-border bg-sky-soft p-4">
            <h2 className="text-base text-navy">In this checklist</h2>
            <ol className="mt-2 grid list-decimal gap-2 ps-5 text-sm text-primary">
              {guide.sections.map(([title], index) => <li key={title}><a href={`#step-${index + 1}`} className="underline-offset-4 hover:underline">{title}</a></li>)}
            </ol>
          </nav>
          <div className="grid gap-4">
            {guide.sections.map(([title, first, second], index) => (
              <section key={title} id={`step-${index + 1}`} className="scroll-mt-28 rounded-lg border border-border bg-card p-5">
                <h2 className="text-xl text-navy">{title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{first}</p>
                <p className="mt-3 leading-7 text-muted-foreground">{second}</p>
              </section>
            ))}
            <nav aria-label="Related resources" className="rounded-lg bg-sky-soft p-5">
              <h2 className="text-lg text-navy">Related resources</h2>
              <ul className="mt-2 grid gap-2">
                {guide.links.map(([label, href]) => <li key={href}><a href={href} className="text-primary underline underline-offset-4">{label}</a></li>)}
              </ul>
            </nav>
          </div>
        </div>
      </article>
    </main>
  </>;
}
