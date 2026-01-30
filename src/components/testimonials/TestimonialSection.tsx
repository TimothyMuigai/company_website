import Image from "next/image";

export default function TestimonialsSection() {
  return (
    <section className="max-w-4xl mx-auto px-6 py-16">
      {/* Header */}
      <div className="text-center mb-14">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Testimonials
        </p>
        <h2 className="mt-2 text-4xl font-semibold text-gray-900">
          Real results. Real teams. Powered by AI.
        </h2>
      </div>

      <div className="space-y-10">
        {/* Testimonial 1 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Image */}
          <div>
            <Image
              src="/testimonial/testimonial_1.png"
              alt="Lauren Meyers"
              width={260}
              height={200}
              className="rounded-md object-cover"
            />
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            <p className="text-lg text-gray-800 leading-relaxed">
              “Before AI Supply, our operations were bottlenecked by manual
              processes and fragmented tools. Within the first month, we
              automated 60% of our most repetitive workflows. What used to take
              days now takes minutes — and the consistency is night and day.
              It’s not just faster — it’s sharper, more reliable, and scalable.”
            </p>

            <div className="mt-6 flex items-end justify-between gap-6 flex-wrap">
              <div>
                <p className="font-medium text-gray-900">Lauren Meyers</p>
                <p className="text-sm text-gray-500">Growth Strategist</p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-semibold text-gray-900">97%</p>
                <p className="text-sm text-gray-500">Boost in efficiency</p>
              </div>
            </div>
          </div>
        </div>

        {/* Testimonial 2 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 items-start">
          {/* Logo block */}
          <div className="flex items-center justify-center bg-black rounded-md h-[220px]">
            <Image
              src="/testimonial/coarsa.svg"
              alt="Coursa"
              width={120}
              height={40}
            />
          </div>

          {/* Content */}
          <div className="md:col-span-2">
            <p className="text-lg text-gray-800 leading-relaxed">
              “AI Supply changed how we think about scaling. We didn’t need to
              hire a massive team — the AI agents filled in the gaps and made us
              operate like a company twice our size. It gave us leverage where
              we had none before. Our bottom line grew 4x in under 6 months
              without increasing headcount.”
            </p>

            <div className="mt-6 flex items-end justify-between gap-6 flex-wrap">
              <div>
                <p className="font-medium text-gray-900">Marcus Lee</p>
                <p className="text-sm text-gray-500">CTO, Coursa</p>
              </div>

              <div className="text-right">
                <p className="text-3xl font-semibold text-gray-900">4x</p>
                <p className="text-sm text-gray-500">
                  Increase in bottom line
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
