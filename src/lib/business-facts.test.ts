import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { businessIdentity } from "./site-identity";
import { trustFacts } from "./trust-facts";
import { contactFaqQuestions, pickFaqs } from "./faq-content";
import { shopifyFaqs } from "./shopify-content";

describe("business facts", () => {
  it("uses 2022 as the founding year", () => {
    assert.equal(businessIdentity.foundingDate, "2022");
  });
  it("publishes only the one real phone number", () => {
    assert.equal(businessIdentity.telephone, "+917551120242");
    assert.ok(!JSON.stringify(businessIdentity).includes("7942826612"));
  });
  it("service CTA facts show client work since 2022 and Mon–Sat support, not invented counts", () => {
    const text = JSON.stringify(trustFacts);
    assert.ok(text.includes("Since 2022"));
    assert.ok(text.includes("Mon–Sat"));
    for (const claim of ["12+", "200+", "98%", "24/7", "500+", "99.9%"])
      assert.ok(!text.includes(claim), claim);
  });
  it("Contact page shows eight real FAQ answers, no placeholder", () => {
    const faqs = pickFaqs(contactFaqQuestions);
    assert.equal(faqs.length, 8);
    for (const [, answer] of faqs)
      assert.ok(!answer.includes("Contact our team for a detailed answer"));
  });
  it("Shopify page has eight FAQs and quotes the supplied 4 to 8 week ecommerce timeline", () => {
    assert.equal(shopifyFaqs.length, 8);
    assert.ok(shopifyFaqs[0]?.[1].includes("4 to 8 weeks"));
  });
});
