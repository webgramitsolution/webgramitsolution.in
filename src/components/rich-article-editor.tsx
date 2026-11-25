import { useRef, useState, type ClipboardEvent, type DragEvent } from "react";
import {
  AlignCenter,
  AlignLeft,
  AlignRight,
  Bold,
  Code2,
  Eye,
  Grid3X3,
  Image,
  Images,
  Italic,
  Link2,
  List,
  ListOrdered,
  Maximize2,
  Minimize2,
  Minus,
  MoreHorizontal,
  Pencil,
  PlaySquare,
  Quote,
  Redo2,
  Strikethrough,
  Table2,
  Underline,
  Undo2,
  UploadCloud,
} from "lucide-react";

import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { ArticleBody } from "@/components/blog-detail-page";

type RichArticleEditorProps = {
  value: string;
  onChange: (value: string) => void;
  minHeight?: string;
};

function cleanText(value: string) {
  return value
    .replace(/\u00a0/g, " ")
    .replace(/[ \t]+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

const inline = (value: string) => value.replace(/\s*\n+\s*/g, " ").trim();

function tableToMarkdown(table: HTMLElement): string {
  const rows = Array.from(table.querySelectorAll("tr")).map((row) =>
    Array.from(row.querySelectorAll("th,td")).map(
      (cell) =>
        inline(Array.from(cell.childNodes).map(nodeToMarkdown).join("")).replace(/\|/g, "/") || " ",
    ),
  );
  if (!rows.length) return "";
  const width = Math.max(...rows.map((row) => row.length));
  const pad = (row: string[]) =>
    `| ${[...row, ...Array(width - row.length).fill(" ")].join(" | ")} |`;
  return `\n\n${[pad(rows[0]!), `| ${Array(width).fill("---").join(" | ")} |`, ...rows.slice(1).map(pad)].join("\n")}\n\n`;
}

function nodeToMarkdown(node: Node): string {
  if (node.nodeType === Node.TEXT_NODE) return (node.textContent ?? "").replace(/\s*\n\s*/g, " ");
  if (!(node instanceof HTMLElement)) return "";
  const tag = node.tagName.toLowerCase();
  if (tag === "table") return tableToMarkdown(node);
  if (tag === "pre")
    return `\n\n\`\`\`\n${(node.textContent ?? "").replace(/\n+$/, "")}\n\`\`\`\n\n`;
  if (tag === "ul" || tag === "ol") {
    const items = Array.from(node.children).filter((child) => child.tagName.toLowerCase() === "li");
    return `\n\n${items.map((li, index) => `${tag === "ol" ? `${index + 1}.` : "-"} ${inline(Array.from(li.childNodes).map(nodeToMarkdown).join(""))}`).join("\n")}\n\n`;
  }
  const text = Array.from(node.childNodes).map(nodeToMarkdown).join("");
  switch (tag) {
    case "script":
    case "style":
      return "";
    case "h1":
      return `\n\n# ${inline(text)}\n\n`;
    case "h2":
      return `\n\n## ${inline(text)}\n\n`;
    case "h3":
      return `\n\n### ${inline(text)}\n\n`;
    case "h4":
    case "h5":
    case "h6":
      return `\n\n#### ${inline(text)}\n\n`;
    case "strong":
    case "b":
      return text.trim() ? `**${text.trim()}** ` : "";
    case "u":
      return `__${text}__`;
    case "s":
    case "del":
    case "strike":
      return `~~${text}~~`;
    case "em":
    case "i":
      return text.trim() ? `*${text.trim()}* ` : "";
    case "code":
      return `\`${text}\``;
    case "blockquote":
      return `\n\n> ${inline(text)}\n\n`;
    case "hr":
      return "\n\n---\n\n";
    case "br":
      return "\n";
    case "li":
      return `\n- ${inline(text)}`;
    case "p":
    case "div":
    case "section":
    case "article":
    case "figure":
    case "figcaption":
      return `\n\n${text}\n\n`;
    case "img": {
      const src = node.getAttribute("src") ?? "";
      if (!/^https:\/\//i.test(src)) return "";
      const alt = (node.getAttribute("alt") ?? "Article image").replace(/[[\]]/g, "");
      return `\n\n![${alt}](${src})\n\n`;
    }
    default:
      return text;
  }
}

const countWords = (value: string) => {
  const readable = value
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/[:*_[\]#>~-]/g, " ")
    .trim();
  return readable ? readable.split(/\s+/).length : 0;
};

export function RichArticleEditor({
  value,
  onChange,
  minHeight = "min-h-[55vh] sm:min-h-[260px]",
}: RichArticleEditorProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [full, setFull] = useState(false);
  const [mode, setMode] = useState<"write" | "preview">("write");

  function replaceSelection(before: string, after = "", placeholder = "text") {
    const input = ref.current;
    if (!input) return;
    const start = input.selectionStart;
    const end = input.selectionEnd;
    const selected = value.slice(start, end) || placeholder;
    onChange(`${value.slice(0, start)}${before}${selected}${after}${value.slice(end)}`);
    requestAnimationFrame(() => {
      input.focus();
      input.setSelectionRange(start + before.length, start + before.length + selected.length);
    });
  }

  function insertImages(gallery = false, preset?: string[]) {
    const raw =
      preset ??
      (
        window.prompt(
          gallery ? "Paste HTTPS image URLs, separated by commas" : "Paste an HTTPS image URL",
        ) ?? ""
      ).split(",");
    const images = raw
      .map((url) => url.trim())
      .filter((url) => /^https:\/\//i.test(url))
      .map((url, index) => `![Image ${index + 1}](${url})`);
    if (!images.length) return;
    replaceSelection(
      gallery || images.length > 1
        ? `\n\n:::gallery\n${images.join("\n")}\n:::\n\n`
        : `\n\n${images[0]}\n\n`,
      "",
      "",
    );
  }

  function handleDrop(event: DragEvent<HTMLButtonElement>) {
    event.preventDefault();
    const urls = (
      event.dataTransfer.getData("text/uri-list") || event.dataTransfer.getData("text/plain")
    ).split(/\s+/);
    if (urls.some((url) => /^https:\/\//i.test(url))) insertImages(false, urls);
    else insertImages(false);
  }

  function handlePaste(event: ClipboardEvent<HTMLTextAreaElement>) {
    const html = event.clipboardData.getData("text/html");
    if (!html) return;
    event.preventDefault();
    const doc = new DOMParser().parseFromString(html, "text/html");
    replaceSelection(
      cleanText(Array.from(doc.body.childNodes).map(nodeToMarkdown).join("")),
      "",
      "",
    );
  }

  function history(command: "undo" | "redo") {
    ref.current?.focus();
    document.execCommand(command);
  }

  function block(kind: string) {
    if (kind === "h1") replaceSelection("\n# ", "", "Main section heading");
    else if (kind === "h2") replaceSelection("\n## ", "", "Section heading");
    else if (kind === "h3") replaceSelection("\n### ", "", "Subheading");
    else if (kind === "h4") replaceSelection("\n#### ", "", "Small heading");
    else replaceSelection("", "", "Start writing");
  }

  const sep = <span className="mx-1 h-6 w-px shrink-0 bg-border" aria-hidden />;
  const Tool = ({
    label,
    onClick,
    children,
  }: {
    label: string;
    onClick: () => void;
    children: React.ReactNode;
  }) => (
    <Button
      type="button"
      variant="ghost"
      size="icon"
      title={label}
      aria-label={label}
      onClick={onClick}
      className="h-8 w-8 shrink-0 text-navy hover:bg-sky-soft"
    >
      {children}
    </Button>
  );

  const align = (direction: "left" | "center" | "right") =>
    replaceSelection(`\n:::align-${direction}\n`, "\n:::\n", "Aligned text");
  const link = () => {
    const url = window.prompt("Paste an HTTPS or internal URL", "/");
    if (url && (/^https:\/\//i.test(url) || url.startsWith("/")))
      replaceSelection("[", `](${url})`, "link text");
  };
  const video = () => {
    const url = window.prompt("Paste an HTTPS video URL");
    if (url && /^https:\/\//i.test(url)) replaceSelection(`\n\nVideo: ${url}\n\n`, "", "");
  };
  const table = () =>
    replaceSelection("\n\n:::grid\n", "\n---\nSecond cell\n---\nThird cell\n:::\n\n", "First cell");
  const embed = () => replaceSelection("\n\n> ", "\n\n", "Highlighted note or embed caption");

  const media = [
    { label: "Image", icon: Image, action: () => insertImages(false) },
    { label: "Video", icon: PlaySquare, action: video },
    { label: "Gallery", icon: Images, action: () => insertImages(true) },
    { label: "Table", icon: Grid3X3, action: table },
    { label: "Embed", icon: Code2, action: embed },
    { label: "Divider", icon: Minus, action: () => replaceSelection("\n\n---\n\n", "", "") },
  ];

  return (
    <div
      className={
        full
          ? "fixed inset-0 z-[60] overflow-auto bg-background p-4"
          : "mt-2 -mx-2 min-w-0 max-w-none sm:mx-0 sm:max-w-full"
      }
    >
      <div className="overflow-hidden rounded-md border border-input bg-card focus-within:ring-1 focus-within:ring-ring">
        <div
          className="grid grid-cols-2 border-b border-border bg-sky-soft p-1 sm:ml-auto sm:w-56"
          role="tablist"
          aria-label="Editor mode"
        >
          <Button
            type="button"
            variant={mode === "write" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("write")}
          >
            <Pencil className="h-3.5 w-3.5" />
            Write
          </Button>
          <Button
            type="button"
            variant={mode === "preview" ? "default" : "ghost"}
            size="sm"
            onClick={() => setMode("preview")}
          >
            <Eye className="h-3.5 w-3.5" />
            Live Preview
          </Button>
        </div>
        {mode === "write" ? (
          <>
            <div
              className="flex min-h-12 max-w-full items-center gap-0.5 overflow-x-auto border-b border-border bg-card px-2 py-1.5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
              role="toolbar"
              aria-label="Article formatting"
            >
              <select
                aria-label="Text style"
                defaultValue="p"
                onChange={(event) => {
                  block(event.target.value);
                  event.target.value = "p";
                }}
                className="h-8 shrink-0 rounded border border-input bg-card px-2 text-xs font-medium text-navy"
              >
                <option value="p">Paragraph</option>
                <option value="h2">Heading 2</option>
                <option value="h3">Heading 3</option>
              </select>
              {sep}
              {(["H1", "H2", "H3", "H4"] as const).map((h) => (
                <Button
                  key={h}
                  type="button"
                  variant="ghost"
                  size="sm"
                  title={`Heading ${h.slice(1)}`}
                  onClick={() => block(h.toLowerCase())}
                  className="h-8 shrink-0 px-2 text-sm font-semibold text-navy hover:bg-sky-soft"
                >
                  {h}
                </Button>
              ))}
              {sep}
              <Tool label="Bold" onClick={() => replaceSelection("**", "**", "bold text")}>
                <Bold className="h-4 w-4" />
              </Tool>
              <Tool label="Italic" onClick={() => replaceSelection("*", "*", "italic text")}>
                <Italic className="h-4 w-4" />
              </Tool>
              <Tool
                label="Underline"
                onClick={() => replaceSelection("__", "__", "underlined text")}
              >
                <Underline className="h-4 w-4" />
              </Tool>
              <Tool
                label="Strikethrough"
                onClick={() => replaceSelection("~~", "~~", "struck text")}
              >
                <Strikethrough className="h-4 w-4" />
              </Tool>
              {sep}
              <Tool label="Align left" onClick={() => align("left")}>
                <AlignLeft className="h-4 w-4" />
              </Tool>
              <Tool label="Align center" onClick={() => align("center")}>
                <AlignCenter className="h-4 w-4" />
              </Tool>
              <Tool label="Align right" onClick={() => align("right")}>
                <AlignRight className="h-4 w-4" />
              </Tool>
              {sep}
              <Tool label="Bullet list" onClick={() => replaceSelection("\n- ", "", "List item")}>
                <List className="h-4 w-4" />
              </Tool>
              <Tool
                label="Numbered list"
                onClick={() => replaceSelection("\n1. ", "", "List item")}
              >
                <ListOrdered className="h-4 w-4" />
              </Tool>
              <Tool label="Quote" onClick={() => replaceSelection("\n> ", "", "Quote")}>
                <Quote className="h-4 w-4" />
              </Tool>
              {sep}
              <Tool label="Link" onClick={link}>
                <Link2 className="h-4 w-4" />
              </Tool>
              <Tool label="Image" onClick={() => insertImages(false)}>
                <Image className="h-4 w-4" />
              </Tool>
              <Tool label="Video" onClick={video}>
                <PlaySquare className="h-4 w-4" />
              </Tool>
              <Tool label="Table" onClick={table}>
                <Table2 className="h-4 w-4" />
              </Tool>
              <Tool label="Inline code" onClick={() => replaceSelection("`", "`", "code")}>
                <Code2 className="h-4 w-4" />
              </Tool>
              {sep}
              <Tool label="Undo" onClick={() => history("undo")}>
                <Undo2 className="h-4 w-4 text-muted-foreground" />
              </Tool>
              <Tool label="Redo" onClick={() => history("redo")}>
                <Redo2 className="h-4 w-4 text-muted-foreground" />
              </Tool>
              {sep}
              <Tool label="Divider" onClick={() => replaceSelection("\n\n---\n\n", "", "")}>
                <MoreHorizontal className="h-4 w-4" />
              </Tool>
              <Button
                type="button"
                variant="ghost"
                size="icon"
                title={full ? "Exit full screen" : "Full screen"}
                aria-label={full ? "Exit full screen" : "Full screen"}
                onClick={() => setFull(!full)}
                className="ml-auto h-8 w-8 shrink-0 text-navy hover:bg-sky-soft"
              >
                {full ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
            </div>
            <div className="relative">
              <Textarea
                ref={ref}
                required
                value={value}
                onChange={(event) => onChange(event.target.value)}
                onPaste={handlePaste}
                placeholder="Start writing your article here..."
                className={`${full ? "min-h-[75vh]" : minHeight} w-full resize-y rounded-none border-0 bg-card px-5 py-4 pb-9 text-sm leading-6 text-foreground shadow-none focus-visible:ring-0`}
                aria-label="Article content"
              />
              <span className="pointer-events-none absolute bottom-3 right-4 text-xs text-muted-foreground">
                Word count: {countWords(value)}
              </span>
            </div>
          </>
        ) : (
          <div
            className={`${full ? "min-h-[75vh]" : minHeight} overflow-y-auto bg-card px-5 py-6`}
            role="tabpanel"
            aria-label="Article live preview"
          >
            <ArticleBody content={value} preview />
          </div>
        )}
      </div>
      <p className="mt-2 text-[14px] text-muted-foreground">
        Tip: Use headings, paragraphs, images, lists and quotes to make your article more engaging.
        Formatting pasted from ChatGPT, Claude, Google Docs or Word is kept.
      </p>
      <p className="mt-5 text-xs font-bold text-navy">Insert Media</p>
      <div className="mt-2 grid grid-cols-3 gap-2 lg:grid-cols-[minmax(0,2.4fr)_repeat(6,minmax(0,1fr))]">
        <Button
          type="button"
          variant="outline"
          onClick={() => insertImages(false)}
          onDragOver={(event) => event.preventDefault()}
          onDrop={handleDrop}
          className="col-span-3 h-auto justify-center gap-3 border-dashed bg-card p-4 text-left hover:border-primary lg:col-span-1"
        >
          <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-primary-soft text-primary">
            <UploadCloud className="h-6 w-6" />
          </span>
          <span>
            <span className="block text-xs font-medium text-navy">
              Drag & drop images here, or click to upload
            </span>
            <span className="block text-[13px] text-muted-foreground">
              HTTPS image links — JPG, PNG, WebP
            </span>
          </span>
        </Button>
        {media.map(({ label, icon: Icon, action }) => (
          <Button
            key={label}
            type="button"
            variant="outline"
            onClick={action}
            className="h-auto flex-col gap-1.5 bg-card p-3 text-[14px] text-muted-foreground hover:border-primary hover:text-primary"
          >
            <Icon className="h-4 w-4 text-navy" />
            {label}
          </Button>
        ))}
      </div>
    </div>
  );
}
