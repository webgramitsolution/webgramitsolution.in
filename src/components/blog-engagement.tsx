import { useEffect, useState } from "react";
import { Facebook, Instagram, Linkedin, MessageSquare, Pin, Share2, Twitter } from "lucide-react";

import { getBlogComments } from "@/lib/blog.functions";
import { Button } from "@/components/ui/button";

type Comment = { id: string; author_name: string; body: string; created_at: string };
const platforms = [
  { id: "facebook", label: "Facebook", url: (u: string) => `https://www.facebook.com/sharer/sharer.php?u=${u}` },
  { id: "instagram", label: "Instagram", url: () => `https://www.instagram.com/` },
  { id: "linkedin", label: "LinkedIn", url: (u: string) => `https://www.linkedin.com/sharing/share-offsite/?url=${u}` },
  { id: "pinterest", label: "Pinterest", url: (u: string, t: string) => `https://pinterest.com/pin/create/button/?url=${u}&description=${t}` },
  { id: "tumblr", label: "Tumblr", url: (u: string, t: string) => `https://www.tumblr.com/widgets/share/tool?canonicalUrl=${u}&title=${t}` },
  { id: "x", label: "X", url: (u: string, t: string) => `https://twitter.com/intent/tweet?url=${u}&text=${t}` },
] as const;

export function BlogShareButtons({ title }: { postId: string; title: string }) {
  const [message, setMessage] = useState("");
  function share(platform: (typeof platforms)[number]) {
    const url = encodeURIComponent(window.location.href); const encodedTitle = encodeURIComponent(title);
    if (platform.id === "instagram") { void navigator.clipboard?.writeText(window.location.href); setMessage("Link copied — paste it in Instagram."); }
    window.open(platform.url(url, encodedTitle), "_blank", "noopener,noreferrer");
  }
  const icons: Record<string, typeof Facebook> = { facebook: Facebook, instagram: Instagram, linkedin: Linkedin, pinterest: Pin, tumblr: Share2, x: Twitter };
  return <div className="flex flex-wrap items-center justify-end gap-2" aria-label="Share article">
    <span className="mr-1 text-[13px] font-semibold text-muted-foreground">Share:</span>
    {platforms.map((platform) => { const Icon = icons[platform.id] ?? Share2; return <Button key={platform.id} type="button" variant="ghost" size="icon" onClick={() => share(platform)} title={`Share on ${platform.label}`} aria-label={`Share on ${platform.label}`} className="h-7 w-7 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"><Icon className="h-3.5 w-3.5" /></Button>; })}
    {message ? <span className="w-full text-right text-[13px] font-semibold text-success">{message}</span> : null}
  </div>;
}

/** Shows earlier reader comments; new comments are closed since the guest section was retired. */
export function BlogEngagement({ postId }: { postId: string; title: string }) {
  const [comments, setComments] = useState<Comment[]>([]);
  useEffect(() => {
    let cancelled = false;
    setComments([]);
    void getBlogComments({ data: { postId } }).then((items) => {
      if (!cancelled) setComments(items);
    }).catch(() => {});
    return () => { cancelled = true; };
  }, [postId]);
  if (!comments.length) return null;
  return <section className="mx-auto w-full pb-14">
    <div className="rounded-md border border-border bg-card p-4 md:p-5"><h2 className="flex items-center gap-2 text-base font-extrabold text-navy"><MessageSquare className="h-4 w-4" />Comments <span className="text-[13px] font-medium text-muted-foreground">({comments.length})</span></h2>
      <ul className="mt-4 space-y-3">{comments.map((c) => <li key={c.id} className="rounded-md border border-border bg-card p-4"><p className="text-[13px] font-bold text-navy">{c.author_name} <span className="font-normal text-muted-foreground">· {new Date(c.created_at).toLocaleDateString("en-IN")}</span></p><p className="mt-1 whitespace-pre-line text-sm leading-6">{c.body}</p></li>)}</ul>
    </div>
  </section>;
}
