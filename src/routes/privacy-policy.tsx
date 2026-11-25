import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { privacySections } from "@/lib/legal-content";

const description =
  "Learn how Webgram IT Solution collects, uses, protects and manages personal information submitted through its website and services.";

export const Route = createFileRoute("/privacy-policy")({
  head: () => ({
    meta: [
      { name: "robots", content: "noindex, follow" },
      { title: "Privacy Policy | Webgram IT Solution" },
      { name: "description", content: description },
      { property: "og:title", content: "Privacy Policy | Webgram IT Solution" },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://webgramitsolution.in/privacy-policy" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: PrivacyPolicyPage,
});

function PrivacyPolicyPage() {
  return (
    <LegalPage
      eyebrow="Legal"
      title="Privacy Policy"
      summary={description}
      updated="2 October 2026"
      sections={privacySections}
    />
  );
}
