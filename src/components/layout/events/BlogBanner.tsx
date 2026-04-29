'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function BlogBanner() {
  return (
    <section className="w-full py-3 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-5xl lg:text-6xl font-light text-gray-800 leading-tight mb-6">
            The Latest From <br />
            Deeptrack <br />
            and the Research Team
          </h1>

          <p className="text-gray-700 text-lg max-w-xl">
            Read publications about cutting-edge advancements in deepfake detection.
          </p>
        </div>

        {/* RIGHT FEATURE CARD */}
        <div className="w-full">
          <div className="bg-white rounded-xl overflow-hidden">
            <div className="relative w-full h-[280px]">
              <Image
                src="/researchImage.jpg"
                alt="Feature"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-700 mb-2">
                Research | April 9, 2026
              </p>

              <h3 className="text-xl text-black font-light leading-snug">
                The NACHA 2026 Fraud Rules and Deepfakes:
                What Every Financial Institution Must Know
                Before June 19
              </h3>

              <Link
                href="/research/nacha-2026-fraud-rules"
                className="inline-flex items-center mt-4 text-black hover:underline"
              >
                Read More →
              </Link>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}