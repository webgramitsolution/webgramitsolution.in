import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { disclaimerSections } from "@/lib/legal-content";

const description = "Important information about Webgram IT Solution website content, professional advice, results, external links and advertising.";
export const Route = createFileRoute("/disclaimer")({ head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }, { title: "Disclaimer | Webgram IT Solution" }, { name: "description", content: description }, { property: "og:title", content: "Disclaimer | Webgram IT Solution" }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: "https://webgramitsolution.in/disclaimer" }, { name: "twitter:card", content: "summary" }] }), component: DisclaimerPage });
function DisclaimerPage() { return <LegalPage eyebrow="Legal" title="Website Disclaimer" summary={description} updated="2 October 2026" sections={disclaimerSections} />; }