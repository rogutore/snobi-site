# Snobi — full-site plan

Status: PLAN, nothing built · 2026-10-04 · branch `claude/full-site` (off `origin/main` @ 03d20dc = what snobi.jp serves)

Every claim is marked VERIFIED (with source), INFERRED, or UNKNOWN.

## 0. Decisions

| # | Decision | Status |
|---|---|---|
| D1 | Journal lives as files in this repo; Codex publishes | **Owner, 2026-10-04** |
| D2 | Snobi products stay visible on tokyocoffee.jp for now; hiding documented (§6) | **Owner, 2026-10-04** |
| D3 | Page list (§2) | **Owner: approved, 2026-10-05** |
| D4 | SKUs: Shopify's are correct (`SNB-PERGE`, `SNB-ETHGU`); align repo + JSON-LD in Phase 1 | **Owner, 2026-10-05** |
| D5 | English (site + Shopify + selling abroad) moves to its own session, research first: `~/TC_Strategy/workstreams/shopify/ENGLISH_INTL_HANDOFF_20261005.md` | **Owner, 2026-10-05** |
| D6 | Analytics: best free setup for now (Vercel Web Analytics Hobby + Search Console + Shopify cart attributes); see `docs/design-research.md` §6 | **Owner, 2026-10-05** |
| D7 | Design: the three canvas directions were rejected as "mid". Rethink around a scroll-driven farm-to-cup film with real shoot footage: `docs/design-research.md` | **Owner, 2026-10-05**; concept open |
| D9 | Hosting: **migrate to Cloudflare Workers Paid ($5/mo) + R2 for media** (Vercel Hobby forbids commercial use). Checklist §11 | **Owner, 2026-10-05** |
| D10 | Origin/product pages get a facts + imagery pass using only ✅ items from vault `product-facts-chapter-one.md` → "Origin-page additions (2026-10-05)". Phase 4b | **Owner, 2026-10-05** |
| D8 | Positioning source = the live site copy ("Organic. And actually specialty." / オーガニックのまま、スペシャルティ。). `website-build-brief.md` is the old pre-launch brief; its "we show our work" / transparency positioning was dropped | **Owner, 2026-10-05** |

## 1. Where we are

### 1.1 Site
- **Live:** snobi.jp = Vercel project `snobi-site`, serving `origin/main` @ 03d20dc. VERIFIED: live HTML matches that commit.
- **Pages:** `/`, `/trade`, `/origins/[4 slugs]`, each in ja + `/en`. VERIFIED: `app/`.
- **Home:** Hero → Statement → Shop → Receipts → Story → FAQ → Road Ahead → Trade CTA. VERIFIED: `components/commerce/landing.tsx`.
- **Nav:** logo, one link ("コーヒー" → `#shop`), cart. VERIFIED: `components/site/nav.tsx`.
- **Stack:** Next.js 16.3.4, React 19.2, Tailwind 4, framer-motion, GSAP. VERIFIED: package.json, node_modules.
- **Product content:** `content/products.ts` (copy, producers, facts, variant ids, SKUs).
  - Shopify supplies only stock, price, cart, and checkout via the Storefront API 2026-07. VERIFIED: `lib/shopify/client.ts`.
- **SEO:** metadata + hreflang per page; ProductGroup JSON-LD on origin pages; sitemap.ts. VERIFIED.
  - No Organization, Breadcrumb, or Article structured data. VERIFIED: grep.
- **Analytics:** none. VERIFIED: grep for Analytics/gtag in app + components.
- **Dead code:** 9 pre-launch components in `components/site/` are imported nowhere, and neither is `app/api/waitlist`. VERIFIED: grep for importers.
  - Unused components: flipbook, hero, origin-image, road-ahead, statement-boxes, statements, the-bag, the-story, waitlist-cta.
  - `README-START-HERE.md` is stale.

### 1.2 Same value, many copies (blocks adding pages)
| Value | Copies | Where | Source of truth |
|---|---|---|---|
| Free shipping from ¥3,000 | ~15 | cart, sections, document, shipping-progress, (dead) hero | Shopify general shipping profile: "注文金額¥3000以上 → 送料無料". VERIFIED in admin, 2026-10-04 |
| Roast days 火・金 / Tue·Fri | ~10 | cart, sections, origin-page, en/page | owner (not in Shopify) |
| Order cutoff "前日正午 / noon the day before" | ~5 | sections, origin-page | owner |
| SKUs | 8 | `content/products.ts` | Shopify inventory (see 1.3) |

