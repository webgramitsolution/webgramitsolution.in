import { useEffect, useState } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Markdown } from "@tiptap/markdown";
import ImageExtension from "@tiptap/extension-image";
import { TableKit } from "@tiptap/extension-table";
import { Bold, Code2, Eye, Image, Images, Italic, Link2, List, ListOrdered, Maximize2, Minimize2, Minus, Pencil, PlaySquare, Quote, Redo2, Strikethrough, Table2, Underline, Undo2, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArticleBody } from "@/components/blog-detail-page";
import { guestArticleStats } from "@/lib/guest-post-validation";

// Existing article Markdown remains the saved format, not clipboard HTML.
export function VisualArticleEditor({ value, onChange }: { value: string; onChange: (value: string) => void }) {
  const [full, setFull] = useState(false);
  const [preview, setPreview] = useState(false);
  const [media, setMedia] = useState<"image" | "gallery" | "link" | "video" | null>(null);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [mediaError, setMediaError] = useState("");
  const editor = useEditor({
    immediatelyRender: false,
    extensions: [StarterKit.configure({ link: { openOnClick: false }, heading: { levels: [1, 2, 3, 4] } }), Markdown, ImageExtension.configure({ allowBase64: false }), TableKit.configure({ table: { resizable: false } })],
    content: value,
    contentType: "markdown",
    editorProps: { attributes: { class: "visual-article-content", role: "textbox", "aria-label": "Article content", "aria-multiline": "true", "data-placeholder": "Start writing your article…" } },
    onUpdate: ({ editor: current }) => onChange(current.getMarkdown()),
  });
  useEffect(() => {
    if (editor && editor.getMarkdown() !== value) editor.commands.setContent(value, { contentType: "markdown", emitUpdate: false });
  }, [editor, value]);
  useEffect(() => {
    if (!full) return;
    const close = (event: KeyboardEvent) => { if (event.key === "Escape") setFull(false); };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [full]);
  const state = useEditorState({ editor, selector: ({ editor: current }) => ({ bold: current?.isActive("bold"), italic: current?.isActive("italic"), underline: current?.isActive("underline"), strike: current?.isActive("strike"), bullets: current?.isActive("bulletList"), ordered: current?.isActive("orderedList"), heading: [1, 2, 3, 4].find((level) => current?.isActive("heading", { level })) ?? 0 }) });
  const tool = (label: string, icon: React.ReactNode, action: () => void, active = false) => <Button key={label} type="button" variant={active ? "secondary" : "ghost"} size="icon" title={label} aria-label={label} aria-pressed={active} onMouseDown={(event) => event.preventDefault()} onClick={action} className="h-8 w-8 shrink-0 text-foreground">{icon}</Button>;
  function openMedia(kind: "image" | "gallery" | "link" | "video") { setMedia(kind); setUrl(""); setAlt(""); setMediaError(""); }
  function insertMedia() {
    if (!editor || !media) return;
    const urls = (media === "gallery" ? url.split(/[,\n]/) : [url]).map((item) => item.trim()).filter(Boolean);
    if (!urls.length || urls.some((item) => !/^https:\/\//i.test(item) && !(media === "link" && /^\/(?!\/)/.test(item)))) { setMediaError("Enter a valid HTTPS URL."); return; }
    if (media === "video") editor.chain().focus().insertContent(`\n\nVideo: ${url.trim()}\n\n`, { contentType: "markdown" }).run();
    else if (media === "link") {
      if (editor.state.selection.empty) editor.chain().focus().insertContent({ type: "text", text: alt.trim() || url.trim(), marks: [{ type: "link", attrs: { href: url.trim() } }] }).run();
      else editor.chain().focus().setLink({ href: url.trim() }).run();
    } else urls.forEach((src) => editor.chain().focus().setImage({ src, alt: alt.trim() || "Article image" }).run());
    setMedia(null);
  }
  return <div className={full ? "fixed inset-0 z-[70] overflow-auto bg-background p-3 sm:p-6" : "mt-2 min-w-0"}>
    <div className="min-w-0 overflow-hidden rounded-md border border-input bg-card">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-b border-border px-3 py-2">
        <span className="text-[13px] text-muted-foreground">{guestArticleStats(value).words} words</span>
        <div className="flex shrink-0 items-center gap-1" role="group" aria-label="Editor view"><Button type="button" variant={!preview ? "secondary" : "ghost"} size="sm" className="h-8 text-[13px]" onClick={() => setPreview(false)}><Pencil className="h-3.5 w-3.5" />Write</Button><Button type="button" variant={preview ? "secondary" : "ghost"} size="sm" className="h-8 text-[13px]" onClick={() => setPreview(true)}><Eye className="h-3.5 w-3.5" />Preview</Button>{tool(full ? "Exit full screen" : "Full screen", full ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />, () => setFull(!full))}</div>
      </div>
      {!preview ? <>
        <div role="toolbar" aria-label="Article formatting" className="flex flex-wrap items-center gap-0.5 border-b border-border bg-muted/30 px-2 py-2">
          <select aria-label="Text style" value={state?.heading ?? 0} onChange={(event) => { const level = Number(event.target.value); if (level === 1 || level === 2 || level === 3 || level === 4) editor?.chain().focus().setHeading({ level }).run(); else editor?.chain().focus().setParagraph().run(); }} className="mr-2 h-8 max-w-[120px] rounded border border-input bg-card px-2 text-[13px]"><option value="0">Paragraph</option><option value="1">Heading 1</option><option value="2">Heading 2</option><option value="3">Heading 3</option><option value="4">Heading 4</option></select>
          {tool("Bold", <Bold className="h-4 w-4" />, () => { editor?.chain().focus().toggleBold().run(); }, state?.bold)}
          {tool("Italic", <Italic className="h-4 w-4" />, () => { editor?.chain().focus().toggleItalic().run(); }, state?.italic)}
          {tool("Underline", <Underline className="h-4 w-4" />, () => { editor?.chain().focus().toggleUnderline().run(); }, state?.underline)}
          {tool("Strikethrough", <Strikethrough className="h-4 w-4" />, () => { editor?.chain().focus().toggleStrike().run(); }, state?.strike)}
          <span className="mx-1 h-5 w-px bg-border" />
          {tool("Bullet list", <List className="h-4 w-4" />, () => { editor?.chain().focus().toggleBulletList().run(); }, state?.bullets)}
          {tool("Numbered list", <ListOrdered className="h-4 w-4" />, () => { editor?.chain().focus().toggleOrderedList().run(); }, state?.ordered)}
          {tool("Quote", <Quote className="h-4 w-4" />, () => { editor?.chain().focus().toggleBlockquote().run(); })}
          {tool("Link", <Link2 className="h-4 w-4" />, () => openMedia("link"))}
          {tool("Inline code", <Code2 className="h-4 w-4" />, () => { editor?.chain().focus().toggleCode().run(); })}
          <span className="mx-1 h-5 w-px bg-border" />
          {tool("Undo", <Undo2 className="h-4 w-4" />, () => { editor?.chain().focus().undo().run(); })}
          {tool("Redo", <Redo2 className="h-4 w-4" />, () => { editor?.chain().focus().redo().run(); })}
          {editor?.isActive("table") ? tool("Delete table", <X className="h-4 w-4" />, () => { editor.chain().focus().deleteTable().run(); }) : null}
        </div>
        <EditorContent editor={editor} className={full ? "visual-article-editor visual-article-full" : "visual-article-editor"} />
      </> : <div className="min-h-[420px] px-5 py-5"><ArticleBody content={value} preview /></div>}
    </div>
    <div className="mt-3 border-y border-border py-3" aria-label="Insert Media">
      <h3 className="mb-2 text-[13px] font-medium text-muted-foreground">Insert Media</h3>
      <div className="flex flex-wrap items-center gap-1.5">
        <Button type="button" variant="outline" size="sm" className="h-9 text-[13px]" onClick={() => openMedia("image")}><Image className="h-4 w-4" />Image</Button>
        <Button type="button" variant="outline" size="sm" className="h-9 text-[13px]" onClick={() => openMedia("video")}><PlaySquare className="h-4 w-4" />Video</Button>
        <Button type="button" variant="outline" size="sm" className="h-9 text-[13px]" onClick={() => openMedia("gallery")}><Images className="h-4 w-4" />Gallery</Button>
        <Button type="button" variant="outline" size="sm" className="h-9 text-[13px]" onClick={() => editor?.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()}><Table2 className="h-4 w-4" />Table</Button>
        {tool("Divider", <Minus className="h-4 w-4" />, () => { editor?.chain().focus().setHorizontalRule().run(); })}
        {tool("Code block", <Code2 className="h-4 w-4" />, () => { editor?.chain().focus().toggleCodeBlock().run(); })}
      </div>
      {media ? <div className="mt-3 grid min-w-0 gap-2 border-t border-border pt-3"><div className="grid grid-cols-[minmax(0,1fr)_auto] items-center"><label htmlFor="article-media-url" className="text-[13px] font-medium">{media === "gallery" ? "Image URLs (comma separated)" : media === "link" ? "Link URL" : media === "video" ? "Video URL" : "Image URL"}</label><Button type="button" variant="ghost" size="icon" aria-label="Close media" className="h-7 w-7" onClick={() => setMedia(null)}><X className="h-4 w-4" /></Button></div><Input id="article-media-url" value={url} onChange={(event) => setUrl(event.target.value)} placeholder="https://" className="h-9 min-w-0 text-sm" /><Input aria-label={media === "link" ? "Link text" : media === "video" ? "Video description" : "Image alternative text"} value={alt} onChange={(event) => setAlt(event.target.value)} placeholder={media === "link" ? "Link text" : media === "video" ? "Video description" : "Image description"} className="h-9 text-sm" /><div><Button type="button" size="sm" onClick={insertMedia}>Insert {media === "link" ? "link" : media === "video" ? "video" : "image"}</Button></div>{mediaError ? <p role="alert" className="text-sm text-destructive">{mediaError}</p> : null}</div> : null}
    </div>
  </div>;
}