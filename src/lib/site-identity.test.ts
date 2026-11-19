import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { businessIdentity, publicPageSchema, SITE_URL } from "./site-identity";
import { servicePageSchema } from "./schema";
import { readFileSync } from "node:fs";

describe("public business identity", () => {
  it("uses only the canonical business domain in page identity", () => {
    assert.equal(SITE_URL, "https://webgramitsolution.in");
    const script = publicPageSchema("/about", "About", "Business information", "AboutPage")[0];
    if (!script) throw new Error("Expected page schema");
    const page = JSON.parse(script.children);
    assert.equal(page.url, "https://webgramitsolution.in/about");
    assert.equal(page.about["@id"], "https://webgramitsolution.in/#business");
  });
  it("does not assert fixed prices or ratings without evidence", () => {
    assert.equal("aggregateRating" in businessIdentity, false);
    assert.equal("priceRange" in businessIdentity, false);
    const service = servicePageSchema("services", "Services", "shopify", { title: "Shopify", description: "Shopify development", points: ["Store setup"] }).map(s => JSON.parse(s.children));
    assert.deepEqual(service.map(s => s["@type"]), ["Service", "BreadcrumbList"]);
    assert.equal(service[1].itemListElement.length, 2);
    assert.equal(service[0].provider["@id"], businessIdentity["@id"]);
  });
  it("allows search discovery and blocks listed training crawlers", () => {
    const robots = readFileSync(new URL("../../public/robots.txt", import.meta.url), "utf8");
    const groups = robots.split(/\n\s*\n/);
    const wildcard = groups.find(group => group.includes("User-agent: *\n"));
    assert.ok(wildcard);
    for (const path of ["/admin", "/guest", "/auth", "/api/", "/_serverFn/"]) {
      assert.ok(wildcard.split("\n").includes(`Disallow: ${path}`), path);
    }
    for (const bot of ["GPTBot", "ClaudeBot", "Google-Extended"]) {
      const group = groups.find(value => value.includes(`User-agent: ${bot}\n`));
      assert.ok(group?.split("\n").includes("Disallow: /"), bot);
    }
    assert.ok(!/User-agent: (OAI-SearchBot|PerplexityBot)/.test(robots));
    assert.ok(robots.includes(`Sitemap: ${SITE_URL}/sitemap.xml`));
  });
});
