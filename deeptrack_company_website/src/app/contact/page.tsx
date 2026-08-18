"use client";

import { useState } from "react";
import Link from "next/link";
import EnterpriseHeader from "@/components/enterprise/EnterpriseHeader";
import EnterpriseFooter from "@/components/enterprise/EnterpriseFooter";

/** Deeptrack enterprise due-diligence design: assessment-first contact journey using approved brand colors only. */
export default function Contact() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [jobTitle, setJobTitle] = useState("");
  const [company, setCompany] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ firstName, lastName, email, jobTitle, company, message }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data?.message || "Submission failed.");
      setSuccess("Thank you. Your assessment request has been received.");
      setFirstName(""); setLastName(""); setEmail(""); setJobTitle(""); setCompany(""); setMessage("");
    } catch (submitError: unknown) {
      setError(submitError instanceof Error ? submitError.message : "Network error. Please try again.");
    } finally { setLoading(false); }
  };

  const inputClass = "mt-2 w-full border-b border-[#99D3F0] bg-transparent px-0 py-3 text-sm text-[#333333] outline-none transition-colors placeholder:text-[#808080] focus:border-[#0191DA]";
  return <div className="min-h-screen bg-white text-[#333333]"><EnterpriseHeader /><main><section className="bg-[#F2F9FD]"><div className="mx-auto max-w-[1180px] px-5 py-16 lg:px-10 lg:py-24"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0191DA]">Request an assessment</p><div className="mt-5 grid gap-12 lg:grid-cols-[.85fr_1.15fr]"><div><h1 className="max-w-lg font-[family-name:var(--font-space-grotesk)] text-5xl font-medium tracking-[-0.06em] sm:text-6xl">Bring us the decision before it becomes an incident.</h1><p className="mt-7 max-w-md text-base leading-7 text-[#808080]">Tell us about one workflow where identity, media, or AI-generated evidence could change the outcome. We will use the discovery conversation to scope the relevant evidence, owners, and constraints.</p><p className="mt-8 border-l-2 border-[#0191DA] pl-4 text-sm leading-6 text-[#808080]">Commercial terms are provided through a tailored proposal. Timeline is scoped per engagement.</p></div><form onSubmit={handleSubmit} className="bg-white p-6 sm:p-9"><div className="grid gap-6 sm:grid-cols-2"><label className="text-sm font-medium">First name<input value={firstName} onChange={(event) => setFirstName(event.target.value)} required className={inputClass} placeholder="First name" /></label><label className="text-sm font-medium">Last name<input value={lastName} onChange={(event) => setLastName(event.target.value)} required className={inputClass} placeholder="Last name" /></label></div><label className="mt-6 block text-sm font-medium">Work email<input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required className={inputClass} placeholder="name@company.com" /></label><div className="mt-6 grid gap-6 sm:grid-cols-2"><label className="text-sm font-medium">Job title<input value={jobTitle} onChange={(event) => setJobTitle(event.target.value)} required className={inputClass} placeholder="Your role" /></label><label className="text-sm font-medium">Company or organization<input value={company} onChange={(event) => setCompany(event.target.value)} required className={inputClass} placeholder="Organization name" /></label></div><label className="mt-6 block text-sm font-medium">What decision or workflow should we assess?<textarea value={message} onChange={(event) => setMessage(event.target.value)} required rows={5} className={`${inputClass} resize-y`} placeholder="For example: high-risk claims evidence, source-media verification, member onboarding, or payment instructions." /></label>{success && <p className="mt-5 text-sm leading-6 text-[#0191DA]">{success}</p>}{error && <p className="mt-5 text-sm leading-6 text-[#333333]">{error}</p>}<p className="mt-6 text-xs leading-5 text-[#808080]">By submitting, you agree that Deeptrack may use this information to respond to your request. Read our <Link className="underline decoration-[#0191DA] underline-offset-4" href="/legal/privacy-policy">Privacy Policy</Link>.</p><button type="submit" disabled={loading} className="mt-7 bg-[#0191DA] px-5 py-4 text-sm font-semibold text-white transition-colors hover:bg-[#34A7E1] disabled:opacity-60">{loading ? "Sending request…" : "Request an assessment"}</button></form></div></div></section></main><EnterpriseFooter /></div>;
}
