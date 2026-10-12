# Questions for the team (2026-10-11)

Short answers are enough. Each answer goes back into the repo or vault so nobody is asked twice.

## Shipping / store (Shopify)
1. 代引き: on orders under ¥5,000, do you add a ¥324 fee to the Yamato collection amount? Shopify checkout never adds it (all 8 recent COD orders were charged exactly the order total). Since 2026-10-12 snobi.jp says the same as tokyocoffee.jp (「代引き手数料は324円…5,000円以上のご注文で無料」, owner + Davy). If you do add it: both pages are right, but the amount should probably be ¥330 at 10% tax (324 = 300 × 1.08). If you don't: both pages should say 無料. Also: how do 代引き orders ship, since ネコポス takes no cash on delivery?
2. 代引き orders stay 「支払い待ち（pending）」 in Shopify after Yamato pays us (all 8 recent ones). Who should mark them paid, and when?
3. Shopify → 配送 → Wholesale profile, Hokkaido/Okinawa zone: 通常配送 ¥800 runs up to ¥4,999 while free shipping starts at ¥3,000 (other zones stop at ¥2,999). Please change ¥800 to "up to ¥2,999".

## Wholesale (ホールセール)
4. How do wholesale customers pay today (card at checkout, bank transfer, or 売掛 / monthly invoice — we see 売掛金 on some orders)? What are the terms (締め日・支払日)?
5. Please add the four SNöBI coffees to the wholesale catalogue as 1kg items. Which wholesale price (掛け率) should they carry?
6. SNöBI wholesale roasting: Tue/Fri (SNöBI's schedule, now on /trade) or weekdays by 14:00 (Tokyo Coffee's)?

## tokyocoffee.jp (Shopify theme / products)
7. Rename Tokyo Coffee's Peru Geisha by its roast, e.g. 「ペルー ゲイシャ シティロースト（中浅煎り）｜有機JAS」, and add one line 「浅煎りはSNöBIで」 linking https://snobi.jp/origins/peru.
8. Its meta description says エチオピア イルガチャフェ — please fix.
9. Add the snobi.jp links from `docs/launch-kit/tc-links.md` (footer link, the four SNöBI product pages, Organization brand), **and the canonical tag (b-2) on the four SNöBI product pages** (owner: yes, 2026-10-11). Work on a duplicated theme; after publishing, `curl -s https://tokyocoffee.jp/products/snobi-peru | grep -i 'rel="canonical"'` must return one line pointing to https://snobi.jp/origins/peru (same for the other three; a non-SNöBI product keeps its own).

## Product / labels / buying
10. Peru back label: ask JASCERT whether the reprint must change the certifier name (Leafearth → JASCERT). At the reprint, add plain 「SNOBI」 (Amazon needs it).
11. **Decision needed: the 80-point claim.** Four journal articles say all four coffees score 80+, but only Peru (84.25) and Colombia (82.67) are documented. Please send a cup-score record for Ethiopia and Mexico (importer sheet or our own cupping form). **If none is found by 2026-10-18, we reword every article to name only Peru and Colombia** (the main legal exposure on the site today).
12. Purchasing: are the four vendors in `docs/permission-emails.md` SNöBI's source? Is Colombia roasted only from lot 7005A? Which decaf lot follows #1121, and who produced it?
13. Is SNöBI roasted at the 滝山 roastery, and may we say so publicly?

## Cafés / content
14. Which Google Business Profiles do the cafés have, and do the cafés serve or sell SNöBI? (for the launch posts)
15. Could someone photograph a cupping session? It would replace the roasting photo on "Specialty" on the home page.
16. Masaki: two or three examples from the journal articles (article + line + what's wrong). Screenshot + one line is fine. Also: one house rule for article leads (length, tone), and 「認証」 or 「認定」 for 有機JAS — the articles mix both.
17. Gift wrapping / のし: the gift article says we don't offer it. True for tokyocoffee.jp checkout?

## Social
18. Instagram (owner: yes, 2026-10-11): claim the handle `snobi.jp` (or `snobi_coffee` if taken) with a business account under info@, and add a 「SNöBI」 highlight on Tokyo Coffee's Instagram linking to https://snobi.jp. Bio text: `docs/launch-kit/social-profiles.md`. Tell us the handle once claimed.

## Already checked for you (journal audit 2026-10-11, `research-outputs/2026-10-11-journal-audit/report.md`)
- Questions 10, 11 and 12 decide the riskiest article lines: the certifier name on the bags, 「80点以上」 for all four coffees (only Peru 84.25 and Colombia 82.67 are documented), and which Mexico decaf lot is in the bag.
