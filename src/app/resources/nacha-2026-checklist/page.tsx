import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landingPage/navs/navBar'

export const metadata: Metadata = {
  title: 'NACHA 2026 Checklist | Deeptrack Gotham',
  description:
    'Access a practical NACHA 2026 compliance checklist for ACH originators, ODFIs, RDFIs, payroll processors, and fintechs preparing for AI-enabled fraud monitoring.',
  alternates: { canonical: 'https://www.deeptrack.io/resources/nacha-2026-checklist' },
}

const checklistHighlights = [
  'Map NACHA risk-based fraud monitoring obligations to your transaction lifecycle.',
  'Establish detection for deepfakes, synthetic identities, and AI-generated documents.',
  'Define examiner-ready evidence and audit trail requirements.',
  'Align monitoring, alerting, and fraud score workflows with Phase 2 timelines.',
  'Verify controls for payroll, third-party senders, and high-volume ACH originators.',
]

export default function NACHAChecklistPage() {
  return (
    <div className="bg-white text-slate-900">
      <Navbar />

      <main className="space-y-16">
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_42%),linear-gradient(180deg,rgba(15,23,42,0.95)_0%,rgba(15,23,42,1)_100%)]" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28">
            <div className="max-w-3xl space-y-8">
              <p className="inline-flex rounded-full border border-slate-500 px-4 py-1 text-sm uppercase tracking-[0.25em] text-slate-300">
                NACHA 2026 Resource
              </p>
              <h1 className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
                NACHA 2026 Compliance Checklist
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Prepare your ACH fraud monitoring program with a concise checklist for risk-based controls, synthetic media detection, examiner-ready evidence, and operational readiness ahead of June 19, 2026.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="mailto:info@deeptrack.io?subject=Request%20NACHA%202026%20Checklist"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Request the Checklist
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/95 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Talk to Compliance
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="space-y-8">
            <h2 className="text-3xl font-semibold text-slate-900 sm:text-4xl">
              What this checklist covers
            </h2>
            <p className="max-w-2xl text-lg leading-8 text-slate-700">
              Use this checklist to review your current ACH controls and confirm the specific fraud monitoring capabilities expected by NACHA examiners under the 2026 operating rule update.
            </p>
            <ul className="grid gap-4 sm:grid-cols-2">
              {checklistHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-3xl border border-slate-200 bg-slate-50 p-6 text-sm text-slate-700 shadow-sm"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="bg-slate-950 py-16 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Why this matters</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Reduce exam risk by documenting your AI-enabled fraud controls.
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-300">
                  NACHA examiners are looking for evidence that your team is identifying modern fraud patterns, including deepfake-enabled impersonation, synthetic identity abuse, and AI-generated account takeover attempts.
                </p>
              </div>
              <div className="rounded-3xl border border-cyan-600/20 bg-slate-900 p-8 text-sm text-cyan-100 shadow-xl shadow-cyan-950/20">
                <p className="font-semibold">Checklist benefits</p>
                <ul className="mt-4 space-y-3 text-cyan-100/90">
                  <li>• Clarify NACHA risk monitoring expectations.</li>
                  <li>• Confirm synthetic media and identity detection coverage.</li>
                  <li>• Align your fraud workflow with examiner-ready outputs.</li>
                  <li>• Support high-volume ACH originators, processors, and financial institutions.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
