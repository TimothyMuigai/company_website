import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, CTABand } from "@/components/site-chrome";

export const Route = createFileRoute("/insights")({
  component: InsightsPage,
  head: () => ({
    meta: [
      { title: "Insights & Resources — Centric Essentials Consulting" },
      {
        name: "description",
        content:
          "Practical frameworks, cross-market case lessons, and regional business perspectives on decision-making, creativity and organizational growth.",
      },
    ],
  }),
});

const PILLARS = [
  {
    n: "01",
    title: "Practical Frameworks",
    body: "Applied tools — e.g. 'How to diagnose the real problem before you solve it.'",
  },
  {
    n: "02",
    title: "Cross-Market Case Lessons",
    body: "Applied lessons from cohorts and engagements across our regions.",
  },
  {
    n: "03",
    title: "Regional Business Perspectives",
    body: "How local business context shapes decision-making capability.",
  },
  {
    n: "04",
    title: "Programme Updates",
    body: "Cohort outcomes, new programme launches, and network announcements.",
  },
];

function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights & Resources / 01"
        title="A global content hub."
        intro="Articles, case studies, and short guides on business decision-making, creativity and organizational growth."
      />

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-baseline justify-between mb-12 gap-4">
            <h2 className="text-3xl font-bold tracking-tight">Content pillars.</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Editorial / 02
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-border">
            {PILLARS.map((p) => (
              <div key={p.n} className="bg-background p-10">
                <span className="font-mono text-xs text-primary mb-6 block">[ {p.n} ]</span>
                <h3 className="text-xl font-bold mb-3">{p.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-b border-border bg-secondary">
        <div className="max-w-3xl mx-auto text-center">
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
            Newsletter / 03
          </span>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
            Subscribe for new frameworks and case lessons.
          </h2>
          <p className="text-muted-foreground mb-10">
            A monthly dispatch on decision-making, creativity, and organizational growth — no
            marketing filler.
          </p>
          <form className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              required
              placeholder="your@work-email.com"
              className="flex-1 px-4 py-3 bg-background border border-border focus:outline-none focus:border-primary text-sm"
            />
            <button
              type="submit"
              className="px-6 py-3 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:-translate-y-[2px] transition-transform"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>

      <CTABand ctaLabel="Talk to Us" title="Prefer a conversation to a newsletter?" body="Book a scoping call with a regional director." />
    </>
  );
}
