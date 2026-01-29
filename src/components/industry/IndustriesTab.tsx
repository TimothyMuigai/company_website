"use client";

import { useState } from "react";
import { industries } from "./industriesData";
import Image from 'next/image';

export default function IndustriesTabs() {
  const [activeId, setActiveId] = useState(industries[0].id);
  const activeIndustry = industries.find(i => i.id === activeId)!;

  return (
    <section className="max-w-7xl mx-auto px-6 py-24 ">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Industries
        </p>
        <h2 className="mt-2 text-4xl font-bold text-gray-900">
          Built for the real world.
          <br />
          Across every industry.
        </h2>
      </div>

      {/* Tabs */}
      <nav className="flex justify-center flex-wrap gap-6 mb-16">
        {industries.map(industry => (
          <button
            key={industry.id}
            onClick={() => setActiveId(industry.id)}
            className={`
              text-sm font-medium transition
              ${activeId === industry.id
                ? "text-gray-900 border-b-2 border-gray-900"
                : "text-gray-400 hover:text-gray-700"}
            `}
          >
            {industry.label}
          </button>
        ))}
      </nav>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Image */}
        <div className="relative aspect-4/3 rounded-md overflow-hidden bg-gray-100">
            <Image
                src={activeIndustry.image}
                alt={activeIndustry.title}
                fill
            />
        </div>

        {/* Text */}
        <div>
          <h3 className="text-2xl font-semibold text-gray-900">
            {activeIndustry.title}
          </h3>

          {activeIndustry.subtitle && (
            <p className="mt-1 text-sm text-gray-500">
              {activeIndustry.subtitle}
            </p>
          )}

          <p className="mt-6 text-gray-600 leading-relaxed">
            {activeIndustry.description}
          </p>

          <ul className="mt-8 space-y-4">
            {activeIndustry.features.map(feature => (
              <li key={feature} className="flex gap-3">
                <span className="mt-1.5 h-2 w-2 rounded-full bg-gray-900" />
                <span className="text-gray-700">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
