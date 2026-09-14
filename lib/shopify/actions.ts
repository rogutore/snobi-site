"use server";
import { cookies } from "next/headers";
import { products, type Locale } from "@/content/products";
import { storefront, CART_FIELDS, type Cart } from "./client";
type Result = { cart: Cart | null; error?: string };
type Payload = {
  cart: Cart | null;
  userErrors: { message: string; code?: string }[];
  warnings?: { message: string }[];
};
const mutationFields = `cart { ${CART_FIELDS} } userErrors { message code } warnings { message }`;
const message = (lang: Locale) =>
  lang === "en"
    ? "We could not update your bag. Please try again."
    : "カートを更新できませんでした。もう一度お試しください。";
function localize(cart: Cart | null, lang: Locale) {
  if (cart) {
    const url = new URL(cart.checkoutUrl);
    url.searchParams.set("locale", lang);
    cart.checkoutUrl = url.toString();
  }
  return cart;
}
function unpack(payload: Payload, lang: Locale): Result {
  return {
    cart: localize(payload.cart, lang),
    error: payload.userErrors.length
      ? message(lang)
      : payload.warnings?.length
        ? lang === "en"
          ? "The available quantity has changed. Please check your bag."
          : "在庫数が変わりました。カートの数量をご確認ください。"
        : undefined,
  };
}
async function remember(cart: Cart) {
  (await cookies()).set("snobi_cart", cart.id, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
}
async function readCart(): Promise<Cart | null> {
  const id = (await cookies()).get("snobi_cart")?.value;
  if (!id) return null;
  return (
    await storefront<{ cart: Cart | null }>(
      `query Cart($id:ID!) @inContext(country:JP) { cart(id:$id) { ${CART_FIELDS} } }`,
      { id },
    )
  ).cart;
}
export async function getCart(lang: Locale = "ja"): Promise<Result> {
  lang = lang === "en" ? "en" : "ja";
  try {
    const cart = await readCart();
    if (
      cart &&
      (!cart.attributes.some((a) => a.key === "lang" && a.value === lang) ||
        !cart.attributes.some(
          (a) => a.key === "source" && a.value === "snobi.jp",
        ))
    ) {
      const data = await storefront<{ cartAttributesUpdate: Payload }>(
        `mutation SyncLocale($id:ID!,$attributes:[AttributeInput!]!) { cartAttributesUpdate(cartId:$id,attributes:$attributes) { ${mutationFields} } }`,
        {
          id: cart.id,
          attributes: [
            { key: "source", value: "snobi.jp" },
            { key: "lang", value: lang },
          ],
        },
      );
      return unpack(data.cartAttributesUpdate, lang);
    }
    return { cart: localize(cart, lang) };
  } catch {
    return { cart: null, error: message(lang) };
  }
}
export async function addLine(
  variantId: string,
  lang: Locale = "ja",
): Promise<Result> {
  lang = lang === "en" ? "en" : "ja";
  if (
    !products.some((p) => p.variants.some((v) => v.id === variantId && !!v.id))
  )
    return { cart: null, error: message(lang) };
  try {
    const cart = await readCart();
    const attrs = [
      { key: "source", value: "snobi.jp" },
      { key: "lang", value: lang },
    ];
    if (!cart) {
      const data = await storefront<{ cartCreate: Payload }>(
        `mutation Create($input:CartInput!) @inContext(country:JP) { cartCreate(input:$input) { ${mutationFields} } }`,
        {
          input: {
            buyerIdentity: { countryCode: "JP" },
            attributes: attrs,
            lines: [{ merchandiseId: variantId, quantity: 1 }],
          },
        },
      );
      if (data.cartCreate.cart) await remember(data.cartCreate.cart);
      return unpack(data.cartCreate, lang);
    }
    const attributes = await storefront<{ cartAttributesUpdate: Payload }>(
      `mutation Attr($id:ID!,$attributes:[AttributeInput!]!) { cartAttributesUpdate(cartId:$id,attributes:$attributes) { ${mutationFields} } }`,
      { id: cart.id, attributes: attrs },
    );
    if (attributes.cartAttributesUpdate.userErrors.length)
      return unpack(attributes.cartAttributesUpdate, lang);
    const data = await storefront<{ cartLinesAdd: Payload }>(
      `mutation Add($id:ID!,$lines:[CartLineInput!]!) @inContext(country:JP) { cartLinesAdd(cartId:$id,lines:$lines) { ${mutationFields} } }`,
      { id: cart.id, lines: [{ merchandiseId: variantId, quantity: 1 }] },
    );
    return unpack(data.cartLinesAdd, lang);
  } catch {
    return { cart: null, error: message(lang) };
  }
}
export async function updateLine(
  lineId: string,
  quantity: number,
  lang: Locale = "ja",
): Promise<Result> {
  lang = lang === "en" ? "en" : "ja";
  if (!Number.isInteger(quantity) || quantity < 0 || quantity > 100)
    return { cart: null, error: message(lang) };
  if (quantity === 0) return removeLine(lineId, lang);
  try {
    const cart = await readCart();
    if (!cart || !cart.lines.nodes.some((l) => l.id === lineId))
      return { cart, error: message(lang) };
    const data = await storefront<{ cartLinesUpdate: Payload }>(
      `mutation Update($id:ID!,$lines:[CartLineUpdateInput!]!) @inContext(country:JP) { cartLinesUpdate(cartId:$id,lines:$lines) { ${mutationFields} } }`,
      { id: cart.id, lines: [{ id: lineId, quantity }] },
    );
    return unpack(data.cartLinesUpdate, lang);
  } catch {
    return { cart: null, error: message(lang) };
  }
}
export async function removeLine(
  lineId: string,
  lang: Locale = "ja",
): Promise<Result> {
  lang = lang === "en" ? "en" : "ja";
  try {
    const cart = await readCart();
    if (!cart || !cart.lines.nodes.some((l) => l.id === lineId))
      return { cart, error: message(lang) };
    const data = await storefront<{ cartLinesRemove: Payload }>(
      `mutation Remove($id:ID!,$lines:[ID!]!) @inContext(country:JP) { cartLinesRemove(cartId:$id,lineIds:$lines) { ${mutationFields} } }`,
      { id: cart.id, lines: [lineId] },
    );
    return unpack(data.cartLinesRemove, lang);
  } catch {
    return { cart: null, error: message(lang) };
  }
}
