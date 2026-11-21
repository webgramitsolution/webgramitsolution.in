import { HeroHeading } from "@/components/hero-heading";
import { createFileRoute } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { ArrowUpRight } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { SITE_URL } from "@/lib/site-identity";

const loadSitemap = createServerFn({ method: "GET" }).handler(async () => {
  const { getSitemapGroups } = await import("@/lib/sitemap.server");
  try {
    return await getSitemapGroups();
  } catch {
    return getSitemapGroups(false);
  }
});

export const Route = createFileRoute("/sitemap")({
  loader: () => loadSitemap(),
  head: () => ({
    links: [{ rel: "canonical", href: `${SITE_URL}/sitemap` }],
    meta: [
      { title: "Sitemap | Webgram IT Solution" },
      { name: "description", content: "Find Webgram IT Solution services, solutions, locations and resources." },
      { name: "robots", content: "noindex, follow" },
    ],
  }),
  component: Sitemap,
});

function Sitemap() {
  const groups = Route.useLoaderData();
  return (
    <>
      <SiteHeader />
      <main className="bg-background">
        <section className="bg-navy py-10 text-on-dark md:py-14">
          <div className="page-shell flex flex-wrap items-end justify-between gap-5">
            <div>
              <HeroHeading className="text-4xl font-extrabold" lines={["Website", "Sitemap"]} />
              <p className="mt-3 text-on-dark/80">Find our services, locations, resources and project examples.</p>
            </div>
            <a href="/sitemap.xml" className="inline-flex items-center gap-2 rounded-lg border border-on-dark/45 px-4 py-2 font-semibold hover:bg-on-dark/10">
              XML sitemap <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </section>
        <div className="page-shell grid gap-5 py-10 sm:grid-cols-2 lg:grid-cols-3">
          {groups.map(({ title, entries }) => (
            <section key={title} className="rounded-xl border border-border bg-card p-6 shadow-card">
              <h2 className="text-xl font-extrabold text-navy">{title}</h2>
              <ul className="mt-3 divide-y divide-border">
                {entries.map(({ path, label }) => (
                  <li key={path}><a href={path} className="block py-3 text-primary hover:underline">{label}</a></li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      </main>
    </>
  );
}
