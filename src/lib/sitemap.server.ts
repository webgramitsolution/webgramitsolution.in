import { locations } from "@/lib/locations";
import { menuSections } from "@/lib/menu-pages";
import { rows } from "./mysql.server";

type SitemapEntry = { path: string; label: string; lastmod?: string };
type SitemapGroup = { title: string; entries: SitemapEntry[] };

const staticGroups: SitemapGroup[] = [
  { title: "Company", entries: [
    { path: "/", label: "Home" },
    { path: "/about", label: "About Webgram IT Solution" },
    { path: "/contact", label: "Contact" },
  ] },
  ...Object.values(menuSections).map(({ label, base, pages }) => ({
    title: label,
    entries: Object.entries(pages)
      .filter(([slug]) => slug !== "insights")
      .map(([slug, page]) => ({ path: `${base}/${slug}`, label: page.title })),
  })),
  { title: "Blog", entries: [{ path: "/blog", label: "All articles" }] },
  { title: "Locations", entries: [
    { path: "/locations", label: "All locations" },
    ...locations.map(({ slug, city }) => ({ path: `/locations/${slug}`, label: city })),
  ] },
];

export async function getSitemapGroups(includeBlog = true): Promise<SitemapGroup[]> {
  if (!includeBlog) return staticGroups;
  const [posts, categories] = await Promise.all([
    rows<{ slug: string; title: string; updated_at: string; published_at: string }>("SELECT slug,title,updated_at,published_at FROM blog_posts WHERE status = 'published' AND noindex = FALSE AND published_at <= UTC_TIMESTAMP(3) ORDER BY published_at DESC, slug"),
    rows<{ slug: string; name: string }>("SELECT c.slug,c.name FROM blog_categories c WHERE c.is_active = TRUE AND c.parent_id IS NULL AND EXISTS (SELECT 1 FROM blog_posts p WHERE p.category_id = c.id AND p.status = 'published' AND p.noindex = FALSE AND p.published_at <= UTC_TIMESTAMP(3)) ORDER BY c.display_order,c.slug"),
  ]);
  return [
    ...staticGroups,
    ...(categories.length ? [{ title: "Blog categories", entries: categories.map(({ slug, name }) => ({ path: `/blog/category/${encodeURIComponent(slug)}`, label: name })) }] : []),
    ...(posts.length ? [{ title: "Articles", entries: posts.map(({ slug, title, updated_at, published_at }) => ({
      path: `/blog/${encodeURIComponent(slug)}`,
      label: title,
      lastmod: (updated_at || published_at).slice(0, 10),
    })) }] : []),
  ];
}
