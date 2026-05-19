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
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'deeptrack.io' }],
        destination: 'https://www.deeptrack.io/:path*',
        permanent: true,
      },
    ]
  },
};

export default nextConfig;