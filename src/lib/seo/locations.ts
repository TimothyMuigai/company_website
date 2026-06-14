import type { Metadata } from 'next'

const BASE_URL = 'https://www.deeptrack.io'

export interface LocationData {
  slug: string
  city: string
  country: string
  region: string // e.g. "East Africa", "Western Europe", "North America"
  // A short locally-relevant framing sentence used in the hero/intro.
  localAngle: string
  // Industry focus most relevant to this market (drives which use-case CTAs show)
  primaryIndustry: 'finance' | 'government' | 'media' | 'insurance' | 'executive'
}

export const locations: LocationData[] = [
  {
    slug: 'nairobi-kenya',
    city: 'Nairobi',
    country: 'Kenya',
    region: 'East Africa',
    localAngle:
      "Kenya's fast-growing fintech and mobile money sector faces rising deepfake-enabled fraud targeting KYC onboarding and customer support channels.",
    primaryIndustry: 'finance',
  },
  {
    slug: 'lagos-nigeria',
    city: 'Lagos',
    country: 'Nigeria',
    region: 'West Africa',
    localAngle:
      "Nigeria's banking and fintech sector is a prime target for synthetic identity fraud and deepfake voice scams during account opening and wire transfers.",
    primaryIndustry: 'finance',
  },
  {
    slug: 'johannesburg-south-africa',
    city: 'Johannesburg',
    country: 'South Africa',
    region: 'Southern Africa',
    localAngle:
      'South African financial institutions and insurers face increasing exposure to AI-generated documents and deepfake video calls used in claims and onboarding fraud.',
    primaryIndustry: 'insurance',
  },
  {
    slug: 'london-united-kingdom',
    city: 'London',
    country: 'United Kingdom',
    region: 'Western Europe',
    localAngle:
      'As a global financial hub, London-based banks and asset managers are high-value targets for deepfake CEO fraud and synthetic media disinformation campaigns.',
    primaryIndustry: 'finance',
  },
  {
    slug: 'new-york-united-states',
    city: 'New York',
    country: 'United States',
    region: 'North America',
    localAngle:
      'New York financial institutions face mounting pressure to meet NACHA 2026 fraud monitoring requirements while defending against executive impersonation deepfakes.',
    primaryIndustry: 'finance',
  },
  {
    slug: 'washington-dc-united-states',
    city: 'Washington, D.C.',
    country: 'United States',
    region: 'North America',
    localAngle:
      'Federal agencies and government contractors in Washington, D.C. require deepfake detection to protect against disinformation and identity fraud in public sector systems.',
    primaryIndustry: 'government',
  },
  {
    slug: 'toronto-canada',
    city: 'Toronto',
    country: 'Canada',
    region: 'North America',
    localAngle:
      "Canada's major banks headquartered in Toronto are adapting fraud monitoring programs to address AI-generated identity documents and voice cloning attacks.",
    primaryIndustry: 'finance',
  },
  {
    slug: 'dubai-united-arab-emirates',
    city: 'Dubai',
    country: 'United Arab Emirates',
    region: 'Middle East',
    localAngle:
      "Dubai's position as a global financial and media hub makes its institutions frequent targets for deepfake-driven investment scams and synthetic media fraud.",
    primaryIndustry: 'finance',
  },
  {
    slug: 'singapore',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Southeast Asia',
    localAngle:
      "Singapore's financial regulators are increasing scrutiny of AI-generated fraud, pushing banks and fintechs to adopt deepfake detection in KYC and transaction monitoring.",
    primaryIndustry: 'finance',
  },
  {
    slug: 'mumbai-india',
    city: 'Mumbai',
    country: 'India',
    region: 'South Asia',
    localAngle:
      "India's booming digital payments ecosystem, centered in Mumbai, faces a surge in deepfake video KYC fraud and voice cloning scams targeting bank customers.",
    primaryIndustry: 'finance',
  },
  {
    slug: 'singapore-media',
    city: 'Singapore',
    country: 'Singapore',
    region: 'Southeast Asia',
    localAngle:
      "Southeast Asian media organizations based in Singapore need content authenticity verification to combat AI-generated misinformation during elections and breaking news cycles.",
    primaryIndustry: 'media',
  },
  {
    slug: 'sydney-australia',
    city: 'Sydney',
    country: 'Australia',
    region: 'Oceania',
    localAngle:
      'Australian banks and insurers in Sydney are tightening fraud controls against deepfake-enabled identity theft and synthetic document submissions.',
    primaryIndustry: 'insurance',
  },
]

export function getLocationBySlug(slug: string): LocationData | undefined {
  return locations.find((loc) => loc.slug === slug)
}

export function getLocationMetadata(location: LocationData): Metadata {
  const url = `${BASE_URL}/locations/${location.slug}`
  const title = `Deepfake Detection in ${location.city}, ${location.country} | Deeptrack`
  const description = `Enterprise AI deepfake detection and content authenticity verification for organizations in ${location.city}, ${location.country}. ${location.localAngle}`
  const keywords = [
    `deepfake detection ${location.city}`,
    `deepfake detection ${location.country}`,
    `AI deepfake detection ${location.city}`,
    `enterprise deepfake detection ${location.country}`,
    `synthetic media detection ${location.city}`,
    `deepfake fraud prevention ${location.country}`,
    `content authenticity platform ${location.city}`,
  ]

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      title,
      description,
      url,
      type: 'website',
      images: [
        {
          url: '/step5.jpeg',
          width: 1200,
          height: 630,
          alt: `Deeptrack — Deepfake Detection in ${location.city}`,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ['/step5.jpeg'],
    },
  }
}

// Map a location's primary industry to its corresponding use-case route,
// for "learn more" CTAs on the location page.
export const industryUseCaseRoutes: Record<LocationData['primaryIndustry'], string> = {
  finance: '/use-case/finance-use-case',
  government: '/use-case/government-use-case',
  media: '/use-case/media-use-case',
  insurance: '/use-case/insurance-use-case',
  executive: '/use-case/executive-identity-shielding',
}

export const industryLabels: Record<LocationData['primaryIndustry'], string> = {
  finance: 'Financial Services',
  government: 'Government',
  media: 'Media',
  insurance: 'Insurance',
  executive: 'Executive Protection',
}
