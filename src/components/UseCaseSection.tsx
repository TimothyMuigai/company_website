import Image from "next/image";

export default function UseCasesSection() {
  return (
    <section className="bg-white text-[#0A1015] py-24">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <p className="text-xs tracking-widest text-gray-500 uppercase mb-4">
            AI agents securing truth in the age of synthetic media
          </p>

          <h2 className="text-3xl md:text-4xl font-light leading-tight">
            Deeptrack deploys autonomous AI agents to detect deepfakes,
            verify digital content, and protect organizations from
            misinformation and identity fraud at scale.
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 ">
          {/* Card 1 */}
          <div className="border border-gray-200 rounded-xl p-8 shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="relative mb-6 h-40 rounded-lg overflow-hidden">
              <Image
                src="/image 2.png"
                alt="Media verification interface"
                fill
                className="object-cover"
                priority
              />
            </div>

            <h3 className="font-light mb-2 text-black text-2xl">
              Verify Digital Media at the Source
            </h3>

            <p className="text-sm text-gray-700 leading-relaxed">
              Analyze images, video, and audio using AI forensic models and
              C2PA aligned provenance signals to determine authenticity,
              manipulation, and origin in real time.
            </p>
          </div>

          {/* Card 2 */}
          <div className="border border-gray-200 rounded-xl p-8 shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50">
            <div className="relative mb-6 h-40 rounded-lg overflow-hidden">
              <Image
                src="/image 6.png"
                alt="Deepfake detection dashboard"
                fill
                className="object-cover"
              />
            </div>

            <h3 className="font-light mb-2 text-black text-2xl">
              Detect Deepfakes Before They Cause Harm
            </h3>

            <p className="text-sm text-gray-700 leading-relaxed">
              Autonomous agents continuously scan, analyze, and flag synthetic
              or manipulated media across platforms reducing response time
              from days to minutes.
            </p>
          </div>

          {/* Card 3 */}
          <div className="border border-gray-200 rounded-xl p-8 shadow-sm bg-gradient-to-br from-blue-50 to-cyan-50">
            <h3 className="font-light mb-3 text-black text-2xl">
              Automate Trust Decisions Across Teams
            </h3>

            <p className="text-sm text-gray-700 leading-relaxed mb-6">
              From newsrooms to compliance teams, Deeptrack agents execute
              verification workflows end to end logging evidence, escalating
              risk, and generating audit-ready reports.
            </p>

            {/* Bottom row */}
            <div className="
              flex flex-col-reverse gap-3
              sm:flex-row sm:items-center sm:justify-between sm:gap-4
            ">
              {/* CTA */}
              <button className="
                inline-flex items-center justify-center
                text-sm font-medium text-white
                bg-[#0A1015] px-4 py-2 rounded-md
                hover:bg-black transition
                whitespace-nowrap
                w-full sm:w-auto
              "
                onClick={() => {
                  const section = document.getElementById("industries");
                  section?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                Explore use cases →
              </button>

              {/* Verified indicator */}
              <div className="
                flex items-center gap-2
                text-sm text-gray-600
                justify-center sm:justify-start
              ">
                <Image
                  src="/mdi_verified.svg"
                  alt="Verified"
                  width={18}
                  height={18}
                />
                <span className="leading-snug">
                  <b>Trusted by</b> media, financial institutions, and government teams
                </span>
              </div>
            </div>

          </div>

          {/* Card 4 */}
          <div className="rounded-xl p-8 bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-100">
            <h3 className="font-light text-black text-2xl mb-4">
              Used by teams who can’t afford to be wrong
            </h3>

            <ul className="space-y-2 text-sm text-gray-700 list-disc">
              <li>📰 Media & Fact Checking</li>
              <li>🏦 Financial Services & KYC</li>
              <li>🛡️ Government & Public Sector</li>
              <li>👥 Public Figures & High Risk Individuals</li>
              <li>💼 Insurance Companies</li>
              <li>🌟 Talent Acquisition Companies</li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
