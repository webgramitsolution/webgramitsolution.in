import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/integrations/supabase/types";

const BASE = "https://webgramitsolution.in";
const esc = (s: string) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const Route = createFileRoute("/feed.xml")({
  server: {
    handlers: {
      GET: async () => {
        const client = createClient<Database>(process.env["SUPABASE_URL"]!, process.env["SUPABASE_PUBLISHABLE_KEY"]!, { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } });
        const { data, error } = await client.from("blog_posts").select("slug,title,excerpt,published_at").eq("status", "published").eq("noindex", false).lte("published_at", new Date().toISOString()).order("published_at", { ascending: false }).limit(50);
        if (error) return new Response("Feed unavailable", { status: 500 });
        const items = (data ?? []).map((p) => `<item><title>${esc(p.title ?? "")}</title><link>${BASE}/blog/${esc(p.slug)}</link><guid isPermaLink="true">${BASE}/blog/${esc(p.slug)}</guid>${p.published_at ? `<pubDate>${new Date(p.published_at).toUTCString()}</pubDate>` : ""}<description>${esc(p.excerpt ?? "")}</description></item>`).join("\n");
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>Webgram IT Solution Blog</title><link>${BASE}/resources/blog</link><atom:link href="${BASE}/feed.xml" rel="self" type="application/rss+xml"/><description>Latest articles from Webgram IT Solution</description><language>en-in</language>\n${items}\n</channel></rss>`;
        return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, max-age=1800" } });
      },
    },
  },
});
