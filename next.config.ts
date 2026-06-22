import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow loading the dev JS bundles when visiting via these hosts (not just
  // localhost) — otherwise scripts are blocked and the page renders blank.
  allowedDevOrigins: ["127.0.0.1", "10.0.0.70"],
};

export default nextConfig;
