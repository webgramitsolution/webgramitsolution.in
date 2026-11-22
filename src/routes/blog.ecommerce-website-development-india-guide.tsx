import { blogFaqSchema } from "@/lib/blog-faqs";
import { blogWordCount } from "@/lib/blog-word-count";
import { editorialAuthor, editorialPosts } from "@/lib/editorial-posts";
import { createFileRoute } from "@tanstack/react-router";
import { BlogDetailPage } from "@/components/blog-detail-page";
import { getPublicBlog } from "@/lib/blog.functions";
import { ecommerceBuyerGuide as guide, ecommerceBuyerGuideContent } from "@/lib/ecommerce-buyer-guide";
import { BUSINESS_ID, SITE_URL, WEBSITE_ID, publicPageSchema } from "@/lib/site-identity";

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
        wordCount: blogWordCount(seriesContent, seriesFaqs),
        author: { "@type": "Organization", "@id": SITE_URL + editorialAuthor.path + "#author", name: editorialAuthor.name, url: SITE_URL + editorialAuthor.path },
        publisher: { "@id": BUSINESS_ID },
      }),
    }, { type: "application/ld+json", children: JSON.stringify(blogFaqSchema(seriesFaqs, url, WEBSITE_ID, "en-IN")) }],
  }),
  component: BuyerGuidePage,
});

function BuyerGuidePage() {
  const { categories } = Route.useLoaderData();
  return <BlogDetailPage categories={categories} trackViews={false} post={{
    id: guide.slug, slug: guide.slug, title: guide.title, excerpt: guide.description,
    content: seriesContent, featured_image: guide.image, featured_image_alt: guide.imageAlt,
    author_name: editorialAuthor.name, authorPath: editorialAuthor.path, published_at: null, tags: [], faqs: seriesFaqs, view_count: 0,
    category: null, subcategory: null, related: [],
  }} />;
}

const seriesGroups = new Map([
  [1, "Plan your platform, budget and scope"],
  [5, "Prepare store operations and integrations"],
  [8, "Plan the redesign, marketplace or handover"],
]);

const seriesContent = ecommerceBuyerGuideContent.replace(/^## (\d+)\. (.+)$/gm, (line, number: string, heading: string) => {
  const ordinal = Number(number);
  const topic = editorialPosts[ordinal - 1];
  if (!topic) return line;
  const group = seriesGroups.get(ordinal);
  return `${group ? `## ${group}\n\n` : ""}### ${number}. [${heading}](/blog/${topic.slug})`;
}) + `\n\n## Review the first release\n\n- Pick one successful order and one exception to test before launch.\n- Confirm delivery, payment and returns conditions with the people who operate them.\n- Record the owners of the site, the data and the post-launch support process.`;

const seriesFaqs = [
  { question: "How should I plan an ecommerce website for India?", answer: "Start with the buyers, catalogue, delivery areas and payment methods. Compare platform and operating costs, then give developers a brief with sample orders and acceptance checks." },
  { question: "What is the difference between a store and a wholesale portal?", answer: "A public store usually takes retail orders directly. A wholesale portal may require approved accounts, private prices, bulk quantities and additional review before an order is accepted." },
  { question: "What should a small business prioritise before launch?", answer: "Prioritise accurate product information, mobile checkout, reliable payment and delivery rules, and the ability to recover from an issue. Add lower-priority automations after the team has tested a complete order." },
  { question: "When should I ask for a project quote?", answer: "Ask once you have representative products, a list of required integrations, the target delivery area and an agreed first-release scope. Give every provider the same brief and ask them to list recurring costs separately." },
];
