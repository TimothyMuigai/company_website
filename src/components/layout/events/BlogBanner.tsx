'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function BlogBanner(){
  return (
    <section className="w-full py-20 bg-[#F9FAFB]">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-5xl lg:text-6xl font-light text-gray-800 leading-tight mb-6">
            The Latest From the <br />
            Deeptrack AI <br />
            and Research Team
          </h1>

          <p className="text-gray-700 text-lg max-w-xl">
            Read publications about cutting-edge advancements in deepfake detection.
          </p>
        </div>

        {/* RIGHT FEATURE CARD */}
        <div className="w-full">
          <div className="bg-white rounded-xl overflow-hidden ">
            <div className="relative w-full h-[280px]">
              <Image
                src="/documentImage.webp"
                alt="Feature"
                fill
                className="object-cover"
              />
            </div>

            <div className="p-6">
              <p className="text-sm text-gray-700 mb-2">
                Research | Oct 09, 2025
              </p>

              <h3 className="text-xl text-black font-light leading-snug">
                PolyJuice Makes It Real: Black-Box, Universal Red Teaming for Synthetic Image Detectors
              </h3>

              <Link
                href="/research"
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