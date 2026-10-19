/* v2 preview: one shoot photo with its caption (the "second voice": what · where · who).
   Files come from scripts/export-v2-photos.py; sizes are read from its manifest, never typed. */
import manifest from "@/public/v2/photos/manifest.json";

type Frame = keyof typeof manifest;

/** The srcset for one shoot photo, from the manifest: -l is the exported width, -s exactly half (checked for all files). */
export function shotSrcSet(id: string) {
  const dims = manifest[id as Frame] as [number, number] | undefined;
  if (!dims) throw new Error(`v2 photo ${id} is not exported (scripts/export-v2-photos.py)`);
  return `/v2/photos/${id}-s.webp ${dims[0] / 2}w, /v2/photos/${id}-l.webp ${dims[0]}w`;
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
  const dims = manifest[id as Frame] as [number, number] | undefined;
  if (!dims) throw new Error(`v2 photo ${id} is not exported (scripts/export-v2-photos.py)`);
  const [w, h] = dims;
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