VERIFIED: grep for each value across app/, components/, content/, lib/.

Each new page (FAQ, Story, Coffee, journal posts) would add more copies. **The registry (Phase 1) comes before new pages.**

`linkcheck scan` today flags only test-script constants (viewport size, preview URL, timeouts). VERIFIED: ran it. The copy values above sit inside prose, so the scan misses them; grep found them.

### 1.3 Shopify (read-only look in admin, 2026-10-04)
- **Store:** Snobi products live in the **Tokyo Coffee** store (`tokyocoffeejp`, tokyocoffee.jp). VERIFIED.
- **Products:** 4, all Active, 98 units each.
  - Sales channel: **Online Store only**.
  - Collections include SNöBI, snobichapter-one, 全商品一覧, AVADA Best Sellers, Flowio Bestseller/New. VERIFIED: product page.
- **Site's key:** comes from custom app **snobi-site** (installed ~3 weeks ago).
  - Admin access: view+edit orders, products, discounts, other data; view customers; Online Store view+edit is granted but unused in 30 days. VERIFIED: app details page.
  - Storefront scopes aren't shown there. UNKNOWN. Not needed for D1.
- **Product pages on tokyocoffee.jp** (`/products/snobi-*`) are indexable with their own canonical. VERIFIED: curl. INFERRED: they compete with snobi.jp in Google.
- **SKU drift (D4):**

  | Product | Shopify | Repo + live JSON-LD on snobi.jp |
  |---|---|---|
  | Peru | `SNB-PERGE-100/200` | `SNB-PER-100/200` |
  | Ethiopia | `SNB-ETHGU-100/200` | `SNB-ETH-100/200` |
  | Colombia | `SNB-COL-*` | match |
  | Mexico | `SNB-MEX-*` | match |

  VERIFIED: Shopify inventory list + `curl snobi.jp/origins/peru`.
  - Google currently receives SKUs that don't exist in inventory.
  - `scripts/shopify-seed.ts` compares SKUs and would throw if re-run. VERIFIED: code.
- **Languages (D5):** the store has **Japanese only**; English is not added. VERIFIED: Settings → 言語.
  - INFERRED: `/en` visitors check out in Japanese.
  - Adding English is free (Translate & Adapt) but also adds English to tokyocoffee.jp.
- **Existing blog:** one, `tokyo-coffee-blog`, 46 articles. VERIFIED: sitemap_blogs_1.xml. Not used for Snobi (D1).

## 2. Site structure (D3)

| Page | URL (ja · en) | New? | Content |
|---|---|---|---|
| Home | `/` · `/en` | slimmed | Hero, Statement, 4 coffee cards, About teaser → `/about`, latest 3 journal posts, 3 FAQs → `/faq`, Trade CTA |
| Coffee | `/coffee` | new | Lineup compared side by side: notes, roast, best-for, brew suggestion; room for Chapter Two and subscriptions. Same cards as home, one component, read from `products.ts` |
| Origin | `/origins/[slug]` | exists | Producer, farm, process, cup. The main home for the new photos |
| About | `/about` | new | Statement + Story + Road Ahead (moved off home) + Tokyo Coffee lineage + JAS organic standard. Live copy only |
| Journal | `/journal`, `/journal/[slug]` | new | Categories: **Origins** 産地, **Brewing** 抽出, **Roastery** 焙煎所, **News** お知らせ |
| FAQ | `/faq` | new | Full FAQ (moved off home) |
| Trade | `/trade` | exists | Unchanged |
| Legal | footer links | unchanged | 特商法 stays linked to tokyocoffee.jp/pages/policy |

- **Nav:** Coffee · About · Journal · Trade · cart (EN mirrored); exact labels depend on the direction (D7).
- **Footer:** add Journal, FAQ, About.
- **Moving off home:** `#shop` keeps working (home keeps the cards). `#story`, `#road`, and `#faq` anchors move to `/about` and `/faq`. Old anchors are fragments, so links to `/` still land without error, just at the top (INFERRED).

## 3. Journal design (D1)

