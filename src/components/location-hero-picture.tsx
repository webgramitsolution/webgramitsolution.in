import { locationHeroVisual } from "@/lib/location-hero-visuals";

export function LocationHeroPicture({
  slug,
  fallback,
  alt,
}: {
  slug: string;
  fallback: { src: string; width: number; height: number };
  alt: string;
}) {
  const hero = locationHeroVisual(slug);
  const image = hero ?? fallback;
  const artwork = (
    <img
      src={image.src}
      alt={alt}
      width={image.width}
      height={image.height}
      fetchPriority="high"
      className="location-hero-image absolute inset-y-0 right-0 h-full w-full object-cover"
    />
  );

  if (!hero) return artwork;

  return (
    <picture className="location-hero-picture contents">
      <source media="(max-width: 767px)" type="image/avif" srcSet={hero.mobile} />
      <source type="image/avif" srcSet={hero.desktop} sizes={hero.sizes} />
      {artwork}
    </picture>
  );
}
