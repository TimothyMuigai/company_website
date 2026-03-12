"use client";

import ApiFeatureSection from "@/components/ProductApiComponents/ApiFeatureSection";
import ApiStepsTab from "@/components/ProductApiComponents/ApiStepsTab";
import BuiltForDev from "@/components/ProductApiComponents/BuiltForDevs";
import ApiPricing from "@/components/ProductApiComponents/ApiPricing";
// import Image from "next/image";
import { Navbar } from "@/components/landingPage/navs/navBar";

const items = [
  {
    title: "Identity and Access Verification",
    desc: "Create a RealAPI account on the Reality Defender Platform to generate your API key. You’ll need a key to authenticate all RealAPI requests.",
  },
  {
    title: "Fraud and Threat Prevention",
    desc: "Detect manipulated voices, images, or videos used in impersonation, phishing, or social engineering attempts.",
  },
  {
    title: "Media and Content Verification",
    desc: "Embed detection directly into publishing platforms, moderation systems, or investigative tools to verify media authenticity at scale.",
  },
  {
    title: "Add Detection Anywhere",
    desc: "Use RealAPI to integrate deepfake detection into any existing platform, dashboard, or product with just a few lines of code.",
  },
];

export default function ProductApiPage() {
  return (
    <>
    <Navbar/>
      <ApiFeatureSection
        title="Deepfake Detection in a few Lines of Code"
        description="RealAPI enables developers to add enterprise-grade deepfake detection into any app or platform. Detect manipulated images, audio, and video at scale."
        // imageSrc=""
      />
      <ApiStepsTab />
      <BuiltForDev />
      <ApiPricing />
      <section className="w-full py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-16 items-start">
          {/* LEFT SIDE */}
          <div>
            <h2 className="text-4xl lg:text-5xl font-light text-gray-900 leading-tight mb-10">
              Integrate Deepfake Detection Wherever It&apos;s Needed
            </h2>

            <div className="relative w-full h-105">
              {/* <Image
                src=""
                alt="Deepfake Detection"
                fill
                className="object-cover rounded-md"
              /> */}
            </div>
          </div>

          {/* RIGHT SIDE */}
          <div className="bg-[#F9FAFB] p-12 rounded-md">
            {items.map((item, index) => (
              <div
                key={index}
                className="py-8 border-t border-gray-700"
              >
                <h3 className="text-xl text-gray-900 mb-3">
                  {item.title}
                </h3>
                <p className="text-gray-800 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="bg-[#F9FAFB] min-h-105 flex items-center w-full py-20 border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            {/* Left column */}
            <div>
              <h2
                className="text-5xl md:text-6xl font-light text-gray-900 leading-tight tracking-tight"
              >
                Our <br /> Technology
              </h2>
            </div>

            {/* Right column */}
            <div className="flex flex-col space-y-8 max-w-xl">
              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Powered by continuous research and model development, Reality
                Defender’s ensemble system combines multiple detection methods
                to stay ahead of evolving AI manipulation techniques.
              </p>

              <p className="text-lg md:text-xl text-gray-600 leading-relaxed">
                Each scan runs through independently trained models that
                cross-validate results, delivering reliable outputs and clear
                explanations built on years of applied research in deepfake
                forensics.
              </p>

              <div>
                <button className="bg-gray-900 text-white px-8 py-4 rounded-md text-lg hover:bg-gray-800 transition-all duration-300 flex items-center gap-3">
                  Explore the Platform
                  <span className="text-xl">↗</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
