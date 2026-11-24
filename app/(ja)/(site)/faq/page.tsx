import { pageMeta, JsonLd, faqPage, breadcrumb } from "@/lib/seo";
import { getStock } from "@/lib/shopify/client";
import { BuyBar } from "@/components/v3/buy-bar";
import Link from "next/link";
import { products, yen, type Coffee } from "@/content/products";
import { faqGroups } from "@/content/v2";
import { FREE_SHIPPING_YEN } from "@/content/ordering";
import "@/components/v3/pages/story.css";

/* Mockup D faq.html (heading left, open/close list right), carrying the live Q&A from content/v2.ts faqGroups with
   Davy's 2026-10-08 answers. The price answer is built from products.ts, never retyped. The group titles from
   faqGroups sit as small labels over each group; everything else is Mockup D's layout. */
/* Title and description name only questions this page answers (SEO Batch B 2026-11-24: the old ones promised デカフェ). */
export const metadata = pageMeta({ path: "/faq", title: "よくある質問｜有機JAS・価格・送料・届く日", description: `SNöBIのよくある質問。有機JASか、焙煎度、粉で買えるか、100g・200gの価格、送料（${yen(FREE_SHIPPING_YEN)}以上で無料）、焙煎して届く日、決済と返品、お店での取り扱いに答えます。`, image: "/v2/photos/161-l.webp" });
export const dynamic = "force-dynamic";

function price(p: Coffee, size: "100g" | "200g"): string {
  const v = p.variants.find((x) => x.size === size);
  if (!v) throw new Error(`${p.slug} has no ${size} variant (content/products.ts)`);
  return yen(v.price);
}

const prices = `100g / 200gの税込価格は、${products
  .map((p) => `${p.title.ja.split(" ")[0]}${p.decaf ? " デカフェ" : ""} ${price(p, "100g")} / ${price(p, "200g")}`)
  .join("、")}。豆のままでのお届けです。`;

/* Words in an answer that link to the page explaining them (first occurrence only). ホールセールのページ: Masaki 2026-10-09. */
const LINKS: [string, string][] = [["スペシャルティコーヒー", "/specialty"], ["ホールセールのページ", "/trade"]];

function Answer({ text }: { text: string }) {
  if (text === "__PRICES__") return <>{prices}</>;
  const hit = LINKS.map(([term, href]) => ({ term, href, at: text.indexOf(term) })).find((x) => x.at >= 0);
  if (!hit) return <>{text}</>;
  return (
    <>
      {text.slice(0, hit.at)}<Link href={hit.href}>{hit.term}</Link>{text.slice(hit.at + hit.term.length)}
    </>
  );
}

export default async function Faq() {
  const { stock } = await getStock();
  return (
    <>
    <JsonLd data={breadcrumb([["ホーム", "/"], ["FAQ", "/faq"]])} />
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
