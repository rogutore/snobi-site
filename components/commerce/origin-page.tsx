import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, type Locale } from "@/content/products";
import { getStock } from "@/lib/shopify/client";
import { CartProvider } from "./cart";
import { BuyCard } from "./buy-card";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
export function originMetadata(slug: string, lang: Locale): Metadata {
  const p = products.find((p) => p.slug === slug);
  if (!p) return {};
  const path = `${lang === "en" ? "/en" : ""}/origins/${slug}`;
  return {
    title: `${p.title[lang]} — SNöBI`,
    description: `${p.notes[lang].join(" · ")}. Organic whole-bean coffee, 100g / 200g.`,
    alternates: {
      canonical: path,
      languages: { ja: `/origins/${slug}`, en: `/en/origins/${slug}` },
    },
    openGraph: {
      title: `${p.title[lang]} — SNöBI`,
      images: [
        { url: `/products/${p.handle}-og.jpg`, width: 1200, height: 630 },
      ],
    },
  };
}
export async function OriginPage({
  slug,
  lang = "ja",
}: {
  slug: string;
  lang?: Locale;
}) {
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  const en = lang === "en";
  const { stock } = await getStock();
  const url = `https://snobi.jp${en ? "/en" : ""}/origins/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `SNöBI ${p.title[lang]}`,
    brand: { "@type": "Brand", name: "SNöBI" },
    description: p.notes[lang].join(", "),
    image: [`https://snobi.jp/products/${p.handle}-200g.jpg`],
    url,
    offers: p.variants
      .filter((v) => !!stock[v.id])
      .map((v) => ({
        "@type": "Offer",
        sku: v.sku,
        name: `${p.title[lang]} ${v.size}`,
        url,
        price: stock[v.id].price.amount,
        priceCurrency: "JPY",
        availability: stock[v.id].availableForSale
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
        itemCondition: "https://schema.org/NewCondition",
      })),
  };
  return (
    <CartProvider lang={lang}>
      <Nav en={en} paper home={false} />
      <main className="origin-page">
        <Link href={`${en ? "/en" : "/"}#shop`} className="text-link">
          ← {en ? "Chapter One" : "第一章のコーヒー"}
        </Link>
        <div className="origin-layout">
          <div className="origin-text">
            <p className="eyebrow">CHAPTER ONE / {p.region}</p>
            <h1 className="display">
              {p.country}
              {p.decaf && <em>Decaf.</em>}
            </h1>
            <p className="origin-page-title">{p.title[lang]}</p>
            <p className="origin-page-notes">{p.notes[lang].join(" / ")}</p>
            <dl className="origin-facts">
              {[
                [en ? "Region" : "地域", p.region],
                [en ? "Process" : "精製", p.process],
                [en ? "Farm" : "農園", p.farm],
                [en ? "Elevation" : "標高", p.elevation],
                [en ? "Variety" : "品種", p.variety],
                [en ? "Roast" : "焙煎度", p.roast],
                [en ? "Cup score" : "カップスコア", p.score],
                [
                  en ? "Producer payment" : "生産者への支払額",
                  p.producerPayment,
                ],
              ].map(([name, value]) => (
                <div key={String(name)}>
                  <dt>{name}</dt>
                  <dd>{value ?? "—"}</dd>
                </div>
              ))}
            </dl>
            <p className="small-print">
              {en
                ? "Scores and producer payments will be published at launch. Blank fields are not yet verified."
                : "スコア・生産者への支払額は発売時に公開予定。未確認の情報は空欄にしています。"}
            </p>
            <div className="origin-delivery">
              <strong>
                {en ? "Roasted Tue / Fri" : "毎週 火曜・金曜 焙煎"}
              </strong>
              <p>
                {en
                  ? "Order by noon the day before. Shipped the next business day. Roast date on every bag."
                  : "前日正午までのご注文が対象。焙煎日翌営業日に発送・焙煎日を袋に記載。"}
              </p>
              <p>
                {en
                  ? "Whole bean only. Free shipping on orders of ¥3,000 or more."
                  : "豆のままのお届け。¥3,000以上で送料無料。"}
              </p>
            </div>
            <Link href={`${en ? "/en" : "/"}#faq`} className="text-link">
              {en ? "Shipping & ordering questions" : "送料・ご注文について"} ↗
            </Link>
          </div>
          <BuyCard
            product={p}
            index={products.indexOf(p)}
            treatment={2}
            stock={stock}
            lang={lang}
            detail
          />
        </div>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(schema).replace(/</g, "\\u003c"),
          }}
        />
      </main>
      <Footer en={en} />
    </CartProvider>
  );
}
