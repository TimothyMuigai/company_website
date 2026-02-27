"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function ServiceLevelAgreement() {
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
                        Deeptrack Service Level Agreement (SLA)
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
                            This Service Level Agreement (“SLA”) sets forth the service level commitments (“Service Levels”) of <span className="font-bold">Deeptrack LLC</span> . (“Deeptrack,” “Company,” “we,” or “us”) in providing the Services under the applicable Order Form and General Terms of Use (the “General Terms”).
                        </p>
                        <p>
                            Capitalized terms not defined in this SLA have the meanings set forth in the General Terms
                        </p>

                        <h3 className="font-medium text-gray-900 mt-6 mb-2">
                            1.2 Measurement Period
                        </h3>
                        <p className="mb-2">Unless otherwise specified:</p>

                        <ul className="list-disc pl-6 space-y-1">
                            <li>Service Levels are measured on a 24/7 basis.</li>
                            <li>Measurements are calculated monthly.</li>
                            <li>All references to months mean calendar months.</li>
                            <li>All references to days mean calendar days.</li>
                            <li>Time references shall be UTC unless otherwise agreed in writing.</li>
                        </ul>

                        <h3 className="font-medium text-gray-900 mt-6 mb-2">
                            1.3 Remediation
                        </h3>
                        <p>
                            Any failure to meet a Service Level will be reasonably addressed by Deeptrack in accordance with this SLA.
                        </p>
                    </section>

                    {/* 2. Service Availability Metrics and Measurements */}
                    <section>
                        <h2 className="text-xl text-black mb-3">
                            2. Service Availability Metrics and Measurements
                        </h2>

                        <h3 className="font-medium text-gray-900 mb-2">
                            2.1 Notification
                        </h3>
                        <p className="mb-2">If Deeptrack fails to meet a Service Level during any month, Deeptrack will notify Customer within thirty (30) days following the end of such month and use commercially reasonable efforts to remediate the issue.</p>

                        <h3 className="font-medium text-gray-900 mb-2">
                            2.2 Uptime Commitment
                        </h3>
                        <p>Deeptrack will use commercially reasonable efforts to ensure that the Services maintain an availability of at least:</p>
                        <p className="mt-2 text-black">99.9% per calendar month</p>
                        <p className="mt-2">(the “Uptime Guarantee”).</p>
                        <p className="mt-2 mb-2">This includes platform components such as:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Web dashboard access</li>
                            <li>API endpoints</li>
                            <li>Media upload and verification processing</li>
                            <li>Authentication and reporting systems</li>
                        </ul>

                        <h3 className="font-medium text-gray-900 mt-6 mb-2">
                            2.3 Definition of Downtime
                        </h3>
                        <p className="mb-2">
                            “Downtime” means any period during which the Services are not accessible or not materially usable by Customer and its Authorized Users, excluding periods resulting from:
                        </p>

                        <ol className="list-[lower-alpha] pl-6 space-y-1">
                            <li> Scheduled Maintenance</li>
                            <li>Force Majeure events</li>
                            <li>Issues attributable to Customer systems or networks</li>
                            <li>Internet service provider failures</li>
                            <li>Third-party applications or integrations</li>
                            <li>Customer misuse of APIs or rate-limit violations</li>
                            <li>Suspension in accordance with the General Terms</li>
                        </ol>

                        <h3 className="font-medium text-gray-900 mt-6 mb-2">
                            2.4 Uptime Calculation
                        </h3>
                        <p className="mb-2">
                            Availability is calculated as:
                        </p>
                        <p className="text-black mb-2">(Total Minutes in Month - Downtime Minutes) ÷ Total Minutes in Month) × 100</p>
                        <p>This results in the “Uptime” percentage for the month.</p>

                        <h3 className="font-medium text-gray-900 mt-6 mb-2">
                            2.5 Scheduled Maintenance
                        </h3>
                        <p className="mb-2">
                            Deeptrack may conduct scheduled maintenance for:
                        </p>

                        <ul className="list-disc pl-6 space-y-1">
                            <li>Platform upgrades</li>
                            <li>Model improvements</li>
                            <li>Security patches</li>
                            <li>Infrastructure scaling</li>
                        </ul>

                        <p className="mt-2 mb-2">
                            Scheduled Maintenance:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Will be conducted during non-peak hours where possible</li>
                            <li>Will include reasonable advance notice (typically 48 hours)</li>
                            <li>Will not count as Downtime</li>
                        </ul>

                        <h3 className="font-medium text-gray-900 mt-6 mb-2">
                            2.6 Determination
                        </h3>
                        <p className="mb-2">
                            Deeptrack will reasonably determine Downtime and Uptime using internal monitoring systems, cloud infrastructure logs (e.g., AWS/GCP), and system observability tools.
                        </p>
                    </section>

                    {/* 3. Service Level Credits and Termination Rights */}
                    <section>
                        <h2 className="text-xl text-black mb-3">
                            3. Service Level Credits
                        </h2>

                        <h3 className="font-medium text-gray-900 mt-6 mb-2">
                            3.1 Service Level Failure
                        </h3>
                        <p className="mb-2">If Uptime in a given month falls below the Uptime Guarantee, it will be considered a “Service Level Failure.”</p>

                        <h3 className="font-medium text-gray-900 mt-6 mb-2">
                            3.2 Credit Structur
                        </h3>
                        <p className="mb-2">If a Service Level Failure occurs, Deeptrack will provide the following Service Level Credits:</p>

                        {/* Table */}
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-3 pr-6 font-semibold text-gray-900">
                                            Monthly Uptime
                                        </th>
                                        <th className="py-3 font-semibold text-gray-900">
                                            Service Level Credit
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    <tr className="border-b">
                                        <td className="py-3 pr-6">99.7% – 99.89%</td>
                                        <td className="py-3">5% of Monthly Fees</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-3 pr-6">99.5% – 99.69%</td>
                                        <td className="py-3">15% of Monthly Fees</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 pr-6">Below 99.5%</td>
                                        <td className="py-3">30% of Monthly Fees</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="mb-2">
                            Credits:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Apply to future invoices</li>
                            <li>Are capped at 30% of fees for the applicable month</li>
                            <li>Are Customer’s sole and exclusive remedy for Service Level Failure</li>
                        </ul>

                        <h3 className="font-medium text-gray-900 mt-6 mb-2">
                            3.3 Termination Right
                        </h3>
                        <p className="mb-2">Customer may terminate the Agreement without penalty if:</p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Uptime falls below 95%</li>
                            <li>For four (4) consecutive months</li>
                        </ul>
                        <p className="mb-2">Customer must exercise this right within thirty (30) days after the fourth qualifying month.</p>
                    </section>

                    {/* 4. Response and Resolution Targets */}
                    <section>
                        <h2 className="text-xl text-black mb-3">
                            4. Response and Resolution Targets
                        </h2>
                        <p className="mb-2">Deeptrack will respond to reported faults as follows:</p>

                        {/* Table */}
                        <div className="overflow-x-auto mb-2">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="border-b">
                                        <th className="py-3 pr-6 font-semibold text-gray-900">
                                            Classification
                                        </th>
                                        <th className="py-3 font-semibold text-gray-900">
                                            Acknowledgement
                                        </th>
                                        <th className="py-3 font-semibold text-gray-900">
                                            Target Resolution
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="text-gray-700">
                                    <tr className="border-b">
                                        <td className="py-3 pr-6">Critical Fault</td>
                                        <td className="py-3">Within 1 hour</td>
                                        <td className="py-3">Within 4 hours</td>
                                    </tr>
                                    <tr className="border-b">
                                        <td className="py-3 pr-6">Major Fault</td>
                                        <td className="py-3">Within 4 hours</td>
                                        <td className="py-3">Within 12 hours</td>
                                    </tr>
                                    <tr>
                                        <td className="py-3 pr-6">Minor Fault</td>
                                        <td className="py-3">As soon as practicable</td>
                                        <td className="py-3">Within 30 days</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <h3 className="font-medium text-gray-900 mt-6 mb-2">
                            4.1 Fault Classification
                        </h3>
                        <p className="mb-2">
                            Deeptrack will reasonably classify issues as follows:
                        </p>
                        <div className="px-5">
                            <h4 className="text-gray-800">Critical Fault</h4>
                            <div className="px-5">
                                <p className="mb-2">A fault that:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Causes complete platform outage</li>
                                    <li>Prevents media uploads or API processing</li>
                                    <li>Disables authentication for all users</li>
                                    <li>Creates a security emergency</li>
                                </ul>
                            </div>

                            <h4 className="text-gray-800">Major Fault</h4>
                            <div className="px-5">
                                <p className="mb-2">A fault that:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Impacts significant features</li>
                                    <li>Degrades processing speed materially</li>
                                    <li>Affects reporting or dashboard functionality</li>
                                </ul>
                            </div>

                            <h4 className="text-gray-800">Minor Fault</h4>
                            <div className="px-5">
                                <p className="mb-2">A fault that:</p>
                                <ul className="list-disc pl-6 space-y-1">
                                    <li>Causes limited inconvenience</li>
                                    <li>Affects a small feature</li>
                                    <li>Does not materially impact verification workflows</li>
                                </ul>
                            </div>
                        </div>
                    </section>

                    {/* 5. AI Processing Disclaimer */}
                    <section>
                        <h2 className="text-xl text-black mb-3">
                            5. AI Processing Disclaimer
                        </h2>

                        <p className="mb-2">
                            Customer acknowledges that:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>AI detection results are probabilistic assessments</li>
                            <li>False positives and false negatives may occur</li>
                            <li>SLA commitments apply to system availability, not accuracy guarantees</li>
                        </ul>

                        <p className="mt-2">
                            Accuracy commitments, if any, must be separately defined in the Order Form.
                        </p>
                    </section>

                    {/* 6. Exclusions */}
                    <section>
                        <h2 className="text-xl text-black mb-3">
                            6. Exclusions
                        </h2>

                        <p className="mb-2">
                            This SLA does not apply to:
                        </p>
                        <ul className="list-disc pl-6 space-y-1">
                            <li>Beta features</li>
                            <li>Experimental model releases</li>
                            <li>Customer custom integrations</li>
                            <li>Free trial accounts</li>
                        </ul>
                        <p className="mt-3 font-medium text-gray-900">
                            Unless explicitly agreed otherwise in writing.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}