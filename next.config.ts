import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  distDir: "out-v3",
};

export default nextConfig;
