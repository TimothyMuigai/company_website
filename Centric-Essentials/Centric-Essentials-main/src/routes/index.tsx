import { createFileRoute, Link } from "@tanstack/react-router";
import { CTABand } from "@/components/site-chrome";
import africaGold from "@/assets/africa-gold.png";

export const Route = createFileRoute("/")({
  component: Home,
  head: () => ({
    meta: [
      { title: "Centric Essentials Consulting — Better Decisions Start With Better Thinking" },
      {
        name: "description",
        content:
          "We equip corporate teams and SMEs across global markets with the creative and analytical thinking capability that drives measurable business results.",
      },
    ],
  }),
});

const SEGMENTS = [
  {
    n: "01",
    title: "Corporates",
    body: "Equip management and mid-level teams with applied problem-solving and decision-making tools, wherever your teams are based.",
    href: "/who-we-serve",
    cta: "Corporate Track",
  },
  {
    n: "02",
    title: "SMEs",
    body: "Give owner-managers practical frameworks for the decisions that determine whether a business survives and grows.",
    href: "/services",
    cta: "SME Track",
  },
  {
    n: "03",
    title: "Funders & Partners",
    body: "Partner with us to deliver measurable, inclusive economic impact through training, at regional or multi-country scale.",
    href: "/partners",
    cta: "Partner With Us",
  },
] as const;

const WHY = [
  "Practical, case-based learning — not generic soft-skills training.",
  "A consistent global curriculum, delivered by a regionally calibrated facilitator network.",
  "Programmes built around real business outcomes: decisions, productivity, competitiveness.",
  "Proven design experience across corporate and SME audiences, in multiple markets.",
] as const;


function Home() {
  return (
    <>
      {/* Hero */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12 items-end">
            <div className="lg:col-span-8">
              <div className="inline-block h-px w-12 bg-primary mb-8 animate-line" />
              <h1 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] text-balance animate-reveal">
                Better Decisions <br />
                Start With Better <span className="text-primary">Thinking.</span>
              </h1>
              <p className="mt-12 text-xl max-w-[52ch] text-muted-foreground leading-relaxed animate-reveal [animation-delay:200ms]">
                Centric Essentials Consulting equips corporate teams and SMEs across global markets
                with the creative and analytical thinking capability that drives measurable
                business results.
              </p>
              <div className="mt-10 flex flex-wrap gap-4 animate-reveal [animation-delay:400ms]">
                <Link
                  to="/contact"
                  className="inline-block px-8 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:-translate-y-[2px] transition-transform"
                >
                  Book a Consultation
                </Link>
                <Link
                  to="/services"
                  className="inline-block px-8 py-4 border border-foreground/20 font-bold uppercase tracking-widest text-xs hover:border-primary hover:text-primary transition-colors"
                >
                  Explore Programmes
                </Link>
              </div>
            </div>
            <div className="lg:col-span-4 animate-reveal [animation-delay:600ms]">
              <div className="w-full aspect-[4/5] relative overflow-hidden flex items-center justify-center">
                <img
                  src={africaGold}
                  alt="Map of Africa"
                  width={800}
                  height={1000}
                  className="w-full h-full object-contain"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-32 border-t border-border px-6">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
              What We Do / 01
            </span>
            <h2 className="text-4xl font-bold tracking-tight text-balance">
              Two capabilities every organization needs.
            </h2>
          </div>
          <div className="lg:col-span-8 grid md:grid-cols-2 gap-12">
            <div>
              <div className="text-6xl font-bold tracking-tighter text-primary mb-6">1.</div>
              <h3 className="text-2xl font-bold mb-4">Creative Problem-Solving</h3>
              <p className="text-muted-foreground leading-relaxed">
                Practical, business-focused training that builds the ability to solve real
                problems creatively — not abstract frameworks or generic soft-skills modules.
              </p>
            </div>
            <div>
              <div className="text-6xl font-bold tracking-tighter text-primary mb-6">2.</div>
              <h3 className="text-2xl font-bold mb-4">Analytical Rigor</h3>
              <p className="text-muted-foreground leading-relaxed">
                The ability to think through decisions with structure and precision — turning
                better thinking into measurable business outcomes.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Who We Serve */}
      <section className="py-32 border-t border-border bg-foreground text-background">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance max-w-2xl">
              Segmented by audience.
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] opacity-50">
              Who We Serve / 02
            </span>
          </div>
          <div className="grid md:grid-cols-3 gap-px bg-white/10">
            {SEGMENTS.map((s) => (
              <div key={s.n} className="bg-foreground py-16 px-8">
                <span className="text-xs font-mono text-primary mb-6 block">[ {s.n} ]</span>
                <h3 className="text-2xl font-bold mb-4">{s.title}</h3>
                <p className="text-sm text-background/60 leading-relaxed mb-8">{s.body}</p>
                <Link
                  to={s.href}
                  className="text-[11px] font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-primary transition-colors"
                >
                  {s.cta} →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* Why Centric Essentials */}
      <section className="py-32 px-6 border-t border-border bg-secondary">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-baseline mb-20 gap-8">
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-balance max-w-2xl">
              Why Centric Essentials.
            </h2>
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
              Why Us / 04
            </span>
          </div>
          <div className="grid md:grid-cols-2 gap-x-16 gap-y-12">
            {WHY.map((point, i) => (
              <div key={point} className="flex gap-6 border-t border-border pt-8">
                <span className="font-mono text-xs text-primary">0{i + 1}</span>
                <p className="text-lg leading-relaxed">{point}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABand
        title="Ready to build a sharper team?"
        body="Book a consultation to discuss your organization's needs — anywhere in the world."
      />
    </>
  );
}
