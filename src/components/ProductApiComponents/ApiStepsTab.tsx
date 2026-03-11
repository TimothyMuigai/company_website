"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ProductApiSteps } from "./productsApiData";

export default function ApiStepsTab() {
    const [activeId, setActiveId] = useState(ProductApiSteps[0].id);
    const activeStep = ProductApiSteps.find((step) => step.id === activeId)!;

    return (
        <section className="max-w-7xl mx-auto px-18 text-black py-15">
           
            {/* Header */}
      <div className="text-center mb-6">
        <p className="text-xs uppercase tracking-wide text-gray-700">
          How to Use RealAPI
        </p>
        <h2 className="mt-2 text-4xl font-light text-gray-900">
          From API Key to Detection in Minutes
        </h2>
        <p className="text-lg max-w-md leading-relaxed font-light text-gray-900 text-center mt-4 mx-auto">
            Accessible instantly through the RealAPI SDKs. Minimal setup,
            flexible integrations, and full developer control.
        </p>
      </div>

            {/* Step Tabs */}
            <nav className="flex justify-center gap-10 mb-10 relative">
                {ProductApiSteps.map((step) => (
                    <button
                        key={step.id}
                        onClick={() => setActiveId(step.id)}
                        className={`relative text-sm font-medium transition-colors
              ${activeId === step.id
                                ? "text-gray-800"
                                : "text-gray-400 hover:text-gray-800"
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
                            <p className="text-xs font-light text-gray-600 uppercase">
                                {activeStep.step} – {activeStep.title.toUpperCase()}
                            </p>

                            <h3 className="mt-10 text-2xl font-light text-black">
                                {activeStep.title}
                            </h3>

                            <p className="mt-6 text-gray-700 leading-relaxed">
                                {activeStep.description}
                            </p>
                        </motion.div>

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
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
}