- **Format:** MDX via `@next/mdx`, which needs `mdx-components.tsx`. VERIFIED: Next 16 guide `node_modules/next/dist/docs/01-app/02-guides/mdx.md`.
- **Files:** `content/journal/<slug>.ja.mdx` + `<slug>.en.mdx`. An English version is optional per post, but must be declared.
- **Metadata:** each post exports a typed `meta` object instead of YAML frontmatter.
  - `@next/mdx` supports module exports natively; frontmatter needs extra plugins. VERIFIED: same guide.
  - Turbopack only accepts plugins with serializable options. VERIFIED: same guide.
  - Fields: `title`, `description`, `date`, `category` (one of the 4), `cover` (path under `public/journal/`), `products` (slugs from `products.ts`), `author`, `translationOf`.
- **Routes:** `app/(ja)/journal/[slug]/page.tsx` + EN twin. Dynamic import + `generateStaticParams` + `dynamicParams = false`, so unknown slugs 404 and everything is prerendered static. VERIFIED: guide.
- **Components available inside posts:**
  - `<ProductCard slug="peru"/>` reads `products.ts`.
  - `<FreeShipping/>`, `<RoastDays/>`, `<Cutoff/>` read the registry, so posts never retype these values.
  - `<Figure>`, `<Pull>` (pull quote).
- **Outputs:** journal index per language, category filter, RSS (`/journal/rss.xml`), Article JSON-LD, OG image = cover, sitemap + hreflang entries.
- **Guardrail:** `scripts/check-journal.ts` (tsx is installed) runs on `prebuild`, so a bad post fails the Vercel build instead of going live. It checks:
  - required meta fields;
  - category is one of the 4;
  - every `products` slug exists;
  - cover file exists;
  - ja/en pairs agree on slug, date, category;
  - no literal ¥3,000 / 火・金 / 正午 in post bodies.
- **Codex publishing:** a "Publishing a journal post" section in `AGENTS.md`. Codex reads AGENTS.md, and CLAUDE.md imports it, so both agents follow the same rules.
  - Steps: branch `codex/journal-<slug>` → add files + cover → run `npm run check:journal` → open PR → owner merges → Vercel deploys.

## 4. Registry (Phase 1, per the single-source rule)

- **File:** `system.toml` at the repo root, set up with `linkcheck init`.
  - Entries: free-shipping threshold (origin: Shopify general profile, 2026-10-04), roast days, order cutoff, ship-next-business-day rule, sizes, and per-variant SKUs (origin: Shopify inventory).
  - Generated to a frozen TS module that site code and MDX components read.
- **Replace** every copy in §1.2 with a registry read. `linkcheck verify` joins `prebuild`.
- **What stays outside the registry:** the threshold lives in Shopify, and the Storefront API doesn't expose shipping rates before checkout. INFERRED: no Storefront shipping-rate query exists. So the registry entry records its Shopify origin, and changing it in Shopify means changing the registry.

## 5. Build phases (each its own branch + PR; one agent per branch)

| Phase | Contents | Waits on |
|---|---|---|
| 1. Foundations | registry + replace copies; SKU fix (D4); remove 9 dead components + waitlist route; rewrite README-START-HERE; mark `website-build-brief.md` superseded so no agent reuses its dropped positioning (D8) | D4 |
| 1b. Design pass | pick a direction (D7) → page system: nav, page header, section rhythm, cards, article template, footer. Fonts + palette stay | D7 |
| 2. Structure | nav + footer; `/coffee`, `/about`, `/faq` from existing copy; slim home; Organization + Breadcrumb JSON-LD; sitemap | Phase 1b |
| 3. Journal | §3 end to end + AGENTS.md publishing guide + first real post (ja + en) | Phase 2 nav |
| 4. Photos | intake per §7; origin pages, home hero, About built around real images | photos |
| 4b. Origin pages pass | Facts: add every ✅ item from the vault "Origin-page additions" (JA + EN), apply the Colombia rename (El Bombo co-op) once the owner OKs it, and keep ❌ conflicts out. Images: only with written permission on file (`SNOBI/<origin>/Photos/RIGHTS.md`). Swap `/producers/tesfaye.jpg` (Sucafina-owned) unless permission arrives first. Check: every origin-page claim traces to a ✅ line | Phase 4, permissions |
| 5. Later | English checkout (D5), analytics (D6), subscriptions (Bold Subscriptions is installed in the store; VERIFIED: app list) | decisions |

