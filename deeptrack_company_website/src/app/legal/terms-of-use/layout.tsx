import type { Metadata } from "next";
export const metadata: Metadata = { title: "Terms of Use", description: "Read Deeptrack’s terms of use.", alternates: { canonical: "/legal/terms-of-use" } };
export default function TermsLayout({ children }: { children: React.ReactNode }) { return children; }
