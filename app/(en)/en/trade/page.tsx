import { TradePage } from "@/components/commerce/trade-page";
export const metadata = {
  title: "Wholesale — SNöBI",
  description: "Four organic (JAS) specialty coffees from Tokyo Coffee for cafés and shops. Whole bean, 1kg bags. Enquire here.",
  alternates: {
    canonical: "/en/trade",
    languages: { ja: "/trade", en: "/en/trade" },
  },
};
export default function Page() {
  return <TradePage lang="en" />;
}
