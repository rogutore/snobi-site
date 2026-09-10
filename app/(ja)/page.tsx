import { Landing, type PreviewParams } from "@/components/commerce/landing";
export default function Page({
  searchParams,
}: {
  searchParams: PreviewParams;
}) {
  return <Landing searchParams={searchParams} />;
}
