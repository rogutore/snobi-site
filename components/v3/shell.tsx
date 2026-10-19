"use client";
/* Mockup D header/footer, ported with the real marks. */
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Menu } from "lucide-react";
import { useCart } from "@/components/commerce/cart";

/* /v3 pages are Mockup D's pages ported with the real fonts. Trade stays on the old preview until the owner and Davy decide. */
export const NAV: [string, string][] = [
  ["コーヒー", "/coffee"], ["産地", "/origins"], ["ストーリー", "/about"], ["ジャーナル", "/journal"], ["FAQ", "/faq"], ["ホールセール", "/trade"],
];

function CartPill() {
  const cart = useCart();
  return (
    <button type="button" className="v3-cart" onClick={cart.open} aria-label={`CART ${cart.count}：カートを開く`}>
      CART <b>{cart.count}</b>
    </button>
  );
}

export function Header() {
  const menu = useRef<HTMLDetailsElement>(null);
  useEffect(() => {
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menu.current?.contains(event.target)) menu.current?.removeAttribute("open");
    };
    document.addEventListener("pointerdown", closeOutside);
    return () => document.removeEventListener("pointerdown", closeOutside);
  }, []);
  return (
    <header className="v3-nav">
      <Link className="v3-mark" href="/" aria-label="SNöBI ホーム">
        {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG */}
        <img className="boar" src="/brand/snobi.svg" alt="" width={34} height={30} />
        {/* eslint-disable-next-line @next/next/no-img-element -- brand SVG */}
        <img className="wm" src="/brand/snobi_font1.svg" alt="SNöBI" width={110} height={31} />
      </Link>
      <nav className="v3-desktop-nav" aria-label="メインナビゲーション"><ul>{NAV.map(([l, h]) => <li key={h}><Link href={h}>{l}</Link></li>)}</ul></nav>
      <details className="v3-mobile-nav" ref={menu} onKeyDown={(event) => {
        if (event.key === "Escape") { menu.current?.removeAttribute("open"); menu.current?.querySelector("summary")?.focus(); }
      }} onBlur={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget)) menu.current?.removeAttribute("open");
      }}>
        <summary><Menu aria-hidden="true" /><span className="v3-sr">メニュー</span></summary>
        <nav aria-label="メインナビゲーション"><ul>{NAV.map(([label, href]) => <li key={href}><Link href={href} onClick={() => menu.current?.removeAttribute("open")}>{label}</Link></li>)}</ul></nav>
      </details>
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
      <ul><li><Link href="/contact">お問い合わせ</Link></li><li><Link href="/legal">特定商取引法に基づく表記</Link></li><li><Link href="/trade#enquiry">ホールセールのご相談</Link></li></ul>
    </footer>
  );
}
