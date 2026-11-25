import { createFileRoute } from "@tanstack/react-router";
import { HeroHeading } from "@/components/hero-heading";
import { SiteHeader } from "@/components/site-header";
import { editorialAuthor as author, editorialPosts } from "@/lib/editorial-posts";
import { BUSINESS_ID, SITE_URL } from "@/lib/site-identity";

const url = SITE_URL + author.path;
const title = "Webgram IT Solution Editorial Team | Author Profile";

export const Route = createFileRoute("/authors/webgram-editorial-team")({
  head: () => ({
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title },
      { name: "description", content: author.description },
      { property: "og:title", content: title },
      { property: "og:description", content: author.description },
      { property: "og:url", content: url },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "ProfilePage",
          "@id": url,
          mainEntity: {
            "@type": "Organization",
            "@id": url + "#author",
            name: author.name,
            url,
            description: author.description,
            parentOrganization: { "@id": BUSINESS_ID },
          },
        }),
      },
    ],
  }),
  component: AuthorPage,
});

function AuthorPage() {
  return (
    <>
      <SiteHeader />
      <main>
        <header className="bg-navy py-10 text-on-dark">
          <div className="page-shell">
            <HeroHeading
              className="max-w-xl text-3xl md:text-4xl"
              lines={["Webgram IT Solution", "Editorial Team"]}
            />
            <p className="mt-3 max-w-2xl leading-7 text-on-dark/85">{author.description}</p>
          </div>
        </header>
        <div className="page-shell py-8">
          <p className="max-w-3xl leading-7 text-muted-foreground">
            Our guides are written for business owners and teams evaluating an agency, launching a
            store or planning ongoing support. We use concrete project scenarios and link to
            official platform documentation where it applies.{" "}
            <a href="/about-us" className="text-primary underline">
              About Webgram IT Solution
            </a>{" "}
            ·{" "}
            <a href="/contact" className="text-primary underline">
              Send a correction or comment
            </a>
          </p>
          <h2 className="mt-8 text-2xl text-navy">Articles by the editorial team</h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {editorialPosts.map((post) => (
              <article key={post.slug} className="rounded-lg border border-border bg-card p-4">
                <h3 className="text-lg text-navy">
                  <a href={`/blog/${post.slug}`} className="hover:underline">
                    {post.title}
                  </a>
                </h3>
                <p className="mt-2 text-sm leading-6 text-muted-foreground">{post.excerpt}</p>
              </article>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
