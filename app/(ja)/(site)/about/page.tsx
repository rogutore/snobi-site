import { pageMeta } from "@/lib/seo";
import { Fragment } from "react";
import Link from "next/link";
import { getStock } from "@/lib/shopify/client";
import { statementJa, storyJa, roadAhead, jas, signOff } from "@/content/v2";
import { Photo } from "@/components/v2/photo";
import { StickyPhotos } from "@/components/v3/sticky-photos";
import { BuyBar } from "@/components/v3/buy-bar";
import "@/components/v3/pages/story.css";

/* Mockup D story.html in its visual style (statement block, lists, figures, mono captions), carrying the five
   chapters the owner agreed (docs/site-plan.md §2): Statement · Story · Road Ahead · Tokyo Coffee · JAS organic.
   Owner picks 2026-10-08 (S1–S4): S1 chapter 02 is a walk in (the home hand chapter's pinned photo: roofs → building →
   doorway → roastery) instead of a 5-photo grid; S2 no founding-story placeholder until the owner gives the story;
   S3 the home buy bar; S4 the JAS sack photo beside the numbers, no second photo row.
   Captions are DRAFTS that say only what the frame shows (design/plan/PHOTO-INVENTORY.md).
   Never write "organic-only roastery": the roastery is certified 有機・非有機併用 (COPY-INVENTORY §4.2). */
export const metadata = pageMeta({ path: "/about", title: "ストーリー｜有機JASとスペシャルティを、東京で", description: "世界最高峰の品質、オーガニックという信念、地球への責任。SNöBIはTokyo Coffeeがつくるオーガニック・スペシャルティライン。2020年9月、東久留米に最初の焙煎所カフェ。", image: "/v2/photos/187-l.webp" });
export const dynamic = "force-dynamic";

const W = "(min-width:700px)";

const WALK = [
  { frame: "054", alt: "窓から見た東京の屋根と電線" },
  { frame: "021", alt: "上から見た白い波板の建物、入口の二人と自転車" },
  { frame: "041", alt: "戸口の向こうに立つ人" },
  { frame: "114", alt: "昼の光が入る焙煎所。包装機と棚" },
];

export default async function About() {
  const { stock } = await getStock();
  return (
    <div className="v3p-story">
      {/* 01 Statement — set large, no photo */}
      <section className="v3p-story-statement" aria-labelledby="st-h1">
        <p className="eyebrow" lang="en">The story</p>
        <h1 id="st-h1" className="v3p-story-said">
          {statementJa.map((t) => <span key={t}>{t}</span>)}
        </h1>
      </section>

      {/* 02 Story — a walk in, from the roofs to the roastery (S1) */}
      <StickyPhotos className="walk" frames={WALK} label="We’re writing it." caption="撮影：2026年10月1日、東京" steps={[
        <Fragment key="roofs">
          <p className="eyebrow">02 · The story</p>
          <h2 className="display v3-walk-h" lang="en">We’re writing it.</h2>
          <p className="v3-ja">{storyJa[0]}</p>
          <p className="v3-walk-cap">01 — 東京の屋根と電線</p>
        </Fragment>,
        <p key="building" className="v3-walk-cap big">02 — 白い波板の建物と、自転車</p>,
        <p key="door" className="v3-walk-cap big">03 — 戸口の向こう</p>,
        <Fragment key="roastery">
          <p className="v3-walk-cap big">04 — 焙煎所の中</p>
          <p className="v3-ja">{storyJa[1]}</p>
        </Fragment>,
      ]} />

      {/* 03 Road Ahead — Mockup D's list, beside the room still being built */}
      <section className="v3p-story-lists" aria-labelledby="st-road">
        <div>
          <p className="eyebrow" lang="en">The road ahead</p>
          <h2 id="st-road" className="display" lang="en">A first chapter. <em>Not a finish line.</em></h2>
          <ol>
            {roadAhead.map(([n, h, t]) => (
              <li key={n}>
                <p className="eyebrow">{n}</p>
                <h3>{h}</h3>
                <p>{t}</p>
              </li>
            ))}
          </ol>
        </div>
        <Photo className="v3p-story-fig" id="032" alt="工事中の部屋。材木、ソファ、段ボール" caption="工事中の部屋" sizes={`${W} 46vw, 100vw`} />
      </section>

      {/* 04 Tokyo Coffee lineage (S2: the founding story waits for the owner; only the verified fact stands) */}
      <section className="v3p-story-lineage" aria-labelledby="st-tc">
        <div className="copy">
          <p className="eyebrow" lang="en">Tokyo Coffee</p>
          <h2 id="st-tc" className="v3p-story-h">SNöBIはTokyo Coffeeがつくる、オーガニック・スペシャルティライン。</h2>
          <p className="v3p-story-fact">2020年9月、東久留米に最初の焙煎所カフェ。</p>
        </div>
        <Photo className="v3p-story-fig" id="187" alt="二台の焙煎機にもたれて立つ二人" caption="二台の焙煎機の前で" sizes={`${W} 52vw, 100vw`} />
      </section>
      <div className="v3p-story-trio">
        <Photo className="v3p-story-fig" id="215" alt="建物の入口の前に集まるチーム" caption="建物の前で" sizes={`${W} 30vw, 100vw`} />
        <Photo className="v3p-story-fig" id="211" alt="焙煎機を操作する人" caption="焙煎中" sizes={`${W} 30vw, 100vw`} />
        <Photo className="v3p-story-fig" id="203" alt="焙煎機の横で腕を組む人" caption="焙煎機の横で" sizes={`${W} 30vw, 100vw`} />
      </div>

      {/* the one dark band */}
      <section className="v3p-story-band" aria-label="東京で焙煎">
        <Photo className="v3p-story-fig" id="205" alt="焙煎機の扉から流れ出る焙煎豆" sizes="100vw" />
        <p className="v3p-story-h">東京で焙煎。</p>
      </section>

      {/* 05 JAS organic — the sack's JAS mark beside the numbers (S4) */}
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

      {/* sign-off (Mockup D's quote and ghost button) */}
      <section className="v3p-story-statement end" aria-label="まあ、見てなって。">
        <p className="v3p-story-quote">{signOff}</p>
        <Link className="v3-btn ghost" href="/coffee">まずは、一杯から ↗</Link>
      </section>

      <BuyBar stock={stock} />
    </div>
  );
}
