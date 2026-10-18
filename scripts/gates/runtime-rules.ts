/* Local synthetic tests only; no network, cart, form or supplier writes. */
import assert from "node:assert/strict";
import { products } from "../../content/products";
import { SYSTEM } from "../../content/system.generated";
import { roastDays } from "../../content/schedule";
import { productGroup } from "../../lib/seo";
import { canBuy, buyLabel, livePrice } from "../../lib/shopify/stock";
import { POST } from "../../app/api/waitlist/route";
import { GET } from "../../app/api/media/[name]/route";

async function main() {
  const p = products[0], v = p.variants[0];
  for (const [availableForSale, quantityAvailable, expected] of [
    [true, null, true], [true, 1, true], [true, 0, false], [false, 3, false], [false, null, false],
  ] as const) {
    const stock = { [v.id]: { id: v.id, availableForSale, quantityAvailable, price: { amount: "1234", currencyCode: "JPY" } } };
    const offer = productGroup(p, stock, []).hasVariant[0].offers;
    assert.equal(canBuy(stock, v.id), expected);
    assert.equal(buyLabel(stock, v.id), expected ? "カートに入れる" : "完売");
    assert.equal(offer?.availability, expected ? "https://schema.org/InStock" : "https://schema.org/OutOfStock");
    assert.equal(offer?.price, livePrice(stock, v));
  }
  assert.equal(canBuy({}, v.id), false);
  assert.equal(buyLabel({}, v.id), "在庫確認中");
  assert.equal(productGroup(p, {}, []).hasVariant[0].offers, undefined);
  assert.ok(Object.isFrozen(SYSTEM) && Object.isFrozen(SYSTEM.roast_days));
  assert.ok(Object.isFrozen(roastDays) && roastDays.every(Object.isFrozen));
  assert.equal(Reflect.set(SYSTEM.roast_days, "0", 7), false);

  const originalLog = console.log, originalFetch = globalThis.fetch;
  let logged = false;
  try {
    console.log = () => { logged = true; };
    globalThis.fetch = async () => { throw new Error("unexpected network access in local guard test"); };
    const response = await Reflect.apply(POST, null, [{ json() { throw new Error("request body must not be parsed"); } }]);
    assert.equal(response.status, 503);
    assert.equal(response.headers.get("cache-control"), "no-store");
    assert.equal((await response.json()).ok, undefined);
    assert.equal(logged, false);
    for (const name of ["toString", "constructor", "__proto__", "unknown.mp4"]) {
      assert.equal((await GET(new Request("http://unit.invalid/api/media/" + name), { params: Promise.resolve({ name }) })).status, 404);
    }
  } finally {
    console.log = originalLog;
    globalThis.fetch = originalFetch;
  }
  console.log("PASS stock/button/JSON-LD agreement, immutable registry, waitlist refusal/no parsing/logging, media own-property guard");
}
void main().catch((error) => { console.error(error); process.exitCode = 1; });
