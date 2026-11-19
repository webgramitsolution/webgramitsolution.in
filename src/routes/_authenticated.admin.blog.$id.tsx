import { createFileRoute, notFound } from "@tanstack/react-router";
import { AdminBlogEditor } from "@/components/admin-blog";
import { getAdminBlog } from "@/lib/blog.functions";

export const Route = createFileRoute("/_authenticated/admin/blog/$id")({
  loader: () => getAdminBlog(),
  head: () => ({ meta: [
    { title: "Edit Article | Webgram IT Solution" }, { name: "description", content: "Edit a Webgram blog article." },
    { property: "og:title", content: "Edit Article | Webgram IT Solution" }, { property: "og:description", content: "Edit a Webgram blog article." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary" }, { name: "robots", content: "noindex" },
  ] }),
  component: Page,
});
function Page() { const data = Route.useLoaderData(); const { id } = Route.useParams(); const post = data.posts.find((item) => item.id === id); if (!post) throw notFound(); return <AdminBlogEditor post={post} categories={data.categories} name={data.profile?.display_name} />; }
