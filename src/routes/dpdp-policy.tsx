import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { dpdpSections } from "@/lib/legal-content";

const title = "DPDP Policy | Webgram IT Solution";
const description =
  "Read how Webgram IT Solution handles digital personal data under India's Digital Personal Data Protection Act, 2023 and applicable rules.";
const url = "https://webgramitsolution.in/dpdp-policy";

export const Route = createFileRoute("/dpdp-policy")({
  head: () => ({
    meta: [
      { title },
      { name: "description", content: description },
      { name: "robots", content: "noindex, follow" },
      { property: "og:title", content: title },
      { property: "og:description", content: description },
      { property: "og:type", content: "website" },
      { property: "og:url", content: url },
      { name: "twitter:card", content: "summary" },
    ],
    links: [{ rel: "canonical", href: url }],
  }),
  component: DpdpPolicyPage,
});

function DpdpPolicyPage() {
  return (
    <LegalPage
      eyebrow="India Data Protection"
      title="Digital Personal Data Protection Policy"
      summary={description}
      updated="2 October 2026"
      sections={dpdpSections}
    />
  );
}
