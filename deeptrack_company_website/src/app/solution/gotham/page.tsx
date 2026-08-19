import type { Metadata } from "next";
import CapabilityPage, { capabilityData } from "@/components/enterprise/CapabilityPage";

/** Deeptrack enterprise due-diligence design: Gotham route retains the product path as a workflow and decision-record capability. */
export const metadata: Metadata = { title: "Gotham Evidence Workflow", description: "Coordinate evidence review, context, escalation, and decision records with Deeptrack Gotham.", alternates: { canonical: "/solution/gotham" } };
export default function GothamPage() { return <CapabilityPage capability={capabilityData.gotham} />; }
