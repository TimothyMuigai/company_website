import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/landingPage/navs/navBar";
import { nacahaMeta } from "@/lib/seo/metadata";

export const metadata: Metadata = nacahaMeta;

const trustHighlights = [
  "Multi-modal deepfake detection",
  "Forensic audit trails",
  "Continuous fraud monitoring",
  "C2PA-aligned provenance verification",
  "Built for ACH, KYC, AML, and fraud teams",
];

const nacahaRequirements = [
  "Risk-based ACH fraud monitoring",
  "Detection of entries initiated under false pretenses",
  "Continuous transaction monitoring",
  "Fraud controls across the full ACH lifecycle",
  "Annual review and evolution of fraud controls",
  "Monitoring obligations for both outgoing and incoming ACH transactions",
];

const fraudTargets = [
  "Business email compromise (BEC)",
  "Vendor impersonation",
  "Payroll diversion fraud",
  "Synthetic identity fraud",
  "AI-generated documents",
  "Deepfake voice and video impersonation",
];

const whyDeepfakesNow = [
  "AI-generated faces to bypass onboarding",
  "Voice cloning to authorize payroll changes",
  "Synthetic documents to pass verification checks",
  "Deepfake video calls to impersonate executives",
];

const attackEntryPoints = [
  {
    title: "Synthetic Identity Account Opening",
    description:
      "Fraudsters combine real Social Security data with fabricated identities and AI-generated biometric data to pass KYC and open ACH-enabled accounts.",
  },
  {
    title: "Payroll & Vendor Payment Fraud",
    description:
      "Finance teams receive fake executive calls or cloned voice messages authorizing urgent ACH payment changes.",
  },
  {
    title: "AI-Generated Document Fraud",
    description:
      "Fake bank statements, invoices, pay stubs, and tax records generated entirely by AI bypass traditional OCR and document scanning systems.",
  },
];

const deeptrackCapabilities = [
  {
    title: "Multi-Modal Deepfake Detection",
    items: [
      "Video",
      "Audio",
      "Images",
      "Identity documents",
      "Voice samples",
      "Biometric verification flows",
    ],
    description:
      "Detect synthetic or manipulated media before fraudulent ACH activity occurs.",
  },
  {
    title: "Forensic Audit Trails",
    items: [
      "Detection confidence scores",
      "Model-level outputs",
      "Tamper-resistant audit logs",
      "Regulatory review records",
    ],
    description:
      "Explain what signals were evaluated, why a transaction was flagged, and which models triggered alerts.",
  },
  {
    title: "Continuous Monitoring",
    items: [
      "Ongoing behavioral monitoring",
      "Transaction anomaly detection",
      "Identity drift analysis",
      "ACH recipient pattern monitoring",
      "Real-time fraud scoring",
    ],
    description:
      "Move beyond one-time checks to sustained fraud detection across the ACH lifecycle.",
  },
  {
    title: "Injection-Resistant Liveness Detection",
    items: [
      "Multi-signal liveness verification",
      "Device attestation",
      "Camera integrity checks",
      "Behavioral biometric analysis",
      "Deepfake injection detection",
    ],
    description:
      "Protect against AI injection attacks that bypass basic selfie verification.",
  },
];

const complianceMapping = [
  ["False pretenses fraud detection", "Gotham"],
  ["Deepfake voice & video detection", "Gotham"],
  ["Forensic audit trails", "Gotham"],
  ["Synthetic identity detection", "Sentinel"],
  ["Injection-resistant liveness detection", "Sentinel"],
  ["AI-generated document detection", "Foundry"],
  ["Ongoing fraud monitoring", "Gotham"],
  ["Regulatory evidence & explainability", "Gotham"],
];

const audienceList = [
  "Banks",
  "ODFIs",
  "RDFIs",
  "Fintech platforms",
  "Payroll processors",
  "ACH originators",
  "Third-party senders (TPS)",
  "Third-party service providers (TPSP)",
  "Digital onboarding and KYC teams",
  "Fraud and AML operations teams",
];

const faqItems = [
  {
    question: "What is changing in NACHA 2026?",
    answer:
      "NACHA now requires proactive, risk-based fraud monitoring across ACH transactions, including detection of entries initiated under false pretenses.",
  },
  {
    question: "When does NACHA Phase 2 take effect?",
    answer: "June 19, 2026.",
  },
  {
    question: "Who must comply?",
    answer:
      "All non-consumer ACH originators, ODFIs, RDFIs, payroll processors, TPS, and TPSPs.",
  },
  {
    question: "Does NACHA specifically mention deepfakes?",
    answer:
      "No — but the rules target impersonation fraud, synthetic identity schemes, and AI-generated fraud patterns commonly enabled by deepfake technology.",
  },
  {
    question: "What is “false pretenses” fraud?",
    answer:
      "Fraud where a legitimate user authorizes a transaction after being deceived by impersonation, social engineering, or manipulated media.",
  },
  {
    question: "How does Deeptrack Gotham help?",
    answer:
      "Deeptrack Gotham provides multi-modal deepfake detection, forensic audit trails, continuous monitoring, and explainable fraud scoring aligned with NACHA examination expectations.",
  },
];

