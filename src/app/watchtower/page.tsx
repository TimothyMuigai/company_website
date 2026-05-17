import React from 'react'
import Link from 'next/link'
import type { Metadata } from 'next'
import { Navbar } from '@/components/landingPage/navs/navBar'
import { watchtowerMeta } from '@/lib/seo/metadata'

export const metadata: Metadata = watchtowerMeta

const modelCards = [
  {
    title: 'Model 1 — Perimeter Intrusion Detection',
    subtitle: 'Finance, Critical Infrastructure, Government',
    description:
      'Autonomous threat detection at facility boundaries and restricted zones. Detects reconnaissance, perimeter probing, and unauthorized access patterns before physical breaches occur.',
  },
  {
    title: 'Model 2 — Retail & Logistics Theft Detection',
    subtitle: 'Retail, Warehousing, Logistics',
    description:
      'Compound behavioral detection for organized retail crime, logistics fraud, and loading dock diversion. Correlates multi-camera activity across multiple actors and events.',
  },
  {
    title: 'Model 3 — Identity & Access Control with Deepfake Detection',
    subtitle: 'Finance, Secure Facilities, Border Control',
    description:
      'Deploys Deeptrack Sentinel deepfake and liveness detection at physical entry points to stop synthetic face attacks and unauthorized access in real time.',
  },
  {
    title: 'Model 4 — Behavioral Anomaly & Crowd Intelligence',
    subtitle: 'Healthcare, Transport, Smart Cities',
    description:
      'Detects anomalous behavior in crowd spaces, transit hubs, and public venues. Signals risk before incidents escalate with autonomous pattern detection.',
  },
]

const deploymentOptions = [
  {
    title: 'Hybrid Edge-Cloud',
    content:
      'Real-time detection at the edge with cloud-based semantic memory, reasoning, and investigation services for scalable enterprise deployments.',
  },
  {
    title: 'Full Edge Deployment',
    content:
      'On-premises stack for high-security environments and government clients with strict data sovereignty requirements.',
  },
  {
    title: 'Cloud-Managed Multi-Site',
    content:
      'Secure RTSP-over-TLS streaming to Deeptrack cloud for commercial real estate and distributed retail locations with central management.',
  },
]

const whyWatchtower = [
  'Autonomous AI operator for every camera, never fatigues.',
  'Seven-layer architecture with SUO pipeline and agentic orchestration.',
  'Compound behavioral detection across time, space, and actors.',
  'Native Sentinel integration for deepfake-resistant access control.',
  'Flexible deployment from edge to cloud to hybrid topologies.',
]

