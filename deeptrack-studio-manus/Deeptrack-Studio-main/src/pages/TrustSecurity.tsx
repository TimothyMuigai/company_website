/** Design intent: A concise, non-overclaiming trust layer for sensitive AI engagements. */
import { Check, LockKeyhole, ShieldCheck } from "lucide-react";
import { Seo } from "@/components/Seo";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";

const principles = [
  ["Clear access boundaries", "Access requirements, systems involved, and working assumptions are scoped before delivery begins."],
  ["Confidentiality by design", "Client context, sensitive operating information, and non-public project details are handled through agreed working arrangements."],
  ["Defined ownership", "Deliverables, documentation, and handover expectations are set out in the engagement terms so the client is clear on what they receive."],
  ["Practical handover", "The goal is to leave the client with documentation and ownership—not create dependency through unnecessary opacity."],
];

export default function TrustSecurity() {
  return (
    <SiteLayout>
      <Seo title="AI Engagement Trust & Security | Deeptrack Studio" description="How Deeptrack Studio approaches access boundaries, confidentiality, ownership, and practical handover for sensitive applied AI work." path="/trust-security" schema={{ "@context": "https://schema.org", "@type": "WebPage", name: "Deeptrack Studio Trust & Security" }} />
      <PageHeader eyebrow="Trust & security" title="Sensitive work needs clear operating boundaries." summary="Deeptrack Studio treats access, confidentiality, ownership, and handover as work to define during scoping—not assumptions to discover after delivery starts." />
      <section className="section section--open"><div className="content-shell trust-principles"><div className="trust-principles__intro"><ShieldCheck size={32} /><h2>What we commit to before delivery begins.</h2><p>Specific security controls, deployment requirements, and data-handling obligations depend on the engagement. The responsible approach is to agree them directly, in writing, before work starts.</p></div><div>{principles.map(([title, detail], index) => <article key={title} className="trust-principle"><span>0{index + 1}</span><div><h3>{title}</h3><p>{detail}</p></div></article>)}</div></div></section>
      <section className="section section--tint"><div className="content-shell security-note"><LockKeyhole size={24} /><div><p className="micro-label">Important context</p><h2>We do not claim certifications, compliance coverage, or security controls that have not been explicitly agreed and verified for the client engagement.</h2></div><p><Check size={16} /> Bring data sensitivity, hosting, access, retention, regulatory, and procurement requirements to the discovery conversation. They become part of the scope.</p></div></section>
    </SiteLayout>
  );
}
