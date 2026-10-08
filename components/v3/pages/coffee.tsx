"use client";
/* /coffee — Mockup D's coffee.html rows (.photoswitch + .crow + .buy), on the live cart.
   Changed from Mockup D (owner/Davy 2026-10-08): enjoyWithin under the notes, 焙煎度 for all four, a 品種 row (Mexico's
   variety was missing), live price + real cart, the schedule line from content/ordering.ts, the origin link label. */
import Link from "next/link";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { products, yen, type Coffee } from "@/content/products";
import { orderingSchedule } from "@/content/ordering";
import { originFrames } from "@/content/v2";
import type { StockMap } from "@/lib/shopify/client";
import { useCart } from "@/components/commerce/cart";

/* Mockup D's 近く set = the tighter dappled frames (PHOTO-INVENTORY §2; dHash match to mockup-d *-close.webp, VERIFIED).
   Not in originFrames yet: proposed as a shared addition to content/v2.ts, then delete this map. */
const CLOSE: Record<string, string> = { peru: "141", "ethiopia-guji": "142", "colombia-huila": "138", "mexico-chiapas-decaf": "140" };

type SetKey = "studio" | "hero" | "table" | "close" | "hand" | "waist" | "cup" | "brew";
/* Mockup D's order, labels and object-positions (site.js POS); its dapple/pour sets are originFrames hero/brew. */
const SETS: [SetKey, string, string][] = [
  ["studio", "白背景", "50% 55%"], ["hero", "光の中", "50% 62%"], ["table", "机の上", "50% 62%"], ["close", "近く", "50% 66%"],
  ["hand", "手に", "60% 45%"], ["waist", "腰の高さ", "50% 58%"], ["cup", "カップと", "62% 60%"], ["brew", "ドリップ", "74% 55%"],
];

function frameFor(slug: string, set: SetKey) {
  const id = set === "close" ? CLOSE[slug] : originFrames[slug]?.[set];
  if (!id) throw new Error(`v3/coffee: no "${set}" frame for ${slug}`);
  return id;
}

function Row({ p, i, set, pos, stock }: { p: Coffee; i: number; set: SetKey; pos: string; stock: StockMap }) {
  const [size, setSize] = useState<"100g" | "200g">("100g");
  const cart = useCart();
  const v = p.variants.find((x) => x.size === size)!;
  const s = stock[v.id];
  const ok = !!s?.availableForSale && (s.quantityAvailable === null || s.quantityAvailable > 0);
  const label = ok ? "カートに入れる" : s ? "完売" : "在庫確認中";
  const id = frameFor(p.slug, set);
  const n = (k: number) => String(k).padStart(2, "0");
  return (
    <article className="v3p-coffee-row" id={p.slug} style={{ "--rink": p.ink } as React.CSSProperties} aria-labelledby={`c-${p.slug}`}>
      <div className="v3p-coffee-ph">
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
        <img src={`/v2/photos/${id}-s.webp`} srcSet={`/v2/photos/${id}-s.webp 700w, /v2/photos/${id}-l.webp 1400w`}
          sizes="(min-width: 861px) 40vw, calc(100vw - 32px)" alt={`SNöBI ${p.title.ja}`} style={{ objectPosition: pos }}
          loading={i === 0 ? "eager" : "lazy"} />
      </div>
      <div className="v3p-coffee-copy">
        <p className="eyebrow">第一章 — {n(i + 1)} / {n(products.length)}{p.decaf ? " · DECAF" : ""}</p>
        <p className="v3p-coffee-country" lang="en">{p.country}</p>
        <h2 id={`c-${p.slug}`} className="v3p-coffee-title">{p.title.ja}</h2>
        <p className="v3p-coffee-notes">{p.notes.ja.join(" · ")}</p>
        <p className="v3p-coffee-enjoy">{p.enjoyWithin.ja}</p>
        <p className="v3p-coffee-best">{p.bestFor.ja}</p>
        <dl className="v3p-coffee-facts">
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
              const xs = stock[x.id];
              const price = xs?.price.currencyCode === "JPY" ? Number(xs.price.amount) : x.price;
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
  const [set, setSet] = useState<SetKey>("hero");
  const pos = SETS.find(([k]) => k === set)![2];
  return (
    <div className="v3p-coffee-wrap">
      <div className="v3-switch" role="group" aria-label="袋の写真を切り替える">
        <span className="eyebrow">写真</span>
        {SETS.map(([k, l]) => (
          <button key={k} type="button" aria-pressed={set === k} onClick={() => setSet(k)}>{l}</button>
        ))}
      </div>
      {products.map((p, i) => <Row key={p.slug} p={p} i={i} set={set} pos={pos} stock={stock} />)}
    </div>
  );
}
