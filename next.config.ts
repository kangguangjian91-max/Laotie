import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  distDir: "out-v10",
  // Enable compression for smaller bundles
  compress: true,
  // Generate a stable build ID based on content hash
  generateBuildId: async () => {
    return `build-${Date.now()}`;
  },
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Exclude large dev dependencies from the bundle
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
