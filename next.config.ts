import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Never ship source maps to the browser: without them the production bundle
     is minified and mangled, so it reads as machine output rather than as our
     component tree. (This is Next's default; stated explicitly so an upgrade
     or a stray flag cannot quietly turn it back on.) */
  productionBrowserSourceMaps: false,

  /* Strip the framework fingerprint. */
  poweredByHeader: false,

  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          // Stop the invitation being framed inside someone else's page.
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          // Belt and braces alongside app/robots.ts.
          { key: "X-Robots-Tag", value: "noindex, nofollow, noarchive, noimageindex" },
        ],
      },
    ];
  },
};

export default nextConfig;
