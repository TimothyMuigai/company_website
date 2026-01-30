"use client";

import { useState } from "react";
import { faqItems } from "./faqData";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section className="max-w-3xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-12">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          FAQ
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-gray-900">
          Frequently asked questions
        </h2>
      </div>

      {/* Questions */}
      <div className="divide-y divide-gray-200">
        {faqItems.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <button
              key={item.question}
              onClick={() =>
                setOpenIndex(isOpen ? null : index)
              }
              className="w-full text-left py-5"
            >
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-900">
                  {item.question}
                </span>
                <span className="text-xl text-gray-400">
                  {isOpen ? "×" : "+"}
                </span>
              </div>

              {isOpen && (
                <p className="mt-3 text-sm text-gray-600 leading-relaxed">
                  {item.answer}
                </p>
              )}
            </button>
          );
        })}
      </div>
    </section>
  );
}
