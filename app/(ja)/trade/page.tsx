import { TradePage } from "@/components/commerce/trade-page";
export const metadata = {
  title: "取扱店 第一章 — SNöBI",
  alternates: {
    canonical: "/trade",
    languages: { ja: "/trade", en: "/en/trade" },
  },
};
export default function Page() {
  return <TradePage />;
}
