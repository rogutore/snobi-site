# SNöBI launch kit (drafts only, 2026-10-09)

Everything here is a **draft**. Nothing was sent, posted, submitted or paid; no account was created and no form was filled in. The owner or staff do each of those steps.
**Plan:** `brain/Handoffs/premium-line/seo-aeo-plan.md` (tasks T5–T50). **Costed list:** `research-outputs/2026-10-08-snobi-seo-aeo/05-offsite-aeo.md`.
**Facts:** `content/products.ts` (sha256 `b2a3f4eddbed…`), `content/ordering.ts` (`5fb9a6dfd176…`), `content/legal.ts` (`61db5bf46b43…`) and the vault's `product-facts-chapter-one.md`. These drafts **copy** prices and facts out of those files. If a price or fact changes there, re-check every file here before using it.
**Marks:** VERIFIED (with source) / INFERRED / UNKNOWN, as in the plan.

## Files
| File | What it is | Owner action | Cash |
|---|---|---|---|
| `pr-times-release.md` | One PR TIMES release (JP): two title options, lead, the four coffees, ordering lines, company block, photo list, contact placeholders | **Login** (PR TIMES company account: exists? UNKNOWN), **pay**, **submit** | **¥33,000** incl. tax |
| `listicle-pitches.md` | Three pitches (mybest form, コーヒー豆研究所 email, CAFEND form) + the one-page facts sheet | **Send** ×3; ship samples on request | 3 × ¥7,185 = **¥21,555** retail + postage (UNKNOWN) |
| `local-news-tips.md` | Tips for 号外NET 東久留米・清瀬 and 立川経済新聞, with submission URLs | Confirm the `[要確認]` lines; **submit** the forms | ¥0 |
| `tc-links.md` | tokyocoffee.jp: footer link, product-page link, OPTIONAL canonical (K3), TC blog post, `brand` JSON-LD, Peru Geisha meta fix | **Shopify login**; apply on a duplicated theme; publish the post | ¥0 |
| `gbp-posts.md` | Google Business Profile: launch post + four origin posts, 「詳細」 URLs, menu entries | **GBP login**; confirm which profiles exist and whether the cafés sell SNöBI | ¥0 |
| `social-profiles.md` | Entity sentence (JP+EN), Instagram bio, LinkedIn company + Showcase, note.com, YouTube channel + 2 video descriptions | **Approve the entity sentence**; create accounts only after K7 / T32 / T48 decisions | ¥0 |
| `trademark-application.md` → **moved to `brain/Handoffs/snobi-amazon/`** (work package: `trademark-filing.md` there) | 商標登録願 (標準文字 ＳＮＯＢＩ, 第30類) + 早期審査に関する事情説明書 (対象3) + evidence list | **Decide** (self or Toreru), **buy stamps**, **submit**, later **pay** fees | ¥12,000 at filing, ≈ ¥3,200 電子化手数料, then ¥17,200 (5 yr) or ¥32,900 (10 yr) |

**Cash for the launch kit:**
- 33,000 (PR) + 21,555 (samples, retail value) + 32,400 (trademark, 5-yr) = **¥86,955**;
- or ¥102,655 with the 10-year trademark fee (48,100 instead of 32,400).
- Postage is excluded. Sample cost to the company is below retail.

## Order
**Now, before this weekend's switch (free, about 10 minutes):**
1. **Capture trademark evidence on the live site today.** Print `snobi.jp/origins/peru` (shows 「© 2026 Snobi」 and the ¥2,560 product, VERIFIED 2026-10-09) and `snobi.jp/legal` to PDF, with URL and date. The ö in 「SNöBI」 may make that form non-identical to 「ＳＮＯＢＩ」 for early examination; see `trademark-application.md` §3. **Keep a plain 「Snobi」 on the new site's product pages** (the v3 footer has it) until registration.

