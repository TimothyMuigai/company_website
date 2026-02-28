import React from 'react'
import Head from 'next/head';

import { Navbar } from '@/components/landingPage/navs/navBar';
import { WaitlistButton } from '@/components/landingPage/waiting-list';
import UseCaseFeatureInformation from '@/components/use-case/useCaseFeatureInformation';
import UseCaseFooterGothamBanner from '@/components/layout/UseCaseFooterGothamBanner';
import FeatureHighlightGotham from '@/components/layout/FeatureHighlightGotham';

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
        <Navbar />
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-6 py-20">
          <div className="max-w-3xl space-y-8 text-center mx-auto">

            <p className="uppercase tracking-[0.2em] text-xs text-gray-500">
              Enterprise Solution
            </p>

            <h1 className="text-5xl lg:text-6xl font-light text-gray-900 leading-[1.1]">
              deeptrack Gotham
            </h1>

            <p className="text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
              A modern SaaS platform built for large-scale media verification.
              Credit-based scanning, bulk processing, worker driven architecture,
              and compliance-ready reporting engineered for institutional environments.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2 items-center justify-center">
              <WaitlistButton id="btn-gotham-enterprise" />

              <a
                href="https://gotham.deeptrack.io"
                target="_blank"
                rel="noreferrer"
                className="px-6 py-3 border border-gray-700 text-white rounded-lg bg-[#1E88C8] hover:bg-[#166DA3] transition text-center"
              >
                Visit Platform
              </a>
            </div>
          </div>
        </section>

        <div className='bg-customTeal max-w-7xl mx-auto mt-4' style={{ height: '1px' }} />

        {/* Feature Highlight */}
        <FeatureHighlightGotham
          title="Enterprise Grade Media Verification at Scale"
          subtitle='Credit Based SaaS with Background Processing'
          description="deeptrack Gotham, delivers a complete verification platform combining modern SaaS architecture with sophisticated media analysis. Users purchase credits that fuel unlimited scans, while a worker based architecture ensures bulk operations process asynchronously without impacting performance. From payment processing  to audit trail logging, every component is built for enterprise reliability and scalability."
        />
        {/* Key Features */}
        <UseCaseFeatureInformation
          features={features} title={''} description={''}
        />

        {/* Value Section */}
        <UseCaseFooterGothamBanner
          title="Complete Media Verification Ecosystem"
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
      </div>
    </>
  )
}

export default GothamPage;
