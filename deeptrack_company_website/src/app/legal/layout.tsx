import type { Metadata } from "next";
export const metadata: Metadata = { title: "Legal Center", description: "Deeptrack legal policies and terms.", alternates: { canonical: "/legal" } };
export default function LegalLayout({ children }: { children: React.ReactNode }) { return children; }
