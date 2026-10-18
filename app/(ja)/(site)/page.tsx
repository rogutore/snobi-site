import { pageMeta, allFromPrice } from "@/lib/seo";
import Link from "next/link";
import { HeroFilm } from "@/components/v3/hero-film";
import { getStock } from "@/lib/shopify/client";
import { yen } from "@/content/products";
import { freeShippingLine } from "@/content/ordering";
import { HandChapter } from "@/components/v3/hand-chapter";
import { FujiClimb } from "@/components/v3/fuji-climb";
import { BuyBar } from "@/components/v3/buy-bar";
import { Releases } from "@/components/v3/releases";

export const dynamic = "force-dynamic";

/* Home title is absolute (the layout template would add the brand twice). Organic first (plan §3). */
export const metadata = pageMeta({
  path: "/",
  en: "/en",
  absolute: true,
  title: "SNöBI｜オーガニック スペシャルティコーヒー豆（有機JAS）",
  description: `有機JASのスペシャルティコーヒー豆。ペルーのゲイシャ、エチオピア・グジ、コロンビア・ウィラ、メキシコの有機デカフェ。すべて浅煎り、豆のまま100g ${yen(allFromPrice)}から。${freeShippingLine.ja}。`,
  image: "/v3/hero-still-og.jpg", // the four bags (was the chaff-sack frame)
});

/* v3 home = Mockup D (the Daylight version the owner chose), restored 2026-10-08 after an over-reach.
   Only the owner-rejected parts are replaced: the 3D bag → HandChapter (option A, 2026-10-08), the belt map →
   FujiAltitude (section 4, owner pick 2026-10-08). Davy's copy fixes (2026-10-08) apply where Mockup D used those lines. */
export default async function Home() {
  const { stock } = await getStock();
  return (
    <>
      {/* improvement 1: real leaf light over the whole page (from frame 146) */}
      {/* hero film (Mockup D, 22 s from the 2026-10-01 stills) */}
      <section className="v3-film" aria-label="SNöBI — 東京の焙煎所から">
        {/* still first, film after load, byte-ranged, chaff shot skipped: components/v3/hero-film.tsx (2026-10-11) */}
        <HeroFilm />
        <div className="v3-filmcopy">
          <p className="eyebrow" style={{ color: "var(--color-paper)" }}>Organic × Specialty × Japan — Est. 2026</p>
          <h1 className="display" lang="en">Organic.<br /><em>And actually specialty.</em></h1>
          {/* owner 2026-10-09: JA line + proof subline; EN h1 unchanged */}
          <p className="ja">有機も、味も。妥協しない。</p>
          <p className="ja proof">認証は、有機JAS。評価は、スペシャルティ。</p>
          <div className="v3-filmcta">
            <Link className="v3-btn light" href="/coffee">4つの産地から選ぶ</Link>
            <span className="price">{yen(allFromPrice)}〜（税込）・豆のまま</span>
          </div>
        </div>
      </section>

      {/* section 2, option A (2026-10-08): the bag in hand, four short steps, each a door to its page */}
      <HandChapter />

      {/* daylight strip */}
      <section className="v3-strip" aria-label="朝の光">
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
          <img src="/v2/photos/130-l.webp" alt="第一章の4つの袋とサーバー" loading="lazy" />
          <figcaption>第一章 — 4つの袋 · 東京 · 2026.10</figcaption>
        </figure>
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
          <img src="/v2/photos/121-l.webp" alt="朝の光の中のハンドドリップ" loading="lazy" />
          <figcaption>まずは、一杯から</figcaption>
        </figure>
        <figure>
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
          <img src="/v2/photos/149-l.webp" alt="開けた袋の中の焙煎豆" loading="lazy" />
          <figcaption>豆のまま · 100g / 200g</figcaption>
        </figure>
      </section>

      {/* section 4 — "Combine. Surprise me." (2026-10-08): the 1823 plate × The Deep Sea climb × 焼印 staff */}
      <FujiClimb stock={stock} />

      {/* releases on paper, with the photo switch */}
      <section className="v3-sec" id="releases" style={{ paddingTop: 0 }} aria-labelledby="rel-h">
        <div className="v3-sec-head">
          <div>
            <p className="eyebrow">Chapter One — Releases</p>
            <h2 id="rel-h" className="display">第一章：ペルー、エチオピア、コロンビア、メキシコ・デカフェ</h2>
          </div>
          <p className="v3-free">{freeShippingLine.ja}</p>
        </div>
        <Releases stock={stock} />
      </section>

      {/* from the roastery (2026-10-08 proposal 6) */}
      <section className="v3-band" aria-label="焙煎所">
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
        <img src="/v2/photos/187-l.webp" alt="二台の焙煎機にもたれる二人" loading="lazy" />
        <div className="v3-band-copy">
          <p className="v3-def-h">SNöBIはTokyo Coffeeがつくる、オーガニック・スペシャルティライン。</p>
          <Link className="v3-btn light" href="/about">ストーリーを読む</Link>
        </div>
      </section>

      {/* improvement 2: the always-visible buy route with a live free-shipping countdown */}
      <BuyBar stock={stock} />
    </>
  );
}
