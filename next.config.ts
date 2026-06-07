import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
  distDir: "out-v10",
};

export default nextConfig;
