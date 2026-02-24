import React from 'react'
import Image from 'next/image'
import Head from 'next/head';

import { Navbar } from '@/components/landingPage/navs/navBar';
import { WaitlistButton } from '@/components/landingPage/waiting-list';
import FeatureHighlight from '@/components/use-case/feature-highlight';
import UseCaseFeatureInformation from '@/components/use-case/useCaseFeatureInformation';
import UseCaseFooterBanner from '@/components/use-case/useCaseFooterBanner';

const features = [
    {
        title: 'Credit-Based Fair Pricing',
        description: 'Users purchase credits and consume them with each scan. Fair, transparent pricing that scales with usage — no hidden fees, no wasted subscriptions. Organizations only pay for what they use.'
    },
    {
        title: 'Scalable Bulk Processing',
        description: 'Upload hundreds of media files simultaneously. Worker powered background processing ensures asynchronous verification without blocking the user interface, enabling enterprise grade throughput.'
    },
    {
        title: 'Comprehensive Enterprise Reporting',
        description: 'Export PDF reports, audit trails, confidence scores, and detected issues. Professional documentation for compliance, investigations, and stakeholder communication.'
    }
]

const GothamPage = () => {
  return (
    <>
      <Head>
        <title>deeptrack Gotham  — Media Verification SaaS Platform | deeptrack</title>
        <meta 
          name="description" 
          content="deeptrack Gotham: A modern SaaS platform for large-scale media verification. Credit-based scanning, bulk processing, worker architecture, and comprehensive PDF reporting for enterprises." 
        />
        <meta property="og:title" content="deeptrack Gotham — Enterprise Media Verification Platform" />
        <meta property="og:description" content="Scale media authenticity verification with deeptrack Gotham — credit-based pricing, bulk scanning, and professional reporting." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://www.deeptrack.io/gotham" />
      </Head>
      
      <div className='space-y-6'>
          <Navbar/>
          
          {/* Hero Section */}
          <section className="grid lg:grid-cols-2 gap-6 max-w-7xl mx-auto mt-4 min-h-[50vh] p-4 bg-gray-50">
              <div className="flex flex-col justify-center items-centertext-center lg:items-start lg:text-left m-auto space-y-4">
                    <p className='font-light text-lg text-black'>Solution:</p>
                  <h1 className="text-4xl sm:text-5xl font-light text-gray-900">deeptrack Gotham</h1>
                  <p className="text-lg leading-relaxed max-w-lg text-gray-800">
                      A modern SaaS platform for large scale media verification. Credit based scanning, bulk processing, worker powered architecture, and professional reporting.
                  </p>
                  <div className="flex gap-3 flex-col sm:flex-row">
                    <WaitlistButton id='btn-gotham-enterprise'/>
                    <a
                      href="https://gotham.deeptrack.io"
                      target="_blank"
                      rel="noreferrer"
                      className="bg-sky-600 text-white px-4 py-3 rounded-lg hover:bg-sky-700 transition font-light text-center"
                    >
                      Visit Gotham
                    </a>
                  </div>
              </div>

              <div className="flex justify-center lg:justify-end p-6 mt-6">
                  <Image 
                    src="/Vector.svg"
                    alt="Gotham Enterprise Media Verification"
                    width={400}
                    height={300}
                    className="customTeal opacity-60"
                  />
              </div>
          </section>
          <div className='bg-customTeal max-w-7xl mx-auto mt-4' style={{ height: '1px' }} />

          {/* Feature Highlight */}
          <FeatureHighlight
              title="Enterprise Grade Media Verification at Scale"
              subtitle='Credit Based SaaS with Background Processing'
              description="deeptrack Gotham, delivers a complete verification platform combining modern SaaS architecture with sophisticated media analysis. Users purchase credits that fuel unlimited scans, while a worker based architecture ensures bulk operations process asynchronously without impacting performance. From payment processing  to audit trail logging, every component is built for enterprise reliability and scalability."
              imageSrc='/Vector.svg'
              imageAlt='deeptrack Gotham Platform Architecture'
          />
            <Image
                src="/Vector.svg"
                alt="Decorative"
                width={400}
                height={300}
                className="absolute -right-72 md:-right-20 -z-10 customTeal"
                />
          
          {/* Key Features */}
          <UseCaseFeatureInformation
              features={features} title={''} description={''}
          />
          <Image
              src="/Vector.svg"
              alt="Decorative"
              width={400}
              height={300}
              className="absolute teal-200 -z-10 -left-[150px] rotate-[180deg]"
          />

          {/* Value Section */}
          <UseCaseFooterBanner
              title="Complete Media Verification Ecosystem"
              imageSrc='/Vector.svg'
              imageAlt='deeptrack Gotham Complete Platform' 
              content={[
                  {
                      subtitle: 'Seamless Monetization & User Experience',
                      description: 'Freemium trial accounts let users experience verification immediately. Credit based purchasing aligns pricing with usage, creating transparent, fair value exchange. Webhook verified payments ensure credits are reliably credited, and users see immediate confirmation.',
                  },
                  {
                      subtitle: 'Enterprise Compliance & Documentation',
                      description: 'PDF report generation creates professional documentation for audits and stakeholder communication. Complete audit trails log every verification, every scan, and every transaction. Role-based access (future) will enable teams to collaborate while maintaining security controls.',
                  },
              ]}          
          />

          {/* CTA Section */}
          <section className="py-16 px-4 text-center bg-gray-50">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-light mb-4 text-gray-900">Ready to Scale Your Media Verification?</h2>
              <p className="text-lg text-gray-700 mb-6">deeptrack Gotham powers organizations that need to verify media at scale with reliability, compliance, and ease of use.</p>
              <a 
                href="https://gotham.deeptrack.io" 
                target="_blank" 
                rel="noreferrer"
                className="inline-block bg-sky-600 text-white px-6 py-3 rounded-lg hover:bg-sky-700 transition font-light"
              >
                Launch deeptrack Gotham
              </a>
            </div>
          </section>
      </div>
    </>
  )
}

export default GothamPage;
