import { OriginPage, originMetadata } from "@/components/commerce/origin-page";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return originMetadata((await params).slug, "ja");
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return <OriginPage slug={(await params).slug} lang="ja" />;
}
