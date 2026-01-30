"use client";

import { useState } from "react";

export default function RiskCalculator() {
  const [volume, setVolume] = useState(12);
  const [reviewTime, setReviewTime] = useState(10);
  const [costPerIncident, setCostPerIncident] = useState(40);

  const monthlyCost = volume * costPerIncident;

  return (
    <section className="max-w-3xl mx-auto px-6 py-24">
      {/* Header */}
      <div className="text-center mb-8">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Calculator
        </p>

        <h2 className="mt-2 text-3xl font-semibold text-gray-900">
          Quantify the cost of not
          <br />
          verifying digital content
        </h2>

        <p className="mt-3 text-sm text-gray-600 max-w-xl mx-auto">
          Measure the operational, reputational, and financial impact of
          unmanaged synthetic media risk.
        </p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-xl border border-gray-200 px-6 py-7 space-y-7">
        {/* Sliders */}
        {[
          {
            label: "Content volume reviewed per month",
            sub: "(e.g. images, videos, claims, submissions)",
            value: volume,
            setter: setVolume,
            min: 1,
            max: 100,
          },
          {
            label: "Avg. review time per item (minutes)",
            sub: "Manual verification, escalation, coordination",
            value: reviewTime,
            setter: setReviewTime,
            min: 1,
            max: 60,
          },
          {
            label: "Avg. cost per incident",
            sub: "False publication, fraud payout, compliance breach, reputational damage",
            value: costPerIncident,
            setter: setCostPerIncident,
            min: 10,
            max: 500,
            step: 10,
            prefix: "$",
          },
        ].map((item, i) => (
          <div key={i}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-gray-900">
                {item.label}
              </span>
              <span className="text-gray-900">
                {item.prefix}
                {item.value}
              </span>
            </div>

            <p className="mt-1 text-xs text-gray-500">
              {item.sub}
            </p>

            <input
              type="range"
              min={item.min}
              max={item.max}
              step={item.step || 1}
              value={item.value}
              onChange={(e) => item.setter(Number(e.target.value))}
              className="mt-3 w-full h-1.5 rounded-full bg-gray-200 accent-gray-900 cursor-pointer"
            />
          </div>
        ))}

        {/* Results */}
        <div className="pt-5 border-t border-gray-200 space-y-3 text-sm text-[#0A1015]">
          <p>
            Your team is exposed to ~{volume} high-risk content decisions per
            month.
          </p>

          <p>
            <b>Secondary result:</b> <br />
            That equates to approximately{" "}
            <span className="font-semibold text-gray-900">
              ${monthlyCost}/month
            </span>{" "}
            in operational cost and preventable risk exposure.
          </p>

          <p className="">
            Deeptrack can reduce verification time by up to 70% and significantly
            lower the likelihood of high-impact failures.
          </p>
        </div>

        <p className="text-xs text-[#000000] text-left">
        Most organizations only discover synthetic media risk after damage has
        already occurred.
      </p>

        {/* CTA */}
        <div className="pt-4">
          
          <p className="mb-2 text-xs text-gray-500">
            See your risk reduction potential
          </p>

          <button className="w-full bg-black text-white py-3 rounded-md text-sm font-medium hover:bg-gray-900 transition">
            Get a custom automation plan
          </button>
        </div>
      </div>
    </section>
  );
}
