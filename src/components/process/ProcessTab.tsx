"use client";

import { useState } from "react";
import { processSteps } from "./processData";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function ProcessTabs() {
  const [activeId, setActiveId] = useState(processSteps[0].id);
  const activeStep = processSteps.find((step) => step.id === activeId)!;

  return (
    <section className="max-w-7xl mx-auto px-18">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs uppercase tracking-wide text-[#0A1015]">
          Process
        </p>
        <h2 className="mt-2 text-4xl font-bold text-gray-900">
          How Deeptrack Secures
          <br />
          Trust at Scale
        </h2>
      </div>

      {/* Step Tabs */}
      <nav className="flex justify-center gap-10 mb-6 relative">
        {processSteps.map((step) => (
          <button
            key={step.id}
            onClick={() => setActiveId(step.id)}
            className={`relative text-sm font-medium transition-colors
              ${
                activeId === step.id
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-700"
              }
            `}
          >
            {step.label}

            {activeId === step.id && (
              <motion.span
                layoutId="process-underline"
                className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-900"
                transition={{ duration: 0.25, ease: "easeOut" }}
              />
            )}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeStep.id}
            className="contents"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={{ hidden: {}, visible: {}, exit: {} }}
          >
            {/* Image */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 8 },
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="flex justify-center"
            >
              <div className="relative w-full max-w-lg aspect-[4/3]">
                <Image
                  src={activeStep.image}
                  alt={activeStep.title}
                  fill
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>

            {/* Text */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 12 },
                visible: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -6 },
              }}
              transition={{ duration: 0.28, ease: "easeOut", delay: 0.04 }}
              className="flex flex-col"
            >
              <p className="text-xs font-semibold text-gray-500 uppercase">
                {activeStep.step} – {activeStep.label.toUpperCase()}
              </p>

              <h3 className="mt-3 text-2xl font-semibold text-gray-900">
                {activeStep.title}
              </h3>

              <p className="mt-6 text-gray-600 leading-relaxed">
                {activeStep.description}
              </p>

              {/* CTA — fixed position under text, NOT animated */}
              <div
                className="
          mt-10 flex flex-col-reverse gap-2
          sm:flex-row sm:items-center sm:gap-4
          "
              >
                <button
                  className="
            inline-flex items-center justify-center rounded-md
              bg-[#0A1015] px-5 py-3 text-sm font-medium text-white
              hover:bg-gray-700 transition
              w-full sm:w-auto
            "
                >
                  See How It Works
                </button>

                <div
                  className="
            flex items-center gap-2 text-xs text-gray-500
            justify-center sm:justify-start
            "
                >
                  <Image
                    src="/mdi_verified.svg"
                    alt="Verified"
                    width={18}
                    height={18}
                  />
                  <span className="leading-snug">
                    <b>Trusted by</b> media, financial institutions, and
                    government teams
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
