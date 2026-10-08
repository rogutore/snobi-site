import { pageMeta } from "@/lib/seo";
import { getStock } from "@/lib/shopify/client";
import { BuyBar } from "@/components/v3/buy-bar";
import Link from "next/link";
import { SHOOT } from "@/content/v2";
import { Photo } from "@/components/v2/photo";
import { ROASTERY_POST, ROASTERY_STEPS } from "@/components/v3/pages/story-journal";
import "@/components/v3/pages/story.css";

/* The Roastery photo essay (PHOTO-INVENTORY §3 sequence 1, eight of its frames), in Mockup D's page head and figure
   style. Photographs with short factual captions (published 2026-10-09). */
export const metadata = pageMeta({ path: "/journal/roastery", title: `${ROASTERY_POST.title}｜焙煎所`, type: "article", description: "東京の焙煎所で、生豆の麻袋から焙煎、冷却、一杯まで。写真で追う、SNöBIのつくり方。", image: "/v2/photos/205-l.webp" });
export const dynamic = "force-dynamic";

/* Wide frames run alone; the pairs sit side by side. */
const PAIRED = new Set(["161", "162", "200", "152"]);

export default async function RoasteryPost() {
  const { stock } = await getStock();
  return (
    <>
    <article className="v3p-story-post" aria-labelledby="post-h1">
      <header className="v3p-story-head">
        <p className="eyebrow"><Link href="/journal" lang="en">Journal</Link> · {ROASTERY_POST.category}</p>
        <h1 id="post-h1" className="v3p-story-h">{ROASTERY_POST.title}</h1>
        <p>写真：{SHOOT}</p>
      </header>
      <div className="v3p-story-essay">
        {ROASTERY_STEPS.map(([id, caption, alt], i) => (
          <Photo
            key={id}
            className={`v3p-story-fig ${PAIRED.has(id) ? "half" : "one"}`}
            id={id}
            alt={alt}
            caption={`${String(i + 1).padStart(2, "0")} — ${caption}`}
            sizes={PAIRED.has(id) ? "(min-width:700px) 46vw, 100vw" : "(min-width:700px) 80vw, 100vw"}
          />
        ))}
      </div>
      <footer className="v3p-story-postfoot">
        <Link href="/journal" className="v3p-story-back">← ジャーナル</Link>
        <Link className="v3-btn" href="/coffee">4つの産地から選ぶ</Link>
      </footer>
    </article>
      <BuyBar stock={stock} />
    </>
  );
}
