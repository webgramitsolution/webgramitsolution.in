import { DirectAnswer } from "@/components/direct-answer";
import { HeroHeading } from "@/components/hero-heading";
import { ServiceHero, serviceHeroImage } from "@/components/service-hero";
import { SiteHeader } from "@/components/site-header";
import { ServicePlanning } from "@/components/service-planning";
import { servicePlans } from "@/lib/service-planning";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { B2BCommercePage } from "@/components/b2b-commerce-page";
import { EcommerceDevelopmentPage } from "@/components/ecommerce-development-page";
import { WebsiteDesignDevelopmentPage } from "@/components/website-design-development-page";
import { getSubpage, menuSections } from "@/lib/menu-pages";
import { servicePageSchema } from "@/lib/schema";
import { NotFoundPage } from "@/components/not-found-page";

const section = menuSections.solutions;
const search = {
  "ecommerce-development": {
    plan: servicePlans.ecommerce,
    title: "D2C & B2C Ecommerce Store Development in India | Webgram",
  },
  "b2b-commerce": {
    plan: servicePlans.b2b,
    title: "B2B Ecommerce & Dealer Ordering Portal Development | Webgram",
  },
  "website-design-development": {
    plan: servicePlans.development,
    title: "Website Development Company in Delhi NCR | Webgram",
  },
  "marketplace-development": {
    plan: servicePlans.marketplace,
    title: "B2B Marketplace Website Development in India | Webgram",
  },
} as const;
const seo = (slug: string) =>
  Object.hasOwn(search, slug) ? search[slug as keyof typeof search] : undefined;

export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const page = getSubpage("solutions", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const content = seo(params.slug);
    const title = content?.title ?? `${loaderData.title} | Webgram IT Solution`;
    const description = content?.plan.summary ?? loaderData.description;
    const url = `https://webgramitsolution.in/solutions/${params.slug}`;
    const heroPath = serviceHeroImage(params.slug);
    const image = heroPath ? new URL(heroPath, url).href : content?.plan.image;
    return {
      links: [{ rel: "canonical", href: url }],
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: url },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      scripts: servicePageSchema("solutions", "Solutions", params.slug, {
        ...loaderData,
        description,
      }),
    };
  },
  component: SolutionsPage,
  notFoundComponent: NotFoundPage,
  errorComponent: () => <NotFoundPage />,
});

function SolutionsPage() {
  const page = Route.useLoaderData();
  const { slug } = Route.useParams();
  if (slug === "ecommerce-development")
    return (
      <>
        <EcommerceDevelopmentPage />
        <ServicePlanning plan={servicePlans.ecommerce} />
      </>
    );
  if (slug === "b2b-commerce")
    return (
      <>
        <B2BCommercePage />
        <ServicePlanning plan={servicePlans.b2b} />
      </>
    );
  if (slug === "website-design-development")
    return (
      <>
        <WebsiteDesignDevelopmentPage />
        <ServicePlanning plan={servicePlans.development} />
      </>
    );
  if (slug === "marketplace-development") {
    return (
      <>
        <SiteHeader />
        <main>
          <ServiceHero slug="marketplace-development">
            <div className="ecom-shell relative flex h-full items-center py-5">
              <div className="max-w-[540px]">
                <HeroHeading
                  className="page-title"
                  lines={["B2B Marketplace", "Website Development"]}
                  accent="text-gold"
                />
                <p className="mt-3 max-w-[470px] text-sm leading-relaxed text-on-dark/90">
                  {page.description}
                </p>
                <Link
                  to="/contact"
                  className="mt-4 inline-flex min-h-10 items-center rounded-md bg-gold px-5 text-sm font-bold text-navy hover:bg-gold/90"
                >
                  Get a Marketplace Quote
                </Link>
              </div>
            </div>
          </ServiceHero>
          <DirectAnswer
            id="marketplace-vs-portal"
            question="Do I need a marketplace or a B2B ordering portal?"
            answer="A marketplace is for several sellers that manage their own listings and fulfil orders under shared rules. A B2B ordering portal is for one supplier selling to approved business buyers. If you run a marketplace, decide who receives payments, handles returns and pays out sellers before building checkout."
          >
            <Link to="/solutions/$slug" params={{ slug: "b2b-commerce" }}>
              Explore B2B ordering portals
            </Link>
          </DirectAnswer>
          <ServicePlanning plan={servicePlans.marketplace} />
        </main>
      </>
    );
  }
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
