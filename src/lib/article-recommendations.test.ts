import { describe, it as test } from "node:test";
import assert from "node:assert/strict";
import { selectArticleRecommendations } from "./article-recommendations";

describe("automatic article recommendations", () => {
  const current = {
    id: "self",
    category_id: "commerce",
    tags: ["seo"],
    content: "[Existing](/blog/already-linked)",
  };
  const post = (
    id: string,
    category_id: string | null = "commerce",
    published_at = "2026-10-01",
  ) => ({ id, slug: id, category_id, published_at, tags: [] });
  test("excludes self, existing links and duplicate slugs", () => {
    const result = selectArticleRecommendations(
      [post("self"), post("already-linked"), post("unique"), post("unique"), post("second")],
      current,
    );
    assert.deepEqual(
      result.map((item) => item.slug),
      ["unique", "second"],
    );
  });
  test("prioritizes category then the latest update", () => {
    const result = selectArticleRecommendations(
      [post("other", "other", "2026-10-15"), post("old"), post("new", "commerce", "2026-10-10")],
      current,
    );
    assert.deepEqual(
      result.map((item) => item.slug),
      ["new", "old"],
    );
  });
  test("does not invent recommendations when no other posts exist", () => {
    assert.deepEqual(selectArticleRecommendations([post("self")], current), []);
  });
});
