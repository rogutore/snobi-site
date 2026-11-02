# snobi.jp backlog

One list of site work that is NOT being done right now, with a recommendation each. Sources: the 2026-10-26
audit (speed / UX / content, `scratchpad/audit-1026/`), Masaki's notes (2026-11-02, via the owner), and older open
items in `docs/RESUME.md`. Fixed items move to RESUME; decided items record the owner's answer and date here.

## A. Fix batch 2026-11-02 (in progress: branch `claude/fixes-2026-11-02`)

No design decision needed: bugs, breaks of DESIGN.md, or facts that disagree.

| # | Fix | Source |
|---|---|---|
| A1 | Buy bar never appears on /faq and /journal (dead ends) | UX audit |
| A2 | Product page, phone: name / notes / price / size / add button in the first screen; buy bar solid and only after the main button scrolls away (DESIGN.md › Layout) | UX audit |
| A3 | Fake type: JP cup notes set in Latin italic, cart heading at 700, several JP headings at 400 instead of 600 | UX audit |
| A4 | 有機JAS proof (number, certifier, link to /about#jas) on each product page; FAQ gains payment + returns answers, quoting the 特商法 rows (content/legal.ts) | content audit |
| A5 | EN: Peru/Ethiopia SKUs → `SNB-PERGE` / `SNB-ETHGU` (site-plan D4); EN footer enquiry → info@ email (the form is Japanese), legal → /legal; JA footer links /en; 日本語 goes to the matching JA page | content audit |
| A6 | Speed: -t added to every shoot srcset (the /journal list took ≈650 KB of 1000w files); sunlight layer redraws only while scrolling; FAQ inline link underlined (a11y) | speed audit |
| A7 | /journal/roastery gets Article markup (date from one place); Masaki: the gap in 「タデ」. NOT changed on purpose: the footer's plain 「© 2026 Snobi」 is trademark use evidence until ＳＮＯＢＩ registers | content audit, Masaki |

## B. Owner decisions (recommendation first)

| # | Question | Recommendation |
|---|---|---|
| B1 | Home order: the four buy cards come after ~3½ screens of Fuji climb (home ≈ 12 phone screens) | Move the four buy cards up under the hero; Fuji follows |
| B2 | Home hero on phones: Japanese belief line renders 16px (spec ~40px), English leads; text over a bag label; white pill CTA | Japanese line leads at `.t-ja-hero`, copy off the label, plum square CTA |
| B3 | Buttons: DESIGN.md says square, the whole site uses pills | Pick one; I'd follow the spec (square), it is the "printed object" feel |
| B4 | Four-bag buy bar (Home/Story): four identical white bags with "+" | One 「4種から選ぶ」 button + cart, or label each bag with origin + price |
| B5 | Adobe JP font is 1.7–4.7 MB per page (after load) | Brand face for headings only, system JP for body |
| B6 | /en home mentions roast days twice ("Roasted and shipped Tue / Fri") | Does the no-roast-date-on-home rule cover /en? |
| B7 | 80-point claim on home step 02 + /journal/specialty-80-points | HELD by owner; see C3 below, they belong together |
| B8 | Supplier photo credits (小川, OCT were told they'd be credited) | Put credits back (small line), or Sharon sends a note |
| B9 | Story sign-off 「まあ、見てなって。」 (from the original site copy) — Masaki: tone doesn't fit | Replace with the belief line or end on the CTA |
| B10 | Product names (Masaki): ペルー チリノス ゲイシャ (国・地域・品種) / コロンビア ウィラ (国・地域) / エチオピア グジ タデGG農園 (国・地域・農園) / メキシコ チアパス デカフェ (国・州・特徴) | One pattern, e.g. 国 地域 + one distinguishing word (ゲイシャ / タデGG / デカフェ; Colombia gets its farm or variety). Names also live in Shopify, labels and Amazon, so change all at once |
| B11 | Masaki: origin chapter lists 「メキシコ・デカフェ」 — leave デカフェ out there? | Yes: origin lists are places (メキシコ・チアパス); "decaf" belongs to the product name |
| B12 | Mexico page: Orizaba glacier water + 3,253 m stated flatly; 「世界最高峰の品質」 on /about; JP italic fix; phone hero still | Older items, RESUME 2026-10-12 / vault row Q |

| B13 | Returns: /legal (Tokyo Coffee's text) says 「ご返品可能。万が一不良品や品違い…７日以内」; Google's product data says any return within 7 days, return shipping free. Can a customer return coffee for change of mind? | For food: defects/wrong items only. Then the product data says so (defect returns free, no change-of-mind returns) and /legal is reworded with Davy |

## D. Later improvements (no decision needed, bigger work)

| # | Item | Expected effect |
|---|---|---|
| D1 | Pages are rendered per request (live stock) and sent no-store; cache the page and fetch stock separately | ≈0.5–0.7 s faster first paint on Home and /en; back/forward cache works |
| D2 | Inline the page CSS (Next `inlineCss`, read the bundled Next docs first) | ≈0.3–0.8 s earlier first paint on phones |
| D3 | SEO tidy: four JA titles over ~35 characters (/origins/mexico-chiapas-decaf, /trade, /origins/ethiopia-guji, /journal/mexico-chiapas-organic), long EN descriptions, JPEG share images (LINE), lastmod on every sitemap URL, og:url/og:locale on EN, Organization markup on /en | small, cumulative |
| D4 | Wording: 「JAS有機認証」 (footer, home step 01) vs 「有機JAS」 elsewhere; 「…お楽しみいただけます！」 breaks the full-stop voice rule | consistency |
| D5 | /journal/ethiopia-guji-natural cites the Sucafina page for the fully-washed Tade GG lot | fact accuracy |

## C. Journal (Masaki 2026-11-02) — a project, not a fix

Masaki: the posts read stiff and machine-like, drift from their titles, and mix systems (SCA scores, CVA, Japanese
practice) so a reader can misread the 80-point post; add explanations of SCA grades, top specialty, CoE.
Proposal: pillar pages that the posts link to, each post shortened to its title with a two-line summary + link
when it touches a pillar topic. This also fixes the audit's thin cross-linking.

| # | Pillar | Contents (Masaki's outline) | Status |
|---|---|---|---|
| C1 | スペシャルティコーヒーの基準 | SCA cupping (80+ / 85+ / 90+), CVA (SCA's 2024 system), Japan (SCAJ), CoE | needs sources; ties to B7 |
| C2 | 収穫から焙煎まで | cultivation (organic, farm size), wet mill / dry mill, processes (washed, natural, honey, anaerobic, decaf), export, roasting | needs sources + our own photos |
| C3 | 認証コーヒー | 有機JAS, other organic marks (USDA, EU), RFA, Fairtrade | needs sources |
| C4 | Rewrite existing 15 posts | human voice, stay on title, link to C1–C3 | after C1–C3 |

Rules: every fact sourced (no figures from memory), no invented testimonials, roast date never a headline. Draft →
Masaki and owner review → publish. Order: C1 first (it settles B7), then C3, C2, C4.
