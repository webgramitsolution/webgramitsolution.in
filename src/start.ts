import { createStart, createCsrfMiddleware, createMiddleware } from "@tanstack/react-start";

import { renderErrorPage } from "./lib/error-page";
// Replaces the generated attachSupabaseAuth with an equivalent that loads the client on demand.
import { attachSupabaseAuthLazily } from "@/lib/lazy-auth-attacher";

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

// Agents asking for Markdown get the llms.txt summary; HTML homepage advertises it via Link header.
const agentMiddleware = createMiddleware().server(async ({ request, next }) => {
  const url = new URL(request.url);
  if ((request.method === "GET" || request.method === "HEAD") && /^\/(ae|kw)\/?$/.test(url.pathname)) {
    return new Response(null, { status: 301, headers: { location: "/" } });
  }
  if (url.pathname !== "/") return next();
  const link = '</llms.txt>; rel="describedby"; type="text/markdown", </llms-full.txt>; rel="alternate"; type="text/markdown"';
  if ((request.headers.get("accept") || "").includes("text/markdown")) {
    return new Response(null, { status: 302, headers: { location: "/llms.txt", link, vary: "Accept" } });
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
  functionMiddleware: [attachSupabaseAuthLazily],
  requestMiddleware: [errorMiddleware, agentMiddleware, csrfMiddleware],
}));
