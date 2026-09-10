import { TradePage } from "@/components/commerce/trade-page";
export const metadata = {
  title: "Become a stockist — SNöBI",
  alternates: {
    canonical: "/en/trade",
    languages: { ja: "/trade", en: "/en/trade" },
  },
};
export default function Page() {
  return <TradePage lang="en" />;
}
