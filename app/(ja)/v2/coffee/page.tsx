import Link from "next/link";
import { getStock } from "@/lib/shopify/client";
import { products } from "@/content/products";
import { originFrames, ordering } from "@/content/v2";
import { Photo } from "@/components/v2/photo";
import { Buy } from "@/components/v2/buy";

export const dynamic = "force-dynamic";

export default async function Coffee() {
  const { stock } = await getStock();
  return (
    <>
      <section className="v2-band dark" aria-labelledby="c-h1">
        <Photo id="037" alt="斜めの日差しの中、机に並ぶ4つの袋" priority sizes="100vw" />
        <div className="v2-band-copy left" style={{ top: "30%" }}>
          <p className="t-eyebrow">Chapter One — 4 origins</p>
          <h1 id="c-h1" className="t-ja-display">4つの産地、4つの個性。すべてオーガニック。</h1>
        </div>
      </section>

      <section className="v2-sec" aria-label="4つを比べる">
        <div className="v2-wrap v2-stack" style={{ gap: "2rem" }}>
          <p className="t-ja-note v2-soft">横にスクロールして、4つを並べて比べられます。</p>
          <div className="v2-compare">
            {products.map((p) => (
              <article className="v2-col" key={p.slug} aria-labelledby={`col-${p.slug}`}>
                <Link href={`/v2/origins/${p.slug}`} aria-label={`${p.title.ja}の産地ページへ`}>
                  <Photo id={originFrames[p.slug].studio} alt={`${p.title.ja}の袋`} sizes="(min-width:1000px) 23vw, 70vw" />
                </Link>
                <h2 id={`col-${p.slug}`} className="t-ja-heading" style={{ fontSize: "var(--text-step-1)" }}>{p.title.ja}</h2>
                <dl className="v2-rows">
                  <div><dt>NOTES</dt><dd className="v2-notes" style={{ color: "var(--color-ink)" }}>{p.notes.ja.join(" · ")}</dd></div>
                  <div><dt>こんな人に</dt><dd className="t-ja-note">{p.bestFor.ja}</dd></div>
                  <div className="big"><dt>ALTITUDE</dt><dd>{p.elevation}</dd></div>
                  <div><dt>PROCESS</dt><dd>{p.process.ja}</dd></div>
                  <div><dt>VARIETY</dt><dd>{p.variety.ja}</dd></div>
                  <div><dt>ROAST</dt><dd>{p.roast ? p.roast.ja : <span className="v2-todo">確認中</span>}</dd></div>
                  <div><dt>BREW</dt><dd><span className="v2-todo">レシピ準備中</span></dd></div>
                </dl>
                <Buy product={p} stock={stock} compact />
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="v2-sec v2-alt">
        <div className="v2-wrap v2-nums">
          {["豆のまま", "100g / 200g", ordering.free, `${ordering.roast} · ${ordering.cutoff} · ${ordering.ship}`].map((t) => (
            <div className="v2-num" key={t}><span style={{ fontSize: "var(--text-step-0)", color: "var(--color-ink)", fontFamily: "var(--font-sans)" }}>{t}</span></div>
          ))}
        </div>
      </section>
    </>
  );
}
