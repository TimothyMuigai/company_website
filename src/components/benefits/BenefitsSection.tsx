import Image from "next/image";
import { benefits } from "./benefitsData";

export default function BenefitsSection() {
  return (
    <section className="max-w-6xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Benefits
        </p>
        <h2 className="mt-2 text-4xl font-bold text-gray-900">
          Let your team focus
          <br />
          on what matters most
        </h2>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
        {benefits.map((item) => (
          <div key={item.title} className="text-center">
            <div
                className="mx-auto mb-4 flex h-10 w-10 items-center justify-center rounded-md"
                style={{
                    background: "linear-gradient(to bottom, #0A1015 0%, #3B5E7B 100%)",
                    boxShadow: "0px 6px 16px -3px #0E171E33"
                }}
            >
                <Image
                    src={item.icon}
                    alt={item.title}
                    width={24}
                    height={24}
                />
            </div>

            <h3 className="text-sm font-semibold text-gray-900">
              {item.title}
            </h3>

            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
              {item.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
