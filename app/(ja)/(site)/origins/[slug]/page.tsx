import { pageMeta, JsonLd, productGroup, breadcrumb, fromPrice } from "@/lib/seo";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getStock } from "@/lib/shopify/client";
import { products, yen, type Coffee } from "@/content/products";
import { orderingSchedule, freeShippingLine, shipMethodLine } from "@/content/ordering";
import { originFrames } from "@/content/v2";
import { OriginBuy } from "@/components/v3/pages/origins-buy";
import { BRAND_PLAIN } from "@/content/brand";
import { OriginGallery } from "@/components/v3/pages/origin-gallery";
import { OriginPhotos } from "@/components/v3/origin-photos";
import { FujiMini } from "@/components/v3/fuji-mini";
import { posts } from "@/content/journal/index";
import "@/components/v3/pages/origins.css";

export const dynamic = "force-dynamic";

/* One template for Mockup D's four origin pages (origin-{peru,ethiopia,colombia,mexico}.html), ported with the real
   fonts. Kept: the hero split + buy box, the bag section, the photo pair, "ほかの産地". Replaced (owner/brief): the 3D bag
   → the hand photo; the belt map → the producer story set in type; the tint wash → plain paper.
   Producer photos are importer-owned (Miguel, Tesfaye), so none are used. */

/* ✅ facts not yet in products.ts (design/plan/COPY-INVENTORY.md §3, fact-sheet line in each comment). DRAFT wording
   for the owner; move into content/products.ts `facts` when approved (this page may not edit content/*). */
const MORE_FACTS: Record<string, string[]> = {
  peru: [
    "チリノスの組合は1968年の設立。組合員の25%は女性。", // FS:105, FS:106
    "2025年11月10日、組合はペルーのFICAFÉで、森林を切りひらかずに育てたコーヒーを認証し、たどれるようにする全国の仕組みを発表した。", // FS:107
  ],
  "ethiopia-guji": [
    "タデGG農園の広さは221ha。", // FS:114
    "タスファイさんは中米と南米をめぐって、コーヒーの栽培と精製を学んだ。", // FS:115
    "輸入商社のTraboccaとともに村の学校づくりに取り組み、2018年にクルメ村の学校が完成。", // FS:117
  ],
  "colombia-huila": [
    "豆を育てるのは、エル・ボンボ生産者協同組合の82軒（303.2ha）。組合はこれまでに約10万本の日陰樹を配ってきた。", // FS:130, FS:132
  ],
  "mexico-chiapas-decaf": [], // its ✅ facts (5,636m, 99.9%, 3,253, one in four) are already in products.ts
};

const find = (slug: string) => products.find((x) => x.slug === slug);
const img = (id: string) => ({ src: `/v2/photos/${id}-s.webp`, srcSet: `/v2/photos/${id}-s.webp 700w, /v2/photos/${id}-l.webp 1400w` });
const tags = (p: Coffee) => [p.roast?.ja, p.decaf ? "デカフェ" : null].filter(Boolean).join(" · ");

/* Organic-first titles (plan §3, owner 2026-10-08: "the whole point is specialty organic"). */
const SEO_TITLE: Record<string, string> = {
  peru: "ペルー チリノス ゲイシャ｜オーガニック（有機JAS）コーヒー豆",
  "ethiopia-guji": "エチオピア グジ ナチュラル｜オーガニック（有機JAS）コーヒー豆",
  "colombia-huila": "コロンビア ウィラ｜有機栽培（有機JAS）コーヒー豆",
  "mexico-chiapas-decaf": "オーガニック デカフェ 浅煎り｜メキシコ チアパス 有機JAS コーヒー豆",
};

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  const title = SEO_TITLE[p.slug];
  if (!title) throw new Error(`origins/${p.slug}: no SEO title (SEO_TITLE)`);
  return pageMeta({
    path: `/origins/${p.slug}`,
    en: `/en/origins/${p.slug}`,
    title,
    description: `${p.title.ja}（有機JAS）。${p.region.ja}、標高${p.elevation}、${p.process.ja}。${p.notes.ja.join("・")}。100g ${yen(fromPrice(p))}（税込）から、${freeShippingLine.ja}。`,
    image: `/v2/photos/${originFrames[p.slug].hero}-l.webp`,
  });
}

