import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

import { getLatestBlogPosts } from "@/lib/blog.functions";

type Post = { id: string; title: string; slug: string; excerpt: string; featured_image: string | null; featured_image_alt: string; published_at: string | null };

export function LatestBlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  useEffect(() => {
    let active = true;
    void getLatestBlogPosts().then((items) => { if (active) setPosts(items); }).catch(() => {});
    return () => { active = false; };
  }, []);
  if (!posts.length) return null;
  return <section className="border-t border-border bg-card py-7"><div className="page-shell">
    <div className="flex items-end justify-between gap-4"><div><p className="page-eyebrow text-primary">From our blog</p><h2 className="mt-2 text-[22px] font-extrabold leading-tight text-navy md:text-[26px]">Latest insights</h2></div><Link to="/blog" className="inline-flex shrink-0 items-center gap-1 text-xs font-bold text-primary">View all articles <ArrowRight className="h-3.5 w-3.5" /></Link></div>
    <div className="mt-5 grid gap-4 sm:grid-cols-2 md:grid-cols-3">{posts.map((p) => <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group overflow-hidden rounded-md border border-border bg-card shadow-card">{p.featured_image ? <img src={p.featured_image} alt={p.featured_image_alt || p.title} loading="lazy" className="aspect-[16/9] w-full bg-muted object-cover" /> : null}<div className="p-4"><h3 className="text-[15px] font-extrabold leading-snug text-navy group-hover:text-primary">{p.title}</h3><p className="mt-2 line-clamp-2 text-[15px] leading-5 text-muted-foreground">{p.excerpt}</p></div></Link>)}</div>
  </div></section>;
}
