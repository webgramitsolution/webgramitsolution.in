import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { z } from "zod";

import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";
import type { Database } from "@/integrations/supabase/types";

const slugSchema = z.string().trim().min(1).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);

function publicClient() {
  const url = process.env["SUPABASE_URL"];
  const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
  if (!url || !key) throw new Error("Blog service is not configured.");
  return createClient<Database>(url, key, {
    auth: { storage: undefined, persistSession: false, autoRefreshToken: false },
  });
}

export const getPublicBlog = createServerFn({ method: "GET" }).handler(async () => {
  const client = publicClient();
  const [{ data: categories, error: categoryError }, { data: posts, error: postError }] =
    await Promise.all([
      client.from("blog_categories").select("id,name,slug,description,display_order,parent_id").eq("is_active", true).order("display_order"),
      client.from("blog_posts").select("id,title,slug,excerpt,featured_image,featured_image_alt,category_id,subcategory_id,tags,author_name,published_at").eq("status", "published").order("published_at", { ascending: false }),
    ]);
  if (categoryError || postError) throw categoryError ?? postError;
  return { categories: categories ?? [], posts: posts ?? [] };
});

export const getPublicBlogPost = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: slugSchema }).parse(input))
  .handler(async ({ data }) => {
    const client = publicClient();
    const { data: post, error } = await client
      .from("blog_posts")
      .select("id,title,slug,excerpt,content,featured_image,featured_image_alt,author_name,published_at,updated_at,seo_title,seo_description,category_id,subcategory_id,tags,faqs,noindex,view_count")
      .eq("slug", data.slug)
      .eq("status", "published")
      .maybeSingle();
    if (error) throw error;
    if (!post) return null;
    const { data: category } = post.category_id
      ? await client.from("blog_categories").select("name,slug").eq("id", post.category_id).maybeSingle()
      : { data: null };
    const { data: subcategory } = post.subcategory_id
      ? await client.from("blog_categories").select("name,slug").eq("id", post.subcategory_id).maybeSingle()
      : { data: null };
    const { data: related } = await client
      .from("blog_posts")
      .select("id,title,slug,excerpt,featured_image,featured_image_alt,published_at")
      .eq("status", "published")
      .neq("id", post.id)
      .order("published_at", { ascending: false })
      .limit(3);
    return { ...post, category, subcategory, related: related ?? [] };
  });

export const getPublicBlogCategory = createServerFn({ method: "GET" })
  .inputValidator((input: unknown) => z.object({ slug: slugSchema }).parse(input))
  .handler(async ({ data }) => {
    const client = publicClient();
    const { data: category, error: categoryError } = await client
      .from("blog_categories")
      .select("id,name,slug,description,parent_id")
      .eq("slug", data.slug)
      .eq("is_active", true)
      .is("parent_id", null)
      .maybeSingle();
    if (categoryError) throw categoryError;
    if (!category) return null;
    const [{ data: children, error: childError }, { data: posts, error: postError }] = await Promise.all([
      client.from("blog_categories").select("id,name,slug,parent_id").eq("parent_id", category.id).eq("is_active", true).order("display_order"),
      client.from("blog_posts").select("id,title,slug,excerpt,featured_image,featured_image_alt,category_id,subcategory_id,tags,author_name,published_at").eq("category_id", category.id).eq("status", "published").eq("noindex", false).lte("published_at", new Date().toISOString()).order("published_at", { ascending: false }),
    ]);
    if (childError || postError) throw childError ?? postError;
    return { category, children: children ?? [], posts: posts ?? [] };
  });

async function requireAdmin(context: { supabase: ReturnType<typeof publicClient>; userId: string }) {
  const { data, error } = await context.supabase.rpc("has_role", {
    _user_id: context.userId,
    _role: "admin",
  });
  if (error || !data) throw new Error("Administrator access required.");
}

export const getAdminBlog = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    await requireAdmin(context);
    const [{ data: posts, error: postError }, { data: categories, error: categoryError }, { data: profile }] =
      await Promise.all([
        context.supabase.from("blog_posts").select("*").order("updated_at", { ascending: false }),
        context.supabase.from("blog_categories").select("*").order("display_order"),
        context.supabase.from("profiles").select("display_name,avatar_url").eq("id", context.userId).maybeSingle(),
      ]);
    if (postError || categoryError) throw postError ?? categoryError;
    return { posts: posts ?? [], categories: categories ?? [], profile };
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
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => postInput.parse(input))
  .handler(async ({ context, data }) => {
    await requireAdmin(context);
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
      tags: data.tags,
      faqs: data.faqs,
      noindex: data.noindex,
      author_name: data.authorName,
      status: data.status,
      seo_title: data.seoTitle || null,
      seo_description: data.seoDescription || null,
      updated_at: new Date().toISOString(),
      published_at: data.status === "published" ? new Date().toISOString() : null,
    };
    if (data.id) {
      const { data: saved, error } = await context.supabase.from("blog_posts").update(record).eq("id", data.id).select("id,slug").single();
      if (error) throw error;
      return saved;
    }
    const { data: saved, error } = await context.supabase
      .from("blog_posts")
      .insert({ ...record, author_id: context.userId })
      .select("id,slug")
      .single();
    if (error) throw error;
    return saved;
  });

export const deleteBlogPost = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("blog_posts").delete().eq("id", data.id);
    if (error) throw error;
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
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => categoryInput.parse(input))
  .handler(async ({ context, data }) => {
    await requireAdmin(context);
    const record = { name: data.name, slug: data.slug, description: data.description, display_order: data.displayOrder, parent_id: data.parentId, is_active: data.isActive };
    const query = data.id ? context.supabase.from("blog_categories").update(record).eq("id", data.id) : context.supabase.from("blog_categories").insert(record);
    const { data: saved, error } = await query.select("id").single();
    if (error) throw error;
    return saved;
  });

export const deleteBlogCategory = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: unknown) => z.object({ id: z.string().uuid() }).parse(input))
  .handler(async ({ context, data }) => {
    await requireAdmin(context);
    const { error } = await context.supabase.from("blog_categories").delete().eq("id", data.id);
    if (error) throw error;
    return { ok: true };
  });
