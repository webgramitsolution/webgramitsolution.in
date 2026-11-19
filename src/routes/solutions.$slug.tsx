import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { B2BCommercePage } from "@/components/b2b-commerce-page";
import { EcommerceDevelopmentPage } from "@/components/ecommerce-development-page";
import { WebsiteDesignDevelopmentPage } from "@/components/website-design-development-page";
import { getSubpage, menuSections } from "@/lib/menu-pages";
import { servicePageSchema } from "@/lib/schema";
import { NotFoundPage } from "@/components/not-found-page";

const section = menuSections.solutions;
const websiteDesignBanner = "https://ik.imagekit.io/archfacingb2b/Modern%20E-Commerce%20Tech%20Hero%20Banner.png";

const seoTitles: Record<string, string> = {
  "b2b-commerce": "B2B Ecommerce Portal & Marketplace Development Company in India | Webgram",
  "ecommerce-development": "Custom Ecommerce Website Development in India | Webgram",
  "website-design-development": "Business Website Design & Development in India | Webgram",
};
export const Route = createFileRoute("/solutions/$slug")({
  loader: ({ params }) => {
    const page = getSubpage("solutions", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) => ({
    links: [{ rel: "canonical", href: `https://webgramitsolution.in/solutions/${params.slug}` }],
    meta: [
      { title: (seoTitles[params.slug] ?? `${loaderData?.title ?? "Solutions"} | Webgram IT Solution`) },
      { name: "description", content: loaderData?.description ?? "" },
      ...(params.slug === "marketplace-development" ? [{ name: "robots", content: "noindex, follow" }] : []),
      {
        property: "og:title",
        content: (seoTitles[params.slug] ?? `${loaderData?.title ?? "Solutions"} | Webgram IT Solution`),
      },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://webgramitsolution.in/solutions/${params.slug}` },
      { name: "twitter:card", content: "summary_large_image" },
       ...(params.slug === "b2b-commerce" || params.slug === "website-design-development"
        ? [
            {
              property: "og:image",
              content: params.slug === "website-design-development" ? websiteDesignBanner :
                "https://ik.imagekit.io/home1/About%20us%20page/B2B%20Ecommerce%20Development.png",
            },
            {
              name: "twitter:image",
              content: params.slug === "website-design-development" ? websiteDesignBanner :
                "https://ik.imagekit.io/home1/About%20us%20page/B2B%20Ecommerce%20Development.png",
            },
          ]
        : []),
    ],
    scripts: servicePageSchema("solutions", "Solutions", params.slug, loaderData),
  }),
  component: SolutionsPage,
  notFoundComponent: NotFoundPage,
  errorComponent: () => <NotFoundPage />,
});

function SolutionsPage() {
  const page = Route.useLoaderData();
  const { slug } = Route.useParams();
  if (slug === "ecommerce-development") return <EcommerceDevelopmentPage />;
  if (slug === "b2b-commerce") return <B2BCommercePage />;
  if (slug === "website-design-development") return <WebsiteDesignDevelopmentPage />;
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
