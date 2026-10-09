import type { Metadata } from "next";
import Link from "next/link";
import Document from "@/components/commerce/document";
import { CartProvider } from "@/components/commerce/cart";
import { Header, Footer } from "@/components/v3/shell";
import "@/components/v3/v3.css";

/* 404 for any URL that matches no route (experimental globalNotFound in next.config.ts). The site has two root layouts
   ((ja) and (en)), so no single layout can wrap a 404; this file renders the whole document itself, reusing the same
   document, header and footer as the Japanese site. Not indexed. */
export const metadata: Metadata = {
  title: "ページが見つかりません｜SNöBI",
  robots: { index: false, follow: true },
};

export default function GlobalNotFound() {
  return (
    <Document lang="ja">
      <CartProvider lang="ja">
        <div className="v3">
          <Header />
          <main className="v3-sec v3-404">
            <p className="eyebrow" lang="en">404 · Page not found</p>
            <h1>ページが見つかりません。</h1>
            <p>URLが変わったか、ページがなくなりました。</p>
            <p className="links">
              <Link className="v3-btn" href="/coffee">4種のコーヒーを見る</Link>
              <Link href="/">ホームへ</Link>
            </p>
          </main>
          <Footer />
        </div>
      </CartProvider>
    </Document>
  );
}
