# Codex — snobi.jp audit weekend, then continue (Sat 2026-10-17 → Mon 2026-10-19 09:00 JST)

You are taking over the snobi.jp site for the weekend from the Claude Code "Snobi website" session. **Phase 1 is a full audit (read-only, one report). Phase 2 continues the work: invisible fixes on your own branch, behind gates, plus ready-to-apply proposals for the owner.** Nothing you do goes live.

Read in this order before touching anything:
1. `AGENTS.md`, `DESIGN.md` (binding), `docs/RESUME.md` (top three entries), this file, `docs/codex/CODEX_WORKLOG.md` (resume from the last open item if it has entries).
2. Owner rules outside the repo: `/Users/kishimakoto/.claude/SINGLE_SOURCE.md`, `/Users/kishimakoto/.claude/TYPED_JUDGMENTS.md`, `/Users/kishimakoto/Documents/RTU/CLAUDE.md`.
3. Project state (read-only): `/Users/kishimakoto/Library/CloudStorage/GoogleDrive-rogutore@gmail.com/My Drive/RTU/brain/Handoffs/premium-line/_index.md` (rows A–R) and `…/premium-line/product-facts-chapter-one.md` (the fact source behind `content/products.ts`).

## 0. The site in one paragraph
snobi.jp is SNöBI, Tokyo Coffee's 有機JAS × specialty line (株式会社ローグトレード). Next.js 16 on Cloudflare Workers via OpenNext; Japanese first, `/en` pages in an older design. Four coffees (Peru Chirinos Geisha, Ethiopia Guji Tade GG natural, Colombia Huila El Bombo, Mexico Chiapas GRAPOS decaf), 100 g / 200 g, whole bean. The cart hands off to the tokyocoffee.jp Shopify checkout; live stock and price come from the Storefront API (`lib/shopify/`). Pages: home, /coffee, /origins + 4 origin pages, /about (Story), /journal (15 articles + an essay), /faq, /specialty, /trade (ホールセール), /contact, /legal (特商法), /en/*.

