"use client";

import { motion } from 'framer-motion';
import { Gauge, ImageUpscale, Rocket } from 'lucide-react';

export default function BuiltForDev() {
    return (
        <section className="px-6 md:px-12 lg:px-24 py-24 border-t border-gray-200 text-black">
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
          className="max-w-5xl mx-auto space-y-16"
        >

          <div>
            <h2 className="text-3xl font-light mb-4">
              Built for Developers. Proven Scale.
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div>
              <Rocket className="w-8 h-8 mb-4" />
              <h4 className="font-medium mb-2">Fast, Simple Integration</h4>
              <p className="text-sm text-gray-600">
                Deploy in minutes with flexible SDKs for Python, JavaScript, Go, Rust, and Java. One endpoint handles all supported media types. No complex setup or dependencies.
              </p>
            </div>

            <div>
              <Gauge className="w-8 h-8 mb-4" />
              <h4 className="font-medium mb-2">Robust, Explainable Results</h4>
              <p className="text-sm text-gray-600">
                Each analysis includes a manipulation probability score and explainable indicators that highlight where and how content may have been altered. Results are easily surfaced in existing platforms.
              </p>
            </div>

            <div>
              <ImageUpscale className="w-8 h-8 mb-4" />
              <h4 className="font-medium mb-2">Scalable and Secure</h4>
              <p className="text-sm text-gray-600">
                From prototypes to production, RealAPI scales with your workload. Process a single file or thousands concurrently with secure data handling and consistent performance.
              </p>
            </div>
          </div>

        </motion.div>
      </section>

  )
}