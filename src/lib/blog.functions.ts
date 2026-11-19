import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

import { requireAdmin } from "./admin-auth.functions";
import type { Database } from "@/integrations/supabase/types";

type Tables = Database["public"]["Tables"];
type Post = Tables["blog_posts"]["Row"];
type Category = Tables["blog_categories"]["Row"];
type PostCard = Pick<Post, "id" | "title" | "slug" | "excerpt" | "featured_image" | "featured_image_alt" | "published_at">;
type PostListItem = PostCard & Pick<Post, "category_id" | "subcategory_id" | "tags" | "author_name">;

const slugSchema = z.string().trim().min(1).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
const cardColumns = "id,title,slug,excerpt,featured_image,featured_image_alt,published_at";
const listColumns = `${cardColumns},category_id,subcategory_id,tags,author_name`;
const published = "status = 'published' AND published_at <= UTC_TIMESTAMP(3)";

export const getPublicBlog = createServerFn({ method: "GET" }).handler(async () => {
  const { rows } = await import("./mysql.server");
  const [categories, posts] = await Promise.all([
    rows<Category>("SELECT id,name,slug,description,display_order,parent_id FROM blog_categories WHERE is_active = TRUE ORDER BY display_order"),
    rows<PostListItem>(`SELECT ${listColumns} FROM blog_posts WHERE ${published} ORDER BY published_at DESC, slug`),
  ]);
  return { categories, posts };
});

export const getPublicBlogPost = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: slugSchema }).parse(input))
  .handler(async ({ data }) => {
    const { rows } = await import("./mysql.server");
    const [post] = await rows<Pick<Post, "id" | "title" | "slug" | "excerpt" | "content" | "featured_image" | "featured_image_alt" | "author_name" | "published_at" | "updated_at" | "seo_title" | "seo_description" | "category_id" | "subcategory_id" | "tags" | "faqs" | "noindex" | "view_count">>(
      `SELECT ${listColumns},content,updated_at,seo_title,seo_description,faqs,noindex,view_count FROM blog_posts WHERE slug = ? AND ${published}`,
      [data.slug],
    );
    if (!post) return null;
    const categoryById = async (id: string | null) => id
      ? (await rows<Pick<Category, "name" | "slug">>("SELECT name,slug FROM blog_categories WHERE id = ?", [id]))[0] ?? null
      : null;
    const [category, subcategory, related] = await Promise.all([
      categoryById(post.category_id),
      categoryById(post.subcategory_id),
      rows<PostCard>(`SELECT ${cardColumns} FROM blog_posts WHERE id <> ? AND ${published} ORDER BY published_at DESC, slug LIMIT 3`, [post.id]),
    ]);
    return { ...post, category, subcategory, related };
  });

export const getPublicBlogCategory = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: slugSchema }).parse(input))
  .handler(async ({ data }) => {
    const { rows } = await import("./mysql.server");
    const [category] = await rows<Pick<Category, "id" | "name" | "slug" | "description" | "parent_id">>(
      "SELECT id,name,slug,description,parent_id FROM blog_categories WHERE slug = ? AND is_active = TRUE AND parent_id IS NULL", [data.slug],
    );
    if (!category) return null;
    const [children, posts] = await Promise.all([
      rows<Pick<Category, "id" | "name" | "slug" | "parent_id">>("SELECT id,name,slug,parent_id FROM blog_categories WHERE parent_id = ? AND is_active = TRUE ORDER BY display_order", [category.id]),
      rows<PostListItem>(`SELECT ${listColumns} FROM blog_posts WHERE category_id = ? AND ${published} AND noindex = FALSE ORDER BY published_at DESC, slug`, [category.id]),
    ]);
    return { category, children, posts };
  });

export const getLatestBlogPosts = createServerFn({ method: "GET" }).handler(async () => {
  const { rows } = await import("./mysql.server");
  return rows<PostCard>(`SELECT ${cardColumns} FROM blog_posts WHERE ${published} ORDER BY published_at DESC, slug LIMIT 3`);
});

export const getBlogComments = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ postId: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { rows } = await import("./mysql.server");
    return rows<Pick<Tables["blog_comments"]["Row"], "id" | "author_name" | "body" | "created_at">>(
      "SELECT c.id,c.author_name,c.body,c.created_at FROM blog_comments c JOIN blog_posts p ON p.id = c.post_id WHERE p.id = ? AND p.status = 'published' AND p.published_at <= UTC_TIMESTAMP(3) ORDER BY c.created_at",
      [data.postId],
    );
  });

export const incrementBlogView = createServerFn({ method: "POST" })
  .inputValidator((input: unknown) => z.object({ slug: slugSchema }).parse(input))
  .handler(async ({ data }) => {
    const { write } = await import("./mysql.server");
    await write(`UPDATE blog_posts SET view_count = view_count + 1 WHERE slug = ? AND ${published}`, [data.slug]);
  });

