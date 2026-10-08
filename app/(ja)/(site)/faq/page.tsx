import { pageMeta, JsonLd, faqPage } from "@/lib/seo";
import { getStock } from "@/lib/shopify/client";
import { BuyBar } from "@/components/v3/buy-bar";
import Link from "next/link";
import { products, yen, type Coffee } from "@/content/products";
import { faqGroups } from "@/content/v2";
import "@/components/v3/pages/story.css";

/* Mockup D faq.html (heading left, open/close list right), carrying the live Q&A from content/v2.ts faqGroups with
   Davy's 2026-10-08 answers. The price answer is built from products.ts, never retyped. The group titles from
   faqGroups sit as small labels over each group; everything else is Mockup D's layout. */
export const metadata = pageMeta({ path: "/faq", title: "よくある質問｜有機JAS・価格・送料・デカフェ", description: "SNöBIのよくある質問。有機JASとスペシャルティ、価格とサイズ、送料と発送、決済、デカフェについて。", image: "/v2/photos/161-l.webp" });
export const dynamic = "force-dynamic";

function price(p: Coffee, size: "100g" | "200g"): string {
  const v = p.variants.find((x) => x.size === size);
  if (!v) throw new Error(`${p.slug} has no ${size} variant (content/products.ts)`);
  return yen(v.price);
}

const prices = `100g / 200gの税込価格は、${products
  .map((p) => `${p.title.ja.split(" ")[0]}${p.decaf ? " デカフェ" : ""} ${price(p, "100g")} / ${price(p, "200g")}`)
  .join("、")}。豆のままでのお届けです。`;

/* 「スペシャルティコーヒー」 in the "what is SNöBI" answer links to the page that explains it. */
const TERM = "スペシャルティコーヒー";

function Answer({ text }: { text: string }) {
  if (text === "__PRICES__") return <>{prices}</>;
  const at = text.indexOf(`「${TERM}」`);
  if (at < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, at)}「<Link href="/specialty">{TERM}</Link>」{text.slice(at + TERM.length + 2)}
    </>
  );
}

export default async function Faq() {
  const { stock } = await getStock();
  return (
    <>
    <JsonLd data={faqPage(faqGroups.flatMap((g) => g.items).map((it) => ({ q: it.q, a: it.a === "__PRICES__" ? prices : it.a })))} />
    <section className="v3p-story-faq" aria-labelledby="faq-h1">
      <h1 id="faq-h1" className="v3p-story-h">最初の一杯の、<br />その前に。</h1>
      <div className="v3p-story-faq-groups">
        {faqGroups.map((g, gi) => (
          <div key={g.title} className="v3p-story-faq-g">
            <h2>{g.title}</h2>
            {g.items.map((it, i) => (
              <details key={it.q} open={gi === 0 && i === 0}>
                <summary>{it.q}</summary>
                <p className="a"><Answer text={it.a} /></p>
              </details>
            ))}
          </div>
        ))}
      </div>
    </section>
      <BuyBar stock={stock} />
    </>
  );
}
