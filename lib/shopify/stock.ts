/* Read one variant out of the Shopify stock map — the one rule for "can this be bought" and "what does it cost".
   Safe for client components (types only from client.ts). Price: the live Shopify price when Shopify returned it in
   JPY, else the decided price in content/products.ts (the same fallback every buy surface has used so far).
   TODO: the older v2/v3 surfaces still inline this; move them here when they are next touched. */
import type { CoffeeVariant } from "@/content/products";
import type { StockMap } from "./client";

export function canBuy(stock: StockMap, id: string) {
  const s = stock[id];
  return !!s?.availableForSale && (s.quantityAvailable === null || s.quantityAvailable > 0);
}

export function livePrice(stock: StockMap, v: CoffeeVariant) {
  const s = stock[v.id];
  return s?.price.currencyCode === "JPY" ? Number(s.price.amount) : v.price;
}

/** Button label for one variant: buyable, sold out, or stock not readable. */
export function buyLabel(stock: StockMap, id: string) {
  return canBuy(stock, id) ? "カートに入れる" : stock[id] ? "完売" : "在庫確認中";
}
