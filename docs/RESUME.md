# RESUME — snobi-site session state (2026-10-05 ~04:25 JST)

Read this first after compaction. Supporting docs:
- `docs/site-plan.md` (decisions D1–D10, §11 migration checklist — now marked live)
- `docs/design-research.md`, `docs/origins-research.md`, `docs/permission-emails.md`
- Owner rules (memory): positioning = live copy ("Organic. And actually specialty." / オーガニックのまま、スペシャルティ。), never the old brief's "we show our work"; light/neutral art direction; world-class, not "mid"; plan before big builds.

## 2026-10-09 (late night) — favicon un-inverted, /trade form live, photo-permission drafts saved
- LIVE: version 7c664189-9686-46bc-a4c5-4781bde8a388 (previous 1639c11b).
- FAVICON (owner: "not inverted"): plum boar on transparent, as the logo is printed; in a dark browser theme icon.svg turns the boar paper so it stays visible on dark tab bars (VERIFIED: fill #443850 light / #f7f5f0 dark). apple-icon = plum boar on paper. `scripts/make-favicon.py`.
- /trade FORM (owner: "make a beautiful form for us now"): on-page form in three numbered groups (お店 / ご担当者 / ご相談), posts server-side into the EXISTING Google Form so answers land in the same response sheet. Copy + Google contract (entry ids, option labels VERIFIED 2026-10-09) in `content/trade.ts`; `lib/trade-enquiry.ts` (validation), `app/(ja)/(site)/trade/actions.ts`, `components/v3/pages/trade-form.tsx`. Extra fields (都道府県, 営業状況/開業予定, URL, 気になる豆, ref) go into the free-text answer. Spam: honeypot + 3 s minimum. Sample / launch-notice options not offered. VERIFIED: validation, phone layout, honeypot path on Workers, Google rejects an incomplete post (400). NOT VERIFIED: one real submission landing in the sheet (needs owner OK to send a test).
- Footer link 「発売案内を受け取る ↗」 (components/v3/shell.tsx) still opens the Google Form with the CAFERES description: proposed to owner, not changed.
- PHOTO EMAILS: 6 Gmail drafts in info@ (not sent): 4 vendors + Chirinos co-op + Café Colsuaves; detail in `docs/permission-emails.md` status block.

## 2026-10-09 (night) — favicon live, SNöBI Amazon handoff, wholesale form options
- LIVE: version 1639c11b-090d-4c65-b363-738aae2d37f0 = favicon (was the default Next.js triangle). `scripts/make-favicon.py` builds `app/icon.svg`, `app/favicon.ico` (16/32/48) and `app/apple-icon.png` (180) from `public/brand/snobi.svg` + the plum/paper tokens in globals.css: plum square, paper boar. VERIFIED 200 + `<link rel="icon">` tags on /, /en, /origins/peru. Previous: d8785f10.
- Deploy note: `wrangler versions upload/deploy` uses wrangler's own login. Run it WITHOUT sourcing `_secrets/cloudflare-snobi.env` (that token is zone/DNS only and returns "No access to the specified service").
- AMAZON HANDOFF (owner: "save a handoff specifically for the Snobi Amazon project… next agent should… prep and apply for the trademark… chatgpt or claude"): `brain/Handoffs/snobi-amazon/_index.md` + `trademark-filing.md` (work package). `trademark-application.md` MOVED from `docs/launch-kit/` into that folder (repo file is now a pointer). ChatGPT-readable research snapshot: Drive `RTU/snobi-amazon/research-2026-10-09/`. Footer 「© 2026 Snobi」 now carries a keep-until-registration comment (`components/v3/shell.tsx`).
- WHOLESALE FORM: options given to owner (fix the Google Form copy now; later an on-page /trade form that posts into the same Google Form). Waiting on owner + item F (samples yes/no, terms). After any form edit, re-read entry ids before touching `content/trade.ts` prefill.
- Still pending: DESIGN.md "Belief" line → new headline; Amazon one-page plan; GSC indexing (Colombia, /journal, posts).

## 2026-10-09 (evening) — owner picks + state for the next session
- LIVE: version baea774b-106e-437e-9bc1-a4290fa2004d (Fuji plate vertical 富士山 title, no frame, 山頂 label; summit thumbs show bags; phone hand-chapter text fixed + full-bleed photos; leaf layer sways). Commit 2ddbf52. Rollback to the pre-swap site: 6588359a…@100%.
- HEADLINE — LIVE in version d8785f10-1442-42fc-aaa4-e019c2926267 (owner 2026-10-09): JA hero line 「有機も、味も。妥協しない。」 (replaces 「オーガニックのまま、スペシャルティ。」); EN stays "Organic. And actually specialty."; subline 「認証は、有機JAS。評価は、スペシャルティ。」. Past lines inventory: research-outputs/2026-10-09-snobi-headlines/past-lines.md. Update DESIGN.md "Belief" line to match.
- TRADEMARK (owner: "We have a PC, recommend fastest path"): fastest = Toreru files electronically (Brand Registry applicable ≈day 29–31, ≈¥49k); self-electronic on the PC ≈day 31–38 (needs 商業登記電子証明書 file type + インターネット出願ソフト + 申請人利用登録). Amazon brand string must be `SNOBI`. Report: research-outputs/2026-10-09-trademark-registry/report.md. Vault: brain/Handoffs/premium-line/trademark.md, brain/Handoffs/tokyo-coffee/trademarks.md (HIGH: 6580020 ¥51,600 due 2027-06-29 on Jefe calendar; no US/EU filing; US Reg. 7546460 「THE TOKYO COFFEE」 conflict; pending JP 商願2026-045619 TOKYO COFFEE 35/41/43).
- AMAZON research done (01-economics, 02-market, 03-listing-brand-marketing + listings-ja.md in research-outputs/2026-10-09-snobi-amazon/): NEXT = one synthesis plan page.
- Other NEXT: GSC indexing requests for Colombia, /journal, posts; recheck sitemap "Couldn't fetch"; Bing WMT (owner sign-in); launch kit sends (owner); purchasing-team confirmation for the permission emails; wholesale terms (owner).

## 2026-10-09 (later) — galleries, ¥3,000 fix, new /trade, Amazon research started
- LIVE version 7fbad872-dfe1-402a-b552-4b9c2f902430 (rollback to old site: 6588359a…@100%). Commits 98fd8a5, 070800d.
- Origin pages: `components/v3/pages/origin-gallery.tsx` — 6 photos (hero, beans, cup, brew, table, waist; studio packshot left out: small off-centre bag); "passed by hand" stays in the bag section; the cup+beans pair section removed. ProductGroup JSON-LD lists all 6 images.
- `content/legal.ts`: 「3,000円以下」→「3,000円未満」 (matches free shipping from ¥3,000).
- /trade rebuilt in the site design from `content/trade.ts` (research `research-outputs/2026-10-09-snobi-trade/trade-page.md`: LIGHT UP, ONIBUS, Kurasu, La Cabra, Onyx + TC wholesale facts). Founding-25 offer removed from /trade, /en/trade, the old EN landing CTA + FAQ, /faq answer, contact hint, v2 data. /v2/* and /lab/* now 308 to real routes. Old app/(ja)/trade deleted.
- Amazon research: part 1 economics DONE (01-economics.md: 200g bags profitable at site price — Peru 26%, Mexico 23%, Colombia 19%, Ethiopia 16% after 10% ads; 100g not viable; Peru/Ethiopia freshness window too short for FBA unless ~1 sale/day → FBM; blockers: Peru back-label misprint, no trademark → no Brand Registry/Vine/A+, measure bag dims). Part 2 market DONE (02-market.md, competitors.csv 43 rows, amazon-keywords.csv 110: SNöBI is priciest organic (1.7–3.5× median ¥723/100g) but the only organic/Peru Geisha; month-6 estimate 41–150 units/mo with ads+Vine, 6–38 without; decaf+organic carry demand; overlap with TC's own listings and ODE decaf). Part 3 DONE (03-listing-brand-marketing.md + listings-ja.md: brand field must be SNOBI to match the trademark; titles ≤75 chars since 2026-07-27; blockers trademark, JAN barcodes, Peru label reprint, decaf lot; ads lead with Mexico decaf, bids ¥40–50, cap ≈¥45k/mo; 8-week checklist from 16 Nov; 10 owner decisions §7). NEXT STEP: synthesis + Amazon plan page.
- (was) Amazon SNöBI research running (3 agents) → `research-outputs/2026-10-09-snobi-amazon/` (01-economics, 02-market, 03-listing-brand-marketing). Synthesis + plan page to follow.
- Handoff saved: `brain/Handoffs/premium-line/_index.md` "Current state … 2026-10-09" with open items A–M.

## 2026-10-09 — LIVE: the Daylight site is snobi.jp + SEO day (owner: "do everything now… swap it out… 15 articles by Sunday")
- PRODUCTION: Worker version 8c3042ff-f06b-4827-92fe-f2d94f6c9c89 at 100%. Rollback: `npx wrangler versions deploy 6588359a-e5ad-46ab-8002-68db857109ac@100% --yes` (the old live site). Commit 4a396cd on claude/v2-pages (local, not pushed; design/ and .claude/ left uncommitted).
- VERIFIED on snobi.jp: 19 routes 200, each with its own canonical, no robots meta, JSON-LD (Org+WebSite everywhere; ProductGroup with live price/stock on origins; FAQPage; Article+Breadcrumb on posts); sitemap 36 URLs; www→apex and /v3/*→/* 308; live stock on buy buttons.
- What changed: app/(ja)/(site) = the v3 pages (v3 folder removed; live home + live origin route removed); lib/seo.tsx (pageMeta + JSON-LD builders); content/journal (types, 15 posts, generated index via scripts/journal-index.py); app/sitemap.ts rebuilt; document.tsx no default canonical; hero film hero-960.mp4 (0.7 MB) / hero-1600.mp4 (2.2 MB) + hero-poster.webp; IndexNow key public/4e46070eb7f782e017dfdb667f5239fc.txt + scripts/indexnow.py (needs a UA — Cloudflare 403s Python-urllib); cart attributes ref_host/utm_source.
- Google Search Console: Domain property snobi.jp verified (DNS TXT via Cloudflare API), sitemap submitted (shows "Couldn't fetch" — new-property lag; Googlebot/curl get 200 — re-check), Googlebot live test OK (so Cloudflare does not block Google), indexing requested: /, /coffee, /origins/peru, /origins/mexico-chiapas-decaf, /origins/ethiopia-guji (Colombia unsure). IndexNow: 202, 36 URLs.
- NOT done / needs owner: Bing Webmaster (Microsoft sign-in), Cloudflare dashboard (token can't read bot settings; Googlebot fetch proven OK), tokyocoffee.jp links (docs/launch-kit/tc-links.md — owner asked "where?"), launch kit sends (docs/launch-kit/), trademark filing, GSC requests for Colombia/journal/posts tomorrow (daily limit).
- Flags from the writers/launch kit (owner): TC sells its own organic Chirinos Geisha at ¥2,150/100g vs SNöBI ¥2,560; legal.ts 「3,000円以下」 vs ordering 「¥3,000以上で送料無料」 at exactly ¥3,000; Peru back label shows certifier Leafearth (JASCERT since 2026-07); decaf lot may change in Oct (健友) — articles describe GRAPOS lot; Ethiopia/Mexico 80+ score not documented in the vault (home line was owner-approved via Davy Q3); trademark evidence: capture the old live version (6588359a preview URL) showing plain "Snobi".

## 2026-10-08 (late night) — SEO + AEO deep dive done → plan v2
- **Owner correction 2026-10-08:** organic long tails are the core — snobi.jp targets every organic long tail AND the organic heads (all KD 7–21); my earlier "TC keeps organic" split is withdrawn. Plan §2 line 1, §3a (organic keywords per page), K1, titles now organic-first. Data: `data/organic-longtail.csv`.
- Plan (single source): `brain/Handoffs/premium-line/seo-aeo-plan.md` — keyword map, wording/design rules, task list T1–T54, owner decisions K1–K10. Evidence: `research-outputs/2026-10-08-snobi-seo-aeo/` (01–05 + keywords.csv).
- Cutover blockers for v3 (from the audit, T10–T20): per-page canonical (document.tsx:32-35 default points every page at home), no JSON-LD in v3, /v2 + /v3 links, sitemap, hero film 6.4 MB + JP fonts 2.9–4.8 MB/page.
- P0 this week: Cloudflare AI-crawler setting, GSC Domain property + sitemap, Bing WMT, IndexNow, live title/brand fix, ref_host attribution, TC→snobi.jp link decision, SCAJ Oct 14–17 visit.

## 2026-10-08 (late night) — Story S1–S4 BUILT (owner: "go with those for 1-4")
- S1 walk = `components/v3/sticky-photos.tsx` (shared; HandChapter now uses it, same DOM) with 054 → 021 → 041 → 114, storyJa in steps 1 and 4, caption 「焙煎所の中」 DRAFT. S2 SLOT removed. S3 BuyBar on /v3/about, /v3/faq, /v3/journal, /v3/journal/roastery (shows after the page's first section). S4 JAS = photo 161 beside the numbers as rows; second trio removed; `#jas` anchor added (home already linked to it).
- Preview VERSION (not deployed): https://ef99d4dd-snobi-site.rogutore.workers.dev/v3/about — all checked routes 200 with live stock; first-ever request to /v3 returned 500 once then 200 (INFERRED cold start; re-check next upload). 1440 + 390 measured (no overflow).
- Trademark research done → `brain/Handoffs/premium-line/trademark.md`. SEO/AEO deep dive running → `research-outputs/2026-10-08-snobi-seo-aeo/`.

### (earlier) Story page review → proposals
- /v3/about already has the 5 agreed chapters (Statement, Story, Road Ahead, Tokyo Coffee lineage, JAS) + the dark roast band + sign-off. Reviewed at 1440 (built-in browser).
- Proposals sent: S1 chapter 02's 5-photo grid → a sticky "walk in" chapter like home's HandChapter (054 roofs → 021 building → 041 doorway → 187 roasters; existing captions + storyJa, no new copy). S2 lineage: remove the visible SLOT box until the owner gives the founding story; keep only 「2020年9月、東久留米に最初の焙煎所カフェ。」. S3 home's buy bar on Story/Journal/FAQ (DESIGN.md: plum buy on screen at every depth of brand pages). S4 JAS: photo 161 (sack with the JAS mark) large beside the three numbers; drop the second trio so the page doesn't repeat the same 3-photo grid twice. JAS number on the page still needs owner OK.
- Emails: ON HOLD until the purchasing team confirms (owner 2026-10-08). Old Drive draft trashed; team copy in Drive `RTU/premium-line/`.

## 2026-10-08 (late night) — photo-permission emails redone along the real supply chain
- Owner: ask our supplier and their chain, not companies we don't buy from. Order mail (info@tokyocoffee.jp) + Drive invoices show our vendors: Peru 坂ノ途中/海ノ向こう, Ethiopia 小川珈琲, Colombia コーヒー流通センター (not 双日食料), Mexico decaf オリジンコーヒートレーダーズ (健友交易 from Oct). No Sucafina purchase ever.
- `docs/permission-emails.md` rewritten: §1 chain table (single place; `origins-research.md` supply map now points there), vendor emails first, importer/origin emails after the vendor's OK, Sucafina separately (permission for the Tesfaye portrait + "can we buy from you").
- Open for owner: take `/producers/tesfaye.jpg` (Sucafina's) off live snobi.jp; decaf stays on OCT/GRAPOS or switches to the 健友 lot; sender name(s); Drive folder `RTU/premium-line/origin-media/`; the stale Drive copy of the old drafts. SNöBI Colombia must be roasted from コーヒー流通センター 7005A stock, not むそう.

## 2026-10-08 (late night, after deploy) — Coffee + origin pages up to the home standard (owner "go")
- Leaf light (Komorebi) moved into `app/(ja)/v3/layout.tsx` → on all 13 /v3 routes, once each (removed from home + contact). Story band copy lifted to z 36 + text-shadow (`story.css`).
- Origin pages: follow-along product bar inside `components/v3/pages/origins-buy.tsx` (shows once the buy box is above the screen; same size state as the box; price; カートへ; あと¥X で送料無料 from cart.subtotal vs FREE_SHIPPING_YEN). Stock/price rule now in `lib/shopify/stock.ts` (canBuy / livePrice / buyLabel) — older surfaces still inline it (TODO in that file).
- New section 「富士山で測る」 on each origin page: `components/v3/fuji-mini.tsx` (small still plate in the home plate's inks; farm line/band, Skytree 634m to scale, 3 stats). Numbers from `compare()` in `content/altitude.ts`, which now also returns `goLeft` (m to the Subaru Line 5th station). Home Fuji section got `id="fuji"` for the panel's link.
- 「ほかの産地」 cards use the dappled hero frames. Phones: PREVIEW tag moved top-right (it covered the bars).
- Local dev note: `.env.local` holds a redacted Storefront token (`[SENSITIVE]`), so dev always shows 在庫確認中; Worker previews have the real one.
- Preview VERSION (not deployed): https://55f46989-snobi-site.rogutore.workers.dev/v3/origins/peru — all 13 routes 200; origin pages live stock (bar: カートへ¥2,560, enabled); fonts wf-active; snobi.jp/v3 404, snobi.jp/ 200. Checked 1512 + 390 (no overflow). New copy DRAFT: 「同じ縮尺で、富士山と東京スカイツリーに並べました。」

## 2026-10-08 (late night) — PRODUCTION DEPLOY: live copy fixes (owner "Yes")
- Owner: yes to fixing the live schedule, plus: "because SNöBI beans can do with aging, we will ship out anywhere from day of roasting to two weeks from roasting". Added to `content/ordering.ts` (one source → home, cart, origin pages, FAQ, legal, contact).
- Built from the live base 5d85104 in a clean worktree with ONLY the copy files (ordering.ts, products.ts, sections/cart/origin-page/buy-card.tsx, actions.ts, globals.css .enjoy-within) — no /v2 /v3 routes. Commit `dd4d0cb` on branch `claude/live-copy-fixes` (local, not pushed).
- Deployed Worker version 6588359a-e5ad-46ab-8002-68db857109ac at 100% (previous production: 7443aa26-7aad-418c-aae1-77126811822c — roll back with `npx wrangler versions deploy 7443aa26-7aad-418c-aae1-77126811822c@100%`).
- VERIFIED on snobi.jp: エイジング line ×4, 当日正午 ×4, 前日正午/翌営業日/焙煎日は袋に = 0, カートに入れる ×4 (live stock), /origins/peru, /trade, /en, sitemap, robots 200; www→308; /v3 404.

## 2026-10-08 (night) — Contact + on-site 特商法
- `/v3/contact` (after Daylight's support hub: welcome line, 4 channels — mail/phone with copy buttons, form, trade — FAQ answers first, returns, company) and `/v3/legal` (特定商取引法に基づく表記 on snobi.jp, not a link). Data: `content/legal.ts` (verbatim from tokyocoffee.jp/pages/policy, read 2026-10-08; adjusted rows flagged: サイト, お支払い方法 & 返品 (subscription clauses removed), 引渡し時期 (SNöBI schedule from ordering.ts), 普及→復旧; 代引き手数料324円 to confirm).
- v3 footer: お問い合わせ → /v3/contact, 特商法 → /v3/legal, plus 発売案内 form.
- Preview: https://a4ef350f-snobi-site.rogutore.workers.dev/v3/contact (not deployed).

## 2026-10-08 (night, later) — two world-class improvements on home
- 木漏れ日: `components/v3/komorebi.tsx` + `public/v3/komorebi.webp` (made by `scripts/make-komorebi.py` from frame 146's wall shadow): fixed multiply layer, opacity .2 (.16 phones), sway + drift + slight scroll shift; reduced motion = still.
- Buy bar: `components/v3/buy-bar.tsx`: appears after hero, hides over the Fuji climb and #releases; 4 table-frame thumbs (tap = add 100g), ¥1,410〜, live "あと¥X で送料無料" from cart subtotal (CartContext now exposes `subtotal`) vs FREE_SHIPPING_YEN.
- Preview: https://8c647223-snobi-site.rogutore.workers.dev/v3 (not deployed).
- Owner 2026-10-08: light "slightly easier" → opacity .2→.172 (phones .16→.138); white text lifted above the layer (z 36) + soft text-shadow. Preview: https://4a1a9bd1-snobi-site.rogutore.workers.dev/v3

## 2026-10-08 (night) — "Combine. Surprise me." → 富士登山
- Home section 4 = `components/v3/fuji-climb.tsx` (+ v3.css "富士登山" block): sticky stage, native scroll climbs 0→3,776 m; 1823-plate look (framed, hand-tinted, engraved hachures, cartouche 富士登山, numbered farms, towers to scale); boar climbs a switchback trail; 金剛杖 at right on the same vertical scale, stamps burn in (ジュッ + smoke) as the boar passes メ 1,400 / コ 1,700 / ペ 1,731 / エ 2,000 (+五合目, 頂); live altimeter + captions; card per stamp with buy; summit = sunrise glow + "4つ全部カートに入れる" (cart `add` now accepts an array; `lib/shopify/actions.ts addLine(string|string[])`).
- Gotcha: Tailwind's `.outline` utility drew a box around the SVG path → class renamed `fuji-edge`. Built-in browser pane glitched (blank/tiny); verified in Playwright (own tab, closed; screenshots land in ~/saasy/YORO — moved out).
- Preview: https://a2bc3d8e-snobi-site.rogutore.workers.dev/v3 (not deployed).

## 2026-10-08 (late) — Fuji: 3 directions page
- Owner: Fuji "interesting… but needs more work"; wants 3 top-notch directions modeled on things that work (beautiful / cute / poppy).
- Page: https://claude.ai/artifact/NvAw7KbUqhsSEfxLe8QYkU (source `artifacts/fuji-directions/`): (1) 高さくらべ plate after Darton & Gardner 1823 (public domain); (2) 焼印 — Fuji 金剛杖 branding tradition (recommended); (3) 登る — neal.fun "The Deep Sea" inverted. Concept frames only; awaiting pick.

## 2026-10-08 (later) — v3 = Mockup D everywhere; home option A + Fuji
- Owner: restore Mockup D home (LP version rejected); section 4 → "something fun" → picked **Fuji altitude** ("super high quality", code not image-gen). Built: `components/v3/fuji.tsx` (to-scale vertical, engraved hachures, snow streaks, rising markers, card with computed 富士山%/スカイツリー本数, buy) + `content/altitude.ts` (sources: GSI 3,776 / スバルライン五合目 2,305 / Skytree 634 / Tower 333).
- Home now: film → **HandChapter (option A)** → strip → **Fuji** → releases (freshness + size + add) → roastery band. TableChapter + origins list no longer used.
- Agents ported Mockup D pages to /v3 (brief `design/plan/V3-PORT-BRIEF.md`): coffee, origins + [slug], about (5 chapters), faq, journal + roastery. Their DRAFT copy: origin MORE_FACTS lines, captions, journal titles; About shows JAS number (owner Q pending).
- Preview: https://119bcda7-snobi-site.rogutore.workers.dev/v3 — all 12 routes 200; snobi.jp/v3 404.
- Open: permission emails (owner asked to see them 2026-10-08); cart drawer heading weight 700 (live component); /v2/trade until trade decided.

## 2026-10-08 — Davy's notes applied; home rethought (preview only)
- Davy's fixes + open questions: `docs/davy-notes-2026-10-08.md` (schedule changed to 火・金 焙煎・発送, 当日正午締切, 本州翌日; all 浅煎り; freshness lines; ordering copy single-sourced in `content/ordering.ts`).
- Owner: top page repetitive; table chapter "sucks". New v3 home = hero → shop (only place the four appear: notes, freshness, chips, taste bars 仮, size, add, 産地について詳しく) → Organic/Specialty explained (JAS sack photo; 80-point scale) → ordering week strip → roastery band → trade line. Removed: table chapter, origins-number list, photo strip, releases duplicate. New `/v3/specialty`.
- Preview VERSION: https://6d76a045-snobi-site.rogutore.workers.dev/v3 (+ /v3/specialty). Live snobi.jp unchanged (still shows the old schedule).
- Build gotcha: macOS creates "* 2.*" duplicates in .next (sync); `rtk proxy find .next -name '* 2.*' -delete` before tsc/build.

## 2026-10-07 — owner: v2 drifted; Mockup D home is the base → v3 preview
- Owner: "You are drifting too far from the original mandate, design, and benchmarks. The daylight version main page is much better, except for the 3d and the screenshot [belt map]. Replace those parts and improve. Then adjust the other pages." Memory updated.
- v3 = Mockup D home ported 1:1 into Next.js with real fonts: hero film (stills film, kept), **table chapter** replacing 3D (frames 025/022/024/023 same table/light, bag changes in place on scroll; same copy stations; final station 037 lineup with labels + add to cart; phones get a 2×2 buy grid), strip (130/121/149), **four origins as numbers** replacing the belt map, releases with photo switch (default dapple).
- Files: `app/(ja)/v3/{layout,page}.tsx`, `components/v3/{table-chapter,releases,shell}.tsx + v3.css`, `public/v3/hero.{mp4,jpg}`. Nav still points at /v2 pages until they're re-done in Mockup D style.
- Preview VERSION (not deployed): https://d3430a64-snobi-site.rogutore.workers.dev/v3 — 200, live stock (4× カートに入れる), snobi.jp/v3 404. 375px no overflow; console clean.
- Next: owner reviews v3 home; then port Mockup D's other pages (coffee, origins, origin-*, story → agreed 5 chapters, journal, faq, trade) the same way.

## 2026-10-06 ~23:30 — v2 pages built as a PREVIEW (nothing overwritten)
- Owner: "Show me but don't overwrite what we have now." Built the plan under `/v2/*` on branch `claude/v2-pages` (uncommitted; carries the earlier uncommitted lab/docs work). Live `/`, `/origins/*`, Mockup D untouched; snobi.jp/v2 = 404 (production not deployed).
- Preview Worker VERSION (not deployed): https://88a9ee73-snobi-site.rogutore.workers.dev/v2 (version 88a9ee73-ebdd-49f0-a711-def5883d95bb). All 9 routes 200, noindex, live stock + real cart, Adobe fonts wf-active (VERIFIED).
- Files: `app/(ja)/v2/**`, `components/v2/{shell,photo,buy}.tsx + v2.css`, `content/v2.ts` (frames, captions DRAFT, live copy refs), `scripts/export-v2-photos.py` → `public/v2/photos/` (54 frames, 7 MB). `.claude/launch.json` (dev on :3127).
- QA: tsc + eslint clean; 375px no horizontal overflow on all pages (fixed escaping absolute radio inputs); console clean. Local dev can't read stock (same on the live home in dev) — preview Worker can.
- Open: placeholders marked 確認中/準備中 (roast level Col/Mex, brew recipes, trade terms, producer photos, lineage story, JAS rules). Owner's 8 questions in the plan artifact.

## 2026-10-06 ~22:30 — page plan v1 sent (video parked, map rejected, Story = agreed About)
- Owner: animatic "not good enough", pass; move on without video; belt map "stinks"; Story not as agreed; all pages need better images + storytelling. Memory: snobi-revamp-2026-10-06.
- Research: `design/plan/{COPY-INVENTORY,PHOTO-INVENTORY,INNER-PAGE-PATTERNS}.md` (+ sheets/, refs/).
- Plan artifact: https://claude.ai/artifact/XMm96tVcNrXb1ar9KSA6Sq (source `artifacts/page-plan/`, thumbs from originals). Per page: job, sections, exact frames, copy source (LIVE/FACT/NEEDS YOU), 8 owner questions, build order (shell+Home → Origin×4+Coffee → Story → FAQ/Trade/Origins → Journal).
- Next: owner reads the plan + answers; then build step 1 on a preview Worker with real fonts.

## 2026-10-06 ~21:10 — owner: "Drop 3d."; four-arrive animatic v1
- 3D bag is OUT (owner). Home signature = footage: clip 6586 four bags arrive on the oak table. DESIGN.md updated (signature move, motion, imagery, a11y).
- Animatic v1 (proxy 1080p, 14.0 s, 6 beats 2.0/3.14/2.4/2.2/2.34/3.6 s, 10-frame dissolves, optical-flow 50% on the set-downs, slow push-in 1.06, per-shot stabilisation with border back-off; jerk median 0.176): `artifacts/footage/four-arrive-animatic-v1.mp4` (+ cut.py, stabilise.py, shots.json). Known: the camera reframes between Peru-alone and Mexico (visible shift in the dissolve); final conform from 4K originals allows a stronger lock.
- Owner asked "video session or you?" — answer: I cut the web version (the page decides the edit); the video session conforms from 4K + sound + social cuts (needs owner OK to brief it).

## 2026-10-06 (evening) — gates 1–3 done (NOT committed)
- Gates 1–2: `design/REFERENCES.md`, `design/deconstruct/{daylight,oryzo,kettl,RULES}.md`, captures in `design/refs/` (src/ gitignored).
- Gate 3: repo `DESIGN.md` (mode A). Source = `app/globals.css` `@theme` (new: paper-2, line, `--text-step-*` Utopia scale, `--text-display` 44→80, gutter 16→40, section 64→96, chapter 50/65/80svh, radius-media 4px, shadow-drawer, ease/durations) + `.t-*` type roles. Generated by `scripts/design-md-sync.py` (`--check`), clamps by `scripts/type-scale.py`, focus contrast by `scripts/contrast.py`. Lint: 0 errors, 0 contrast warnings, 3 orphan (non-text). `next build` + tsc pass. CLAUDE.md imports @DESIGN.md; AGENTS.md names it.
- VERIFIED from kit JS: Shuei Gin 400/500/600 only → JP headings 600 (never 700). Moret 400/600/700, Maiola 400/700.
- P14 critique applied (JP hero role, weight on object not scroll, buy-on-dark exception, font-size baseline 103 may only shrink, still-first WebGL).
- OPEN for owner: Home has two openers (film + bag) — recommend film → Story roast band, Home opens on the bag.
- Next: port Mockup D into Next.js page by page on a preview Worker (real fonts), starting with Home.

## 2026-10-06 ~18:30 JST — brief approved; Mockup D v7
- Owner answered the brief: roast date is NOT a selling point (off the homepage, never a headline); "calm, tactile" confirmed; targets "15 in first month. 100 in 3 months. weekly" (design/BRIEF.md row A). Owner said "go".
- Mockup D v7 published (same link): real `snobi.svg` boar + `snobi_font1.svg` wordmark in header and footer on every page; the 焙煎日は袋に scroll beat, footer line, origin-page headline, story caption and journal title removed (`g3.js` WIN now 4 windows). Script: scratchpad `mockd_logo_rd.py`. Fonts are still Google stand-ins in the artifact.
- Next: gate 3 — repo `DESIGN.md` + type scale with the real Adobe fonts, then port Mockup D into Next.js page by page (high effort for design, medium for porting). Footage review DONE: `docs/footage-uses-2026-10-06.md` (+ full JSON). Peru back label misprint VERIFIED (values shifted one row, barcode 0000000000000) — owner matter, front labels only. Gates 1–2 (refs + deconstruct of Daylight/Oryzo/Kettl) running in a background agent → design/REFERENCES.md, design/deconstruct/. Owner put the Mac to sleep ~19:00 JST 2026-10-06 while it ran: on wake, check whether design/REFERENCES.md, design/deconstruct/{daylight,oryzo,kettl,RULES}.md and design/refs/*/ exist and are complete; redo only what is missing (brief = website-pipeline gates 1–2 + reference-deconstruction.md; Playwright in its OWN tab). Then gate 3. STATUS at sleep: the agent stalled (no progress 600 s). Captures exist for all three (daylight desktop/mobile/product/scroll; kettl + scroll; oryzo motion 12 + scroll 7). NOT written: design/REFERENCES.md and every design/deconstruct/*.md — the measuring and writing step is still to do.

## 2026-10-06 — before compaction (owner at 96% context)
- RUNNING: footage review workflow `wf_f34bfc44-30b` (26 clips → verify → 3 concept lenses → 2 judges → ranked uses). Journal: `~/.claude/projects/-Users-kishimakoto-Documents-RTU-snobi-site/bda20846-725b-4c91-b07f-e95761ed867d/subagents/workflows/wf_f34bfc44-30b/journal.jsonl`; per-clip probes in the session scratchpad `footage/<clip>/`. Resume with Workflow({scriptPath: …/workflows/scripts/snobi-footage-review-wf_f34bfc44-30b.js, resumeFromRunId: "wf_f34bfc44-30b"}).
- Mockup D known defects (owner asked 2026-10-06): fonts are Google stand-ins (Fraunces for Moret, Zen Kaku Gothic New for both Maiola and 秀英角ゴシック銀; Geist Mono is real; Caveat only in the 3D bag texture) because the artifact sandbox cannot load the Adobe kit. Header boar is a hand-drawn SVG and the header/footer "SNöBI" is Geist Mono text: an imitation of the logo (NEVER list #10). Fix: use the real `public/brand/snobi_font1.svg` (wordmark) and `snobi.svg` (boar), and get real fonts by porting into the Next.js app (kit `xkh1hrz`, JS loader) or a Cloudflare preview.
- Next: (1) deliver the footage ranking; (2) swap in the real logo SVGs in Mockup D; (3) owner OK on the gate 0–3 plan (design/BRIEF.md) → DESIGN.md + type scale → port Mockup D into Next.js with real fonts.

## 2026-10-06 — Mockup D sources moved into the repo; photo switch; consent
- The old session scratchpad was wiped. Mockup D was recovered from the published artifact into `artifacts/mockup-d/` (git-ignored, on disk): all pages, `g3.js` (3D), `site.css/js`, every image and `img/hero.mp4`. `gen_site.py` is gone; edit the HTML directly. Local preview: `cd artifacts/mockup-d && python3 -m http.server 8790` → `preview-index.html`. Publish with `url` = the artifact link, `file_path` = `artifacts/mockup-d/index.html` (body-only file; the service adds the skeleton).
- v6: a 写真 switch above the releases row (home + coffee page) flips every bag photo between 8 shoot sets: studio, dapple, table, close, hand, waist, cup, pour (`_src/export_bag_sets.py` made table/waist/close from the originals). Default dapple.
- Owner 2026-10-06: consent is covered for everyone in the 2026-10-01 shoot (photos + video).
- Roast-day video: 26 graded 1080p proxies at `~/Documents/RTU/video/snobi-spot/grade/proxies/` (owned by the video session). Review + use proposals: see the footage section below once written.

## 2026-10-05 ~09:10 JST — Mockup D v5: hero film + real-time 3D
- Same artifact (https://claude.ai/artifact/E21PdSb4qp3zwaDKJRUB2A), version 5.
- Hero film: 22 s 1080p MP4 built only from the 2026-10-01 shoot (no faces) by scratchpad `hero_film.py` → `scratchpad/film/snobi-hero-1920x1080.mp4` (6.7 MB). Autoplays muted as the home hero.
- Real-time 3D (`scratchpad/site/g3.js`, three.js 0.169 from jsDelivr): pouch modelled in code, textured from the real label art + brand SVGs (back label with roast-date stamp), sunlight through an animated leaf "cookie", beans with simple physics that pile up, lineup of all four bags with projected labels and add-to-cart; origin pages get a drag-to-rotate bag. Fallback image if WebGL/CDN fails (9 s timer).
- Not verified inside the claude.ai viewer (the built-in browser is not signed in); verified locally in headless Chromium.
- Next: a photogrammetry scan or turntable shoot of the real bag; real origin terrain (needs the owner's OK to download DEM tiles); port g3 into the Next.js repo.

## 2026-10-05 ~05:30 JST — Owner picked a direction: Daylight × Oryzo × Kettl
- Owner: "daylight oryzo kettl — those were the best, or combine concepts." Built in 20 min as a MULTI-PAGE mockup (Mockup D): home with the bag as a weighted 3D object in daylight (scroll tilt, velocity bounce, mouse inertia, bag picker), coffee-belt map with routes to Tokyo (Kettl's origin map, done as a diagram), releases on white; pages: coffee, origins, origin-{peru,ethiopia,colombia,mexico}, story, journal, faq, trade. Generator: scratchpad `gen_site.py` → `scratchpad/site/` (rebuild with `python3 gen_site.py`).
- Next: the two unlocking assets (3D scan of the real bag; real terrain for the four origins) and a decision on who builds (in-house Next.js vs a WebGL studio).

## 2026-10-05 ~05:00 JST — STOP: owner rejected the three mockups
- Owner: "Why are you writing single page websites again?" All three mockups were one-page scrolls; the plan (site-plan D3) is a multi-page site. Do NOT build more one-page mockups.
- Critique + survey of 34 cutting-edge sites + ranked top 10: `docs/design-research-v2.md` (contact sheets `design-research-v2-top10.jpg`, `-runners.jpg`).
- Top of the ranking: The Watch (60fps), Explore Primland, Daylight, Apple AirPods Pro JP, /zeroz (SHIFTBRAIN). Common thread: one real object or one real place in 3D, light ground, buy route always visible.
- Next step is the OWNER's pick of a direction; the two unlocking assets are a 3D scan of the real bag and real terrain data for the four origins.
- Lab photo swap done by a helper: new version preview https://9b8012b5-snobi-site.rogutore.workers.dev/lab/film (not deployed). Still uncommitted on claude/film-lab.

## Cutover to Cloudflare: LIVE (03:06:52 JST)
- Zone `snobi.jp` active (id b98f9a1413c9112c6adf5d9e8bc2a5ed). NS priscilla/sage.ns.cloudflare.com, set at ムームードメイン.
- Worker `snobi-site` (Workers **Paid**) serves `snobi.jp/*` and `www.snobi.jp/*`. A records (Vercel IPs) proxied.
- Verified from the edge AND from this Mac (DNS now resolves 172.67.162.104 / 104.21.58.178): 200 `server: cloudflare` (NRT), robots Allow + sitemap, no noindex, www → 308, http → 301, stock 49, sitemap 12. Check script: `bash scratchpad/edge_check.sh`.
- Always Use HTTPS on. Cloudflare Web Analytics on.
- **Browser cart test on real snobi.jp: DONE** (~04:05 JST): add to cart → drawer → レジへ進む opened tokyocoffee.jp checkout with "SNöBI ペルー チリノス ゲイシャ 100g ¥2,560". Nothing entered; the owner does one real order + refund.

## Still to do (cutover)
1. **Owner:** revoke the API token "snobi-zone-setup (revoke after cutover)" (Cloudflare → My Profile → API Tokens → … → 削除), then delete `~/Documents/RTU/_secrets/cloudflare-snobi.env`.
2. **Owner:** one real paid order + refund.
3. Branch state: production deploys from local `claude/cloudflare` (4 commits `1254d6e` `50a981b` `68608fa` `5d85104`, unpushed). GitHub `main` still has the Vercel code. Push/merge is the owner's call. Vercel project kept until 2026-10-19.

## Photos: the Snobi shoot IS delivered (don't wait for it)
- 255 Leica M9 originals (5–8k px): `~/Downloads/Yuto-20261001_TC/` (filed copy at `~/Documents/RTU/photo-originals/Yuto-20261001_TC/` per the Drive review log).
- Curated 2048px web exports: Drive `Tokyo Coffee/Design:Photos/Photos/Snobi/` (43 files) + `Photos/_catalog/manifest.csv` (frame → subject map; people flagged). SKU mains: Colombia 254, Ethiopia 248, Mexico 250, Peru 253; held in hand 046–053.
- Mockup exports (1800/2400px WebP, 78 files, 11.5 MB): `scratchpad/mock/img/`, built by `scratchpad/export_mock_photos.py` (rerun it if the scratchpad is gone).
- Staff faces need the person's OK before marketing use (Photos/README.md). Face-visible frames used in the mockups: `street-above` (C, Tokyo section), `roaster-op-2` (A, journal card). Swap or get consent before production.
- No video / drone footage was delivered. The drone opener still uses the Pixabay clip (illustrative, labelled).

## Three site mockups — PUBLISHED (private artifacts; the owner shares them)
- **A — FILM**: https://claude.ai/artifact/Cm92ZtsfwrXDCzV5n8t4Xp — scroll-scrubbed drone opener (60 frames + poster), sticky process beats (shelves → cooling tray → drop → bag → pour), four full-screen releases with label cutouts, sticky buy rail, working mock cart.
- **B — RELEASE**: https://claude.ai/artifact/DVBSbEVVUDhnDvec24TmUz — editorial catalogue: masthead nav, typographic index with hover/scroll image swap, magazine spreads with specimen tables and outlined ghost type, pinned horizontal roastery strip, contents-list journal, open FAQ rows, colophon footer.
- **C — LIGHT**: https://claude.ai/artifact/3Cj8E6UnzXkJx5Lamk7n6q — Tokyo morning light: full-bleed photo opener with slow parallax, asymmetric place section (street / doorway / rooftop), roast-day calendar (火・金 焙煎, 月・木 正午締切), four-coffee shelf with inline detail panel, quiet lists.
- Sources: `scratchpad/mock/snobi-{film,release,light}.html`; `preview-*.html` wrappers open locally via file:// (frames/poster/cut are symlinked in). Fonts are Google stand-ins (Fraunces≈Moret, Newsreader≈Maiola, Zen Kaku Gothic New≈秀英角ゴシック銀, Geist Mono).
- Copy = live site lines + `content/products.ts` facts only (narrative[0] used on B and C). Journal cards are bracketed placeholders. Mexico tint `#f8e29b` / ink `#64502a` from products.ts.
- Visual QA in a browser: in progress at compaction time (the built-in browser is not signed in to claude.ai; use the local `preview-*.html`).

## Film prototype — BUILT on branch `claude/film-lab` (uncommitted)
- Files: `components/lab/{film-hero.tsx, film-beats.tsx, film-release.tsx, film.module.css}`, `app/(ja)/lab/film/page.tsx` (noindex, not in sitemap). `tsc`, eslint, `npm run cf:build` all pass.
- Preview (Worker **version**, not production): https://1204898f-snobi-site.rogutore.workers.dev/lab/film — hero verified in the browser (Moret, graded frame, paper card). Beats and releases being eyeballed.
- Next: fix anything visual, then commit on `claude/film-lab` (`.gitignore`, `components/lab/`, `app/(ja)/lab/`, `docs/RESUME.md`, `docs/site-plan.md`; NOT `docs/market-driven-shipping-check.md`, which is Codex's). Never deploy the lab to production.

## Other open items
- Permission emails drafted: Drive doc "SNöBI 写真依頼メール（下書き）2026-10-05" in RTU/premium-line. The owner sends them (Sucafina first).
- English/international research runs in the separate TC_Strategy session.
- Origin-page facts pass (Phase 4b) uses vault `product-facts-chapter-one.md` "Origin-page additions" (✅ items only).
- Phase 1 foundations (registry, SKU align SNB-PERGE / SNB-ETHGU, dead code, mark the brief superseded) not started.
