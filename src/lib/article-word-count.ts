export function articleWordCount(content: string) {
  const withoutImages = content.replace(/!\[[^\]]*\]\(https:\/\/[^\s)]+\)/gi, " ");
  const readable = withoutImages.replace(/\[([^\]]*)\]\([^)]*\)/g, "$1").replace(/https?:\/\/[^\s<>"')\]]+|www\.[^\s<>"')\]]+/gi, " ").replace(/[:*_[\]#>-]/g, " ").trim();
  return readable ? readable.split(/\s+/).length : 0;
}
