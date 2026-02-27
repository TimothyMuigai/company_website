"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function PrivacyPolicy() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-50">

      {/* Header */}
      <div className="sticky top-0 z-10 bg-white border-b">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center">
          <Button
            onClick={() => router.back()}
            className="text-sm"
          >
            ← Back
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">

        {/* Title */}
        <div className="mb-10 text-center">
          <h1 className="text-4xl font-light text-gray-900 mb-3">
            Deeptrack Website Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Last Updated: 26th Feb 2026
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-10 space-y-10 text-gray-700 leading-relaxed">

          {/* 1. Introduction */}
          <section>
            <h2 className="text-xl text-black mb-3">
              1. Introduction
            </h2>
            <p className="mb-3">
              This Website Privacy Policy (“Policy”) describes how <span className="font-bold text-gray-900">Deeptrack LLC</span>. and its affiliated entities (“Deeptrack,” “we,” “us,” or “our”) collect, use, and disclose information about you.
            </p>

            <p className="mb-2 font-medium text-gray-900">
              This Policy applies to information we collect:
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>When you access or use our website and online services (the “Website”)</li>
              <li>When you interact with us in a business capacity (including enterprise clients, vendors, and partners)</li>
              <li>When you communicate with us via email, social media, or customer support</li>
              <li>When you attend Deeptrack events or meetings</li>
            </ul>

            <p className="mt-4">
              Separate agreements may govern privacy practices related to contracted
              enterprise services, including Deeptrack Gotham, Foundry,
              Sentinel, Atlas, and Mirror.
            </p>

            <p className="mt-3">
              We may update this Policy periodically. If we do, we will revise
              the “Last Updated” date above.
            </p>
          </section>

          {/* 2. Information We Collect */}
          <section>
            <h2 className="text-xl text-black mb-3">
              2. Information We Collect
            </h2>

            <p className="mb-4">
              The personal information we collect depends on how you interact with us.
            </p>

            <h3 className="font-medium text-gray-900 mb-2">
              A. Information You Provide to Us
            </h3>
            <p className="mb-2">We collect information you provide directly, including:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name and job title</li>
              <li>Account credentials</li>
              <li>Government-issued ID (when required for identity verification services)</li>
              <li>Photos, videos, audio files, or voice samples submitted for verification</li>
              <li>Any other information you choose to provide</li>
            </ul>

            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              B. Information Collected Automatically
            </h3>
            <p className="mb-2">When you access the Website, we may automatically collect:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>IP address</li>
              <li>Device type and operating system</li>
              <li>Browser type</li>
              <li>Usage activity (pages visited, links clicked, timestamps)</li>
              <li>Referring URLs</li>
            </ul>

            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              C. Cookies and Tracking Technologies
            </h3>
            <p className="mb-2">We use cookies and similar technologies to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Improve Website functionality</li>
              <li>Analyze usage trends</li>
              <li>Enhance security</li>
              <li>Personalize user experience</li>
            </ul>

            <p className="mt-3">
              You may disable cookies in your browser settings, though this may affect functionality.
            </p>

            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              D. Information from Third Parties
            </h3>
            <p className="mb-2">We may receive information from:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Identity verification providers</li>
              <li>Analytics providers</li>
              <li>Enterprise clients (when you are an authorized user of their systems)</li>
              <li>Publicly available sources</li>
            </ul>

            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              E. Information We Derive
            </h3>
            <p className="mb-2">We may generate inferences such as:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Risk scores</li>
              <li>Fraud likelihood indicators</li>
              <li>Deepfake probability assessments</li>
              <li>Approximate geographic location based on IP</li>
            </ul>
          </section>

          {/* 3. How We Use Information */}
          <section>
            <h2 className="text-xl text-black mb-3">
              3. How We Use Information
            </h2>
            <p className="mb-2">We use collected information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide and maintain our services</li>
              <li>Operate Deeptrack Gotham (deepfake detection)</li>
              <li>Operate Deeptrack Foundry (insurance fraud detection)</li>
              <li>Operate Deeptrack Sentinel (AI-powered KYC/KYB)</li>
              <li>Operate Deeptrack Atlas (media verification)</li>
              <li>Operate Deeptrack Mirror (synthetic identity protection)</li>
              <li>Improve and develop new products</li>
              <li>Detect and prevent fraud, abuse, and security incidents</li>
              <li>Communicate with you</li>
              <li>Comply with legal obligations</li>
              <li>Enforce our agreements</li>
            </ul>

            <p className="mt-4">
              We may also create aggregated or de-identified data for research and product improvement.
            </p>
          </section>

          {/* 4. Disclosure */}
          <section>
            <h2 className="text-xl text-black mb-3">
              4. How We Disclose Information
            </h2>
            <p className="mb-2">We may disclose personal information:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>To cloud infrastructure providers (e.g., hosting services)</li>
              <li>To service providers assisting with analytics, security, or customer support</li>
              <li>To enterprise clients when you are using our services on their behalf</li>
              <li>To law enforcement or regulatory authorities when legally required</li>
              <li>In connection with mergers, acquisitions, or financing</li>
              <li>With your consent</li>
            </ul>

            <p className="mt-4 font-medium text-gray-900">
              We do not sell personal information.
            </p>
          </section>

          {/* 5. Data Retention */}
          <section>
            <h2 className="text-xl text-black mb-3">
              5. Data Retention
            </h2>
            <p className="mb-2">We retain personal information only as long as necessary to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide contracted services</li>
              <li>Comply with legal obligations</li>
              <li>Resolve disputes</li>
              <li>Enforce agreements</li>
            </ul>
            <p className="mt-3">
              Retention periods vary depending on service type and jurisdiction.
            </p>
          </section>

          {/* 6. International Transfers */}
          <section>
            <h2 className="text-xl text-black mb-3">
              6. International Data Transfers
            </h2>
            <p>
              Deeptrack operates globally. Information may be processed in jurisdictions outside your country of residence. We implement appropriate safeguards consistent with applicable data protection laws.
            </p>
          </section>

          {/* 7. Rights */}
          <section>
            <h2 className="text-xl text-black mb-3">
              7. Your Privacy Rights
            </h2>
            <p className="mb-2">Depending on your location, you may have rights to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion</li>
              <li>Restrict processing</li>
              <li>Object to certain processing</li>
              <li>Withdraw consent</li>
            </ul>

            <p className="mt-4">
              To exercise these rights, contact: <span className="text-gray-900">privacy@deeptrack.io</span>
            </p>
          </section>

          {/* 8. Security */}
          <section>
            <h2 className="text-xl text-black mb-3">
              8. Security
            </h2>
            <p>
              We implement administrative, technical, and organizational safeguards designed to protect personal information, including encryption, access controls, and monitoring systems.
            </p>
            <p className="mt-3">
              However, no system is completely secure.
            </p>
          </section>

          {/* 9. Contact */}
          <section>
            <h2 className="text-xl text-black mb-3">
              9. Contact Us
            </h2>
            <p>If you have questions about this Policy, contact:</p>
            <div className="bg-gray-50 rounded-lg p-4 border text-sm">
              <p className="font-medium text-gray-900">
                Deeptrack Ltd.
              </p>
              <p>Email: tech@deeptrack.io</p>
              <p>Website: www.deeptrack.io</p>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}