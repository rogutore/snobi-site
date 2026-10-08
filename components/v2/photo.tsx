/* v2 preview: one shoot photo with its caption (the "second voice": what · where · who).
   Files come from scripts/export-v2-photos.py; sizes are read from its manifest, never typed. */
import manifest from "@/public/v2/photos/manifest.json";

type Frame = keyof typeof manifest;

export function Photo({
  id,
  alt,
  caption,
  sizes = "100vw",
  priority = false,
  className = "",
  position,
}: {
  id: string;
  alt: string;
  caption?: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  position?: string;
}) {
  const dims = manifest[id as Frame] as [number, number] | undefined;
  if (!dims) throw new Error(`v2 photo ${id} is not exported (scripts/export-v2-photos.py)`);
  const [w, h] = dims;
  const small = w > h ? 1000 : 700;
  return (
    <figure className={`v2-photo ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair, no runtime optimiser on Workers */}
      <img
        src={`/v2/photos/${id}-s.webp`}
        srcSet={`/v2/photos/${id}-s.webp ${small}w, /v2/photos/${id}-l.webp ${w}w`}
        sizes={sizes}
        width={w}
        height={h}
        alt={alt}
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : undefined}
        decoding="async"
        style={position ? { objectPosition: position } : undefined}
      />
      {caption ? <figcaption>{caption}</figcaption> : null}
    </figure>
  );
}
