/* /trade copy — ONE source (owner 2026-10-09: drop the "最初の25店舗" offer — price lock to chapter two, roastery cupping,
   POP kit + snobi.jp listing — "we are not doing that anymore, or at least not promising").
   Synthesis of five wholesale pages (LIGHT UP, ONIBUS, Kurasu, La Cabra, Onyx) + Tokyo Coffee's own wholesale facts:
   research-outputs/2026-10-09-snobi-trade/trade-page.md §4. Only offers true today: no samples, no training, no listing,
   no price lock, no slot cap. Prices/minimums/roast day/shipping/payment are "explained on enquiry" until the owner sets
   them (§4.8 terms table held). Coffee rows render from content/products.ts; contact from content/legal.ts. */
import { FORM_URL } from "./products";

/* Verified public Google Form fields (trade-page.md §3): interest = 631131549; requests = 1093102172. */
export const tradeFormUrl =
  FORM_URL +
  "?usp=pp_url&entry.631131549=" +
  encodeURIComponent("卸価格のご案内") +
  "&entry.1093102172=" +
  encodeURIComponent("SNöBI / trade — 取扱いについて相談したい");

export const trade = {
  title: "取扱店｜有機JASのスペシャルティコーヒーを、お店で",
  description: "Tokyo Coffeeが焙煎する、有機JASのスペシャルティコーヒー4種。カフェ・小売店からの取扱いのご相談を受け付けています。",
  eyebrow: "For cafés & retailers",
  h1: "お店で扱う。",
  lead: "Tokyo Coffeeがつくる4つのオーガニック・スペシャルティコーヒーを、あなたのお店へ。",
  sub: "ご注文は、Tokyo Coffeeの卸売で承ります。このページでは、取扱いのご相談を受け付けています。",
  cta: "取扱店について相談する ↗",
  coffeesH2: "4種、すべて有機JAS。",
  coffeesLine: "デカフェも、有機JASのスペシャルティです。",
  factsH2: "お届けするもの。",
  facts: [
    ["有機JAS", "4種すべて、有機JAS認証品。"],
    ["焙煎所", "東京のTokyo Coffeeの焙煎所。有機加工食品の認定を受けています。"],
    ["スペシャルティ", "カッピングスコア80点以上の豆を使用。"],
    ["焙煎度", "4種とも浅煎り。"],
    ["形状", "豆のまま。"],
    ["ご注文", "Tokyo Coffeeの卸売アカウントから。"],
    ["卸価格", "お問い合わせください。"],
  ] as [string, string][],
  whoH2: "こんなお店へ。",
  who: "カフェ、レストラン、ホテル、小売店。浅煎りのシングルオリジンと、デカフェを扱いたいお店へ。",
  stepsH2: "はじめかた。",
  steps: [
    ["お問い合わせ", "フォームに、お店のことと月間使用量の目安をご記入ください。"],
    ["ご案内", "担当者から、卸価格とお取引の進め方をご連絡します。"],
    ["ご注文", "Tokyo Coffeeの卸売アカウントを登録して、ご注文いただけます。"],
  ] as [string, string][],
  faqH2: "よくある質問",
  faq: [
    { q: "卸価格、最低注文量、袋のサイズは？", a: "お問い合わせください。業種と月間使用量の目安をうかがって、ご案内します。" },
    { q: "どこから注文する？", a: "Tokyo Coffeeの卸売アカウントからご注文いただけます。登録の方法は、お問い合わせのあとにご案内します。" },
    { q: "焙煎と配送は？", a: "Tokyo Coffeeが焙煎し、発送します。焙煎日と送料は、お取引の開始時にご案内します。" },
    { q: "粉でも注文できる？", a: "豆のままでのお届けです。" },
    { q: "有機JASは、どう確かめられる？", a: "4種すべて有機JAS認証品です。焙煎するTokyo Coffeeの焙煎所は、有機加工食品の認定を受けています。" },
    { q: "支払い方法は？", a: "お取引の開始時にご案内します。" },
  ],
  enquiryEyebrow: "Prices on request",
  enquiryH2: "あなたのお店のことを、教えてください。",
  enquiry: "フォームは「卸価格のご案内」を選んだ状態で開きます。店舗名、ご担当者名、メールアドレス、業種、月間使用量の目安をご記入ください。",
  closing: "このページでは、取扱いのご相談を受け付けています。ご注文は、Tokyo Coffeeの卸売で承ります。",
  /* the FAQ answer on /faq and the contact-page hint point here */
  faqAnswer: "取扱いのご相談を受け付けています。扱える豆とお問い合わせの流れは、取扱店向けページでご案内しています。",
  contactHint: "扱える豆と、ご相談の流れのご案内です。",
};
