import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
    eslint: {
    // Ignore ESLint errors during production builds
    ignoreDuringBuilds: true,
  },
    typescript: {
    // skips type checking during production build
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
