import type { Metadata } from "next";
import CapabilityPage, { capabilityData } from "@/components/enterprise/CapabilityPage";

/** Deeptrack enterprise due-diligence design: audio-assessment capability route preserves the legacy URL with verified, method-first positioning. */
export const metadata: Metadata = { title: "Audio Evidence Assessment", description: "Use audio and voice assessment as one evidence layer within enterprise due-diligence workflows.", alternates: { canonical: "/solution/audio-authentication" } };
export default function AudioAuthenticationPage() { return <CapabilityPage capability={capabilityData.audio} />; }
