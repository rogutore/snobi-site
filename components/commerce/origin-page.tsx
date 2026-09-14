import type { Metadata } from "next";
import Image from "next/image";
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
  return {
    title: `${p.title[lang]} — SNöBI`,
    description: p.narrative[lang].join(" "),
    alternates: {
      canonical: `${lang === "en" ? "/en" : ""}/origins/${slug}`,
      languages: { ja: `/origins/${slug}`, en: `/en/origins/${slug}` },
    },
    openGraph: {
      title: `${p.title[lang]} — SNöBI`,
      description: p.narrative[lang].join(" "),
      images: [
        {
          url: `/products/${p.handle}-og.jpg`,
          width: 1200,
          height: 630,
          alt: p.title[lang],
        },
      ],
    },
  };
}
export async function OriginPage({
  slug,
  lang = "ja",
  size = "100g",
}: {
  slug: string;
  lang?: Locale;
  size?: string;
}) {
  const p = products.find((p) => p.slug === slug);
  if (!p) notFound();
  const en = lang === "en";
  const { stock } = await getStock();
  const url = `https://snobi.jp${en ? "/en" : ""}/origins/${slug}`;
  const schema = {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    name: `SNöBI ${p.title[lang]}`,
    productGroupID: p.handle,
    brand: { "@type": "Brand", name: "SNöBI" },
    description: p.narrative[lang].join(" "),
    image: [`https://snobi.jp/products/${p.handle}-200g.jpg`],
    url,
    variesBy: "https://schema.org/size",
    hasVariant: p.variants.map((v) => ({
      "@type": "Product",
      name: `SNöBI ${p.title[lang]} ${v.size}`,
      sku: v.sku,
      size: v.size,
      url: `${url}?size=${v.size}`,
      image: `https://snobi.jp/products/${p.handle}-${v.size}.jpg`,
      ...(stock[v.id]
        ? {
            offers: {
              "@type": "Offer",
              url: `${url}?size=${v.size}`,
              price: stock[v.id].price.amount,
              priceCurrency: stock[v.id].price.currencyCode,
              availability:
                stock[v.id].availableForSale &&
                (stock[v.id].quantityAvailable ?? 1) > 0
                  ? "https://schema.org/InStock"
                  : "https://schema.org/OutOfStock",
              itemCondition: "https://schema.org/NewCondition",
            },
          }
        : {}),
    })),
  };
  return (
    <CartProvider lang={lang}>
      <Nav en={en} paper home={false} />
      <main className="origin-page origin-editorial">
        <section className="origin-label-hero" style={{ background: p.color }}>
          <Image
            src={`/labels/${p.handle}.webp`}
            alt={`${p.title[lang]} ${en ? "label artwork" : "ラベルアート"}`}
            width={640}
            height={1440}
            sizes="220px"
            preload
          />
          {p.decaf && <span className="spec">DECAF</span>}
        </section>
        <section className="origin-introduction">
          <p className="eyebrow">CHAPTER ONE</p>
          <h1 className="display">
            {p.country}
            {p.decaf && <em>Decaf.</em>}
          </h1>
          <p className="origin-page-title">{p.title[lang]}</p>
          <ul className="coffee-chips">
            {p.chips[lang].map((chip) => (
              <li key={chip}>{chip}</li>
            ))}
          </ul>
          <div className="origin-narrative">
            {p.narrative[lang].map((text) => (
              <p key={text}>{text}</p>
            ))}
          </div>
        </section>
        <section className="origin-three">
          <h2 className="display">
            {en ? "Three things worth knowing" : "三つの豆知識"}
          </h2>
          <ol>
            {p.facts[lang].map((text) => (
              <li key={text}>{text}</li>
            ))}
          </ol>
        </section>
        <section className="origin-spec">
          <h2 className="eyebrow">ORIGIN / SPECIFICATION</h2>
          <dl className="origin-facts">
            {[
              [en ? "Region" : "地域", p.region[lang]],
              [en ? "Producer" : "生産者", p.producer[lang]],
              [en ? "Elevation" : "標高", p.elevation],
              [en ? "Variety" : "品種", p.variety[lang]],
              [en ? "Processing & drying" : "精製・乾燥", p.process[lang]],
              [en ? "Roast" : "焙煎度", p.roast?.[lang]],
            ].map(([name, value]) => (
              <div key={name}>
                <dt>{name}</dt>
                <dd>{value || "—"}</dd>
              </div>
            ))}
          </dl>
        </section>
        {p.photo && (
          <figure className="producer-photo">
            <Image
              src={p.photo.src}
              alt={p.photo.caption[lang]}
              width={p.slug === "peru" ? 800 : 1000}
              height={p.slug === "peru" ? 600 : 666}
              sizes="(min-width:1024px) 760px,100vw"
            />
            <figcaption>{p.photo.caption[lang]}</figcaption>
          </figure>
        )}
        <section id="buy" className="origin-buy">
          <BuyCard
            product={p}
            index={products.indexOf(p)}
            stock={stock}
            lang={lang}
            detail
            initialSize={size === "200g" ? "200g" : "100g"}
          />
          <p className="small-print">
            {en
              ? "Roasted Tue / Fri. Order by noon the day before; shipped the next business day. Roast date on every bag. Both sizes ship by Nekopos."
              : "火・金焙煎、前日正午締切、翌営業日発送。焙煎日を袋に記載。100g・200gともネコポスで発送。"}
          </p>
          <Link href={`${en ? "/en" : "/"}#faq`} className="text-link">
            {en ? "Shipping & ordering" : "送料・ご注文について"} ↗
          </Link>
        </section>
        <Link
          href={`${en ? "/en" : "/"}#shop`}
          className="text-link origin-back"
        >
          ← {en ? "Back to the four origins" : "4つの産地に戻る"}
        </Link>
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
