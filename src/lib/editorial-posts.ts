import { editorialArticles } from "./editorial-articles";
import { readEditorialArticle } from "./editorial-article-content";

export const editorialAuthor = {
  path: "/authors/webgram-editorial-team",
  name: "Webgram IT Solution Editorial Team",
  description:
    "Website and ecommerce guides from the Webgram IT Solution team in New Delhi, India, covering platform selection, launch operations and post-launch support.",
} as const;

export const editorialPosts = editorialArticles.map(
  ([slug, title, excerpt, coverAlt, seoTitle]) => {
    const article = readEditorialArticle(slug);
    return {
      id: slug,
      slug,
      title,
      excerpt,
      author_name: editorialAuthor.name,
      authorPath: editorialAuthor.path,
      featured_image: `/images/blog-covers/${slug}.webp`,
      featured_image_alt: coverAlt,
      published_at: "2026-11-22",
      updated_at: null,
      category: null,
      subcategory: null,
      category_id: null,
      subcategory_id: null,
      tags: [],
      seo_title: seoTitle,
      seo_description: excerpt,
      noindex: false,
      view_count: 0,
      ...article,
    };
  },
);

export const editorialBlogCards = editorialPosts.map(({ content: _content, ...card }) => card);
