import Document from "@/components/commerce/document";
import { JsonLd, organization } from "@/lib/seo";
export { generateMetadata } from "@/components/commerce/document";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Document lang="en"><JsonLd data={organization()} />{children}</Document>;
}
