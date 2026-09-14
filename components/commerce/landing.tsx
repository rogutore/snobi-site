import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { CartProvider } from "./cart";
import {
  ShopSection,
  ProductHero,
  Statement,
  Receipts,
  CompactStory,
  CompactRoad,
  FAQ,
  TradeCTA,
} from "./sections";
import type { Locale } from "@/content/products";
export function Landing({ lang = "ja" }: { lang?: Locale }) {
  return (
    <CartProvider lang={lang}>
      <Nav en={lang === "en"} paper />
      <main data-layout="hybrid">
        <ProductHero lang={lang} />
        <Statement lang={lang} />
        <ShopSection lang={lang} />
        <Receipts lang={lang} />
        <CompactStory lang={lang} />
        <FAQ lang={lang} />
        <CompactRoad lang={lang} />
        <TradeCTA lang={lang} />
      </main>
      <Footer en={lang === "en"} />
    </CartProvider>
  );
}
