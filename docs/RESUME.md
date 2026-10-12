# RESUME — snobi-site session state (2026-10-05 ~04:25 JST)

Read this first after compaction. Supporting docs:
- `docs/site-plan.md` (decisions D1–D10, §11 migration checklist — now marked live)
- `docs/design-research.md`, `docs/origins-research.md`, `docs/permission-emails.md`
- Owner rules (memory): positioning = live copy ("Organic. And actually specialty." / 「有機も、味も。妥協しない。」 since 2026-10-09, DESIGN.md), never the old brief's "we show our work"; light/neutral art direction; world-class, not "mid"; plan before big builds.

## 2026-10-12 — PR TIMES release: direction changed (PR session; no site code touched)
- The 10-09 draft `docs/launch-kit/pr-times-release.md` (site renewal) is NOT news: owner "is that newsworthy?" — scored 515/1000. Left unchanged; superseded by the proposal below until the owner decides.
- Facts re-checked 2026-10-11: prices and product lines match `products.ts`; all 12 release URLs 200 with own canonical; live JSON-LD prices match (VERIFIED).
- Ten angles + research + five-member council + ranking (`aggregate.py`): `research-outputs/2026-10-11-snobi-pr-angles/` (ideas.md, council/*.json, proposal.md). Winner = data release: 有機JAS green coffee ≈1.4% of imports + 1,000-person label survey + explainer + four-bag set + owner quote, Thu 11/5 10:00. Owner decisions listed in proposal.md §7 (go by 10/16 for the survey).
- Live-site risks found (VERIFIED on snobi.jp 2026-10-12; not fixed here — another session owns site code): Mexico decaf page describes lot 1121 (GRAPOS, オリサバ glacier water) while the contract moved to 健友交易 in October; /about 「世界最高峰の品質」 ×9; /en/origins/ethiopia-guji renders Sucafina's Tesfaye photo (Miguel's on /en/origins/peru). Vault: premium-line `_index.md` items N, O.
- Photos for PR TIMES: originals `~/Downloads/Yuto-20261001_TC/TC_261001_<id>.jpg` (8256×5493, 200 dpi). Spec: ≤10 MB, JPG/PNG/GIF, main ≥1920×1280, OGP 1.91:1 (prtimes.com/magazine). 037 beats 130 as a lineup (Peru's label is hidden in 130). Not exported yet.

## 2026-10-12 — Davy's four changes (owner OK)
- LIVE: version 5934ac10-edcf-42b0-8195-6cb91ca1d76d. verify-site PASS on snobi.jp; IndexNow 9 URLs. Preview vs live compare: 19 pages differ, every difference one of the four below.
  1. /about (text + meta description) and /v2/about: 「2020年9月、東久留米・滝山に、東京コーヒーの最初の焙煎所カフェ。」 (was 「東久留米に最初の焙煎所カフェ」, read as the first in 東久留米; Davy). The 2020年9月 date is UNVERIFIED (Davy: ~7 years ago) — ask Davy.
  2. Shipping rates stay Tokyo Coffee's (same Shopify checkout). New `content/ordering.ts` `shipMethodLine` 「ネコポスで発送します（代金引換のご注文を除く）」 on FAQ (JA/EN), origin pages, gift article — ネコポス takes no COD (INFERRED from shops' notices).
  3. 特商法 代引き手数料 = tokyocoffee.jp's text verbatim (324円、5,000円以上無料; Davy: same as TC). Checkout never adds it (VERIFIED 10-11) → team Q1 (do staff add it at Yamato; ¥330 at 10% tax?).
  4. Order cutoff 14時 (Davy: one deadline with TC, not 正午): `ORDER_CUTOFF` in content/ordering.ts → every page, cart, FAQ, legal, articles, gift table; Tue/Fri unchanged. Open: with stock shipped up to 2 weeks after roasting, ship every weekday like TC? (Davy). Pitch facts sheet updated; PR TIMES session updated its draft; the info@ Gmail draft and the filled CAFEND form still say 正午 (fix before sending).
- Not decided yet (owner saw mocks in design/review-2026-10-12/): phone hero pour vs bag, JP italic fix, hero pause button. Tesfaye photo open.
- From the PR TIMES session (owner decisions, vault brain/Handoffs/premium-line/_index.md N/O): Mexico decaf page still describes lot 1121 (GRAPOS, Orizaba glacier water, 99.9%) while the decaf contract moved to 健友交易 in October (producer UNKNOWN) — 優良誤認 risk if the new lot ships; /about says 「世界最高峰の品質」 ×9 (unprovable superlative); Tesfaye (Sucafina) and Miguel photos rights not cleared, also on /en.

## 2026-10-11 (night) — single-source sweep (no visible change)
- LIVE: version f8c52aa2-d646-4e83-ad76-15ce39e9477b. verify-site PASS on snobi.jp. 18 pages (home, coffee, the 5 origin pages, trade, 10 journal posts) compared against the pre-change live HTML: visible text, JSON-LD and buttons identical (comparer checked against deliberate edits).
- Stock rule: every buy surface (v3 shop/releases/fuji/fuji-climb, v2 buy, commerce buy-card, origin-page JSON-LD) calls `lib/shopify/stock.ts` canBuy/livePrice/buyLabel; the TODO there is closed.
- Journal: posts read prices, ranges, the free-shipping line, the schedule, producer/region/elevation/process/notes and the decaf 「99.9%」 from `content/products.ts` / `content/ordering.ts`; the AJCA 12 g dose and cup maths from `content/journal/brew.ts`; shared readers in `content/journal/facts.ts` (throw on missing data). New: `ordering.ts` `nextDayLine`, `roastShipShort` (orderingSummary/freeShippingLine now derive ¥3,000 from FREE_SHIPPING_YEN); `products.ts` `caffeineCut` (Mexico "99.9%"). The gift claim 「どの組み合わせでも送料無料」 is computed and throws if prices make it false. Gate: all 15 post objects byte-identical before/after (tsc-compiled snapshot). Left as prose (no source field): keep-until lines (焙煎後2ヶ月 etc.), 3,253軒 / 5,636m / 814軒 / 1995年, the gift order-time→ship-day table, `content/v2.ts:26` (99.9%, 5,636m, 3,253), Tue/Fri still in both roastShipShort and orderingSchedule.
- DESIGN.md: kit faces = the trimmed 8 (no JP italic), kit loads after paint, header ホールセール, phone hero poster = the pour (owner to confirm). sync --check OK; lint 0 errors.
- Cart drawer face check: no fake bold, no missing face. 「あなたのカート。」 asks 700 via legacy `.display` and renders the real Shuei 600; left as is (changing `.display` would thin Latin headings elsewhere).
- OPEN (owner yes/no): Tesfaye portrait (Sucafina's, no permission on record) on /origins/ethiopia-guji; phone hero still keep/revert; `.v3 { font-synthesis-style: none; }` for JP italic notes; hero pause/play control (DESIGN.md Motion + WCAG 2.2.2; never existed); reply to 海ノ向こうコーヒー 矢野さん (2026-10-09) on next-season Chirinos quantity.

## 2026-10-11 (late) — speed fixes 2/4/7/8 shipped, launch-kit decisions
- LIVE: version 348a8781-c30e-4084-85d1-11580d6bd913 (verify-site PASS on snobi.jp; IndexNow /). Owner "3. okay but test it extensively".
  - Adobe kit xkh1hrz trimmed in the owner's Adobe login: 8 faces (Maiola 400/700, Shuei 400/600, Moret 400/400i/600/700), font-display swap on all three families. VERIFIED in the served kit JS.
  - Kit loader (`components/commerce/document.tsx`) starts on window load or after 2.5 s. VERIFIED on 15 page types at 1440 and 390: kit requested after the load event, `wf-active` set, no faux bold, no missing face. Pre-existing, not new: JP cup notes in italic get a synthetic oblique (Shuei has no italic). Proposed one-line fix `.v3 { font-synthesis-style: none; }`, awaiting the owner.
  - Home hero (`components/v3/hero-film.tsx`): a still `<img>` is the LCP (phone `hero-pour-m.webp`, 608×1080 crop of the pour at 14.2 s; wide 1600×900 four bags at 21.8 s). The first phone choice (17.0 s) put the headline over the Colombia label; on a phone every bag frame sits in the text band, so the bags now arrive in motion after the pour; the film is attached after load and starts at the still's moment, fades in when playing, loops to 3.2 s (skips the chaff shot), reduced motion = still. Served by `app/api/media/[name]` with byte ranges (static assets on Workers answer Range with 200, which iPhone Safari will not play). VERIFIED: 206 for `0-1`, the tail and open ranges; 416; 404; MP4s are faststart. iPhone/Safari playback itself NOT VERIFIED (Safari access declined; no Xcode). The `muted` attribute is now set as well as the property.
  - Stock cache (`lib/shopify/client.ts`): 60 s per isolate, complete answers only, a fresh copy per request, no shared in-flight promise (a Worker can cancel one request's I/O). Warm TTFB median 344 → 192 ms (/coffee), 298 → 180 ms (/origins/peru).
  - Ethiopia ink #417fa3 → #386e8d (5.09:1 on paper).
  - Lighthouse A/B (mobile, live vs preview): `research-outputs/2026-10-11-snobi-speed/ab-2026-10-11.md`. Real-throttle home LCP 4.3–4.6 s → 2.0 s; /about unchanged; simulated outliers are a font-in-graph artifact.
- Owner decisions recorded: K3 = yes (canonical on TC's four SNöBI pages, team Q9); K7 = claim the Instagram handle + TC highlight (team Q18); EN name "ROGUE TRADE K.K." (also accepts "Rogue Trade Inc."). The 80-point claim is team Q11 with a default: no record by 2026-10-18 → reword to Peru and Colombia only.
- Launch kit: コーヒー豆研究所 email = Gmail draft in info@ (not sent). CAFEND, 号外NET and 立川経済新聞 forms filled in the owner's Chrome, not submitted (号外NET needs 3 photos + 2 consent ticks; 立川 has two ★要確認★ lines). mybest: no open route (form closed; ads only). Retired headline 「オーガニックのまま、スペシャルティ。」 removed from the kit.
- PR TIMES: a separate session was offered to the owner as a task chip ("Finish the SNöBI PR TIMES release").
- linkcheck scan (no registry yet): one real copy, `G_PER_CUP = 12` in three journal posts; not changed.

## 2026-10-11 — the 12-hour push
- LIVE: version 0e67ce6c-3633-4f5a-9ec8-f043c75c48d9. Branch `claude/v2-pages` now PUSHED to GitHub (owner yes; backup only, no merge). History scanned for keys: none.
- `scripts/verify-site.py [base]`: post-deploy check (every sitemap URL: 200, lang, one h1/main, own canonical, no noindex, title/description/og:image, JSON-LD parses incl. ProductGroup variant image/price/shipping; every internal link + image; 404; robots; www one hop). Run on the version preview before promoting and on snobi.jp after. PASS on live.
- Analytics: Cloudflare Web Analytics IS on (beacon token cf7c2e89… injected for browsers; curl without a browser UA doesn't see it). AI crawlers: Googlebot, bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, ClaudeBot, PerplexityBot, Google-Extended, Applebot all get 200 (UA test; CF dashboard AI Crawl Control setting not seen — CF dashboard session expired, owner must sign in).
- 代引き: 特商法 now 「代引き手数料は無料です」 (owner "figure it out"; the 8 COD orders 08-28..10-08 were charged exactly the total; all 8 still PENDING in Shopify → team Q2).
- Journal audit `research-outputs/2026-10-11-journal-audit/report.md`: 2 fixed (gift free-shipping pairs; 「自然の力で」), 26 need people; high: 80+ for all four (only Peru 84.25 / Colombia 82.67 documented), Mexico decaf lot, Leafearth vs JASCERT on bags. `{ read: slug }` block added + 3 links. GSC indexing task stays PAUSED.
- Speed audit `research-outputs/2026-10-11-snobi-speed/report.md` (Lighthouse local; PSI quota 429): pages 3.3–7.7 MB, 62–95 % Adobe fonts; all 13 kit faces load, 5 unused (Shuei 500, Maiola 400i/700i, Moret 600i/700i). Done in code: phones no longer fetch the hidden desktop stage photo; /about lead photo eager+high; buy-bar dots lazy; ShotCycle first photo high priority, other shots after load; sage text → ink-soft; cart aria-label contains "CART n". OPEN (owner): trim the Adobe kit + font-display swap; load kit after paint; hero poster-first on phones; stock cache seconds; Ethiopia ink colour.
- Origin pages: 「◯◯の読みもの」 (3 related posts, derived from post.products). EN pages: share image + offers carry shipping/returns (shared `OFFER_TERMS` in lib/seo.tsx). PR TIMES draft headline updated. DESIGN.md: ホールセール + photo-motion exception.
- Search baseline `brain/Handoffs/seo-geo/reports/2026-10-11-snobi-baseline.md`: snobi.jp 0/16 queries; top recurring domain coffee-labo.co.jp (7/16) = the one email pitch target.
- Team questions: `docs/team-questions-2026-10-11.md` (17).

## 2026-10-10 (night) — four points fixed properly
- LIVE: version f13cadcb-113b-4041-be99-b3d8f6b382c0. Owner: "you left it half fixed" — the hand-off-then-switch effect is removed (sticky-photos.tsx reverted to 7886ef5; `.then` CSS gone). Each point now has its own photo: 01 Organic 161 (JAS sack) · 02 Specialty 006 (roasting, hand at the roaster over the cooling tray; no cupping photo exists) · 03 Whole bean 152 (roasted beans) · 04 Chapter One 030 (four bags on the desk). Sheet: design/four-points-2026-10-10.jpg.

## 2026-10-10 (later) — rotation v2 + Story interim lines
- LIVE: version 28230f83-4670-4523-8890-721b4fc34e57. Owner: v1 "not up to par … switching in order, left to right". v2 (`components/v3/shot-cycle.tsx`): a `ShotRotation` conductor per row changes ONE card at a time, chosen by weighted chance (last-changed card sits out, the one before and the last card's neighbours less likely), every 2.2–3.8 s (/coffee 2.6–4.2 s); the next shot avoids what other visible cards show and the card's last two; image decoded before showing; 1.8 s dissolve over the outgoing photo + 9 s centred drift from 1.06; hovered cards wait; off-screen/hidden tab = no change. Measured over 40 s: order 4 1 3 1 4 2 3 2 4 3 2 4 3 1; after the opening, never two cards on the same shot type. Brew crop 50% (Mexico 126 at 62%) so dripper + bag both show (owner).
- Story (owner: temporary state = idea 2): one line per walk step from content/v2.ts `storyWritingJa` (このページも、いま書いている途中です。/ 物語の主役は、この場所と、ここで働く私たち。/ コーヒーが好きな仲間と、新しい章を始めました。/ 農園の写真と話が届いたら、ここに書き足していきます。). Layout and photos untouched.

## 2026-10-10 — 写真 switch → self-playing sequence
- LIVE: version deee6e6d-def6-46cc-ab66-2fac63c9bb70. Owner clarified: the "gif type thing" was for the 「写真」 switch (光の中・白背景…) on Home and /coffee, not the hero. Both switches removed; each card/row plays hero → beans → cup → brew → hand (`components/v3/shot-cycle.tsx`, frames from content/v2.ts originFrames; 2.6 s per shot, 0.45 s stagger per card, dissolve + 1.1→1 zoom-out; only while on screen; later shots load once started; reduced motion = first shot). `.v3-switch` CSS deleted. The four-points change (Masaki #2, owner yes) stays.
- Courtyard film (~/Downloads/courtyard-film-v01.mp4, 14 s 1080p, AI illustration of the Colombia label art → real brew photo): reviewed, not used on the site. Opinion in the 2026-10-10 reply (product appears at ~11 s; label lettering looks generated — check against the real bag before any use; invented "farmer"; better as a social piece).

## 2026-10-09/10 — Masaki's review round
- LIVE: version d0fdfbbe-2842-46c9-bab6-1ac8c685546d (previous 4a0eb6ed, 0188238d).
- Done from Masaki's list: FAQ ペルー→ペルー・ゲイシャ; 有機/焙煎度/粉 split into 3 QAs; 「ホールセールのページ」 linked; wholesale roast schedule = SNöBI's Tue/Fri noon (one source; TC's weekday-14:00 line removed).
- Owner yes (2, 3): Home four points — each step opens on its hand-off frame (047/049/046/048), holds 0.9 s, then dissolves into its own shot with a 1.14→1 zoom-out: 161 JAS sack · 131 pour · 149 beans in the opened bag · 130 bags together (`StickyPhotos` optional `then`; Story unaffected; replays on every entry; reduced motion = second shot at once). The duplicate 161 inset in step 1 removed. Origin gallery 6 → 4 distinct shots (hero, beans, brew, waist; cup + dark table dropped).
- Owner: 取扱店 → ホールセール (nav, footer, contact, breadcrumb, page title 「ホールセール（業務用・卸）｜…」, FAQ link, form header).
- HOLD (owner): Story page (Masaki: no content — it says "We're writing it."); scheduled task `snobi-gsc-indexing-2026-10-10` DISABLED until Masaki's article fixes. Re-enable with a new fireAt.
- Not approved: hero film change (#1).

## 2026-10-09 (night, last) — wholesale terms, www redirect, COD fee check, Peru Geisha overlap
- LIVE: version 0188238d-25ca-43f5-89a1-a2e688b85326 (previous 9726eadb).
- /trade terms = Tokyo Coffee's (owner: "same deal as tc"): 1kg, 1 bag minimum, weekday 14:00 same-day roast/ship (TC wholesale FAQ), free shipping from ¥3,000 (VERIFIED Shopify "Wholesale" delivery profile; the ¥5,000 on one TC page is wrong), wholesale price shown after account registration. FAQ answers updated. NOTE: SNöBI 1kg SKUs are not in TC's wholesale catalog (its Peru Geisha / Guji 1kg are TC's own lots, owner) — staff must add them for "same deal" to be orderable.
- Shopify Wholesale profile anomaly: zone 800 (Hokkaido/Okinawa) 通常配送 condition is ≤ ¥4,999 while free starts ≥ ¥3,000 (overlap; other zones ≤ ¥2,999). Staff fix.
- www → apex: Cloudflare Single Redirect "WWW からルートにリダイレクト" (host eq www.snobi.jp → concat("https://snobi.jp", path), 301, keep query), deployed in the owner's dashboard. VERIFIED http://www and https://www → https://snobi.jp in 1 hop.
- 代引き手数料 ¥324 (owner: "you do that"): Shopify checkout does NOT add it — COD order #29658 subtotal ¥3,590 = total ¥3,590, no fee line; none of the 8 recent COD orders shows one (VERIFIED Admin read). Whether staff add ¥324 at Yamato is UNKNOWN → ask the shipping staff; if not, remove the line on snobi.jp and tokyocoffee.jp; if yes, it should read ¥330 at 10% tax (INFERRED: 324 = 300 × 1.08). 特商法 text left unchanged until then (over-disclosure is the safe side).
- Peru Geisha overlap (owner: "different products, how do we differentiate?"): TC 「オーガニック ゲイシャ スペシャリティーコーヒー豆 ペルー ゲイシャ」 = same producer (Miguel Esteban Ramírez Agurto, Chirinos), City Roast 中浅煎り, cup 84.25, ¥2,150/100g, ¥4,000/200g, 400g + grind options. SNöBI = 浅煎り, whole bean, ¥2,560/100g. Recommendation given: rename the TC product around its roast; keep SNöBI's name (printed bags, URLs, SEO).

## 2026-10-09 (end of day) — form alerts on, 404, shipping single source
- LIVE: version 9726eadb-6d71-4d35-83be-2fec279744ee (previous df24b333).
- Google Form "Snobi｜業務用サンプル・先行卸のご登録" (owner rogutore@gmail.com): email notifications for new responses ON (owner yes, VERIFIED checkmark). The form is linked to a response sheet.
- Japanese 404 for every unmatched URL: `app/global-not-found.tsx` + `experimental.globalNotFound` (VERIFIED 404 status + page on Workers, /nope and /en/nope).
- Shipping rates now ONE source: `content/ordering.ts` SHIPPING_YEN / SHIPPING_REGIONS / shippingRates(Short); the six hand-typed copies (legal.ts, v2.ts, sections.tsx JA+EN, contact page, cart, journal gift post) read it. Product JSON-LD has one shippingDetails per rate (¥500 ×38 prefectures, ¥700 Kyushu ×7, ¥800 Hokkaido+Okinawa) with the ¥3,000 free threshold. deliveryTime still omitted (ship days/cutoff are prose in orderingSchedule).
- /contact: the "Form" block (old Google Form, 「発売案内」) removed; three ways remain; trade link → /trade#enquiry.
- Scheduled one-time task `snobi-gsc-indexing-2026-10-10` (10:00) requests indexing for the 13 remaining journal URLs via Chrome "Browser 2"; it appends its result line to the end of this file.

## 2026-10-09 (later still) — form verified end to end, Bing live, GSC, merchant-listing fix
- LIVE: version df24b333-4677-48c1-a200-3b1fc2a7244f (previous 7c664189).
- FORM VERIFIED end to end (owner OK): test enquiry 「【テスト】SNöBIフォーム動作確認（削除してください）」 landed in the Google Form's Responses (2 responses total: an older TESTING one + ours), extra fields in ご質問・ご要望. Owner to delete both test rows. The form has NO email alert yet (owner: Responses → ⋮ → Get email notifications) — form owner is rogutore@gmail.com (Chrome "Browser 3").
- Footer 「発売案内を受け取る ↗」 (old Google Form) → 「取扱店のご相談」 → /trade#enquiry (owner yes).
- BING: snobi.jp added + verified (CNAME fabd60f19746b52304839c551fe8d4f9.snobi.jp → verify.bing.com, DNS only, via the Cloudflare API), sitemap submitted ("successfully submitted"); IndexNow re-pinged (200, 36 URLs).
- GSC (Chrome "Browser 2" = info@tokyocoffee.jp owns the property): sitemap resubmitted (old status "Couldn't fetch"; Googlebot gets 200/xml/36 URLs). Colombia already indexed. Indexing requested today: /trade, /journal, /journal/organic-coffee, /journal/organic-specialty, /journal/organic-decaf-light-roast — then "Quota exceeded". NEXT (2026-10-10+): organic-geisha-peru, jas-mark, organic-coffee-gift, mountain-water-decaf, colombia-huila-organic, mexico-chiapas-organic, ethiopia-guji-natural, natural-vs-washed, light-roast-hand-drip, why-geisha-expensive, specialty-80-points, why-not-munoyaku, roastery. In the search box: click it, cmd+a, type, Return, check the URL before clicking REQUEST INDEXING.
- MERCHANT LISTINGS (GSC critical: variant missing "image") fixed in `lib/seo.tsx`: each size variant now carries the 6 images + description; return policy gets returnMethod ReturnByMail + returnFees FreeReturn (特商法: 送料着払い). Still optional/missing: shippingRate + deliveryTime — the regional rates (¥500/700/800) are hand-typed in SIX places (legal.ts, v2.ts, sections.tsx, contact page, cart.tsx, journal organic-coffee-gift); put them in content/ordering.ts first, then add shippingRate.
- Photos/film/brand files now cache 1 day + 7 days stale (`public/_headers`); were revalidated on every visit.
- NOT DONE: Japanese 404 (multiple root layouts → needs experimental `global-not-found`; test with OpenNext first). http://www → apex is 2 hops (CF Always-HTTPS then Next); needs a CF Single Redirect rule (API token has no ruleset permission → owner dashboard).
- DESIGN.md Belief/hero lines now 「有機も、味も。妥協しない。」.

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
