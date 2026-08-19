import type { Metadata } from "next";
export const metadata: Metadata = { title: "Privacy Policy", description: "Read Deeptrack’s privacy policy.", alternates: { canonical: "/legal/privacy-policy" } };
export default function PrivacyLayout({ children }: { children: React.ReactNode }) { return children; }
