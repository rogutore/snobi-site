import { pageMeta } from "@/lib/seo";
import Link from "next/link";
import { products } from "@/content/products";
import { originFrames } from "@/content/v2";
import "@/components/v3/pages/origins.css";

/* Mockup D origins.html, ported with the real fonts. Replaced (owner): the coffee-belt map ("it stinks") → four large
   entries, each one bag on the old table in a shaft of sun (frames 025/022/024/023 = originFrames.table).
   Kept: the page head and the numbered list. The h1 drops its second line 「そして、いつ焼いたか。」 (a roast date in a
   headline, retired in design/plan/COPY-INVENTORY.md §1a). */
export const metadata = pageMeta({ path: "/origins", title: "有機JASコーヒーの産地と生産者", description: "SNöBIの4つの産地と生産者。ペルー、エチオピア、コロンビア、メキシコ。標高、品種、精製を、ひとつずつ。すべて有機JASのスペシャルティコーヒー。", image: "/v2/photos/121-l.webp" });

export default function Origins() {
  return (
    <div className="v3p-origins">
      <div className="v3p-origins-head">
        <p className="eyebrow">Origins — the coffee belt</p>
        <h1>だれが、どこで、どうつくったか。</h1>
        <p>北回帰線と南回帰線のあいだに、第一章の4つの産地。すべてJAS有機認証。東京で焙煎。</p>
      </div>

      <ol className="v3p-origins-entries">
        {products.map((p, i) => {
          const id = originFrames[p.slug].table;
          return (
            <li key={p.slug}>
              <Link href={`/origins/${p.slug}`} className="v3p-origins-entry">
                <span className="ph">
                  {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
                  <img src={`/v2/photos/${id}-s.webp`} srcSet={`/v2/photos/${id}-s.webp 700w, /v2/photos/${id}-l.webp 1400w`}
                    sizes="(min-width:860px) 45vw, 100vw" alt={`SNöBI ${p.title.ja}の袋。古いテーブルに差す光の中`} loading={i < 2 ? "eager" : "lazy"} />
                </span>
                <span className="no">{String(i + 1).padStart(2, "0")}</span>
                <span className="place"><span className="c" lang="en">{p.country}</span><span>{p.region.ja}</span></span>
                <span className="alt">{p.elevation}</span>
                <span className="who">{p.producer.ja}</span>
                <span className="go">{p.title.ja} <span aria-hidden>→</span></span>
              </Link>
            </li>
          );
        })}
      </ol>

      <section className="v3-sec v3p-origins-listsec" aria-label="4つの産地">
        <ol className="v3p-origins-list">
          {products.map((p, i) => (
            <li key={p.slug}>
              <Link href={`/origins/${p.slug}`}>
                <span className="eyebrow">{String(i + 1).padStart(2, "0")}</span>
                <span><strong lang="en">{p.country}</strong> — {p.title.ja}<br />
                  <span className="sub">{p.region.ja} · {p.producer.ja} · {p.elevation}</span></span>
                <span className="eyebrow" aria-hidden>→</span>
              </Link>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
