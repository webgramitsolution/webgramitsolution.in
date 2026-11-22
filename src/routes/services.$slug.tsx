import { serviceHeroImage } from "@/components/service-hero";
import { ServicePlanning } from "@/components/service-planning";
import { servicePlans } from "@/lib/service-planning";
import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { ApiIntegrationPage } from "@/components/api-integration-page";
import { WebPortalDevelopmentPage } from "@/components/web-portal-development-page";
import { WebsiteMaintenancePage } from "@/components/website-maintenance-page";
import { WebsiteDesignDevelopmentPage } from "@/components/website-design-development-page";
import { WooCommercePage } from "@/components/woocommerce-page";
import { SubpageTemplate } from "@/components/subpage";
import { LatestBlogPosts } from "@/components/latest-blog-posts";
import { getSubpage, menuSections } from "@/lib/menu-pages";
import { servicePageSchema } from "@/lib/schema";
import { NotFoundPage } from "@/components/not-found-page";

const section = menuSections.services;

const seoTitles: Record<string, string> = {
  woocommerce: "WooCommerce Development Company in Delhi NCR | Webgram IT Solution",
  "web-portal-development": "Custom Web Portal Development in India | Webgram",
  "wordpress": "WordPress Website Development in India | Webgram",
  "api-integration": "API Integration Services in India | Webgram",
  "website-maintenance": "Website Maintenance Services in Delhi NCR | Webgram",
};
export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    // Keep the pre-rename URL working: /services/website-development → Web Portal Development.
    if (params.slug === "website-development") throw redirect({ href: "/services/web-portal-development", replace: true });
    const page = getSubpage("services", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) => {
    const heroPath = serviceHeroImage(params.slug);
    const image = heroPath && new URL(heroPath, "https://webgramitsolution.in").href;
    return {
      links: [{ rel: "canonical", href: `https://webgramitsolution.in/services/${params.slug}` }],
      meta: [
        { title: (seoTitles[params.slug] ?? `${loaderData?.title ?? "Services"} | Webgram IT Solution`) },
        { name: "description", content: params.slug === "woocommerce" ? servicePlans.woocommerce.summary : loaderData?.description ?? "" },
        { property: "og:title", content: (seoTitles[params.slug] ?? `${loaderData?.title ?? "Services"} | Webgram IT Solution`) },
        { property: "og:description", content: params.slug === "woocommerce" ? servicePlans.woocommerce.summary : loaderData?.description ?? "" },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `https://webgramitsolution.in/services/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
      scripts: servicePageSchema("services", "Services", params.slug, loaderData),
    };
  },
  component: ServicesPage,
  notFoundComponent: NotFoundPage,
  errorComponent: () => <NotFoundPage />,
});

function ServicesPage() {
  const page = Route.useLoaderData();
  const { slug } = Route.useParams();
  const body =
    slug === "web-portal-development" ? <WebPortalDevelopmentPage /> :
    slug === "website-design" ? <WebsiteDesignDevelopmentPage /> :
    slug === "woocommerce" ? <WooCommercePage /> :
    slug === "api-integration" ? <ApiIntegrationPage /> :
    slug === "website-maintenance" ? <WebsiteMaintenancePage /> :
    <SubpageTemplate sectionLabel={section.label} page={page} heroSlug={slug === "wordpress" ? "wordpress" : undefined} />;
  const showLatestPosts = slug !== "web-portal-development" && slug !== "website-maintenance";
  return <>{body}{slug === "woocommerce" ? <ServicePlanning plan={servicePlans.woocommerce} storefront /> : null}{showLatestPosts ? <LatestBlogPosts /> : null}</>;
}
