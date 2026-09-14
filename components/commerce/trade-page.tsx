import type { Locale } from "@/content/products";
import { FORM_URL } from "@/content/products";
import { CartProvider } from "./cart";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
// Verified public Google Form fields: interest = 631131549; requests = 1093102172.
const tradeUrl =
  FORM_URL +
  "?usp=pp_url&entry.631131549=" +
  encodeURIComponent("卸価格のご案内") +
  "&entry.1093102172=" +
  encodeURIComponent("SNöBI / trade — 取扱店 第一章について相談したい");
export function TradePage({ lang = "ja" }: { lang?: Locale }) {
  const en = lang === "en";
  const benefits = en
    ? [
        [
          "25 founding stockists",
          "A small first chapter, built with cafés and retailers who share our curiosity.",
        ],
        [
          "A price you can plan around",
          "Agreed wholesale pricing locked through Chapter Two. Prices on request.",
        ],
        [
          "Come to the roastery",
          "An invitation to a roastery cupping to get to know the coffees.",
        ],
        [
          "Ready for your counter",
          "Point-of-purchase materials and a stockist listing on snobi.jp.",
        ],
      ]
    : [
        [
          "最初の25店舗",
          "コーヒーへの好奇心を共有するカフェ・小売店と、小さな第一章を。",
        ],
        [
          "第二章まで、価格を固定",
          "合意した卸価格を第二章まで固定します。価格はお問い合わせください。",
        ],
        [
          "ロースタリーで、一緒に飲む",
          "豆を知っていただくための、ロースタリーでのカッピングへご招待。",
        ],
        [
          "お店で伝えるための道具",
          "店頭POPキットをご用意。snobi.jpに取扱店として掲載します。",
        ],
      ];
  return (
    <CartProvider lang={lang}>
      <Nav en={en} paper home={false} />
      <main className="trade-page">
        <p className="eyebrow">CHAPTER ONE / THE FOUNDING 25</p>
        <h1 className="display">
          Good company.
          <br />
          <em>Better coffee.</em>
        </h1>
        <p className="trade-lead">
          {en
            ? "Stock SNöBI. Four organic specialty coffees from Tokyo Coffee, for counters with a point of view."
            : "取扱店 第一章。Tokyo Coffeeがつくる4つのオーガニック・スペシャルティコーヒーを、あなたのお店へ。"}
        </p>
        <ol className="trade-benefits">
          {benefits.map(([t, d]) => (
            <li key={t}>
              <h2>{t}</h2>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <div className="trade-apply">
          <p className="eyebrow">PRICES ON REQUEST</p>
          <h2 className="display text-3xl">
            {en
              ? "Tell us about your place."
              : "あなたのお店のことを、教えてください。"}
          </h2>
          <p>
            {en
              ? "The form opens with wholesale enquiries selected. Please add your shop, contact details and expected monthly volume."
              : "フォームには「卸価格のご案内」と取扱店のご相談が入力されています。店舗情報、ご連絡先、月間使用量の目安をご記入ください。"}
          </p>
          <a
            href={tradeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="commerce-button"
          >
            {en ? "Enquire about stocking SNöBI" : "取扱店について相談する"}
            <span>↗</span>
          </a>
        </div>
        <p className="trade-flow">
          {en
            ? "Enquire → speak with our team → account approval → wholesale ordering through Tokyo Coffee. This page accepts enquiries; approved accounts receive access to Tokyo Coffee’s wholesale ordering flow."
            : "お問い合わせ → 担当者からご案内 → お取引口座の承認 → Tokyo Coffeeの業務用注文へ。このページではご相談を受け付けています。承認後、Tokyo Coffeeの業務用注文をご案内します。"}
        </p>
      </main>
      <Footer en={en} />
    </CartProvider>
  );
}
