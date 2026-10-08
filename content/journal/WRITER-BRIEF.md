# Journal writer brief (2026-10-09) — read fully before writing

Goal: 15 SEO/AEO articles live on snobi.jp by Sunday 2026-10-11, each answering ONE organic search for SNöBI
(organic 有機JAS × specialty whole-bean coffee by Tokyo Coffee). Plan: ~/Documents/RTU/brain/Handoffs/premium-line/seo-aeo-plan.md (§3a).

## Output
- One file per article: `content/journal/posts/<slug>.ts`, `import type { Post } from "../types";` then
  `const post: Post = { ... }; export default post;` — follow `content/journal/types.ts` exactly (read its header rules).
- Japanese. Length: lead + 4–6 sections, about 1,800–3,000 JP characters of body, + 3–5 FAQ items.
- `lead` = one plain sentence that answers `keyword` directly (AI answers quote it).
- `title` (H1) carries the keyword naturally; `metaTitle` ≤ 36 chars; `description` 80–110 chars, ends with a fact.
- Use the keyword in the title, lead, one h2 and naturally in the body — never stuffed. Use variants once
  (オーガニック/有機, デカフェ/カフェインレス, ウィラ/ウイラ).
- `products`: the SNöBI coffees the article is about (slugs from content/products.ts). Mention prices only by
  reading products.ts (100g/200g) — and say 「税込」.
- `cover`: a photo id that exists in `public/v2/photos/` (manifest.json there; meanings in design/plan/PHOTO-INVENTORY.md).
  Never reuse the same cover as another article in your set.

## Facts — the hard rules
- Product/producer facts ONLY from: `content/products.ts`, `~/Documents/RTU/brain/Handoffs/premium-line/product-facts-chapter-one.md`,
  `docs/origins-research.md` (✅ items only; ⚠️ only with 「〜とされています」 + source; ❌ never), `content/ordering.ts`,
  `content/legal.ts`, `content/v2.ts` (jas facts). If two sources disagree, use products.ts.
- Every general/external fact (JAS rules, labeling law, SCA scoring, Geisha history, decaf processes, brewing ratios)
  needs a primary or authoritative source you actually opened with WebFetch (MAFF 農林水産省, 消費者庁, SCA, the
  processor's own site, etc.). Put it in `sources` with the URL. If you cannot verify a claim, leave it out.
- NEVER: health or medical claims (no 「体にいい」「妊娠中でも安心」「ストレスに」 etc. — 薬機法/景表法); 「無農薬」 as a claim
  about our coffee (explain only why we don't use the word); the roast date as a selling point or headline (owner rule);
  superlatives you can't prove (日本初, 最高, No.1); cup scores or prices paid to producers (not published);
  "organic-only roastery" (the roastery is certified 有機・非有機併用); competitor brands named negatively.
- Decaf: say only what products.ts says about the process and caffeine figure. The decaf plant name is NOT confirmed
  for our lot — don't name the plant unless products.ts does, and then attribute it 「仕様書によると」.
- Brewing numbers: general guidance labelled 「目安」 with a source; not presented as a lab-tested SNöBI recipe.
- Shipping/ordering lines: copy from content/ordering.ts (roast + ship Tue/Fri; noon cutoff; aging window line;
  free shipping over ¥3,000; next-day within Honshu).

## Voice (DESIGN.md)
Short declaratives ending in 。 Facts, not adjectives. Calm, tactile. No hype, no exclamation marks except where
products.ts already uses them. The brand is written 「SNöBI」; write 「SNöBI（スノビ）」 once in each article.

## Finish
Run `npx tsc --noEmit -p .` once and fix errors in YOUR files only (others are editing other files). Do not edit any
file other than your own posts. Return: the file list, the keyword per file, every source URL, and any fact you dropped
because you could not verify it.
