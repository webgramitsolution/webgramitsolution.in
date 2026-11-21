import { SiteHeader } from "@/components/site-header";
import { ServicePlanning } from "@/components/service-planning";
import { servicePlans } from "@/lib/service-planning";
import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { B2BCommercePage } from "@/components/b2b-commerce-page";
import { EcommerceDevelopmentPage } from "@/components/ecommerce-development-page";
import { WebsiteDesignDevelopmentPage } from "@/components/website-design-development-page";
import { getSubpage, menuSections } from "@/lib/menu-pages";
import { servicePageSchema } from "@/lib/schema";
import { NotFoundPage } from "@/components/not-found-page";

const section = menuSections.solutions;
const search = {
  "ecommerce-development": { plan: servicePlans.ecommerce, title: "D2C & B2C Ecommerce Store Development in India | Webgram" },
  "b2b-commerce": { plan: servicePlans.b2b, title: "B2B Ecommerce & Dealer Ordering Portal Development | Webgram" },
  "website-design-development": { plan: servicePlans.development, title: "Website Development Company in Delhi NCR | Webgram" },
  "marketplace-development": { plan: servicePlans.marketplace, title: "B2B Marketplace Website Development in India | Webgram" },
} as const;
const seo = (slug: string) => Object.hasOwn(search, slug) ? search[slug as keyof typeof search] : undefined;

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
    const image = content?.plan.image;
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
        ...(image ? [{ property: "og:image", content: image }, { name: "twitter:image", content: image }] : []),
      ],
      scripts: servicePageSchema("solutions", "Solutions", params.slug, { ...loaderData, description }),
    };
  },
  component: SolutionsPage,
  notFoundComponent: NotFoundPage,
  errorComponent: () => <NotFoundPage />,
});

function SolutionsPage() {
  const page = Route.useLoaderData();
  const { slug } = Route.useParams();
  if (slug === "ecommerce-development") return <><EcommerceDevelopmentPage /><ServicePlanning plan={servicePlans.ecommerce} /></>;
  if (slug === "b2b-commerce") return <><B2BCommercePage /><ServicePlanning plan={servicePlans.b2b} /></>;
  if (slug === "website-design-development") return <><WebsiteDesignDevelopmentPage /><ServicePlanning plan={servicePlans.development} /></>;
  if (slug === "marketplace-development") return <><SiteHeader /><main><ServicePlanning plan={servicePlans.marketplace} headline /></main></>;
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
