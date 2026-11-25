import { createFileRoute, notFound } from "@tanstack/react-router";

import { BlogPage } from "@/components/blog-page";
import { getPublicBlog, getPublicBlogCategory } from "@/lib/blog.functions";

const SITE = "https://webgramitsolution.in";

export const Route = createFileRoute("/blog/category/$slug")({
  loader: async ({ params }) => {
    const [categoryData, blog] = await Promise.all([
      getPublicBlogCategory({ data: { slug: params.slug } }),
      getPublicBlog(),
    ]);
    if (!categoryData) throw notFound();
    return { ...categoryData, categories: blog.categories };
  },
  head: ({ loaderData, params }) => {
    const title = loaderData
      ? `${loaderData.category.name} Articles | Webgram Blog`
      : "Blog Category | Webgram";
    const description =
      loaderData?.category.description ||
      `Read practical ${loaderData?.category.name ?? "digital business"} guides and insights from Webgram IT Solution.`;
    const image = loaderData?.posts[0]?.featured_image;
    return {
      links: [{ rel: "canonical", href: `${SITE}/blog/category/${params.slug}` }],
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:type", content: "website" },
        { property: "og:url", content: `${SITE}/blog/category/${params.slug}` },
        { name: "twitter:card", content: "summary_large_image" },
        { name: "robots", content: "index,follow,max-image-preview:large" },
        ...(image
          ? [
              { property: "og:image", content: image },
              { name: "twitter:image", content: image },
            ]
          : []),
      ],
    };
  },
  component: CategoryPage,
});

function CategoryPage() {
  const data = Route.useLoaderData();
  return (
    <BlogPage categories={data.categories} posts={data.posts} initialCategory={data.category.id} />
  );
}
