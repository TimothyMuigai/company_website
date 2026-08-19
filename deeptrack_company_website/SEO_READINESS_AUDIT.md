# Deeptrack SEO Readiness Audit

## Executive conclusion

The **expanded source code has a credible technical SEO baseline**, but the currently indexed production domain is still the **older deepfake-detection site**. The most important SEO issue is therefore not a missing keyword or a cosmetic metadata adjustment: the enterprise due-diligence migration has not yet been deployed to `deeptrack.io`.

At the time of this review, the live homepage title is **“Deeptrack | Enterprise Deepfake Detection & AI Content Verification”**, its page copy still presents Deeptrack as a deepfake-detection company, and the new public routes—`/due-diligence`, `/assessment`, `/engagements`, `/partners`, and `/industries/flexible-workspaces`—all return `404` on the production domain. Consequently, search engines have no opportunity yet to index the new category, sector pages, internal links, or conversion paths. [1]

## Current status

| Dimension | Expanded source / review build | Live `deeptrack.io` production domain | Assessment |
|---|---|---|---|
| Enterprise due-diligence positioning | Implemented in titles, page copy, sectors, products, navigation, and footer. | Still centred on enterprise deepfake detection. | **Deployment blocker** |
| Crawler rules | Source and live site allow public crawl and disallow `/portal/` and `/api/`. | Same rules are live. | **Sound baseline** |
| Sitemap | Source includes new sector, assessment, engagement, partner, API, research, and legacy public routes. | Live sitemap contains legacy deepfake, product, use-case, research, and legal URLs only. | **Deployment blocker** |
| Internal linking | New header, homepage pathways, capability pages, and footer provide broad crawl paths. | Legacy navigation remains indexed. | **Strong in source; not live** |
| Metadata | Root title template and targeted metadata exist for major new public routes. | Live metadata still describes the old deepfake-first category. | **Partly complete in source; not live** |
| Structured data | Organization and FAQ markup exist in source. | Cannot be assumed to match source until deployment. | **Requires refinement** |
| Rankings, traffic, crawl errors, Core Web Vitals, backlinks | Not accessible from the supplied source or public inspection. | Not verifiable without Search Console, Bing Webmaster Tools, and analytics access. | **Unknown** |

## What is already good in the expanded source

The source has a valid `robots` metadata route that allows public crawl, excludes the partner portal and API routes, and advertises the canonical sitemap. The sitemap is broad enough to expose the primary enterprise category, assessment, engagements, partner page, five industry pages, product/API pages, research, news, resources, company routes, legal routes, legacy use cases, article pages, and career pages.

The new homepage has one clear H1, descriptive introductory copy, meaningful image alternative text, sector links, product/developer links, partner links, intelligence links, and commercial calls to action. This is a substantial improvement over an isolated landing page because it gives search engines and users multiple contextual discovery paths.

The new industry and capability pages are particularly useful for topical relevance because they connect the parent category to concrete decision workflows. The site also avoids fabricated case-study, certification, pricing, and performance content, which protects accuracy and commercial credibility.

## Priority issues before and immediately after deployment

