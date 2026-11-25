import { createFileRoute } from "@tanstack/react-router";
import { AdminBlogEditor } from "@/components/admin-blog";
import { getAdminBlog } from "@/lib/blog.functions";

export const Route = createFileRoute("/_authenticated/admin/blog/new")({
  loader: () => getAdminBlog(),
  head: () => ({
    meta: [
      { title: "New Article | Webgram IT Solution" },
      { name: "description", content: "Create a Webgram blog article." },
      { property: "og:title", content: "New Article | Webgram IT Solution" },
      { property: "og:description", content: "Create a Webgram blog article." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});
function Page() {
  const data = Route.useLoaderData();
  return <AdminBlogEditor categories={data.categories} name={data.profile?.display_name} />;
}
