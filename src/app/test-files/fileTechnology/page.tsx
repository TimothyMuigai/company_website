'use client';

import { motion } from 'framer-motion';
import {
  ShieldCheck,
  Database,
  Cpu,
  Lock,
  Workflow,
  Server,
  EyeOff,
  Newspaper,
  UserCheck,
  Search,
} from 'lucide-react';

const architecture = [
  {
    title: 'Secure Data Ingestion',
    description:
      'Structured and unstructured data pipelines designed for high-integrity environments across financial, media, and public sector systems.',
    icon: Database,
  },
  {
    title: 'Signal & Forensic Analysis',
    description:
      'AI models trained to detect synthetic manipulation, laundering behavior, identity spoofing, and anomalous system activity.',
    icon: Cpu,
  },
  {
    title: 'Decision & Risk Engines',
    description:
      'Rule-based and machine-learning-driven engines that produce regulator-aware outputs with explainable scoring.',
    icon: Workflow,
  },
  {
    title: 'Compliance & Audit Layer',
    description:
      'Immutable logging and structured audit trails designed for regulatory review and enterprise governance.',
    icon: ShieldCheck,
  },
];

const platformSystems = [
  {
    name: 'deeptrack Foundry',
    icon: ShieldCheck,
    desc: 'Detects insurance fraud, laundering, and policy collusion',
  },
  {
    name: 'deeptrack Gotham',
    icon: EyeOff,
    desc: 'Enterprise-grade deepfake detection for media, legal, and public sector',
  },
  {
    name: 'deeptrack Atlas',
    icon: Newspaper,
    desc: 'Verifies media in real time, built for journalists and fact-checkers',
  },
  {
    name: 'deeptrack Sentinel',
    icon: UserCheck,
    desc: 'AI-powered KYC/KYB compliance for financial services',
  },
  {
    name: 'deeptrack Mirror',
    icon: Search,
    desc: 'Shields public figures from deepfake identity attacks',
  },
];

export default function TechnologiesPage() {
  return (
    <main className="bg-white text-gray-900">

      {/* Hero */}
      <section className="px-6 md:px-12 lg:px-24 py-20 border-b border-gray-200">
        <div className="max-w-5xl mx-auto space-y-8">
          <h1 className="text-5xl md:text-6xl font-light tracking-tight">
            Technology
          </h1>

          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Deeptrack builds verification infrastructure for high-trust systems.
            Our architecture is designed to detect AI-driven fraud, secure digital
            ecosystems, and enable machine-readable trust across regulated environments.
          </p>
        </div>
      </section>

      {/* Architecture */}
      <section className="px-6 md:px-12 lg:px-24 py-14">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: false }}
          className="max-w-6xl mx-auto space-y-16"
        >

          <div>
            <h2 className="text-3xl font-medium mb-4 text-center">
              System Architecture
            </h2>
            <p className="text-gray-600 max-w-2xl text-center mx-auto leading-relaxed">
              Built for resilience, explainability, and regulatory alignment.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-12">
            {architecture.map(({ title, description, icon: Icon }) => (
              <motion.div
                key={title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="space-y-4"
              >
                <Icon className="w-8 h-8 text-gray-800" />
                <h3 className="text-xl font-medium">{title}</h3>
                <p className="text-gray-600 leading-relaxed">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>

      {/* Platform Implementations */}
      <section className="bg-[#192332] text-white px-6 md:px-12 lg:px-24 py-24">
        <div className="max-w-6xl mx-auto space-y-16">

          <div className="text-center">
            <h2 className="text-3xl font-medium mb-4">
              Platform Systems
            </h2>
            <p className="text-gray-300 max-w-3xl mx-auto">
              Applied verification systems built on Deeptrack’s core infrastructure.
              Each platform is regulator-aware, audit-ready, and deployed in high-trust environments.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {platformSystems.map(({ name, icon: Icon, desc }) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: false }}
                className="bg-[#253041] border border-gray-700 rounded-xl p-6 space-y-4"
              >
                <div className="flex flex-col items-center text-center">

                  <div className="flex items-center space-x-3 mb-3">
                    <Icon className="w-6 h-6 text-white" />
                    <h3 className="text-lg font-medium">{name}</h3>
                  </div>
                  <p className="text-gray-300 text-sm leading-relaxed">{desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <p className="text-base mt-6 max-w-2xl mx-auto text-center border-t border-white pt-6 leading-relaxed">
            Each product is purpose-built, regulator-aware, and battle-tested in African and global environments where truth is under pressure.
          </p>
        </div>
      </section>

      {/* Security & Deployment */}
      <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-gray-200">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className="max-w-5xl mx-auto space-y-16"
        >

          <div>
            <h2 className="text-3xl font-medium mb-4">
              Security & Deployment
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <Lock className="w-8 h-8 mb-4" />
              <h4 className="font-medium mb-2">Zero-Trust Architecture</h4>
              <p className="text-sm text-gray-600">
                Every request authenticated. Every layer monitored.
              </p>
            </div>

            <div>
              <Server className="w-8 h-8 mb-4" />
              <h4 className="font-medium mb-2">Flexible Deployment</h4>
              <p className="text-sm text-gray-600">
                Cloud-native, hybrid, or on-prem deployments for strict data environments.
              </p>
            </div>

            <div>
              <ShieldCheck className="w-8 h-8 mb-4" />
              <h4 className="font-medium mb-2">Audit & Governance Ready</h4>
              <p className="text-sm text-gray-600">
                Structured outputs designed for regulatory review and enterprise oversight.
              </p>
            </div>
          </div>

          <div className="pt-16 border-t border-gray-200 text-center">
            <p className="text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
              Deeptrack is not an application layer. It is verification infrastructure
              purpose built for institutions that cannot afford synthetic risk.
            </p>
          </div>

        </motion.div>
      </section>

    </main>
  );
}