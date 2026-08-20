# DeepTrack — PostHog & Sentry setup (deeptrack.io)

This guide is for **non-technical** setup. Your website code already has PostHog and Sentry wired in; you only need keys in `.env.local` and deploy.

## What each tool does

| Tool | Purpose |
|------|---------|
| **PostHog** | Who visits the site, which pages, demo bookings, funnels |
| **Sentry** | Crashes and errors — alerts when something breaks |

---

## Step 1 — Create `.env.local`

In the project folder, copy the example file:

```powershell
cd C:\Users\Admin\deepfake
copy .env.example .env.local
```

Open `.env.local` in Notepad and fill in the keys below.

---

## Step 2 — PostHog keys

1. Log in at https://us.posthog.com (or https://eu.posthog.com if EU project)
2. Open your project → **Settings** → **Project** (or Project API Key)
3. Copy **Project API Key** (`phc_...`)
4. Paste into `.env.local`:

```
NEXT_PUBLIC_POSTHOG_KEY=phc_your_key_here
NEXT_PUBLIC_POSTHOG_HOST=https://us.i.posthog.com
```

Use `https://eu.i.posthog.com` if your PostHog project is in EU.

### Verify PostHog

1. Run the site locally (see Step 4)
2. Click around the site
3. In PostHog → **Activity** → **Live events** — you should see `$pageview` within ~30 seconds

Tracked automatically:
- Page views
- Logged-in users (Clerk) identified in PostHog
- `book_demo_submitted` when someone submits the demo form

---

## Step 3 — Sentry keys

Your org: **deeptrack** — projects list: https://deeptrack.sentry.io/projects/

1. Open the link above (log in if asked)
2. Create or open project **`deeptrack-website`** → platform **Next.js**
3. Go to **Settings → Client Keys (DSN)** and copy the DSN
4. Paste into `.env.local`:

```
NEXT_PUBLIC_SENTRY_DSN=https://your-dsn@o....ingest.us.sentry.io/...
SENTRY_DSN=https://your-dsn@o....ingest.us.sentry.io/...
SENTRY_ORG=deeptrack
SENTRY_PROJECT=deeptrack-website
```

Optional (for production source maps on Vercel):

```
SENTRY_AUTH_TOKEN=your-auth-token
```

Create token: https://sentry.io/settings/account/api/auth-tokens/ (scopes: `project:releases`, `org:read`)

Get auth token: Sentry → Settings → Auth Tokens → Create (scopes: `project:releases`, `org:read`).

### Test Sentry locally

In `.env.local` add:

```
NEXT_PUBLIC_SENTRY_ENABLED=true
```

Visit: `http://localhost:3000/api/sentry-test` (only works in development) — we can add this route, or trigger a test from Sentry UI → Settings → Client Keys → Test.

In production, Sentry turns on automatically when `NODE_ENV=production`.

---

## Step 4 — Run locally

```powershell
cd C:\Users\Admin\deepfake
npm install
npm run dev
```

Open http://localhost:3000 and browse a few pages.

---

## Step 5 — Production (Vercel)

If the site is on **Vercel**:

1. Vercel dashboard → your project → **Settings** → **Environment Variables**
2. Add the same variables as `.env.local` (Production + Preview)
3. Redeploy

Required for production:
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`
- `NEXT_PUBLIC_SENTRY_DSN`
- `SENTRY_DSN`

---

## PostHog dashboards to create

1. **Traffic** — Trend: `$pageview` count, last 7 days
2. **Conversions** — Funnel: `$pageview` → `book_demo_submitted`
3. **Logged-in users** — Filter where `email` is set (Clerk identify)

---

## Security note

- Never commit `.env.local` (already gitignored)
- Rotate API keys if they were shared in chat

---

## Tomorrow: AWS

When ready, we can add AWS (hosting, S3 for uploads, etc.) on top of this observability stack.
