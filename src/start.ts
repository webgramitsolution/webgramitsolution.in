import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import homepageMarkdown from "./lib/homepage.md?raw";
import { renderErrorPage } from "./lib/error-page";
const errorMiddleware = createMiddleware().server(async ({ next }) => {
  try {
    return await next();
  } catch (error) {
    if (error != null && typeof error === "object" && "statusCode" in error) {
      throw error;
    }
    console.error(error);
    return new Response(renderErrorPage(), {
      status: 500,
      headers: { "content-type": "text/html; charset=utf-8" },
    });
  }
});

function prefersMarkdown(accept: string): boolean {
  let markdown = 0;
  let html = 0;
  for (const entry of accept.split(",")) {
    const [media, ...parameters] = entry.trim().toLowerCase().split(";");
    const quality = parameters.map((value) => value.trim()).find((value) => value.startsWith("q="));
    const weight = quality === undefined ? 1 : Number(quality.slice(2));
    if (!(weight > 0 && weight <= 1)) continue;
    if (media.trim() === "text/markdown") markdown = Math.max(markdown, weight);
    if (media.trim() === "text/html" || media.trim() === "application/xhtml+xml") html = Math.max(html, weight);
  }
  return markdown > 0 && markdown >= html;
}

// Serve the Markdown variant at the same URL and keep it separate from cached HTML.
const agentMiddleware = createMiddleware().server(async ({ request, next }) => {
  const url = new URL(request.url);
  const isReadRequest = request.method === "GET" || request.method === "HEAD";
  if (isReadRequest && /^\/(ae|kw)\/?$/.test(url.pathname)) {
    return new Response(null, { status: 301, headers: { location: "/" } });
  }
  if (url.pathname !== "/" || !isReadRequest) return next();

  const link = '</llms.txt>; rel="describedby"; type="text/plain", </llms-full.txt>; rel="describedby"; type="text/plain"';
  if (prefersMarkdown(request.headers.get("accept") ?? "")) {
    return new Response(request.method === "HEAD" ? null : homepageMarkdown, {
      headers: { "Content-Type": "text/markdown; charset=utf-8", Link: link, Vary: "Accept" },
    });
  }
  const result = await next();
  try {
    const res = (result as unknown as { response?: Response }).response ?? (result as unknown as Response);
    res?.headers?.append?.("link", link);
    res?.headers?.append?.("vary", "Accept");
  } catch {
    // Immutable headers: skip the hint rather than fail the page.
  }
  return result;
});

// Start installs this automatically when src/start.ts is absent; defining the
// file opts out, so re-add it explicitly to keep server functions protected
// from cross-site requests.
const csrfMiddleware = createCsrfMiddleware({
  filter: (ctx) => ctx.handlerType === "serverFn",
});

export const startInstance = createStart(() => ({
  requestMiddleware: [errorMiddleware, agentMiddleware, csrfMiddleware],
}));
