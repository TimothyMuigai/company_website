import type { Metadata } from "next";
import CapabilityPage, { capabilityData } from "@/components/enterprise/CapabilityPage";

/** Deeptrack enterprise due-diligence design: Sentinel route retains identity diligence without unsupported performance, regulatory, or outcome claims. */
export const metadata: Metadata = { title: "Sentinel Identity Diligence", description: "Assess identity and onboarding evidence as part of an owned enterprise diligence workflow.", alternates: { canonical: "/sentinel" } };
export default function SentinelPage() { return <CapabilityPage capability={capabilityData.sentinel} />; }
