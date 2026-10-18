import type { Coffee } from "@/content/products";

/** Missing, repeated or unknown size parameters use the product's first listed bag.
 * Both locales share this existing default; valid links select the exact configured size. */
export function requestedSize(p: Coffee, size: string | string[] | undefined) {
  const variant = p.variants.find((v) => typeof size === "string" && v.size === size);
  return (variant ?? p.variants[0]).size;
}

export function variantUrl(url: string, size: Coffee["variants"][number]["size"]) {
  const result = new URL(url);
  result.searchParams.set("size", size);
  return result.toString();
}
