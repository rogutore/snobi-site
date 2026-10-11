"use client";
/* v2 preview buy box: size choice + add to cart, on the live Shopify cart (CartProvider). */
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { yen, type Coffee } from "@/content/products";
import type { StockMap } from "@/lib/shopify/client";
import { canBuy, livePrice } from "@/lib/shopify/stock";
import { useCart } from "@/components/commerce/cart";

export function Buy({ product, stock, compact = false }: { product: Coffee; stock: StockMap; compact?: boolean }) {
  const [size, setSize] = useState<"100g" | "200g">("100g");
  const cart = useCart();
  const variant = product.variants.find((v) => v.size === size)!;
  const s = stock[variant.id];
  const available = canBuy(stock, variant.id);
  const price = livePrice(stock, variant);
  const label = cart.pending ? "更新中…" : available ? "カートに入れる" : s ? "完売" : "在庫を確認できません";
  return (
    <div className={`v2-buy ${compact ? "is-compact" : ""}`}>
      <fieldset className="v2-sizes">
        <legend className="v2-sr">サイズ</legend>
        {product.variants.map((v) => {
          const p = livePrice(stock, v);
          return (
            <label key={v.id}>
              <input type="radio" name={`size-${product.slug}${compact ? "-c" : ""}`} value={v.size} checked={size === v.size} onChange={() => setSize(v.size)} />
              <span className="t-label">{v.size}</span>
              <b className="t-price">{yen(p)}</b>
            </label>
          );
        })}
      </fieldset>
      <button type="button" className="v2-btn" disabled={!available || cart.pending} onClick={() => cart.add(variant.id)} aria-label={`${product.title.ja} ${size} ${yen(price)} — ${label}`}>
        {cart.pending ? <LoaderCircle size={16} className="v2-spin" aria-hidden /> : null}
        {label}
      </button>
    </div>
  );
}
