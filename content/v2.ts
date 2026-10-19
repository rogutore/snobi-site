import { SYSTEM } from "./system.generated";
/* v2 preview content that is not in content/products.ts: which shoot frame goes where, and its caption.
   Copy rules: product facts come from products.ts; the lines below are LIVE copy (sections.tsx, trade-page.tsx)
   or ✅ facts from design/plan/COPY-INVENTORY.md, cited per line. Captions are DRAFTS for the owner (plan Q4).
   When v2 replaces the live pages, sections.tsx's copies of these lines are deleted, not kept (SINGLE_SOURCE). */

import { trade } from "./trade";
import { FREE_SHIPPING_YEN, shippingRates, ORDER_CUTOFF, shipMethodLine, freeShippingLine, roastShipShort, nextDayLine } from "./ordering";
import { yen } from "./products";
import { orderingSchedule } from "./ordering";

export const SHOOT = "東京, 2026年10月1日";

/* Origin-page frames (design/plan/PHOTO-INVENTORY.md §3.3). */
export const originFrames: Record<string, { hero: string; table: string; hand: string; waist: string; brew: string; cup: string; beans: string; studio: string }> = {
  peru: { hero: "144", table: "025", hand: "047", waist: "053", brew: "128", cup: "133", beans: "152", studio: "253" },
  "ethiopia-guji": { hero: "143", table: "022", hand: "049", waist: "050", brew: "129", cup: "132", beans: "151", studio: "248" },
  "colombia-huila": { hero: "146", table: "024", hand: "046", waist: "052", brew: "127", cup: "136", beans: "158", studio: "254" },
  "mexico-chiapas-decaf": { hero: "145", table: "023", hand: "048", waist: "051", brew: "126", cup: "135", beans: "157", studio: "250" },
};

/* Producer numbers set as type. Each value is a VERIFIED fact (source in the comment). */
export const producerNumbers: Record<string, [string, string][]> = {
  peru: [["814", "組合に集う農家（ロット資料）"], ["1995", "ミゲルさんがコーヒーをつくりはじめた年"], ["1968", "チリノス組合の設立（FS ✅）"]], // P:77-78; FS:105
  "ethiopia-guji": [["221ha", "タデGG農園の広さ（FS ✅）"], ["約20km", "農園から自社精選所まで"], ["2,200m", "畑の最も高いところ"]], // FS:114; P:175; P:138
  "colombia-huila": [["10–12月", "収穫の季節"], ["1,700m", "ピタリートの畑"], ["ひとつ", "小さな農園の豆を、ひとつのロットに"]], // P:261; P:226; P:250
  "mexico-chiapas-decaf": [[`${SYSTEM.orizaba_elevation_m.toLocaleString("en-US")}m`, "オリサバ山。デカフェに使う氷河の水"], [`${SYSTEM.mexico_caffeine_cut}%`, "カフェインカット（薬品不使用）"], [SYSTEM.mexico_members.toLocaleString("en-US"), "グラポス農協の生産者"]], // P:339; P:330; P:329
};

/* About (ストーリー) — the five agreed chapters, live copy (sections.tsx line refs). */
export const statementJa = ["世界最高峰の品質。オーガニックという信念。地球への責任。", "三つは同時には成り立たない — そう言われてきました。", "SNöBI は、その常識を変えていく。"]; // :133-137
export const storyJa = ["オーガニックスペシャルティコーヒーの未来は、まだ完成していないと私たちは考えています。これは、私たちの第一章。", "もし、この挑戦に共感していただけたなら、次の章を、ぜひご一緒に。"]; // :219, :224
/* Story = one journey, Organic → People → Excellence → SNöBI (owner 2026-10-19 via the Codex hand-back, docs/codex/CC-HANDOFF-2026-10-19.md:
   "our starting point because of our love for organic, through our experiences and growth with people and community, and our
   commitment to excellence led us to snobi"). Every line rests on what the owner supplied: the organic conviction (humans and
   ecology), 12 years of roasting, customers / staff / fellow coffee travellers, "the best coffee I've ever had" heard many times
   (no single named review: never set it as a testimonial with a name), cupping and testing every organic bean they can get.
   DRAFT for owner review; not invented events, dates or farm relationships. Not 「オーガニック専門」/"organic-only": the roastery's
   JAS certificate is 有機・非有機併用 (COPY-INVENTORY §4.2). */
