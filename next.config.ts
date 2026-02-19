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
};

export default nextConfig;
