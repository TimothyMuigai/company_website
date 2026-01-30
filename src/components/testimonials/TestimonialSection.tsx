"use client";

import Image from "next/image";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

/* ---------------------------------------------
   Typing Text Component
---------------------------------------------- */
function TypingText({
  text,
  className,
  speed = 18, // ms per character (mobile-friendly)
}: {
  text: string;
  className?: string;
  speed?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-40px", // safe for small screens
  });
  const shouldReduceMotion = useReducedMotion();

  const [displayedText, setDisplayedText] = useState("");

  useEffect(() => {
    if (!isInView) return;

    if (shouldReduceMotion) {
      setDisplayedText(text);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setDisplayedText(text.slice(0, i + 1));
      i++;
      if (i >= text.length) clearInterval(interval);
    }, speed);

    return () => clearInterval(interval);
  }, [isInView, shouldReduceMotion, text, speed]);

  return (
    <p ref={ref} className={className}>
      {displayedText}
      {!shouldReduceMotion && displayedText.length < text.length && (
        <span className="inline-block w-[1px] h-5 bg-gray-800 ml-[2px] animate-pulse" />
      )}
    </p>
  );
}

/* ---------------------------------------------
   Testimonials Section
---------------------------------------------- */
export default function TestimonialsSection() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-20">
      {/* Header */}
      <motion.div
        className="text-center mb-14"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-40px" }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Testimonials
        </p>
        <h2 className="mt-2 text-4xl font-semibold text-gray-900">
          Real results. Real teams. Powered by AI.
        </h2>
      </motion.div>

      <div className="space-y-16">
        {/* Testimonial 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div>
            <Image
              src="/testimonial/testimonial_1.png"
              alt="Lauren Meyers"
              width={260}
              height={200}
              className="rounded-md object-cover"
            />
          </div>

          <div className="md:col-span-2">
            <TypingText
              text="“Before AI Supply, our operations were bottlenecked by manual processes and fragmented tools. Within the first month, we automated 60% of our most repetitive workflows. What used to take days now takes minutes — and the consistency is night and day. It’s not just faster — it’s sharper, more reliable, and scalable.”"
              className="text-lg text-gray-800 leading-relaxed"
            />

            <div className="mt-6 flex items-end justify-between gap-6 flex-wrap">
              <div>
                <p className="font-medium text-gray-900">Lauren Meyers</p>
                <p className="text-sm text-gray-500">Growth Strategist</p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-semibold text-gray-900">97%</p>
                <p className="text-sm text-gray-500">Boost in efficiency</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          <div className="flex items-center justify-center bg-black rounded-md h-40">
            <Image
              src="/testimonial/coarsa.svg"
              alt="Coursa"
              width={120}
              height={40}
            />
          </div>

          <div className="md:col-span-2">
            <TypingText
              text="“AI Supply changed how we think about scaling. We didn’t need to hire a massive team — the AI agents filled in the gaps and made us operate like a company twice our size. It gave us leverage where we had none before. Our bottom line grew 4x in under 6 months without increasing headcount.”"
              className="text-lg text-gray-800 leading-relaxed"
            />

            <div className="mt-6 flex items-end justify-between gap-6 flex-wrap">
              <div>
                <p className="font-medium text-gray-900">Marcus Lee</p>
                <p className="text-sm text-gray-500">CTO, Coursa</p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-semibold text-gray-900">4x</p>
                <p className="text-sm text-gray-500">
                  Increase in bottom line
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
