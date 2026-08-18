import type { Metadata } from "next";
import EnterpriseLanding from "@/components/enterprise/EnterpriseLanding";

/** Deeptrack enterprise due-diligence design: homepage metadata matches the new enterprise category without unsupported claims. */
export const metadata: Metadata = { title: "Enterprise AI, Identity & Media Due Diligence | Deeptrack", description: "Deeptrack helps high-consequence teams assess identity, media, and AI-generated evidence before it enters a consequential workflow.", alternates: { canonical: "/" } };

export default function Home() {
  return <EnterpriseLanding />;
}
