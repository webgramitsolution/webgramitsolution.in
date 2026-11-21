import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { SiteHeader } from "@/components/site-header";
import { PortfolioCard } from "@/components/portfolio-showcase";
import { Button } from "@/components/ui/button";
import { portfolio } from "@/lib/portfolio";
import { ComparisonTable, DirectAnswer } from "@/components/direct-answer";

const URL = "https://webgramitsolution.in/work/portfolio";
const title = "Portfolio — Websites & Ecommerce Stores We Built | Webgram IT Solution";
const description =
  "Explore live websites and ecommerce stores built by Webgram IT Solution for clients in India and Canada — D2C stores, B2B wholesale, healthcare, staffing and local service brands.";
const heroImage = "https://ik.imagekit.io/2kynz1ge7/portfolio.png";

export const Route = createFileRoute("/work/portfolio")({
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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "CollectionPage",
              "@id": URL,
              name: title,
              description,
              url: URL,
              about: { "@id": "https://webgramitsolution.in/#business" },
              mainEntity: {
                "@type": "ItemList",
                numberOfItems: portfolio.length,
                itemListElement: portfolio.map((item, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: { "@type": "WebSite", name: item.name, url: item.url, description: item.summary },
                })),
              },
            },
          ],
        }),
      },
    ],
  }),
  component: PortfolioPage,
});

function PortfolioPage() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteHeader />
      <section className="contact-hero text-on-dark">
        <img src={heroImage} alt="Webgram IT Solution website portfolio" width={1536} height={1024} className="absolute inset-0 h-full w-full object-cover object-right" />
        <div className="header-shell relative z-10 flex h-full flex-col justify-center py-6"><div className="max-w-[50%] max-md:max-w-full">
          <h1 className="page-title max-w-[720px] leading-[1.08]">Live Website Portfolio<br /><span className="text-gold">India and Canada</span></h1>
          <p className="page-lead mt-2 max-w-[680px] text-on-dark/85">
            Real, live projects for businesses in India and Canada — ecommerce stores, B2B wholesale platforms and lead-generating business websites. Each preview scrolls through the actual homepage.
          </p></div>
        </div>
      </section>
      <section className="py-10 md:py-14">
        <div className="header-shell grid grid-cols-1 gap-4 md:grid-cols-4">
          {portfolio.map((item, index) => <PortfolioCard key={item.domain} item={item} compact eager={index === 0} />)}
        </div>
      </section>
      <DirectAnswer
        id="what-websites-does-webgram-build"
        question="What kind of websites does Webgram IT Solution build?"
        answer="Webgram IT Solution builds ecommerce stores, B2B wholesale platforms and lead-generating business websites for clients in India and Canada. Each project on this page is a real, live website using WordPress, WooCommerce, Shopify or React, designed for fast loading, mobile buyers, search visibility and measurable enquiries or sales."
      />
      <ComparisonTable
        id="website-types-compared"
        title="Which Website Type Fits Your Business?"
        intro="A quick comparison of the three website types shown in our portfolio, so you can pick the right starting point."
        columns={["Feature", "Ecommerce Store", "Business Website", "Best Suited For"]}
        rows={[
          { feature: "Main goal", a: "Sell products online", b: "Generate calls and enquiries", best: "Retail brands vs service businesses" },
          { feature: "Platforms", a: "WooCommerce, Shopify", b: "WordPress, React", best: "Catalogue size and budget decide" },
          { feature: "Key pages", a: "Catalogue, cart, checkout", b: "Services, about, contact", best: "Depends on how customers buy" },
          { feature: "Integrations", a: "Payments, shipping, inventory", b: "Forms, WhatsApp, maps", best: "Plan before design starts" },
          { feature: "Wholesale needs", a: "Add B2B pricing and MOQ", b: "Usually not required", best: "Manufacturers and distributors" },
        ]}
      />
      <section className="bg-sky-soft py-10">
        <div className="header-shell flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-[26px] text-navy">Want a website like these?</h2>
            <p className="mt-1 text-[16px] text-muted-foreground">Tell us about your business and we will share a plan, timeline and quote.</p>
          </div>
          <Button asChild className="h-11 bg-gold px-6 text-[15px] font-semibold text-navy hover:bg-gold/90">
            <Link to="/contact">Start Your Project <ArrowRight className="ml-1 h-4 w-4" /></Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
