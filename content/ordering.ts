/* Ordering and shipping copy — ONE source for every page, cart and FAQ (SINGLE_SOURCE rule 2).
   Wording: Davy's site notes forwarded by the owner, 2026-10-08 ("Snobi Site — Davy and Masaki").
   Owner 2026-10-08: the shipping window is explained by aging — beans ship from roast day up to two weeks after roasting.
   Facts changed by those notes: roast AND ship on Tue/Fri; cutoff is noon the same day (was "noon the day before",
   "next business day"); next-day delivery within Honshu; coffee ships within 2 weeks of roasting.
   EN lines are translations of the JA (English site has its own session, D5). TODO(registry): system.toml. */
import type { Localized } from "./products";

export const FREE_SHIPPING_YEN = 3000; // Shopify general shipping profile (site-plan §1.2)

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
