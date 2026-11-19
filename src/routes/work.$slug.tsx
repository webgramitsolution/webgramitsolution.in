import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { PortfolioCard } from "@/components/portfolio-showcase";
import { SiteHeader } from "@/components/site-header";
import { getSubpage, menuSections } from "@/lib/menu-pages";
import { portfolio } from "@/lib/portfolio";
import { getPublishedHomepageReviews } from "@/lib/reviews.functions";
import { Star } from "lucide-react";

const section = menuSections.work;

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ params }) => {
    const page = getSubpage("work", params.slug);
    if (!page) throw notFound();
    const reviews = params.slug === "case-studies" ? await getPublishedHomepageReviews().catch(() => []) : [];
    return { page, reviews };
  },
  head: ({ loaderData, params }) => ({
    links: [{ rel: "canonical", href: `https://webgramitsolution.in/work/${params.slug}` }],
    meta: [
      { title: `${loaderData?.page.title ?? "Work"} | Webgram IT Solution` },
      { name: "description", content: loaderData?.page.description ?? "" },
      { property: "og:title", content: `${loaderData?.page.title ?? "Work"} | Webgram IT Solution` },
      { property: "og:description", content: loaderData?.page.description ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: params.slug === "case-studies" ? [{
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: "Web Development Case Studies | Webgram IT Solution",
        url: "https://webgramitsolution.in/work/case-studies",
        mainEntity: { "@type": "ItemList", itemListElement: portfolio.map((item, index) => ({ "@type": "ListItem", position: index + 1, url: item.url, name: item.name })) },
      }),
    }] : [],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { page, reviews } = Route.useLoaderData();
  if (page.title === "Case Studies") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <section className="bg-navy py-12 text-on-dark md:py-16">
          <div className="header-shell">
            <h1 className="page-title max-w-[720px]">Real Client Projects<br /><span className="text-gold">Built for Business Growth.</span></h1>
            <p className="page-lead mt-3 max-w-[680px] text-on-dark/85">Every case study below links to a published client website. Explore the business requirements, target audience and experience delivered for each project.</p>
          </div>
        </section>
        <section className="py-10 md:py-14"><div className="header-shell grid gap-7">{portfolio.map((item) => <PortfolioCard key={item.domain} item={item} />)}</div></section>
        {reviews.length > 0 ? <section className="bg-sky-soft py-10 md:py-14" aria-labelledby="case-study-reviews">
          <div className="header-shell">
            <h2 id="case-study-reviews" className="text-[26px] leading-tight text-navy">What our clients say</h2>
            <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {reviews.slice(0, 6).map((review) => <article key={review.id} className="rounded-lg border border-border bg-card p-5 shadow-card">
                <div className="flex gap-1 text-gold" aria-label={`${review.rating} out of 5 stars`}>{Array.from({ length: review.rating }, (_, index) => <Star key={index} className="h-4 w-4 fill-current" />)}</div>
                <p className="mt-4 text-[15px] leading-7 text-foreground">“{review.review_text}”</p>
                <div className="mt-5 border-t border-border pt-4"><strong className="block text-[15px] text-navy">{review.customer_name}</strong><span className="text-[14px] text-muted-foreground">{[review.customer_role, review.company_name].filter(Boolean).join(" · ")}</span></div>
              </article>)}
            </div>
          </div>
        </section> : null}
      </div>
    );
  }
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
