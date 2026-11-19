import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { categoryPreviewPosts } from "./blog-listing";
describe("blog category previews", () => {
  const posts = Array.from({ length: 14 }, (_, index) => index);
  it("shows eight posts in each category overview", () => {
    assert.deepEqual(categoryPreviewPosts(posts, false), [0, 1, 2, 3, 4, 5, 6, 7]);
  });
  it("keeps all posts accessible when a category is expanded", () => {
    assert.deepEqual(categoryPreviewPosts(posts, true), posts);
  });
});