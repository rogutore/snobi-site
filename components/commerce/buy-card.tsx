"use client";
import { useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { LoaderCircle, ArrowUpRight } from "lucide-react";
import { yen, type Coffee, type Locale } from "@/content/products";
import type { StockMap } from "@/lib/shopify/client";
import { useCart } from "./cart";
export function BuyCard({
  product,
  index = 0,
  treatment = 1,
  lang = "ja",
  stock,
  detail = false,
}: {
  product: Coffee;
  index?: number;
  treatment?: number;
  lang?: Locale;
  stock: StockMap;
  detail?: boolean;
}) {
  const [size, setSize] = useState("100g");
  const cart = useCart();
  const en = lang === "en";
  const variant = product.variants.find((v) => v.size === size)!;
  const availability = stock[variant.id];
  const available =
    !!availability?.availableForSale &&
    (availability.quantityAvailable === null ||
      availability.quantityAvailable > 0);
  const price =
    availability?.price.currencyCode === "JPY"
      ? Number(availability.price.amount)
      : variant.price;
  const titleId = `coffee-${detail ? "detail-" : ""}${product.slug}`;
  return (
    <article
      id={`origin-${product.slug}`}
      aria-labelledby={titleId}
      className={`coffee-card treatment-${treatment} ${detail ? "detail-card" : ""}`}
      style={
        {
          "--label-color": product.color,
          "--label-ink": product.ink,
        } as CSSProperties
      }
    >
      {treatment === 3 && (
        <div className="editorial-heading">
          <span className="chapter-number display">0{index + 1}</span>
          <div>
            <p className="eyebrow">{product.region}</p>
            <h3 id={titleId} className="display">
              {product.country}
              <em>{product.decaf ? "Decaf." : "Organic."}</em>
            </h3>
          </div>
        </div>
      )}
      <div className="coffee-art">
        {treatment === 2 ? (
          <Image
            src={`/products/${product.handle}-${size}.jpg`}
            alt={`${product.title[lang]} ${size} ${en ? "bag mockup" : "パッケージイメージ"}`}
            width={1600}
            height={1600}
            sizes="(min-width:1024px) 44vw, 100vw"
            className="packshot"
          />
        ) : (
          <>
            <Image
              src={`/labels/${product.handle}.webp`}
              alt={`${product.title[lang]} ${en ? "label artwork" : "ラベルアート"}`}
              width={640}
              height={1440}
              sizes="(min-width:1024px) 300px, 230px"
              className="flat-label"
            />
            <div className="art-side">
              <p className="vertical-spec spec">
                CHAPTER ONE — 0{index + 1} / 04
              </p>
              <Image
                src={`/products/${product.handle}-cutout.webp`}
                alt=""
                width={514}
                height={600}
                sizes="(min-width:1024px) 170px, 115px"
                className="small-pack"
              />
              {treatment === 3 && (
                <p className="editorial-note">
                  {product.notes[lang].map((n) => (
                    <span key={n}>{n}</span>
                  ))}
                </p>
              )}
            </div>
          </>
        )}
        {product.decaf && <span className="decaf-stamp spec">DECAF</span>}
      </div>
      <div className="coffee-receipt">
        <div className="coffee-name">
          <div>
            <p className="eyebrow">
              {treatment === 3
                ? product.process
                : `CHAPTER ONE / 0${index + 1}`}
            </p>
            {treatment !== 3 && (
              <h3 id={titleId} className="display">
                {product.country}
                {product.decaf && <span> Decaf</span>}
              </h3>
            )}
            <p className="origin-jp">{product.title[lang]}</p>
          </div>
          <span className="origin-status">
            <i className={available ? "available" : ""} />
            {availability
              ? available
                ? en
                  ? "Available"
                  : "発売中"
                : en
                  ? "Sold out"
                  : "完売"
              : en
                ? "Checking stock"
                : "在庫確認中"}
          </span>
        </div>
        <p className="flavor-notes">{product.notes[lang].join(" / ")}</p>
        {treatment === 3 && (
          <details className="origin-extra">
            <summary>
              {en ? "Read the field notes" : "この豆のデータを見る"}{" "}
              <PlusMark />
            </summary>
            <dl>
              <div>
                <dt>{en ? "Process" : "精製"}</dt>
                <dd>{product.process}</dd>
              </div>
              <div>
                <dt>{en ? "Farm" : "農園"}</dt>
                <dd>{product.farm || "—"}</dd>
              </div>
              <div>
                <dt>{en ? "Elevation" : "標高"}</dt>
                <dd>{product.elevation || "—"}</dd>
              </div>
            </dl>
          </details>
        )}
        <div className="buy-row">
          <fieldset
            aria-label={`${product.title[lang]} ${en ? "size" : "サイズ"}`}
          >
            <legend className="sr-only">{en ? "Bag size" : "内容量"}</legend>
            {product.variants.map((v) => (
              <label key={v.size} className={size === v.size ? "selected" : ""}>
                <input
                  type="radio"
                  name={`size-${detail ? "detail-" : ""}${product.slug}`}
                  checked={size === v.size}
                  value={v.size}
                  onChange={() => setSize(v.size)}
                />
                {v.size}
              </label>
            ))}
          </fieldset>
          <div className="coffee-price" aria-live="polite">
            <strong>{yen(price)}</strong>
            <span>{en ? "tax included" : "税込"}</span>
          </div>
        </div>
        <button
          type="button"
          className="commerce-button add-button"
          disabled={!available || cart.pending}
          onClick={() => cart.add(variant.id)}
          aria-describedby={titleId}
        >
          {cart.pending ? (
            <>
              <LoaderCircle size={18} className="spin" />
              {en ? "Updating…" : "更新中…"}
            </>
          ) : (
            <>
              {available
                ? en
                  ? "Add to bag"
                  : "カートに入れる"
                : availability
                  ? en
                    ? "Sold out"
                    : "完売"
                  : en
                    ? "Stock unavailable"
                    : "在庫を確認できません"}
              <span>＋</span>
            </>
          )}
        </button>
        <div className="receipt-bottom">
          <span>{en ? "Whole bean only" : "豆のまま"}</span>
          {!detail && (
            <Link href={`${en ? "/en" : ""}/origins/${product.slug}`}>
              {en ? "Meet the origin" : "産地を読む"}
              <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
function PlusMark() {
  return <span aria-hidden="true">＋</span>;
}
