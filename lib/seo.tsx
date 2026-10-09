/* SEO for snobi.jp — ONE module for per-page metadata and JSON-LD (plan: brain/Handoffs/premium-line/seo-aeo-plan.md,
   audit: research-outputs/2026-10-08-snobi-seo-aeo/04-technical-audit.md §4). Every value is read from content/*;
   nothing is retyped here except the brand's alternate names (owner 2026-10-08: reading スノビ).
   Rendering: Next 16 json-ld guide (node_modules/next/dist/docs/01-app/02-guides/json-ld.md) — a <script> with "<"
   escaped. */
import type { Metadata } from "next";
import { products, type Coffee } from "@/content/products";
import { company, legalRows } from "@/content/legal";
import { FREE_SHIPPING_YEN } from "@/content/ordering";
import type { StockMap } from "@/lib/shopify/client";

export const SITE = "https://snobi.jp";
export const BRAND = "SNöBI";
export const BRAND_ALT = ["Snobi", "SNOBI", "スノビ"];
export const ORG_ID = `${SITE}/#org`;

/** Per-page metadata: own canonical (never the home page's), OG, optional EN twin. `title` gets "｜SNöBI" from the
 *  (site) layout's template unless `absolute`. */
export function pageMeta(o: { path: string; title: string; description: string; image?: string; en?: string; absolute?: boolean; type?: "website" | "article" }): Metadata {
  const url = o.path === "/" ? SITE : `${SITE}${o.path}`;
  const image = o.image ?? "/v2/photos/130-l.webp";
  return {
    title: o.absolute ? { absolute: o.title } : o.title,
    description: o.description,
    alternates: {
      canonical: url,
      ...(o.en ? { languages: { ja: url, en: `${SITE}${o.en}`, "x-default": url } } : {}),
    },
    openGraph: {
      type: o.type ?? "website",
      url,
      siteName: BRAND,
      locale: "ja_JP",
      title: o.absolute ? o.title : `${o.title}｜${BRAND}`,
      description: o.description,
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image" },
  };
}

export function JsonLd({ data }: { data: object | object[] }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

/* ---------- builders ---------- */

export function organization() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: BRAND,
    alternateName: BRAND_ALT,
    url: SITE,
    logo: `${SITE}/brand/snobi.svg`,
    description: "オーガニック（有機JAS）のスペシャルティコーヒー豆。東京コーヒー（株式会社ローグトレード）が東京で焙煎。",
    email: company.email,
    telephone: company.tel,
    address: { "@type": "PostalAddress", addressCountry: "JP", streetAddress: company.address },
    parentOrganization: { "@type": "Organization", name: company.name, alternateName: "TOKYO COFFEE", url: "https://tokyocoffee.jp" },
    sameAs: ["https://tokyocoffee.jp"],
  };
}

export function website() {
  return { "@context": "https://schema.org", "@type": "WebSite", "@id": `${SITE}/#website`, url: SITE, name: BRAND, alternateName: BRAND_ALT, inLanguage: "ja", publisher: { "@id": ORG_ID } };
}

export function breadcrumb(items: [string, string][]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map(([name, path], i) => ({ "@type": "ListItem", position: i + 1, name, item: path === "/" ? SITE : `${SITE}${path}` })),
  };
}

const returnsText = legalRows.find((r) => r.k === "返品・交換について")?.v.join(" ");

/** ProductGroup with live price + stock. A variant without readable stock gets no Offer (never a guessed price). */
export function productGroup(p: Coffee, stock: StockMap, images: string[]) {
  const url = `${SITE}/origins/${p.slug}`;
  return {
    "@context": "https://schema.org",
    "@type": "ProductGroup",
    name: `${BRAND} ${p.title.ja}`,
    productGroupID: p.handle,
    brand: { "@type": "Brand", name: BRAND },
    manufacturer: { "@id": ORG_ID },
    description: p.narrative.ja.join(" "),
    image: images.map((x) => `${SITE}${x}`),
    url,
    countryOfOrigin: p.country,
    variesBy: "https://schema.org/size",
    additionalProperty: [
      { "@type": "PropertyValue", name: "標高", value: p.elevation },
      { "@type": "PropertyValue", name: "品種", value: p.variety.ja },
      { "@type": "PropertyValue", name: "精製・乾燥", value: p.process.ja },
      ...(p.roast ? [{ "@type": "PropertyValue", name: "焙煎度", value: p.roast.ja }] : []),
      { "@type": "PropertyValue", name: "認証", value: "有機JAS" },
    ],
    hasVariant: p.variants.map((v) => {
      const s = stock[v.id];
      return {
        "@type": "Product",
        name: `${BRAND} ${p.title.ja} ${v.size}`,
        image: images.map((x) => `${SITE}${x}`), // Google Merchant listings: required on each variant (GSC 2026-10-09)
        description: p.narrative.ja.join(" "),
        sku: s?.sku || v.sku,
        size: v.size,
        url,
        ...(s && s.price.currencyCode === "JPY"
          ? {
              offers: {
                "@type": "Offer",
                url,
                price: Number(s.price.amount),
                priceCurrency: "JPY",
                availability: s.availableForSale && (s.quantityAvailable === null || s.quantityAvailable > 0) ? "https://schema.org/InStock" : "https://schema.org/OutOfStock",
                itemCondition: "https://schema.org/NewCondition",
                seller: { "@id": ORG_ID },
                shippingDetails: {
                  "@type": "OfferShippingDetails",
                  shippingDestination: { "@type": "DefinedRegion", addressCountry: "JP" },
                  freeShippingThreshold: { "@type": "MonetaryAmount", value: FREE_SHIPPING_YEN, currency: "JPY" },
                },
                ...(returnsText ? { hasMerchantReturnPolicy: { "@type": "MerchantReturnPolicy", applicableCountry: "JP", returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow", merchantReturnDays: 7,
                  /* 特商法 返品・交換: 「送料着払いにてご返品」 = returned by post, carriage paid by us */
                  returnMethod: "https://schema.org/ReturnByMail", returnFees: "https://schema.org/FreeReturn", description: returnsText } } : {}),
              },
            }
          : {}),
      };
    }),
  };
}

export function faqPage(items: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((x) => ({ "@type": "Question", name: x.q, acceptedAnswer: { "@type": "Answer", text: x.a } })),
  };
}

export function article(o: { path: string; title: string; description: string; published: string; updated: string; image: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: o.title,
    description: o.description,
    datePublished: o.published,
    dateModified: o.updated,
    inLanguage: "ja",
    image: [`${SITE}${o.image}`],
    url: `${SITE}${o.path}`,
    mainEntityOfPage: `${SITE}${o.path}`,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}

/** "100g ¥1,410〜" for descriptions — from products.ts, never retyped. */
export const fromPrice = (p: Coffee) => Math.min(...p.variants.map((v) => v.price));
export const allFromPrice = Math.min(...products.map(fromPrice));
