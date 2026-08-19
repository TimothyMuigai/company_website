import { ConfiguredApplicationProviders } from "@/components/ConfiguredApplicationProviders";
import type { Metadata } from "next";
import { Outfit, Space_Grotesk } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", weight: ["400", "500", "600", "700"] });
const spaceGrotesk = Space_Grotesk({ subsets: ["latin"], variable: "--font-space-grotesk", weight: ["400", "500", "600", "700"] });

/** Deeptrack enterprise due-diligence design: accurate organization metadata without unverified regulatory or performance claims. */
export const dynamic = "force-dynamic";
const socialImage = { url: "/seo/deeptrack-enterprise-due-diligence-social.jpg", width: 1600, height: 840, alt: "Enterprise workspace representing evidence-led due diligence" };
export const metadata: Metadata = { metadataBase: new URL("https://www.deeptrack.io"), title: { default: "Enterprise AI, Identity & Media Due Diligence | Deeptrack", template: "%s | Deeptrack" }, description: "Enterprise due diligence for identity, media, documents, and AI-generated evidence.", alternates: { canonical: "/" }, openGraph: { type: "website", siteName: "Deeptrack", title: "Enterprise AI, Identity & Media Due Diligence | Deeptrack", description: "Assess the evidence behind high-consequence digital decisions.", images: [socialImage] }, twitter: { card: "summary_large_image", site: "@deeptrck", creator: "@deeptrck", title: "Enterprise AI, Identity & Media Due Diligence | Deeptrack", description: "Assess the evidence behind high-consequence digital decisions.", images: [socialImage.url] }, robots: { index: true, follow: true } };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const hasConvexConfiguration = Boolean(process.env.NEXT_PUBLIC_CONVEX_URL);
  const hasClerkConfiguration = Boolean(process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY);
  return (
    <html lang="en" className={`${outfit.variable} ${spaceGrotesk.variable}`}>
      <body className="bg-[#ffffff] font-[family-name:var(--font-outfit)] text-[#333333] antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Deeptrack Inc.',
              url: 'https://www.deeptrack.io',
              logo: 'https://www.deeptrack.io/logos/deeptrack-high-resolution-logo-transparent.png',
              description: 'Enterprise due diligence for identity, media, and AI-generated evidence.',
              foundingDate: '2024',
              address: {
                '@type': 'PostalAddress',
                streetAddress: 'Nafasi Connection, 7 Mpaka Road, Westlands',
                addressLocality: 'Nairobi',
                addressCountry: 'KE',
              },
              contactPoint: [
                {
                  '@type': 'ContactPoint',
                  telephone: '+254796414653',
                  contactType: 'sales',
                  email: 'info@deeptrack.io',
                  areaServed: 'Worldwide',
                },
              ],
              sameAs: [
                'https://x.com/deeptrck',
                'https://www.linkedin.com/company/deeptrck/',
              ],
            }),
          }}
        />
        {hasConvexConfiguration ? <ConfiguredApplicationProviders useClerk={hasClerkConfiguration}>{children}</ConfiguredApplicationProviders> : children}
      </body>
    </html>
  );
}
