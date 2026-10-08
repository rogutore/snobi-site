# Market-driven shipping compatibility check

Updated: 2026-09-26
Status: **Market-driven shipping compatibility tested; Shopify self-attestation submitted and receipt confirmed. Shopify's backend compatibility flag has not been independently verified.**

## Evidence collected

- Shopify notice received at info@tokyocoffee.jp on September 24 names snobi-site and requests testing before October 1.
- Audited origin/main at 03d20dc36db048cbd4f2bfc2085f8a99db24d1a2. Tracked lib/ and scripts/ contain no deliveryProfile(s), deliveryProfileCreate, deliveryProfileUpdate or deliveryProfileRemove operations. Seed preflight still requires read_shipping. Historical ignored artifacts/hybrid/diagnose.ts reads deliveryProfiles; do not reuse it as the new shipping source of truth.
- Production integration uses Storefront stock/cart operations and Shopify-hosted checkout. The static assessment was followed by the development-store tests below.
- Dev Dashboard organization 41318704 initially listed no development stores.
- Created **SNOBI shipping compatibility test**, Grow feature simulation, with generated test data and **Market-driven shipping** preview selected. Verified resulting admin is a dev store and shipping settings link into Markets.
- Store: https://admin.shopify.com/store/snobi-shipping-compatibility-test
- App: snobi-site (421677203457), current dashboard version snobi-site-4-read-customers.
- User approved installation; snobi-site installed in the development store. Admin API confirms `shop.features.marketDrivenShipping = true`.
- Production shipping, payments, stock, application permissions and application code unchanged. All test products, shipping fixtures and orders below belong to the isolated development store.

## Test results

| Check | Result |
|---|---|
| Product/variant creation, inventory and Online Store publication | Two isolated coffee fixtures, 100g; starting quantity 100 each |
| Storefront stock queries | Correct IDs, availability, prices and quantity |
| Cart create/add/update/remove/read | Passed using production CART_FIELDS; totals ¥1,410 / ¥3,015 / ¥4,425 |
| Attributes and checkout handoff | source=snobi.jp, lang=ja/en cart attributes; development-store hosted checkout |
| Shipping below threshold | ¥1,410 item + ¥500 standard shipping = ¥1,910 |
| Free shipping | ¥4,230 basket and ¥3,015 mixed basket both quote FREE |
| Completed checkout #1001 | Test Payment Gateway; test=true, PAID; ¥1,910 total, ¥500 shipping; Colombia ×1 |
| Completed checkout #1002 | Test Payment Gateway; test=true, PAID; ¥3,015 total, ¥0 shipping; Colombia ×1 + Ethiopia ×1 |
| Order metadata | Both orders preserve source=snobi.jp and lang=en |
| Inventory after checkout | Colombia 98, Ethiopia 99, matching the two orders |

Orders: [#1001](https://admin.shopify.com/store/snobi-shipping-compatibility-test/orders/18909158801582), [#1002](https://admin.shopify.com/store/snobi-shipping-compatibility-test/orders/18909165617326).

Both transactions used dummy card 1 in Shopify's development-store Test Payment Gateway; no real card charge. Orders and fixtures remain as evidence. Tests used a synthetic Tokyo address. Region-specific surcharges, split shipping, ship-and-pickup, and non-Japan markets were not certified. This validates the integration's domestic shipping/cart paths, not every possible merchant shipping configuration or the full rendered SNöBI UI against the test store.

## Transient fixture issue and recovery

The newly seeded Ethiopia variant initially appeared available in Admin and Storefront stock queries, but cartCreate/cartLinesAdd returned INVALID / merchandise does not exist. Shopify's own theme reproduced “Cannot find variant.” Publication and inventory were verified; updating the product vendor did not resolve it. After changing the isolated variant price to ¥1,606 and restoring ¥1,605, cart operations succeeded and order #1002 completed. Timing/indexing versus the update itself is not proven; no production fix was applied.

A test assertion also assumed cart line ordering; corrected the test to select the Colombia line by merchandise ID. The rerun passed. This was a QA script issue, not a production cart change.

## Submission

- Submitted the official Shopify form linked from the upgrade guide on 2026-09-26; the browser displayed **“Thank you for your submission!”**
- Selected **Market-driven shipping only**, not split shipping or ship-and-pickup.
- App: snobi-site; client ID e9c6f2fee0c054f950b50202632f651e; business contact info@tokyocoffee.jp.
- Confirmed no merchant delivery-profile mutations. Used “Other” to explain that the existing Storefront Cart API / hosted-checkout integration required no migration.
- Required rollout date entered as 2026-09-24, explicitly explained as the existing snobi-site-4-read-customers release date, not a new shipping-code deployment. Testing date stated separately as 2026-09-26.
- Form receipt is verified; Shopify's later backend flag update / warning removal is not yet independently verified. Shopify says this submission enables migration eligibility; no manual production migration was performed.

## Evidence location and follow-up

Local test scripts and sanitized order evidence: `artifacts/shipping-compatibility/` (ignored). `admin.ts` is guarded to the development-store domain. Private cart-key files remain local and must not be copied into the company brain or shared reports. Original production admin helper is unchanged.

If Shopify continues sending warnings, check its compatibility flag or reference this submission. If new products reproduce the variant failure, retain the initial failure and recovery details above for Shopify support. No support message was sent.

## Sources

- https://shopify.dev/docs/apps/build/orders-fulfillment/market-driven-shipping/upgrade-your-app
- https://shopify.dev/docs/apps/build/orders-fulfillment/market-driven-shipping/feature-preview

Shopify's guide says confirmation enables automatic merchant migration. Code/API-version inspection alone is insufficient evidence for self-attestation.
