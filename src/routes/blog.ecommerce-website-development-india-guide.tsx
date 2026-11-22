import { editorialAuthor, editorialPosts } from "@/lib/editorial-posts";
import { createFileRoute } from "@tanstack/react-router";
import { BlogDetailPage } from "@/components/blog-detail-page";
import { getPublicBlog } from "@/lib/blog.functions";
import { ecommerceBuyerGuide as guide } from "@/lib/ecommerce-buyer-guide";
import { BUSINESS_ID, SITE_URL, publicPageSchema } from "@/lib/site-identity";

const url = SITE_URL + guide.path;
const image = SITE_URL + guide.image;

export const Route = createFileRoute("/blog/ecommerce-website-development-india-guide")({
  loader: () => getPublicBlog().catch(() => ({ categories: [], posts: [] })),
  head: () => ({
    links: [{ rel: "canonical", href: url }],
    meta: [
      { title: "Ecommerce Website Development in India | 10-Step Guide" },
      { name: "description", content: guide.description },
      { property: "og:type", content: "article" },
      { property: "og:title", content: guide.title },
      { property: "og:description", content: guide.description },
      { property: "og:url", content: url },
      { property: "og:image", content: image },
      { property: "og:image:alt", content: guide.imageAlt },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    scripts: [...publicPageSchema(guide.path, guide.title, guide.description), {
      type: "application/ld+json",
      children: JSON.stringify({
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "@id": url + "#article",
        headline: guide.title,
        description: guide.description,
        mainEntityOfPage: url,
        image,
        inLanguage: "en-IN",
        author: { "@type": "Organization", "@id": SITE_URL + editorialAuthor.path + "#author", name: editorialAuthor.name, url: SITE_URL + editorialAuthor.path },
        publisher: { "@id": BUSINESS_ID },
      }),
    }],
  }),
  component: BuyerGuidePage,
});

function BuyerGuidePage() {
  const { categories } = Route.useLoaderData();
  return <BlogDetailPage categories={categories} trackViews={false} post={{
    id: guide.slug, slug: guide.slug, title: guide.title, excerpt: guide.description,
    content: seriesContent, featured_image: guide.image, featured_image_alt: guide.imageAlt,
    author_name: editorialAuthor.name, authorPath: editorialAuthor.path, published_at: null, tags: [], faqs: [], view_count: 0,
    category: null, subcategory: null, related: [],
  }} />;
}

const seriesContent = [
  "These 10 articles help Indian business owners plan a budget, choose a platform, prepare for launch and run their store. Start with platform selection or jump to the decision you need to make today.",
  [":::gallery-four", ["shopify", "woocommerce", "wholesale", "retail"].map((image) => `![${image} design example](/images/ecommerce-guide/${image}.webp)`).join("\n---\n"), ":::"].join("\n"),
  ...editorialPosts.flatMap((post) => [`## [${post.title}](/blog/${post.slug})`, post.excerpt]),
].join("\n\n");
