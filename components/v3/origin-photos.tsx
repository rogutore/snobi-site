/* Supply-chain photos on an origin page: the lead, then up to two beside it (content/origin-media.ts). Nothing is
   rendered when an origin has none — no filler (owner 2026-10-15). Captions sit under the photos, never on them.
   No visible 「写真提供：」 credit (owner 2026-10-19); supplier, permission and credit wording stay in content/origin-media.json. */
import type { Locale } from "@/content/products";
import { productPhotos, photoSrc, photoSrcSet, type OriginPhoto } from "@/content/origin-media";
import "./origin-photos.css";

function Figure({ p, lang, sizes }: { p: OriginPhoto; lang: Locale; sizes: string }) {
  return (
    <figure>
      {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
      <img src={photoSrc(p, "l")} srcSet={photoSrcSet(p)} sizes={sizes} width={p.width} height={p.height} alt={p.caption[lang]} loading="lazy" decoding="async" />
      <figcaption className={lang === "ja" ? "t-ja-note" : "t-label"}>
        {p.caption[lang]}
      </figcaption>
    </figure>
  );
}

export function OriginPhotos({ slug, lang }: { slug: string; lang: Locale }) {
  const [lead, ...rest] = productPhotos(slug);
  if (!lead) return null;
  return (
    <div className={`v3-ophotos${rest.length ? "" : " solo"}${lead.small ? " small" : ""}`}>
      <Figure p={lead} lang={lang} sizes={rest.length ? "(min-width: 820px) 60vw, 100vw" : "(min-width: 820px) 40vw, 100vw"} />
      {rest.length ? <div className="side">{rest.map((p) => <Figure key={p.id} p={p} lang={lang} sizes="(min-width: 820px) 30vw, 50vw" />)}</div> : null}
    </div>
  );
}
