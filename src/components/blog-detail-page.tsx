import { normalizeBlogFaqs } from "@/lib/blog-faqs";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { ArrowRight, CalendarDays, Clock3, Eye, Home } from "lucide-react";

import { BlogPublicHeader, type BlogMenuCategory } from "@/components/blog-public-header";
import { BlogEngagement, BlogShareButtons } from "@/components/blog-engagement";
import { BlogAdBand, BlogAdsConsent } from "@/components/blog-ads";
import { Button } from "@/components/ui/button";
import { articlePreviewBlockCount, articleAdBoundaries } from "@/lib/article-disclosure";

type Related = { id: string; title: string; slug: string; excerpt: string; featured_image: string | null; featured_image_alt: string; published_at: string | null };
type Faq = { question: string; answer: string };
type Post = { id: string; title: string; slug: string; excerpt: string; content: string; featured_image: string | null; featured_image_alt: string; author_name: string; published_at: string | null; tags: string[]; faqs: unknown; view_count: number; category: { name: string; slug: string } | null; subcategory: { name: string; slug: string } | null; related: Related[] };

const date = (value: string | null) => value ? new Intl.DateTimeFormat("en-IN", { day: "numeric", month: "long", year: "numeric" }).format(new Date(value)) : "";

function InlineText({ value }: { value: string }) {
  const parts = value.split(/(\[[^\]]+\]\((?:https:\/\/|\/)[^)]+\)|`[^`]+`|\*\*[^*]+\*\*|__[^_]+__|\+\+[^+]+\+\+|~~[^~]+~~|\*[^*]+\*)/g).filter(Boolean);
  return <>{parts.map((part, index) => {
    const link = part.match(/^\[([^\]]+)\]\(((?:https:\/\/|\/)[^)]+)\)$/);
    if (link) return <a key={index} href={link[2]} target={link[2]?.startsWith("https://") ? "_blank" : undefined} rel={link[2]?.startsWith("https://") ? "noreferrer" : undefined}>{link[1]}</a>;
    if (part.startsWith("`") && part.endsWith("`")) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("++") && part.endsWith("++")) return <u key={index}>{part.slice(2, -2)}</u>;
    if (part.startsWith("__") && part.endsWith("__")) return <u key={index}>{part.slice(2, -2)}</u>;
    if (part.startsWith("~~") && part.endsWith("~~")) return <s key={index}>{part.slice(2, -2)}</s>;
    if (part.startsWith("*") && part.endsWith("*")) return <em key={index}>{part.slice(1, -1)}</em>;
    return <span key={index}>{part}</span>;
  })}</>;
}

const imagePattern = /^!\[([^\]]*)\]\((https:\/\/[^\s)]+)\)$/i;

export function ArticleBody({ content, preview = false, advertisements = false, recommendations = [], collapsed = false }: { content: string; preview?: boolean; advertisements?: boolean; recommendations?: Related[]; collapsed?: boolean }) {
  const [phone, setPhone] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const sync = () => setPhone(media.matches);
    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);
  const lines = content.replace(/\\n/g, "\n").split("\n");
  const blocks: React.ReactNode[] = [];
  let index = 0;
  while (index < lines.length) {
    const line = lines[index]?.trim() ?? "";
    if (!line) { index += 1; continue; }
    if (line.startsWith(":::align-")) {
      const alignment = line.slice(9); const aligned: string[] = []; index += 1;
      while (index < lines.length && lines[index]?.trim() !== ":::") { aligned.push(lines[index] ?? ""); index += 1; }
      blocks.push(<div key={`align-${index}`} className={alignment === "center" ? "text-center" : alignment === "right" ? "text-right" : "text-left"}><InlineText value={aligned.join(" ").trim()} /></div>);
      index += 1; continue;
    }
    if (line === ":::gallery" || line === ":::grid") {
      const mode = line.slice(3); const items: string[] = []; let current: string[] = [];
      index += 1;
      while (index < lines.length && lines[index]?.trim() !== ":::") {
        if (mode === "grid" && lines[index]?.trim() === "---") { items.push(current.join("\n").trim()); current = []; }
        else current.push(lines[index] ?? "");
        index += 1;
      }
      items.push(current.join("\n").trim());
      blocks.push(<div key={`rich-${index}`} className={mode === "gallery" ? "article-gallery" : "article-grid"}>{items.filter(Boolean).map((item, itemIndex) => { const match = item.match(imagePattern); return match ? <img key={itemIndex} src={match[2]} alt={match[1] || "Article gallery image"} loading="lazy" /> : <p key={itemIndex}><InlineText value={item} /></p>; })}</div>);
      index += 1; continue;
    }
    const image = line.match(imagePattern);
    if (image) { blocks.push(<figure key={`image-${index}`}><img src={image[2]} alt={image[1] || "Article image"} loading="lazy" /></figure>); index += 1; continue; }
    if (/^Video:\s*https:\/\//i.test(line)) { const url = line.replace(/^Video:\s*/i, ""); blocks.push(<div key={`video-${index}`} className="article-embed"><a href={url} target="_blank" rel="noreferrer">Open embedded video</a></div>); index += 1; continue; }
    if (line === "---") { blocks.push(<hr key={`hr-${index}`} />); index += 1; continue; }
    if (line.startsWith("```")) {
      const code: string[] = []; index += 1;
      while (index < lines.length && !(lines[index]?.trim() ?? "").startsWith("```")) { code.push(lines[index] ?? ""); index += 1; }
      blocks.push(<pre key={`code-${index}`} className="overflow-x-auto rounded-md bg-muted p-4 text-[14px]"><code>{code.join("\n")}</code></pre>); index += 1; continue;
    }
    if (line.startsWith("|")) {
      const rows: string[][] = [];
      while (index < lines.length && (lines[index]?.trim() ?? "").startsWith("|")) {
        const row = (lines[index]?.trim() ?? "").replace(/^\||\|$/g, "").split("|").map((cell) => cell.trim());
        if (!row.every((cell) => /^:?-{2,}:?$/.test(cell))) rows.push(row);
        index += 1;
      }
      const [head, ...body] = rows;
      blocks.push(<div key={`table-${index}`} className="my-5 overflow-x-auto rounded-md border border-border"><table className="w-full border-collapse text-[15px]">{head ? <thead className="bg-sky-soft"><tr>{head.map((cell, i) => <th key={i} className="border-b border-border px-3 py-2 text-left font-semibold text-navy"><InlineText value={cell} /></th>)}</tr></thead> : null}<tbody>{body.map((row, r) => <tr key={r} className="border-b border-border last:border-0">{row.map((cell, i) => <td key={i} className="px-3 py-2 align-top"><InlineText value={cell} /></td>)}</tr>)}</tbody></table></div>);
      continue;
    }
    if (line.startsWith("#### ")) { blocks.push(<h4 key={`h4-${index}`}><InlineText value={line.slice(5)} /></h4>); index += 1; continue; }
    if (line.startsWith("### ")) { blocks.push(<h3 key={`h3-${index}`}><InlineText value={line.slice(4)} /></h3>); index += 1; continue; }
    if (line.startsWith("## ")) { blocks.push(<h2 key={`h2-${index}`}><InlineText value={line.slice(3)} /></h2>); index += 1; continue; }
    if (line.startsWith("# ")) { blocks.push(<h2 key={`h1-${index}`} className="article-h1"><InlineText value={line.slice(2)} /></h2>); index += 1; continue; }
    if (line.startsWith("> ")) { blocks.push(<blockquote key={`quote-${index}`}><InlineText value={line.slice(2)} /></blockquote>); index += 1; continue; }
    if (/^\d+\.\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^\d+\.\s/.test(lines[index]?.trim() ?? "")) { items.push((lines[index]?.trim() ?? "").replace(/^\d+\.\s/, "")); index += 1; }
      blocks.push(<ol key={`ordered-${index}`}>{items.map((item, itemIndex) => <li key={itemIndex}><InlineText value={item} /></li>)}</ol>); continue;
    }
    if (/^[-*•]\s/.test(line)) {
      const items: string[] = [];
      while (index < lines.length && /^[-*•]\s/.test(lines[index]?.trim() ?? "")) { items.push((lines[index]?.trim() ?? "").slice(2)); index += 1; }
      blocks.push(<ul key={`list-${index}`}>{items.map((item, itemIndex) => <li key={itemIndex}><InlineText value={item} /></li>)}</ul>); continue;
    }
    const paragraph = [line]; index += 1;
    while (index < lines.length && lines[index]?.trim() && !/^(#{1,4} |[-*•] |\d+\. |> |\||```|---$|:::|!\[|Video:)/.test(lines[index]?.trim() ?? "")) { paragraph.push(lines[index]?.trim() ?? ""); index += 1; }
    blocks.push(<p key={`p-${index}`}><InlineText value={paragraph.join(" ")} /></p>);
  }
  const adBoundaries = articleAdBoundaries(blocks.length, phone);
  const recommendationBoundaries = recommendations.map((_, itemIndex) => Math.max(0, Math.ceil(blocks.length * (itemIndex + 1) / 3) - 1));
  const previewCount = articlePreviewBlockCount(blocks.length);
  return <div className={`blog-prose ${preview ? "blog-prose-preview" : ""}`}>{blocks.length ? blocks.map((block, blockIndex) => <div key={blockIndex} hidden={collapsed && blockIndex >= previewCount}>{block}{!preview && (!collapsed || blockIndex < previewCount) ? recommendations.map((item, itemIndex) => recommendationBoundaries[itemIndex] === blockIndex ? <aside key={item.id} className="my-6 border-y border-border bg-primary-soft px-4 py-4" aria-label="Related article"><span className="mb-2 block text-[13px] font-medium text-muted-foreground">{itemIndex === 0 ? "Also read this blog" : "Read about this"}</span><Link to="/blog/$slug" params={{ slug: item.slug }} className="flex items-start justify-between gap-3 text-[16px] font-medium leading-6 text-primary">{item.title}<ArrowRight className="mt-1 h-4 w-4 shrink-0" /></Link></aside> : null) : null}{advertisements && !preview && (!collapsed || blockIndex < previewCount) ? adBoundaries.map((boundary, adIndex) => boundary === blockIndex ? <BlogAdBand key={`article-ad-${adIndex}`} position={adIndex % 2 === 0 ? "articleFeed" : "articleContent"} label={`Article advertisement ${adIndex + 1}`} /> : null) : null}</div>) : preview ? <p className="text-muted-foreground">Your formatted article preview will appear here.</p> : null}</div>;
}

