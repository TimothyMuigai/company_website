import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check, FileSearch, ShieldCheck, Workflow, Radar } from "lucide-react";
import EnterpriseHeader from "./EnterpriseHeader";
import EnterpriseFooter from "./EnterpriseFooter";
import EnterpriseFaqSection from "./EnterpriseFaqSection";

/** Deeptrack enterprise due-diligence design: editorial evidence rail, white/pale-blue canvas, approved brand palette only. */
const capabilities = [
  [FileSearch, "Evidence assessment", "Assess identity, documents, images, video, and audio for provenance, manipulation risk, and decision relevance."],
  [ShieldCheck, "Risk diligence", "Map where unreliable evidence, synthetic media, or identity fraud can affect a high-consequence workflow."],
  [Workflow, "Workflow deployment", "Place verification, review, escalation, and documentation into the operating process your team already owns."],
  [Radar, "Monitoring & response", "Triage higher-risk events and preserve the evidence and reviewer context needed for follow-up."],
];

const sectors = [
  ["Financial services", "Digital identity, high-risk onboarding, payment instructions, and fraud investigations.", "/industries/financial-services", "01"],
  ["Insurance", "Claims evidence, underwriting materials, investigation files, and high-risk payout decisions.", "/industries/insurance", "02"],
  ["Media houses", "Publication, source material, user-generated media, editorial review, and corrections workflows.", "/industries/media", "03"],
  ["Government", "Public-interest evidence, service integrity, investigations, procurement, and public communications.", "/industries/government", "04"],
  ["Flexible workspaces", "Member and tenant onboarding, visitor exceptions, vendor review, and community-safety incidents.", "/industries/flexible-workspaces", "05"],
];

const process = [
  ["01", "Map the decision", "Identify where an irreversible or high-consequence decision depends on digital evidence."],
  ["02", "Collect the record", "Define the relevant identity, media, document, provenance, and workflow context."],
  ["03", "Evaluate & review", "Combine automated signals with owned human review and escalation thresholds."],
  ["04", "Document & respond", "Preserve the evidence, disposition, and next action in a decision record."],
];

const organisationPathways = [
  ["Workflow assessment", "Map a consequential decision and its evidence, review, ownership, and escalation requirements.", "/assessment", "Assess"],
  ["Pricing & engagements", "Explore diagnostic, advisory, build, hardening, training, and research pathways without a generic public price card.", "/pricing", "Explore"],
  ["Developer platform", "Connect evidence assessment to an existing product, case-management system, or operational workflow.", "/productApi", "Build"],
  ["Partner ecosystem", "Connect channel, technology, or delivery collaboration to a real enterprise workflow.", "/partners", "Partner"],
  ["News Center", "Request access to the retained intelligence resource for relevant digital-evidence developments.", "/news", "Monitor"],
  ["Research", "Explore applied work on evidence integrity, AI manipulation, and decision readiness.", "/research", "Read"],
];

