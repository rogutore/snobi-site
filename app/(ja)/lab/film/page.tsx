import type { Metadata } from "next";
import { getStock } from "@/lib/shopify/client";
import { CartProvider } from "@/components/commerce/cart";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
import { FilmHero } from "@/components/lab/film-hero";
import { FilmBeats } from "@/components/lab/film-beats";
import { FilmRelease } from "@/components/lab/film-release";

// Stock must be fetched at request time, including after a credential-free build.
export const dynamic = "force-dynamic";

/* Hidden motion prototype: never indexed, never in app/sitemap.ts (that list
   is built from "", "/trade" and the origin slugs only). */
export const metadata: Metadata = {
  title: "SNöBI — film lab",
  robots: { index: false, follow: false },
};

export default async function Page() {
  const { stock } = await getStock();
  return (
    <CartProvider lang="ja">
      <Nav paper home={false} />
      <main>
        <FilmHero />
        <FilmBeats />
        <FilmRelease stock={stock} />
      </main>
      <Footer />
    </CartProvider>
  );
}
