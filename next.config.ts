import { withSentryConfig } from "@sentry/nextjs";
import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  output: "standalone",
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
<<<<<<< HEAD
export default nextConfig;
=======

export default withSentryConfig(nextConfig, {
  org: process.env.SENTRY_ORG,
  project: process.env.SENTRY_PROJECT,
  silent: !process.env.CI,
  widenClientFileUpload: true,
  disableLogger: true,
  automaticVercelMonitors: true,
});
>>>>>>> origin/full-site-migration