**Live:** Worker version `0290186b-831c-471a-80b1-1a260d53eaa5` (2026-10-15) = commit `0d21686` + the trademark row (branch `tm-snobi-live`, cherry-pick `584cb0d`).
**Preview awaiting the owner:** `20719b59` (https://20719b59-snobi-site.rogutore.workers.dev) = `claude/v2-pages` at `35f3502`: supply-chain photos + the trademark row + stock-rule cleanup. Against live, exactly 8 pages differ (JP+EN Ethiopia, Mexico and Peru origin pages; journal ethiopia-guji-natural, mexico-chiapas-organic).

## 1. Hard rules (no exceptions; the owner decides these, not you)
- **Workspace:** a git worktree, not the main checkout (other Claude sessions work there). `git worktree add ../snobi-site-codex -b codex/audit-weekend-2026-10-17 claude/v2-pages`, then `cp -cR ../snobi-site/node_modules ../snobi-site-codex/` (APFS clone; Turbopack rejects a `node_modules` symlink that leaves the project). Commit on that branch only. Do not push, merge, rebase or touch other branches.
- **Never:** `wrangler versions deploy` or any change to what is live; email or messages; form submissions; Shopify, Cloudflare dashboard, DNS or Google Search Console changes; IndexNow pings; writes to the Drive vault (`brain/`) or anything under `_secrets/`; printing or committing `.env.local` values; downloading packages or files.
- **Allowed:** reading the live site and previews (curl, Playwright, Lighthouse); `npm run cf:build`; `env -u CLOUDFLARE_API_TOKEN -u CLOUDFLARE_ACCOUNT_ID npx wrangler versions upload` (creates a preview URL only; skip it if wrangler is not logged in); scratch files under `/tmp`.
- **Visible changes do not ship.** Anything a visitor would see (text, image, layout, order, colour, alt text that changes meaning) is written as a proposal (§4 Phase 2c), never applied on your branch. On your branch you may only make changes the gates (§3) prove invisible, or fix a defect that is objectively wrong *and* list it for the owner. When unsure, it is a proposal.
- **Copy and facts:** no new copy, taglines or claims. Facts come from `content/products.ts`, `content/ordering.ts`, `content/legal.ts`, the vault product-facts note, or a cited primary source. Mark every claim in your outputs VERIFIED (with the check you ran), INFERRED or UNKNOWN. Never let a model compute a number: scripts compute, you report.
- **Never weaken a check to pass:** do not edit `scripts/verify-site.py`, the gates, `content/origin-media.ts` rules or the DESIGN.md baselines to turn something green. If a check conflicts with an owner decision, stop that item and ask in the worklog.

## 2. Already decided by the owner — do not "fix"
- Headline 「有機も、味も。妥協しない。」 / "Organic. And actually specialty."; proof line 「認証は、有機JAS。評価は、スペシャルティ。」. The roast date is never a selling point and never on the homepage. No cup scores in copy. No 3D. Japanese headings are weight 600. One dark moment (the Story roast band). One fill colour (plum). No pastel or origin-tint fills.
- Order cutoff **14時** (one deadline with Tokyo Coffee, `ORDER_CUTOFF`); roast and ship days Tue/Fri. 特商法 代引き手数料 = tokyocoffee.jp's text verbatim (324円, free from ¥5,000), even though checkout does not add it (team question 1 is open). 「ネコポスで発送します（代金引換のご注文を除く）」.
- Shipping rates are Tokyo Coffee's (same Shopify checkout).
- 「ブランド SNOBI」 as the first facts row on /coffee and every /origins page: trademark use evidence for 「ＳＮＯＢＩ」. Keep until registration. Footer 「© 2026 Snobi · 株式会社ローグトレード」 stays too.
- Supply-chain photos: only `content/origin-media.json`, quotas and rules in DESIGN.md › Imagery. Cropping to display sizes is fine; never text on supplier photos.
- The phone hero still is the pour (14.2 s) and the wide one the four bags (21.8 s); the film loops from 3.2 s. /about's 「2020年9月、東久留米・滝山に、東京コーヒーの最初の焙煎所カフェ。」.
- Mexico decaf is the オリジンコーヒートレーダーズ / GRAPOS lot 1121. The 健友交易 decaf is a different, non-specialty product.

## 3. Gates (use them; a change without its gate's evidence is not done)
| Gate | Command | Proves |
|---|---|---|
| Types + lint | `rm -rf .next/types .next/dev/types; npx tsc --noEmit -p . && npx eslint .` | code compiles; delete duplicated generated types first (macOS creates `* 2.ts` copies) |
| Content snapshot | `scripts/gates/content-snapshot.sh . /tmp/before.json` before, `…/after.json` after, then `cmp` | the 15 journal posts and ordering exports are byte-identical (ignore only export names you added on purpose) |
| Page compare | `python3 scripts/gates/html-compare.py save /tmp/live https://snobi.jp`, then `… compare /tmp/live <preview-or-local-base>` | visible text, JSON-LD and buttons per sitemap page. Self-test once: edit a price in a saved page with `sed …/g` (pages are one long line) and see it reported |
| Site check | `python3 scripts/verify-site.py <base>` | 200s, one h1/main, canonicals, meta, JSON-LD, links, images, 404 (robots and www checks only on snobi.jp) |
| Copy scan | `python3 -I scripts/gates/journal-copies.py .` and `python3 ~/.claude/linkcheck/linkcheck.py scan` | hand-typed copies of source facts (4 justified hits remain in the journal) |
| Speed | Lighthouse 13 with `--throttling-method=devtools` (not simulated: fonts load after paint and the simulator charges them to LCP, giving fake 14–24 s outliers) | real phone LCP; method in `research-outputs/2026-10-11-snobi-speed/ab-2026-10-11.md` |

If you cannot reach Cloudflare, compare a local build instead: `npm run build && npx next start -p 3110`, then `html-compare.py compare /tmp/live http://localhost:3110` (stock may read 在庫確認中 locally because `.env.local` holds a redacted token; treat button-label differences from that as expected and say so).
Traps: in zsh never name a variable `path` (it is tied to PATH); sed without `g` edits only the first match on one-line HTML; Japanese headings at 700 look fine but break DESIGN.md.

## 4. The work
### Phase 1 — Audit (read-only except the report). Write `docs/codex/AUDIT-2026-10-17.md` and commit it on your branch.
Every finding: file:line or URL, severity, claim type (VERIFIED with the command, or INFERRED), what breaks and for whom, a one-line fix, and whether the fix is invisible (you may do it) or visible (proposal).
Severity: **P0** misleads a customer or a regulator (景表法 優良誤認・有利誤認, 薬機法, 特商法, 有機JAS 表示), a wrong price, charge, stock or cart, a leak of a secret or personal data, or a page down. **P1** breaks at first real use. **P2** fragile (a second copy of a value, an untested rule, a missing gate). **P3** polish.

1. **Claims and law.** Check every factual sentence a customer sees on the live site against its source. Known open items, verify and size them, don't decide them:
   - the Mexico page states 「カフェインを抜くのは、メキシコ最高峰オリサバ山（5,636m）の氷河の水。」 flatly (articles say 「商品資料では」);
   - 3,253 members (OCT confirmed 3,253 / 832 women on 2026-10-13, Mercanta says 2,708);
   - 「世界最高峰の品質」 ×9 on /about and its meta;
   - the 80-point claim (only Peru 84.25 and Colombia 82.67 documented; the owner's default is to reword to those two if no record arrives by **2026-10-18**, team question 11);
   - 「2020年9月」 (unverified);
   - 99.9% caffeine;
   - the 有機JAS / オーガニック wording rules, and 有機JAS mark images;
   - 特商法 completeness against tokyocoffee.jp/pages/policy;
   - the JAS certificate number 13OGP-2001 (shown or not; owner decision pending).
2. **Commerce.** Variant ids vs Shopify; `lib/shopify/stock.ts` is the only stock and price rule (confirm no copies remain: `grep -rn availableForSale app components`); the 60 s stock cache; cart → checkout URL; JSON-LD offers vs live price and stock; shipping JSON-LD vs `content/ordering.ts`; add-to-cart at 390 px on a preview (stop at the checkout URL, never open checkout).
3. **Single source.**
   - Run linkcheck and the copy scan.
   - Known leftovers: `content/v2.ts:26` (99.9%, 5,636m, 3,253); Tue/Fri in both `roastShipShort` and `orderingSchedule`; the keep-until lines (焙煎後2ヶ月…); EN copies of JA facts; DESIGN.md's `font-size` literal baseline (103 in `app/globals.css`, may only shrink).
   - Every new copy you find is a finding.
4. **DESIGN.md compliance** at 1440 / 768 / 390×667 / 360.
   - One plum fill on screen at every depth of brand pages; tokens only; JP headings 600; no fake bold or italic (known: JP cup notes in italic get a synthetic oblique — proposal pending); sage text only ≥24 px.
   - Focus ring, 44 px targets, skip link, one h1 and one main, `lang`.
   - Reduced motion. The hero film has **no pause control** (DESIGN.md Motion + WCAG 2.2.2; proposal pending).
5. **Accessibility.** An axe-style pass with Playwright on each template: contrast, names, alt text, landmarks, keyboard order, the cart dialog.
6. **Performance.**
   - Devtools-throttled Lighthouse on /, /coffee, an origin page, /about, a journal post, /trade (live and the 20719b59 preview).
   - Font bytes and timing; image weights (`public/origin-media`, `public/v2/photos`); the hero film route `app/api/media/[name]` (206 ranges).
   - iPhone playback was never verified on a device; say how it could be.
7. **SEO / AEO.** verify-site on live; canonicals and hreflang JA↔EN; sitemap vs routes (are `/v2/*`, `/v3/*`, `/lab/*` reachable, redirected, indexable?); titles and descriptions (length, duplicates); Article / FAQPage / ProductGroup / Organization JSON-LD validity; internal links; images with alt.
8. **Code health.**
   - Dead code and routes (`app/(ja)/v2/*`, `components/v2/*`, `/lab`), unused files (`public/v3/hero-poster-m.webp` untracked).
   - Build warnings, error handling on the Shopify calls, the `/api/media` whitelist, `/api/waitlist`.
   - Headers (`public/_headers`), robots on preview hosts.
   - Secrets in the repo or its history (`git log -p | grep -E 'shpat_|STOREFRONT|token'` style; report, never print a value).
9. **The photo lock.** Do `content/origin-media.ts`'s checks hold? Is each caption supported by what the supplier said (`content/origin-media.json` permission quotes; `docs/permission-emails.md` Replies log)? Are credits shown wherever a supplier photo shows?
10. **Docs truthfulness.** Do RESUME.md's latest three entries, DESIGN.md and `docs/team-questions-2026-10-11.md` match the code and the live site?
11. **The things that are right** and must not be changed (at least five, with why).

Report ≤ 500 lines: the findings table first (severity-sorted), then sections 1–11. Then update the worklog.

### Phase 2 — Continue (after the report is committed), in this order
a. **Invisible P0/P1 fixes**, one commit each, each with its gate evidence pasted into the commit message or the worklog: type errors, a missing guard, an unsafe default, a second copy of a value that breaks nothing visible when replaced. Run the page compare after each: 0 pages may differ unless the fix is a listed defect.
b. **Single-source leftovers** (§4.3) with zero visible change; same gates.
c. **Proposals for the owner** in `docs/codex/PROPOSALS-2026-10-17.md`. Each: old → new (exact Japanese), the source, why, risk, and a ready patch on its own branch `codex/proposal-<slug>` (built, page-compare output attached, never merged). At least:
   - the 80-point reword to Peru and Colombia only (the owner's default for 10-18), across every article and FAQ that says it;
   - attribution for Orizaba and 3,253 on the Mexico page (「商品資料によると…」);
   - removing or proving 「世界最高峰の品質」;
   - the JP italic fix (`.v3 { font-synthesis-style: none; }`);
   - a hero pause/play control (44 px square, bottom right, paper outline; DESIGN.md tokens; a mock is in `design/review-2026-10-12/pause-compare.jpg`);
   - anything P0 from your audit that is visible.
d. **Tests that make the rules stick:** a small `scripts/gates/` check, e.g. a script that fails if any page shows a supplier photo without its credit, or if `availableForSale` appears outside `lib/shopify/`. No new dependencies.
e. **Speed baseline** with devtools throttling, committed under `docs/codex/`.

Stop at Monday 2026-10-19 09:00 JST, or when a–e are done. Anything that needs the owner goes under "Owner questions" in the worklog and you move to the next item; never wait on it, never guess it.

## 5. Owner decisions pending — list them, never act on them
- Deploy the photo preview (20719b59).
- Phone hero still: pour, or the bag frame.
- JP italic fix.
- Hero pause button.
- Mexico Orizaba / 3,253 attribution.
- 「世界最高峰の品質」.
- 2020年9月 (Davy).
- Ship every weekday like TC? (Davy).
- The 80-point reword (default due 10-18).
- 13OGP-2001 on SNöBI pages.
- 小川 photo ① names (鈴木様).
- Peru originals (矢野さん).
- Colombia photos (双日 via コーヒー流通センター, Colsuaves, Sucafina Japan).
- Instagram handle.
- The TC Shopify changes and the team questions (18).
- GSC indexing paused until Masaki's article fixes; the Story page on hold.

## 6. File map
| Area | Files |
|---|---|
| Facts | `content/products.ts`, `content/ordering.ts` (ORDER_CUTOFF, shipMethodLine, nextDayLine, …), `content/legal.ts`, `content/brand.ts` (BRAND_PLAIN), `content/journal/{posts,facts.ts,brew.ts,types.ts}`, `content/v2.ts` (FAQ, frames), `content/origin-media.{json,ts}`, `content/trade.ts` |
| Pages | `app/(ja)/(site)/**/page.tsx`, `app/(en)/en/**`, `components/commerce/origin-page.tsx` (EN origin), `app/api/media/[name]/route.ts` |
| Components | `components/v3/*` (hero-film, origin-photos, shot-cycle, buy-bar, shell, pages/*), `components/commerce/*` (cart, buy-card, sections) |
| Stock and SEO | `lib/shopify/{client,stock}.ts`, `lib/seo.tsx` (OFFER_TERMS, BRAND, JSON-LD) |
| Styles | `app/globals.css` (@theme tokens, `.t-*` roles), `components/v3/v3.css`, `components/v3/pages/*.css`, `components/v3/origin-photos.css` |
| Scripts | `scripts/verify-site.py`, `scripts/gates/*`, `scripts/export-origin-media.py`, `scripts/design-md-sync.py`, `scripts/indexnow.py` (do not run) |
| Docs | `docs/RESUME.md`, `docs/team-questions-2026-10-11.md`, `docs/permission-emails.md`, `docs/launch-kit/*` (the PR TIMES session owns `pr-times-release.md`), `docs/origins-research.md` |

## 7. Worklog protocol
Append to `docs/codex/CODEX_WORKLOG.md` after every item:
- the time (JST);
- the item (phase and letter);
- what you did;
- the gate evidence (command plus its last line);
- the commit;
- the next item.

On resume, start from the last "next". Owner questions go in that file's own section, one line each, with the evidence.
