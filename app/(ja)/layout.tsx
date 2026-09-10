import Document from "@/components/commerce/document";
export { metadata } from "@/components/commerce/document";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Document lang="ja">{children}</Document>;
}
