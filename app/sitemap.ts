import type { MetadataRoute } from "next";
import { products } from "@/content/products";
import { posts } from "@/content/journal";
import { SITE } from "@/lib/seo";

/* Every indexable page of snobi.jp (2026-10-09 cutover). hreflang pairs only where an English twin exists
   (/, /trade, /origins/<slug>); /en pages list themselves. Journal posts carry their own updated date. */
const EN_TWIN = new Set(["", "/trade", ...products.map((p) => `/origins/${p.slug}`)]);
const JA = ["", "/coffee", "/origins", ...products.map((p) => `/origins/${p.slug}`), "/about", "/journal", "/journal/roastery", "/faq", "/specialty", "/trade", "/contact", "/legal"];

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => (path ? `${SITE}${path}` : SITE);
  const pair = (path: string) => ({ languages: { ja: url(path), en: `${SITE}/en${path}`, "x-default": url(path) } });
  return [
    ...JA.map((path) => ({ url: url(path), ...(EN_TWIN.has(path) ? { alternates: pair(path) } : {}) })),
    ...posts.map((p) => ({ url: `${SITE}/journal/${p.slug}`, lastModified: p.updated })),
    ...[...EN_TWIN].map((path) => ({ url: `${SITE}/en${path}`, alternates: pair(path) })),
  ];
}
