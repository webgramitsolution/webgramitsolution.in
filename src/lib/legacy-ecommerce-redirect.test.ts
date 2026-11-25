import { it } from "node:test";
import assert from "node:assert/strict";
import { LEGACY_ECOMMERCE_PATH, legacyEcommerceRedirect } from "./legacy-ecommerce-redirect";

const expected =
  "https://webgramitsolution.in/blog/professional-ecommerce-website-development-company-in-delhi-ncr-build-your-online-store-with-webgram-it-solution";

it("permanently redirects the old Delhi ecommerce article to its relevant article, not the homepage", () => {
  assert.equal(
    LEGACY_ECOMMERCE_PATH,
    "/boost-your-business-with-webgram-it-solution-the-leading-ecommerce-website-development-company-in-delhi",
  );
  for (const suffix of ["", "/"]) {
    const response = legacyEcommerceRedirect(
      new Request(`https://webgramitsolution.com${LEGACY_ECOMMERCE_PATH}${suffix}`),
    );
    assert.equal(response.status, 301);
    assert.equal(response.headers.get("Location"), expected);
  }
});

it("preserves campaign parameters for visits through old shared links", () => {
  const response = legacyEcommerceRedirect(
    new Request(
      `https://webgramitsolution.com${LEGACY_ECOMMERCE_PATH}?utm_source=referral&utm_campaign=ecommerce`,
    ),
  );
  assert.equal(
    response.headers.get("Location"),
    `${expected}?utm_source=referral&utm_campaign=ecommerce`,
  );
});

it("returns the same permanent destination without a body for HEAD requests", async () => {
  const response = legacyEcommerceRedirect(
    new Request(`https://webgramitsolution.com${LEGACY_ECOMMERCE_PATH}`, { method: "HEAD" }),
  );
  assert.equal(response.status, 301);
  assert.equal(response.headers.get("Location"), expected);
  assert.equal(await response.text(), "");
});
