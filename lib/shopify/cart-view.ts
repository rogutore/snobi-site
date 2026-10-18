import "server-only";
import type { Locale } from "@/content/products";
import type { Cart, Money } from "./client";

const moneyView = ({ amount, currencyCode }: Money) => ({ amount, currencyCode });

/* Explicit browser DTO. Cart.id contains a private Storefront key and stays in the
   httpOnly cookie/server calls. Do not spread Shopify objects across this boundary:
   future buyer or internal fields must not silently become client data. The hosted
   checkout URL and line IDs are intentionally retained for the existing UI flow. */
export function cartView(cart: Cart | null, lang: Locale) {
  if (!cart) return null;
  const checkout = new URL(cart.checkoutUrl);
  checkout.searchParams.set("locale", lang);
  return {
    checkoutUrl: checkout.toString(),
    totalQuantity: cart.totalQuantity,
    cost: {
      subtotalAmount: moneyView(cart.cost.subtotalAmount),
      totalAmount: moneyView(cart.cost.totalAmount),
    },
    lines: {
      nodes: cart.lines.nodes.map((line) => ({
        id: line.id,
        quantity: line.quantity,
        cost: { totalAmount: moneyView(line.cost.totalAmount) },
        merchandise: {
          id: line.merchandise.id,
          title: line.merchandise.title,
          availableForSale: line.merchandise.availableForSale,
          quantityAvailable: line.merchandise.quantityAvailable,
          price: moneyView(line.merchandise.price),
          product: {
            handle: line.merchandise.product.handle,
            title: line.merchandise.product.title,
          },
        },
      })),
    },
  };
}

export type CartView = NonNullable<ReturnType<typeof cartView>>;
