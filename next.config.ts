import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  logging: {
    fetches: { fullUrl: true }
  },
  experimental: {
    workerThreads: false,
  },
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;