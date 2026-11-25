import { createFileRoute, notFound, redirect } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { getSubpage, menuSections } from "@/lib/menu-pages";

const section = menuSections.resources;

export const Route = createFileRoute("/resources/$slug")({
  loader: ({ params, location }) => {
    if (params.slug === "blog")
      throw redirect({ href: `/blog${location.searchStr}`, statusCode: 301 });
    const page = getSubpage("resources", params.slug);
    if (!page) throw notFound();
    return page;
  },
  head: ({ loaderData, params }) => ({
    links: [{ rel: "canonical", href: `https://webgramitsolution.in/resources/${params.slug}` }],
    meta: [
      ...(params.slug === "insights" ? [{ name: "robots", content: "noindex, follow" }] : []),
      { title: `${loaderData?.title ?? "Resources"} | Webgram IT Solution` },
      { name: "description", content: loaderData?.description ?? "" },
      {
        property: "og:title",
        content: `${loaderData?.title ?? "Resources"} | Webgram IT Solution`,
      },
      { property: "og:description", content: loaderData?.description ?? "" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://webgramitsolution.in/resources/${params.slug}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const page = Route.useLoaderData();
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
