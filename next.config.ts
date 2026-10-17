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
        // The old two-word route is retired; /university is the canonical page.
        source: "/university-collaboration",
        destination: "/university",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
