export const BLOG_CATEGORY_PREVIEW_LIMIT = 8;
export function categoryPreviewPosts<T>(posts: T[], expanded: boolean): T[] {
  return expanded ? posts : posts.slice(0, BLOG_CATEGORY_PREVIEW_LIMIT);
}
