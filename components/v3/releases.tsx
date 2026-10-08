"use client";
/* Mockup D's releases row (Kettl: releases on paper) with its photo switch; default = in the light (dapple).
   2026-10-08: it is the home shop — each card adds Davy's freshness line, size, live price and add to cart. */
import Link from "next/link";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { products, yen, type Coffee } from "@/content/products";
import { originFrames } from "@/content/v2";
import type { StockMap } from "@/lib/shopify/client";
import { useCart } from "@/components/commerce/cart";

type SetKey = keyof (typeof originFrames)["peru"];
const SETS: [SetKey, string][] = [
  ["hero", "光の中"], ["studio", "白背景"], ["table", "机の上"], ["hand", "手に"], ["waist", "腰の高さ"], ["cup", "カップと"], ["brew", "ドリップ"],
];

function Card({ p, i, set, stock }: { p: Coffee; i: number; set: SetKey; stock: StockMap }) {
  const [size, setSize] = useState<"100g" | "200g">("100g");
  const cart = useCart();
  const v = p.variants.find((x) => x.size === size)!;
  const s = stock[v.id];
  const ok = !!s?.availableForSale && (s.quantityAvailable === null || s.quantityAvailable > 0);
  const price = s?.price.currencyCode === "JPY" ? Number(s.price.amount) : v.price;
  const id = originFrames[p.slug][set];
  return (
    <article className="v3-rel" aria-labelledby={`rel-${p.slug}`}>
      <Link href={`/origins/${p.slug}`} className="ph" aria-label={`${p.title.ja}の産地ページへ`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
        <img src={`/v2/photos/${id}-s.webp`} srcSet={`/v2/photos/${id}-s.webp 700w, /v2/photos/${id}-l.webp 1400w`} sizes="(min-width:1000px) 23vw, 70vw" alt={`SNöBI ${p.title.ja}`} loading="lazy" />
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
  const [set, setSet] = useState<SetKey>("hero");
  return (
    <>
      <div className="v3-switch" role="group" aria-label="袋の写真を切り替える">
        <span className="eyebrow">写真</span>
        {SETS.map(([k, l]) => (
          <button key={k} type="button" aria-pressed={set === k} onClick={() => setSet(k)}>{l}</button>
        ))}
      </div>
      <div className="v3-releases">
        {products.map((p, i) => <Card key={p.slug} p={p} i={i} set={set} stock={stock} />)}
      </div>
    </>
  );
}
