import type { Metadata } from "next";
export const metadata: Metadata = { title: "Careers", description: "Explore career opportunities at Deeptrack.", alternates: { canonical: "/career" } };
export default function CareerLayout({ children }: { children: React.ReactNode }) { return children; }
