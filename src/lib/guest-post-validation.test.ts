import { it } from "node:test";
import assert from "node:assert/strict";
import { guestPostIssues } from "./guest-post-validation";
const valid = { title: "Guest article title", excerpt: "A helpful short summary.", content: Array(400).fill("business").join(" "), category: "category", subcategory: "child", tags: "commerce", image: "", author: "Guest", seoTitle: "A helpful meta title", seoDescription: "A helpful description about ecommerce for growing businesses.", faqs: Array.from({ length: 5 }, () => ({ question: "What is ecommerce?", answer: "Selling products online." })) };
it("accepts exactly 400 words", () => assert.deepEqual(guestPostIssues(valid), []));
it("rejects 399 words even with an image URL", () => assert.ok(guestPostIssues({ ...valid, content: Array(399).fill("business").join(" ") + "\n![Image](https://example.com/image.jpg)" }).some((message) => message.includes("400 words"))));
it("allows one external URL plus HTTPS images", () => {
  assert.deepEqual(guestPostIssues({ ...valid, content: valid.content + "\n![Image](https://example.com/image.jpg)" }), []);
  assert.deepEqual(guestPostIssues({ ...valid, content: valid.content + "\n[Link](https://example.com)\n![Image](https://example.com/image.jpg)" }), []);
});
it("rejects two outbound URLs including repeated destinations", () => assert.ok(guestPostIssues({ ...valid, content: valid.content + " https://example.com https://example.com" }).some((m) => m.includes("one external URL"))));
it("counts URLs across excerpt and article", () => assert.ok(guestPostIssues({ ...valid, excerpt: "Source https://example.com", content: valid.content + " https://other.com" }).some((m) => m.includes("one external URL"))));
it("rejects unsafe links", () => assert.ok(guestPostIssues({ ...valid, content: valid.content + " [bad](javascript:alert)" }).some((m) => m.includes("unsafe links"))));
it("reports incomplete FAQs", () => assert.ok(guestPostIssues({ ...valid, faqs: [] }).some((message) => message.includes("five FAQ"))));