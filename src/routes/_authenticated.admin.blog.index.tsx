import { createFileRoute } from "@tanstack/react-router";
import { AdminBlogList } from "@/components/admin-blog";
import { getAdminBlog } from "@/lib/blog.functions";

export const Route = createFileRoute("/_authenticated/admin/blog/")({
  loader: () => getAdminBlog(),
  head: () => ({
    meta: [
      { title: "Blog Manager | Webgram IT Solution" },
      { name: "description", content: "Manage Webgram blog articles." },
      { property: "og:title", content: "Blog Manager | Webgram IT Solution" },
      { property: "og:description", content: "Manage Webgram blog articles." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: Page,
});
function Page() {
  const data = Route.useLoaderData();
  return (
    <AdminBlogList
      posts={data.posts}
      categories={data.categories}
      name={data.profile?.display_name}
    />
  );
}
