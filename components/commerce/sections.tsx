import { trade } from "@/content/trade";
import Image from "next/image";
import Link from "next/link";
import { products, minimumPrice, yen, type Locale } from "@/content/products";
import { getStock } from "@/lib/shopify/client";
import { BuyCard } from "./buy-card";
import { orderingSummary, orderingSchedule, freeShippingLine, FREE_SHIPPING_YEN, shippingRates, shipMethodLine } from "@/content/ordering";
export async function ShopSection({ lang = "ja" }: { lang?: Locale }) {
  const { stock, error } = await getStock();
  const en = lang === "en";
  return (
    <section id="shop" className="shop-section">
      <div className="section-intro">
        <div>
          <p className="eyebrow">CHAPTER ONE — ORGANIC COFFEE</p>
          <h2 className="display">
            Four origins.
            <br />
            <em>Your next cup.</em>
          </h2>
        </div>
        <div className="shop-intro-copy">
          <p>
            {en
              ? "Four origins, four personalities. All organic."
              : "4つの産地、4つの個性。すべてオーガニック。"}
          </p>
          <p className="small-print">
            <strong>{freeShippingLine[lang]}</strong>
          </p>
        </div>
      </div>
      {error && (
        <p className="stock-notice" role="status">
          {en
            ? "Some stock information is temporarily unavailable. Please reload before ordering."
            : "一部の在庫情報を取得できませんでした。再読み込みしてお試しください。"}
        </p>
      )}
      <div className="coffee-grid">
        {products.map((p, i) => (
          <BuyCard
            key={p.handle}
            product={p}
            index={i}
            lang={lang}
            stock={stock}
          />
        ))}
      </div>
      <p className="shop-footnote">
        {orderingSchedule[lang].join("")}
      </p>
    </section>
  );
}
export function ProductHero({ lang = "ja" }: { lang?: Locale }) {
  const en = lang === "en";
  return (
    <section id="top" className="product-hero hybrid-hero">
      <div className="product-hero-copy">
        <p className="eyebrow">ORGANIC × SPECIALTY × JAPAN — EST. 2026</p>
        <h1 className="display">
          {en ? (
            <>
              Organic.
              <br />
              <em>And actually specialty.</em>
            </>
          ) : (
            <>
              オーガニックのまま、
              <br />
              スペシャルティ。
            </>
          )}
        </h1>
        <p className="hero-jp">
          {en
            ? `Only JAS-certified organic beans, roasted in Tokyo. Start with 100g, from ${yen(minimumPrice)} including tax.`
            : `JAS有機認証の豆だけを、東京で焙煎。まずは100g、${yen(minimumPrice)}（税込）から。`}
        </p>
      </div>
      <div className="hero-lineup">
        <Image
          src="/products/chapter-one-lineup.jpg"
          alt={
            en
              ? "Chapter One: Peru, Ethiopia, Colombia and Mexico decaf"
              : "第一章：ペルー、エチオピア、コロンビア、メキシコ・デカフェ"
          }
          width={1800}
          height={850}
          sizes="(min-width:1024px) 760px, 100vw"
          loading="eager"
          fetchPriority="high"
        />
      </div>
      <div className="hero-buy">
        <p>
          <strong>{yen(minimumPrice)}〜</strong>{" "}
          <span>{en ? "tax included · whole bean" : "（税込）・豆のまま"}</span>
        </p>
        <a href="#shop" className="commerce-button">
          {en ? "Choose from four origins" : "4つの産地から選ぶ"}
          <span>↓</span>
        </a>
        <p className="hero-microline">
          {orderingSummary[lang]}
        </p>
      </div>
    </section>
  );
}
export function Statement({ lang = "ja" }: { lang?: Locale }) {
  return (
    <section id="statement" className="hybrid-statement">
      <p>
        {lang === "en" ? (
          <>
            World-class quality. Organic principles. Care for the environment.
            <br />
            We’ve been told you can’t have all three.
            <br />
            SNöBI is here to prove otherwise.
          </>
        ) : (
          <>
            世界最高峰の品質。オーガニックという信念。地球への責任。
            <br />
            三つは同時には成り立たない — そう言われてきました。
            <br />
            SNöBI は、その常識を変えていく。
          </>
        )}
      </p>
    </section>
  );
}
export function Receipts({ lang = "ja" }: { lang?: Locale }) {
  const en = lang === "en";
  const rows = en
    ? [
        [
          "Origin & producer",
          "The place and people behind each coffee, on its origin page.",
        ],
        [
          "Processing & drying",
          "How each coffee is processed and dried, on its origin page.",
        ],
        [
          "Roast date (on the bag)",
          "The day we roasted your coffee, printed on every bag.",
        ],
      ]
    : [
        [
          "産地・生産者",
          "どこで、だれが育てた豆かを、各産地ページでご紹介します。",
        ],
        [
          "精製・乾燥",
          "豆ごとの精製方法と乾燥方法を、各産地ページでお伝えします。",
        ],
        [
          "焙煎日（袋に記載）",
          "いつ焙煎したかを、一袋ずつ記載してお届けします。",
        ],
      ];
  return (
    <section id="receipts" className="receipts-section">
      <div>
        <p className="eyebrow">THE RECEIPTS</p>
        <h2 className="display">
          {en
            ? "Who grew it, where, how. And when we roasted it."
            : "だれが、どこで、どうつくったか。そして、いつ焼いたか。"}
        </h2>
      </div>
      <dl>
        {rows.map(([t, d]) => (
          <div key={t}>
            <dt>{t}</dt>
            <dd>{d}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
export function CompactStory({ lang = "ja" }: { lang?: Locale }) {
  const en = lang === "en";
  return (
    <section id="story" className="compact-story hybrid-story">
      <div className="story-photo">
        <Image
          src="/photos/237.jpg"
          alt={
            en
              ? "Preparing coffee"
              : "コーヒーを淹れる様子"
          }
          fill
          sizes="(min-width:1024px) 50vw,100vw"
          className="object-cover"
        />
      </div>
      <div className="story-copy">
        <p className="eyebrow">THE STORY</p>
        <h2 className="display">We’re writing it.</h2>
        <p>
          {en
            ? "We believe the future of organic specialty coffee hasn’t been written yet. This is our first chapter."
            : "オーガニックスペシャルティコーヒーの未来は、まだ完成していないと私たちは考えています。これは、私たちの第一章。"}
        </p>
        <p>
          {en
            ? "If our pursuit resonates with you, we’d be honored to write the next one together."
            : "もし、この挑戦に共感していただけたなら、次の章を、ぜひご一緒に。"}
        </p>
        <p className="story-signoff">
          {en ? "Just watch us." : "まあ、見てなって。"}
        </p>
      </div>
    </section>
  );
}
export function CompactRoad({ lang = "ja" }: { lang?: Locale }) {
  const en = lang === "en";
  return (
    <section id="road" className="compact-road">
      <p className="eyebrow">THE ROAD AHEAD</p>
      <h2 className="display">
        A first chapter.
        <br />
        <em>Not a finish line.</em>
      </h2>
      <ol>
        {(en
          ? [
              [
                "01 / NOW",
                "Chapter One",
                "Four origins. One uncompromising standard.",
              ],
              [
                "02 / NEXT",
                "Keep exploring",
                "The search for exceptional organic coffee continues.",
              ],
              [
                "03 / AHEAD",
                "Build together",
                "Research, training and a community around good coffee.",
              ],
            ]
          : [
              ["01 / NOW", "第一章", "4つの産地。妥協のない、一つの基準。"],
              [
                "02 / NEXT",
                "探し続ける",
                "世界のオーガニックコーヒーを、もっと。",
              ],
              [
                "03 / AHEAD",
                "ともにつくる",
                "研究、トレーニング、そしてコーヒーのコミュニティへ。",
              ],
            ]
        ).map(([n, t, d]) => (
          <li key={n}>
            <span className="eyebrow">{n}</span>
            <h3>{t}</h3>
            <p>{d}</p>
          </li>
        ))}
      </ol>
      <a href="#shop" className="text-link">
        {en ? "Start with a cup" : "まずは、一杯から"} ↗
      </a>
    </section>
  );
}
export function FAQ({ lang = "ja" }: { lang?: Locale }) {
  const en = lang === "en";
  const questions = en
    ? [
        [
          "What is SNöBI?",
          "SNöBI is an organic specialty line from Tokyo Coffee. Chapter One brings together Peru, Colombia Huila, Ethiopia Guji and Mexico Chiapas decaf.",
        ],
        [
          "Why this price?",
          "100g / 200g, including tax: Peru ¥2,560 / ¥4,720; Ethiopia ¥1,605 / ¥2,810; Colombia ¥1,410 / ¥2,420; Mexico decaf ¥1,610 / ¥2,820. Whole bean only.",
        ],
        [
          "Organic? Roast level? Whole bean?",
          "Chapter One is specialty coffee from four origins. Every one is light-roasted so you can taste the bean itself. JAS Organic, whole bean only.",
        ],
        [
          "When will my coffee ship?",
          orderingSchedule.en.join(" "),
        ],
        [
          "How much is shipping?",
          `Shipping is free for orders of ${yen(FREE_SHIPPING_YEN)} or more. ${shippingRates.en} Both 100g and 200g ${shipMethodLine.en}. The checkout confirms the final charge.`,
        ],
        [
          "Where do I pay?",
          "Tokyo Coffee handles checkout and payment. You will leave this site for the Tokyo Coffee checkout, with your selected coffees and sizes. Available payment methods are shown there.",
        ],
        [
          "Can my café stock SNöBI?",
          "We take wholesale enquiries. The coffees and how to start are on the Trade page.",
        ],
      ]
    : [
        [
          "SNöBIって、Tokyo Coffeeとどう違う？",
          "SNöBIはTokyo Coffeeがつくる、オーガニック・スペシャルティライン。第一章はペルー、コロンビア・ウィラ、エチオピア・グジ、メキシコ・チアパスのデカフェ。カッピングスコア80点以上の「スペシャルティコーヒー」の豆を使用しています。",
        ],
        [
          "価格とサイズについて教えて。",
          "100g / 200gの税込価格は、ペルー ¥2,560 / ¥4,720、エチオピア ¥1,605 / ¥2,810、コロンビア ¥1,410 / ¥2,420、メキシコ デカフェ ¥1,610 / ¥2,820。豆のままでのお届けです。",
        ],
        [
          "有機？ 焙煎度は？ 粉でも買える？",
          "第一章は四つの産地からの、スペシャルティコーヒー。全種類、豆の味を堪能出来る様に、「浅煎り」で焙煎。JASオーガニック、豆のままでのお届けです。",
        ],
        [
          "いつ焙煎して、いつ届く？",
          orderingSchedule.ja.join(""),
        ],
        [
          "送料はいくら？",
          `${yen(FREE_SHIPPING_YEN)}以上のご注文で送料無料。${shippingRates.ja}100g・200gとも、${shipMethodLine.ja}。最終的な送料はレジでご確認いただけます。`,
        ],
        [
          "どこで決済するの？",
          "決済はTokyo Coffeeが承ります。選んだ豆とサイズを引き継いで、Tokyo Coffeeの決済ページに進みます。ご利用いただける支払方法は決済画面に表示されます。",
        ],
        [
          "自分のお店で取り扱いたい。",
          trade.faqAnswer,
        ],
      ];
  const ordered = [
    questions[0],
    questions[5],
    questions[1],
    questions[2],
    questions[4],
    questions[3],
    questions[6],
  ];
  return (
    <section id="faq" className="faq-section">
      <div>
        <p className="eyebrow">A FEW GOOD QUESTIONS</p>
        <h2 className="display">
          {en ? "Before your first cup." : "最初の一杯の、その前に。"}
        </h2>
      </div>
      <div className="faq-list">
        {ordered.map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <span aria-hidden="true">＋</span>
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function TradeCTA({ lang = "ja" }: { lang?: Locale }) {
  const en = lang === "en";
  return (
    <section className="trade-cta">
      <p className="eyebrow">FOR CAFÉS & RETAILERS</p>
      <h2 className="display">
        {en ? "Stock SNöBI." : "お店で扱う。"}
      </h2>
      <p>
        {en
          ? "Four organic specialty coffees from Tokyo Coffee, for your counter. Prices on request."
          : "Tokyo Coffeeがつくる4つのオーガニック・スペシャルティコーヒーを、あなたのお店へ。"}
      </p>
      <Link
        href={en ? "/en/trade" : "/trade"}
        className="commerce-button light"
      >
        {en ? "Wholesale enquiries" : "お店で扱う"}
        <span>↗</span>
      </Link>
    </section>
  );
}
