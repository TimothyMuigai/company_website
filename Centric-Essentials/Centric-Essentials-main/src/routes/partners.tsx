import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, CTABand } from "@/components/site-chrome";

export const Route = createFileRoute("/partners")({
  component: PartnersPage,
  head: () => ({
    meta: [
      { title: "Partners & Funders — Centric Essentials Consulting" },
      {
        name: "description",
        content:
          "We partner with DFIs, foundations and corporate CSR programmes to deliver training that creates measurable, inclusive economic impact.",
      },
    ],
  }),
});

const IMPACT = [
  { k: "Outputs", v: "Cohorts delivered, participants trained, curricula localized." },
  { k: "Outcomes", v: "Decision-making improvement, productivity gains, business practices adopted." },
  { k: "Impact", v: "Job creation, SME competitiveness, inclusive participation, revenue growth." },
];

function PartnersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Partners & Funders / 01"
        title="Training that delivers measurable impact."
        intro="We partner with development finance institutions, foundations, and corporate CSR programmes globally to deliver training that creates measurable, inclusive economic impact."
      />

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
              Impact Approach / 02
            </span>
            <h2 className="text-3xl font-bold tracking-tight">
              A structured global results framework.
            </h2>
          </div>
          <div className="lg:col-span-8 text-lg leading-relaxed text-muted-foreground space-y-6">
            <p>
              Every programme is built with a structured global results framework — tracking
              outputs, outcomes, and downstream impact such as job creation and SME competitiveness
              — so funding and corporate partners can see exactly what their support achieves,
              region by region.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-b border-border bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
            <h2 className="text-4xl font-bold tracking-tight">The results framework.</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-50">
              Framework / 03
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {IMPACT.map((i, idx) => (
              <div key={i.k} className="bg-foreground p-10">
                <span className="font-mono text-xs text-primary mb-6 block">
                  Tier 0{idx + 1}
                </span>
                <h3 className="text-2xl font-bold mb-4">{i.k}</h3>
                <p className="text-background/60 leading-relaxed">{i.v}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Discuss a funding or corporate partnership."
        body="We work with DFIs, foundations, and multinational CSR teams on multi-country training programmes."
        ctaLabel="Partner With Us"
      />
    </>
  );
}
