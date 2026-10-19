/* v2 preview: one shoot photo with its caption (the "second voice": what · where · who).
   Files come from scripts/export-v2-photos.py; sizes are read from its manifest, never typed. */
import manifest from "@/public/v2/photos/manifest.json";

type Frame = keyof typeof manifest;

/* manifest: frame → [l width, l height, m width, t width, t height] (scripts/export-v2-photos.py). */
function dimsOf(id: string) {
  const dims = manifest[id as Frame] as [number, number, number, number, number] | undefined;
  if (!dims) throw new Error(`v2 photo ${id} is not exported (scripts/export-v2-photos.py)`);
  return dims;
}

/** The srcset for one shoot photo: -s is exactly half of -l (checked for all files), -m and -l widths from the manifest. */
export function shotSrcSet(id: string) {
  const [w, , m] = dimsOf(id);
  return `/v2/photos/${id}-s.webp ${w / 2}w, /v2/photos/${id}-m.webp ${m}w, /v2/photos/${id}-l.webp ${w}w`;
}

/** The thumbnail (short edge 240px) for boxes of about 80px, e.g. the buy bars and the gallery strip. */
export function shotThumb(id: string) {
  dimsOf(id);
  return `/v2/photos/${id}-t.webp`;
}

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
  const [w, h] = dimsOf(id);
  return (
    <figure className={`v2-photo ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair, no runtime optimiser on Workers */}
      <img
        src={`/v2/photos/${id}-s.webp`}
        srcSet={shotSrcSet(id)}
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
