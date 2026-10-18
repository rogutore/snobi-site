import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { getStock } from "@/lib/shopify/client";
import { statementJa, storyJa, storyJourneyJa, storySnobiJa, jas, signOff } from "@/content/v2";
import { Photo } from "@/components/v2/photo";
import { StickyPhotos } from "@/components/v3/sticky-photos";
import { BuyBar } from "@/components/v3/buy-bar";
import { BELIEF_JA } from "@/content/brand";
import "@/components/v3/pages/story.css";

/* Story = one journey (owner 2026-10-19): Organic → People → Excellence, then the roast band, then SNöBI where organic and
   specialty meet, then the invitation to be part of it. Lean and photo-led: one pinned photo per chapter (the house walk
   mechanic, components/v3/sticky-photos.tsx), all frames from the 2026-10-01 Tokyo shoot (consent for every face).
   Copy: content/v2.ts storyJourneyJa / storySnobiJa (DRAFT for owner review). Kept as decided: the opening statement
   (owner kept 「世界最高峰の品質」 2026-10-19), the one dark band, the JAS proof (#jas is linked from home), the sign-off.
   Removed: the "We're writing it" interim lines, the road-ahead list and the unverified 2020年9月 line.
   Never write "organic-only roastery": the roastery is certified 有機・非有機併用 (COPY-INVENTORY §4.2). */
export const metadata = pageMeta({ path: "/about", title: "ストーリー｜有機JASとスペシャルティを、東京で", description: "世界最高峰の品質、オーガニックという信念、地球への責任。有機への想いと、人との出会いと、おいしさへの探求が重なって生まれた、Tokyo Coffeeのオーガニック・スペシャルティライン、SNöBI。", image: "/v2/photos/130-l.webp" });
export const dynamic = "force-dynamic";

const W = "(min-width:700px)";

export default async function About() {
  const { stock } = await getStock();
  return (
    <div className="v3p-story">
      {/* 01 Statement — set large, no photo (unchanged) */}
      <section className="v3p-story-statement" aria-labelledby="st-h1">
        <p className="eyebrow" lang="en">The story</p>
        <h1 id="st-h1" className="v3p-story-said">
          {statementJa.map((t) => <span key={t}>{t}</span>)}
        </h1>
      </section>

      {/* 02 The journey — one pinned photo that changes as the reader moves Organic → People → Excellence */}
      <StickyPhotos className="walk" priority label="Organic, people, excellence" caption="撮影：2026年10月1日、東京"
        frames={storyJourneyJa.map(({ frame, alt }) => ({ frame, alt }))}
        steps={storyJourneyJa.map((c) => (
          <div key={c.label}>
            <h2 className="display v3-walk-h" lang="en">{c.label}</h2>
            {c.lines.map((t) => <p key={t} className="v3-ja">{t}</p>)}
            <p className="v3-walk-cap">{c.cap}</p>
          </div>
        ))} />

      {/* the one dark band */}
      <section className="v3p-story-band" aria-label="東京で焙煎">
        <Photo className="v3p-story-fig" id="205" alt="焙煎機の扉から流れ出る焙煎豆" sizes="100vw" />
        <p className="v3p-story-h">東京で焙煎。</p>
      </section>

      {/* 03 SNöBI — where the three meet: organic and specialty */}
      <section className="v3p-story-lineage" aria-labelledby="st-snobi">
        <div className="copy">
          <h2 id="st-snobi" className="v3p-story-h">{storySnobiJa.h}</h2>
          {storySnobiJa.lines.map((t) => <p key={t} className="v3p-story-fact">{t}</p>)}
          <p className="v3p-story-belief">{BELIEF_JA}</p>
        </div>
        <Photo className="v3p-story-fig" id="130" alt="オーク材のテーブルに並ぶSNöBIの4つの袋と、コーヒーのカラフェ" caption="第一章の4種" sizes={`${W} 52vw, 100vw`} />
      </section>

      {/* 04 JAS organic — the proof (S4; #jas is linked from home) */}
      <section id="jas" className="v3p-story-jas" aria-labelledby="st-jas">
        <Photo className="v3p-story-fig" id="161" alt="有機JASマークとMayacertの表示がある麻袋" caption="麻袋の有機JASマーク" sizes={`${W} 46vw, 100vw`} />
        <div className="copy">
          <p className="eyebrow" lang="en">JAS Organic</p>
          <h2 id="st-jas" className="v3p-story-h">JAS有機認証の豆だけを、東京で焙煎。</h2>
          <ul className="v3p-story-nums">
            {jas.map(([n, l]) => <li key={n}><b lang="en">{n}</b><span>{l}</span></li>)}
          </ul>
        </div>
      </section>

      {/* 05 The invitation: be part of it (owner: "wanting to be part of it" leads), then the sign-off */}
      <section className="v3p-story-statement end" aria-labelledby="st-join">
        <p id="st-join" className="v3p-story-said"><span>{storyJa[1]}</span></p>
        <p className="v3p-story-quote">{signOff}</p>
        <Link className="v3-btn ghost" href="/coffee">まずは、一杯から ↗</Link>
      </section>

      <BuyBar stock={stock} />
    </div>
  );
}
