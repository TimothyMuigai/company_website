import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, CTABand } from "@/components/site-chrome";

export const Route = createFileRoute("/case-studies")({
  component: CaseStudiesPage,
  head: () => ({
    meta: [
      { title: "Case Studies & Results — Centric Essentials Consulting" },
      {
        name: "description",
        content:
          "Evidence of impact through client and cohort outcomes — from decision-making improvements to productivity gains and jobs created.",
      },
    ],
  }),
});

const STRUCTURE = [
  { label: "Client / Cohort Context", body: "Industry, region, size of engagement." },
  { label: "The Challenge", body: "The business problem before the programme." },
  { label: "The Intervention", body: "Which track and modules were delivered, and how." },
  {
    label: "The Result",
    body: "Measurable outcome — decision-making improvement, productivity, revenue, jobs created or retained.",
  },
];

function CaseStudiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Case Studies / 01"
        title="Evidence of impact."
        intro="Case studies from cohorts across our global network — each documented against the same structured results framework."
      />

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-px bg-border mb-16">
            {[1, 2, 3].map((n) => (
              <div key={n} className="bg-background p-10">
                <div className="aspect-video bg-secondary mb-6 grid place-items-center">
                  <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground">
                    Case Study / Coming Soon
                  </span>
                </div>
                <span className="font-mono text-xs text-primary block mb-3">CASE {String(n).padStart(2, "0")}</span>
                <h3 className="font-bold text-lg mb-2">Client engagement in preparation</h3>
                <p className="text-sm text-muted-foreground">
                  Detailed case studies will be published as client engagements complete their
                  90-day results tracking cycle.
                </p>
              </div>
            ))}
          </div>

          <div className="border-t border-border pt-16">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
              Case Study Structure / 02
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-12 max-w-2xl">
              Every case, the same framework.
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {STRUCTURE.map((s, i) => (
                <div key={s.label} className="border-t border-primary pt-6">
                  <span className="font-mono text-xs text-primary mb-3 block">0{i + 1}</span>
                  <h3 className="font-bold mb-3">{s.label}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{s.body}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CTABand
        title="Read the full story."
        body="Speak to us for anonymized case detail relevant to your sector or region."
        ctaLabel="Request Case Studies"
      />
    </>
  );
}
