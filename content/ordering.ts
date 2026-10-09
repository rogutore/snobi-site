/* Ordering and shipping copy — ONE source for every page, cart and FAQ (SINGLE_SOURCE rule 2).
   Wording: Davy's site notes forwarded by the owner, 2026-10-08 ("Snobi Site — Davy and Masaki").
   Owner 2026-10-08: the shipping window is explained by aging — beans ship from roast day up to two weeks after roasting.
   Facts changed by those notes: roast AND ship on Tue/Fri; cutoff is noon the same day (was "noon the day before",
   "next business day"); next-day delivery within Honshu; coffee ships within 2 weeks of roasting.
   EN lines are translations of the JA (English site has its own session, D5). TODO(registry): system.toml. */
import { yen, type Localized } from "./products";

export const FREE_SHIPPING_YEN = 3000; // Shopify general shipping profile (site-plan §1.2)

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

/* One-line summary under heroes and buy cards. */
export const orderingSummary: Localized = {
  ja: "税込表示 · ¥3,000以上で送料無料 · 火・金焙煎・発送。本州であれば翌日配達。",
  en: "Tax included · Free shipping over ¥3,000 · Roasted and shipped Tue / Fri. Next-day delivery within Honshu.",
};

/* The schedule, as three short lines (FAQ, origin pages, cart). */
export const orderingSchedule: Localized<string[]> = {
  ja: ["火曜日と金曜日に焙煎、発送。", "当日の正午までのご注文が対象。", "SNöBIの豆は焙煎後に少し寝かせる（エイジング）と味がなじむため、焙煎当日から焙煎後2週間までの豆を発送します。"],
  en: ["Roasted and shipped on Tuesdays and Fridays.", "Orders by noon on the day are included.", "SNöBI beans settle with a little rest after roasting (aging), so we ship them anywhere from roast day to two weeks after roasting."],
};

export const freeShippingLine: Localized = {
  ja: "¥3,000以上で送料無料",
  en: "Free shipping over ¥3,000",
};
