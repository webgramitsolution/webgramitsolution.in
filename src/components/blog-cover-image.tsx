export function BlogCoverImage({
  src,
  alt,
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  className: string;
  priority?: boolean;
}) {
  const optimized = src.startsWith("/images/blog-covers/") && src.endsWith(".webp");
  const image = (
    <img
      src={src}
      alt={alt}
      className={className}
      loading={priority ? "eager" : "lazy"}
      fetchPriority={priority ? "high" : "auto"}
    />
  );
  if (!optimized) return image;

  const base = src.slice(0, -5);
  return (
    <picture className="contents">
      <source
        type="image/avif"
        srcSet={`${base}-480.avif 480w, ${base}-960.avif 960w, ${base}-1536.avif 1536w`}
        sizes={
          priority
            ? "(min-width: 1280px) 896px, calc(100vw - 2rem)"
            : "(min-width: 768px) 24vw, 48vw"
        }
      />
      {image}
    </picture>
  );
}
