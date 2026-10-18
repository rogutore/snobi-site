"use client";
/* Always-visible buy route — improvement 2 (owner: "show me", 2026-10-08; on Story/Journal/FAQ too, S3). Daylight's "Order now" + Kettl's sticky
   add bar + Apple's product bar. Appears once the hero has scrolled away; hides while the Fuji climb or the shop row is
   on screen (they already sell). The free-shipping line reads the real cart subtotal (CartProvider) against the one
   threshold in content/ordering.ts. */
import { useEffect, useState } from "react";
import { products, yen } from "@/content/products";
import { shippingProgress } from "@/content/ordering";
import { originFrames } from "@/content/v2";
import type { StockMap } from "@/lib/shopify/client";
import { canBuy, livePrice } from "@/lib/shopify/stock";
import { useCart } from "@/components/commerce/cart";

const minPrice = Math.min(...products.flatMap((p) => p.variants.map((v) => v.price)));

export function BuyBar({ stock }: { stock: StockMap }) {
  const cart = useCart();
  const [show, setShow] = useState(false);
  useEffect(() => {
    // Home: after the film. Brand pages (Story, Journal, FAQ; owner OK 2026-10-08, S3): after their first section.
    const hero = document.querySelector(".v3-film") ?? document.querySelector("main section");
    const sellers = [...document.querySelectorAll(".v3-climb-stage, #releases")];
    const vis = new Map<Element, boolean>();
    const update = () => {
      const heroGone = hero ? !vis.get(hero) : true;
      const selling = sellers.some((s) => vis.get(s));
      setShow(heroGone && !selling);
    };
    const io = new IntersectionObserver((es) => { es.forEach((e) => vis.set(e.target, e.isIntersecting)); update(); }, { threshold: 0.15 });
    [hero, ...sellers].forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  const { left, pct } = shippingProgress(cart.subtotal);
  return (
    <div className={`v3-buybar ${show ? "on" : ""}`} role="region" aria-label="購入" aria-hidden={!show}>
      <div className="bags">
        {products.map((p) => {
          const v = p.variants.find((x) => x.size === "100g")!;
          const ok = canBuy(stock, v.id);
          return (
            <button key={p.slug} type="button" disabled={!ok || cart.pending} tabIndex={show ? 0 : -1}
              onClick={() => cart.add(v.id)} aria-label={`${p.title.ja} 100g ${yen(livePrice(stock, v))} をカートに入れる`} title={`${p.title.ja} 100g`}>
              {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP */}
              <img src={`/v2/photos/${originFrames[p.slug].table}-s.webp`} alt="" loading="lazy" decoding="async" />
              <span aria-hidden>＋</span>
            </button>
          );
        })}
      </div>
      <div className="meta">
        <p className="from"><b>{yen(minPrice)}〜</b>（税込）· 100g</p>
        <div className="ship">
          <p>{left > 0 ? <>あと<b>{yen(left)}</b>で送料無料</> : <b>送料無料です</b>}</p>
          <span className="bar"><i style={{ width: `${pct}%` }} /></span>
        </div>
      </div>
      <button type="button" className="v3-btn cartbtn" tabIndex={show ? 0 : -1} onClick={cart.open}>カート {cart.count > 0 ? `(${cart.count})` : ""}</button>
    </div>
  );
}
