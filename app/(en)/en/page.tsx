import type { Metadata } from "next";
import { Landing, type PreviewParams } from "@/components/commerce/landing";
export const metadata: Metadata = {
  title: "SNöBI — Organic. And actually specialty.",
  description:
    "Four organic coffees from Tokyo Coffee. Whole bean, roasted Tuesdays and Fridays in Tokyo.",
  alternates: { canonical: "/en", languages: { ja: "/", en: "/en" } },
};
export default function Page({
  searchParams,
}: {
  searchParams: PreviewParams;
}) {
  return <Landing searchParams={searchParams} lang="en" />;
}
