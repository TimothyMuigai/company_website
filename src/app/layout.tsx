import { ConvexClientProvider } from "@/lib/convex-client-provider";
import { AuthProvider } from "@/lib/auth-context";
import { PostHogProvider } from "@/components/observability/PostHogProvider";
import { ClerkProvider } from "@clerk/nextjs";
import FinalCTASection from "@/components/Footer";
import type { Metadata } from "next";
import { Outfit } from "next/font/google";
import { rootMetadata } from "@/lib/seo/metadata";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400"] });

export const metadata: Metadata = rootMetadata;

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={outfit.className}>
      <body className="bg-[#ffffff] text-white antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'Deeptrack Inc.',
              url: 'https://www.deeptrack.io',
              logo: 'https://www.deeptrack.io/logos/deeptrack-high-resolution-logo-transparent.png',
              description:
                'Global enterprise AI deepfake detection and content authenticity platform for financial institutions, media organizations, and governments worldwide.',
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'FAQPage',
              mainEntity: [
                {
                  '@type': 'Question',
                  name: 'What does Deeptrack do?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Deeptrack deploys autonomous AI agents to detect deepfakes, verify digital content, and protect organizations from synthetic media fraud.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Is Deeptrack NACHA 2026 compliant?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Deeptrack Gotham provides the risk-based fraud monitoring and synthetic identity detection required under NACHA 2026 Phase 2 rules.',
                  },
                },
                {
                  '@type': 'Question',
                  name: 'Which industries does Deeptrack serve?',
                  acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Deeptrack serves financial services, media, government, insurance, and enterprise security teams worldwide.',
                  },
                },
              ],
            }),
          }}
        />
        <ClerkProvider>
          <PostHogProvider>
            <ConvexClientProvider>
              <AuthProvider>
                {children}
                <FinalCTASection isGlobal />
              </AuthProvider>
            </ConvexClientProvider>
          </PostHogProvider>
        </ClerkProvider>
      </body>
    </html>
  );
}