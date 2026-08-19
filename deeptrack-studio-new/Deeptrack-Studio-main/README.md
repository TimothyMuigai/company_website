# Deeptrack Studio — TypeScript/Vercel Handoff

This folder contains the finalized **React + TypeScript + Vite** rebuild of Deeptrack Studio. It is prepared for deployment from the existing GitHub repository, `deep-track/Deeptrack-Studio`, through the connected Vercel project.

## What is included

The package includes the public website pages, the approved Deeptrack visual system, generated deployment-local images, SEO metadata, JSON-LD structured data, `robots.txt`, `sitemap.xml`, and a Vercel configuration. It does **not** add any favicon files.

## Test it in Cursor

Open this folder in Cursor, then open its integrated terminal and run:

```bash
npm install
npm run dev
```

Open the local URL shown in the terminal. Before pushing, verify the production build:

```bash
npm run build
```

## Replace the existing GitHub site

The existing GitHub repository is a static HTML/CSS site. This package replaces it with a React/Vite application, so copy the **contents of this folder** into a fresh local clone of `deep-track/Deeptrack-Studio`.

```bash
git clone https://github.com/deep-track/Deeptrack-Studio.git
cd Deeptrack-Studio
# Copy the handoff package contents here, replacing the old static-site files.
git status
git add -A
git commit -m "Migrate Deeptrack Studio to TypeScript React site"
git push origin main
```

## Vercel settings

The included `vercel.json` is configured for Vite and SPA routing. Vercel should detect the project automatically after the GitHub push. If Vercel asks for settings, use the following values:

| Setting | Value |
|---|---|
| Framework preset | Vite |
| Install command | `npm install` |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 20 or newer |

No runtime environment variables are required for the public site.

## Post-deployment checks

After Vercel finishes, confirm these URLs:

```text
https://studio.deeptrack.io/
https://studio.deeptrack.io/services
https://studio.deeptrack.io/robots.txt
https://studio.deeptrack.io/sitemap.xml
```

Then verify the domain in Google Search Console and submit `https://studio.deeptrack.io/sitemap.xml` for crawling.

## Important content boundary

The site intentionally uses consultation-led commercial copy: **“Contact us for a tailored proposal”** and **“Timeline scoped per engagement.”** It does not invent price bands, fixed durations, case-study metrics, testimonials, or security certifications. Those can be added later when approved evidence is available.
