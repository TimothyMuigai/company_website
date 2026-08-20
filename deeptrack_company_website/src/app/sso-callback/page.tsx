"use client";

import Link from "next/link";
import { AuthenticateWithRedirectCallback } from "@clerk/nextjs";

export default function SSOCallbackPage() {
  if (!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY) {
    return <main className="grid min-h-screen place-items-center bg-[#F2F9FD] px-5 text-center text-[#333333]"><div className="max-w-md"><p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[#0191DA]">Single sign-on</p><h1 className="mt-4 font-[family-name:var(--font-space-grotesk)] text-4xl font-medium">SSO is not configured for this preview.</h1><p className="mt-4 text-sm leading-6 text-[#808080]">Return to the public site or use the configured portal environment to continue.</p><Link href="/" className="mt-7 inline-flex bg-[#0191DA] px-5 py-3 text-sm font-semibold text-white">Back to Deeptrack</Link></div></main>;
  }
  return <AuthenticateWithRedirectCallback />;
}
