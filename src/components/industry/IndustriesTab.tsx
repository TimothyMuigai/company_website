"use client";

import { useState } from "react";
import { industries } from "./industriesData";
import Image from 'next/image';
import { useRef, useEffect } from "react";


export default function IndustriesTabs() {
  const [activeId, setActiveId] = useState(industries[0].id);
  const activeIndustry = industries.find(i => i.id === activeId)!;

  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    tabRefs.current[activeId]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId]);


  return (
    <section className="max-w-6xl mx-auto px-6  ">
      {/* Header */}
      <div className="text-center mb-6">
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
      <nav className="relative mb-8">
        {/* Fade edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white to-transparent sm:hidden" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white to-transparent sm:hidden" />

        <div
          ref={scrollRef}
          className="
            flex gap-6 px-2
            overflow-x-auto whitespace-nowrap
            scrollbar-hide
            sm:justify-center
          "
        >
          {industries.map(industry => (
            <button
              key={industry.id}
              ref={(el) => {
                tabRefs.current[industry.id] = el;
              }}

              onClick={() => setActiveId(industry.id)}
              className={`
                relative pb-2 text-sm font-medium transition
                ${activeId === industry.id
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-700"}
              `}
            >
              {industry.label}

              {activeId === industry.id && (
                <span className="absolute left-0 right-0 -bottom-0 h-[2px] bg-gray-900" />
              )}
            </button>
          ))}
        </div>
      </nav>


      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/* Image */}
        <div className="relative aspect-4/3 max-h-[560px] w-full rounded-md overflow-hidden">
          <Image
            src={activeIndustry.image}
            alt={activeIndustry.title}
            fill
            className="object-contain"
          />
        </div>


        {/* Text */}
        <div className="max-w-xl">
          <h3 className="text-2xl font-semibold text-gray-900">
            {activeIndustry.title}
          </h3>

          {activeIndustry.problem1?.trim() && (
            <p className="mt-3 text-gray-600 leading-relaxed">
              {activeIndustry.problem1}
            </p>
          )}

          {activeIndustry.problem2?.trim() && (
            <p className="mt-4 text-gray-600 leading-relaxed">
              {activeIndustry.problem2}
            </p>
          )}

          {/* Verifies */}
          {activeIndustry.verifies?.length > 0 && (
            <div className="mt-3">
              <p className="text-sm font-medium text-gray-900 mb-3">
                Verifies
              </p>

              <ul className="space-y-2">
                {activeIndustry.verifies.map(item => (
                  <li key={item} className="flex gap-2 text-sm text-gray-700">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-900" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Key Value */}
          {activeIndustry.features?.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-gray-900 mb-3">
                Value
              </p>

              <ul className="space-y-2">
                {activeIndustry.features.map(feature => (
                  <li key={feature} className="flex gap-3 text-sm text-gray-700">
                    <span className="mt-2 h-1.5 w-1.5 rounded-full bg-gray-900" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Used by */}
          {activeIndustry.uses?.length > 0 && (
            <p className="mt-3 text-[16px] text-gray-700">
              <span className=" text-gray-900">Used by:</span>{" "}
              {activeIndustry.uses.join(", ")}
            </p>
          )}
        </div>

      </div>
    </section>
  );
}
