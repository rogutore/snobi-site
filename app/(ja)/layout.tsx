import Document from "@/components/commerce/document";
export { generateMetadata } from "@/components/commerce/document";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Document lang="ja">{children}</Document>;
}
