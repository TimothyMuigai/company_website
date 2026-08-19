import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, CTABand } from "@/components/site-chrome";

export const Route = createFileRoute("/careers")({
  component: CareersPage,
  head: () => ({
    meta: [
      { title: "Careers — Centric Essentials Consulting" },
      {
        name: "description",
        content:
          "Join a global network of facilitators and consultants bringing applied business experience into the room.",
      },
    ],
  }),
});

const REASONS = [
  {
    n: "01",
    title: "Global client portfolio",
    body: "Work across a growing global client and partner portfolio spanning six regions.",
  },
  {
    n: "02",
    title: "Proven curriculum, your expertise",
    body: "Deliver a proven curriculum with the flexibility to bring your own industry expertise.",
  },
  {
    n: "03",
    title: "Network, not a single market",
    body: "Join a network of facilitators, not just a single-market team.",
  },
];

function CareersPage() {
  return (
    <>
      <PageHeader
        eyebrow="Careers / 01"
        title="Build a global consulting practice."
        intro="Centric Essentials Consulting is building a global network of facilitators and consultants who bring applied business experience into the room."
      />

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-16 gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Why join us.</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Value Proposition / 02
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {REASONS.map((r) => (
              <div key={r.n} className="bg-background p-10">
                <span className="font-mono text-xs text-primary mb-6 block">[ {r.n} ]</span>
                <h3 className="text-xl font-bold mb-3">{r.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{r.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Open roles.</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Roles / 03
            </span>
          </div>
          <div className="border border-border">
            {[
              { role: "Facilitator (Corporate Track)", region: "Multiple regions", type: "Contract / Network" },
              { role: "Regional Director", region: "West Africa · Asia-Pacific", type: "Full-time" },
              { role: "Programme Consultant", region: "Global remote", type: "Full-time" },
            ].map((r, i, arr) => (
              <div
                key={r.role}
                className={`grid md:grid-cols-12 gap-4 md:gap-6 p-6 items-center ${
                  i < arr.length - 1 ? "border-b border-border" : ""
                } hover:bg-secondary/50 transition-colors`}
              >
                <div className="md:col-span-6 font-bold text-lg">{r.role}</div>
                <div className="md:col-span-3 text-sm text-muted-foreground">{r.region}</div>
                <div className="md:col-span-2 text-sm text-muted-foreground">{r.type}</div>
                <div className="md:col-span-1 text-right">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-primary">
                    Apply →
                  </span>
                </div>
              </div>
            ))}
          </div>
          <p className="mt-8 text-sm text-muted-foreground">
            Additional facilitator, regional director, and consulting roles are published as
            regional cohorts scale.
          </p>
        </div>
      </section>

      <CTABand
        title="View open roles."
        body="Introduce yourself and your regional experience — we'll route you to the right conversation."
        ctaLabel="Apply / Introduce Yourself"
      />
    </>
  );
}
