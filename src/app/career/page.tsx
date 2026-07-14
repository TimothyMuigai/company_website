"use client";

import { Navbar } from "@/components/landingPage/navs/navBar";
import Image from "next/image";
import Link from "next/link";
import FinalCTASection from "@/components/Footer";

export default function Careers() {
  return (
    <div className="space-y-6">
      <Navbar />

      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 sm:grid-col-1 max-w-7xl m-auto mt-4 z-0 min-h-[48vh] text-black">
        <div className="flex flex-col m-auto p-4">
          <div className="p-4 space-y-4">
            <h1 className="text-5xl md:text-6xl font-light text-gray-900">Careers at deeptrack</h1>
            <p className="mt-4 text-lg leading-relaxed max-w-2xl text-gray-800">
              Our mission continues: we build tools to verify media and protect truth. Browse open roles below and apply online.
            </p>
            <div className="flex gap-4 mt-6">
              <Link
                href="/"
                className="border border-gray-700 bg-gray-300 text-gray-800 tracking-wide px-4 py-2 rounded hover:bg-white transition"
              >
                Back Home
              </Link>
            </div>
          </div>
        </div>
        <div className="p-6 lg:mt-12 flex items-center justify-center">
          <Image
            src="/careers/Rectangle 28.png"
            alt="Team Culture"
            width={420}
            height={320}
            className="rounded-xl shadow-md"
          />
        </div>
      </section>

      <FinalCTASection />
    </div>
  );
}