import heroDimensions from "./location-hero-dimensions.json";

type HeroDimensions = { width: number; height: number; mediumWidth: number };
const locations: Record<string, HeroDimensions> = heroDimensions;

export function locationHeroVisual(slug: string) {
  const dimensions = locations[slug];
  if (!dimensions) return undefined;

  const base = `/images/location-heroes/${slug}`;
  const { width, height, mediumWidth } = dimensions;
  return {
    src: `${base}.webp`,
    mobile: `${base}-mobile.avif`,
    desktop: `${base}-${mediumWidth}.avif ${mediumWidth}w, ${base}-${width}.avif ${width}w`,
    sizes: `max(58vw, ${Math.ceil((348 * width) / height)}px)`,
    width,
    height,
  };
}
