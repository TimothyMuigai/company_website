"use client";

import { usePathname } from "next/navigation";
import EnterpriseFooter from "@/components/enterprise/EnterpriseFooter";

type FooterProps = { isGlobal?: boolean };

/** Deeptrack enterprise due-diligence design: legacy public routes reuse the comprehensive footer; authenticated portal surfaces remain excluded. */
export default function FinalCTASection({ isGlobal: _isGlobal = false }: FooterProps) {
  const pathname = usePathname();
  if (pathname?.startsWith("/portal") || pathname?.startsWith("/console") || pathname?.startsWith("/admin")) return null;
  return <EnterpriseFooter />;
}
