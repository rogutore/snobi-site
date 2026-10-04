import type { MetadataRoute } from "next";
import { SITE_HOST, isIndexedHost } from "@/lib/site";
export default async function robots(): Promise<MetadataRoute.Robots> {
  return (await isIndexedHost())
    ? {
        rules: { userAgent: "*", allow: "/", disallow: "/api/" },
        sitemap: `https://${SITE_HOST}/sitemap.xml`,
      }
    : { rules: { userAgent: "*", disallow: "/" } };
}
