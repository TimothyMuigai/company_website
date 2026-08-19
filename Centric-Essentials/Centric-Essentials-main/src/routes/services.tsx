import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, CTABand } from "@/components/site-chrome";

export const Route = createFileRoute("/services")({
  component: ServicesPage,
  head: () => ({
    meta: [
      { title: "Services & Programmes — Centric Essentials Consulting" },
      {
        name: "description",
        content:
          "The Corporate Creativity & Analytical Thinking Programme — delivered globally in Corporate and SME tracks, adaptable to regional format and language.",
      },
    ],
  }),
});

const MODULES = [
  {
    n: "01",
    title: "Foundations of Analytical Thinking",
    body: "Structured frameworks for defining the real problem before jumping to solutions.",
  },
  {
    n: "02",
    title: "Creative Problem-Solving",
    body: "Practical techniques for generating and stress-testing options under constraint.",
  },
  {
    n: "03",
    title: "Applied Business Simulation",
    body: "Role-based simulation calibrated to participants' industry and market context.",
  },
  {
    n: "04",
    title: "Business Output & Action Planning",
    body: "Every cohort ends with a practical output participants apply within 30 days.",
  },
];

const FOCUS_AREAS = [
  "Human Capital Anatomy",
  "Innovation & Research Analysis",
  "Strategic Systems Thinking & Analysis",
  "Environmental and Social Governance",
  "Impact and Excellence",
];

function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Services / Programmes"
        title={
          <>
            The Corporate Creativity & <br />
            Analytical Thinking Programme.
          </>
        }
        intro="Our flagship offering — a structured training intervention delivered globally in two tracks, adaptable to regional delivery format and language."
      />

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-px bg-border">
          <div className="bg-background p-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
              Track / 01
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-6">Corporate Track</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              For management and mid-level teams in established companies — delivered in-person,
              hybrid, or fully digital depending on region.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Focused on applying creative and analytical methods to strategy, operations, and
              innovation pipelines.
            </p>
          </div>
          <div className="bg-background p-12">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
              Track / 02
            </span>
            <h2 className="text-3xl font-bold tracking-tight mb-6">SME Track</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              For owner-managers and small teams — focused on applied decision-making tools for
              day-to-day business survival and growth challenges.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Calibrated to local market conditions and delivered by facilitators with regional
              SME experience.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Focus areas.</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Focus Areas / 03
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {FOCUS_AREAS.map((f, i) => (
              <div key={f} className="bg-background p-10">
                <span className="font-mono text-xs text-primary mb-4 block">0{i + 1}</span>
                <h3 className="text-lg font-bold">{f}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-b border-border bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">Programme structure.</h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-50">
              Modules / 04
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {MODULES.map((m) => (
              <div key={m.n} className="bg-foreground p-10">
                <span className="font-mono text-xs text-primary mb-6 block">Module {m.n}</span>
                <h3 className="text-2xl font-bold mb-4">{m.title}</h3>
                <p className="text-background/60 leading-relaxed">{m.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-4">
              Delivery Format / 05
            </span>
            <h2 className="text-3xl font-bold tracking-tight">Hybrid, digital, or in-person.</h2>
          </div>
          <div className="lg:col-span-8 text-lg leading-relaxed text-muted-foreground space-y-6">
            <p>
              Hybrid in-person and digital delivery as standard, with fully digital delivery
              available for global corporate clients running multi-region cohorts.
            </p>
            <p>
              Every cycle includes a <span className="text-foreground font-bold">90-day follow-up</span> to
              reinforce application and measure business outcomes.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title="Request a proposal for your organization."
        body="Tell us about your team, region, and objectives — we'll come back with a tailored programme design."
        ctaLabel="Request a Proposal"
      />
    </>
  );
}
