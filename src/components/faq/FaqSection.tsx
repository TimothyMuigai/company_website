"use client";

import { useState } from "react";
import { faqItems } from "./faqData";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import Image from "next/image";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="max-w-3xl mx-auto px-6 py-20">
      {/* Header */}
      <motion.div
        className="text-center mb-12"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <p className="text-xs uppercase tracking-wide text-gray-500">
          FAQ
        </p>
        <h2 className="mt-2 text-3xl font-light text-gray-900">
          Frequently asked questions
        </h2>
      </motion.div>

      {/* Questions */}
      <div className="divide-y divide-gray-200">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <motion.button
              key={item.question}
              layout
              onClick={() =>
                setOpenIndex(isOpen ? null : index)
              }
              className="
                group w-full text-left p-5 rounded-md
                transition-colors
                hover:bg-gray-50
              "
              whileHover={
                shouldReduceMotion
                  ? undefined
                  : { x: 2 }
              }
              transition={{
                layout: {
                  duration: shouldReduceMotion ? 0 : 0.3,
                  ease: "easeOut",
                },
                default: {
                  duration: 0.15,
                  ease: "easeOut",
                },
              }}
            >
              {/* Question row */}
              <div className="flex items-center justify-between">
                <span
                  className="
                    text-sm font-light text-black
                    transition-colors
                    group-hover:text-gray-700
                  "
                >
                  {item.question}
                </span>

                {/* Icon */}
                <motion.span
                  className="flex items-center justify-center"
                  animate={{ rotate: isOpen ? 45 : 0 }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : { scale: 1.05, opacity: 0.85 }
                  }
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.25,
                    ease: "easeOut",
                  }}
                >
                  <Image
                    src="/Add.svg"
                    alt={isOpen ? "Close" : "Open"}
                    width={16}
                    height={16}
                  />
                </motion.span>
              </div>

              {/* Answer */}
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.p
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                      duration: shouldReduceMotion ? 0 : 0.3,
                      ease: "easeOut",
                    }}
                    className="overflow-hidden mt-3 text-sm text-gray-600 leading-relaxed"
                  >
                    {item.answer}
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </section>
  );
}
