import "server-only";
import { headers } from "next/headers";

/* The one public host search engines should index. Any other host that serves
   this app (workers.dev, *.vercel.app previews, localhost) is noindex, so the
   decision doesn't depend on which platform is hosting the site. */
export const SITE_HOST = "snobi.jp";

export async function isIndexedHost(): Promise<boolean> {
  const host = (await headers()).get("host")?.split(":")[0];
  return host === SITE_HOST;
}
