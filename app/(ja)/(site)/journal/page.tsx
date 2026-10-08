import { pageMeta, JsonLd, breadcrumb } from "@/lib/seo";
import { getStock } from "@/lib/shopify/client";
import { BuyBar } from "@/components/v3/buy-bar";
import Link from "next/link";
import { Photo } from "@/components/v2/photo";
import { posts } from "@/content/journal";
import { ROASTERY_POST } from "@/components/v3/pages/story-journal";
import "@/components/v3/pages/story.css";

/* Mockup D journal.html: the page head and the table of contents, rows of date · category · title · thumbnail.
   Rows = every post in content/journal (newest first) + the Roastery photo essay. */
export const metadata = pageMeta({ path: "/journal", title: "ジャーナル｜オーガニックコーヒーを知る", description: "有機JAS、スペシャルティ、産地、精製、デカフェ、淹れ方。オーガニックコーヒーについて、事実と出典で書くSNöBIのジャーナル。", image: "/v2/photos/205-l.webp" });
export const dynamic = "force-dynamic";

const ROWS = [
  ...posts.map((p) => ({ href: `/journal/${p.slug}`, date: p.published, category: p.category, title: p.title, cover: p.cover })),
  { href: ROASTERY_POST.href, date: "2026-10-01", category: ROASTERY_POST.category, title: ROASTERY_POST.title, cover: "205" },
];
const CATEGORIES = [...new Set(ROWS.map((r) => r.category))];

export default async function Journal() {
  const { stock } = await getStock();
  return (
    <>
      <JsonLd data={breadcrumb([["ホーム", "/"], ["ジャーナル", "/journal"]])} />
      <div className="v3p-story-journal">
        <div className="v3p-story-head">
          <p className="eyebrow" lang="en">Journal</p>
          <h1 className="v3p-story-h">ジャーナル</h1>
          <p>{CATEGORIES.join(" · ")}</p>
        </div>
        <div className="v3p-story-toc">
          {ROWS.map((r) => (
            <Link key={r.href} href={r.href} className="row">
              <span className="d">{r.date.replaceAll("-", ".")}</span>
              <span className="c">{r.category}</span>
              <span className="t">{r.title}</span>
              <Photo className="v3p-story-thumb" id={r.cover} alt="" sizes="90px" />
            </Link>
          ))}
        </div>
      </div>
      <BuyBar stock={stock} />
    </>
  );
}
