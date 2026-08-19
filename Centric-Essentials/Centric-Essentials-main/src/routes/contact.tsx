import { createFileRoute } from "@tanstack/react-router";
import { PageHeader } from "@/components/site-chrome";
import { useState } from "react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
  head: () => ({
    meta: [
      { title: "Contact — Centric Essentials Consulting" },
      {
        name: "description",
        content:
          "Tell us about your team, organization, region, or funding priorities — and we'll follow up to schedule a conversation.",
      },
    ],
  }),
});

const INTERESTS = [
  "Corporate Training",
  "SME Training",
  "Funding Partnership",
  "Facilitator Network",
  "Other",
] as const;

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <>
      <PageHeader
        eyebrow="Contact / 01"
        title="Book a conversation."
        intro="Tell us about your team, your organization, your region, or your funding priorities — and we'll follow up to schedule a conversation, routed to the right regional lead."
      />

      <section className="py-24 px-6 border-b border-border">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-7">
            {submitted ? (
              <div className="border border-primary p-12">
                <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
                  Received / 200
                </span>
                <h2 className="text-3xl font-bold tracking-tight mb-4">Thank you.</h2>
                <p className="text-muted-foreground">
                  A regional lead will follow up within two business days to schedule a call.
                </p>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  setSubmitted(true);
                }}
                className="space-y-8"
              >
                <Field label="Name" name="name" required />
                <Field label="Organization" name="organization" required />
                <Field label="Region" name="region" placeholder="e.g. East Africa, Middle East, Europe" />
                <Field label="Email" name="email" type="email" required />

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-4">
                    I am interested in
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {INTERESTS.map((i) => (
                      <label
                        key={i}
                        className="flex items-center gap-3 border border-border p-3 cursor-pointer hover:border-primary transition-colors"
                      >
                        <input type="radio" name="interest" value={i} className="accent-primary" />
                        <span className="text-sm">{i}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:border-primary text-sm resize-none"
                    placeholder="Tell us about your team, region, and objectives."
                  />
                </div>

                <button
                  type="submit"
                  className="px-10 py-4 bg-foreground text-background font-bold uppercase tracking-widest text-xs hover:-translate-y-[2px] transition-transform"
                >
                  Book a Consultation
                </button>
              </form>
            )}
          </div>

          <div className="lg:col-span-5">
            <div className="border-t border-primary pt-6 mb-12">
              <span className="font-mono text-[10px] uppercase tracking-widest text-primary block mb-4">
                Direct Contact
              </span>
              <div className="space-y-4 text-sm">
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Web</div>
                  <div>www.centricessentials.co.ke</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">Email</div>
                  <div>hello@centricessentials.co.ke</div>
                </div>
                <div>
                  <div className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground mb-1">HQ</div>
                  <div>Nairobi, Kenya</div>
                </div>
              </div>
            </div>

            <div className="border-t border-border pt-6">
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-4">
                Regional Contacts
              </span>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li>East & Southern Africa · Nairobi</li>
                <li>West Africa · Lagos</li>
                <li>Middle East · Dubai</li>
                <li>Europe · London</li>
                <li>North America · New York</li>
                <li>Asia-Pacific · Singapore</li>
              </ul>
              <p className="mt-6 text-xs text-muted-foreground">
                Full regional contact details published as regional offices open.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="font-mono text-[10px] uppercase tracking-widest text-muted-foreground block mb-3">
        {label}
        {required && <span className="text-primary ml-1">*</span>}
      </label>
      <input
        type={type}
        name={name}
        required={required}
        placeholder={placeholder}
        className="w-full px-4 py-3 bg-background border border-border focus:outline-none focus:border-primary text-sm"
      />
    </div>
  );
}
