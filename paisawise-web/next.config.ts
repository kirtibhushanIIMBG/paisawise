import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home directory otherwise makes Turbopack
  // guess the wrong workspace root and warn on every build.
  turbopack: { root: __dirname },
};

export default nextConfig;
