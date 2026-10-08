import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { products } from "@/content/products";
import { ScoreScale } from "@/components/v3/score-scale";

/* "スペシャルティコーヒーとは" — Davy's note: our own simple page explaining specialty coffee, and that Tokyo Coffee
   supplies high-quality, JAS-certified beans. Definition summarised from SCAJ (scaj.org/about/specialty-coffee).
   Copy below is a DRAFT for Davy / the owner to approve. */
const CRITERIA = ["クリーンさ（欠点のない味）", "甘さ", "酸味の質", "口当たり", "産地らしい風味", "後味", "バランス"]; // SCAJ's seven cup criteria

export const metadata = pageMeta({ path: "/specialty", title: "スペシャルティコーヒーとは｜80点以上という基準", description: "スペシャルティコーヒーとは、カッピングで80点以上の評価を受けたコーヒー。SNöBIは有機JASとスペシャルティ、その両方を満たす豆を使います。", image: "/v2/photos/160-l.webp" });

export default function Specialty() {
  return (
    <>
      <section className="v3-sec" aria-labelledby="sp-h1">
        <div className="v3-sec-head" style={{ alignItems: "start" }}>
          <div>
            <p className="eyebrow">What is specialty coffee</p>
            <h1 id="sp-h1" className="display" style={{ fontFamily: "var(--font-sans)", fontWeight: 600, fontSize: "clamp(1.9rem,3.6vw,3rem)", lineHeight: 1.35, marginTop: 8 }}>スペシャルティ<wbr />コーヒーとは</h1>
          </div>
        </div>
        <p className="v3-lede">ひとことで言えば、カップの中の味がはっきりと良く、種から一杯まで、どこで誰がどうつくったかがたどれるコーヒー。日本スペシャルティコーヒー協会（SCAJ）は、そう定義しています。</p>
      </section>

      <section className="v3-sec v3-alt" aria-labelledby="sp-score">
        <div className="v3-two">
          <div className="v3-def">
            <p className="eyebrow">01 · The score</p>
            <h2 id="sp-score" className="v3-def-h">カッピングで80点以上</h2>
            <p>専門の鑑定士が、決まった手順で豆を淹れて味を採点します（カッピング）。100点満点のうち80点以上が、スペシャルティの目安です。</p>
          </div>
          <div className="v3-def"><ScoreScale /></div>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="sp-cup">
        <div className="v3-two">
          <div className="v3-def">
            <p className="eyebrow">02 · In the cup</p>
            <h2 id="sp-cup" className="v3-def-h">7つの見方で、味を見る</h2>
            <p>SCAJは、カップの中の味を7つの観点で評価します。</p>
          </div>
          <ol className="v3-criteria">{CRITERIA.map((c) => <li key={c}>{c}</li>)}</ol>
        </div>
      </section>

      <section className="v3-sec v3-alt" aria-labelledby="sp-seed">
        <div className="v3-two">
          <div className="v3-def">
            <p className="eyebrow">03 · From seed to cup</p>
            <h2 id="sp-seed" className="v3-def-h">種から一杯まで、たどれること</h2>
            <p>栽培、収穫、精製、選別、輸送、保管、焙煎、抽出。どの工程も品質が守られていて、産地と生産者がわかること。SNöBIの4つの豆は、すべて産地と生産者がわかります。</p>
          </div>
          <ul className="v3-trace">
            {products.map((p) => (
              <li key={p.slug}><Link href={`/origins/${p.slug}`}><b>{p.title.ja}</b><span>{p.region.ja} · {p.producer.ja} · {p.elevation}</span></Link></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="v3-sec" aria-labelledby="sp-tc">
        <div className="v3-two">
          <div className="v3-def">
            {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
            <img src="/v2/photos/160-l.webp" alt="焙煎所の生豆の棚" loading="lazy" />
          </div>
          <div className="v3-def">
            <p className="eyebrow">04 · SNöBI</p>
            <h2 id="sp-tc" className="v3-def-h">有機のまま、スペシャルティ。</h2>
            <p>焙煎はTokyo Coffee。2020年から有機JAS認証を受けた焙煎所で、第一章の4つの豆はすべて有機JAS。全種類、豆の味を堪能出来る様に、「浅煎り」で焙煎しています。</p>
            <Link className="v3-btn" href="/coffee">4つの産地から選ぶ</Link>
          </div>
        </div>
        <p className="v3-source">出典：日本スペシャルティコーヒー協会（SCAJ）「スペシャルティコーヒーの定義」 scaj.org</p>
      </section>
    </>
  );
}
