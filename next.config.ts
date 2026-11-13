import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactCompiler: process.env.NODE_ENV === "production",
  images: {
    qualities: [75, 90],
  },
  turbopack: {
    root: path.resolve(__dirname),
  },
  async redirects() {
    return [
      {
        // BelieversDiary was renamed Croire on 12 Nov 2026.
        source: "/products/believersdiary",
        destination: "/products/croire",
        permanent: true,
      },
      {
        // The old two-word route is retired; /university is the canonical page.
        source: "/university-collaboration",
        destination: "/university",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
