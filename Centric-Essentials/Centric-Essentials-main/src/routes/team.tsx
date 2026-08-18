import { createFileRoute } from "@tanstack/react-router";
import { PageHeader, CTABand } from "@/components/site-chrome";
import mildredPhoto from "@/assets/mildred.jpeg";

export const Route = createFileRoute("/team")({
  component: TeamPage,
  head: () => ({
    meta: [
      { title: "Team — Centric Essentials Consulting" },
      {
        name: "description",
        content:
          "Meet the leadership behind Centric Essentials Consulting, driving human capital initiatives and impact excellence across Africa.",
      },
      { property: "og:title", content: "Team — Centric Essentials Consulting" },
      {
        property: "og:description",
        content: "Unlocking human potential — meet our leadership.",
      },
    ],
  }),
});

function TeamPage() {
  return (
    <>
      <PageHeader
        eyebrow="Our People / 01"
        title={
          <>
            Unlocking <br />
            human potential.
          </>
        }
        intro="The leadership driving Centric Essentials' work across programme development, organizational effectiveness, and impact excellence."
      />

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-12 gap-12">
          <div className="lg:col-span-4">
            <div className="aspect-[3/4] overflow-hidden bg-secondary">
              <img
                src={mildredPhoto}
                alt="Mildred Wasike, Director"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-8 flex flex-col justify-center">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-4">
              Director
            </span>
            <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
              Mildred Wasike
            </h2>
            <p className="text-lg leading-relaxed text-muted-foreground">
              Seasoned expert in programme development, organizational effectiveness, and impact
              excellence, dedicated to advancing innovation, systems programming, and human
              capital potential across Africa.
            </p>
          </div>
        </div>
      </section>

      <CTABand
        title="Work with our team."
        body="Book a scoping call to discuss how our leadership can support your organization's needs."
        ctaLabel="Talk to Us"
      />
    </>
  );
}
