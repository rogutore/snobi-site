// Stock must be fetched at request time, including after a credential-free build.
export const dynamic = "force-dynamic";
import type { Metadata } from "next";
import { Landing } from "@/components/commerce/landing";
export const metadata: Metadata = {
  title: "SNöBI — Organic. And actually specialty.",
  description:
    "Four organic coffees from Tokyo Coffee. Whole bean, roasted Tuesdays and Fridays in Tokyo.",
  alternates: { canonical: "/en", languages: { ja: "/", en: "/en", "x-default": "/" } },
};
export default function Page() {
  return <Landing lang="en" />;
}
