import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { StatementBoxes } from "@/components/site/statement-boxes";
import { Flipbook } from "@/components/site/flipbook";
import { TheIdea } from "@/components/site/statements";
import { TheBag } from "@/components/site/the-bag";
import { TheStory } from "@/components/site/the-story";
import { RoadAhead } from "@/components/site/road-ahead";
import { OriginImage } from "@/components/site/origin-image";
import { ThePromise } from "@/components/site/the-promise";
import { WaitlistCTA } from "@/components/site/waitlist-cta";
import { Footer } from "@/components/site/footer";
import { CartProvider } from "./cart";
import {
  ShopSection,
  ProductHero,
  Receipts,
  CompactStory,
  CompactRoad,
  FAQ,
  TradeCTA,
} from "./sections";
import type { Locale } from "@/content/products";
export type PreviewParams = Promise<{
  [key: string]: string | string[] | undefined;
}>;
export async function Landing({
  searchParams,
  lang = "ja",
}: {
  searchParams: PreviewParams;
  lang?: Locale;
}) {
  const query = await searchParams;
  const v = query.v === "b" ? "b" : "a";
  const cards = query.cards === "2" ? 2 : query.cards === "3" ? 3 : 1;
  const en = lang === "en";
  return (
    <CartProvider lang={lang}>
      <Nav en={en} paper={v === "b"} />
      <main data-variant={v} data-cards={cards}>
        {v === "a" ? (
          <>
            <Hero en={en} />
            <StatementBoxes en={en} />
            <Flipbook />
            <TheIdea en={en} />
            <TheBag en={en} />
            <ShopSection lang={lang} treatment={cards} />
            <Receipts lang={lang} />
            <TheStory en={en} />
            <RoadAhead en={en} />
            <OriginImage />
            <ThePromise en={en} />
          </>
        ) : (
          <>
            <ProductHero lang={lang} />
            <ShopSection lang={lang} treatment={cards} />
            <Receipts lang={lang} />
            <CompactStory lang={lang} />
            <CompactRoad lang={lang} />
          </>
        )}
        <FAQ lang={lang} />
        <TradeCTA lang={lang} />
        <WaitlistCTA en={en} />
      </main>
      <Footer en={en} />
    </CartProvider>
  );
}
