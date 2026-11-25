import { createFileRoute } from "@tanstack/react-router";
import { HeroHeading } from "@/components/hero-heading";
import { ServiceHero, serviceHeroImage } from "@/components/service-hero";
import { SiteHeader } from "@/components/site-header";
import { editorialAuthor as author, editorialPosts } from "@/lib/editorial-posts";
import { BUSINESS_ID, SITE_URL } from "@/lib/site-identity";

const url = SITE_URL + author.path;
const title = "Webgram IT Solution Editorial Team | Author Profile";
const heroImage = SITE_URL + serviceHeroImage("editorial-team");

export const Route = createFileRoute("/authors/webgram-editorial-team")({
  head: () => ({
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title },
      { name: "description", content: author.description },
      { property: "og:title", content: title },
      { property: "og:description", content: author.description },
      { property: "og:url", content: url },
      { property: "og:image", content: heroImage },
      { name: "twitter:image", content: heroImage },
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
        <ServiceHero slug="editorial-team">
          <div className="ecom-shell relative flex h-full items-center py-6">
            <div className="max-w-[500px]">
              <HeroHeading
                className="text-3xl leading-tight md:text-4xl"
                lines={["Webgram IT Solution", "Editorial Team"]}
                accent="text-[#f4c657]"
              />
              <p className="mt-3 max-w-[440px] leading-7 text-on-dark/90">{author.description}</p>
            </div>
          </div>
        </ServiceHero>
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
