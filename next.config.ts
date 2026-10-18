import type { NextConfig } from "next";
import { SITE_HOST } from "./lib/site-host";

// The registry check (python3 scripts/system-registry.py --check) runs as the first step of the
// `build` and `cf:build` scripts in package.json, not here: this file loads in every Next process.

const nextConfig: NextConfig = {
  turbopack: { root: process.cwd() },
  // One 404 for unmatched URLs across both root layouts (app/global-not-found.tsx).
  experimental: { globalNotFound: true },
  // Allow loading the dev JS bundles when visiting via these hosts (not just
  // localhost) — otherwise scripts are blocked and the page renders blank.
  allowedDevOrigins: ["127.0.0.1", "10.0.0.70"],
  // www serves a duplicate of the site; send it to the one indexed host. Two
  // rules because OpenNext leaves an empty `:path*` unsubstituted on "/".
  redirects: async () => {
    const www = [{ type: "host" as const, value: `www.${SITE_HOST}` }];
    // The /v3 preview became the site on 2026-10-09: send its page URLs (never its media under /v3/*.mp4|webp|jpg)
    // to the real routes.
    const v3 = [
      { source: "/v3", destination: "/", permanent: true },
      { source: "/v3/:page(coffee|origins|about|faq|journal|specialty|contact|legal)", destination: "/:page", permanent: true },
      { source: "/v3/:page(origins|journal)/:slug", destination: "/:page/:slug", permanent: true },
      // Older previews (/v2, /lab) carried rejected designs and the dropped founding-25 offer: send their pages home.
      { source: "/v2", destination: "/", permanent: true },
      { source: "/v2/:page(coffee|origins|about|faq|journal|trade)", destination: "/:page", permanent: true },
      { source: "/v2/origins/:slug", destination: "/origins/:slug", permanent: true },
      { source: "/lab/:path*", destination: "/", permanent: true },
    ];
    return [
      ...v3,
      {
        source: "/",
        has: www,
        destination: `https://${SITE_HOST}/`,
        permanent: true,
      },
      {
        source: "/:path+",
        has: www,
        destination: `https://${SITE_HOST}/:path+`,
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
