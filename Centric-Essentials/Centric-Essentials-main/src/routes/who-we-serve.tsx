import { createFileRoute, Link } from "@tanstack/react-router";
import { PageHeader, CTABand } from "@/components/site-chrome";

export const Route = createFileRoute("/who-we-serve")({
  component: WhoWeServePage,
  head: () => ({
    meta: [
      { title: "Who We Serve — Centric Essentials Consulting" },
      {
        name: "description",
        content:
          "Corporates, SMEs, and funders / development partners — different audiences, different tracks, one methodology.",
      },
    ],
  }),
});

const AUDIENCES = [
  {
    n: "01",
    title: "For Corporates",
    body: "Strengthen decision-making and innovation capacity across your management and mid-level teams — in a single market or across a global footprint.",
    cta: "Corporate Solutions",
    href: "/services",
  },
  {
    n: "02",
    title: "For SMEs",
    body: "Build the practical thinking tools that determine whether your business adapts, competes, and grows.",
    cta: "SME Track",
    href: "/services",
  },
  {
    n: "03",
    title: "For Funders & Development Partners",
    body: "Partner with us to deliver measurable economic impact at regional or multi-country scale — stronger SME competitiveness, inclusive participation for women-led and youth-led enterprises, and sustained job creation.",
    cta: "Partner With Us",
    href: "/partners",
  },
];

function WhoWeServePage() {
  return (
    <>
      <PageHeader
        eyebrow="Who We Serve / 01"
        title="Three audiences. Distinct tracks."
        intro="Corporate teams, SME owner-managers, and funders face different problems. We build separate programme tracks for each — anchored in the same underlying methodology."
      />

      <section className="py-24 px-6 border-b border-border bg-foreground text-background">
        <div className="max-w-7xl mx-auto space-y-px bg-white/10">
          {AUDIENCES.map((a) => (
            <div key={a.n} className="bg-foreground p-10 md:p-16 grid lg:grid-cols-12 gap-8">
              <div className="lg:col-span-2 font-mono text-primary text-sm">[ {a.n} ]</div>
              <div className="lg:col-span-6">
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">{a.title}</h2>
              </div>
              <div className="lg:col-span-4">
                <p className="text-background/70 leading-relaxed mb-6">{a.body}</p>
                <Link
                  to={a.href}
                  className="text-[11px] font-bold uppercase tracking-widest border-b border-primary pb-1 hover:text-primary transition-colors"
                >
                  {a.cta} →
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      <CTABand
        title="Talk to us."
        body="Not sure which track fits? A 20-minute call is usually enough to point you in the right direction."
      />
    </>
  );
}
