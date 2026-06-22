import { Nav } from "@/components/site/nav";
import { Hero } from "@/components/site/hero";
import { StatementBoxes } from "@/components/site/statement-boxes";
import { Flipbook } from "@/components/site/flipbook";
import { TheIdea } from "@/components/site/statements";
import { TheBag } from "@/components/site/the-bag";
import { TheStory } from "@/components/site/the-story";
import { OriginImage } from "@/components/site/origin-image";
import { ThePromise } from "@/components/site/the-promise";
import { WaitlistCTA } from "@/components/site/waitlist-cta";
import { Footer } from "@/components/site/footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <StatementBoxes />
        <Flipbook />
        <TheIdea />
        <TheBag />
        <TheStory />
        <OriginImage />
        <ThePromise />
        <WaitlistCTA />
      </main>
      <Footer />
    </>
  );
}
