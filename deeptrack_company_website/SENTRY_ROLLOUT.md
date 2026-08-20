# Sentry rollout — all DeepTrack products

**Organization:** [deeptrack](https://deeptrack.sentry.io/projects/)  
**Dashboard:** https://deeptrack.sentry.io/projects/

One Sentry **project per product** keeps errors separated and alerts clear.

## Recommended projects

| Product | GitHub repo | Sentry project slug | Platform |
|---------|-------------|---------------------|----------|
| Marketing website | `deep-track/deeptrack_company_website` | `deeptrack-website` | Next.js |
| Sentinel | `deep-track/deeptrack-sentinel` | `deeptrack-sentinel` | Python or Node |
| Face detection API | `deep-track/FaceDetectionSystem` | `face-detection-api` | Python |
| Gotham enterprise | `deeptrck/Gotham-Enterprise` | `gotham-enterprise` | Python |
| Math.ai | `deep-track/math.ai` | `math-ai` | Python |
| Website v2 (if still used) | `deep-track/Deeptrack-website-2.0` | merge into `deeptrack-website` or archive |

## Per-project setup

1. In https://deeptrack.sentry.io/projects/ → **Create Project**
2. Choose the platform (Next.js / Python / etc.)
3. Copy **DSN** from: `Settings → Client Keys`
4. Add to that product’s hosting env vars:

| Variable | Used by |
|----------|---------|
| `SENTRY_DSN` | Server / Python / API |
| `NEXT_PUBLIC_SENTRY_DSN` | Next.js browser (website only) |
| `SENTRY_ORG` | `deeptrack` (build / source maps) |
| `SENTRY_PROJECT` | project slug, e.g. `deeptrack-website` |

## This repo (website) — already wired

Code is in place. You only need DSN in `.env.local` and Vercel.

Test locally (dev):

```
NEXT_PUBLIC_SENTRY_ENABLED=true
```

Then open: http://localhost:3000/api/sentry-test

## Other repos — not wired yet

After you create each Sentry project, we can add the same pattern:

- **Python:** `pip install sentry-sdk` + `sentry_sdk.init(dsn=os.environ["SENTRY_DSN"])`
- **Next.js:** `@sentry/nextjs` (same as this repo)

## What to send us to finish rollout

For each product, paste only the **DSN** (safe to share in private chat) or add to Vercel yourself:

```
deeptrack-website → DSN: https://...
deeptrack-sentinel → DSN: https://...
```

Do **not** paste `SENTRY_AUTH_TOKEN` in public channels.
