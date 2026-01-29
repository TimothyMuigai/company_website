"use client";

import { useState } from "react";
import { processSteps } from "./processData";
import Image from "next/image";

export default function ProcessTabs() {
  const [activeId, setActiveId] = useState(processSteps[0].id);
  const activeStep = processSteps.find(step => step.id === activeId)!;

  return (
    <section className="max-w-7xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Process
        </p>
        <h2 className="mt-2 text-4xl font-bold text-gray-900">
          How Deeptrack Secures
          <br />
          Trust at Scale
        </h2>
      </div>

      {/* Step Tabs */}
      <nav className="flex justify-center gap-10 mb-16">
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
              <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-gray-900" />
            )}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* image */}
        <div className="flex justify-center">
          <div className="relative w-full max-w-md aspect-4/3 rounded-md overflow-hidden bg-gray-100">
            <Image
              src={activeStep.image}
              alt={activeStep.title}
              fill
              className="object-cover"
            />
          </div>
        </div>

        {/* Text */}
        <div>
          <p className="text-xs font-semibold text-gray-500 uppercase">
            {activeStep.step} – {activeStep.label.toUpperCase()}
          </p>

          <h3 className="mt-3 text-2xl font-semibold text-gray-900">
            {activeStep.title}
          </h3>

          <p className="mt-6 text-gray-600 leading-relaxed">
            {activeStep.description}
          </p>

          <button className="mt-8 inline-flex items-center gap-2 text-sm font-medium text-gray-900">
            {activeStep.cta}
            <span aria-hidden>→</span>
          </button>
        </div>
      </div>
    </section>
  );
}
