"use client";

import { useState } from "react";
import { processSteps } from "./processData";
import Image from "next/image";

export default function ProcessTabs() {
  const [activeId, setActiveId] = useState(processSteps[0].id);
  const activeStep = processSteps.find(step => step.id === activeId)!;

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
      <nav className="flex justify-center gap-10 mb-6">
        {processSteps.map(step => (
          <button
            key={step.id}
            onClick={() => setActiveId(step.id)}
            className={`
              text-sm font-medium transition relative
              ${activeId === step.id
                ? "text-gray-900"
                : "text-gray-400 hover:text-gray-700"}
            `}
          >
            {step.label}

            {activeId === step.id && (
              <span className="absolute -bottom-2 left-0 right-0 h-0.5 bg-gray-900" />
            )}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 items-center">
        {/* image */}
        <div className="flex justify-center">
          <div className="w-full max-w-md rounded-xl flex items-center justify-center">
            <div className="relative w-full h-55 sm:h-65">
              <Image
                src={activeStep.image}
                alt={activeStep.title}
                fill
                className="object-contain"
                priority
              />
            </div>
          </div>
        </div>

        {/* Text */}
        <div >
          <p className="text-xs font-semibold text-gray-500 uppercase">
            {activeStep.step} – {activeStep.label.toUpperCase()}
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-gray-900">
            {activeStep.title}
          </h3>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {activeStep.description}
          </p>

          {/* CTA */}
          <div className="mt-10 flex flex-col-reverse gap-2
                          sm:flex-row sm:items-center sm:gap-4">

            <button className="inline-flex items-center justify-center rounded-md
                              bg-[#0A1015] px-5 py-3 text-sm font-medium text-white
                              hover:bg-gray-700 transition
                              w-full sm:w-auto">
              See How It Works
            </button>

            <div className="flex items-center gap-2 text-xs text-gray-500
                            justify-center sm:justify-start">
              <Image
                src="/mdi_verified.svg"
                alt="Verified"
                width={18}
                height={18}
              />
              <span className="leading-snug">
                <b>Trusted by</b> media, financial institutions, and government teams
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
