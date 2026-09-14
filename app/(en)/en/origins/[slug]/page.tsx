import { OriginPage, originMetadata } from "@/components/commerce/origin-page";
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  return originMetadata((await params).slug, "en");
}
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ size?: string }>;
}) {
  return (
    <OriginPage
      slug={(await params).slug}
      lang="en"
      size={(await searchParams).size}
    />
  );
}
