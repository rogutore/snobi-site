/* Home section 2, option A (owner 2026-10-08, replacing the table chapter): Daylight-style split.
   Left: one photo held in place — the bag passed hand to hand (046–049, same set-up per origin), changing per step.
   Right: four short steps, each a door to its page. Mechanics: components/v3/sticky-photos.tsx (shared with Story). */
import { Fragment } from "react";
import Link from "next/link";
import { freeShippingLine } from "@/content/ordering";
import { ScoreScale } from "@/components/v3/score-scale";
import { StickyPhotos } from "@/components/v3/sticky-photos";

const STEPS = [
  { frame: "047", alt: "ペルーの袋を手渡す" },
  { frame: "049", alt: "エチオピアの袋を手渡す" },
  { frame: "046", alt: "コロンビアの袋を手渡す" },
  { frame: "048", alt: "メキシコの袋を手渡す" },
];

export function HandChapter() {
  return (
    <StickyPhotos frames={STEPS} label="オーガニックのまま、スペシャルティ。" caption="撮影：2026年10月1日、東京" steps={[
        <Fragment key="organic">
          <p className="eyebrow">01 · Organic</p>
          <p className="v3-big" lang="en">Organic.</p>
          <p className="v3-ja">JAS有機認証の豆だけを、東京で焙煎。</p>
          {/* eslint-disable-next-line @next/next/no-img-element -- inset proof photo */}
          <img className="v3-hand-inset" src="/v2/photos/161-s.webp" alt="有機JASの表示がある生豆の麻袋" loading="lazy" />
          <Link className="v3-more" href="/about#jas">有機JASについて →</Link>
        </Fragment>,
        <Fragment key="specialty">
          <p className="eyebrow">02 · Specialty</p>
          <p className="v3-big" lang="en"><em>And actually specialty.</em></p>
          <p className="v3-ja">カッピングスコア80点以上の「スペシャルティコーヒー」の豆を使用しています。</p>
          <div className="v3-hand-scale"><ScoreScale /></div>
          <Link className="v3-more" href="/specialty">スペシャルティコーヒーとは →</Link>
        </Fragment>,
        <Fragment key="whole-bean">
          <p className="eyebrow">03 · Whole bean</p>
          <p className="v3-big">豆のまま。</p>
          <p className="v3-ja">100g / 200g · 価格はすべて税込 · <b>{freeShippingLine.ja}</b></p>
          <Link className="v3-more" href="/coffee">コーヒーを見る →</Link>
        </Fragment>,
        <Fragment key="chapter-one">
          <p className="eyebrow">04 · Chapter One</p>
          <p className="v3-mid">第一章、4つの産地。</p>
          <p className="v3-ja">ペルー、エチオピア、コロンビア、メキシコ・デカフェ。</p>
          <a className="v3-btn" href="#releases">4つの産地から選ぶ</a>
        </Fragment>,
      ]} />
  );
}
