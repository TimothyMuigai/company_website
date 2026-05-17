import type { Metadata } from 'next'
import Link from 'next/link'
import { Navbar } from '@/components/landingPage/navs/navBar'
import { sentinelMeta } from '@/lib/seo/metadata'

export const metadata: Metadata = sentinelMeta

const features = [
  {
    title: 'Deepfake-Resistant Identity Verification',
    description:
      'Stops synthetic face and voice attacks during KYC and KYB onboarding with multi-modal biometric validation and liveness detection.',
  },
  {
    title: 'Synthetic Identity Detection',
    description:
      'Detects fake profiles, layered identity fraud, and document forgeries using AI signals across identity documents, selfies, and behavioral data.',
  },
  {
    title: 'Regulator-Ready Audit Trail',
    description:
      'Produces structured evidence, decision logs, and fraud scoring needed for compliance reviews and risk governance.',
  },
  {
    title: 'Global Financial Services Coverage',
    description:
      'Designed for banks, fintechs, payment processors, and compliance teams operating across high-risk, regulated markets.',
  },
]

const steps = [
  'Collect identity documents, selfies, and transaction metadata through secure KYC/KYB workflows.',
  'Evaluate imagery, video, and audio with AI models tuned for deepfake and synthetic media detection.',
  'Score identity trust with explainable fraud signals and risk context.',
  'Generate compliance-ready reports with immutable audit trails and investigator notes.',
]

const useCases = [
  'Bank onboarding and account opening verification.',
  'KYC/KYB for fintech platforms and payment gateways.',
  'Payroll provider identity checks and employee verification.',
  'High-risk merchant onboarding and fraud screening.',
]

export default function SentinelPage() {
  return (
    <>
      <Navbar />
      <main className="space-y-16 bg-white text-slate-900">
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),_transparent_45%),linear-gradient(180deg,rgba(15,23,42,0.95)_0%,rgba(15,23,42,1)_100%)]" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28">
            <div className="max-w-3xl space-y-8">
              <p className="inline-flex rounded-full border border-slate-500 px-4 py-1 text-sm uppercase tracking-[0.25em] text-slate-300">
                Deeptrack Sentinel
              </p>
              <h1 className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
                AI-powered KYC, KYB, and synthetic identity protection.
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Deeptrack Sentinel combines deepfake detection, liveness assurance, and document verification into a single compliance platform for financial services, payroll, and regulated enterprises.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Book a Sentinel Demo
                </Link>
                <Link
                  href="/research"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/95 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Learn about our AI stack
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">What Sentinel does</p>
            <h2 className="text-3xl font-semibold sm:text-4xl text-slate-900">
              Stop synthetic identity fraud before it enters your onboarding flow.
            </h2>
            <div className="grid gap-6 lg:grid-cols-2">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">{feature.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-slate-950 py-16 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">How Sentinel works</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Four stages of AI-driven KYC and fraud review.
                </h2>
              </div>
              <div className="rounded-3xl border border-cyan-600/20 bg-slate-900 p-8 text-sm text-cyan-100 shadow-xl shadow-cyan-950/20">
                <ul className="space-y-4">
                  {steps.map((step) => (
                    <li key={step} className="leading-7">
                      • {step}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Use cases</p>
            <h2 className="text-3xl font-semibold sm:text-4xl text-slate-900">
              Built for financial institutions and regulated enterprise verification.
            </h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {useCases.map((item) => (
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
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/80">Ready for Sentinel?</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Launch AI-first identity verification with deepfake-resistant controls.
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-cyan-100/90">
                  Deeptrack Sentinel powers KYC and KYB workflows with explainable fraud insights and audit-grade evidence for modern compliance teams.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Contact Sales
                </Link>
                <Link
                  href="/nacha"
                  className="inline-flex items-center justify-center rounded-full border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20"
                >
                  Explore NACHA Compliance
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  )
}
