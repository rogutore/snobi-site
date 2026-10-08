import { pageMeta } from "@/lib/seo";
import { getStock } from "@/lib/shopify/client";
import { orderingSummary, freeShippingLine } from "@/content/ordering";
import { CoffeeRows } from "@/components/v3/pages/coffee";
import "@/components/v3/pages/coffee.css";

export const dynamic = "force-dynamic";
export const metadata = pageMeta({ path: "/coffee", title: "オーガニックコーヒー豆 通販｜有機JASのスペシャルティ 4産地", description: `有機JAS認証のスペシャルティコーヒー豆を4つの産地から。すべて浅煎り、豆のまま100g・200g。${freeShippingLine.ja}、本州は翌日配達。`, image: "/v2/photos/130-l.webp" });

/* Mockup D's top line (豆のまま · 100g / 200g · 税込 · 送料無料 · 前日正午締切 · 焙煎日を袋に記載) is replaced by the
   one ordering summary in content/ordering.ts, with the free-shipping phrase emphasised (Davy's notes 2026-10-08). */
const summary = orderingSummary.ja.split(freeShippingLine.ja);
if (summary.length !== 2) throw new Error("v3/coffee: orderingSummary.ja must contain freeShippingLine.ja exactly once");

export default async function Coffee() {
  const { stock } = await getStock();
  return (
    <>
      <div className="v3p-coffee-head">
        <p className="eyebrow">Chapter One — Organic Coffee</p>
        <h1>4つの産地、4つの個性。すべてオーガニック。</h1>
        <p>{summary[0]}<strong>{freeShippingLine.ja}</strong>{summary[1]}</p>
      </div>
      <CoffeeRows stock={stock} />
    </>
  );
}
