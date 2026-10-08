import Link from "next/link";
import { getStock } from "@/lib/shopify/client";
import { products } from "@/content/products";
import { originFrames, ordering, SHOOT } from "@/content/v2";
import { Photo } from "@/components/v2/photo";
import { Buy } from "@/components/v2/buy";

export const dynamic = "force-dynamic";

export default async function Home() {
  const { stock } = await getStock();
  return (
    <>
      {/* 01 hero: the range in leaf-dappled sun; headline on the wall, never over a label */}
      <section className="v2-hero" aria-labelledby="v2-h1">
        <Photo id="130" alt="第一章の4つの袋とコーヒーのサーバー。木漏れ日の机の上" priority sizes="100vw" />
        <div className="v2-hero-copy">
          <p className="t-eyebrow v2-soft">Chapter One · Organic × Specialty</p>
          <h1 id="v2-h1" className="t-ja-hero">オーガニックのまま、<br />スペシャルティ。</h1>
          <a href="#releases" className="v2-btn">4つの産地から選ぶ</a>
        </div>
      </section>

      {/* 02 Organic. — proof on a real sack */}
      <section className="v2-sec">
        <div className="v2-wrap v2-split">
          <div className="v2-stack">
            <p className="t-display" lang="en">Organic.</p>
            <p className="t-ja-display">JAS有機認証の豆だけを、東京で焙煎。</p>
            <Link href="/v2/about#jas" className="v2-link">有機JASについて →</Link>
          </div>
          <div className="v2-pair">
            <Photo id="161" alt="有機JASとMayacertの表示がある生豆の麻袋" caption={`生豆の麻袋、有機JASの表示 — ${SHOOT}`} sizes="(min-width:860px) 34vw, 55vw" />
            <Photo id="160" alt="焙煎所の生豆の棚" caption="焙煎所の生豆庫" sizes="(min-width:860px) 26vw, 45vw" />
          </div>
        </div>
      </section>

      {/* 03 And actually specialty. — numbers as type, from products.ts */}
      <section className="v2-sec v2-alt">
        <div className="v2-wrap v2-stack" style={{ gap: "3rem" }}>
          <p className="t-display" lang="en"><em>And actually specialty.</em></p>
          <div className="v2-nums">
            {products.map((p) => (
              <div className="v2-num" key={p.slug}>
                <Link href={`/v2/origins/${p.slug}`}>
                  <b>{p.elevation}</b>
                </Link>
                <span>{p.title.ja}</span>
                <span>{p.variety.ja} · {p.process.ja}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 04 the four releases */}
      <section className="v2-sec" id="releases" aria-labelledby="rel-h">
        <div className="v2-wrap v2-stack" style={{ gap: "2.5rem" }}>
          <div className="v2-stack" style={{ gap: ".6rem" }}>
            <p className="t-eyebrow v2-soft">Chapter One — Organic coffee</p>
            <h2 id="rel-h" className="t-ja-display">4つの産地、4つの個性。すべてオーガニック。</h2>
          </div>
          <div className="v2-releases">
            {products.map((p) => {
              const f = originFrames[p.slug];
              return (
                <article className="v2-rel" key={p.slug} aria-labelledby={`rel-${p.slug}`}>
                  <Link href={`/v2/origins/${p.slug}`} className="v2-rel-img" aria-label={`${p.title.ja}の産地ページへ`}>
                    <Photo id={f.hero} alt={`${p.title.ja}の袋。葉の影の壁の前`} sizes="(min-width:1000px) 23vw, 46vw" />
                    <div className="v2-alt-img" aria-hidden><Photo id={f.hand} alt="" sizes="(min-width:1000px) 23vw, 46vw" /></div>
                  </Link>
                  <h3 id={`rel-${p.slug}`} className="t-ja-heading" style={{ fontSize: "var(--text-step-1)" }}>
                    <Link href={`/v2/origins/${p.slug}`}>{p.title.ja}</Link>
                  </h3>
                  <p className="v2-notes">{p.notes.ja.join(" · ")}</p>
                  <Buy product={p} stock={stock} compact />
                </article>
              );
            })}
          </div>
          <p className="t-ja-note v2-soft">豆のまま · 100g / 200g · 価格はすべて税込 · {ordering.free}</p>
        </div>
      </section>

      {/* 05 the cup */}
      <section className="v2-band" aria-label="一杯">
        <Photo id="131" alt="サーバーからグラスのマグにコーヒーを注ぐ。後ろに4つの袋" sizes="100vw" />
        <div className="v2-band-copy right">
          <p className="t-ja-display">まずは、一杯から</p>
          <Link href="/v2/coffee" className="v2-btn">4つの産地から選ぶ</Link>
        </div>
      </section>

      {/* 06 who makes it */}
      <section className="v2-sec">
        <div className="v2-wrap v2-split flip">
          <div className="v2-stack">
            <p className="t-ja-display">SNöBIはTokyo Coffeeがつくる、オーガニック・スペシャルティライン。</p>
            <Link href="/v2/about" className="v2-link">ストーリーを読む →</Link>
          </div>
          <div className="v2-pair">
            <Photo id="187" alt="二台の焙煎機にもたれる二人" caption="焙煎機の前で" sizes="(min-width:860px) 34vw, 55vw" />
            <Photo id="114" alt="昼の光が入る焙煎所の中" caption="昼の焙煎所" sizes="(min-width:860px) 26vw, 45vw" />
          </div>
        </div>
      </section>

      {/* 07 for cafés */}
      <section className="v2-sec v2-alt">
        <div className="v2-wrap v2-split">
          <div className="v2-stack">
            <p className="t-eyebrow v2-soft">For cafés &amp; retailers</p>
            <p className="t-ja-display">取扱店 第一章。最初の25店舗を募集します。</p>
          </div>
          <div><Link href="/v2/trade" className="v2-btn">取扱店プログラムを見る</Link></div>
        </div>
      </section>
    </>
  );
}
