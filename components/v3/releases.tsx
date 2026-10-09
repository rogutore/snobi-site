"use client";
/* Mockup D's releases row (Kettl: releases on paper). 2026-10-08: it is the home shop — each card adds Davy's freshness
   line, size, live price and add to cart. 2026-10-09: the 「写真」 switch is gone; each card plays its own photos
   (components/v3/shot-cycle.tsx, owner after Masaki). */
import Link from "next/link";
import { useState } from "react";
import { ShotCycle, ShotRotation } from "@/components/v3/shot-cycle";
import { LoaderCircle } from "lucide-react";
import { products, yen, type Coffee } from "@/content/products";
import type { StockMap } from "@/lib/shopify/client";
import { useCart } from "@/components/commerce/cart";

function Card({ p, i, stock }: { p: Coffee; i: number; stock: StockMap }) {
  const [size, setSize] = useState<"100g" | "200g">("100g");
  const cart = useCart();
  const v = p.variants.find((x) => x.size === size)!;
  const s = stock[v.id];
  const ok = !!s?.availableForSale && (s.quantityAvailable === null || s.quantityAvailable > 0);
  const price = s?.price.currencyCode === "JPY" ? Number(s.price.amount) : v.price;
  return (
    <article className="v3-rel" aria-labelledby={`rel-${p.slug}`}>
      <Link href={`/origins/${p.slug}`} className="ph" aria-label={`${p.title.ja}の産地ページへ`}>
        <ShotCycle slug={p.slug} index={i} alt={`SNöBI ${p.title.ja}`} sizes="(min-width:1000px) 23vw, 70vw" />
      </Link>
      <p className="n">{String(i + 1).padStart(2, "0")} — {p.country.toUpperCase()}</p>
      <h3 id={`rel-${p.slug}`} className="t">{p.title.ja}</h3>
      <p className="s">{p.notes.ja.join(" · ")}</p>
      <p className="enjoy">{p.enjoyWithin.ja}</p>
      <p className="pr">{p.roast ? p.roast.ja : ""}{p.decaf ? " · デカフェ" : ""}</p>
      <div className="v3-rel-buy">
        <div className="sizes" role="radiogroup" aria-label="サイズ">
          {p.variants.map((x) => (
            <button key={x.id} type="button" role="radio" aria-checked={size === x.size} onClick={() => setSize(x.size)}>{x.size}</button>
          ))}
        </div>
        <b className="price">{yen(price)}</b>
      </div>
      <button type="button" className="v3-btn v3-rel-add" disabled={!ok || cart.pending} onClick={() => cart.add(v.id)}>
        {cart.pending ? <LoaderCircle size={15} className="v3-spin" aria-hidden /> : null}
        {ok ? "カートに入れる" : s ? "完売" : "在庫確認中"}
      </button>
      <Link href={`/origins/${p.slug}`} className="v3-rel-more">産地について詳しく読みたい方 →</Link>
    </article>
  );
}

export function Releases({ stock = {} }: { stock?: StockMap }) {
  return (
    <ShotRotation count={products.length}>
      <div className="v3-releases">
        {products.map((p, i) => <Card key={p.slug} p={p} i={i} stock={stock} />)}
      </div>
    </ShotRotation>
  );
}
