"use client";
/* The one place the four coffees are sold on Home (was shown three times). Mockup D's release cards + buy controls. */
import Link from "next/link";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { products, yen, type Coffee } from "@/content/products";
import { originFrames } from "@/content/v2";
import { taste, tasteAxes, tasteDraft } from "@/content/taste";
import type { StockMap } from "@/lib/shopify/client";
import { buyLabel, canBuy, livePrice } from "@/lib/shopify/stock";
import { useCart } from "@/components/commerce/cart";
import { shotSrcSet } from "@/components/v2/photo";

function Card({ p, i, stock }: { p: Coffee; i: number; stock: StockMap }) {
  const [size, setSize] = useState<"100g" | "200g">("100g");
  const cart = useCart();
  const v = p.variants.find((x) => x.size === size)!;
  const ok = canBuy(stock, v.id);
  const price = livePrice(stock, v);
  const t = taste[p.slug];
  return (
    <article className="v3-card" aria-labelledby={`card-${p.slug}`}>
      <Link href={`/origins/${p.slug}`} className="ph" aria-label={`${p.title.ja}の産地ページへ`}>
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
        <img src={`/v2/photos/${originFrames[p.slug].hero}-s.webp`} srcSet={shotSrcSet(originFrames[p.slug].hero)}
          sizes="(min-width:1000px) 23vw, 80vw" alt={`SNöBI ${p.title.ja}`} loading="lazy" />
      </Link>
      <p className="n">{String(i + 1).padStart(2, "0")} — {p.country.toUpperCase()}</p>
      <h3 id={`card-${p.slug}`} className="t">{p.title.ja}</h3>
      <p className="s">{p.notes.ja.join(" · ")}</p>
      <p className="enjoy">{p.enjoyWithin.ja}</p>
      <ul className="chips">{p.chips.ja.map((c) => <li key={c}>{c}</li>)}</ul>
      {t ? (
        <dl className="taste" aria-label="味のバランス（5段階）">
          {tasteAxes.map(([k, l]) => (
            <div key={k}><dt>{l}</dt><dd><span style={{ width: `${(t[k] / 5) * 100}%` }} /><b className="v3-sr">{t[k]} / 5</b></dd></div>
          ))}
          {tasteDraft ? <p className="draft">仮の値・焙煎担当の確認待ち</p> : null}
        </dl>
      ) : null}
      <div className="buy">
        <div className="sizes" role="radiogroup" aria-label="サイズ">
          {p.variants.map((x) => (
            <button key={x.id} type="button" role="radio" aria-checked={size === x.size} onClick={() => setSize(x.size)}>{x.size}</button>
          ))}
        </div>
        <b className="price">{yen(price)}</b>
      </div>
      <button type="button" className="v3-btn add" disabled={!ok || cart.pending} onClick={() => cart.add(v.id)}>
        {cart.pending ? <LoaderCircle size={15} className="v3-spin" aria-hidden /> : null}
        {buyLabel(stock, v.id)}
      </button>
      <Link href={`/origins/${p.slug}`} className="more">産地について詳しく読みたい方 →</Link>
    </article>
  );
}

export function Shop({ stock }: { stock: StockMap }) {
  return <div className="v3-shop">{products.map((p, i) => <Card key={p.slug} p={p} i={i} stock={stock} />)}</div>;
}