export default function WatchtowerPage() {
  return (
    <>
      <Navbar />
      <main className="space-y-16 bg-slate-50 text-slate-900">
        <section className="relative overflow-hidden bg-slate-950 text-white">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(34,211,238,0.18),_transparent_42%),linear-gradient(180deg,rgba(15,23,42,0.95)_0%,rgba(15,23,42,1)_100%)]" />
          <div className="relative mx-auto max-w-7xl px-6 py-24 sm:py-28">
            <div className="max-w-3xl space-y-8">
              <p className="inline-flex rounded-full border border-slate-600 px-4 py-1 text-sm uppercase tracking-[0.3em] text-slate-300">
                Watchtower Autonomous Video Intelligence
              </p>
              <h1 className="text-4xl font-light tracking-tight sm:text-5xl lg:text-6xl">
                Autonomous video intelligence for modern security, fraud, and access control.
              </h1>
              <p className="text-lg leading-8 text-slate-300">
                Deeptrack Watchtower combines real-time video AI, deepfake-resistant identity verification, and compound behavioral analysis to detect perimeter intrusion, retail theft, identity fraud, and crowd anomalies across distributed environments.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
                >
                  Book a Watchtower Demo
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/95 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100"
                >
                  Request a Security Briefing
                </Link>
              </div>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {whyWatchtower.map((item) => (
                  <div key={item} className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm text-slate-100 shadow-lg shadow-slate-950/10">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="mx-auto max-w-3xl space-y-6 text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Deployment models</p>
            <h2 className="text-3xl font-semibold sm:text-4xl text-slate-900">
              Four Watchtower models for targeted enterprise security use cases
            </h2>
            <p className="text-lg leading-8 text-slate-700">
              Each Watchtower model is a productized configuration of the same core platform, optimized for the threats and workflows of a specific sector.
            </p>
          </div>

          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {modelCards.map((card) => (
              <div key={card.title} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm">
                <h3 className="text-xl font-semibold text-slate-900">{card.title}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.3em] text-cyan-600">{card.subtitle}</p>
                <p className="mt-4 text-sm leading-7 text-slate-600">{card.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-slate-950 py-16 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
              <div className="space-y-6">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Core architecture</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  The same seven-layer platform for every Watchtower deployment
                </h2>
                <p className="text-lg leading-8 text-slate-300">
                  Watchtower is built on a unified AI stack with a shared SUO pipeline, memory architecture, and agentic orchestration system. This lets clients deploy tailored model configurations without losing consistency, auditability, or operational control.
                </p>
                <div className="mt-6 rounded-3xl border border-white/10 bg-slate-900/80 p-6 text-sm text-slate-200">
                  <p className="font-semibold text-white">How Watchtower ingests and reasons about video:</p>
                  <ul className="mt-4 space-y-3 list-disc pl-5 text-slate-300">
                    <li>RTSP streams enter Stream Acquisition Workers (SAWs) at 2fps, escalating to 30fps when an anomaly signal triggers deeper analysis.</li>
                    <li>YOLOv9 runs continuously for person detection, RT-DETR activates for high-confidence classification, and VideoMAE analyzes 16-frame windows for action inference.</li>
                    <li>All model outputs fuse into the Scene Understanding Object (SUO), while the Temporal Event Tracker and Behavioral Baseline Engine feed the Compound Event Detector and Reasoning Agent.</li>
                  </ul>
                </div>
              </div>

              <div className="grid gap-4">
                <div className="rounded-3xl border border-cyan-600/20 bg-slate-900 p-8">
                  <h3 className="text-xl font-semibold text-white">Stream Acquisition</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    RTSP and ONVIF video input with adaptive frame extraction and trigger-based escalation for efficient processing.
                  </p>
                </div>
                <div className="rounded-3xl border border-cyan-600/20 bg-slate-900 p-8">
                  <h3 className="text-xl font-semibold text-white">Scene Understanding Object (SUO)</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Fuses detection, tracking, pose, and semantics into a single evidence object used by downstream reasoning and investigation workflows.
                  </p>
                </div>
                <div className="rounded-3xl border border-cyan-600/20 bg-slate-900 p-8">
                  <h3 className="text-xl font-semibold text-white">Agentic Incident Reasoning</h3>
                  <p className="mt-3 text-sm leading-7 text-slate-300">
                    Structured incident reasoning uses the LLM to generate event narratives, severity recommendations, and operator-friendly alerts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="space-y-8">
            <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Deployment topology</p>
            <h2 className="text-3xl font-semibold sm:text-4xl text-slate-900">
              Flexible deployment paths from edge to cloud
            </h2>
            <div className="grid gap-6 lg:grid-cols-3">
              {deploymentOptions.map((option) => (
                <div key={option.title} className="rounded-3xl border border-slate-200 bg-slate-50 p-8 shadow-sm">
                  <h3 className="text-xl font-semibold text-slate-900">{option.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-slate-600">{option.content}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-cyan-600 py-16 text-white">
          <div className="mx-auto max-w-7xl px-6">
            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-100/80">Performance targets</p>
                <h2 className="text-3xl font-semibold sm:text-4xl">
                  Designed for enterprise security with measurable operating goals
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-cyan-100/90">
                  Watchtower sets clear performance targets for latency, false positives, cross-camera tracking, and evidence generation to match demanding security operations requirements.
                </p>
              </div>
              <div className="rounded-3xl border border-white/20 bg-white/10 p-8 text-sm text-cyan-100 shadow-xl shadow-cyan-950/15">
                <ul className="space-y-4">
                  <li>Object detection latency below 30ms per frame.</li>
                  <li>Action classification under 200ms for 16-frame windows.</li>
                  <li>False positive rate under 2% for perimeter deployments.</li>
                  <li>Cross-camera re-identification accuracy above 92% in controlled lighting.</li>
                  <li>Evidence package generation in under 5 seconds.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-7xl px-6 py-16">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-2xl shadow-slate-950/10">
            <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-center">
              <div className="space-y-5">
                <p className="text-sm uppercase tracking-[0.3em] text-cyan-600">Ready for Watchtower?</p>
                <h2 className="text-3xl font-semibold sm:text-4xl text-slate-900">
                  Deploy autonomous video intelligence where it matters most.
                </h2>
                <p className="max-w-2xl text-lg leading-8 text-slate-700">
                  From perimeter security to retail loss prevention and deepfake-resistant access control, Watchtower brings modern AI detection, evidence, and investigation support to your physical security stack.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full bg-slate-900 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800"
                >
                  Schedule a Watchtower Briefing
                </Link>
                <Link
                  href="/contact"
                  className="inline-flex items-center justify-center rounded-full border border-slate-300 bg-white px-6 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-100"
                >
                  Contact Sales
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <div className="bg-slate-950 py-20 text-white">
        <div className="mx-auto max-w-7xl px-6 text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300">Watchtower</p>
          <h2 className="mt-4 text-3xl font-semibold sm:text-4xl">
            The autonomous video intelligence system built for actionable security.
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-slate-300">
            Deeptrack Watchtower is a secure, enterprise-ready platform that turns passive camera networks into active, evidence-driven security operations.
          </p>
        </div>
      </div>
      <div className="bg-white py-10" />
    </>
  )
}
