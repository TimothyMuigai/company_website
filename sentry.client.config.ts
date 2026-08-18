import * as Sentry from "@sentry/nextjs";

const enabled =
  process.env.NEXT_PUBLIC_SENTRY_ENABLED === "true" ||
  process.env.NODE_ENV === "production";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  enabled: enabled && Boolean(process.env.NEXT_PUBLIC_SENTRY_DSN),
  tracesSampleRate: process.env.NODE_ENV === "production" ? 0.2 : 1.0,
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,
  integrations: [Sentry.replayIntegration()],
  environment: process.env.VERCEL_ENV || process.env.NODE_ENV,
});