Per the owner: no placeholder page templates before the photos arrive. Phases 1–3 use existing copy and images only.

## 6. Runbook: hiding Snobi products on tokyocoffee.jp (D2, for later)

1. For each of the 4 products: add product metafield `seo.hidden` = `1` (integer). Shopify then removes the page from sitemaps, search engines, and store search; the product stays in collections. VERIFIED: help.shopify.com/en/manual/online-store/storefront-search/managing-searchability.
2. Optionally remove them from the Tokyo Coffee collections (全商品一覧, AVADA/Flowio bestseller lists) so they stop appearing in Tokyo Coffee browsing.
3. **Do not unpublish from Online Store.** It is their only sales channel. INFERRED: the snobi-site app's Storefront access relies on that publication, so unpublishing would break stock and cart on snobi.jp. Test on one product first if ever needed.
4. Check: `curl tokyocoffee.jp/products/snobi-peru` shows `noindex`, and snobi.jp cart still adds Peru.

## 7. Photo intake (not templates; just where files go)

- **Location:** `public/photos/<page>/<slug>-<nn>.jpg`, e.g. `origins/peru-01.jpg`, `story/roastery-01.jpg`.
- **Format:** sRGB, long edge ≥ 2400px, JPG.
- **Shot list:**
  - per origin: producer portrait, farm/landscape, cherries or process, bean close-up;
  - About: roastery, roasting in progress, team;
  - Home hero: bag;
  - per journal post: one cover (≥ 1600×900).
- Existing camera-named files (`032.jpg`, `DSCF1712.jpg`, …) get renamed at intake.

## 8. English checkout (D5): what it touches

- Adding English to the Shopify store publishes `tokyocoffee.jp/en/...` for the **whole Tokyo Coffee store**. Untranslated content shows in Japanese, and hreflang tags are added automatically. VERIFIED: help.shopify.com/en/manual/international/languages.
- There is no "checkout-only" language. VERIFIED: same page.
- Checkout UI strings come pre-translated for English. VERIFIED: same page.
- snobi.jp also needs a code change: carts are created with `@inContext(country:JP)` only, and an English checkout needs `@inContext(language: EN)` on `cartCreate`, with the language enabled in Markets. VERIFIED: `lib/shopify/actions.ts`, shopify.dev headless multiple-languages guide.
- **Safe version:**
  1. Publish English.
  2. Translate just the 4 Snobi products.
  3. Add `noindex` for `/en` pages in the tokyocoffee.jp theme (one Liquid condition), so Google doesn't index half-Japanese English pages.
  4. Ship the `language: EN` cart change.
  The theme edit touches the Tokyo Coffee site, so it needs owner sign-off.
- **Data first (optional):** every snobi.jp cart already carries `lang=en|ja`. VERIFIED: `actions.ts`. INFERRED: cart attributes carry onto the order, so English orders can be counted in Shopify before deciding.

## 9. Analytics (D6): recommended setup

1. **Vercel Web Analytics + Speed Insights** for site behaviour.
   - No cookies; visitors are identified by a hash that resets daily, so no consent banner is needed. Available on all plans. VERIFIED: vercel.com/docs/analytics.
   - Custom events need **Pro**: Hobby has none and 50k events/month. Pro costs $0.03 per 1k events and allows 2 properties per event. VERIFIED: vercel.com/docs/analytics/limits-and-pricing. The team's current plan is UNKNOWN.
   - Events: `add_to_cart` (product, size), `checkout_start`, `journal_read` (slug), `trade_click`.
2. **Google Search Console** for snobi.jp: what people search, indexing, and which journal posts get found. Free, and collects nothing from visitors.
3. **Shopify for revenue.** Carts already carry `source=snobi.jp` + `lang`. VERIFIED. Add `landing` (first page or journal slug) so orders show which page or post led to the sale.

Not recommended now:
- **Shopify's own analytics script.** Shopify says non-Hydrogen headless sites aren't actively supported. VERIFIED: shopify.dev hydrogen-react docs / community answer. Checkout is on a different domain, so the cookies wouldn't link anyway (INFERRED).
- **GA4.** It uses cookies, which means a consent banner plus a 外部送信 notice. Only worth it if running Google Ads for Snobi.

