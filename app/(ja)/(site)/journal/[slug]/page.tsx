import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getStock } from "@/lib/shopify/client";
import { posts } from "@/content/journal";
import type { Block } from "@/content/journal/types";
import { products, yen } from "@/content/products";
import { originFrames } from "@/content/v2";
import { Photo } from "@/components/v2/photo";
import { BuyBar } from "@/components/v3/buy-bar";
import { pageMeta, JsonLd, article, breadcrumb, faqPage, fromPrice } from "@/lib/seo";
import "@/components/v3/pages/story.css";

/* One journal post (content/journal/posts/*.ts, typed by content/journal/types.ts): the one-sentence answer first,
   sections, visible FAQ (AI answers read it), the coffees it is about, and the sources. Article + Breadcrumb (+ FAQPage)
   JSON-LD from lib/seo.tsx. Plan: brain/Handoffs/premium-line/seo-aeo-plan.md T25. */
export const dynamic = "force-dynamic";

const find = (slug: string) => posts.find((p) => p.slug === slug);

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const p = find((await params).slug);
  if (!p) return {};
  return pageMeta({ path: `/journal/${p.slug}`, title: p.metaTitle, description: p.description, image: `/v2/photos/${p.cover}-l.webp`, type: "article" });
}

function Body({ b }: { b: Block }) {
  if ("p" in b) return <p>{b.p}</p>;
  if ("list" in b) return <ul>{b.list.map((x) => <li key={x}>{x}</li>)}</ul>;
  if ("steps" in b) return <ol>{b.steps.map((x) => <li key={x}>{x}</li>)}</ol>;
  if ("note" in b) return <p className="note">{b.note}</p>;
  if ("read" in b) {
    const r = posts.find((x) => x.slug === b.read);
    if (!r) throw new Error(`journal: { read: "${b.read}" } names no post`);
    return <p className="read"><Link href={`/journal/${r.slug}`}>{r.title} →</Link></p>;
  }
  return (
    <div className="tbl">
      <table>
        <thead><tr>{b.table.head.map((h, i) => <th key={i}>{h}</th>)}</tr></thead>
        <tbody>{b.table.rows.map((r, i) => <tr key={i}>{r.map((c, j) => <td key={j}>{c}</td>)}</tr>)}</tbody>
      </table>
    </div>
  );
}

export default async function JournalPost({ params }: { params: Promise<{ slug: string }> }) {
  const p = find((await params).slug);
  if (!p) notFound();
  const { stock } = await getStock();
  const coffees = p.products.map((slug) => {
    const c = products.find((x) => x.slug === slug);
    if (!c) throw new Error(`journal/${p.slug}: unknown product ${slug}`);
    return c;
  });
  const path = `/journal/${p.slug}`;
  return (
    <>
      <JsonLd data={[
        article({ path, title: p.title, description: p.description, published: p.published, updated: p.updated, image: `/v2/photos/${p.cover}-l.webp` }),
        breadcrumb([["ホーム", "/"], ["ジャーナル", "/journal"], [p.title, path]]),
        ...(p.faq?.length ? [faqPage(p.faq)] : []),
      ]} />
      <article className="v3p-post" aria-labelledby="post-h1">
        <header className="v3p-story-head">
          <p className="eyebrow"><Link href="/journal" lang="en">Journal</Link> · {p.category}</p>
          <h1 id="post-h1" className="v3p-story-h">{p.title}</h1>
          <p className="v3p-post-dates">
            公開 <time dateTime={p.published}>{p.published.replaceAll("-", ".")}</time>
            {p.updated !== p.published ? <> · 更新 <time dateTime={p.updated}>{p.updated.replaceAll("-", ".")}</time></> : null}
          </p>
        </header>
        <Photo className="v3p-post-cover" id={p.cover} alt={p.coverAlt} sizes="(min-width:900px) 820px, 100vw" priority />
        <div className="v3p-post-body">
          <p className="v3p-post-lead">{p.lead}</p>
          {p.sections.map((s) => (
            <section key={s.h2}>
              <h2>{s.h2}</h2>
              {s.blocks.map((b, i) => <Body key={i} b={b} />)}
            </section>
          ))}
          {p.faq?.length ? (
            <section className="v3p-post-faq" aria-labelledby="post-faq">
              <h2 id="post-faq">よくある質問</h2>
              <dl>{p.faq.map((x) => <div key={x.q}><dt>{x.q}</dt><dd>{x.a}</dd></div>)}</dl>
            </section>
          ) : null}
        </div>
        <section className="v3p-post-coffees" aria-label="この記事のコーヒー">
          <p className="eyebrow" lang="en">The coffee</p>
          <div className="grid">
            {coffees.map((c) => (
              <Link key={c.slug} href={`/origins/${c.slug}`} className="card">
                <Photo className="ph" id={originFrames[c.slug].hero} alt={`SNöBI ${c.title.ja}の袋`} sizes="(min-width:900px) 260px, 45vw" />
                <span className="t">{c.title.ja}</span>
                <span className="s">{c.notes.ja.join(" · ")}</span>
                <span className="pr">有機JAS · 100g {yen(fromPrice(c))}〜</span>
              </Link>
            ))}
          </div>
        </section>
        <footer className="v3p-post-sources">
          <h2>出典</h2>
          {/* In-house sources (repo files, the vault) are for us; readers see one plain line for them + every external URL. */}
          <ol>
            <li>SNöBIの商品情報（輸入元の仕様書・有機JAS証明書ほか）</li>
            {p.sources.filter((s) => s.url).map((s) => <li key={s.url}><a href={s.url} rel="noopener" target="_blank">{s.label}</a></li>)}
          </ol>
          <div className="v3p-story-postfoot">
            <Link href="/journal" className="v3p-story-back">← ジャーナル</Link>
            <Link className="v3-btn" href="/coffee">4つの産地から選ぶ</Link>
          </div>
        </footer>
      </article>
      <BuyBar stock={stock} />
    </>
  );
}
