import type { MetadataRoute } from "next";
export default function sitemap(): MetadataRoute.Sitemap {
  const languages = { ja: "https://snobi.jp/", en: "https://snobi.jp/en", "x-default": "https://snobi.jp/" };
  return [languages.ja, languages.en].map(url => ({ url, alternates: { languages } }));
}
