import { pricingPlans } from "./pricingData";

export default function PricingSection() {
  return (
    <section className="max-w-7xl mx-auto px-6 py-10">
      {/* Header */}
      <div className="text-center mb-16">
        <p className="text-xs uppercase tracking-wide text-gray-500">
          Pricing
        </p>
        <h2 className="mt-2 text-4xl font-semibold text-gray-900">
          Plans built for
          <br />
          speed and scale
        </h2>
        <p className="mt-3 text-sm text-gray-500">
          *Save 20% on yearly plans.
        </p>
      </div>

      {/* Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {pricingPlans.map(plan => (
          <div
            key={plan.name}
            className="rounded-lg border border-gray-200 bg-gray-50 p-6 flex flex-col"
          >
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                {plan.name}
              </h3>
              <p className="mt-1 text-xs text-gray-500">
                {plan.description}
              </p>

              <div className="mt-6 text-2xl font-semibold text-gray-900">
                {plan.price}
                {plan.period && (
                  <span className="text-sm font-normal text-gray-500">
                    {plan.period}
                  </span>
                )}
              </div>
            </div>

            <button className="mt-6 w-full bg-black text-white py-2 text-sm rounded-md">
              {plan.cta}
            </button>

            <ul className="mt-6 space-y-2 text-sm text-gray-600">
              {plan.features.map(feature => (
                <li key={feature}>• {feature}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
