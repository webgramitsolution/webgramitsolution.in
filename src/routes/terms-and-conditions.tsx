import { createFileRoute } from "@tanstack/react-router";
import { LegalPage } from "@/components/legal-page";
import { termsSections } from "@/lib/legal-content";

const description = "Terms governing use of the Webgram IT Solution website, enquiries, guest content and professional digital services.";
export const Route = createFileRoute("/terms-and-conditions")({ head: () => ({ meta: [{ name: "robots", content: "noindex, follow" }, { title: "Terms & Conditions | Webgram IT Solution" }, { name: "description", content: description }, { property: "og:title", content: "Terms & Conditions | Webgram IT Solution" }, { property: "og:description", content: description }, { property: "og:type", content: "website" }, { property: "og:url", content: "https://webgramitsolution.in/terms-and-conditions" }, { name: "twitter:card", content: "summary" }] }), component: TermsPage });
function TermsPage() { return <LegalPage eyebrow="Legal" title="Terms & Conditions" summary={description} updated="2 October 2026" sections={termsSections} />; }