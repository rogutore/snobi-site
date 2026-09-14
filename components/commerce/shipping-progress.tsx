import { yen, type Locale } from "@/content/products";
export function ShippingProgress({
  subtotal,
  lang,
}: {
  subtotal: number;
  lang: Locale;
}) {
  if (subtotal >= 3000) return null;
  return (
    <p className="shipping-progress" role="status">
      {lang === "en"
        ? `${yen(3000 - subtotal)} more for free shipping`
        : `あと${yen(3000 - subtotal)}で送料無料`}
    </p>
  );
}
