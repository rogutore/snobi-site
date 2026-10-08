/* One journal post = one typed object (no markdown parser; rendered by app/(ja)/journal/[slug]/page.tsx).
   Rules for every post (owner 2026-10-09: "15 articles by Sunday"; plan brain/Handoffs/premium-line/seo-aeo-plan.md):
   - Answers ONE organic search: `keyword` is the primary query, `lead` is a one-sentence answer to it.
   - Facts only from content/products.ts, the vault product-facts note, docs/origins-research.md (✅ items),
     content/ordering.ts, content/legal.ts, content/v2.ts — or a cited primary source in `sources`.
   - Never: health claims (薬機法), 「無農薬」 as a claim, roast date as a selling point, unsupported superlatives
     (日本初・最高 etc.), cup scores or producer payments, competitor names in a negative light.
   - Voice: DESIGN.md — short declaratives ending in 。, facts not adjectives. */
import type { Coffee } from "../products";

export type JournalCategory = "オーガニック" | "産地" | "抽出" | "焙煎所" | "ギフト";

export type Block =
  | { p: string }                                  // paragraph
  | { list: string[] }                             // bullet list
  | { steps: string[] }                            // numbered steps
  | { table: { head: string[]; rows: string[][] } } // small comparison table
  | { note: string };                              // boxed fact / caution

export type Post = {
  slug: string;                 // URL: /journal/<slug> (ASCII, kebab-case)
  category: JournalCategory;
  title: string;                // H1, ≤ 32 JP chars, carries the keyword
  metaTitle: string;            // <title> before " | SNöBI", ≤ 36 JP chars
  description: string;          // meta description, 80–110 JP chars
  keyword: string;              // primary search phrase
  related: string[];            // secondary phrases (for the record; not stuffed into copy)
  published: string;            // YYYY-MM-DD
  updated: string;              // YYYY-MM-DD
  lead: string;                 // one-sentence answer, shown first
  sections: { h2: string; blocks: Block[] }[];
  faq?: { q: string; a: string }[];
  products: Coffee["slug"][];   // product cards at the end (1–4)
  cover: string;                // photo id from public/v2/photos (e.g. "161")
  coverAlt: string;
  sources: { label: string; url?: string }[]; // every external fact; internal facts cite the file
};
