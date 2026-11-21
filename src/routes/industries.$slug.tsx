import { createFileRoute, notFound } from "@tanstack/react-router";

import { SubpageTemplate } from "@/components/subpage";
import { industryContent } from "@/lib/industry-content";
import { getSubpage } from "@/lib/menu-pages";
import { publicPageSchema, SITE_URL } from "@/lib/site-identity";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }) => {
    const page = getSubpage("industries", params.slug);
    const content = industryContent[params.slug as keyof typeof industryContent];
    if (!page || !content) throw notFound();
    return { page, content };
  },
  head: ({ loaderData, params }) => {
    if (!loaderData) return {};
    const path = `/industries/${params.slug}`;
    const { heading, description } = loaderData.content;
    const title = `${heading} | Webgram`;
    return {
      links: [{ rel: "canonical", href: `${SITE_URL}${path}` }],
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: `${SITE_URL}${path}` },
        { property: "og:type", content: "website" },
      ],
      scripts: publicPageSchema(path, title, description),
    };
  },
  component: IndustriesPage,
});

function IndustriesPage() {
  const { page, content } = Route.useLoaderData();
  return (
    <SubpageTemplate sectionLabel="Industries" page={{ ...page, description: content.description }} heading={content.heading}>
      <section className="border-t border-border bg-sky-soft py-10">
        <div className="page-shell">
          <div className="grid gap-5 md:grid-cols-2">
            {content.sections.map(([title, copy]) => (
              <article key={title} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h2 className="text-xl font-extrabold text-navy">{title}</h2>
                <p className="mt-3 leading-7 text-muted-foreground">{copy}</p>
              </article>
            ))}
          </div>
          <a href={content.next.href} className="mt-6 inline-block font-semibold text-primary hover:underline">{content.next.label}</a>
        </div>
      </section>
    </SubpageTemplate>
  );
}
