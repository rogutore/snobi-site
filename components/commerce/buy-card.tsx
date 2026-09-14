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
  lang = "ja",
  stock,
  detail = false,
  initialSize = "100g",
}: {
  product: Coffee;
  index?: number;
  lang?: Locale;
  stock: StockMap;
  detail?: boolean;
  initialSize?: "100g" | "200g";
}) {
  const [size, setSize] = useState(initialSize);
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
  const label = cart.pending
    ? en
      ? "Updating…"
      : "更新中…"
    : available
      ? en
        ? "Add to cart"
        : "カートに入れる"
      : availability
        ? en
          ? "Sold out"
          : "完売"
        : en
          ? "Stock unavailable"
          : "在庫を確認できません";
  return (
    <article
      id={`origin-${product.slug}`}
      aria-labelledby={titleId}
      className={`coffee-card ${detail ? "detail-card" : "label-card"}`}
      style={
        {
          "--label-color": product.color,
          "--label-ink": product.ink,
        } as CSSProperties
      }
    >
      {!detail && (
        <div className="coffee-art">
          <Image
            src={`/labels/${product.handle}.webp`}
            alt={`${product.title[lang]} ${en ? "label artwork" : "ラベルアート"}`}
            width={640}
            height={1440}
            sizes="(min-width:1024px) 260px, 200px"
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
              sizes="(min-width:1024px) 160px,115px"
              className="small-pack"
            />
          </div>
          {product.decaf && <span className="decaf-stamp spec">DECAF</span>}
        </div>
      )}
      <div className="coffee-receipt">
        <div className="coffee-name">
          <div>
            <p className="eyebrow">CHAPTER ONE / 0{index + 1}</p>
            <h3 id={titleId} className="display">
              {product.country}
              {product.decaf && <span> Decaf</span>}
            </h3>
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
                ? "Stock unavailable"
                : "在庫未確認"}
          </span>
        </div>
        {!detail && (
          <>
            <ul
              className="coffee-chips"
              aria-label={en ? "Coffee profile" : "豆のプロフィール"}
            >
              {product.chips[lang].filter(Boolean).map((chip) => (
                <li key={chip}>{chip}</li>
              ))}
            </ul>
            <p className="flavor-notes">{product.notes[lang].join(" / ")}</p>
            <p className="coffee-best">
              <span>{en ? "FOR YOU" : "こんな人に"}</span>
              {product.bestFor[lang]}
            </p>
          </>
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
          aria-describedby={`${titleId}-selection`}
        >
          {cart.pending && <LoaderCircle size={18} className="spin" />}
          {label}
          <span aria-hidden="true">＋</span>
        </button>
        <span id={`${titleId}-selection`} className="sr-only">
          {product.title[lang]} {size} {yen(price)}
        </span>
        <div className="receipt-bottom">
          <span>{en ? "Whole bean only" : "豆のまま"}</span>
          {!detail && (
            <Link
              href={`${en ? "/en" : ""}/origins/${product.slug}?size=${size}`}
            >
              {en ? "Read the origin" : "産地を読む"}
              <ArrowUpRight size={14} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
