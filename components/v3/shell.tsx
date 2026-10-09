"use client";
/* Mockup D header/footer, ported with the real marks. */
import Link from "next/link";
import { useCart } from "@/components/commerce/cart";
import { FORM_URL } from "@/content/products";

/* /v3 pages are Mockup D's pages ported with the real fonts. Trade stays on the old preview until the owner and Davy decide. */
export const NAV: [string, string][] = [
  ["コーヒー", "/coffee"], ["産地", "/origins"], ["ストーリー", "/about"], ["ジャーナル", "/journal"], ["FAQ", "/faq"], ["取扱店", "/trade"],
];

function CartPill() {
  const cart = useCart();
  return (
    <button type="button" className="v3-cart" onClick={cart.open} aria-label={`カートを開く（${cart.count}点）`}>
      CART <b>{cart.count}</b>
    </button>
  );
}

export function Header() {
  return (
    <header className="v3-nav">
      <Link className="v3-mark" href="/" aria-label="SNöBI ホーム">
        {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG */}
        <img className="boar" src="/brand/snobi.svg" alt="" width={34} height={30} />
        {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG */}
        <img className="wm" src="/brand/snobi_font1.svg" alt="SNöBI" width={110} height={31} />
      </Link>
      <ul>{NAV.map(([l, h]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul>
      <CartPill />
    </header>
  );
}

export function Footer() {
  return (
    <footer className="v3-foot">
      <div>
        <p className="v3-mark foot">
          {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG */}
          <img className="boar" src="/brand/snobi.svg" alt="" width={40} height={35} />
          {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG */}
          <img className="wm" src="/brand/snobi_font1.svg" alt="SNöBI" width={128} height={36} />
        </p>
        {/* Keep the plain 「Snobi」 until 「ＳＮＯＢＩ」 registers: it is the use evidence for 早期審査 (brain/Handoffs/snobi-amazon/trademark-filing.md). */}
        <p className="small">ORGANIC SPECIALTY BY TOKYO COFFEE<br />JAS有機認証の豆だけを、東京で焙煎。<br />© 2026 Snobi · 株式会社ローグトレード</p>
      </div>
      <ul>{NAV.map(([l, h]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul>
      <ul><li><Link href="/contact">お問い合わせ</Link></li><li><Link href="/legal">特定商取引法に基づく表記</Link></li><li><a href={FORM_URL}>発売案内を受け取る ↗</a></li></ul>
    </footer>
  );
}
