import assert from "node:assert/strict";
import { describe, it } from "node:test";

import { blogFaqSchema, normalizeBlogFaqs } from "./blog-faqs";

describe("blog FAQ schema", () => {
  it("drops empty, malformed and duplicate FAQs and trims spacing", () => {
    const faqs = normalizeBlogFaqs([
      { question: "  What is WooCommerce?  ", answer: "A WordPress\n store plugin." },
      { question: "what is woocommerce?", answer: "Duplicate question." },
      { question: "", answer: "No question" },
      "bad",
      null,
    ]);
    assert.deepEqual(faqs, [
      { question: "What is WooCommerce?", answer: "A WordPress store plugin." },
    ]);
  });
  it("schema lists exactly the visible questions and links to the article", () => {
    const url = "https://webgramitsolution.in/blog/sample";
    const schema = blogFaqSchema(
      [{ question: "What is SEO?", answer: "Search optimisation." }],
      url,
      "https://webgramitsolution.in/#website",
    );
    assert.equal(schema["@type"], "FAQPage");
    assert.equal(schema.mainEntity.length, 1);
    assert.equal(schema.mainEntity[0]?.name, "What is SEO?");
    assert.equal(schema.about["@id"], `${url}#article`);
  });
});
