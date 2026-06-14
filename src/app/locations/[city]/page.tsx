import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import {
  locations,
  getLocationBySlug,
  getLocationMetadata,
  industryUseCaseRoutes,
  industryLabels,
} from '@/lib/seo/locations'
import { Navbar } from '@/components/landingPage/navs/navBar'
import { WaitlistButton } from '@/components/landingPage/waiting-list'
import UseCaseFeatureInformation from '@/components/use-case/useCaseFeatureInformation'
import FinalCTASection from '@/components/Footer'

export function generateStaticParams() {
  return locations.map((loc) => ({ city: loc.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: { city: string }
}): Promise<Metadata> {
  const location = getLocationBySlug(params.city)
  if (!location) {
    return {
      title: 'Location Not Found | Deeptrack',
      description: 'The location page you are looking for could not be found.',
    }
  }
  return getLocationMetadata(location)
}

export default function LocationPage({
  params,
}: {
  params: { city: string }
}) {
  const location = getLocationBySlug(params.city)

  if (!location) {
    notFound()
  }

  const useCaseRoute = industryUseCaseRoutes[location.primaryIndustry]
  const industryLabel = industryLabels[location.primaryIndustry]

  const features = [
    {
      title: `Deepfake Detection Built for ${location.country}`,
      description: `Deeptrack's AI models identify manipulated video, cloned voices, and forged documents used in fraud targeting organizations across ${location.city} and ${location.country}.`,
    },
    {
      title: 'Real-Time Verification',
      description: `Scan media, identity documents, and voice recordings in real time to stop deepfake-driven fraud before it reaches your customers or executives in ${location.city}.`,
    },
    {
      title: 'Compliance-Ready Reporting',
      description: `Generate audit trails and verification reports aligned with regional regulatory expectations for ${industryLabel.toLowerCase()} organizations operating in ${location.country}.`,
    },
  ]

  const localBusinessJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    serviceType: 'AI Deepfake Detection',
    provider: {
      '@type': 'Organization',
      name: 'Deeptrack Inc.',
      url: 'https://www.deeptrack.io',
    },
    areaServed: {
      '@type': 'City',
      name: location.city,
      containedInPlace: {
        '@type': 'Country',
        name: location.country,
      },
    },
    description: `Enterprise AI deepfake detection and content authenticity verification for organizations in ${location.city}, ${location.country}.`,
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <div className="space-y-6">
        <Navbar />

        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl space-y-8 text-center mx-auto">
            <p className="uppercase tracking-[0.2em] text-xs text-gray-500">
              {location.region}
            </p>

            <h1 className="text-5xl lg:text-6xl font-light text-gray-800 leading-[1.1]">
              Deepfake Detection in {location.city}, {location.country}
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              {location.localAngle}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 items-center justify-center">
              <WaitlistButton id={`btn-location-${location.slug}`} />
              <Link
                href={useCaseRoute}
                className="px-6 py-3 border border-gray-700 text-white rounded-lg bg-[#1E88C8] hover:bg-[#166DA3] transition text-center"
              >
                {industryLabel} Solutions
              </Link>
            </div>
          </div>
        </section>

        <div className="bg-customTeal max-w-7xl mx-auto mt-4" style={{ height: '1px' }} />

        <UseCaseFeatureInformation features={features} title={''} description={''} />

        <section className="max-w-5xl mx-auto px-6 pb-20 text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-4 tracking-tight">
            Serving Organizations Across {location.region}
          </h2>
          <p className="max-w-3xl mx-auto text-lg text-gray-700">
            Deeptrack provides global enterprise AI trust infrastructure,
            with deepfake detection, synthetic identity verification, and
            content authenticity tools deployed for clients across{' '}
            {location.region} and worldwide.
          </p>
        </section>
      </div>
      <FinalCTASection />
    </>
  )
}