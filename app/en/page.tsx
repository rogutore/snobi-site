import type { Metadata } from "next";
import Script from "next/script";
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

export const metadata: Metadata = {
  title: "Snobi — Organic. And actually specialty.",
  description:
    "Organic × Specialty × Japan. An organic specialty line from the Tokyo Coffee family, roasted in Tokyo. Est. 2026.",
  alternates: {
    canonical: "/en",
    languages: { ja: "/", en: "/en" },
  },
};

/* Full-English page. Root layout is lang="ja" (JP-primary site); this page
   corrects the document language on the client — good enough until a
   route-group layout split. */
export default function HomeEN() {
  return (
    <>
      <Script id="lang-en" strategy="afterInteractive">
        {`document.documentElement.lang = "en";`}
      </Script>
      <Nav en />
      <main>
        <Hero />
        <StatementBoxes en />
        <Flipbook />
        <TheIdea en />
        <TheBag en />
        <TheStory en />
        <RoadAhead en />
        <OriginImage />
        <ThePromise en />
        <WaitlistCTA en />
      </main>
      <Footer en />
    </>
  );
}
