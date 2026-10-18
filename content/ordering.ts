import { roastDays } from "./schedule";
import { SYSTEM } from "./system.generated";
/* Ordering and shipping copy — ONE source for every page, cart and FAQ (SINGLE_SOURCE rule 2).
   Wording: Davy's site notes forwarded by the owner, 2026-10-08 ("Snobi Site — Davy and Masaki").
   Owner 2026-10-08: the shipping window is explained by aging — beans ship from roast day up to two weeks after roasting.
   Facts changed by those notes: roast AND ship on Tue/Fri; cutoff the same day (was "noon the day before",
   "next business day"); next-day delivery within Honshu; coffee ships within 2 weeks of roasting.
   EN lines are translations of the JA (English site has its own session, D5). TODO(registry): system.toml. */
import { yen, type Localized } from "./products";

export const FREE_SHIPPING_YEN = SYSTEM.free_shipping_yen;

/** Shared display calculation; Shopify still determines checkout eligibility and rates. */
export function shippingProgress(subtotal: number) {
  return {
    left: Math.max(0, FREE_SHIPPING_YEN - subtotal),
    pct: Math.min(100, (subtotal / FREE_SHIPPING_YEN) * 100),
  };
}

/* Shipping below FREE_SHIPPING_YEN, by region: the 特商法 page of the shared Shopify checkout
   (tokyocoffee.jp/pages/policy, read 2026-10-08). Remote islands are quoted separately. The legal page, FAQ, contact page,
   cart, journal and the product JSON-LD all read these (2026-10-09: they were hand-typed in six places). */
export const SHIPPING_YEN = { standard: 500, kyushu: 700, hokkaidoOkinawa: 800 } as const;
/* ISO 3166-2:JP codes (no "JP-" prefix), for the JSON-LD shipping regions. Standard = every other prefecture. */
export const SHIPPING_REGIONS = {
  kyushu: ["40", "41", "42", "43", "44", "45", "46"],
  hokkaidoOkinawa: ["01", "47"],
} as const;

export const shippingRates: Localized = {
  ja: `${yen(FREE_SHIPPING_YEN)}未満の場合は通常${yen(SHIPPING_YEN.standard)}、九州${yen(SHIPPING_YEN.kyushu)}、北海道・沖縄${yen(SHIPPING_YEN.hokkaidoOkinawa)}。離島は別途お見積りとなります。`,
  en: `Below ${yen(FREE_SHIPPING_YEN)}: ${yen(SHIPPING_YEN.standard)} standard / ${yen(SHIPPING_YEN.kyushu)} Kyushu / ${yen(SHIPPING_YEN.hokkaidoOkinawa)} Hokkaido & Okinawa. Remote islands quoted separately.`,
};
export const shippingRatesShort: Localized = {
  ja: `${yen(FREE_SHIPPING_YEN)}未満：通常${yen(SHIPPING_YEN.standard)}・九州${yen(SHIPPING_YEN.kyushu)}・北海道/沖縄${yen(SHIPPING_YEN.hokkaidoOkinawa)}。離島は別途。`,
  en: shippingRates.en,
};

/* Free shipping from FREE_SHIPPING_YEN, no full stop (callers add one). Read by the summary below and exported as
   freeShippingLine at its old place (2026-10-11: "¥3,000" was typed in both). */
const freeShipping: Localized = {
  ja: `${yen(FREE_SHIPPING_YEN)}以上で送料無料`,
  en: `Free shipping over ${yen(FREE_SHIPPING_YEN)}`,
};

/* Delivery time and the short form of the roast/ship days, no full stop (callers add one). The summary below and the
   journal read them (2026-10-11: "本州であれば翌日配達" was typed in 11 journal lines and here). */
export const nextDayLine: Localized = {
  ja: "本州であれば翌日配達",
  en: "Next-day delivery within Honshu",
};
export const roastShipShort: Localized = {
  ja: `${roastDays.map((d) => d.ja).join("・")}焙煎・発送`,
  en: `Roasted and shipped ${roastDays.map((d) => d.short).join(" / ")}`,
};

/* One-line summary under heroes and buy cards. */
export const orderingSummary: Localized = {
  ja: `税込表示 · ${freeShipping.ja} · ${roastShipShort.ja}。${nextDayLine.ja}。`,
  en: `Tax included · ${freeShipping.en} · ${roastShipShort.en}. ${nextDayLine.en}.`,
};

/* Order cutoff: Tokyo Coffee's 14時, so the roastery works to one deadline (owner 2026-10-12, Davy: "We should just say
   14:00 and NOT 正午"; it was 正午 from the 2026-10-08 notes). Roast and ship days stay Tue/Fri. */
export const ORDER_CUTOFF: Localized = { ja: "14時", en: "2 pm" };

/* How the bags travel. ネコポス is post-box delivery and takes no cash on delivery, so 代引き orders go another way
   (INFERRED from shops' notices, not Yamato's own page; owner 2026-10-12). Callers prefix the sizes. */
export const shipMethodLine: Localized = {
  ja: "ネコポスで発送します（代金引換のご注文を除く）",
  en: "ship by Nekopos (except cash-on-delivery orders)",
};

/* The schedule, as three short lines (FAQ, origin pages, cart). */
export const orderingSchedule: Localized<string[]> = {
  ja: [`${roastDays.map((d) => `${d.ja}曜日`).join("と")}に焙煎、発送。`, `当日の${ORDER_CUTOFF.ja}までのご注文が対象。`, "SNöBIの豆は焙煎後に少し寝かせる（エイジング）と味がなじむため、焙煎当日から焙煎後2週間までの豆を発送します。"],
  en: [`Roasted and shipped on ${roastDays.map((d) => `${d.en}s`).join(" and ")}.`, `Orders by ${ORDER_CUTOFF.en} on the day are included.`, "SNöBI beans settle with a little rest after roasting (aging), so we ship them anywhere from roast day to two weeks after roasting."],
};

export const freeShippingLine: Localized = freeShipping;