**Owner decisions that unblock the rest:**
2. Title A or B in the release: was Chapter One already on sale before this weekend?
3. K3: cross-domain canonical on the four TC SNöBI pages (yes / no). The visible link goes in either way.
4. K7: own SNöBI Instagram or a TC highlight.
5. EN company name: "ROGUE TRADE K.K." (company.md) or "Rogue Trade Co., Ltd." (COPY-INVENTORY).
6. Publish 13OGP-2001 on SNöBI surfaces (yes / no; optional lines are marked).
7. Cafés: which GBP profiles exist, and does either café sell or serve SNöBI? Also: is SNöBI roasted at 滝山, and may we say so?

**Launch day, after the T20 post-deploy checks pass:**
8. **File the trademark** (T37 says "before PR spend").
9. **TC changes** (owner in Shopify): (a) footer link, (b-1) product-page link, (d) JSON-LD, (e) Peru Geisha meta fix; (b-2) the canonical only if K3 = yes; (c) publish the blog post.
10. **PR TIMES:** pay and submit.
11. **GBP:** launch post on the confirmed profiles.

**Launch week:**
12. Entity sentence approved → set the same text in `lib/seo.tsx` (site session). Then create the profiles the owner chose (LinkedIn needs a super admin; YouTube needs the T32 OK).
13. Local news tips (staff submits).

**Within two weeks:**
14. Listicle pitches (owner sends). Log the send dates in plan §7 for the 60-day stopping rule.

**Weekly:**
15. GBP origin posts, in the order Peru → Mexico decaf → Ethiopia → Colombia.

## Rules applied in every draft
- Brand 「SNöBI」. 「SNöBI（スノビ）」 appears once per piece.
- Short declaratives and facts.
- Never: the roast date as a hook, health or sleep claims, 「無農薬」, unproven superlatives, cup scores, producer payments.
- No 「オーガニック専門」: the roastery is certified 有機・非有機併用.
- No ranking or paid-placement request.
- Left out on purpose, listed in each file:
  - 「オリサバ山の氷河の水」 (in products.ts, but plan §8 says it is not verified for our lot);
  - 「コロンビアでも屈指の産地」 (a superlative);
  - café names (removed as unverified, `03d20dc`);
  - producer portraits (rights not cleared).

## Found while building (not fixed; owner or site session)
1. **TC sells its own organic Peru Chirinos Geisha G1 from the same producer at 100g ¥2,150** (VERIFIED 2026-10-09). SNöBI's Peru is ¥2,560. Its meta description says エチオピアイルガチャフェ: the fix is in `tc-links.md` (e). Price and channel parity: K1/K3.
2. **TC's Organization JSON-LD calls Tokyo Coffee 「オーガニックコーヒー専門ロースター」**, but the JAS certificate says 併用 (COPY-INVENTORY §4.2 q5).
3. **`lib/seo.tsx` lists `https://tokyocoffee.jp` in SNöBI's `sameAs`.** `sameAs` means the same entity; the parent is already in `parentOrganization`.
4. **Shipping wording collides at exactly ¥3,000.** `content/legal.ts` charges shipping for orders 「3,000円以下」, while `content/ordering.ts` says 「¥3,000以上で送料無料」. The drafts use only the ordering.ts line and point to /legal.
5. **The roast-band copy in `docs/footage-uses-2026-10-06.md` is out of date.** It says 「翌営業日に発送」; ordering.ts now says 火・金 焙煎・発送.
6. **YouTube chapters cannot work at the current film lengths** (14 s and about 11 s). See `social-profiles.md` §5.

## Not completed / still UNKNOWN
- **mybest intake form:** the link (`forms.gle/PndmUwdPc6FiTt3C8`) needs a browser, so whether it is still open and what its fields are is unknown. The answers are written to fit any form.
- **号外NET business form** (`edit.goguynet.jp/provision/`): fields not read. PR TIMES upload limits and formats: not checked.
- **Kingdom theme file names** (product section, JSON-LD location): no theme access. `tc-links.md` says where to search.
- **Handle availability** (Instagram, note, YouTube, LinkedIn): not checked.
- **Trademark details:**
  - 押印不要 on the 願書: INFERRED; JPO's page refused the fetch.
  - The 30-day registration-fee period: INFERRED.
  - The paper form PDF read is an older edition (平成), so the layout should be checked against the current one.
- **Journal count:** `content/journal/posts/` was empty on 2026-10-09, so the release says 「[15]本」 as a placeholder.
