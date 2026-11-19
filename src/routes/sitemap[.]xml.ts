import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

import { SITE_URL } from "@/lib/site-identity";
import { locations } from "@/lib/locations";
import { menuSections } from "@/lib/menu-pages";

const STATIC_PATHS = [
  "/", "/about", "/contact", "/locations",
  ...locations.map(({ slug }) => `/locations/${slug}`),
  ...Object.values(menuSections).flatMap(({ base, pages }) =>
    Object.keys(pages)
      .filter((slug) => slug !== "marketplace-development" && slug !== "insights")
      .map((slug) => `${base}/${slug}`),
  ),
];
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const url = process.env["SUPABASE_URL"] ?? import.meta.env["VITE_SUPABASE_URL"];
        const key = process.env["SUPABASE_PUBLISHABLE_KEY"] ?? import.meta.env["VITE_SUPABASE_PUBLISHABLE_KEY"];
        if (!url || !key) return new Response("Sitemap unavailable", { status: 503 });
        const client = createClient<Database>(url, key, { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } });
        const publishedBefore = new Date().toISOString();
        const posts: { slug: string; published_at: string | null }[] = [];
        for (let from = 0; ; from += 1000) {
          const { data, error } = await client.from("blog_posts").select("slug,published_at").eq("status", "published").eq("noindex", false).lte("published_at", publishedBefore).order("published_at", { ascending: false }).order("slug").range(from, from + 999);
          if (error) return new Response("Sitemap unavailable", { status: 503 });
          posts.push(...(data ?? []));
          if (!data || data.length < 1000) break;
        }
        const { data: categories, error: categoryError } = await client.from("blog_categories").select("slug").eq("is_active", true).is("parent_id", null).order("display_order");
        if (categoryError) return new Response("Sitemap unavailable", { status: 503 });
        const urls = [
          ...STATIC_PATHS.map((p) => `<url><loc>${SITE_URL}${p}</loc></url>`),
          ...(categories ?? []).map((category) => `<url><loc>${SITE_URL}/blog/category/${esc(encodeURIComponent(category.slug))}</loc></url>`),
          ...posts.map((p) => `<url><loc>${SITE_URL}/blog/${esc(encodeURIComponent(p.slug))}</loc>${p.published_at ? `<lastmod>${p.published_at.slice(0, 10)}</lastmod>` : ""}</url>`),
        ];
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
      },
    },
  },
});
