/** Keep complete Markdown blocks intact when revealing the first five percent. */
export function articlePreviewBlockCount(total: number): number {
  return Math.max(0, Math.ceil(total * 0.05));
}

export function articleAdBoundaries(total: number, phone: boolean): number[] {
  const count = Math.min(Math.max(0, total), phone ? 6 : 4);
  return Array.from({ length: count }, (_, index) =>
    Math.max(0, Math.ceil((total * (index + 1)) / (count + 1)) - 1),
  );
}
