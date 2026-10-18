import { yen, type Locale } from "@/content/products";
import { shippingProgress } from "@/content/ordering";
export function ShippingProgress({
  subtotal,
  lang,
}: {
  subtotal: number;
  lang: Locale;
}) {
  const { left } = shippingProgress(subtotal);
  if (left === 0) return null;
  return (
    <p className="shipping-progress" role="status">
      {lang === "en"
        ? `${yen(left)} more for free shipping`
        : `あと${yen(left)}で送料無料`}
    </p>
  );
}
