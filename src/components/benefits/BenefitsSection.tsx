"use client";

import Image from "next/image";
import { benefits } from "./benefitsData";
import { motion } from "framer-motion";

export default function BenefitsSection() {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 12 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <motion.section
      className="max-w-6xl mx-auto px-6 py-24"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, margin: "-80px" }}
    >
      {/* Header */}
      <motion.div
        className="text-center mb-16"
        variants={fadeUp}
        transition={{ duration: 0.55, ease: "easeOut" }}
      >
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Benefits
        </p>
        <h2 className="mt-2 text-4xl font-light text-gray-900">
          Let your team focus
          <br />
          on what matters most
        </h2>
      </motion.div>

      {/* Grid */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-3 gap-12"
        variants={containerVariants}
      >
        {benefits.map((item) => (
          <motion.div
            key={item.title}
            className="text-center"
            variants={fadeUp}
            transition={{ duration: 0.4, ease: "easeOut" }}
          >
            {/* Icon */}
            <motion.div
              className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-md"
              style={{
                background:
                  "linear-gradient(to bottom, #0A1015 0%, #3B5E7B 100%)",
                boxShadow: "0px 6px 16px -3px #0E171E33",
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.04 }}
            >
              <Image
                src={item.icon}
                alt={item.title}
                width={24}
                height={24}
              />
            </motion.div>

            <h3 className="text-sm font-medium text-black">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-gray-700 leading-relaxed">
              {item.description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  );
}
