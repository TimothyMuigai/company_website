"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function TermsOfUse() {
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
            Deeptrack General Terms of Use
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

            <h3 className="font-medium text-gray-900 mb-2">
              1.1 Scope
            </h3>
            <p className="mb-3">
              These General Terms of Use (“General Terms”) govern access to and use of:
            </p>
            <ol className="list-[lower-alpha] pl-6 space-y-1">
              <li>All services (“Services”) provided by Deeptrack LLC. (“Deeptrack,” “Company,” “we,” or “us”) and identified in an accompanying Order Form (“Order Form”); and</li>
              <li>all proprietary software related to or associated with the Services, including but not limited to Deeptrack Gotham, Deeptrack Foundry, Deeptrack Sentinel, Deeptrack Atlas, Deeptrack Mirror, APIs, dashboards, web applications, models, algorithms, data pipelines, and documentation (collectively, the “Software”).</li>
            </ol>
            <p className="mt-3">
              These General Terms apply regardless of contract length.
            </p>

            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              1.2 Agreement Structure
            </h3>
            <p className="mb-2">These General Terms are incorporated into the Order Form.</p>
            <p>
              Together, the General Terms, Order Form, Data Processing Addendum (“DPA”), and Service Level Agreement (“SLA”) constitute the binding agreement (“Agreement”) between Deeptrack and the entity identified as “Customer.”
            </p>
            <p className="mt-2">Access or use of the Services constitutes acceptance of this Agreement.</p>
            
            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              1.3 Updates
            </h3>
            <p>
              Deeptrack may update these General Terms by publishing revised versions on its website. Updates become effective thirty (30) days after publication unless accepted earlier by the Customer.
            </p>
            <p className="mt-2">Continued use after that period constitutes acceptance.</p>
          </section>

          {/* 2. Scope of Use */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              2. Scope of Use
            </h2>

            <h3 className="font-medium text-gray-900 mb-2">
              2.1 License Grant
            </h3>
            <p className="mb-2">Subject to payment of applicable fees and compliance with this Agreement, Deeptrack grants Customer a limited, non-exclusive, non-transferable, non-sublicensable license during the Term to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access and use the Services for internal business purposes</li>
              <li>Use the Software solely in connection with the Services</li>
            </ul>
            <p className="mt-3">
              No ownership rights are transferred.
            </p>

            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              2.2 Authorized Users
            </h3>
            <p className="mb-2">
              “Authorized Users” means employees or contractors of Customer who are assigned login credentials.
            </p>

            <p className="mb-2">Customer is responsible for:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Protecting account credentials</li>
              <li>Preventing unauthorized access</li>
              <li>All activities conducted under its accounts</li>
            </ul>

            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              2.3 Suspension
            </h3>
            <p className="mb-2">
              Deeptrack may suspend access if:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Required by law</li>
              <li>There is a security threat</li>
              <li>Customer breaches this Agreement</li>
              <li>Fees are unpaid</li>
            </ul>
          </section>

          {/* 3. Customer Restrictions */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              3. Customer Restrictions
            </h2>
            <p className="mb-2">Customer shall not:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Reverse engineer, decompile, or attempt to extract source code</li>
              <li>Build a competing product using the Services</li>
              <li>Resell, sublicense, or distribute the Services</li>
              <li>Perform benchmarking without written consent</li>
              <li>Circumvent security protections</li>
              <li>Use the Services in violation of applicable law</li>
            </ul>
          </section>

          {/* 4. Compliance */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              4. Compliance with Laws
            </h2>
            <p className="mb-2">Customer agrees to comply with all applicable:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Data protection laws</li>
              <li>Sanctions and export control laws</li>
              <li>Anti-fraud and cybersecurity regulations</li>
            </ul>
            <p className="mt-3">
              Customer represents it is not on any restricted sanctions list.
            </p>
          </section>

          {/* 5. Confidentiality */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              5. Confidentiality
            </h2>           

            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              5.1 Definition
            </h3>
            <p className="mb-2">
              “Confidential Information” means non-public business, technical, or financial information disclosed by either party.
            </p>
            <p className="mb-2">Deeptrack Confidential Information includes:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Platform architecture</li>
              <li>Detection methodologies</li>
              <li>Model logic</li>
              <li>Performance metrics</li>
            </ul>

            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              5.2 Obligations
            </h3>
            <p className="mb-2">
              Each party shall:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Protect Confidential Information with reasonable care</li>
              <li>Use it only to perform obligations under the Agreement</li>
              <li>Disclose only to personnel with a need to know</li>
            </ul>
          </section>

          {/* 6. Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              6. Intellectual Property
            </h2>

            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              6.1 Ownership
            </h3>
            <p className="mb-2">
              Deeptrack retains all right, title, and interest in:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Services</li>
              <li>The Software</li>
              <li>All models, algorithms, datasets, and detection systems</li>
              <li>All improvements and enhancements</li>
            </ul>
            <p className="mt-3 font-medium text-gray-900">
              No implied licenses are granted.
            </p>
            
            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              6.2 Customer Data
            </h3>
            <p className="mb-2">
              Customer retains ownership of data submitted to the platform (“Customer Data”).
            </p>
            <p className="mb-2">
              Customer grants Deeptrack a limited license to process Customer Data solely to:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide the Services</li>
              <li>Improve system performance</li>
              <li>Maintain platform security</li>
            </ul>
            <p className="mt-3 font-medium text-gray-900">
              Deeptrack will not use Customer’s identifiable media for model training unless expressly authorized in writing.
            </p>
            <p className="mt-3 font-medium text-gray-900">
              Deeptrack may use aggregated or de-identified data for analytics and product improvement.
            </p>
          </section>

          {/* 7. Term & Termination */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              7. Term and Termination
            </h2>

            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              7.1 Term
            </h3>
            <p className="mb-2">
              The Agreement begins on the Effective Date and continues for the Initial Term specified in the Order Form.
            </p>
            <p className="mb-2">
              It automatically renews unless either party provides 30 days’ written notice before renewal.
            </p>

            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              7.2 Termination for Cause
            </h3>
            <p className="mb-2">
              Either party may terminate if the other materially breaches the Agreement and fails to cure within 30 days.
            </p>
            
            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              7.3 Effect of Termination
            </h3>
            <p className="mb-2">
              Upon termination:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Customer must cease use of the Services</li>
              <li>Outstanding fees become due</li>
              <li>Confidential Information must be returned or destroyed</li>
            </ul>
          </section>

          {/* 8. Fees */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              8. Fees and Payment
            </h2>
            <p>
              Customer agrees to pay all fees specified in the Order Form. <br />
              Late payments may accrue interest at 1.5% per month or the maximum allowed by law. <br />
              Customer is responsible for applicable taxes.
            </p>
          </section>

          {/* 9. Disclaimers */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              9. Warranties and Disclaimers
            </h2>
            
            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              9.1 Mutual Warranties
            </h3>
            <p className="mb-2">
              Each party represents it has authority to enter into this Agreement.
            </p>
            
            <h3 className="font-medium text-gray-900 mt-6 mb-2">
              9.2 Service Disclaimer
            </h3>
            <p className="mb-2">
              EXCEPT AS EXPRESSLY PROVIDED:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Services are provided “AS IS”</li>
              <li>Deeptrack does not guarantee that detection results will be error-free</li>
              <li>AI outputs are probabilistic assessments, not legal determinations</li>
            </ul>
            <p className="mb-2">Customer is responsible for decisions made using the Services.</p>
          </section>

          {/* 10. Indemnification */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              10. Indemnification
            </h2>
            <p>
              Customer agrees to indemnify Deeptrack for claims arising from:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Customer misuse</li>
              <li>Violation of law</li>
              <li>Unauthorized content</li>
            </ul>
            <p className="mt-2">Deeptrack agrees to indemnify Customer for third-party IP claims related to the unmodified Software.</p>
          </section>

          {/* 11. Liability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              11. Limitation of Liability
            </h2>
            <p className="font-medium text-gray-900">
              TO THE MAXIMUM EXTENT PERMITTED BY LAW:
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Deeptrack shall not be liable for indirect, incidental, or consequential damages</li>
              <li>Aggregate liability shall not exceed the total fees paid by Customer in the preceding 12 months</li>
            </ul>
            <p className="mt-2">These limitations do not apply to willful misconduct or confidentiality breaches.</p>
          </section>

          {/* Force Majeure */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              12. Force Majeure
            </h2>
            <p>
              Deeptrack is not liable for delays caused by events beyond reasonable control, including natural disasters, cyberattacks, pandemics, or government actions.
            </p>
          </section>
          
          {/* Publicity */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              13. Publicity
            </h2>
            <p>
              Deeptrack may reference Customer’s name and logo in marketing materials unless otherwise agreed in writing.
            </p>
          </section>
          
          {/* Governing Law */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              14. Governing Law
            </h2>
            <p className="mb-2">
              This Agreement shall be governed by the laws of:
            </p>
            <p className="mt-2 text-black">
              [Choose One Based on Your Entity]
            </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>The Republic of Kenya</li>
              <li>The State of Texas, United States</li>
            </ul>
            <p className="mt-2">Disputes shall be resolved exclusively in the courts of the selected jurisdiction.</p>
          </section>

          {/* Entire Agreement */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 mb-3">
              15. Entire Agreement
            </h2>
            <p>
              This Agreement constitutes the entire understanding between the parties and supersedes prior agreements
            </p>
          </section>

        </div>
      </div>
    </div>
  );
}