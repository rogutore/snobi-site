import Link from "next/link";
import { products } from "@/content/products";
import { originFrames, SHOOT } from "@/content/v2";
import { Photo } from "@/components/v2/photo";

export default function Origins() {
  return (
    <section className="v2-sec" aria-labelledby="o-h1">
      <div className="v2-wrap v2-stack" style={{ gap: "3rem" }}>
        <div className="v2-stack" style={{ gap: ".6rem" }}>
          <p className="t-eyebrow v2-soft">Chapter One — 4 origins</p>
          <h1 id="o-h1" className="t-ja-display">4つの産地</h1>
        </div>
        <div className="v2-origins">
          {products.map((p, i) => (
            <Link key={p.slug} href={`/v2/origins/${p.slug}`} className="v2-origin">
              <Photo id={originFrames[p.slug].table} alt={`${p.title.ja}の袋。古い机の上、差し込む光の中`} caption={SHOOT} sizes="(min-width:1000px) 23vw, (min-width:520px) 46vw, 92vw" />
              <span className="no">{String(i + 1).padStart(2, "0")} · {p.country.toUpperCase()}</span>
              <b>{p.elevation}</b>
              <span className="t-ja-heading" style={{ fontSize: "var(--text-step-1)" }}>{p.title.ja}</span>
              <span className="t-ja-note v2-soft">{p.region.ja} · {p.producer.ja}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
