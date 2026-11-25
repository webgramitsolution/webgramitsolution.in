import { it } from "node:test";
import assert from "node:assert/strict";
import { articlePreviewBlockCount, articleAdBoundaries } from "./article-disclosure";

it("initially reveals 5 percent of article blocks", () => {
  assert.equal(articlePreviewBlockCount(100), 5);
  assert.equal(articlePreviewBlockCount(20), 1);
  assert.equal(articlePreviewBlockCount(10), 1);
});
it("keeps incomplete boundary blocks intact", () => {
  assert.equal(articlePreviewBlockCount(6), 1);
  assert.equal(articlePreviewBlockCount(0), 0);
});

it("adds six separated content placements on phones while keeping four on desktop", () => {
  assert.deepEqual(articleAdBoundaries(70, true), [9, 19, 29, 39, 49, 59]);
  assert.deepEqual(articleAdBoundaries(70, false), [13, 27, 41, 55]);
});

it("does not stack multiple advertisements at one boundary in short articles", () => {
  assert.deepEqual(articleAdBoundaries(2, true), [0, 1]);
  assert.deepEqual(articleAdBoundaries(0, true), []);
});
