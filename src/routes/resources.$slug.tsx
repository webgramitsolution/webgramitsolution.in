import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { BlogPage } from "@/components/blog-page";
import { getPublicBlog } from "@/lib/blog.functions";
import { getSubpage, menuSections } from "@/lib/menu-pages";

const section = menuSections.resources;

export const Route = createFileRoute("/resources/$slug")({
  loader: async ({ params }) => {
    const page = getSubpage("resources", params.slug);
    if (!page) throw notFound();
    if (params.slug === "blog") {
      // Keep the blog page visible (empty) when the backend is unreachable.
      const blog: Awaited<ReturnType<typeof getPublicBlog>> = await getPublicBlog().catch((error) => {
        console.error(error);
        return { categories: [], posts: [] };
      });
      return { page, blog };
    }
    return { page, blog: null };
  },
  head: ({ loaderData, params }) => params.slug === "blog" ? ({
    links: [{ rel: "canonical", href: "https://webgramitsolution.in/resources/blog" }],
    meta: [
      { title: "Blog — Ecommerce, Web Development & Growth Insights | Webgram" },
      { name: "description", content: "Practical guides on ecommerce, WooCommerce, Shopify, API integration, website maintenance and digital growth from the Webgram IT Solution team." },
      { property: "og:title", content: "Webgram Blog — Ecommerce & Web Development Insights" },
      { property: "og:description", content: "Practical guides on ecommerce, web development, integrations and business growth." },
      { property: "og:url", content: "https://webgramitsolution.in/resources/blog" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(loaderData?.blog?.posts[0]?.featured_image ? [{ property: "og:image", content: loaderData.blog.posts[0].featured_image }, { name: "twitter:image", content: loaderData.blog.posts[0].featured_image }] : []),
    ],
  }) : ({
    links: [{ rel: "canonical", href: `https://webgramitsolution.in/resources/${params.slug}` }],
    meta: [
      ...(params.slug === "insights" ? [{ name: "robots", content: "noindex, follow" }] : []),
      { title: `${loaderData?.page.title ?? "Resources"} | Webgram IT Solution` },
      { name: "description", content: loaderData?.page.description ?? "" },
      { property: "og:title", content: `${loaderData?.page.title ?? "Resources"} | Webgram IT Solution` },
      { property: "og:description", content: loaderData?.page.description ?? "" },
      { property: "og:type", content: "website" },
      { property: "og:url", content: `https://webgramitsolution.in/resources/${params.slug}` },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ResourcesPage,
});

function ResourcesPage() {
  const { page, blog } = Route.useLoaderData();
  if (blog) return <BlogPage categories={blog.categories} posts={blog.posts} />;
  return <SubpageTemplate sectionLabel={section.label} page={page} />;
}
