import { createFileRoute } from "@tanstack/react-router";
import { BlogPage } from "@/components/blog-page";
import { getPublicBlog } from "@/lib/blog.functions";

export const Route = createFileRoute("/blog/")({
  loader: () => getPublicBlog().catch((error) => {
    console.error(error);
    return { categories: [], posts: [] };
  }),
  head: ({ loaderData }) => ({
    links: [{ rel: "canonical", href: "https://webgramitsolution.in/blog" }],
    meta: [
      { title: "Blog — Ecommerce, Web Development & Growth Insights | Webgram" },
      { name: "description", content: "Practical guides on ecommerce, WooCommerce, Shopify, API integration, website maintenance and digital growth from the Webgram IT Solution team." },
      { property: "og:title", content: "Webgram Blog — Ecommerce & Web Development Insights" },
      { property: "og:description", content: "Practical guides on ecommerce, web development, integrations and business growth." },
      { property: "og:url", content: "https://webgramitsolution.in/blog" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(loaderData?.posts[0]?.featured_image ? [{ property: "og:image", content: loaderData.posts[0].featured_image }, { name: "twitter:image", content: loaderData.posts[0].featured_image }] : []),
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const { categories, posts } = Route.useLoaderData();
  return <BlogPage categories={categories} posts={posts} />;
}
