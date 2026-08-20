import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import EnterpriseHeader from "@/components/enterprise/EnterpriseHeader";
import EnterpriseFooter from "@/components/enterprise/EnterpriseFooter";
import { jobs } from "@/data/jobs";

export const metadata: Metadata = {
  title: "Careers at Deeptrack",
  description: "Join Deeptrack in building more defensible evidence workflows for high-consequence decisions.",
  alternates: { canonical: "/career" },
};

export default function Careers() {
  return (
    <div className="min-h-screen bg-white text-[#333333]"><EnterpriseHeader /><main>
      <section className="border-b border-[#CCE9F8] bg-[#F2F9FD]"><div className="mx-auto max-w-[1180px] px-5 py-16 lg:px-10 lg:py-24"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0191DA]">Careers at Deeptrack</p><h1 className="mt-5 max-w-4xl font-[family-name:var(--font-space-grotesk)] text-5xl font-medium tracking-[-0.06em] sm:text-6xl">Build the record behind better decisions.</h1><p className="mt-7 max-w-2xl text-lg leading-8 text-[#808080]">We are building tools and operating practices that help teams assess evidence, understand risk, and act with greater confidence.</p></div></section>
      <section className="mx-auto max-w-[1180px] px-5 py-20 lg:px-10 lg:py-28"><div className="mb-10 flex flex-col justify-between gap-5 border-b border-[#CCE9F8] pb-8 sm:flex-row sm:items-end"><div><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0191DA]">Open opportunities</p><h2 className="mt-3 font-[family-name:var(--font-space-grotesk)] text-3xl font-medium tracking-[-0.05em]">Find your place at Deeptrack.</h2></div><p className="max-w-sm text-sm leading-6 text-[#808080]">We welcome thoughtful builders, researchers, operators, and leaders who care about evidence and accountability.</p></div><div className="grid gap-4">{jobs.map((job) => <Link key={job.slug} href={`/career/${job.slug}`} className="group grid gap-5 border-b border-[#CCE9F8] py-7 transition-colors hover:bg-[#F2F9FD] sm:grid-cols-[1fr_auto] sm:items-center sm:px-5"><div><p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-[#0191DA]">{job.department}</p><h3 className="mt-2 font-[family-name:var(--font-space-grotesk)] text-2xl font-medium">{job.title}</h3><p className="mt-2 max-w-2xl text-sm leading-6 text-[#808080]">{job.summary}</p><div className="mt-3 flex flex-wrap gap-4 text-xs text-[#808080]"><span className="inline-flex items-center gap-1"><MapPin size={13} />{job.location}</span><span>{job.employmentType}</span></div></div><span className="inline-flex items-center gap-2 text-sm font-semibold text-[#0191DA]">View role <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" /></span></Link>)}</div></section>
    </main><EnterpriseFooter /></div>
  );
}