export default function NACHA() {
  return (
    <div className="text-slate-900 bg-white">
      <Navbar />

      <main className="space-y-16">
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),_transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.9)_0%,rgba(15,23,42,0.95)_100%)]" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28">
            <div className="max-w-3xl space-y-8">
              <p className="inline-flex rounded-full border border-slate-500 px-4 py-1 text-sm uppercase tracking-[0.25em] text-slate-300">
                NACHA 2026 Compliance
              </p>
              <h1 className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
                NACHA 2026 Compliance Starts With Detecting AI-Generated Fraud
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                The June 19, 2026 NACHA operating rule changes require every ACH originator, ODFI, RDFI, payroll processor, and third-party sender to implement proactive, risk-based fraud monitoring. Deeptrack Gotham helps financial institutions detect deepfakes, synthetic identities, AI-generated documents, and impersonation fraud before fraudulent ACH transactions enter the network.
              </p>

              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-300"
                >
                  Book a Demo
                </Link>
                <Link
                  href="/resources/nacha-2026-checklist"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/95 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Download NACHA Compliance Checklist
                </Link>
              </div>

              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {trustHighlights.map((item) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-100 shadow-lg shadow-slate-950/10">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">What changed in NACHA 2026</p>
              <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
                What the NACHA 2026 Rules Actually Require
              </h2>
              <p className="max-w-2xl text-lg leading-8 text-slate-700">
                The 2026 NACHA operating rule changes are the most significant ACH fraud compliance update in years. For the first time, NACHA formally requires institutions to implement modern fraud monitoring across the full ACH lifecycle.
              </p>

              <div className="grid gap-4 sm:grid-cols-2">
                {nacahaRequirements.map((item) => (
                  <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-5 text-sm text-slate-700">
                    {item}
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-8 rounded-3xl border border-slate-200 bg-slate-950 px-8 py-10 text-white shadow-xl shadow-slate-950/10">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Key Dates</p>
              <div className="space-y-6">
                <div className="rounded-3xl bg-slate-900 p-6">
                  <p className="text-sm text-cyan-300">March 20, 2026 — Phase 1</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-300">
                    Applies to ODFIs, high-volume ACH originators, and third-party senders processing more than 6 million ACH entries annually.
                  </p>
                </div>
                <div className="rounded-3xl bg-cyan-600/10 p-6">
                  <p className="text-sm text-cyan-100">June 19, 2026 — Phase 2</p>
                  <p className="mt-3 text-sm leading-relaxed text-slate-200">
                    Extends compliance obligations to all non-consumer ACH originators, payroll processors, fintechs, third-party service providers, and mid-market institutions regardless of volume.
                  </p>
                </div>
              </div>

              <div className="rounded-3xl border border-cyan-600/20 bg-slate-900 p-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">NACHA enforcement shift</p>
                <p className="mt-3 text-sm leading-relaxed text-slate-200">
                  NACHA no longer treats fraud monitoring as optional or reactive. Institutions must now demonstrate proactive, risk-based controls capable of identifying modern AI-enabled fraud patterns.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-16 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="max-w-3xl space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Why deepfakes are now a NACHA problem</p>
              <h2 className="text-3xl font-semibold sm:text-4xl">
                Deepfakes and Synthetic Identities Are Now Part of the ACH Attack Surface
              </h2>
              <p className="text-lg leading-8 text-slate-300">
                The NACHA rules do not explicitly mention deepfakes — but the fraud scenarios they target are increasingly powered by AI-generated media.
              </p>
            </div>

            <div className="mt-12 grid gap-6 lg:grid-cols-2">
              <div className="space-y-4 rounded-3xl border border-slate-800 bg-slate-900 p-8">
                {whyDeepfakesNow.map((item) => (
                  <div key={item} className="rounded-3xl bg-slate-800 p-5 text-sm leading-6 text-slate-200">
                    {item}
                  </div>
                ))}
              </div>

              <div className="grid gap-5">
                {attackEntryPoints.map((item) => (
                  <div key={item.title} className="rounded-3xl border border-slate-800 bg-slate-900 p-8">
                    <h3 className="text-xl font-semibold text-white">{item.title}</h3>
                    <p className="mt-3 text-sm leading-7 text-slate-300">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">How Deeptrack Gotham helps</p>
            <h2 className="text-3xl font-semibold sm:text-4xl text-slate-900">
              How Deeptrack Gotham Helps Financial Institutions Meet NACHA 2026 Requirements
            </h2>
            <div className="grid gap-6 xl:grid-cols-2">
              {deeptrackCapabilities.map((capability) => (
                <div key={capability.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">{capability.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-700">{capability.description}</p>
                  <ul className="mt-5 space-y-3 text-sm text-slate-600">
                    {capability.items.map((item) => (
                      <li key={item} className="flex gap-3">
                        <span className="mt-1 h-2.5 w-2.5 rounded-full bg-cyan-600" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-16 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Compliance mapping</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  NACHA 2026 Compliance Coverage
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Deeptrack maps core NACHA obligations to specialized capabilities across Gotham, Sentinel, and Foundry.
                </p>
              </div>

              <div className="overflow-hidden rounded-3xl border border-slate-800 bg-slate-900 shadow-xl">
                <table className="min-w-full divide-y divide-slate-800 text-sm text-slate-100">
                  <thead className="bg-slate-950">
                    <tr>
                      <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.18em] text-slate-400">NACHA Requirement</th>
                      <th className="px-6 py-4 text-left font-semibold uppercase tracking-[0.18em] text-slate-400">Deeptrack Solution</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800">
                    {complianceMapping.map(([requirement, solution]) => (
                      <tr key={`${requirement}-${solution}`} className="border-t border-slate-800">
                        <td className="px-6 py-4 align-top text-slate-200">{requirement}</td>
                        <td className="px-6 py-4 align-top text-cyan-200 font-semibold">{solution}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Who this is for</p>
            <h2 className="text-3xl font-semibold sm:text-4xl text-slate-900">
              Built For Institutions Now in Scope Under NACHA Phase 2
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-700">
              Deeptrack Gotham is designed to support the organizations and teams facing the most immediate compliance exposure under NACHA phase 2.
            </p>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {audienceList.map((item) => (
                <div key={item} className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 shadow-sm">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cyan-600 py-16 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/80">Examination risk</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  NACHA Compliance Is No Longer Just About Detection — It Is About Evidence
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-cyan-100/90">
                  Regulators and NACHA examiners increasingly expect institutions to demonstrate how fraud decisions were made, what systems evaluated each transaction, and whether controls evolve with emerging fraud techniques.
                </p>
              </div>
              <div className="rounded-3xl border border-cyan-300/20 bg-white/10 p-8 text-sm text-cyan-100 shadow-xl shadow-cyan-950/20">
                <p className="font-semibold">Institutions relying only on:</p>
                <ul className="mt-4 space-y-3 text-cyan-100/90">
                  <li>• OCR</li>
                  <li>• static rules</li>
                  <li>• one-time KYC checks</li>
                  <li>• basic selfie verification</li>
                </ul>
                <p className="mt-6 text-cyan-100/90">
                  may struggle to demonstrate compliance under the 2026 framework.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2rem] border border-slate-200 bg-slate-950 px-8 py-12 text-white shadow-2xl shadow-slate-950/20">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Prepare before June 19, 2026</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  ACH Fraud Has Changed. Your Detection Stack Must Change With It.
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  Deeptrack Gotham helps financial institutions deploy AI-resistant fraud monitoring without rebuilding their entire KYC or AML infrastructure.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400"
                >
                  Schedule a Compliance Briefing
                </Link>
                <Link
                  href="/solution/gotham"
                  className="inline-flex items-center justify-center rounded-full border border-slate-200 bg-white/95 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Book a Gotham Demo
                </Link>
                <Link
                  href="/resources/nacha-2026-checklist"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Download the NACHA 2026 Checklist
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
            <div className="space-y-6">
              <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">FAQ</p>
              <h2 className="text-3xl font-semibold sm:text-4xl text-slate-900">
                Frequently Asked Questions
              </h2>
            </div>
            <div className="mt-8 space-y-4">
              {faqItems.map((item) => (
                <details key={item.question} className="rounded-3xl border border-slate-200 bg-white p-6 [&_summary::-webkit-details-marker]:hidden">
                  <summary className="cursor-pointer text-lg font-semibold text-slate-900">
                    {item.question}
                  </summary>
                  <p className="mt-4 text-sm leading-7 text-slate-700">{item.answer}</p>
                </details>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
