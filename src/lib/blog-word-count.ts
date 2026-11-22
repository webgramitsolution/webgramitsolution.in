import type { BlogFaq } from "./blog-faqs";

export function blogWordCount(content: string, faqs: BlogFaq[] = []) {
  const text = content.replace(/^!\[[^\]]*\]\([^)]+\)$/gm, "").replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
  const fullText = [text, ...faqs.flatMap(({ question, answer }) => [question, answer])].join(" ");
  return fullText.match(/[\p{L}\p{N}]+(?:[’'-][\p{L}\p{N}]+)*/gu)?.length ?? 0;
}
