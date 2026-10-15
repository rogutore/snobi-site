"use client";
/* /coffee — Mockup D's coffee.html rows (.photoswitch + .crow + .buy), on the live cart.
   Changed from Mockup D (owner/Davy 2026-10-08): enjoyWithin under the notes, 焙煎度 for all four, a 品種 row (Mexico's
   variety was missing), live price + real cart, the schedule line from content/ordering.ts, the origin link label.
   2026-10-09: the 「写真」 switch is gone; each row plays its own photos (components/v3/shot-cycle.tsx, owner after Masaki). */
import Link from "next/link";
import { BRAND_PLAIN } from "@/content/brand";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { products, yen, type Coffee } from "@/content/products";
import { orderingSchedule } from "@/content/ordering";
import { ShotCycle, ShotRotation } from "@/components/v3/shot-cycle";
import type { StockMap } from "@/lib/shopify/client";
import { buyLabel, canBuy, livePrice } from "@/lib/shopify/stock";
import { useCart } from "@/components/commerce/cart";

function Row({ p, i, stock }: { p: Coffee; i: number; stock: StockMap }) {
  const [size, setSize] = useState<"100g" | "200g">("100g");
  const cart = useCart();
  const v = p.variants.find((x) => x.size === size)!;
  const ok = canBuy(stock, v.id);
  const label = buyLabel(stock, v.id);
  const n = (k: number) => String(k).padStart(2, "0");
  return (
    <article className="v3p-coffee-row" id={p.slug} style={{ "--rink": p.ink } as React.CSSProperties} aria-labelledby={`c-${p.slug}`}>
      <div className="v3p-coffee-ph">
        <ShotCycle slug={p.slug} index={i} alt={`SNöBI ${p.title.ja}`} sizes="(min-width: 861px) 40vw, calc(100vw - 32px)" eager={i === 0} />
      </div>
      <div className="v3p-coffee-copy">
        <p className="eyebrow">第一章 — {n(i + 1)} / {n(products.length)}{p.decaf ? " · DECAF" : ""}</p>
        <p className="v3p-coffee-country" lang="en">{p.country}</p>
        <h2 id={`c-${p.slug}`} className="v3p-coffee-title">{p.title.ja}</h2>
        <p className="v3p-coffee-notes">{p.notes.ja.join(" · ")}</p>
        <p className="v3p-coffee-enjoy">{p.enjoyWithin.ja}</p>
        <p className="v3p-coffee-best">{p.bestFor.ja}</p>
        <dl className="v3p-coffee-facts">
          <dt>ブランド</dt><dd>{BRAND_PLAIN}</dd>
          <dt>地域</dt><dd>{p.region.ja}</dd>
          <dt>標高</dt><dd>{p.elevation}</dd>
          <dt>品種</dt><dd>{p.variety.ja}</dd>
          <dt>精製・乾燥</dt><dd>{p.process.ja}</dd>
          {p.roast ? <><dt>焙煎度</dt><dd>{p.roast.ja}</dd></> : null}
        </dl>
        <form className="v3p-coffee-buy" onSubmit={(e) => { e.preventDefault(); if (ok) cart.add(v.id); }}>
          <fieldset className="v3p-coffee-sizes">
            <legend className="v3-sr">サイズ</legend>
            {p.variants.map((x) => {
              const price = livePrice(stock, x);
              return (
                <label key={x.id}>
                  <input type="radio" name={`size-${p.slug}`} value={x.size} checked={size === x.size} onChange={() => setSize(x.size)} />
                  <span>{x.size}</span>
                  <b>{yen(price)}</b>
                </label>
              );
            })}
          </fieldset>
          <button className="v3-btn" type="submit" disabled={!ok || cart.pending}>
            {cart.pending ? <LoaderCircle size={15} className="v3-spin" aria-hidden /> : null}
            {label}
          </button>
          <p className="v3p-coffee-fine">税込 · 豆のまま · {orderingSchedule.ja.join("")}</p>
        </form>
        <Link className="v3p-coffee-more" href={`/origins/${p.slug}`}>産地について詳しく読みたい方 →</Link>
      </div>
    </article>
  );
}

export function CoffeeRows({ stock }: { stock: StockMap }) {
  return (
    <ShotRotation count={products.length} pace={[2600, 4200]}>
      <div className="v3p-coffee-wrap">
        {products.map((p, i) => <Row key={p.slug} p={p} i={i} stock={stock} />)}
      </div>
    </ShotRotation>
  );
}
