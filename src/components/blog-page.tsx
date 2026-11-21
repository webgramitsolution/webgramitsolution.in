import { useMemo, useState } from "react";
import { Link } from "@tanstack/react-router";
import { CalendarDays, Search } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { BlogAdBand, BlogAdsConsent } from "@/components/blog-ads";
import { BlogPublicHeader } from "@/components/blog-public-header";
import { categoryPreviewPosts } from "@/lib/blog-listing";


type Category = { id: string; name: string; slug: string; description: string; display_order: number; parent_id: string | null };
type Post = { id: string; title: string; slug: string; excerpt: string; featured_image: string | null; featured_image_alt: string; category_id: string | null; subcategory_id: string | null; tags: string[]; author_name: string; published_at: string | null };

const formatDate = (value: string | null) => value ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "short", year: "numeric" }).format(new Date(value)) : "";

function PostImage({ post, className }: { post: Post; className: string }) {
  return post.featured_image ? <img src={post.featured_image} alt={post.featured_image_alt || post.title} className={className} /> : <div className={`${className} bg-primary-soft`} aria-hidden />;
}

export function BlogPage({ categories, posts, initialCategory = "all" }: { categories: Category[]; posts: Post[]; initialCategory?: string }) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(initialCategory);
  const [subcategory, setSubcategory] = useState("all");
  const filtered = useMemo(() => posts.filter((post) => {
    const matchesText = `${post.title} ${post.excerpt}`.toLowerCase().includes(query.toLowerCase());
    return matchesText && (category === "all" || post.category_id === category) && (subcategory === "all" || post.subcategory_id === subcategory);
  }), [posts, query, category, subcategory]);
  const roots = categories.filter((item) => !item.parent_id); const children = categories.filter((item) => item.parent_id === category);
  const grouped = roots.map((item) => ({ category: item, posts: filtered.filter((post) => post.category_id === item.id), children: categories.filter((child) => child.parent_id === item.id) })).filter((group) => group.posts.length);

  return <div className="min-h-screen bg-background text-foreground">
    <main>
      <BlogPublicHeader categories={categories} activeSlug={roots.find((item) => item.id === category)?.slug} onSelect={(id) => { setCategory(id); setSubcategory("all"); }} />

      <section className="bg-navy py-10 text-on-dark">
        <div className="page-shell">
          <h1 className="text-3xl font-extrabold md:text-4xl">Webgram Ecommerce and Web Development Blog</h1>
          <p className="mt-3 max-w-2xl leading-7 text-on-dark/80">Practical notes on storefronts, wholesale ordering, integrations and website upkeep for business owners and ecommerce teams.</p>
        </div>
      </section>

      <div className="page-shell"><BlogAdBand position="top" label="Advertisement above search" /></div>

      <section className="border-y border-border bg-sky-soft py-5">
        <div className="page-shell flex flex-col gap-3 sm:flex-row">
          <div className="relative flex-1"><Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" /><Input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search articles..." className="h-11 bg-card pl-11" /></div>
          <div className="flex justify-end gap-2 sm:gap-3">
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="h-11 max-w-[48%] rounded-md border border-input bg-card px-3 text-sm text-navy sm:max-w-none sm:px-4">
            <option value="all">All categories</option>{roots.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}
          </select>
          <select value={subcategory} onChange={(event) => setSubcategory(event.target.value)} disabled={category === "all"} className="h-11 max-w-[48%] rounded-md border border-input bg-card px-3 text-sm text-navy sm:max-w-none sm:px-4"><option value="all">All subcategories</option>{children.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select>
          </div>
        </div>
      </section>

      <div className="mx-auto grid max-w-[1540px] px-3 xl:grid-cols-[180px_minmax(0,1fr)_180px] xl:px-0">
      <aside className="hidden xl:block"><div className="sticky top-28 py-9"><BlogAdBand rail position="detailLeft" label="Advertisement — left" /></div></aside>
      <section className="min-w-0 px-3 py-9 md:px-5">
        {grouped.length ? grouped.map((group, groupIndex) => <div key={group.category.id}>
          {groupIndex > 0 ? <BlogAdBand position="category" label={`Advertisement above ${group.category.name}`} /> : null}
          <div id={`category-${group.category.slug}`}>
          <div className="mb-3 grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]"><span className="hidden h-px bg-border sm:block" /><h2 className="truncate text-center text-2xl font-extrabold text-navy">{group.category.name}</h2><div className="flex items-center justify-end gap-4"><span className="h-px min-w-5 flex-1 bg-border" /><Button type="button" variant="ghost" size="sm" onClick={() => setCategory(group.category.id)} className="shrink-0 text-primary">View more</Button></div></div>
          <div className="mb-5 flex gap-2 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">{group.children.map((child) => <button key={child.id} onClick={() => { setCategory(group.category.id); setSubcategory(child.id); }} className="shrink-0 rounded-full border border-border bg-card px-3 py-1 text-xs font-semibold text-navy hover:text-primary">{child.name}</button>)}</div>
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
          {categoryPreviewPosts(group.posts, category !== "all").map((post) => <div key={post.id} className="group flex min-w-0 flex-col overflow-hidden rounded-md border border-border bg-card shadow-card">
            <Link to="/blog/$slug" params={{ slug: post.slug }} className="block aspect-[16/9] overflow-hidden"><PostImage post={post} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" /></Link>
            <div className="flex flex-1 flex-col p-3"><h3 className="line-clamp-3 text-[14px] font-medium leading-[1.35] text-navy group-hover:text-primary"><Link to="/blog/$slug" params={{ slug: post.slug }}>{post.title}</Link></h3><span className="mt-2 block truncate text-[13px] font-semibold text-navy">By {post.author_name || "Webgram Team"}</span><span className="mt-1 flex items-center gap-1.5 text-[13px] text-muted-foreground"><CalendarDays className="h-3 w-3" />{formatDate(post.published_at)}</span><div className="mt-auto pt-3"><Button asChild variant="link" className="h-auto p-0 text-[14px]"><Link to="/blog/$slug" params={{ slug: post.slug }} aria-label={`Read more: ${post.title}`}>Read More</Link></Button></div></div>
          </div>)}
           </div><div className="h-12" /></div>
        </div>) : <div className="py-16 text-center text-sm text-muted-foreground">No articles match your search.</div>}
      </section>
      <aside className="hidden xl:block"><div className="sticky top-28 py-9"><BlogAdBand rail position="detailRight" label="Advertisement — right" /></div></aside>
      </div>
    </main>
    <BlogAdsConsent />
  </div>;
}
