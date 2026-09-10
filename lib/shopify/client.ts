import "server-only";
import { products } from "@/content/products";
export type Money = { amount: string; currencyCode: string };
export type Stock = {
  id: string;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: Money;
};
export type StockMap = Record<string, Stock>;
export type Cart = {
  id: string;
  checkoutUrl: string;
  totalQuantity: number;
  attributes: { key: string; value: string }[];
  cost: { subtotalAmount: Money; totalAmount: Money };
  lines: {
    nodes: {
      id: string;
      quantity: number;
      cost: { totalAmount: Money };
      merchandise: {
        id: string;
        title: string;
        availableForSale: boolean;
        quantityAvailable: number | null;
        price: Money;
        product: { handle: string; title: string };
      };
    }[];
  };
};
export const CART_FIELDS = `id checkoutUrl totalQuantity attributes { key value } cost { subtotalAmount { amount currencyCode } totalAmount { amount currencyCode } } lines(first:100) { nodes { id quantity cost { totalAmount { amount currencyCode } } merchandise { ... on ProductVariant { id title availableForSale quantityAvailable price { amount currencyCode } product { handle title } } } } }`;
export async function storefront<T>(
  query: string,
  variables: Record<string, unknown> = {},
): Promise<T> {
  const domain = process.env.SHOPIFY_STORE_DOMAIN;
  const token = process.env.SHOPIFY_STOREFRONT_TOKEN;
  if (!domain || !token || token === "[SENSITIVE]")
    throw new Error("Storefront configuration unavailable");
  const r = await fetch(
    `https://${domain}/api/${process.env.SHOPIFY_API_VERSION || "2026-07"}/graphql.json`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": token,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
      signal: AbortSignal.timeout(12000),
    },
  );
  const body = await r.json();
  if (!r.ok || body.errors)
    throw new Error("Shopify could not complete this request");
  return body.data;
}
export async function getStock(): Promise<{ stock: StockMap; error: boolean }> {
  const ids = products
    .flatMap((p) => p.variants.map((v) => v.id))
    .filter(Boolean);
  if (!ids.length) return { stock: {}, error: true };
  try {
    const data = await storefront<{ nodes: (Stock | null)[] }>(
      `query Stock($ids:[ID!]!) @inContext(country:JP) { nodes(ids:$ids) { ... on ProductVariant { id availableForSale quantityAvailable price { amount currencyCode } } } }`,
      { ids },
    );
    return {
      stock: Object.fromEntries(
        data.nodes.filter((n): n is Stock => !!n).map((n) => [n.id, n]),
      ),
      error: data.nodes.some((n) => !n),
    };
  } catch {
    return { stock: {}, error: true };
  }
}
