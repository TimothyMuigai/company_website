import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowRight, MapPin } from "lucide-react";
import { notFound } from "next/navigation";
import EnterpriseHeader from "@/components/enterprise/EnterpriseHeader";
import EnterpriseFooter from "@/components/enterprise/EnterpriseFooter";
import { jobs } from "@/data/jobs";

export function generateStaticParams() {
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  return job ? { title: job.title, description: job.summary, alternates: { canonical: `/career/${job.slug}` } } : { title: "Role not found" };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = jobs.find((item) => item.slug === slug);
  if (!job) notFound();

  return <div className="min-h-screen bg-white text-[#333333]"><EnterpriseHeader /><main>
    <section className="border-b border-[#CCE9F8] bg-[#F2F9FD]"><div className="mx-auto max-w-[1180px] px-5 py-16 lg:px-10 lg:py-24"><Link href="/career" className="inline-flex items-center gap-2 text-sm font-semibold text-[#0191DA] hover:text-[#34A7E1]"><ArrowLeft size={16} /> All careers</Link><p className="mt-10 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0191DA]">{job.department}</p><h1 className="mt-4 max-w-4xl font-[family-name:var(--font-space-grotesk)] text-5xl font-medium tracking-[-0.06em] sm:text-6xl">{job.title}</h1><div className="mt-6 flex flex-wrap gap-5 text-sm text-[#808080]"><span className="inline-flex items-center gap-2"><MapPin size={16} className="text-[#0191DA]" />{job.location}</span><span>{job.employmentType}</span></div></div></section>
    <section className="mx-auto grid max-w-[1180px] gap-12 px-5 py-20 lg:grid-cols-[.7fr_1.3fr] lg:px-10 lg:py-28"><aside><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0191DA]">The opportunity</p><p className="mt-5 text-lg leading-8 text-[#808080]">{job.description}</p><Link href="/contact?topic=careers" className="mt-8 inline-flex items-center gap-2 bg-[#0191DA] px-5 py-4 text-sm font-semibold text-white hover:bg-[#34A7E1]">Discuss this role <ArrowRight size={17} /></Link></aside><div className="space-y-12"><div><h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-medium tracking-[-0.05em]">What you will do</h2><ul className="mt-6 space-y-4">{(job.responsibilities ?? []).map((item) => <li key={item} className="border-l-2 border-[#0191DA] pl-5 text-base leading-7 text-[#808080]">{item}</li>)}</ul></div><div><h2 className="font-[family-name:var(--font-space-grotesk)] text-3xl font-medium tracking-[-0.05em]">What we are looking for</h2><ul className="mt-6 space-y-4">{(job.requirements ?? []).map((item) => <li key={item} className="border-l-2 border-[#CCE9F8] pl-5 text-base leading-7 text-[#808080]">{item}</li>)}</ul></div></div></section>
  </main><EnterpriseFooter /></div>;
}
