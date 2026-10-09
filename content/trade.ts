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
  cta: "取扱いについて相談する",
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
  enquiry: "担当者から、卸価格とお取引の進め方をメールでご連絡します。",
  closing: "このページでは、取扱いのご相談を受け付けています。ご注文は、Tokyo Coffeeの卸売で承ります。",
  /* the FAQ answer on /faq and the contact-page hint point here */
  faqAnswer: "取扱いのご相談を受け付けています。扱える豆とお問い合わせの流れは、取扱店向けページでご案内しています。",
  contactHint: "扱える豆と、ご相談の流れのご案内です。",
};

/* The enquiry form on /trade (owner 2026-10-09: "make a beautiful form for us now"). It posts into the existing Google
   Form, so answers land in the response sheet the team already reads. Entry ids and option labels VERIFIED from the form's
   public load data on 2026-10-09; after ANY edit to the Google Form, re-read them before changing these. Choice values
   must equal the Google labels character for character. Fields the Google Form lacks (prefecture, opening status, shop
   URL, coffees, where the visit came from) are written into its free-text answer by the server action. */
export const GOOGLE_FORM = {
  action: FORM_URL.replace(/\/viewform$/, "/formResponse"),
  shop: "entry.1950460192",
  name: "entry.961228833",
  email: "entry.1361471",
  type: "entry.170928151",
  interest: "entry.631131549",
  usage: "entry.1219200011",
  tel: "entry.1328587829",
  message: "entry.1093102172",
} as const;

export const tradeForm = {
  groups: { shop: "お店のこと", person: "ご担当者", ask: "ご相談の内容" },
  required: "必須",
  shop: { label: "店名・会社名", placeholder: "例）喫茶ひだまり" },
  type: { label: "業態", options: ["カフェ", "ロースター", "小売", "卸・商社", "ホテル・レストラン", "その他"] },
  pref: { label: "都道府県", placeholder: "選んでください" },
  status: { label: "営業状況", options: ["営業中", "開業準備中"], openingLabel: "開業予定の時期", openingPlaceholder: "例）2027年春" },
  url: { label: "お店のURL・Instagram", placeholder: "https:// または @アカウント名" },
  name: { label: "お名前", placeholder: "例）山田 花子" },
  email: { label: "メールアドレス", placeholder: "例）hanako@example.jp" },
  tel: { label: "電話番号", placeholder: "例）03-1234-5678" },
  coffees: { label: "気になる豆", hint: "いくつでも選べます。" },
  /* subset of the Google options: 「発売前サンプル請求」 and 「発売案内のみ希望」 are not offered (no samples promised; launched) */
  interest: { label: "ご相談の内容", hint: "いくつでも選べます。", options: ["卸価格のご案内", "OEM・プライベートブランド", "Tokyo Coffee 既存商品"] },
  usage: { label: "月間の豆の使用量（目安）", options: ["〜5kg", "5〜20kg", "20〜50kg", "50kg以上", "未定"] },
  message: { label: "ご質問・ご要望", placeholder: "メニューのこと、使い始めたい時期、気になることなど。" },
  privacy: "ご記入の内容は、取扱いのご連絡にのみ使います。",
  privacyLink: "プライバシーポリシー",
  privacyUrl: "https://tokyocoffee.jp/policies/privacy-policy", // VERIFIED 200, 「プライバシーポリシー」, 2026-10-09
  submit: "この内容で送る",
  sending: "送信しています",
  errors: {
    summary: "入力内容をご確認ください。",
    shop: "店名・会社名をご記入ください。",
    type: "業態を選んでください。",
    name: "お名前をご記入ください。",
    email: "メールアドレスの形式をご確認ください。",
    interest: "ご相談の内容を、1つ以上選んでください。",
    tooLong: "文字数が多すぎます。短くしてください。",
    send: "送信できませんでした。時間をおいてもう一度お試しいただくか、お電話・メールでご連絡ください。",
  },
  done: {
    h: "受け付けました。",
    body: (email: string) => `担当者から、${email} あてにご連絡します。`,
    thanks: "ありがとうございました。",
  },
};

