import type { Metadata } from "next";
import CapabilityPage, { capabilityData } from "@/components/enterprise/CapabilityPage";

/** Deeptrack enterprise due-diligence design: image-assessment capability route preserves the legacy URL with verified, method-first positioning. */
export const metadata: Metadata = { title: "Image Evidence Assessment", description: "Use image assessment as one evidence layer within enterprise due-diligence workflows.", alternates: { canonical: "/solution/image-authentication" } };
export default function ImageAuthenticationPage() { return <CapabilityPage capability={capabilityData.image} />; }
