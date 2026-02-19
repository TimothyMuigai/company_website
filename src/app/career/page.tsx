"use client";

import JobList from "@/components/careers/JobList";
import { Navbar } from "@/components/landingPage/navs/navBar";
import { jobs } from "@/data/jobs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Careers() {
  const router = useRouter();

  return (
    <div className="space-y-6">
      <Navbar />

      {/* Hero Section */}
      <section className="grid lg:grid-cols-2 sm:grid-col-1 max-w-7xl m-auto mt-4 z-0 min-h-[48vh] text-black">
        <div className="flex flex-col m-auto p-4">
          <div className="p-4 space-y-4">
            <h1 className="text-5xl md:text-6xl font-semibold">Careers at deeptrack</h1>
            <p className="mt-4 text-lg leading-relaxed max-w-2xl">
              Our mission continues: we build tools to verify media and protect truth. Browse open roles below and apply online.
            </p>
            <div className="flex gap-4 mt-6" onClick={() => router.back()}>
              <Link
                href="/"
                className="bg-gray-500 text-slate-900 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-semibold"
              >
                Back
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

      {/* Featured internship banner */}
      {(() => {
        const featured = jobs.find((j) => j.slug === 'deepfakes-synthetic-media-research-intern');
        if (!featured) return null;
        return (
          <section className="max-w-7xl mx-auto px-4">
            <div className="bg-[#001D2C66] text-black rounded-lg p-6 flex flex-col md:flex-row items-center gap-6 shadow-md">
              
              <div className="flex-1">
                <h3 className="text-2xl font-semibold">
                  Media Research Intern
                </h3>
                <p className="text-black mt-2">
                  {featured.title} — {featured.summary}
                </p>
                <div className="mt-4 flex gap-3">
                  <Link 
                    href={`/career/${featured.slug}`} 
                    className="bg-gray-600 text-shadow-black px-4 py-2 rounded hover:bg-gray-300 transition font-semibold">
                      View role
                  </Link>
                  {featured.docUrl && (
                    <a 
                      href={featured.docUrl} download 
                    className="bg-gray-600 text-shadow-black px-4 py-2 rounded hover:bg-gray-300 transition font-semibold">                      Download JD
                    </a>
                  )}
                </div>
              </div>

              <div className="w-40 h-40 rounded-lg flex items-center justify-center overflow-hidden">
                <Image 
                  src="/careers/Rectangle 30.png" 
                  alt="Internship" 
                  width={160} 
                  height={160} 
                  className="object-cover" 
                />
              </div>
            </div>
          </section>
        );
      })()}

      <JobList />
    </div>
  );
}