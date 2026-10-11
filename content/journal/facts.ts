/* Readers every journal post uses to print a SNöBI product or ordering fact (SINGLE_SOURCE rules 2–3, 2026-10-11).
   Facts live in content/products.ts and content/ordering.ts, the paper-drip dose in ./brew.ts; posts never retype them.
   A missing product, size or field throws: a visible build error, never a silent fallback or a gap on the page. */
import { products, type Coffee, type CoffeeVariant } from "../products";
import { orderingSchedule } from "../ordering";

type Size = CoffeeVariant["size"];

/** The product with this slug. */
export function coffee(slug: string): Coffee {
  const c = products.find((p) => p.slug === slug);
  if (!c) throw new Error(`journal: no product "${slug}" in content/products.ts`);
  return c;
}

/** Tax-included price of one size. */
export function price(c: Coffee, size: Size): number {
  const v = c.variants.find((x) => x.size === size);
  if (!v) throw new Error(`journal: ${c.slug} has no ${size} variant in content/products.ts`);
  return v.price;
}

/** Lowest and highest price of one size across the range ("100gは¥1,410〜¥2,560"). */
export function priceSpan(size: Size): { min: number; max: number } {
  const all = products.map((c) => price(c, size));
  return { min: Math.min(...all), max: Math.max(...all) };
}

/** Roast level, which every product must carry. */
export function roastOf(c: Coffee): string {
  if (!c.roast) throw new Error(`journal: ${c.slug} has no roast in content/products.ts`);
  return c.roast.ja;
}

/** Share of caffeine removed ("99.9%"), which a decaf must carry. */
export function caffeineCut(c: Coffee): string {
  if (!c.decaf || !c.caffeineCut) throw new Error(`journal: ${c.slug} is not a decaf with a caffeineCut in content/products.ts`);
  return c.caffeineCut;
}

/** Process without its closing note in （）, for tables: "ナチュラル・天日乾燥（アフリカンベッド、ハンドソート）" → "ナチュラル・天日乾燥". */
export const processShort = (c: Coffee) => c.process.ja.replace(/（[^（）]*）$/, "");

/** First sentence of "こんな人に" (bestFor), for tables: "毎日の一杯に。キャラメルと…" → "毎日の一杯に。". */
export function bestForShort(c: Coffee): string {
  const end = c.bestFor.ja.indexOf("。");
  if (end < 0) throw new Error(`journal: ${c.slug} bestFor has no 。 in content/products.ts`);
  return c.bestFor.ja.slice(0, end + 1);
}

/** Country as the first word of the Japanese title: "エチオピア グジ タデGG農園" → "エチオピア". */
export const countryJa = (c: Coffee) => c.title.ja.split(" ")[0];

/* The three schedule lines of content/ordering.ts by name. A change in their number or meaning stops the build. */
function scheduleLines(): [string, string, string] {
  const [days, cutoff, aging, ...rest] = orderingSchedule.ja;
  if (!days?.includes("焙煎") || !cutoff?.includes("注文") || !aging?.includes("発送") || rest.length)
    throw new Error("journal: content/ordering.ts orderingSchedule.ja is no longer [roast days, order cutoff, aging]; update content/journal/facts.ts");
  return [days, cutoff, aging];
}
export const [roastDaysLine, cutoffLine, agingLine] = scheduleLines();

/** A schedule line restated inside a sentence: ("…に焙煎、発送。", "します") → "…に焙煎、発送します。". */
export function restate(line: string, ending: string): string {
  if (!line.endsWith("。")) throw new Error(`journal: schedule line "${line}" no longer ends in 。`);
  return `${line.slice(0, -1)}${ending}。`;
}
