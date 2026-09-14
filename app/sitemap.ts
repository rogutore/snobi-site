import type { MetadataRoute } from "next";
import { products } from "@/content/products";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["", "/trade", ...products.map((p) => `/origins/${p.slug}`)].flatMap(
    (path) =>
      ["", "/en"].map((prefix) => ({
        url: `https://snobi.jp${prefix}${path}`,
        alternates: {
          languages: {
            ja: `https://snobi.jp${path}`,
            en: `https://snobi.jp/en${path}`,
          },
        },
      })),
  );
}
