/**
 * SEO intent: give crawler-rendered routes unique titles, descriptions, canonical URLs,
 * Open Graph data, and accurate structured data without adding unverified claims.
 */
import { useEffect } from "react";

const SITE_URL = "https://studio.deeptrack.io";
const DEFAULT_IMAGE = "/assets/deeptrack-hero-signal-field.jpg";

const pageLabels: Record<string, string> = {
  "/services": "Services",
  "/case-studies": "Case studies",
  "/process": "Process",
  "/insights": "Insights",
  "/about": "About",
  "/faq": "FAQ",
  "/contact": "Contact",
  "/trust-security": "Trust & security",
};

function breadcrumbSchema(path: string, title: string) {
  const segments = path.split("/").filter(Boolean);
  const entries = [{ label: "Home", path: "/" }];
  if (segments[0]) entries.push({ label: pageLabels[`/${segments[0]}`] || segments[0], path: `/${segments[0]}` });
  if (segments[1]) entries.push({ label: title.replace(" | Deeptrack Studio", ""), path });
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: entries.map((entry, index) => ({ "@type": "ListItem", position: index + 1, name: entry.label, item: `${SITE_URL}${entry.path}` })),
  };
}

type SeoProps = {
  title: string;
  description: string;
  path: string;
  schema?: Record<string, unknown> | Array<Record<string, unknown>>;
  noIndex?: boolean;
};

function upsertMeta(selector: string, attribute: "name" | "property", key: string, value: string) {
  let element = document.head.querySelector<HTMLMetaElement>(selector);
  if (!element) {
    element = document.createElement("meta");
    element.setAttribute(attribute, key);
    document.head.appendChild(element);
  }
  element.content = value;
}

export function Seo({ title, description, path, schema, noIndex = false }: SeoProps) {
  useEffect(() => {
    const url = `${SITE_URL}${path}`;
    document.title = title;
    upsertMeta('meta[name="description"]', "name", "description", description);
    upsertMeta('meta[name="robots"]', "name", "robots", noIndex ? "noindex,nofollow" : "index,follow");
    upsertMeta('meta[property="og:title"]', "property", "og:title", title);
    upsertMeta('meta[property="og:description"]', "property", "og:description", description);
    upsertMeta('meta[property="og:url"]', "property", "og:url", url);
    upsertMeta('meta[property="og:type"]', "property", "og:type", "website");
    upsertMeta('meta[property="og:image"]', "property", "og:image", `${SITE_URL}${DEFAULT_IMAGE}`);
    upsertMeta('meta[name="twitter:card"]', "name", "twitter:card", "summary_large_image");
    upsertMeta('meta[name="twitter:title"]', "name", "twitter:title", title);
    upsertMeta('meta[name="twitter:description"]', "name", "twitter:description", description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement("link");
      canonical.rel = "canonical";
      document.head.appendChild(canonical);
    }
    canonical.href = url;

    const existingSchema = document.head.querySelector('script[data-deeptrack-schema="true"]');
    if (existingSchema) existingSchema.remove();
    if (schema || !noIndex) {
      const script = document.createElement("script");
      script.type = "application/ld+json";
      script.dataset.deeptrackSchema = "true";
      script.text = JSON.stringify(schema ? [schema, breadcrumbSchema(path, title)] : breadcrumbSchema(path, title));
      document.head.appendChild(script);
    }
  }, [title, description, path, schema, noIndex]);

  return null;
}

export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Deeptrack Studio",
  url: SITE_URL,
  email: "project@deeptrack.io",
  telephone: "+254720882406",
  description: "Deeptrack Studio is Deeptrack Inc.'s applied AI engineering and consulting arm for organizations solving technically demanding AI, trust, and product problems.",
  areaServed: "Worldwide",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Nairobi",
    addressCountry: "KE",
  },
  parentOrganization: {
    "@type": "Organization",
    name: "Deeptrack Inc.",
  },
};
