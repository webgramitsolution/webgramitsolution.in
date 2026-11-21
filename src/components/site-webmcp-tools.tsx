import { useNavigate } from "@tanstack/react-router";
import { useWebMCP } from "use-webmcp-tool";
import { portfolio } from "@/lib/portfolio";
import { businessIdentity } from "@/lib/site-identity";
import { runWebMCPTool } from "@/lib/webmcp-telemetry";

const PAGES = {
  ecommerce: "/solutions/ecommerce-development",
  b2b: "/solutions/b2b-commerce",
  portfolio: "/work/portfolio",
  faqs: "/resources/faqs",
  blog: "/blog",
  contact: "/contact",
  about: "/about",
} as const;
type PageKey = keyof typeof PAGES;

/** Browser-local, read-only and navigation tools for in-browser AI agents. */
export function SiteWebMCPTools() {
  const navigate = useNavigate();

  useWebMCP({
    name: "get_business_info",
    description: "Get Webgram IT Solution's contact details, services, service areas and opening hours.",
    annotations: { readOnlyHint: true },
    execute: () =>
      runWebMCPTool("get_business_info", () =>
        [
          `${businessIdentity.name} — ${businessIdentity.description}`,
          `Phone: ${businessIdentity.telephone}`,
          `Email: ${businessIdentity.email}`,
          "Hours: Monday to Saturday, 10:00–19:00 IST",
          "Areas: Delhi, Noida, Gurugram, Faridabad, Delhi NCR and across India",
          "Pricing: quoted per project after a requirement call.",
        ].join("\n"),
      ),
  });

  useWebMCP({
    name: "list_portfolio",
    description: "List live client websites built by Webgram IT Solution with sector and location.",
    annotations: { readOnlyHint: true },
    execute: () =>
      runWebMCPTool("list_portfolio", () =>
        portfolio.map((p) => `${p.name} (${p.category}, ${p.location}): ${p.url}`).join("\n"),
      ),
  });

  useWebMCP({
    name: "open_page",
    description: "Open a key page of the site: ecommerce, b2b, portfolio, faqs, blog, contact or about.",
    inputSchema: {
      type: "object",
      properties: {
        page: { type: "string", enum: Object.keys(PAGES), description: "Which page to open." },
      },
      required: ["page"],
    },
    execute: ({ page }: { page: PageKey }) =>
      runWebMCPTool("open_page", async () => {
        if (typeof page !== "string" || !(page in PAGES)) {
          throw new Error(`Unknown page; expected one of ${Object.keys(PAGES).join(", ")}.`);
        }
        await navigate({ href: PAGES[page] });
        return `Opened ${page} page.`;
      }),
  });

  return null;
}
