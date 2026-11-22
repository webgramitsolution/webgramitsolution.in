import { editorialAuthor, editorialPosts } from "@/lib/editorial-posts";
import { blogFaqSchema, normalizeBlogFaqs } from "@/lib/blog-faqs";
import { createFileRoute, notFound } from "@tanstack/react-router";
import { BlogDetailPage } from "@/components/blog-detail-page";
import { getPublicBlogPost, getPublicBlog } from "@/lib/blog.functions";
import { NotFoundPage } from "@/components/not-found-page";
import { Button } from "@/components/ui/button";
import { selectArticleRecommendations } from "@/lib/article-recommendations";

import { BUSINESS_ID, SITE_URL, WEBSITE_ID, businessIdentity } from "@/lib/site-identity";

const SITE = SITE_URL;

type SchemaPost = { title: string; seo_description?: string | null; excerpt?: string | null; featured_image?: string | null; featured_image_alt?: string | null; published_at?: string | null; updated_at?: string | null; author_name?: string | null; tags?: string[] | null; authorPath?: string | undefined; content?: string | null; category?: { name: string; slug: string } | null };

function blogPostingSchema(post: SchemaPost, slug: string) {
  const url = `${SITE}/blog/${slug}`;
  const words = (post.content ?? "").trim().split(/\s+/).filter(Boolean).length;
  const crumbs = [{ name: "Home", item: `${SITE}/` }, { name: "Blog", item: `${SITE}/blog` }, ...(post.category ? [{ name: post.category.name, item: `${SITE}/blog/category/${post.category.slug}` }] : []), { name: post.title, item: url }];
  return {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description: post.seo_description ?? post.excerpt ?? undefined,
        url,
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
        isPartOf: { "@id": WEBSITE_ID },
        inLanguage: "en-IN",
        ...(post.featured_image ? { image: { "@type": "ImageObject", url: new URL(post.featured_image, SITE).href, caption: post.featured_image_alt ?? post.title } } : {}),
        datePublished: post.published_at ?? undefined,
        dateModified: post.updated_at ?? post.published_at ?? undefined,
        author: post.authorPath ? { "@type": "Organization", "@id": SITE + post.authorPath + "#author", name: editorialAuthor.name, url: SITE + post.authorPath } : post.author_name?.trim() && post.author_name.trim() !== businessIdentity.name
          ? { "@type": "Person", name: post.author_name.trim(), ...(post.author_name.trim() === businessIdentity.founder.name ? { url: businessIdentity.founder.sameAs } : {}) }
          : { "@id": BUSINESS_ID },
        publisher: { "@type": "Organization", "@id": BUSINESS_ID, name: businessIdentity.name, url: businessIdentity.url, logo: { "@type": "ImageObject", url: businessIdentity.logo }, sameAs: businessIdentity.sameAs },
        ...(post.category ? { articleSection: post.category.name } : {}),
        ...(post.tags?.length ? { keywords: post.tags.join(", ") } : {}),
        ...(words ? { wordCount: words } : {}),
      },
      { "@type": "BreadcrumbList", itemListElement: crumbs.map((c, i) => ({ "@type": "ListItem", position: i + 1, name: c.name, item: c.item })) },
    ],
  };
}

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const editorial = editorialPosts.find(({ slug }) => slug === params.slug);
    if (editorial) {
      const blog = await getPublicBlog().catch(() => ({ categories: [], posts: [] }));
      return { ...editorial, related: selectArticleRecommendations([...editorialPosts, ...blog.posts], editorial), menuCategories: blog.categories };
    }
    const [post, blog] = await Promise.all([getPublicBlogPost({ data: { slug: params.slug } }), getPublicBlog()]);
    if (!post) throw notFound();
    return { ...post, authorPath: undefined, related: selectArticleRecommendations(blog.posts, post), menuCategories: blog.categories };
  },
  notFoundComponent: NotFoundPage,
  errorComponent: () => <div className="page-shell py-16"><h1>Article unavailable</h1><p className="my-4">Please try again shortly.</p><Button asChild><a href="/blog">Back to blog</a></Button></div>,
  head: ({ loaderData, params }) => { const faqs = normalizeBlogFaqs(loaderData?.faqs); return ({ links: [{ rel: "canonical", href: `${SITE}/blog/${params.slug}` }], scripts: loaderData ? [{ type: "application/ld+json", children: JSON.stringify(blogPostingSchema(loaderData, params.slug)) }, ...(faqs.length ? [{ type: "application/ld+json", children: JSON.stringify(blogFaqSchema(faqs, `${SITE}/blog/${params.slug}`, WEBSITE_ID)) }] : [])] : [], meta: [
    { property: "og:url", content: `${SITE}/blog/${params.slug}` },
    ...(loaderData?.published_at ? [{ property: "article:published_time", content: loaderData.published_at }, { property: "article:author", content: loaderData.author_name }] : []),
    { title: loaderData ? `${loaderData.seo_title ?? loaderData.title} | Webgram Blog` : "Article | Webgram IT Solution" },
    { name: "description", content: loaderData?.seo_description ?? loaderData?.excerpt ?? "Webgram digital commerce insight." },
    { property: "og:title", content: loaderData?.seo_title ?? loaderData?.title ?? "Article | Webgram IT Solution" },
    { property: "og:description", content: loaderData?.seo_description ?? loaderData?.excerpt ?? "Webgram digital commerce insight." },
    { property: "og:type", content: "article" }, { name: "twitter:card", content: "summary_large_image" },
    { name: "robots", content: loaderData?.noindex ? "noindex,follow" : "index,follow,max-image-preview:large" },
    ...(loaderData?.featured_image ? [{ property: "og:image", content: new URL(loaderData.featured_image, SITE).href }, { property: "og:image:alt", content: loaderData.featured_image_alt || loaderData.title }, { name: "twitter:image", content: new URL(loaderData.featured_image, SITE).href }] : []),
  ] }); },
  component: Page,
});
function Page() { const post = Route.useLoaderData(); return <BlogDetailPage post={post} categories={post.menuCategories} trackViews={!post.authorPath} />; }
