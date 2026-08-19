# Deeptrack Enterprise Due-Diligence Migration — Full-Site Handoff

## Scope completed

The supplied Next.js application has been repositioned from a deepfake-detection-only website to a **full enterprise AI, identity, media, and document due-diligence web estate**. The work intentionally preserves the larger product, partner, developer, intelligence, company, legal, and conversion architecture rather than reducing Deeptrack to a single landing page.

The approved Deeptrack system is applied throughout the new public pages: **Space Grotesk** for display copy, **Outfit** for body copy, `#0191DA` as the primary blue, `#333333` as the black neutral, `#808080` as slate, `#E6F4FB` as light blue, and approved blue tints. No favicon file or favicon reference was added, replaced, or modified.

## Public architecture now available

| Area | Public route(s) and purpose |
|---|---|
| Enterprise category | `/`, `/due-diligence` explain the enterprise due-diligence category, decision-record model, and sector pathways. |
| Workflow assessment / retained calculator purpose | `/assessment` provides an interactive evidence and workflow intake. It deliberately does **not** produce a synthetic risk score, ROI, savings, or quantified outcome. |
| Pricing and commercial pathway | `/pricing`, `/engagements` present diagnostic, advisory, prototype/build, production hardening, training, and research engagement pathways. The approved commercial wording is: **“Contact us for a tailored proposal”** and **“Timeline scoped per engagement.”** |
| Industry routes | `/industries/financial-services`, `/industries/insurance`, `/industries/media`, `/industries/government`, and `/industries/flexible-workspaces`. The flexible-workspaces route specifically covers co-working operators, innovation hubs, startup campuses, and managed offices—not creative or production studios. |
| Capability layer | `/solution/image-authentication`, `/solution/audio-authentication`, `/solution/gotham`, and `/sentinel` are retained and reframed as evidence-assessment capabilities inside a human-owned diligence process. |
| Developer / API | `/productApi` retains a substantive API and integration journey, with console and documentation paths. It now uses consultation-led integration wording instead of public credit, price, or SLA claims. |
| Channel partners | `/partners` is a public partner-ecosystem page for referral, technology, and delivery discussions. `/portal/login` retains the secure existing Partner Portal path for account, lead, commission, and material workflows. |
| Intelligence | `/research`, `/news`, and `/resources/nacha-2026-checklist` retain research, gated News Center, and resource paths under a Due-Diligence Intelligence framing. |
| Company and legal | Existing `/about`, `/career`, `/contact`, legal, and external Trust Center paths remain accessible. |

## Navigation, footer, social, and SEO

The shared navigation now exposes full desktop and mobile pathways for **Due diligence, Capabilities, Industries, Developers, Intelligence, Partners, and Company**. Legacy public pages reuse this shared navigation and the expanded footer, rather than displaying an outdated partial header or an empty footer.

The footer now contains conversion, capability, industry, developer, intelligence, partner, company, legal, Trust Center, X, and LinkedIn paths. Verified social links are `https://x.com/deeptrck` and `https://www.linkedin.com/company/deeptrck/`. The external Vanta Trust Center and all retained legal destinations are present.

Metadata was added or rewritten for the major new routes, the existing robots route was retained, and the sitemap now includes the due-diligence, assessment, engagement, partner, sector, API, research, news, and retained legacy search paths. The sitemap excludes login-protected console routes.

## Content safeguards retained

No fabricated testimonials, customer names, logos, metrics, performance figures, certifications, pricing ranges, credit volumes, service-level promises, partner commissions, or delivery durations were added. The former testimonial space is represented as a method-based **Proof of Diligence** explanation until approved customer evidence is supplied.

## Validation performed

The homepage, workflow-assessment, partner, pricing/engagement, developer/API, flexible-workspaces, image-capability, and contact journeys were rendered and checked in local development. A direct HTTP route sweep returned `200` for all checked public paths; `/pricing` is intentionally a `307`-free direct presentation of the consultation-led engagement page after the final revision.

`npx next typegen && npx tsc --noEmit` completed successfully after clean route-type generation. `NODE_ENV=production RESEND_API_KEY=re_build_placeholder npm run build` completed successfully and enumerated the application’s dynamic route inventory. The sandbox’s injected default `NODE_ENV` is non-standard and can produce a misleading Next.js global-error prerender failure; Vercel will supply the normal production value.

## Deployment checklist

1. Set `NODE_ENV=production` in the build environment, as standard Vercel deployments do.
2. Configure the production Convex and Clerk variables used by the existing authenticated portal and console features.
3. Configure valid `RESEND_API_KEY` and MongoDB variables for the existing email and database-backed API handlers.
4. Build with `npm run build`, then deploy through the connected Vercel project.
5. Push to `https://github.com/deep-track/deeptrack_company_website` **only after explicit owner confirmation and repository write access are available**.

## Supporting records

- `public_surface_inventory.md` inventories the retained public estate.
- `legacy_to_enterprise_architecture.md` records the full route and information-architecture crosswalk.
- `validation_notes.md` records rendered-route and production-build validation details.

## SEO implementation update

The source now has an explicit homepage canonical, full Open Graph and Twitter metadata, and a new enterprise due-diligence social-preview image at `/seo/deeptrack-enterprise-due-diligence-social.jpg`. The global FAQ schema was removed from the root layout and is now emitted only from a visible homepage FAQ section containing the matching question-and-answer copy. Focused title, description, and canonical coverage was added for the indexable company, contact, career, industry, legal, and article/resource paths.

Authenticated, gated, and callback routes now emit `noindex, nofollow` metadata in addition to their crawler controls. The sitemap includes the industry-index and careers landing pages and no longer exposes a synthetic build-time `lastModified` date for every URL. Local browser inspection confirmed the final title, canonical, description, robots, Open Graph, Twitter, Organization, and FAQ structured-data signals. Production-mode compilation passed after the implementation.