export default function EnterpriseLanding() {
  return (
    <div className="min-h-screen bg-white text-[#333333]">
      <EnterpriseHeader />
      <main>
        <section className="border-b border-[#CCE9F8] bg-[#F2F9FD]">
          <div className="mx-auto grid max-w-[1440px] gap-10 px-5 py-14 lg:grid-cols-[1.08fr_.92fr] lg:px-10 lg:py-24">
            <div className="flex max-w-3xl flex-col justify-center">
              <div className="flex items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0191DA]"><span className="flex gap-1"><i className="block h-3 w-[3px] bg-[#0191DA]" /><i className="mt-1 block h-2 w-[3px] bg-[#34A7E1]" /><i className="mt-2 block h-1 w-[3px] bg-[#67BDE9]" /></span>Enterprise due diligence</div>
              <h1 className="mt-7 font-[family-name:var(--font-space-grotesk)] text-5xl font-medium tracking-[-0.06em] text-[#333333] sm:text-6xl lg:text-7xl">Know what you can trust before you act on it.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-[#808080]">Deeptrack helps high-consequence teams assess identity, media, and AI-generated evidence before it enters a financial, claims, editorial, public-sector, or workspace decision.</p>
              <div className="mt-9 flex flex-wrap gap-3"><Link href="/contact" className="inline-flex items-center gap-2 bg-[#0191DA] px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#34A7E1]">Request a due-diligence assessment <ArrowRight size={17} /></Link><Link href="/due-diligence" className="inline-flex items-center gap-2 border border-[#333333] px-5 py-4 text-sm font-semibold text-[#333333] transition-colors hover:border-[#0191DA] hover:text-[#0191DA]">How it works <ArrowRight size={17} /></Link></div>
              <p className="mt-8 border-l-2 border-[#0191DA] pl-4 text-sm leading-6 text-[#808080]">Deepfake and synthetic-media detection is one evidence layer—combined with provenance, risk context, human review, and an audit-ready decision record.</p>
            </div>
            <div className="relative min-h-[440px] overflow-hidden bg-[#333333] sm:min-h-[520px]"><Image src="/industry_photos/Rectangle 7.png" alt="Financial district representing high-consequence business decisions" fill priority className="object-cover opacity-80" /><div className="absolute inset-0 bg-gradient-to-t from-[#333333] via-[#333333]/20 to-transparent" /><div className="absolute bottom-0 left-0 right-0 p-7 text-white"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#99D3F0]">Decision readiness</p><p className="mt-3 max-w-sm font-[family-name:var(--font-space-grotesk)] text-2xl leading-tight">A record of what was reviewed, how it was assessed, and what happened next.</p></div></div>
          </div>
        </section>

        <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28"><div className="max-w-3xl"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0191DA]">What Deeptrack does</p><h2 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-4xl font-medium tracking-[-0.05em] sm:text-5xl">Make high-consequence digital decisions more defensible.</h2></div><div className="mt-14 grid border-t border-[#CCE9F8] md:grid-cols-2 xl:grid-cols-4">{capabilities.map(([Icon, title, body], index) => <article key={title as string} className="border-b border-[#CCE9F8] py-8 pr-8 md:border-r md:px-7 xl:last:border-r-0"><span className="text-sm text-[#808080]">0{index + 1}</span><Icon className="mt-8 text-[#0191DA]" size={25} strokeWidth={1.7} /><h3 className="mt-5 font-[family-name:var(--font-space-grotesk)] text-xl font-medium">{title as string}</h3><p className="mt-3 text-sm leading-6 text-[#808080]">{body as string}</p></article>)}</div></section>

        <section className="bg-[#E6F4FB]"><div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28"><div className="flex flex-col justify-between gap-6 border-b border-[#99D3F0] pb-10 lg:flex-row lg:items-end"><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0191DA]">Sector pathways</p><h2 className="mt-4 max-w-3xl font-[family-name:var(--font-space-grotesk)] text-4xl font-medium tracking-[-0.05em] sm:text-5xl">Different evidence. The same need for a decision you can stand behind.</h2></div><Link href="/contact" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0191DA] hover:text-[#34A7E1]">Discuss your workflow <ArrowRight size={16} /></Link></div><div className="grid md:grid-cols-2 xl:grid-cols-5">{sectors.map(([name, description, href, number]) => <Link href={href} key={href} className="group min-h-[245px] border-b border-[#99D3F0] py-7 pr-7 transition-colors hover:bg-white/60 md:border-r md:px-6 xl:last:border-r-0"><span className="text-sm text-[#0191DA]">{number}</span><h3 className="mt-10 font-[family-name:var(--font-space-grotesk)] text-2xl font-medium">{name}</h3><p className="mt-4 text-sm leading-6 text-[#808080]">{description}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0191DA]">Explore <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>

        <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28"><div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr]"><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0191DA]">The diligence record</p><h2 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-4xl font-medium tracking-[-0.05em]">From isolated signal to an owned decision.</h2><p className="mt-6 max-w-md text-base leading-7 text-[#808080]">The aim is not an automated verdict. It is a repeatable path for your team to assess evidence, apply context, determine ownership, and preserve the resulting record.</p><Link href="/due-diligence" className="mt-8 inline-flex items-center gap-2 text-sm font-semibold text-[#0191DA]">See the operating model <ArrowRight size={16} /></Link></div><div className="border-t border-[#CCE9F8]">{process.map(([number, title, body]) => <div key={number} className="grid gap-4 border-b border-[#CCE9F8] py-7 sm:grid-cols-[70px_1fr_1.2fr]"><span className="text-sm text-[#0191DA]">{number}</span><h3 className="font-[family-name:var(--font-space-grotesk)] text-xl font-medium">{title}</h3><p className="text-sm leading-6 text-[#808080]">{body}</p></div>)}</div></div></section>

        <section className="bg-[#F2F9FD]"><div className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28"><div className="max-w-3xl"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0191DA]">The broader Deeptrack platform</p><h2 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-4xl font-medium tracking-[-0.05em] sm:text-5xl">More than a detection page. A connected set of enterprise paths.</h2><p className="mt-5 max-w-2xl text-base leading-7 text-[#808080]">Choose the route that matches your decision: assess a workflow, shape an engagement, integrate a capability, collaborate as a partner, or follow relevant intelligence.</p></div><div className="mt-14 grid border-t border-[#CCE9F8] md:grid-cols-2 xl:grid-cols-3">{organisationPathways.map(([title, body, href, action], index) => <Link href={href} key={href} className="group min-h-64 border-b border-[#CCE9F8] py-8 pr-8 transition-colors hover:bg-white md:border-r md:px-7 xl:nth-[3n]:border-r-0"><span className="text-sm text-[#0191DA]">0{index + 1}</span><h3 className="mt-8 font-[family-name:var(--font-space-grotesk)] text-2xl font-medium">{title}</h3><p className="mt-4 max-w-sm text-sm leading-6 text-[#808080]">{body}</p><span className="mt-7 inline-flex items-center gap-2 text-sm font-semibold text-[#0191DA]">{action} <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" /></span></Link>)}</div></div></section>

        <section className="bg-[#333333] text-white"><div className="mx-auto grid max-w-[1440px] gap-12 px-5 py-20 lg:grid-cols-[1fr_1fr] lg:px-10 lg:py-28"><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#67BDE9]">Proof of diligence</p><h2 className="mt-4 max-w-xl font-[family-name:var(--font-space-grotesk)] text-4xl font-medium tracking-[-0.05em]">Show the work behind the decision.</h2><p className="mt-6 max-w-lg text-base leading-7 text-[#CCE9F8]">Until approved customer evidence is available, the site should demonstrate the diligence method—not invent testimonials or outcome statistics.</p></div><div className="grid gap-4 sm:grid-cols-2">{["Risk map & evidence inventory", "Review workflow & ownership", "Escalation design & decision record", "Implementation recommendation"].map((item) => <div key={item} className="flex min-h-32 items-start gap-3 border border-[#808080] p-5"><Check size={18} className="mt-0.5 shrink-0 text-[#0191DA]" /><span className="text-sm leading-6 text-[#E6F4FB]">{item}</span></div>)}</div></div></section>

        <EnterpriseFaqSection />
        <section className="mx-auto max-w-[1440px] px-5 py-20 lg:px-10 lg:py-28"><div className="border-y border-[#CCE9F8] py-14 text-center"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0191DA]">Start with one workflow</p><h2 className="mx-auto mt-4 max-w-4xl font-[family-name:var(--font-space-grotesk)] text-4xl font-medium tracking-[-0.05em] sm:text-5xl">Bring us the decision before the exposure becomes an event.</h2><p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-[#808080]">Request an assessment of the evidence, controls, owners, and escalation points behind one consequential workflow.</p><Link href="/contact" className="mt-8 inline-flex items-center gap-2 bg-[#0191DA] px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#34A7E1]">Request a due-diligence assessment <ArrowRight size={17} /></Link></div></section>
      </main>
      <EnterpriseFooter />
    </div>
  );
}
