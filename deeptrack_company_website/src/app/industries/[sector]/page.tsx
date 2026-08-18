import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SectorPage, { getSector, getSectorSlugs } from "@/components/enterprise/SectorPage";

/** Deeptrack enterprise due-diligence design: SEO-ready sector pages generated from the shared evidence-led framework. */
export function generateStaticParams() { return getSectorSlugs().map((sector) => ({ sector })); }
export async function generateMetadata({ params }: { params: Promise<{ sector: string }> }): Promise<Metadata> { const { sector } = await params; const item = getSector(sector); return { title: item ? `${item.label} Due Diligence` : "Industry Due Diligence", description: item?.intro, alternates: { canonical: `/industries/${sector}` } }; }
export default async function IndustryPage({ params }: { params: Promise<{ sector: string }> }) { const { sector } = await params; if (!getSector(sector)) notFound(); return <SectorPage slug={sector} />; }
