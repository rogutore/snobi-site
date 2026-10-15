/* Supply-chain photos — the one list every page reads (owner 2026-10-15: "lock it in"). Decisions live in
   origin-media.json; files and sizes come from scripts/export-origin-media.py. The rules below are checked when the
   module loads, so a photo that breaks one stops the build instead of reaching a page. Rules: DESIGN.md › Imagery. */
import data from "./origin-media.json";
import sizes from "../public/origin-media/sizes.json";
import { products, type Locale, type Localized } from "./products";

export type OriginPhoto = {
  id: string;
  origin: (typeof products)[number]["slug"];
  supplier: keyof typeof data.suppliers;
  small?: boolean;
  caption: Localized;
  product: 1 | 2 | 3 | null;
  journal: string[];
  amazon: "slot8" | "aplus" | null;
  width: number;
  height: number;
};

const QUALITY_PX = 1600; // long edge, unless `small`
const LIMIT = { product: 3, journal: 4, amazon: 2 } as const;

const photos: OriginPhoto[] = data.photos.map((p) => {
  const size = (sizes as Record<string, number[]>)[p.id];
  if (!size) throw new Error(`origin-media: ${p.id} has no exported file; run scripts/export-origin-media.py`);
  if (!products.some((c) => c.slug === p.origin)) throw new Error(`origin-media: ${p.id} names no product "${p.origin}"`);
  if (!(p.supplier in data.suppliers)) throw new Error(`origin-media: ${p.id} names no supplier "${p.supplier}"`);
  if (!p.small && Math.max(...size) < QUALITY_PX) throw new Error(`origin-media: ${p.id} is under ${QUALITY_PX}px`);
  return { ...p, width: size[0], height: size[1] } as OriginPhoto;
});

for (const c of products) {
  const mine = photos.filter((p) => p.origin === c.slug);
  const slots = mine.map((p) => p.product).filter((s) => s !== null);
  if (new Set(slots).size !== slots.length) throw new Error(`origin-media: ${c.slug} uses a product slot twice`);
  if (slots.length > LIMIT.product) throw new Error(`origin-media: ${c.slug} has more than ${LIMIT.product} product photos`);
  if (slots.length && !slots.includes(1)) throw new Error(`origin-media: ${c.slug} has product photos but no lead (1)`);
  const amazon = mine.map((p) => p.amazon).filter((s) => s !== null);
  if (new Set(amazon).size !== amazon.length || amazon.length > LIMIT.amazon) throw new Error(`origin-media: ${c.slug} Amazon slots`);
}
for (const post of new Set(photos.flatMap((p) => p.journal))) {
  if (photos.filter((p) => p.journal.includes(post)).length > LIMIT.journal) throw new Error(`origin-media: ${post} has more than ${LIMIT.journal} photos`);
}

/** Product-page photos for one origin, lead first (0–3). */
export const productPhotos = (slug: string) =>
  photos.filter((p) => p.origin === slug && p.product !== null).sort((a, b) => (a.product ?? 0) - (b.product ?? 0));

/** A journal photo by id; throws unless the list allows it in that post. */
export function journalPhoto(id: string, postSlug: string): OriginPhoto {
  const p = photos.find((x) => x.id === id);
  if (!p || !p.journal.includes(postSlug)) throw new Error(`origin-media: "${id}" is not approved for journal/${postSlug}`);
  return p;
}

export const photoCredit = (p: OriginPhoto, lang: Locale) => data.suppliers[p.supplier].credit[lang];
export const photoSrc = (p: OriginPhoto, size: "s" | "l") => `/origin-media/${p.id}-${size}.webp`;
export const photoSrcSet = (p: OriginPhoto) => `${photoSrc(p, "s")} ${Math.min(800, p.width)}w, ${photoSrc(p, "l")} ${p.width}w`;
