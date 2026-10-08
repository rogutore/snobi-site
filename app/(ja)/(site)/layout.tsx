import type { Metadata } from "next";
import { CartProvider } from "@/components/commerce/cart";
import { Header, Footer } from "@/components/v3/shell";
import { Komorebi } from "@/components/v3/komorebi";
import { JsonLd, organization, website } from "@/lib/seo";
import "@/components/v3/v3.css";

/* snobi.jp (Japanese) — Mockup D, "the Daylight version" (owner 2026-10-06), live from 2026-10-09 (owner: "if the new
   site is already more accurate than the old then swap it out"). Was the /v3 preview; /v3/* now redirects here.
   Indexing is decided per host in the root document (only snobi.jp is indexable). Every page sets its own canonical
   via lib/seo.tsx pageMeta. The leaf light sits here so every page has it; white text over a photo needs z-index ≥ 36
   (the layer is 35). */
export const metadata: Metadata = { title: { default: "SNöBI｜オーガニック スペシャルティコーヒー豆（有機JAS）", template: "%s｜SNöBI" } };

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider lang="ja">
      <div className="v3">
        <JsonLd data={[organization(), website()]} />
        <Komorebi />
        <Header />
        <main>{children}</main>
        <Footer />
      </div>
    </CartProvider>
  );
}