export function BlogDetailPage({ post, categories }: { post: Post; categories: BlogMenuCategory[] }) {
  const [expandedSlug, setExpandedSlug] = useState<string | null>(null);
  const expanded = expandedSlug === post.slug;
  const minutes = Math.max(2, Math.ceil(post.content.split(/\s+/).length / 200));
  const faqs = normalizeBlogFaqs(post.faqs);
  useEffect(() => {
    const key = `viewed:${post.slug}`;
    if (sessionStorage.getItem(key)) return;
    sessionStorage.setItem(key, "1");
    void supabase.rpc("increment_post_view", { _slug: post.slug });
  }, [post.slug]);
  return <div className="min-h-screen bg-background text-foreground">
    <BlogPublicHeader categories={categories} activeSlug={post.category?.slug} />
    <main className="bg-card">
      <div className="border-b border-border bg-background"><nav className="page-shell flex h-11 min-w-0 items-center gap-2 overflow-hidden whitespace-nowrap text-[14px] text-muted-foreground" aria-label="Breadcrumb"><Link to="/" className="flex shrink-0 items-center gap-1.5 hover:text-primary"><Home className="h-3.5 w-3.5" />Home</Link><span className="shrink-0">›</span><Link to="/resources/$slug" params={{ slug: "blog" }} className="shrink-0 hover:text-primary">Blog</Link><span className="shrink-0">›</span>{post.category ? <><Link to="/blog/category/$slug" params={{ slug: post.category.slug }} title={post.category.name} className="max-w-24 shrink-0 truncate text-navy hover:text-primary sm:max-w-56">{post.category.name}</Link><span className="shrink-0">›</span></> : null}<Link to="/blog/$slug" params={{ slug: post.slug }} aria-current="page" title={post.title} className="min-w-0 truncate hover:text-primary">{post.title}</Link></nav></div>
      <div className="mx-auto grid w-full max-w-[1280px] py-5 xl:grid-cols-[160px_minmax(0,1fr)_160px] xl:gap-4 xl:px-4">
        <aside className="hidden xl:block"><div className="sticky top-28"><BlogAdBand rail position="detailLeft" label="Advertisement — left" /></div></aside>
        <div className="min-w-0 bg-card px-3 md:px-5 xl:px-0">
      <BlogAdBand position="top" label="Advertisement above featured image" />
      {post.featured_image ? <figure className="aspect-[16/6.2] overflow-hidden rounded-md border border-border bg-muted shadow-card"><img src={post.featured_image} alt={post.featured_image_alt || post.title} className="h-full w-full object-cover" /></figure> : null}
      <section className="pt-4">
        <p className="inline-flex rounded-sm bg-primary px-2 py-1 text-[13px] font-extrabold uppercase text-primary-foreground">{post.category?.name ?? "Webgram Journal"}</p>
        <h1 className="mt-2 text-[1.65rem] font-extrabold leading-[1.12] text-navy md:text-[1.9rem]">{post.title}</h1>
        <div className="mt-4 grid gap-3 border-b border-border pb-4 md:grid-cols-[1fr_auto] md:items-center">
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-muted-foreground"><span className="grid h-7 w-7 place-items-center rounded-full bg-navy font-bold text-on-dark">{post.author_name.charAt(0).toUpperCase()}</span><strong className="text-navy">By {post.author_name}</strong><span className="flex items-center gap-1"><CalendarDays className="h-3.5 w-3.5" />{date(post.published_at)}</span><span className="flex items-center gap-1"><Clock3 className="h-3.5 w-3.5" />{minutes} Min Read</span><span className="flex items-center gap-1"><Eye className="h-3.5 w-3.5" />{post.view_count.toLocaleString("en-IN")} Views</span></div>
          <BlogShareButtons postId={post.id} title={post.title} />
        </div>
      </section>
      <article id="article-content" className="py-5"><ArticleBody content={post.content} advertisements recommendations={post.related} collapsed={!expanded} /></article>
      {!expanded ? <div className="mb-8 flex justify-center border-t border-border pt-5"><Button size="lg" aria-expanded={expanded} aria-controls="article-content" onClick={() => setExpandedSlug(post.slug)}>Read more<ArrowRight /></Button></div> : null}
      {!expanded ? <BlogAdBand position="afterPreview" label="Advertisement below Read more" /> : null}
      {faqs.length ? <section id="article-faqs" aria-labelledby="article-faqs-title" className="mx-auto mb-10 w-[min(100%,760px)]"><h2 id="article-faqs-title" className="text-2xl font-extrabold text-navy">Frequently Asked Questions</h2><div className="mt-4 divide-y rounded-md border border-border bg-card">{faqs.map((faq, index) => <details key={`${index}-${faq.question}`} className="group p-4"><summary className="cursor-pointer font-bold text-navy">{faq.question}</summary><p className="mt-3 text-sm leading-6 text-muted-foreground">{faq.answer}</p></details>)}</div></section> : null}
      <div hidden={!expanded}>
      {expanded ? <><BlogEngagement postId={post.id} title={post.title} /><BlogAdBand position="afterComments" label="Advertisement below comments" /></> : null}
      </div>
        </div>
        <aside className="hidden xl:block"><div className="sticky top-28"><BlogAdBand rail position="detailRight" label="Advertisement — right" /></div></aside>
      </div>
      <BlogAdsConsent />
    </main>
  </div>;
}
