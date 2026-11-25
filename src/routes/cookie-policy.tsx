import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { cookieSections } from "@/lib/legal-content";

const description =
  "Understand how Webgram IT Solution uses essential, analytics and advertising cookies, including Google AdSense on blog pages.";
export const Route = createFileRoute("/cookie-policy")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, follow" },
      { title: "Cookie Policy | Webgram IT Solution" },
      { name: "description", content: description },
      { property: "og:title", content: "Cookie Policy | Webgram IT Solution" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://webgramitsolution.in/cookie-policy" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: CookiePolicyPage,
});
function CookiePolicyPage() {
  return (
    <LegalPage
      eyebrow="Privacy choices"
      title="Cookie Policy"
      summary={description}
      updated="2 October 2026"
      sections={cookieSections}
    />
  );
}