export const storyJourneyJa: { label: string; frame: string; alt: string; cap: string; lines: string[] }[] = [
  {
    label: "Organic.", frame: "162", alt: "スコップですくった生豆", cap: "01 — 生豆",
    lines: ["出発点は、オーガニックでした。", "人にとっても、生態系にとっても、有機農業は大切。東京コーヒーは、その信念から始まりました。"],
  },
  {
    label: "People.", frame: "215", alt: "建物の入口の前に集まるチーム", cap: "02 — 建物の前で",
    lines: [
      "12年、コーヒーを焙煎してきました。",
      "お客さま、スタッフ、コーヒーを旅する仲間。出会った人たちと味わい、学び、育ってきました。",
      "「今まで飲んだ中で、いちばんおいしい」。何度も、そう言っていただきました。その一言のために、焙煎しています。",
    ],
  },
  {
    label: "Excellence.", frame: "211", alt: "焙煎機を操作する人", cap: "03 — 焙煎中",
    lines: ["手に入る有機の豆は、すべて試します。", "カッピングして、調べて、また焙煎する。", "有機のままで、どこまでおいしくなれるか。それを確かめ続けています。"],
  },
];
export const storySnobiJa = {
  h: "想いと、出会いと、探求が重なって。SNöBIが生まれました。",
  lines: ["オーガニックとスペシャルティが、重なるところ。"],
};
export const signOff = "まあ、見てなって。"; // :227
export const roadAhead: [string, string, string][] = [
  ["01 / NOW", "第一章", "4つの産地。妥協のない、一つの基準。"],
  ["02 / NEXT", "探し続ける", "世界のオーガニックコーヒーを、もっと。"],
  ["03 / AHEAD", "ともにつくる", "研究、トレーニング、そしてコーヒーのコミュニティへ。"],
]; // :263-272

/* JAS facts (COPY-INVENTORY §4.2, from the certificate file). Publishing the number: owner question 3. */
export const jas: [string, string][] = [
  ["13OGP-2001", "有機加工食品 生産行程管理者の認定番号"],
  ["2020.04.30", "認定日"],
  ["JASCERT", "2026年7月からの認証機関"],
];

/* Ordering logistics. TODO(registry): move to system.toml (site-plan §4); kept once here for the preview. */
export const ordering = {
  roast: roastShipShort.ja,
  cutoff: `当日${ORDER_CUTOFF.ja}までのご注文`,
  ship: "本州は翌日配達",
  free: freeShippingLine.ja,
}; // Davy 2026-10-08; full lines live in content/ordering.ts

/* FAQ — live Q&A (sections.tsx:324-350), grouped. The price answer is built from products.ts in the page. */
export const faqGroups: { title: string; items: { q: string; a: string }[] }[] = [
  {
    title: "SNöBIについて",
    items: [
      { q: "SNöBIって、Tokyo Coffeeとどう違う？", a: "SNöBIはTokyo Coffeeがつくる、オーガニック・スペシャルティライン。第一章はペルー・ゲイシャ、コロンビア・ウィラ、エチオピア・グジ、メキシコ・チアパスのデカフェ。カッピングスコア80点以上の「スペシャルティコーヒー」の豆を使用しています。" },
      /* was one question 「有機？ 焙煎度は？ 粉でも買える？」 — split into three (Masaki 2026-10-09) */
      { q: "有機（オーガニック）ですか？", a: "はい。4種すべて、有機JAS認証品です。焙煎するTokyo Coffeeの焙煎所も、有機加工食品の認定を受けています。" },
      { q: "焙煎度は？", a: "全種類、豆の味を堪能出来る様に、「浅煎り」で焙煎しています。" },
      { q: "粉でも買える？", a: "豆のままでのお届けです。100gと200gから選べます。" },
    ],
  },
  {
    title: "注文と発送",
    items: [
      { q: "価格とサイズについて教えて。", a: "__PRICES__" },
      { q: "送料はいくら？", a: `${yen(FREE_SHIPPING_YEN)}以上のご注文で送料無料。${shippingRates.ja}100g・200gとも、${shipMethodLine.ja}。最終的な送料はレジでご確認いただけます。` },
      { q: "いつ焙煎して、いつ届く？", a: `${orderingSchedule.ja.join("")}${nextDayLine.ja}。` },
      { q: "どこで決済するの？", a: "決済はTokyo Coffeeが承ります。選んだ豆とサイズを引き継いで、Tokyo Coffeeの決済ページに進みます。ご利用いただける支払方法は決済画面に表示されます。" },
    ],
  },
  {
    title: "お店で扱う",
    items: [{ q: "自分のお店で取り扱いたい。", a: trade.faqAnswer }],
  },
];

/* Trade — live copy (trade-page.tsx:36-49, 65, 79-80, 100). */
export const tradeBenefits: [string, string][] = trade.facts.slice(0, 4); // old founding-25 offer removed 2026-10-09
