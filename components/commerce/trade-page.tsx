import type { Locale } from "@/content/products";
import { trade, tradeFormUrl } from "@/content/trade";
import { CartProvider } from "./cart";
import { Nav } from "@/components/site/nav";
import { Footer } from "@/components/site/footer";
export function TradePage({ lang = "ja" }: { lang?: Locale }) {
  const en = lang === "en";
  const benefits = en
    ? [
        ["Four coffees, all JAS organic", "Peru, Ethiopia, Colombia and a Mexico decaf. Specialty grade, light roast, whole bean."],
        ["Roasted in Tokyo", "Roasted by Tokyo Coffee, whose roastery is certified for organic processed food."],
        ["Ordered through Tokyo Coffee", "Orders go through Tokyo Coffee's wholesale account. Prices and terms on enquiry."],
      ]
    : trade.facts.slice(0, 3);
  return (
    <CartProvider lang={lang}>
      <Nav en={en} paper home={false} />
      <main className="trade-page">
        <p className="eyebrow">FOR CAFÉS &amp; RETAILERS</p>
        <h1 className="display">
          {en ? "Stock SNöBI." : trade.h1}
        </h1>
        <p className="trade-lead">
          {en
            ? "Stock SNöBI. Four organic specialty coffees from Tokyo Coffee, for counters with a point of view."
            : trade.lead}
        </p>
        <ol className="trade-benefits">
          {benefits.map(([t, d]) => (
            <li key={t}>
              <h2>{t}</h2>
              <p>{d}</p>
            </li>
          ))}
        </ol>
        <div className="trade-apply">
          <p className="eyebrow">PRICES ON REQUEST</p>
          <h2 className="display text-3xl">
            {en
              ? "Tell us about your place."
              : "あなたのお店のことを、教えてください。"}
          </h2>
          <p>
            {en
              ? "The form opens with wholesale enquiries selected. Please add your shop, contact details and expected monthly volume."
              : trade.enquiry}
          </p>
          <a
            href={tradeFormUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="commerce-button"
          >
            {en ? "Enquire about stocking SNöBI" : "取扱店について相談する"}
            <span>↗</span>
          </a>
        </div>
        <p className="trade-flow">
          {en
            ? "Enquire → we reply with wholesale prices and how to start → order through a Tokyo Coffee wholesale account. This page accepts enquiries."
            : trade.closing}
        </p>
      </main>
      <Footer en={en} />
    </CartProvider>
  );
}
