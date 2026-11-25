type Candidate = {
  id: string;
  slug: string;
  category_id: string | null;
  tags: string[];
  published_at: string | null;
};

// Prefer the same category, then shared tags, then the latest published update.
export function selectArticleRecommendations<T extends Candidate>(
  posts: T[],
  current: { id: string; category_id: string | null; tags: string[]; content: string },
): T[] {
  const linkedSlugs = new Set(
    Array.from(current.content.matchAll(/\/blog\/([^\s)#?]+)/g), (match) =>
      decodeURIComponent(match[1] ?? ""),
    ),
  );
  const seen = new Set<string>();
  return posts
    .filter((post) => {
      if (post.id === current.id || seen.has(post.slug) || linkedSlugs.has(post.slug)) return false;
      seen.add(post.slug);
      return true;
    })
    .sort((a, b) => {
      const score = (post: T) =>
        (current.category_id && post.category_id === current.category_id ? 100 : 0) +
        post.tags.filter((tag) => current.tags.includes(tag)).length;
      return score(b) - score(a) || (b.published_at ?? "").localeCompare(a.published_at ?? "");
    })
    .slice(0, 2);
}