## 10. Design directions (D7)

Canvas: https://claude.ai/artifact/LsHBhW6c5zUZzZaw5bcWXq (private to the owner). Three directions × Home / Journal / About.
- All three use the live headline and live copy. New lines are bracketed placeholders.
- All keep the brand palette. Mockups use Google stand-ins for the Adobe fonts: Fraunces ≈ Moret, Newsreader ≈ Maiola, Zen Kaku Gothic New ≈ 秀英角ゴシック銀.

## 11. Migration checklist: Vercel → Cloudflare (D9)

Feasibility, checked 2026-10-05:
- No middleware. VERIFIED: repo. OpenNext's one unsupported feature is Node middleware. VERIFIED: opennext.js.org.
- Server actions with cookies (`lib/shopify/actions.ts`) are supported. VERIFIED: OpenNext feature list.
- `force-dynamic` home pages render per request; Workers Paid allows 30 s CPU by default (Free's 10 ms would not fit). VERIFIED: Workers limits.
- 13 files use `next/image`. Options: Cloudflare Images binding (5,000 unique transformations/month free, then $0.50 per 1,000; VERIFIED) or pre-optimized static exports.
- DNS: snobi.jp uses Vercel DNS (ns1/ns2.vercel-dns.com). Only A/wildcard records, **no MX/TXT, so no email to break**. VERIFIED: dig. Registrant 株式会社ローグトレード.

Steps (one branch; Vercel stays live until cutover):
1. ~~Owner: Cloudflare account + Workers Paid ($5)~~ **done 2026-10-05** (account rogutore@gmail.com). Deploy access **done 2026-10-05**: `wrangler login` → account `Rogutore@gmail.com's Account` (6bdeb451…); credentials in `~/Library/Preferences/.wrangler/`, outside the repo.
   - Zone **blocked**: the dashboard's "Connect a domain" flow hangs for snobi.jp. Its registrar check `registrar/domains/batch_check?id=snobi.jp` returns 422 "Unable to check" (Cloudflare Registrar doesn't handle .jp) and the UI never moves on. Verified 2026-10-05; no zone was created.
   - The zone is **not needed until cutover**; build and QA on `*.workers.dev`.
   - Before cutover, add the zone by one of: retry the dashboard (bug may be fixed), ask Cloudflare support, or have the owner create a scoped API token (Zone:Edit) for one `POST /zones` call.
2. Add `@opennextjs/cloudflare` + `wrangler.jsonc` with an R2 bucket for video and a frame-sequence binding. Move `SHOPIFY_STORE_DOMAIN` / `SHOPIFY_STOREFRONT_TOKEN` to Worker secrets. Drop the Vercel-only config.
3. Deploy to a `*.workers.dev` preview and run the full QA there:
   - all routes, ja + en;
   - add to cart for all 8 variants;
   - drawer totals and the ¥3,000 line;
   - checkout handoff;
   - one real order + refund.
   **Status 2026-10-05:** done on branch `claude/cloudflare` (not committed).
   - Preview: https://snobi-site.rogutore.workers.dev. Secrets set from the Admin API via `npm run cf:secrets`.
   - QA passed:
     - 13 routes match live (200/404);
     - live stock matches (49/variant);
     - image optimizer via the IMAGES binding;
     - all 8 variants added → drawer ¥19,955 (= 7,185 + 12,770);
     - checkout handoff opens tokyocoffee.jp checkout with "8 アイテム";
     - /en cart and copy in English.
   - Fix made: robots + `noindex` used `VERCEL_ENV`, which would have **blocked indexing after cutover**. They now key on the request host (`lib/site.ts`): only `snobi.jp` is indexable.
     - Verified locally: Host snobi.jp → identical to live robots.txt and no noindex; any other host → Disallow + noindex.
     - Also hides `*.vercel.app` previews, which were indexable before.
   - Not done: the real paid order + refund (owner).
4. Analytics on Cloudflare: Cloudflare Web Analytics (free on all plans; VERIFIED) replaces Vercel Web Analytics. Search Console stays as is.
5. Cutover: owner switches nameservers at the registrar → watch → keep the Vercel project 2 weeks for rollback (switch NS back).
6. After cutover: delete the Vercel project, and update `docs/` + the vault launch-plan.
