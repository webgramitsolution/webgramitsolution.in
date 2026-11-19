import { createFileRoute } from "@tanstack/react-router";

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
        try {
          const { rows } = await import("@/lib/mysql.server");
          const [posts, categories] = await Promise.all([
            rows<{ slug: string; published_at: string }>("SELECT slug,published_at FROM blog_posts WHERE status = 'published' AND noindex = FALSE AND published_at <= UTC_TIMESTAMP(3) ORDER BY published_at DESC, slug"),
            rows<{ slug: string }>("SELECT slug FROM blog_categories WHERE is_active = TRUE AND parent_id IS NULL ORDER BY display_order"),
          ]);
          const urls = [
            ...STATIC_PATHS.map((p) => `<url><loc>${SITE_URL}${p}</loc></url>`),
            ...(categories ?? []).map((category) => `<url><loc>${SITE_URL}/blog/category/${esc(encodeURIComponent(category.slug))}</loc></url>`),
            ...posts.map((p) => `<url><loc>${SITE_URL}/blog/${esc(encodeURIComponent(p.slug))}</loc>${p.published_at ? `<lastmod>${p.published_at.slice(0, 10)}</lastmod>` : ""}</url>`),
          ];
          const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
          return new Response(xml, { headers: { "Content-Type": "application/xml; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
        } catch {
          return new Response("Sitemap unavailable", { status: 503 });
        }
      },
    },
  },
});