export default async function Origin({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const p = find(slug);
  if (!p) notFound();
  const i = products.indexOf(p);
  const f = originFrames[p.slug];
  const { stock } = await getStock();
  const others = products.filter((x) => x.slug !== p.slug);
  /* SEO plan T26: origin → journal links, derived from each post's own product cards (posts that feature fewer coffees,
     i.e. are more about this one, first). */
  const reading = posts
    .filter((x) => x.products.includes(p.slug))
    .sort((a, b) => a.products.length - b.products.length || b.published.localeCompare(a.published))
    .slice(0, 3);
  const facts = [...p.facts.ja, ...(MORE_FACTS[p.slug] ?? [])];
  return (
    <div className="v3p-origins" style={{ "--rink": p.ink } as React.CSSProperties}>
      <JsonLd data={[productGroup(p, stock, [f.hero, f.beans, f.cup, f.brew, f.table, f.waist].map((id) => `/v2/photos/${id}-l.webp`)), breadcrumb([["ホーム", "/"], ["産地", "/origins"], [p.title.ja, `/origins/${p.slug}`]])]} />
      {/* hero: the bag in the dappled light + the copy and buy box (Mockup D .ohero) */}
      <section className="v3p-origins-hero" aria-labelledby="o-h1">
        {/* Four shots that each show something different (Masaki 2026-10-09: the cup and dark-table frames repeated the
            bag-on-table hero). The farm photos join here when the producers reply (docs/permission-emails.md). */}
        <OriginGallery shots={[
          { id: f.hero, alt: `SNöBI ${p.title.ja}の袋、木漏れ日のテーブル`, position: "50% 70%" },
          { id: f.beans, alt: `${p.title.ja}の焙煎豆` },
          { id: f.brew, alt: `${p.title.ja}をハンドドリップで淹れる` },
          { id: f.waist, alt: `${p.title.ja}の袋を両手で持つ` },
        ]} />
        <div className="copy">
          <p className="eyebrow">第一章 — {String(i + 1).padStart(2, "0")} / {String(products.length).padStart(2, "0")}{p.decaf ? " · DECAF" : ""}</p>
          <p className="country" lang="en">{p.country}</p>
          <h1 id="o-h1" className="title-ja">{p.title.ja}</h1>
          <p className="notes">{p.notes.ja.join(" · ")}</p>
          <p className="enjoy">{p.enjoyWithin.ja}</p>
          <p className="best">{p.bestFor.ja}</p>
          <p className="story">{p.narrative.ja[0]}</p>
          <dl className="facts">
            <dt>ブランド</dt><dd>{BRAND_PLAIN}</dd>
            <dt>認証</dt><dd>有機JAS（オーガニック）</dd>
            <dt>地域</dt><dd>{p.region.ja}</dd>
            <dt>生産者</dt><dd>{p.producer.ja}</dd>
            <dt>標高</dt><dd>{p.elevation}</dd>
            <dt>品種</dt><dd>{p.variety.ja}</dd>
            <dt>精製・乾燥</dt><dd>{p.process.ja}</dd>
            {p.roast ? <><dt>焙煎度</dt><dd>{p.roast.ja}</dd></> : null}
          </dl>
          <OriginBuy p={p} stock={stock} />
        </div>
      </section>

      {/* the bag (Mockup D .obag): the 3D bag is replaced by the bag passed hand to hand */}
      <section className="v3p-origins-bag" aria-labelledby="o-bag">
        <div className="ph">
          {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
          <img {...img(f.hand)} sizes="(min-width:860px) 40vw, 100vw" alt={`${p.title.ja}の袋を手渡す`} loading="lazy" />
        </div>
        <div className="text">
          <p className="eyebrow">The bag</p>
          <h2 id="o-bag">豆のまま。</h2>
          <p>100g・200gとも豆のままお届けします。</p>
          <ul>{orderingSchedule.ja.map((t) => <li key={t}>{t}</li>)}</ul>
          <p>{shipMethodLine.ja}。</p>
        </div>
      </section>

      {/* the producer: type, then the supply-chain photos from content/origin-media.ts (none = none; owner 2026-10-15) */}
      <section className="v3p-origins-producer" aria-labelledby="o-who">
        <div className="lead">
          <p className="eyebrow">The producer</p>
          <h2 id="o-who">{p.producer.ja}</h2>
          {p.narrative.ja.slice(1).map((t) => <p key={t}>{t}</p>)}
        </div>
        <ol>{facts.map((t) => <li key={t}>{t}</li>)}</ol>
        <OriginPhotos slug={p.slug} lang="ja" />
      </section>

      {/* 富士山で測る: the home page's Fuji plate, small and still, with this farm's height (numbers from compare()) */}
      <section className="v3p-origins-alt" aria-labelledby="o-alt">
        <div className="text">
          <p className="eyebrow">Altitude</p>
          <h2 id="o-alt">富士山で測る</h2>
          <p>{p.title.ja.split(" ")[0]}の畑は標高{p.elevation}。同じ縮尺で、富士山と東京スカイツリーに並べました。</p>
          <Link href="/#fuji" className="v3-more">4つの産地を富士山で比べる →</Link>
        </div>
        <FujiMini p={p} />
      </section>


      {reading.length > 0 ? (
        <section className="v3-sec v3p-origins-read" style={{ paddingTop: 0 }} aria-labelledby="o-read">
          <h2 id="o-read" className="v3-def-h">{p.title.ja.split(" ")[0]}の読みもの</h2>
          <ul>
            {reading.map((r) => (
              <li key={r.slug}>
                <Link href={`/journal/${r.slug}`}><b>{r.title}</b><span>{r.lead}</span></Link>
              </li>
            ))}
          </ul>
        </section>
      ) : null}

      {/* other origins (Mockup D: releases on white; the bags in the dappled light, as on home) */}
      <section className="v3-sec v3p-origins-others" style={{ paddingTop: 0 }} aria-labelledby="o-others">
        <div className="v3-sec-head">
          <h2 id="o-others">ほかの産地</h2>
          <Link className="v3-btn ghost" href="/coffee">4つすべてを見る →</Link>
        </div>
        <div className="v3-releases">
          {others.map((o) => (
            <Link key={o.slug} href={`/origins/${o.slug}`} className="v3-rel">
              <div className="ph">
                {/* eslint-disable-next-line @next/next/no-img-element -- pre-sized WebP pair */}
                <img {...img(originFrames[o.slug].hero)} sizes="(min-width:860px) 23vw, 70vw" alt={`SNöBI ${o.title.ja}`} loading="lazy" />
              </div>
              <p className="n">{String(products.indexOf(o) + 1).padStart(2, "0")} — {o.country.toUpperCase()}</p>
              <p className="t">{o.title.ja}</p>
              <p className="s">{o.notes.ja.join(" · ")}</p>
              <p className="pr">{yen(o.variants[0].price)}〜{tags(o) ? ` · ${tags(o)}` : ""}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
