import { products, yen, FORM_URL } from "@/content/products";
import { faqGroups } from "@/content/v2";
import { Photo } from "@/components/v2/photo";

/* The price answer is built from products.ts (the live FAQ hard-codes all eight prices). */
const prices = `100g / 200gの税込価格は、${products
  .map((p) => `${p.title.ja.split(" ")[0]}${p.decaf ? " デカフェ" : ""} ${yen(p.variants[0].price)} / ${yen(p.variants[1].price)}`)
  .join("、")}。豆のままでのお届けです。`;

export default function Faq() {
  return (
    <section className="v2-sec" aria-labelledby="f-h1">
      <div className="v2-wrap v2-split" style={{ alignItems: "start" }}>
        <div className="v2-stack" style={{ position: "sticky", top: "calc(var(--spacing-nav) + 1.5rem)" }}>
          <p className="t-eyebrow v2-soft">A few good questions</p>
          <h1 id="f-h1" className="t-ja-display">最初の一杯の、その前に。</h1>
          <p className="t-ja-body">見つからないことは、<a href={FORM_URL}>お問い合わせ</a>から。</p>
          <Photo id="049" alt="エチオピアの袋を手渡す" sizes="(min-width:860px) 30vw, 60vw" />
        </div>
        <div className="v2-faq">
          {faqGroups.map((g) => (
            <div key={g.title} className="v2-stack" style={{ gap: ".5rem" }}>
              <h2 className="t-label v2-soft">{g.title}</h2>
              <div>
                {g.items.map((it) => (
                  <details key={it.q}>
                    <summary className="t-ja-body">{it.q}</summary>
                    <p className="t-ja-body">{it.a === "__PRICES__" ? prices : it.a}</p>
                  </details>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
