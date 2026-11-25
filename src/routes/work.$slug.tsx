import { ServiceHero, serviceHeroImage } from "@/components/service-hero";
import { SITE_URL } from "@/lib/site-identity";
import { HeroHeading } from "@/components/hero-heading";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { PortfolioCard } from "@/components/portfolio-showcase";
import { SiteHeader } from "@/components/site-header";
import { getSubpage, menuSections } from "@/lib/menu-pages";
import { portfolio } from "@/lib/portfolio";
import { getPublishedHomepageReviews } from "@/lib/reviews.functions";
import { Star } from "lucide-react";

const section = menuSections.work;
const workTitles: Record<string, string> = {
  "case-studies": "Ecommerce and Business Website Case Studies",
  "client-stories": "Webgram Client Stories and Website Feedback",
};

export const Route = createFileRoute("/work/$slug")({
  loader: async ({ params }) => {
    const page = getSubpage("work", params.slug);
    if (!page) throw notFound();
    const reviews = ["case-studies", "client-stories"].includes(params.slug)
      ? await getPublishedHomepageReviews().catch(() => [])
      : [];
    return { page, reviews };
  },
  head: ({ loaderData, params }) => ({
    links: [{ rel: "canonical", href: `https://webgramitsolution.in/work/${params.slug}` }],
    meta: [
      {
        title: `${workTitles[params.slug] ?? loaderData?.page.title ?? "Work"} | Webgram IT Solution`,
      },
      { name: "description", content: loaderData?.page.description ?? "" },
      {
        property: "og:title",
        content: `${workTitles[params.slug] ?? loaderData?.page.title ?? "Work"} | Webgram IT Solution`,
      },
      { property: "og:description", content: loaderData?.page.description ?? "" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(params.slug === "case-studies"
        ? [
            { property: "og:image", content: SITE_URL + serviceHeroImage("case-studies") },
            { name: "twitter:image", content: SITE_URL + serviceHeroImage("case-studies") },
          ]
        : []),
    ],
    scripts:
      params.slug === "case-studies"
        ? [
            {
              type: "application/ld+json",
              children: JSON.stringify({
                "@context": "https://schema.org",
                "@type": "CollectionPage",
                name: "Web Development Case Studies | Webgram IT Solution",
                url: "https://webgramitsolution.in/work/case-studies",
                mainEntity: {
                  "@type": "ItemList",
                  itemListElement: portfolio.map((item, index) => ({
                    "@type": "ListItem",
                    position: index + 1,
                    url: item.url,
                    name: item.name,
                  })),
                },
              }),
            },
          ]
        : [],
  }),
  component: WorkPage,
});

function WorkPage() {
  const { page, reviews } = Route.useLoaderData();
  if (page.title === "Case Studies") {
    return (
      <div className="min-h-screen bg-background text-foreground">
        <SiteHeader />
        <main>
          <ServiceHero slug="case-studies">
            <div className="ecom-shell relative flex h-full items-center py-6">
              <div className="max-w-[500px]">
                <HeroHeading
                  className="page-title"
                  lines={["Ecommerce and Business", "Website Case Studies"]}
                  accent="text-[#f4c657]"
                />
                <p className="page-lead mt-3 max-w-[440px] text-on-dark/90">
                  Explore live client websites and see how each build serves its audience and
                  business needs.
                </p>
              </div>
            </div>
          </ServiceHero>
          <section className="py-10 md:py-14">
            <div className="header-shell grid gap-7">
              {portfolio.map((item) => (
                <PortfolioCard key={item.domain} item={item} />
              ))}
            </div>
          </section>
          {reviews.length > 0 ? (
            <section className="bg-sky-soft py-10 md:py-14" aria-labelledby="case-study-reviews">
              <div className="header-shell">
                <h2 id="case-study-reviews" className="text-[26px] leading-tight text-navy">
                  What our clients say
                </h2>
                <div className="mt-5 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {reviews.slice(0, 6).map((review) => (
                    <article
                      key={review.id}
                      className="rounded-lg border border-border bg-card p-5 shadow-card"
                    >
                      <div
                        className="flex gap-1 text-gold"
                        aria-label={`${review.rating} out of 5 stars`}
                      >
                        {Array.from({ length: review.rating }, (_, index) => (
                          <Star key={index} className="h-4 w-4 fill-current" />
                        ))}
                      </div>
                      <p className="mt-4 text-[15px] leading-7 text-foreground">
                        “{review.review_text}”
                      </p>
                      <div className="mt-5 border-t border-border pt-4">
                        <strong className="block text-[15px] text-navy">
                          {review.customer_name}
                        </strong>
                        <span className="text-[14px] text-muted-foreground">
                          {[review.customer_role, review.company_name].filter(Boolean).join(" · ")}
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </section>
          ) : null}
        </main>
      </div>
    );
  }
  return (
    <SubpageTemplate
      sectionLabel={section.label}
      page={page}
      heading="Client Stories and Website Feedback"
    >
      <section className="border-t border-border bg-sky-soft py-10">
        <div className="page-shell">
          <h2 className="text-2xl font-extrabold text-navy">
            {reviews.length ? "Feedback from clients" : "Explore the work behind the stories"}
          </h2>
          {reviews.length ? (
            <div className="mt-5 grid gap-4 md:grid-cols-3">
              {reviews.map((review) => (
                <figure key={review.id} className="rounded-xl border border-border bg-card p-5">
                  <blockquote className="leading-7">“{review.review_text}”</blockquote>
                  <figcaption className="mt-3 font-semibold text-navy">
                    {review.customer_name}
                    {review.company_name ? ` · ${review.company_name}` : ""}
                  </figcaption>
                </figure>
              ))}
            </div>
          ) : (
            <p className="mt-3 max-w-2xl leading-7 text-muted-foreground">
              See Houskase’s retail storefront, the staffing website for Regal Consulting Group in
              Canada and Adlite Electricals’ industrial product website.
            </p>
          )}
          <a
            href="/work/portfolio"
            className="mt-5 inline-block font-semibold text-primary hover:underline"
          >
            Browse the live client websites
          </a>
        </div>
      </section>
    </SubpageTemplate>
  );
}
