"use client";

import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/landingPage/navs/navBar";
import FinalCTASection from "@/components/Footer";

export default function NewsCentrePortal() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // If no token, show access denied
  if (!token) {
    return (
      <>
        <Navbar />
        <section className="w-full py-20">
          <div className="max-w-4xl mx-auto px-6 lg:px-12">
            <div className="bg-red-50 border border-red-200 rounded-lg p-8 text-center">
              <h2 className="text-2xl font-semibold text-red-900 mb-4">Access Required</h2>
              <p className="text-red-700 mb-6">Please fill out the form to get access to the News Centre.</p>
              <a
                href="/news"
                className="inline-flex items-center gap-2 bg-[#1E88C8] hover:bg-[#166DA3] transition px-6 py-2 text-white text-sm rounded"
              >
                Go to Form
              </a>
            </div>
          </div>
        </section>
        <FinalCTASection />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="w-full py-20">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          {/* Welcome Section */}
          <div className="mb-12">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-8">
              <h1 className="text-4xl font-semibold text-blue-900 mb-2">
                Welcome to the News Centre
              </h1>
              <p className="text-blue-600 mt-4">
                You now have full access to our deepfake news database, updated daily with the latest research and news stories.
              </p>
            </div>
          </div>

          {/* News Centre Content */}
          <div className="space-y-12">
            {/* Featured Article */}
            <article className="border-l-4 border-blue-500 pl-6 py-4">
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">
                Latest Deepfake Detection Research
              </h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Our team continuously monitors global deepfake trends and maintains a curated database of the most significant
                deepfake incidents, detection techniques, and mitigation strategies used by industry leaders and research institutions.
              </p>
              <div className="flex items-center gap-4 text-sm text-gray-600">
                <span>Published: May 14, 2026</span>
                <span>•</span>
                <span>Research</span>
              </div>
            </article>

            {/* Database Features */}
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Database Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  { title: "Daily Updates", desc: "Fresh deepfake incidents and detection research added every day" },
                  { title: "Global Coverage", desc: "Track deepfake trends across all major regions and industries" },
                  { title: "Expert Analysis", desc: "In-depth insights from AI researchers and industry veterans" },
                  { title: "Detection Tools", desc: "Latest detection methodologies and technical approaches" },
                ].map((item, idx) => (
                  <div key={idx} className="bg-gray-50 rounded-lg p-6 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">{item.title}</h3>
                    <p className="text-gray-700 text-sm">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-8 text-white text-center">
              <h2 className="text-2xl font-semibold mb-3">Explore the Database</h2>
              <p className="text-blue-100 mb-6">
                Start exploring our comprehensive deepfake news database now. Use the search and filter tools to find relevant research and incidents.
              </p>
              <button
                onClick={() => {
                  // This would link to your actual database interface
                  window.open(process.env.NEXT_PUBLIC_AIRTABLE_LINK || "#", "_blank");
                }}
                className="inline-flex items-center gap-2 bg-white hover:bg-gray-100 transition px-8 py-3 text-blue-600 font-semibold rounded"
              >
                <span>▶</span>
                Access Database
              </button>
            </div>
          </div>
        </div>
      </section>
      <FinalCTASection />
    </>
  );
}
