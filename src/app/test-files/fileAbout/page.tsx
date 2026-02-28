'use client';

import Link from 'next/link';
import { ShieldCheck, Search, Cpu, Scale, EyeOff } from 'lucide-react';
import { motion } from 'framer-motion';
export default function AboutDeeptrack() {
  return (
    <main className="px-4 sm:px-6 md:px-10 lg:px-16 py-16 max-w-7xl mx-auto space-y-24 text-black">

      {/* ------------------------------------------------ */}
      {/* HERO */}
      {/* ------------------------------------------------ */}

      <section className="max-w-4xl space-y-8">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-light text-gray-900">
          About Deeptrack
        </h1>

        <p className="text-xl text-gray-700 leading-relaxed">
          Deeptrack builds verification infrastructure for an AI-shaped world.
        </p>

        <p className="text-lg text-gray-600 leading-relaxed">
          We secure financial systems, media ecosystems, enterprises,
          and public institutions against AI-generated deception,
          synthetic identity abuse, and digital trust erosion.
        </p>
      </section>

      {/* ------------------------------------------------ */}
      {/* MISSION & VISION */}
      {/* ------------------------------------------------ */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: false }} 
        className=" px-4 text-white"
      >
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-8">
          {/* Mission */}
          <div className="space-y-6 rounded-2xl p-8 bg-[#192332]">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full ">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h2 className="text-3xl bg-clip-text">Our Mission</h2>
            </div>
            <p className="text-xl italic ">
              Machine-Verified Truth as Standard
            </p>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">
                <span className="font-medium">deeptrack</span> protects high-trust sectors from AI-generated fraud and misinformation.
              </p>
              <p className="text-lg leading-relaxed">
                We build forensic-grade platforms to detect deepfakes, trace laundering behavior, and verify content before it causes harm.
              </p>
            </div>
          </div>

          {/* Vision */}
          <div className="space-y-6 bg-[#192332] rounded-2xl p-8">
            <div className="flex items-center gap-4">
              <div className="p-3 rounded-full">
                <EyeOff className="w-8 h-8" />
              </div>
              <h2 className="text-3xl bg-clip-text">Our Vision</h2>
            </div>
            <p className="text-xl italic">
              Deception Has Nowhere to Hide
            </p>
            <div className="space-y-4">
              <p className="text-lg leading-relaxed">
                We believe trust should be machine-readable, and every system that handles sensitive data should have built-in defense.
              </p>
              <p className="text-lg leading-relaxed">
                <span className="font-medium">deeptrack</span> is building privacy-first platforms to secure digital ecosystems through verifiability.
              </p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* ------------------------------------------------ */}
      {/* PROBLEM */}
      {/* ------------------------------------------------ */}

      <section className="max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Search className="w-7 h-7 text-gray-900" />
          <h2 className="text-3xl font-medium">The Problem We Solve</h2>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Generative AI has lowered the cost of deception to near zero.
          Fraud, deepfakes, impersonation, and compliance violations
          now operate at machine speed.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Traditional detection tools are reactive.
          Institutions require embedded verification infrastructure
          that operates in real time.
        </p>
      </section>

      {/* ------------------------------------------------ */}
      {/* WHY NOW */}
      {/* ------------------------------------------------ */}

      <section className="max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Scale className="w-7 h-7 text-gray-900" />
          <h2 className="text-3xl font-medium">Why Now</h2>
        </div>

        <p className="text-gray-700 leading-relaxed">
          AI capabilities are accelerating.
          Regulatory scrutiny is increasing.
          Public trust in digital systems is declining.
        </p>

        <p className="text-gray-600 leading-relaxed">
          The next decade will belong to infrastructure companies
          that embed verification directly into core systems.
        </p>
      </section>

      {/* ------------------------------------------------ */}
      {/* TRUST & GOVERNANCE */}
      {/* ------------------------------------------------ */}

      <section className="border-t max-w-4xl space-y-6">
        <div className="flex items-center gap-4">
          <Cpu className="w-7 h-7 text-gray-900" />
          <h2 className="text-3xl font-medium">Trust & Governance</h2>
        </div>

        <p className="text-gray-700 leading-relaxed">
          Deeptrack operates with privacy-first architecture,
          regulator-aware design, and institutional discipline.
        </p>

        <p className="text-gray-600 leading-relaxed">
          Our advisory leadership spans cybersecurity,
          enterprise systems, legal governance,
          and venture capital — ensuring technical rigor
          and compliance alignment from inception.
        </p>
      </section>

      {/* ------------------------------------------------ */}
      {/* NAVIGATION */}
      {/* ------------------------------------------------ */}

      <section className="bg-gray-50 rounded-2xl p-10">
        <h2 className="text-2xl font-medium mb-8">
          Explore Deeptrack
        </h2>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 text-gray-700">
          <Link href="/test-files/fileCompanyCulture">→ Company & Culture</Link>
          <Link href="/test-files/fileLeadership">→ Leadership</Link>
          <Link href="/test-files/fileTechnology">→ Technology</Link>
        </div>
      </section>

    </main>
  );
}