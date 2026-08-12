import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // A stray package-lock.json in the home directory otherwise makes Turbopack
  // guess the wrong workspace root and warn on every build.
  turbopack: { root: __dirname },

  // Static export. The site has no API routes, middleware, server actions or
  // next/image usage, and every route already prerenders, so there is nothing
  // for a server to do at request time. Cloudflare then serves plain files
  // rather than running a Worker, which is cheaper and has no cold start.
  //
  // This is config-only: Next 13 removed the `next export` CLI, so a build
  // command alone cannot produce the out/ directory.
  // Left on the default (no trailingSlash): Cloudflare resolves /demo to
  // demo.html directly with a 200. Forcing trailing slashes instead made
  // every deep link answer 307 and take a redirect hop first.
  output: "export",
};

export default nextConfig;
