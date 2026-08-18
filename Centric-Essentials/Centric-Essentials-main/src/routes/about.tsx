import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, CTABand } from "@/components/site-chrome";

export const Route = createFileRoute("/about")({
  component: AboutPage,
  head: () => ({
    meta: [
      { title: "About — Centric Essentials Consulting" },
      {
        name: "description",
        content:
          "Most business failure isn't a resourcing problem — it's a thinking problem. Learn about our global approach to building analytical and creative capability.",
      },
      { property: "og:title", content: "About Centric Essentials" },
      {
        property: "og:description",
        content: "Our story, approach and global leadership team.",
      },
    ],
  }),
});

const APPROACH = [
  {
    title: "Applied, not theoretical",
    body: "Every module is built around real business cases, not abstract frameworks.",
  },
  {
    title: "Globally consistent, locally calibrated",
    body: "A single curriculum standard, delivered by facilitators who understand regional business context.",
  },
  {
    title: "Segmented by audience",
    body: "Corporate teams and SME owner-managers face different problems and get different tracks.",
  },
  {
    title: "Outcome-driven",
    body: "Every cohort ends with a practical output participants apply immediately, tracked through our global results framework.",
  },
];

const PILLARS = [
  "Strategic Alignment",
  "Creativity",
  "Innovation",
  "Economic Growth",
  "Environmental Governance",
  "Impact Research",
];

function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About Us / 01"
        title={
          <>
            A thinking problem, <br />
            not a resourcing problem.
          </>
        }
        intro="Centric Essentials Consulting exists because most business failure isn't a resourcing problem — it's a thinking problem. Wherever an organization operates, we help build the analytical and creative capability that turns good intentions into good decisions."
      />

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-4">
              Our Story / 02
            </span>
            <h2 className="text-3xl font-bold tracking-tight">Founded to close a capability gap.</h2>
          </div>
          <div className="lg:col-span-8 text-lg leading-relaxed text-muted-foreground space-y-6">
            <p>
              Centric Essentials Consulting was founded to address a gap that spans markets and
              sectors: organizations invest heavily in strategy and technology, but under-invest
              in the underlying capability that determines whether those investments succeed —
              the quality of thinking their people bring to every decision.
            </p>
            <p>
              Starting from East Africa and growing into a global facilitator network, our
              trajectory has been shaped by a single conviction: better thinking is the most
              measurable and portable capability an organization can build.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-b border-border bg-secondary/30">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-4">
              Vision & Mission
            </span>
            <h2 className="text-3xl font-bold tracking-tight">What drives us.</h2>
          </div>
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-12">
            <div>
              <h3 className="font-bold text-lg mb-3">Vision</h3>
              <p className="text-muted-foreground leading-relaxed">
                To be a central catalyst for organizations and systems across Africa by driving
                cutting-edge human capital initiatives.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-lg mb-3">Mission</h3>
              <p className="text-muted-foreground leading-relaxed">
                To design and execute high-impact programmes that set the benchmark for
                partnership, innovation, and human capital development.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight">
              Centric Essentials Pillars.
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Pillars / 03
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-border">
            {PILLARS.map((p, i) => (
              <div key={p} className="bg-background p-10">
                <span className="font-mono text-xs text-primary mb-4 block">0{i + 1}</span>
                <h3 className="text-xl font-bold">{p}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-b border-border bg-foreground text-background">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance max-w-2xl">
              Our approach.
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-50">
              Approach / 03
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-px bg-white/10">
            {APPROACH.map((a, i) => (
              <div key={a.title} className="bg-foreground p-10">
                <span className="font-mono text-xs text-primary mb-6 block">
                  [ 0{i + 1} ]
                </span>
                <h3 className="text-xl font-bold mb-4">{a.title}</h3>
                <p className="text-background/60 leading-relaxed">{a.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-12 gap-8">
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
              Leadership & global team.
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Team / 04
            </span>
          </div>
          <p className="text-muted-foreground max-w-xl">
            Meet the people leading our work.{" "}
            <a href="/team" className="text-primary font-bold hover:underline">
              View our full team →
            </a>
          </p>
        </div>
      </section>

      <CTABand
        title="Learn about our approach."
        body="Book a scoping call to discuss how our methodology adapts to your organization."
        ctaLabel="Talk to Us"
      />
    </>
  );
}
