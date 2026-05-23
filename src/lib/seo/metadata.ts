import type { Metadata } from 'next'

const BASE_URL = 'https://www.deeptrack.io'

export const SITE_NAME = 'Deeptrack'
export const TAGLINE = 'Enterprise deepfake detection for financial institutions, media, and governments worldwide'
export const DESCRIPTION =
  'Deeptrack is a global enterprise AI trust infrastructure company that deploys autonomous agents to detect deepfakes, verify digital content, and protect financial institutions, media organizations, and governments worldwide from synthetic media fraud. Powered by C2PA provenance standards.'

export const CORE_KEYWORDS = [
  'global enterprise AI trust infrastructure',
  'deepfake detection',
  'deepfake detector',
  'AI deepfake detection',
  'enterprise deepfake detection',
  'deepfake detection API',
  'synthetic media detection',
  'content authenticity platform',
  'AI content verification',
  'C2PA provenance detection',
  'deepfake fraud prevention',
  'AI-powered deepfake detection',
  'deepfake verification tool',
  'deepfake detection software',
  'deepfake identification tool',
  'detect manipulated media',
  'video deepfake detector',
  'global deepfake detection platform',
  'enterprise AI trust infrastructure',
  'KYC deepfake detection',
  'synthetic identity detection',
  'biometric deepfake detection',
  'NACHA 2026 deepfake fraud compliance',
  'ACH fraud deepfake detection',
]

export const rootMetadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: `${SITE_NAME} | ${TAGLINE}`,
    template: `%s | ${SITE_NAME}`,
  },
  description: DESCRIPTION,
  keywords: CORE_KEYWORDS,
  authors: [{ name: 'Deeptrack Inc.', url: BASE_URL }],
  creator: 'Deeptrack Inc.',
  publisher: 'Deeptrack Inc.',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: BASE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} | ${TAGLINE}`,
    description: DESCRIPTION,
    images: [
      {
        url: '/step5.jpeg',
        width: 1200,
        height: 630,
        alt: 'Deeptrack — Enterprise Deepfake Detection Platform',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@deeptrck',
    creator: '@deeptrck',
    title: `${SITE_NAME} | ${TAGLINE}`,
    description: DESCRIPTION,
    images: ['/step5.jpeg'],
  },
  alternates: {
    canonical: BASE_URL,
  },
  icons: {
    icon: [{ url: '/deeptrack-favicon.ico', type: 'image/x-icon' }],
    shortcut: ['/deeptrack-favicon.ico'],
    apple: ['/deeptrack-favicon.ico'],
  },
}

export const homePageMeta: Metadata = {
  title: `${SITE_NAME} | Enterprise Deepfake Detection & AI Content Verification`,
  description: DESCRIPTION,
  keywords: CORE_KEYWORDS,
  alternates: { canonical: `${BASE_URL}/` },
}

export const nacahaMeta: Metadata = {
  title: 'NACHA 2026 Compliance for ACH Fraud & Deepfake Detection | Deeptrack Gotham',
  description:
    'Prepare for the June 19, 2026 NACHA fraud monitoring rules. Learn how Deeptrack Gotham helps banks, fintechs, ODFIs, RDFIs, payroll providers, and ACH originators detect deepfakes, synthetic identities, and AI-generated fraud with forensic audit trails and continuous monitoring.',
  keywords: [
    'NACHA 2026 compliance',
    'NACHA fraud rules',
    'ACH fraud monitoring',
    'deepfake ACH fraud',
    'synthetic identity detection',
    'NACHA June 2026',
    'ACH compliance software',
    'RDFI fraud monitoring',
    'ODFI compliance',
    'payroll fraud detection',
    'AI fraud detection for banks',
  ],
  alternates: { canonical: `${BASE_URL}/nacha` },
  openGraph: {
    title: 'NACHA 2026 Compliance for ACH Fraud & Deepfake Detection | Deeptrack Gotham',
    description:
      'Prepare for the June 19, 2026 NACHA fraud monitoring rules. Learn how Deeptrack Gotham helps banks, fintechs, ODFIs, RDFIs, payroll providers, and ACH originators detect deepfakes, synthetic identities, and AI-generated fraud with forensic audit trails and continuous monitoring.',
    url: `${BASE_URL}/nacha`,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NACHA 2026 Compliance for ACH Fraud & Deepfake Detection | Deeptrack Gotham',
    description:
      'Prepare for the June 19, 2026 NACHA fraud monitoring rules with proactive AI trust and fraud detection from Deeptrack Gotham.',
    images: ['/step5.jpeg'],
  },
}

export const sentinelMeta: Metadata = {
  title: 'Deeptrack Sentinel | AI KYC, KYB, and Synthetic Identity Detection',
  description:
    'Deeptrack Sentinel combines deepfake-resistant identity verification, liveness detection, and synthetic identity detection for banks, fintechs, payroll providers, and regulated enterprises.',
  keywords: [
    'Deeptrack Sentinel',
    'AI KYC solution',
    'KYB compliance platform',
    'synthetic identity detection',
    'deepfake identity verification',
    'biometric fraud detection',
    'KYC deepfake detection',
    'financial services identity verification',
  ],
  alternates: { canonical: `${BASE_URL}/sentinel` },
  openGraph: {
    title: 'Deeptrack Sentinel | AI KYC, KYB, and Synthetic Identity Detection',
    description:
      'Deeptrack Sentinel combines deepfake-resistant identity verification, liveness detection, and synthetic identity detection for banks, fintechs, payroll providers, and regulated enterprises.',
    url: `${BASE_URL}/sentinel`,
    type: 'article',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Deeptrack Sentinel | AI KYC, KYB, and Synthetic Identity Detection',
    description:
      'Deeptrack Sentinel combines deepfake-resistant identity verification, liveness detection, and synthetic identity detection for banks, fintechs, payroll providers, and regulated enterprises.',
    images: ['/step5.jpeg'],
  },
}
