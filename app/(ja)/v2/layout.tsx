import type { Metadata } from "next";
import Link from "next/link";
import { CartProvider } from "@/components/commerce/cart";
import { Header, Footer, PreviewTag, NAV } from "@/components/v2/shell";
import "@/components/v2/v2.css";

/* v2 preview of the page plan (artifact XMm96tVcNrXb1ar9KSA6Sq). Never indexed, never in app/sitemap.ts;
   the live pages at / and /origins/* are untouched. */
export const metadata: Metadata = {
  title: "SNöBI — preview v2",
  robots: { index: false, follow: false },
};

export default function V2Layout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider lang="ja">
      <div className="v2">
        <Header />
        <nav className="v2-subnav" aria-label="メイン（モバイル）">
          {[...NAV, ["取扱店", "/v2/trade"] as [string, string]].map(([l, h]) => (
            <Link key={h} href={h} className="t-label">{l}</Link>
          ))}
        </nav>
        <main>{children}</main>
        <Footer />
        <PreviewTag />
      </div>
    </CartProvider>
  );
}
