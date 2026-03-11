"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ApiPricingPlans } from "./ApiPricingData";

export default function ApiPricing() {
    return (
        <section className="max-w-7xl mx-auto px-6 py-2">
            {/* Header */}
            <motion.div
                className="text-center mb-16"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <p className="text-xs uppercase tracking-wide text-gray-500">
                    Plans
                </p>
                <h2 className="mt-2 text-4xl font-light text-gray-900">
                    RealAPI Pricing
                    
                </h2>
                <p className="mt-3 text-sm text-gray-500">
                    Individual developers and organizations of all sizes can get value from RealAPI. Choose the plan that best fits your needs or get in touch with us for custom features.
                </p>
            </motion.div>

            {/* Plans */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={{
                    hidden: {},
                    visible: {
                        transition: {
                            staggerChildren: 0.14,
                        },
                    },
                }}
            >
                {ApiPricingPlans.map(plan => (
                    <motion.div
                        key={plan.name}
                        variants={{
                            hidden: { opacity: 0, y: 20 },
                            visible: { opacity: 1, y: 0 },
                        }}
                        transition={{ duration: 0.55, ease: "easeOut" }}
                        whileHover={{
                            y: -6,
                            boxShadow: "0px 12px 30px rgba(0, 0, 0, 0.08)",
                        }}
                        className="rounded-lg border border-gray-200 bg-gray-50 p-6 flex flex-col transition-shadow"
                    >
                        <div>
                            <h3 className="text-sm font-semibold text-gray-900">
                                {plan.name}
                            </h3>
                            <p className="mt-1 text-xs text-gray-500">
                                {plan.description}
                            </p>

                            <div className="mt-6 text-2xl font-semibold text-gray-900">
                                {plan.price}
                                {plan.period && (
                                    <span className="text-sm font-normal text-gray-500">
                                        {plan.period}
                                    </span>
                                )}
                            </div>
                        </div>

                        {/* CTA */}
                        <motion.button
                            whileTap={{ scale: 0.97 }}
                            transition={{ duration: 0.15 }}
                            className="mt-6 w-full bg-gray-900 text-white py-2 text-sm rounded-md hover:bg-gray-700"
                        >
                            <Link href={"/contact"}>{plan.cta}</Link>
                        </motion.button>

                        <ul className="mt-6 space-y-2 text-sm text-gray-600">
                            {plan.features.map(feature => (
                                <li key={feature}>• {feature}</li>
                            ))}
                        </ul>
                    </motion.div>
                ))}
            </motion.div>
        </section>
        )
}