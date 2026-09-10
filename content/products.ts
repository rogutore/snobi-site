// Label facts from Noah's sticker ideas/png exports. Unknown facts stay null.
// Prices and inventory are placeholders for the commerce preview.
export type Locale = "ja" | "en";
export type CoffeeVariant = {
  id: string;
  sku: string;
  size: "100g" | "200g";
  price: number;
};
export type Coffee = {
  handle: string;
  slug: string;
  title: Record<Locale, string>;
  country: string;
  region: string;
  notes: Record<Locale, string[]>;
  process: string;
  farm: string | null;
  elevation: string | null;
  variety: string | null;
  roast: string | null;
  decaf: boolean;
  color: string;
  ink: string;
  score: number | null;
  producerPayment: string | null;
  variants: CoffeeVariant[];
};
export const products: Coffee[] = [
  {
    handle: "snobi-peru",
    slug: "peru",
    title: { ja: "ペルー", en: "Peru" },
    country: "Peru",
    region: "San Ignacio, Cajamarca",
    notes: {
      ja: ["フローラル", "みかん", "紅茶"],
      en: ["Floral", "Mikan", "Tea"],
    },
    process: "Fully washed",
    farm: null,
    elevation: null,
    variety: "Gesha",
    roast: "Light",
    decaf: false,
    color: "#dce7d5",
    ink: "#77688f",
    score: null,
    producerPayment: null,
    variants: [
      { id: "", sku: "SNB-PER-100", size: "100g", price: 1600 },
      { id: "", sku: "SNB-PER-200", size: "200g", price: 2800 },
    ],
  },
  {
    handle: "snobi-colombia-huila",
    slug: "colombia-huila",
    title: { ja: "コロンビア・ウィラ", en: "Colombia Huila" },
    country: "Colombia",
    region: "Huila",
    notes: {
      ja: ["オレンジ", "キャラメル", "ナッツ"],
      en: ["Oranges", "Caramel", "Nuts"],
    },
    process: "Washed",
    farm: "Asobombo Farms",
    elevation: "1,700 m",
    variety: "Caturra, Colombia",
    roast: null,
    decaf: false,
    color: "#f5d8c0",
    ink: "#80532d",
    score: null,
    producerPayment: null,
    variants: [
      { id: "", sku: "SNB-COL-100", size: "100g", price: 1600 },
      { id: "", sku: "SNB-COL-200", size: "200g", price: 2800 },
    ],
  },
  {
    handle: "snobi-ethiopia-guji",
    slug: "ethiopia-guji",
    title: { ja: "エチオピア・グジ", en: "Ethiopia Guji" },
    country: "Ethiopia",
    region: "Guji",
    notes: {
      ja: ["紅茶", "ドライフルーツ", "ベリー"],
      en: ["Tea", "Dry fruit", "Berries"],
    },
    process: "Natural",
    farm: null,
    elevation: "1,830–2,200 m",
    variety: "Heirloom",
    roast: "Light",
    decaf: false,
    color: "#f8f3e4",
    ink: "#417fa3",
    score: null,
    producerPayment: null,
    variants: [
      { id: "", sku: "SNB-ETH-100", size: "100g", price: 2000 },
      { id: "", sku: "SNB-ETH-200", size: "200g", price: 3600 },
    ],
  },
  {
    handle: "snobi-mexico-chiapas-decaf",
    slug: "mexico-chiapas-decaf",
    title: { ja: "メキシコ・チアパス デカフェ", en: "Mexico Chiapas Decaf" },
    country: "Mexico",
    region: "Chiapas",
    notes: {
      ja: ["スイートポテト", "黒糖", "ナッツ"],
      en: ["Sweet potato", "Brown sugar", "Nuts"],
    },
    process: "Washed · Mountain Water Process",
    farm: null,
    elevation: "1,400–1,700 m",
    variety: null,
    roast: null,
    decaf: true,
    color: "#f8e29b",
    ink: "#64502a",
    score: null,
    producerPayment: null,
    variants: [
      { id: "", sku: "SNB-MEX-100", size: "100g", price: 1700 },
      { id: "", sku: "SNB-MEX-200", size: "200g", price: 3000 },
    ],
  },
];
export const minimumPrice = Math.min(
  ...products.flatMap((p) => p.variants.map((v) => v.price)),
);
export const yen = (value: number | string) =>
  `¥${Number(value).toLocaleString("ja-JP")}`;
export const FORM_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSc83irDFIv4XziLrsmpVrpq2wmypaNxnE58YKOg_aMH6fs-AA/viewform";
export const LEGAL_URL = "https://tokyocoffee.jp/pages/policy";
