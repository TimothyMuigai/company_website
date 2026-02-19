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
          <h1 className="text-4xl font-bold text-gray-900 mb-3">
            Privacy Policy
          </h1>
          <p className="text-gray-500 text-sm">
            Last Updated: 13 December 2024
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-2xl shadow-sm border p-8 md:p-10 space-y-8 text-gray-700 leading-relaxed">

          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Introduction
            </h2>
            <p>
              deeptrack Solution (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;) is committed to
              protecting your privacy. This Privacy Policy explains how we
              collect, use, and safeguard your personal information when you
              book a demo or interact with our services.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Information We Collect
            </h2>

            <h3 className="font-medium text-gray-900 mb-2">
              Personal Information
            </h3>

            <ul className="list-disc pl-6 space-y-1">
              <li>Full name</li>
              <li>Email address</li>
              <li>Phone number</li>
              <li>Company name</li>
              <li>Job title</li>
            </ul>

            <h3 className="font-medium text-gray-900 mt-4 mb-2">
              Booking Details
            </h3>

            <ul className="list-disc pl-6 space-y-1">
              <li>Preferred demo date and time</li>
              <li>Additional information you provide</li>
            </ul>

            <h3 className="font-medium text-gray-900 mt-4 mb-2">
              Automatically Collected Data
            </h3>

            <ul className="list-disc pl-6 space-y-1">
              <li>IP address</li>
              <li>Browser and device information</li>
              <li>Usage data and cookies</li>
            </ul>
          </section>

          {/* How We Share */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              How We Share Information
            </h2>

            <p className="mb-2">
              We may share your information with:
            </p>

            <ul className="list-disc pl-6 space-y-1">
              <li>Service providers (calendar and meeting platforms)</li>
              <li>Legal authorities when required by law</li>
              <li>Business partners during mergers or acquisitions</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Data Security
            </h2>
            <p>
              We implement industry-standard technical and organizational
              safeguards to protect your information. However, no system can
              guarantee complete security.
            </p>
          </section>

          {/* Retention */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Data Retention
            </h2>
            <p>
              We retain your personal information only as long as necessary for
              business and legal purposes. You may request deletion at any time.
            </p>
          </section>

          {/* Rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Your Rights
            </h2>

            <ul className="list-disc pl-6 space-y-1">
              <li>Access your personal information</li>
              <li>Request correction or deletion</li>
              <li>Opt out of communications</li>
              <li>Request data portability</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Cookies
            </h2>
            <p>
              We use cookies and analytics tools to improve your experience.
              You can control cookies through your browser settings.
            </p>
          </section>

          {/* Changes */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Policy Updates
            </h2>
            <p>
              We may update this policy periodically. Updates will be posted on
              this page with a revised date.
            </p>
          </section>

          {/* Contact */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              Contact Us
            </h2>

            <div className="bg-gray-50 rounded-lg p-4 border text-sm">
              <p className="font-medium text-gray-900">
                deeptrack Solution
              </p>

              <p>Email: info@deeptrack.io</p>
              <p>Phone: +254-796-414-653</p>
            </div>
          </section>

        </div>

      </div>

    </div>
  );
}
