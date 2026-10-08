"use client";
/* Mockup D's origin-page buy box (.buy: size pills with the price, one pill button, the small print), on the live
   Shopify cart — plus its follow-along bar (Kettl's product bar, the home buy bar's look): once the box has scrolled
   above the screen, a slim bar with this coffee, the same size choice, the price, add-to-cart and the free-shipping
   countdown stays at the bottom. One size state drives both. Stock/price rules: lib/shopify/stock.ts. */
import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { yen, type Coffee } from "@/content/products";
import { orderingSummary, FREE_SHIPPING_YEN } from "@/content/ordering";
import { originFrames } from "@/content/v2";
import type { StockMap } from "@/lib/shopify/client";
import { canBuy, livePrice, buyLabel } from "@/lib/shopify/stock";
import { useCart } from "@/components/commerce/cart";

type Size = "100g" | "200g";

export function OriginBuy({ p, stock }: { p: Coffee; stock: StockMap }) {
  const [size, setSize] = useState<Size>("100g");
  const cart = useCart();
  const box = useRef<HTMLDivElement>(null);
  const [past, setPast] = useState(false);
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setPast(!e.isIntersecting && e.boundingClientRect.top < 0));
    io.observe(el);
    return () => io.disconnect();
  }, []);
  const v = p.variants.find((x) => x.size === size)!;
  const ok = canBuy(stock, v.id);
  const label = buyLabel(stock, v.id);
  const left = Math.max(0, FREE_SHIPPING_YEN - cart.subtotal);
  const pct = Math.min(100, (cart.subtotal / FREE_SHIPPING_YEN) * 100);
  return (
    <div className="v3p-origins-buy" ref={box}>
      <fieldset className="v3p-origins-sizes">
        <legend className="v3-sr">サイズ</legend>
        {p.variants.map((x) => (
          <label key={x.id}>
            <input type="radio" name={`size-${p.slug}`} value={x.size} checked={size === x.size} onChange={() => setSize(x.size)} />
            <span>{x.size}</span>
            <b>{yen(livePrice(stock, x))}</b>
          </label>
        ))}
      </fieldset>
      <button type="button" className="v3-btn v3p-origins-add" disabled={!ok || cart.pending} onClick={() => cart.add(v.id)}
        aria-label={`${p.title.ja} ${size} ${yen(livePrice(stock, v))} — ${label}`}>
        {cart.pending ? <LoaderCircle size={15} className="v3-spin" aria-hidden /> : null}
        {label}
      </button>
      <p className="v3p-origins-fine">{orderingSummary.ja}</p>

      <div className={`v3-buybar v3-prodbar ${past ? "on" : ""}`} role="region" aria-label={`${p.title.ja}を購入`} aria-hidden={!past}>
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP */}
        <img className="thumb" src={`/v2/photos/${originFrames[p.slug].table}-s.webp`} alt="" />
        <div className="meta">
          <p className="name">{p.title.ja}</p>
          <div className="ship">
            <p>{left > 0 ? <>あと<b>{yen(left)}</b>で送料無料</> : <b>送料無料です</b>}</p>
            <span className="bar"><i style={{ width: `${pct}%` }} /></span>
          </div>
        </div>
        <div className="seg" role="radiogroup" aria-label="サイズ">
          {p.variants.map((x) => (
            <button key={x.id} type="button" role="radio" aria-checked={size === x.size} tabIndex={past ? 0 : -1} onClick={() => setSize(x.size)}>
              {x.size}
            </button>
          ))}
        </div>
        <button type="button" className="v3-btn add" disabled={!ok || cart.pending} tabIndex={past ? 0 : -1} onClick={() => cart.add(v.id)}
          aria-label={`${p.title.ja} ${size} ${yen(livePrice(stock, v))} — ${label}`}>
          {cart.pending ? <LoaderCircle size={14} className="v3-spin" aria-hidden /> : null}
          {ok ? <><span className="lbl">カートへ</span><b>{yen(livePrice(stock, v))}</b></> : <span>{label}</span>}
        </button>
      </div>
    </div>
  );
}