| Priority | Finding | Why it matters | Recommended action |
|---|---|---|---|
| P0 | The live domain still serves and indexes the old deepfake-first site. | The new enterprise pages return `404` in production and cannot rank, receive links, or appear in crawls. | Deploy the expanded Next.js build to the production Vercel project, then request re-crawling of the homepage, sitemap, and priority sector pages in Google Search Console. |
| P0 | Existing legacy pages use deepfake-first language that conflicts with the new category. | Search engines and buyers receive mixed entity and topical signals. | Update retained legacy pages in the next content pass, or use permanent redirects where a new page has replaced the old search intent. Do not delete useful pages without an intentional URL map. |
| P0 | Source metadata has no defined Open Graph image or Twitter image in the root metadata object. | Shared links may have an incomplete or inconsistent preview after deployment. | Add an owner-approved 1200×630 social image and assign `openGraph.images` plus `twitter.card`, `twitter.title`, `twitter.description`, and `twitter.images`. |
| P1 | Root metadata has no explicit homepage canonical, while individual core pages have canonicals. | Explicit self-canonicals simplify auditing and reduce ambiguity as routes evolve. | Add `alternates: { canonical: "/" }` to root metadata. |
| P1 | Several public legacy routes rely on the generic site title and description. | About, contact, careers, legal, older research details, and selected blog pages need intent-specific snippets. | Add concise route-level title, description, and canonical metadata for every indexable public route. |
| P1 | FAQ structured data is emitted from the root layout and therefore appears on every page. | FAQ markup should represent visible question-and-answer content on the page where it is supplied; global reuse can be ignored or considered inconsistent. [2] | Move FAQ structured data to the page that visibly contains the corresponding questions, or add the same visible FAQ section wherever it is emitted. |
| P1 | Sitemap `lastModified` uses the build-time current date for all pages. | Repeatedly changing every URL date can make the signal less trustworthy as a content-change indicator. | Use real editorial modification dates where available, or omit `lastModified` where source-of-truth dates do not exist. [3] |
| P2 | The site needs more original, durable decision-support content for each priority sector. | The new category will require depth beyond service pages to earn topical relevance and qualified discovery. | Publish verified field briefs, governance checklists, workflow templates, and research summaries tied to financial services, insurance, media, government, and flexible workspaces. |
| P2 | Search visibility, user behavior, backlinks, and Core Web Vitals cannot be assessed from source. | Technical readiness does not prove rankings or commercial acquisition performance. | Connect Google Search Console, Bing Webmaster Tools, GA4 or equivalent analytics, and monitor mobile Core Web Vitals after deployment. |

## Recommended content architecture

The priority should be **topic clusters**, not generic keyword volume. Each sector page should become the hub for a small set of original, genuinely useful resources. For example, financial services can link to identity-evidence review, payment-instruction review, high-risk onboarding, and the existing NACHA resource. Media can link to source-media review, editorial escalation, corrections workflow, and a media-evidence checklist. Flexible workspaces can develop content around member onboarding, visitor exceptions, vendor review, and community-safety incidents.

Each article should answer one operational question, cite only verified sources, name the intended decision owner, and link back to its relevant industry page, capability page, and assessment path. This approach strengthens internal linking without creating thin, repetitive SEO pages.

## Deployment and measurement checklist

After production deployment, submit `https://www.deeptrack.io/sitemap.xml` in Google Search Console and Bing Webmaster Tools. Inspect the live homepage, five industry pages, assessment, engagements, partners, product API, research, and news URLs. Verify their canonical URL, title, description, rendered H1, HTTP status, and indexability. Then monitor the query mix to ensure impressions gradually move from only deepfake-detection terms toward the intended enterprise due-diligence, identity, media-evidence, and workflow terms.

Do not treat a short-term ranking change as proof of failure or success. The useful signals are whether the new URLs become indexed, whether older pages consolidate rather than compete, whether relevant queries begin to appear, and whether organic visitors reach assessment and contact journeys.

## Evidence reviewed

The audit reviewed the live homepage, live robots file, live sitemap, live search-result snippets, the expanded source’s root metadata, sitemap, robots configuration, homepage internal linking, public route status, and production-mode build output. It did not have authenticated access to Google Search Console, Bing Webmaster Tools, analytics, backlink tools, or real-user performance data.

## References

[1] [Deeptrack live homepage](https://www.deeptrack.io/), [live robots file](https://www.deeptrack.io/robots.txt), and [live sitemap](https://www.deeptrack.io/sitemap.xml), reviewed on 18 August 2026.

[2] [Google Search Central: FAQ structured data](https://developers.google.com/search/docs/appearance/structured-data/faqpage).

[3] [Google Search Central: Build and submit a sitemap](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap).
