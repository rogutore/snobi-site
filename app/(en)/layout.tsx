import Document from "@/components/site/document";
export { metadata } from "@/components/site/document";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <Document lang="en">{children}</Document>;
}
