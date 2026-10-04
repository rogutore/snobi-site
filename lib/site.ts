import "server-only";
import { headers } from "next/headers";
import { SITE_HOST } from "./site-host";

export { SITE_HOST };

/* Only SITE_HOST is indexable. Any other host that serves this app
   (workers.dev, *.vercel.app previews, localhost) is noindex, so the decision
   doesn't depend on which platform is hosting the site. */
export async function isIndexedHost(): Promise<boolean> {
  const host = (await headers()).get("host")?.split(":")[0];
  return host === SITE_HOST;
}
