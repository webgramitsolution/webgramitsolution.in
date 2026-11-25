import { createFileRoute } from "@tanstack/react-router";
import { SITE_URL } from "@/lib/site-identity";

const escape = (value: string) =>
  value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        try {
          const { getSitemapGroups } = await import("@/lib/sitemap.server");
          let maxAge = 300;
          const groups = await getSitemapGroups().catch((error) => {
            console.error("Could not load dynamic sitemap entries", error);
            maxAge = 30;
            return getSitemapGroups(false);
          });
          const urls = groups.flatMap(({ entries }) =>
            entries.map(
              ({ path, lastmod }) =>
                `  <url><loc>${escape(SITE_URL + path)}</loc>${lastmod ? `<lastmod>${lastmod}</lastmod>` : ""}</url>`,
            ),
          );
          const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>\n`;
          return new Response(xml, {
            headers: {
              "Content-Type": "application/xml; charset=utf-8",
              "Cache-Control": `public, max-age=${maxAge}`,
            },
          });
        } catch {
          return new Response("Sitemap unavailable", { status: 503 });
        }
      },
    },
  },
});
