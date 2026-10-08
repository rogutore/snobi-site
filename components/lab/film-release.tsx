import Image from "next/image";
import { products } from "@/content/products";
import type { StockMap } from "@/lib/shopify/client";
import { BuyCard } from "@/components/commerce/buy-card";
import styles from "./film.module.css";

/* Releases: one full-height spread per Chapter One coffee, tinted with the
   bag colour from content/products.ts. Copy is the live product copy; the
   buy row is the existing BuyCard in `detail` mode (needs CartProvider).
   Art is the held-bag photo per product from the 2026-10-01 Snobi shoot
   (public/photos/snobi, 1198×1800), keyed by product slug. */
const HAND_PHOTO: Record<string, string> = {
  peru: "/photos/snobi/peru-hand.webp",
  "ethiopia-guji": "/photos/snobi/ethiopia-hand.webp",
  "colombia-huila": "/photos/snobi/colombia-hand.webp",
  "mexico-chiapas-decaf": "/photos/snobi/mexico-hand.webp",
};

export function FilmRelease({ stock }: { stock: StockMap }) {
  return (
    <div id="releases">
      {products.map((p, i) => (
        <section
          key={p.handle}
          className={styles.release}
          style={{ background: p.color, color: p.ink }}
          aria-labelledby={`release-${p.slug}`}
        >
          <div className={styles.releaseInner}>
            <figure className={`${styles.releaseArt} ${styles.releasePhoto}`}>
              <Image
                src={HAND_PHOTO[p.slug]}
                alt={`${p.title.ja}の袋を手に`}
                width={1198}
                height={1800}
                sizes="(min-width: 900px) 50vw, 100vw"
              />
            </figure>
            <div>
              <p className={styles.eyebrow} style={{ color: "inherit" }}>
                第一章 — 0{i + 1}
                {p.decaf && " · DECAF"}
              </p>
              <h2 id={`release-${p.slug}`} className={styles.releaseCountry}>
                {p.country}
              </h2>
              <p className={styles.releaseTitle}>{p.title.ja}</p>
              <p className={styles.releaseNotes}>{p.notes.ja.join(" · ")}</p>
              <p className={styles.releaseBest}>{p.bestFor.ja}</p>
              <p className={styles.releaseBody}>{p.narrative.ja[0]}</p>
              <p className={styles.releaseFact}>{p.facts.ja[0]}</p>
              <div className={styles.releaseBuy}>
                <BuyCard product={p} index={i} lang="ja" stock={stock} detail />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}
