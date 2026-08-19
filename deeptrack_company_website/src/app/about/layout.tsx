import type { Metadata } from "next";
/** SEO metadata for Deeptrack company information. */
export const metadata: Metadata = { title: "About Deeptrack", description: "Learn about Deeptrack’s enterprise due-diligence approach for identity, media, documents, and AI-generated evidence.", alternates: { canonical: "/about" } };
export default function AboutLayout({ children }: { children: React.ReactNode }) { return children; }
