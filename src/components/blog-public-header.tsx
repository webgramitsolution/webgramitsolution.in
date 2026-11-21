import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export type BlogMenuCategory = { id: string; name: string; slug: string; parent_id: string | null };
export function BlogPublicHeader({ categories, activeSlug, onSelect }: { categories: BlogMenuCategory[]; activeSlug?: string | undefined; onSelect?: (id: string) => void }) {
  const items = categories.filter((category) => !category.parent_id);
  return <header className="sticky top-0 z-50 border-b border-on-dark/20 bg-navy text-on-dark shadow-card">
    <div className="header-shell grid min-h-[80px] grid-cols-[minmax(0,1fr)_auto] items-center gap-3">
      <div className="flex min-w-0 items-center gap-4 lg:gap-7">
        <Link to="/" className="shrink-0" aria-label="Webgram IT Solution home"><img src="https://ik.imagekit.io/x3cipokny/webgram%20it%20solution?updatedAt=1790815003792" alt="Webgram IT Solution" width={720} height={177} className="h-[30px] w-auto object-contain brightness-0 invert lg:h-[36px]" /></Link>
        <nav className="flex min-w-0 items-center gap-1 overflow-x-auto py-1 [scrollbar-width:none] lg:gap-3 [&::-webkit-scrollbar]:hidden" aria-label="Blog categories">
          <Button asChild variant={!activeSlug ? "default" : "ghost"} size="sm" className="shrink-0 text-[13px] uppercase text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><Link to="/blog" onClick={onSelect ? (event) => { event.preventDefault(); onSelect("all"); } : undefined}>All</Link></Button>
          {items.map((category) => <Button key={category.id} asChild size="sm" variant={activeSlug === category.slug ? "default" : "ghost"} className="shrink-0 text-[13px] uppercase text-on-dark hover:bg-on-dark/10 hover:text-on-dark"><Link to="/blog/category/$slug" params={{ slug: category.slug }} onClick={onSelect ? (event) => { event.preventDefault(); onSelect(category.id); } : undefined}>{category.name}</Link></Button>)}
        </nav>
      </div>
      <Button asChild size="sm" className="h-9 shrink-0 bg-gold px-3 text-[13px] font-semibold text-navy hover:bg-gold/90"><Link to="/contact">Get <span className="hidden sm:inline">Free </span>Quote <span aria-hidden>→</span></Link></Button>
    </div>
  </header>;
}