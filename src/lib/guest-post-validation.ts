type GuestPostFields = { title: string; excerpt: string; content: string; category: string; subcategory: string; tags: string; image: string; author: string; seoTitle: string; seoDescription: string; faqs: { question: string; answer: string }[] };
export function guestArticleStats(content: string) {
  const withoutImages = content.replace(/!\[[^\]]*\]\(https:\/\/[^\s)]+\)/gi, " ");
  const links = (withoutImages.match(/https?:\/\/[^\s<>"')\]]+|www\.[^\s<>"')\]]+/gi) ?? []).length;
  const readable = withoutImages.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/https?:\/\/[^\s<>"')\]]+|www\.[^\s<>"')\]]+/gi, " ").replace(/[:*_[\]#>-]/g, " ").trim();
  return { words: readable ? readable.split(/\s+/).length : 0, links };
}
export function guestPostIssues(f: GuestPostFields): string[] {
  const issues: string[] = [];
  const { words } = guestArticleStats(f.content);
  const { links } = guestArticleStats(`${f.content}\n${f.excerpt}\n${f.title}`);
  if (f.title.trim().length < 3 || f.title.length > 180) issues.push("Post title must be between 3 and 180 characters.");
  if (f.excerpt.trim().length < 10 || f.excerpt.length > 500) issues.push("Add a post excerpt between 10 and 500 characters.");
  if (words < 400) issues.push(`Article needs at least 400 words (currently ${words}).`);
  if (links > 1) issues.push("Only one external URL is allowed across the title, excerpt and article; HTTPS images are allowed separately.");
  if (/<\/?[a-z][^>]*>|\]\(\s*(?:javascript|data|vbscript):/i.test(f.content)) issues.push("Use safe Markdown instead of HTML or unsafe links.");
  if (!f.category) issues.push("Choose a category.");
  if (!f.subcategory) issues.push("Choose a subcategory.");
  const tags = f.tags.split(",").map((tag) => tag.trim()).filter(Boolean);
  if (!tags.length || tags.length > 10) issues.push("Add between 1 and 10 tags.");
  if (f.faqs.length !== 5 || f.faqs.some((faq) => faq.question.trim().length < 5 || faq.answer.trim().length < 5)) issues.push("Complete all five FAQ questions and answers (at least 5 characters each).");
  if (f.seoTitle.trim().length < 10 || f.seoTitle.length > 180) issues.push("Meta title must be between 10 and 180 characters.");
  if (f.seoDescription.trim().length < 50 || f.seoDescription.length > 320) issues.push("Meta description must be between 50 and 320 characters.");
  if (f.image && !/^https:\/\/\S+$/i.test(f.image)) issues.push("Use a valid HTTPS featured image URL.");
  return issues;
}