import { createFileRoute } from "@tanstack/react-router";

const BASE = "https://webgramitsolution.in";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const Route = createFileRoute("/feed.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const { rows } = await import("@/lib/mysql.server");
          const data = await rows<{ slug: string; title: string; excerpt: string; published_at: string }>(
            "SELECT slug,title,excerpt,published_at FROM blog_posts WHERE status = 'published' AND noindex = FALSE AND published_at <= UTC_TIMESTAMP(3) ORDER BY published_at DESC, slug LIMIT 50",
          );
          const items = (data ?? []).map((p) => `<item><title>${esc(p.title ?? "")}</title><link>${BASE}/blog/${esc(p.slug)}</link><guid isPermaLink="true">${BASE}/blog/${esc(p.slug)}</guid>${p.published_at ? `<pubDate>${new Date(p.published_at).toUTCString()}</pubDate>` : ""}<description>${esc(p.excerpt ?? "")}</description></item>`).join("\n");
          const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Webgram IT Solution Blog</title><link>${BASE}/resources/blog</link><atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/><description>Latest articles from Webgram IT Solution</description><language>en-in</language>\n${items}\n</channel></rss>`;
          return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=1800" } });
        } catch {
          return new Response("Feed unavailable", { status: 503 });
        }
      },
    },
  },
});
