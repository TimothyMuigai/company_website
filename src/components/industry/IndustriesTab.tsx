"use client";

import { useState, useRef, useEffect } from "react";
import { industries } from "./industriesData";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function IndustriesTabs() {
  const [activeId, setActiveId] = useState(industries[0].id);
  const activeIndustry = industries.find(i => i.id === activeId)!;

  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const hasInteracted = useRef(false);

  useEffect(() => {
    if (!hasInteracted.current) return;

    tabRefs.current[activeId]?.scrollIntoView({
      behavior: "smooth",
      inline: "center",
      block: "nearest",
    });
  }, [activeId]);


  return (
    <section className="max-w-6xl mx-auto px-6 py-10">
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
        <div className="flex gap-6 px-2 overflow-x-auto whitespace-nowrap scrollbar-hide sm:justify-center">
          {industries.map(industry => (
            <button
              key={industry.id}
              ref={el => {
                tabRefs.current[industry.id] = el;
              }}
              onClick={() => {
                hasInteracted.current = true;
                setActiveId(industry.id);
              }}
              className={`relative pb-2 text-sm font-medium transition-colors
                ${activeId === industry.id
                  ? "text-gray-900"
                  : "text-gray-400 hover:text-gray-700"}
              `}
            >
              {industry.label}

              {activeId === industry.id && (
                <motion.span
                  layoutId="industries-underline"
                  className="absolute left-0 right-0 bottom-0 h-0.5 bg-gray-900"
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              )}
            </button>
          ))}
        </div>
      </nav>

      {/* Content */}
      <div className="grid grid-cols-1 lg:grid-cols-2 items-start">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndustry.id}
            className="contents"
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Image */}
            <motion.div
              variants={{
                hidden: { opacity: 0, y: 16 },
                visible: { opacity: 1, y: 0 },
                exit: { opacity: 0, y: 8 },
              }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="relative aspect-4/3 max-h-140 w-full rounded-md overflow-hidden"
            >
              <Image
                src={activeIndustry.image}
                alt={activeIndustry.title}
                fill
                className="object-contain"
              />
            </motion.div>

            {/* Text */}
            <motion.div
              variants={{
                hidden: { opacity: 0, x: 20 },
                visible: { opacity: 1, x: 0 },
                exit: { opacity: 0, x: -8 },
              }}
              transition={{
                duration: 0.28,
                ease: "easeOut",
                delay: 0.04,
              }}
              className="max-w-xl"
            >
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

              {activeIndustry.features?.length > 0 && (
                <div className="mt-4">
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

              {activeIndustry.uses?.length > 0 && (
                <p className="mt-4 text-[16px] text-gray-700">
                  <span className="text-gray-900">Used by:</span>{" "}
                  {activeIndustry.uses.join(", ")}
                </p>
              )}
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
