import Image from "next/image";
import Link from "next/link";
import { products, minimumPrice, yen, type Locale } from "@/content/products";
import { getStock } from "@/lib/shopify/client";
import { BuyCard } from "./buy-card";
export async function ShopSection({
  lang = "ja",
  treatment = 1,
}: {
  lang?: Locale;
  treatment?: number;
}) {
  const { stock, error } = await getStock();
  const en = lang === "en";
  return (
    <section id="shop" className={`shop-section shop-treatment-${treatment}`}>
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
              ? "Four places. Four personalities. All organic. Choose the notes that sound like you."
              : "4つの産地、4つの個性。すべてオーガニック。気になる味から、次の一杯を。"}
          </p>
          <p className="small-print">
            {en
              ? "Whole bean · 100g / 200g · All prices include tax"
              : "豆のまま · 100g / 200g · 価格はすべて税込"}
          </p>
          <p className="shipping-line">
            {en
              ? "Free shipping on orders of ¥3,000 or more."
              : "¥3,000以上で送料無料。"}
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
            treatment={treatment}
            lang={lang}
            stock={stock}
          />
        ))}
      </div>
      <p className="shop-footnote">
        {en
          ? "Roasted Tue / Fri. Order cutoff: noon the day before. Shipped the next business day; roast date on every bag."
          : "火・金焙煎。前日正午までのご注文が対象。焙煎日翌営業日に発送・焙煎日を袋に記載。"}
      </p>
    </section>
  );
}
export function ProductHero({ lang = "ja" }: { lang?: Locale }) {
  const en = lang === "en";
  return (
    <section id="top" className="product-hero">
      <div className="product-hero-copy">
        <p className="eyebrow">ORGANIC × SPECIALTY × JAPAN · EST. 2026</p>
        <h1 className="display">
          Good coffee.
          <br />
          <em>No compromises.</em>
        </h1>
        <p className="hero-jp">
          {en
            ? "Organic. And actually specialty."
            : "有機も、味も。妥協しない。"}
        </p>
        <p className="hero-endorsement">From the Tokyo Coffee family.</p>
      </div>
      <div className="hero-lineup">
        <Image
          src="/products/chapter-one-lineup.jpg"
          alt={
            en
              ? "Chapter One: Peru, Colombia, Ethiopia and Mexico decaf coffee bags"
              : "第一章：ペルー、コロンビア、エチオピア、メキシコ・デカフェ"
          }
          width={1800}
          height={850}
          sizes="(min-width:1024px) 65vw, 100vw"
          priority
        />
      </div>
      <div className="hero-buy">
        <p>
          <strong>{yen(minimumPrice)}〜</strong>{" "}
          <span>{en ? "tax included · whole bean" : "（税込）・豆のまま"}</span>
        </p>
        <a href="#shop" className="commerce-button">
          {en ? "Choose your first chapter" : "第一章のコーヒーを選ぶ"}
          <span>↓</span>
        </a>
        <div className="hero-reassurance">
          <span>{en ? "Free shipping ¥3,000+" : "¥3,000以上送料無料"}</span>
          <span>{en ? "Roast Tue / Fri" : "火・金焙煎 → 翌営業日発送"}</span>
        </div>
      </div>
      <div className="hero-edition spec">
        <span>FIRST CHAPTER</span>
        <span>04 ORIGINS / TOKYO, JAPAN</span>
      </div>
    </section>
  );
}
export function Receipts({ lang = "ja" }: { lang?: Locale }) {
  const en = lang === "en";
  return (
    <section className="receipts-section">
      <div>
        <p className="eyebrow">THE RECEIPTS</p>
        <h2 className="display">
          Good taste.
          <br />
          Open books.
        </h2>
        <p>
          {en
            ? "The story behind the cup should be as clear as the coffee itself."
            : "一杯の背景も、クリアに。"}
        </p>
      </div>
      <dl>
        <div>
          <dt>{en ? "Origin & process" : "産地・精製方法"}</dt>
          <dd>{en ? "On every origin page" : "各産地ページで公開"}</dd>
        </div>
        <div>
          <dt>{en ? "Cup score" : "カップスコア"}</dt>
          <dd>
            —{" "}
            <span>{en ? "To be published at launch" : "発売時に公開予定"}</span>
          </dd>
        </div>
        <div>
          <dt>{en ? "Producer payment" : "生産者への支払額"}</dt>
          <dd>
            —{" "}
            <span>{en ? "To be published at launch" : "発売時に公開予定"}</span>
          </dd>
        </div>
      </dl>
    </section>
  );
}
export function CompactStory({ lang = "ja" }: { lang?: Locale }) {
  const en = lang === "en";
  return (
    <section id="story" className="compact-story">
      <div className="story-photo">
        <Image
          src="/photos/DSCF1754.jpg"
          alt={en ? "Inside Tokyo Coffee" : "Tokyo Coffeeの店内"}
          fill
          sizes="(min-width:1024px) 50vw,100vw"
          className="object-cover"
        />
      </div>
      <div className="story-copy">
        <p className="eyebrow">FROM THE TOKYO COFFEE FAMILY</p>
        <h2 className="display">
          Organic was
          <br />
          only the start.
        </h2>
        <p>
          {en
            ? "Tokyo Coffee is where we come from. SNöBI is where we push further: organic coffee with a distinct sense of place, roasted in Tokyo."
            : "Tokyo Coffeeが、私たちの出発点。SNöBIは、その先を追求するラインです。産地の個性を感じるオーガニックコーヒーを、東京で焙煎。"}
        </p>
        <p>
          {en
            ? "The future of organic specialty coffee is still being written. This is our first chapter."
            : "オーガニックスペシャルティコーヒーの未来は、まだ完成していない。これは、私たちの第一章。"}
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
          "Each origin is offered in 100g and 200g bags, with tax included in the displayed price. You can start with 100g; there is no subscription or minimum number of bags.",
        ],
        [
          "Organic? Roast level? Whole bean?",
          "Chapter One is JAS Organic and whole bean only. Peru and Ethiopia are light roasts. Confirmed roast information is listed on each origin page; unverified details are left blank.",
        ],
        [
          "When will my coffee ship?",
          "We roast on Tuesdays and Fridays. The cutoff for each roast is noon the day before. Coffee ships the next business day. Roast date on every bag. Orders after cutoff move to the next roast day.",
        ],
        [
          "How much is shipping?",
          "Shipping is free for orders of ¥3,000 or more. Below that: ¥500 standard, ¥700 Kyushu, ¥800 Hokkaido/Okinawa; remote islands quoted separately. The checkout confirms the final charge.",
        ],
        [
          "Where do I pay?",
          "Tokyo Coffee handles checkout and payment. You will leave this site for the Tokyo Coffee checkout, with your selected coffees and sizes. Available payment methods are shown there.",
        ],
        [
          "Where can I try it?",
          "Ask our team at COMMONS Tachikawa or Hoya about the current SNöBI offering before visiting. Availability can change.",
        ],
        [
          "Can my café stock SNöBI?",
          "Yes. The Chapter One stockist programme is accepting enquiries. Details and the application form are on the Trade page.",
        ],
      ]
    : [
        [
          "SNöBIって、Tokyo Coffeeとどう違う？",
          "SNöBIはTokyo Coffeeがつくる、オーガニック・スペシャルティライン。第一章はペルー、コロンビア・ウィラ、エチオピア・グジ、メキシコ・チアパスのデカフェです。",
        ],
        [
          "価格とサイズについて教えて。",
          "各産地を100g・200gでご用意。表示価格は税込です。まずは100gから。定期購入や、袋数の指定はありません。",
        ],
        [
          "有機？ 焙煎度は？ 粉でも買える？",
          "第一章はJASオーガニック、豆のままでのお届けです。ペルーとエチオピアは浅煎り。確認できている焙煎情報は各産地ページに記載し、未確認の項目は空欄にしています。",
        ],
        [
          "いつ焙煎して、いつ届く？",
          "焙煎日は毎週火曜・金曜。各焙煎日の前日正午までのご注文が対象です。焙煎日翌営業日に発送し、袋に焙煎日を記載します。締切後のご注文は次の焙煎日に回ります。到着日は地域によって異なります。",
        ],
        [
          "送料はいくら？",
          "¥3,000以上のご注文で送料無料。未満の場合は通常¥500、九州¥700、北海道・沖縄¥800。離島は別途お見積りとなります。最終的な送料はレジでご確認いただけます。",
        ],
        [
          "どこで決済するの？",
          "決済はTokyo Coffeeが承ります。選んだ豆とサイズを引き継いで、Tokyo Coffeeの決済ページに進みます。ご利用いただける支払方法は決済画面に表示されます。",
        ],
        [
          "お店で飲める？",
          "COMMONS立川・保谷でのSNöBIの提供状況は、ご来店前に店舗へお問い合わせください。時期により内容が変わります。",
        ],
        [
          "自分のお店で取り扱いたい。",
          "「取扱店 第一章」プログラムへのご相談を受け付けています。取扱店向けページで詳細と申込フォームをご案内しています。",
        ],
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
        {questions.map(([q, a]) => (
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
        The next chapter
        <br />
        has room for you.
      </h2>
      <p>
        {en
          ? "25 founding stockists. Let’s put good coffee on your counter."
          : "取扱店 第一章。最初の25店舗を募集します。あなたのお店から、次の一杯を。"}
      </p>
      <Link
        href={en ? "/en/trade" : "/trade"}
        className="commerce-button light"
      >
        {en ? "Become a stockist" : "取扱店プログラムを見る"}
        <span>↗</span>
      </Link>
    </section>
  );
}
