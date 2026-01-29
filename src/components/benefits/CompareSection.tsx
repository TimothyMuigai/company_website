import Image from "next/image";

export default function CompareSection() {
  return (
    <section className="relative w-full py-32 px-6 text-white">
      {/* Background image */}
      <div className="absolute inset-0 bg-[url('/compare_section_image.png')] bg-cover bg-center" />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      <div className="relative max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-widest text-gray-400">
            Compare
          </p>

          <h2 className="mt-4 text-4xl md:text-5xl font-light">
            Why Choose <span className="font-medium">deeptrack</span>
          </h2>

          <p className="mt-6 text-sm md:text-base text-gray-400 max-w-2xl mx-auto">
            Stop relying on slow, manual workflows. Let AI Supply automate the
            heavy lifting so your team can focus on high-impact work.
          </p>
        </div>

        {/* Comparison cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {/* Other agencies */}
          <div className="relative rounded-xl border border-white/10 bg-white/5 backdrop-blur-xl p-8">
            <h4 className="mb-6 text-base font-medium">
              Other agencies
            </h4>

            <ul className="space-y-4 text-sm text-gray-300">
              <li className="flex items-center gap-3">
                <span className="text-gray-400">✕</span>
                Manual task delegation
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gray-400">✕</span>
                Limited data usage
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gray-400">✕</span>
                Human error & delay
              </li>
              <li className="flex items-center gap-3">
                <span className="text-gray-400">✕</span>
                Costly scaling
              </li>
            </ul>
          </div>

          {/* Deeptrack */}
          <div className="relative rounded-xl border border-white/10 bg-white/10 backdrop-blur-xl p-8">
            <div className="mb-6 flex items-center gap-2">
              <Image
                src="/logos/deeptrack-high-resolution-logo-white-transparent.png"
                alt="deeptrack"
                width={110}
                height={28}
              />
            </div>

            <ul className="space-y-4 text-sm text-gray-200">
              <li className="flex items-center gap-3">
                <span className="text-white">✓</span>
                Built for high-risk, high-impact decisions
              </li>
              <li className="flex items-center gap-3">
                <span className="text-white">✓</span>
                Uses forensic AI + provenance standards (C2PA)
              </li>
              <li className="flex items-center gap-3">
                <span className="text-white">✓</span>
                Designed for real workflows, not demos
              </li>
              <li className="flex items-center gap-3">
                <span className="text-white">✓</span>
                Human-review + AI collaboration (important for trust)
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