export const getAdminBlog = createServerFn({ method: "GET" })
  .middleware([requireAdmin])
  .handler(async ({ context }) => {
    const { rows } = await import("./mysql.server");
    const [posts, categories, [profile]] = await Promise.all([
      rows<Post>("SELECT * FROM blog_posts ORDER BY updated_at DESC"),
      rows<Category>("SELECT id,name,slug,description,display_order,parent_id,is_active,created_at FROM blog_categories ORDER BY display_order"),
      rows<Pick<Tables["profiles"]["Row"], "display_name" | "avatar_url">>("SELECT display_name,avatar_url FROM profiles WHERE id = ?", [context.userId]),
    ]);
    return { posts, categories, profile: profile ?? null };
  });

const postInput = z.object({
  id: z.string().uuid().optional(),
  title: z.string().trim().min(3).max(180),
  slug: slugSchema,
  excerpt: z.string().trim().min(10).max(500),
  content: z.string().trim().min(20).max(50000),
  featuredImage: z.string().trim().url().max(2000).or(z.literal("")),
  featuredImageAlt: z.string().trim().max(240),
  categoryId: z.string().uuid().nullable(),
  subcategoryId: z.string().uuid().nullable(),
  tags: z.array(z.string().trim().min(1).max(50)).max(10),
  faqs: z.array(z.object({ question: z.string().trim().min(5).max(300), answer: z.string().trim().min(5).max(2000) })).max(20),
  noindex: z.boolean(),
  authorName: z.string().trim().min(2).max(100),
  status: z.enum(["draft", "published"]),
  seoTitle: z.string().trim().max(180),
  seoDescription: z.string().trim().max(320),
});

export const saveBlogPost = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((input: unknown) => postInput.parse(input))
  .handler(async ({ context, data }) => {
    if (data.featuredImage && data.featuredImageAlt.length < 5) throw new Error("Add a meaningful image description for search and accessibility.");
    const record = {
      title: data.title,
      slug: data.slug,
      excerpt: data.excerpt,
      content: data.content,
      featured_image: data.featuredImage || null,
      featured_image_alt: data.featuredImageAlt,
      category_id: data.categoryId,
      subcategory_id: data.subcategoryId,
      tags: JSON.stringify(data.tags),
      faqs: JSON.stringify(data.faqs),
      noindex: data.noindex,
      author_name: data.authorName,
      status: data.status,
      seo_title: data.seoTitle || null,
      seo_description: data.seoDescription || null,
      updated_at: new Date(),
      published_at: data.status === "published" ? new Date() : null,
    };
    const { saveRecord } = await import("./mysql.server");
    const id = data.id ?? crypto.randomUUID();
    const result = await saveRecord("blog_posts", id, data.id ? record : { ...record, author_id: context.userId }, Boolean(data.id));
    if (!result.affectedRows) throw new Error("Article not found.");
    return { id, slug: data.slug };
  });

export const deleteBlogPost = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { write } = await import("./mysql.server");
    await write("DELETE FROM blog_posts WHERE id = ?", [data.id]);
    return { ok: true };
  });

const categoryInput = z.object({
  id: z.string().uuid().optional(),
  name: z.string().trim().min(2).max(120),
  slug: slugSchema,
  description: z.string().trim().max(500),
  displayOrder: z.number().int().min(0).max(10000),
  parentId: z.string().uuid().nullable(),
  isActive: z.boolean(),
});

export const saveBlogCategory = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((input: unknown) => categoryInput.parse(input))
  .handler(async ({ data }) => {
    const { rows, saveRecord } = await import("./mysql.server");
    if (data.parentId) {
      const [parent] = await rows<Pick<Category, "id" | "parent_id">>("SELECT id,parent_id FROM blog_categories WHERE id = ?", [data.parentId]);
      if (!parent || parent.id === data.id || parent.parent_id) throw new Error("Select a primary category.");
      if (data.id && (await rows("SELECT id FROM blog_categories WHERE parent_id = ? LIMIT 1", [data.id])).length) {
        throw new Error("Move this category's subcategories before changing its parent.");
      }
    }
    const id = data.id ?? crypto.randomUUID();
    const result = await saveRecord("blog_categories", id, {
      name: data.name, slug: data.slug, description: data.description, display_order: data.displayOrder, parent_id: data.parentId, parent_scope: data.parentId ?? "", is_active: data.isActive,
    }, Boolean(data.id));
    if (!result.affectedRows) throw new Error("Category not found.");
    return { id };
  });

export const deleteBlogCategory = createServerFn({ method: "POST" })
  .middleware([requireAdmin])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ data }) => {
    const { write } = await import("./mysql.server");
    await write("DELETE FROM blog_categories WHERE id = ?", [data.id]);
    return { ok: true };
  });
