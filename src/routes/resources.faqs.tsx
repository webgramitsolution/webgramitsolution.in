import { ServiceHero, serviceHeroImage } from "@/components/service-hero";
import { ecommerceBuyerGuide as guide } from "@/lib/ecommerce-buyer-guide";
import { HeroHeading } from "@/components/hero-heading";
import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, ChevronDown } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { Button } from "@/components/ui/button";
import { publicPageSchema, SITE_URL } from "@/lib/site-identity";
import { faqGroups as groups } from "@/lib/faq-content";

const URL = "https://webgramitsolution.in/resources/faqs";
const title = "FAQs — Website, Ecommerce & B2B Development | Webgram IT Solution";
const description =
  "Answers to common questions about Webgram IT Solution: website and ecommerce development, timelines, pricing, WooCommerce, Shopify, B2B portals, maintenance and support.";
const heroImage = SITE_URL + serviceHeroImage("website-faq");

export const Route = createFileRoute("/resources/faqs")({
  head: () => ({
    links: [{ rel: "canonical", href: URL }],
    meta: [
      { title },
      { name: "description", content: description },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: URL },
      { property: "og:image", content: heroImage },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: heroImage },
    ],
    scripts: [...publicPageSchema("/resources/faqs", title, description), {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "@id": `${URL}#faq`,
        url: URL,
        name: title,
        inLanguage: "en-IN",
        isPartOf: { "@id": "https://webgramitsolution.in/#website" },
        about: { "@id": "https://webgramitsolution.in/#business" },
        publisher: { "@id": "https://webgramitsolution.in/#business" },
        mainEntity: groups.flatMap((group) => group.items).map(([name, text]) => ({
          "@type": "Question",
          name,
          acceptedAnswer: { "@type": "Answer", text, author: { "@id": "https://webgramitsolution.in/#business" } },
        })),
      }),
    }],
  }),
  component: FaqsPage,
});


function FaqsPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <ServiceHero slug="website-faq">
        <div className="ecom-shell relative flex h-full items-center py-6">
          <div className="max-w-[540px]">
            <HeroHeading className="text-[30px] font-medium leading-tight" lines={["Website Development FAQs", "Plan Your Build With Clarity"]} accent="text-[#f4c657]" />
            <p className="mt-3 text-[13px] leading-relaxed text-on-dark/90 sm:text-[15px]">
              <span className="block">Compare costs, timelines and platforms.</span>{" "}
              <span className="block">Know what to expect after launch.</span>
            </p>
            <Button asChild className="mt-4">
              <a href="#faq">Browse FAQs <ArrowRight aria-hidden="true" /></a>
            </Button>
          </div>
        </div>
      </ServiceHero>
      <section id="faq" className="scroll-mt-32 py-10 md:py-14">
        <div className="header-shell grid gap-8">
          {groups.map((group) => (
            <div key={group.title}>
              <h2 className="text-[24px] text-navy">{group.title}</h2>
              <div className="mt-3 grid items-start gap-3 md:grid-cols-2">
                {group.items.map(([q, a]) => (
                  <details key={q} className="group rounded-lg border border-border bg-card px-5 py-4 shadow-card">
                    <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-[17px] font-medium text-navy">
                      {q}<ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" />
                    </summary>
                    <p className="mt-3 text-[16px] leading-7 text-muted-foreground">{a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
          <a className="font-semibold text-primary underline underline-offset-4" href={guide.path}>Read the 10-step ecommerce website development guide</a>
          <div className="rounded-xl bg-sky-soft p-6">
            <h2 className="text-[22px] text-navy">Still have a question?</h2>
            <p className="mt-1 text-[16px] text-muted-foreground">Send us a message and our team will get back to you.</p>
            <div className="mt-4 flex flex-wrap gap-3">
              <Button asChild className="h-11 bg-gold px-6 text-[15px] font-semibold text-navy hover:bg-gold/90"><Link to="/contact">Contact Us <ArrowRight className="ml-1 h-4 w-4" /></Link></Button>
              <Button asChild variant="outline" className="h-11 px-6 text-[15px]"><Link to="/work/portfolio">View Portfolio</Link></Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
