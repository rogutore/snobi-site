# Davy's site notes (forwarded by the owner, 2026-10-08) — what changed and what's open

Source: owner's message 2026-10-08, "Snobi Site — Davy and Masaki".

## Applied (branch `claude/v2-pages`; NOT deployed to snobi.jp)
| Note | Change | Where |
|---|---|---|
| Ordering summary | 「税込表示 · ¥3,000以上で送料無料 · 火・金焙煎・発送。本州であれば翌日配達。」 | `content/ordering.ts` → hero microline, v3 |
| Roast/ship schedule (replaces 前日正午締切・翌営業日発送・焙煎日を袋に記載) | 「火曜日と金曜日に焙煎、発送。当日の正午までのご注文が対象。焙煎後2週間以内の商品が発送されます」 | `content/ordering.ts` → shop footnote, cart, origin pages, FAQ (JA+EN) |
| Roast level | all four 浅煎り (Colombia + Mexico were blank) | `content/products.ts` roast + chips |
| FAQ 有機？焙煎度は？ | 「第一章は四つの産地からの、スペシャルティコーヒー。全種類、豆の味を堪能出来る様に、「浅煎り」で焙煎。」 + kept 「JASオーガニック、豆のままでのお届けです。」 so the question is still answered | `sections.tsx`, `content/v2.ts` |
| Freshness under the flavour notes | Peru, Ethiopia: 「１ヶ月半まで、味をお楽しみいただけます！」 · Colombia, Mexico: 「２ヶ月まで…」 | `products.ts` `enjoyWithin`, buy cards, v3 cards |
| Mexico variety missing | chip ブルボン・ムンドノーボ・カトゥーラ added | `products.ts` |
| 「4つの産地…豆のまま·100g/200g…」 small print | reduced to an emphasised 「¥3,000以上で送料無料」 | `sections.tsx`, v3 |
| 「産地を読む」 | 「産地について詳しく読みたい方」 | `buy-card.tsx`, v3 |
| FAQ "what is SNöBI" + specialty | added 「カッピングスコア80点以上の「スペシャルティコーヒー」の豆を使用しています。」 + new page `/v3/specialty` (SCAJ definition, 80-point scale, seed to cup, Tokyo Coffee JAS since 2020) | `sections.tsx`, `app/(ja)/v3/specialty` |
| Visual taste profile (future idea) | 3 bars per coffee (酸味・甘さ・コク), marked 仮 | `content/taste.ts` (DRAFT values) |

## Owner answers (2026-10-08)
- Q1 「２月まで」 = ２ヶ月まで: **yes**. Q2 taste values: okay (roaster to supply). Q3 80+ for all four: okay. Q4 shipping fees: **keep as is for now**. Q5 trade: owner asked what the trade issue is (answered in chat; awaiting Davy).
- Owner correction: the home rethink went too far (turned into an LP). Restored Mockup D home; only replace what the owner rejects; proposals before building.

## Open — for Davy / the owner
1. **「２月まで」** read as **２ヶ月まで** (two months), parallel to 「１ヶ月半まで」. Confirm.
2. **Taste bars:** the values are my reading of the cup notes, not a cupping. Need the roaster's 1–5 for acidity / sweetness / body per coffee.
3. **80 points for all four:** files show Peru 84.25 and Colombia 82.67; Ethiopia pending, Mexico none (fact sheet FS:28). Confirm all four are 80+ before this ships.
4. **Shipping fees vs ネコポス** (Davy's question for Noah): ¥500 / ¥700 / ¥800 below ¥3,000 — is that right when it ships by Nekopos? Copy unchanged until decided.
5. **/trade** — "We need to talk this over." Unchanged.
6. The specialty-coffee.jp link Davy sent is an importer's site (WATARU); the page cites SCAJ (scaj.org) instead.
7. **Live site is still wrong** (前日正午締切 / 翌営業日発送) until a deploy. A small production deploy of just these copy fixes needs the owner's OK.

## Future ideas (not built)
Processing-method pages; an エイジング explainer link; a fuller visual intensity profile (refs: tokado-coffee.shop-pro.jp, blackwhiteroasters.com).
