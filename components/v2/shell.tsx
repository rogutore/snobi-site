/* v2 preview shell: header (real marks), footer, preview tag. Routes live under /v2 so nothing current is overwritten. */
import Link from "next/link";
import { CartButton } from "@/components/commerce/cart";
import { FORM_URL, LEGAL_URL } from "@/content/products";

export const NAV: [string, string][] = [
  ["コーヒー", "/v2/coffee"],
  ["産地", "/v2/origins"],
  ["ストーリー", "/v2/about"],
  ["ジャーナル", "/v2/journal"],
];

export function Header() {
  return (
    <header className="v2-header">
      <Link href="/v2" className="v2-mark" aria-label="SNöBI ホーム">
        {/* eslint-disable-next-line @next/next/no-img-element -- brand SVGs, fixed size */}
        <img src="/brand/snobi.svg" alt="" width={34} height={30} className="v2-boar" />
        {/* eslint-disable-next-line @next/next/no-img-element -- brand SVGs, fixed size */}
        <img src="/brand/snobi_font1.svg" alt="SNöBI" width={104} height={29} className="v2-word" />
      </Link>
      <nav aria-label="メイン" className="v2-nav">
        {NAV.map(([label, href]) => (
          <Link key={href} href={href} className="t-label">{label}</Link>
        ))}
      </nav>
      <div className="v2-utils">
        <Link href="/v2/trade" className="v2-trade t-label">取扱店</Link>
        <CartButton />
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="v2-footer">
      <div className="v2-foot-brand">
        {/* eslint-disable-next-line @next/next/no-img-element -- brand SVGs, fixed size */}
        <img src="/brand/snobi.svg" alt="" width={36} height={31} />
        {/* eslint-disable-next-line @next/next/no-img-element -- brand SVGs, fixed size */}
        <img src="/brand/snobi_font1.svg" alt="SNöBI" width={112} height={31} />
        <p className="t-ja-note">An organic specialty line from <a href="https://tokyocoffee.jp/">Tokyo Coffee</a>.</p>
      </div>
      <ul className="v2-foot-links t-ja-note">
        {[...NAV, ["よくある質問", "/v2/faq"] as [string, string], ["取扱店", "/v2/trade"] as [string, string]].map(([label, href]) => (
          <li key={href}><Link href={href}>{label}</Link></li>
        ))}
      </ul>
      <ul className="v2-foot-links t-ja-note">
        <li><a href={FORM_URL}>お問い合わせ</a></li>
        <li><a href={LEGAL_URL}>特定商取引法に基づく表記</a></li>
        <li>運営会社 · 株式会社ローグトレード</li>
      </ul>
    </footer>
  );
}

export function PreviewTag() {
  return <p className="v2-tag t-eyebrow">PREVIEW v2<span className="long"> · 公開前の試作 · 本番サイトは変わっていません</span></p>;
}
