// Stock must be fetched at request time, including after a credential-free build.
export const dynamic = "force-dynamic";
import { Landing } from "@/components/commerce/landing";
export default function Page() {
  return <Landing />;
}
