import { strict as assert } from "node:assert";
import { renderToStaticMarkup } from "react-dom/server";
import { ShippingProgress } from "../components/commerce/shipping-progress";
for (const lang of ["ja", "en"] as const) {
  const low = renderToStaticMarkup(
    <ShippingProgress subtotal={2000} lang={lang} />,
  );
  assert.ok(low.includes("¥1,000"));
  for (const subtotal of [3000, 3015, 4720])
    assert.equal(
      renderToStaticMarkup(
        <ShippingProgress subtotal={subtotal} lang={lang} />,
      ),
      "",
    );
}
console.log(
  "PASS: shipping progress at ¥2,000, ¥3,000, ¥3,015 and ¥4,720 (JA/EN component boundary checks)",
);
