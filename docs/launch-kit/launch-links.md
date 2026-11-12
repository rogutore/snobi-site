# Launch links, 2026-11-13: copy and paste these

Each link tells us which post or email an order came from. snobi.jp saves the `utm_source` value on the cart
(`components/commerce/cart.tsx`, `lib/shopify/actions.ts`), so it shows on the Shopify order as the cart
attribute `utm_source`. Checked 2026-11-13: every snobi.jp link returns HTTP 200; the four tokyocoffee.jp
links are ACTIVE with those online-store URLs in the Shopify Admin API (the public site rate-limited the check).

Rule: one source name per channel, lowercase, no spaces. Never post a bare `snobi.jp` link on launch day.

| Where | Paste this |
|---|---|
| Instagram bio (SNöBI) | `https://snobi.jp/?utm_source=instagram&utm_campaign=launch` |
| Instagram Stories link sticker, @tokyocoffeejp | `https://snobi.jp/coffee?utm_source=instagram-tc&utm_campaign=launch` |
| X launch post | `https://snobi.jp/?utm_source=x&utm_campaign=launch` |
| X follow-up posts (origin) | `https://snobi.jp/origins/peru?utm_source=x&utm_campaign=launch` (swap `peru` for `ethiopia-guji`, `colombia-huila`, `mexico-chiapas-decaf`) |
| Facebook | `https://snobi.jp/?utm_source=facebook&utm_campaign=launch` |
| LINE (Tokyo Coffee official account) | `https://snobi.jp/coffee?utm_source=line&utm_campaign=launch` |
| YouTube Shorts description | `https://snobi.jp/?utm_source=youtube&utm_campaign=launch` |
| note article | `https://snobi.jp/journal/organic-specialty?utm_source=note&utm_campaign=launch` |
| Tokyo Coffee mailing list (button) | `https://snobi.jp/coffee?utm_source=tc-mail&utm_campaign=launch` |
| Tokyo Coffee mailing list (text link) | `https://snobi.jp/?utm_source=tc-mail&utm_campaign=launch` |
| Wholesale email: "become a stockist" | `https://snobi.jp/trade?utm_source=ws-mail&utm_campaign=launch` |
| Wholesale email: order at your rate (log in first) | `https://tokyocoffee.jp/products/snobi-peru?utm_source=ws-mail` (also `snobi-ethiopia-guji`, `snobi-colombia-huila`, `snobi-mexico-chiapas-decaf`). These pages are hidden from Tokyo Coffee search; the link is the only way in. Each has 100g / 200g / 1kg. |
| Google Business Profile | see `gbp-posts.md` (`utm_source=gbp`) |

Reading the results: Shopify admin → Orders → open an order → "Additional details" shows `utm_source` and
`ref_host`. Weekly count goes into `docs/seo-aeo/PROGRESS.md`.
