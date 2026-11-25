export type BlogFaq = { question: string; answer: string };

const clean = (value: unknown) =>
  typeof value === "string" ? value.replace(/\s+/g, " ").trim() : "";

/** One normaliser for visible article FAQs and their FAQPage schema, so both always match. */
export function normalizeBlogFaqs(raw: unknown): BlogFaq[] {
  if (!Array.isArray(raw)) return [];
  const seen = new Set<string>();
  const out: BlogFaq[] = [];
  for (const item of raw) {
    if (!item || typeof item !== "object" || Array.isArray(item)) continue;
    const question = clean((item as Record<string, unknown>)["question"]);
    const answer = clean((item as Record<string, unknown>)["answer"]);
    const key = question.toLowerCase();
    if (question.length < 5 || answer.length < 5 || seen.has(key)) continue;
    seen.add(key);
    out.push({ question, answer });
  }
  return out;
}

export function blogFaqSchema(faqs: BlogFaq[], url: string, websiteId: string, inLanguage = "en") {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "@id": `${url}#faq`,
    url,
    inLanguage,
    isPartOf: { "@id": websiteId },
    about: { "@id": `${url}#article` },
    mainEntity: faqs.map((faq, index) => ({
      "@type": "Question",
      "@id": `${url}#faq-${index + 1}`,
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}
