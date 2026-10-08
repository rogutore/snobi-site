import Link from "next/link";
import { notFound } from "next/navigation";
import { getStock } from "@/lib/shopify/client";
import { products } from "@/content/products";
import { originFrames, producerNumbers, ordering, SHOOT } from "@/content/v2";
import { Photo } from "@/components/v2/photo";
import { Buy } from "@/components/v2/buy";

export const dynamic = "force-dynamic";

export default async function Origin({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = products.find((x) => x.slug === slug);
  if (!p) notFound();
  const f = originFrames[p.slug];
  const { stock } = await getStock();
  const others = products.filter((x) => x.slug !== p.slug);
  return (
    <>
      {/* 01 buy: photos left, panel right (sticky). Phones: a short hero photo, then the buy panel inside the first screen */}
      <div className="v2-mhero"><Photo id={f.hero} alt={`${p.title.ja}の袋。葉の影の壁の前`} sizes="100vw" /></div>
      <section className="v2-sec" style={{ paddingTop: "2rem" }}>
        <div className="v2-wrap v2-pdp">
          <div className="v2-pdp-media">
            <Photo id={f.hero} alt={`${p.title.ja}の袋。葉の影の壁の前`} caption={SHOOT} priority sizes="(min-width:860px) 56vw, 100vw" className="v2-crop" position="50% 78%" />
            <div className="two">
              <Photo id={f.hand} alt={`${p.title.ja}の袋を手渡す`} sizes="(min-width:860px) 28vw, 50vw" className="v2-crop" />
              <Photo id={f.beans} alt={`${p.title.ja}の焙煎豆`} sizes="(min-width:860px) 28vw, 50vw" className="v2-crop" />
            </div>
            <Photo id={f.cup} alt={`${p.title.ja}の袋と、淹れた一杯`} sizes="(min-width:860px) 56vw, 100vw" className="v2-crop" position="50% 80%" />
          </div>
          <div className="v2-pdp-panel">
            <p className="t-eyebrow v2-soft">{p.country} · Chapter One</p>
            <h1 className="t-ja-display">{p.title.ja}</h1>
            <p className="v2-notes" style={{ fontSize: "var(--text-step-0)", color: "var(--color-ink)" }}>{p.notes.ja.join(" · ")}</p>
            <p className="t-ja-body">{p.bestFor.ja}</p>
            <Buy product={p} stock={stock} />
            <dl className="v2-facts">
              <div><dt>産地</dt><dd>{p.region.ja}</dd></div>
              <div><dt>生産者</dt><dd>{p.producer.ja}</dd></div>
              <div><dt>標高</dt><dd>{p.elevation}</dd></div>
              <div><dt>品種</dt><dd>{p.variety.ja}</dd></div>
              <div><dt>精製</dt><dd>{p.process.ja}</dd></div>
              <div><dt>焙煎度</dt><dd>{p.roast ? p.roast.ja : <span className="v2-todo">確認中</span>}</dd></div>
              <div><dt>お届け</dt><dd className="t-ja-note">豆のまま · {ordering.roast} · {ordering.cutoff} · {ordering.ship}</dd></div>
            </dl>
          </div>
        </div>
      </section>

      {/* 02 the numbers */}
      <section className="v2-sec v2-alt">
        <div className="v2-wrap v2-nums">
          <div className="v2-num"><b>{p.elevation}</b><span>標高</span></div>
          <div className="v2-num"><b style={{ fontSize: "var(--text-step-3)", whiteSpace: "normal" }}>{p.variety.ja}</b><span>品種</span></div>
          <div className="v2-num"><b style={{ fontSize: "var(--text-step-3)", whiteSpace: "normal" }}>{p.process.ja}</b><span>精製</span></div>
        </div>
      </section>

      {/* 03 the producer — live narrative + facts (products.ts), numbers as type */}
      <section className="v2-sec">
        <div className="v2-wrap v2-split">
          <div className="v2-stack v2-measure">
            <p className="t-eyebrow v2-soft">The producer</p>
            <h2 className="t-ja-heading">{p.producer.ja}</h2>
            {p.narrative.ja.map((t) => <p key={t} className="t-ja-body">{t}</p>)}
          </div>
          <div className="v2-stack" style={{ gap: "2.5rem" }}>
            <div className="v2-nums">
              {(producerNumbers[p.slug] ?? []).map(([n, l]) => (
                <div className="v2-num" key={n}><b>{n}</b><span>{l}</span></div>
              ))}
            </div>
            <ol className="v2-list">
              {p.facts.ja.map((t) => <li key={t}><p className="t-ja-body">{t}</p></li>)}
            </ol>
            <p className="v2-slot">生産者の写真：輸入元からの使用許可を確認中。許可が出るまでは文字だけで伝えます。</p>
          </div>
        </div>
      </section>

      {/* 04 in the cup */}
      <section className="v2-sec v2-alt">
        <div className="v2-wrap v2-split flip">
          <div className="v2-stack">
            <p className="t-eyebrow v2-soft">In the cup</p>
            <p className="t-ja-display">{p.notes.ja.join("、")}。</p>
            <p className="v2-slot">この豆のレシピ（豆の量・湯温・時間）：準備中</p>
          </div>
          <div className="v2-pair">
            <Photo id={f.brew} alt={`${p.title.ja}の袋の横でハンドドリップ`} caption={SHOOT} sizes="(min-width:860px) 34vw, 55vw" />
            <Photo id={f.waist} alt={`${p.title.ja}の袋を手に持つ`} sizes="(min-width:860px) 26vw, 45vw" />
          </div>
        </div>
      </section>

      {/* 05 end in the product */}
      <section className="v2-sec">
        <div className="v2-wrap v2-stack" style={{ gap: "2rem" }}>
          <h2 className="t-ja-heading">ほかの3つの産地</h2>
          <div className="v2-others">
            {others.map((o) => (
              <Link key={o.slug} href={`/v2/origins/${o.slug}`}>
                <Photo id={originFrames[o.slug].hero} alt={`${o.title.ja}の袋`} sizes="(min-width:760px) 30vw, 46vw" />
                <span className="t-ja-note">{o.title.ja}</span>
                <span className="v2-notes">{o.elevation}</span>
              </Link>
            ))}
          </div>
          <Link href="/v2/coffee" className="v2-link">4つを比べる →</Link>
        </div>
      </section>
    </>
  );
}
