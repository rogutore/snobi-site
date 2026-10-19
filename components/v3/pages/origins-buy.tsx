"use client";
/* Mockup D's origin-page buy box (.buy: size pills with the price, one pill button, the small print), on the live
   Shopify cart — plus its follow-along bar (Kettl's product bar, the home buy bar's look): once the box has scrolled
   above the screen, a slim bar with this coffee, the same size choice, the price, add-to-cart and the free-shipping
   countdown stays at the bottom. One size state drives both. Stock/price rules: lib/shopify/stock.ts. */
import { useEffect, useRef, useState } from "react";
import { LoaderCircle } from "lucide-react";
import { yen, type Coffee } from "@/content/products";
import { orderingSummary, shippingProgress } from "@/content/ordering";
import { originFrames } from "@/content/v2";
import type { StockMap } from "@/lib/shopify/client";
import { canBuy, livePrice, buyLabel } from "@/lib/shopify/stock";
import { useCart } from "@/components/commerce/cart";
import { shotThumb } from "@/components/v2/photo";

type Size = "100g" | "200g";

export function OriginBuy({ p, stock, initialSize }: { p: Coffee; stock: StockMap; initialSize: Size }) {
  const [size, setSize] = useState<Size>(initialSize);
  const cart = useCart();
  const box = useRef<HTMLDivElement>(null);
  const [past, setPast] = useState(false);
  const [barFocused, setBarFocused] = useState(false);
  const showBar = past || barFocused;
  useEffect(() => {
    const el = box.current;
    if (!el) return;
    const button = el.querySelector<HTMLButtonElement>(".v3p-origins-add");
    if (!button) return;
    const mobile = window.matchMedia("(max-width: 860px)");
    const headerBottom = () => Math.max(0, document.querySelector(".v3-nav")?.getBoundingClientRect().bottom ?? 0);
    const update = () => {
      const r = button.getBoundingClientRect();
      const top = headerBottom();
      const fullyVisible = r.top >= top && r.bottom <= window.innerHeight;
      setPast(!fullyVisible && (mobile.matches || r.bottom <= top));
    };
    let io: IntersectionObserver;
    let frame = 0;
    const onScroll = () => {
      if (!frame) frame = window.requestAnimationFrame(() => { frame = 0; update(); });
    };
    const observe = () => {
      io?.disconnect();
      io = new IntersectionObserver(update, { threshold: [0, 1], rootMargin: `-${headerBottom()}px 0px 0px 0px` });
      io.observe(button);
      update();
    };
    mobile.addEventListener("change", observe);
    window.addEventListener("resize", observe);
    window.addEventListener("scroll", onScroll, { passive: true });
    observe();
    return () => { io.disconnect(); mobile.removeEventListener("change", observe); window.removeEventListener("resize", observe); window.removeEventListener("scroll", onScroll); window.cancelAnimationFrame(frame); };
  }, []);
  const v = p.variants.find((x) => x.size === size)!;
  const ok = canBuy(stock, v.id);
  const label = buyLabel(stock, v.id);
  const { left, pct } = shippingProgress(cart.subtotal);
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

      <div className={`v3-buybar v3-prodbar ${showBar ? "on" : ""}`} role="region" aria-label={`${p.title.ja}を購入`} aria-hidden={!showBar}
        onFocusCapture={() => setBarFocused(true)} onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setBarFocused(false); }}>
        {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP */}
        <img className="thumb" src={shotThumb(originFrames[p.slug].table)} alt="" />
        <div className="meta">
          <p className="name">{p.title.ja}</p>
          <div className="ship">
            <p>{left > 0 ? <>あと<b>{yen(left)}</b>で送料無料</> : <b>送料無料です</b>}</p>
            <span className="bar"><i style={{ width: `${pct}%` }} /></span>
          </div>
        </div>
        <div className="seg" role="radiogroup" aria-label="サイズ">
          {p.variants.map((x) => (
            <button key={x.id} type="button" role="radio" aria-checked={size === x.size} tabIndex={showBar ? 0 : -1} onClick={() => setSize(x.size)}>
              {x.size}
            </button>
          ))}
        </div>
        <button type="button" className="v3-btn add" disabled={!ok || cart.pending} tabIndex={showBar ? 0 : -1} onClick={() => cart.add(v.id)}
          aria-label={`${p.title.ja} ${size} ${yen(livePrice(stock, v))} — ${label}`}>
          {cart.pending ? <LoaderCircle size={14} className="v3-spin" aria-hidden /> : null}
          {ok ? <><span className="lbl">カートへ</span><b>{yen(livePrice(stock, v))}</b></> : <span>{label}</span>}
        </button>
      </div>
    </div>
  );
}
