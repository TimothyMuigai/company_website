"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type NavItem = { label: string; href: string; external?: boolean };
type NavGroup = { label: string; items: NavItem[] };

const groups: NavGroup[] = [
  { label: "Due diligence", items: [{ label: "Operating model", href: "/due-diligence" }, { label: "Workflow assessment", href: "/assessment" }, { label: "Pricing & engagements", href: "/pricing" }] },
  { label: "Capabilities", items: [{ label: "Image authentication", href: "/solution/image-authentication" }, { label: "Audio authentication", href: "/solution/audio-authentication" }, { label: "Gotham", href: "/solution/gotham" }, { label: "Sentinel", href: "/sentinel" }] },
  { label: "Industries", items: [{ label: "Financial services", href: "/industries/financial-services" }, { label: "Insurance", href: "/industries/insurance" }, { label: "Media houses", href: "/industries/media" }, { label: "Government", href: "/industries/government" }, { label: "Flexible workspaces", href: "/industries/flexible-workspaces" }] },
  { label: "Developers", items: [{ label: "Evidence Assessment API", href: "/productApi" }, { label: "Developer console", href: "/console" }, { label: "Documentation", href: "https://www.deeptrack.io/docs/introduction", external: true }] },
  { label: "Intelligence", items: [{ label: "Research", href: "/research" }, { label: "News Center", href: "/news" }, { label: "NACHA resource", href: "/resources/nacha-2026-checklist" }] },
  { label: "Partners", items: [{ label: "Partner with Deeptrack", href: "/partners" }, { label: "Partner Portal", href: "/portal/login" }] },
  { label: "Company", items: [{ label: "About Deeptrack", href: "/about" }, { label: "Careers", href: "/career" }, { label: "Investor access", href: "https://investors.deeptrack.io/", external: true }, { label: "Contact", href: "/contact" }] },
];

function NavDestination({ item, onNavigate, mobile = false }: { item: NavItem; onNavigate: () => void; mobile?: boolean }) {
  const className = mobile
    ? "flex items-center gap-2 py-2 text-sm text-[#808080] transition-colors hover:text-[#0191DA]"
    : "flex items-center justify-between rounded-sm px-3 py-2 text-sm leading-5 text-[#333333] transition-colors hover:bg-[#E6F4FB] hover:text-[#0191DA]";
  return item.external ? <a href={item.href} target="_blank" rel="noreferrer" onClick={onNavigate} className={className}>{item.label}<ArrowUpRight size={13} /></a> : <Link href={item.href} onClick={onNavigate} className={className}>{item.label}</Link>;
}

export default function EnterpriseHeader() {
  const [activeGroup, setActiveGroup] = useState<number | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const closeMenus = (event: MouseEvent) => {
      if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
        setActiveGroup(null);
        setMobileOpen(false);
        setMobileGroup(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveGroup(null);
        setMobileOpen(false);
        setMobileGroup(null);
      }
    };
    document.addEventListener("mousedown", closeMenus);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("mousedown", closeMenus);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, []);

  const closeAll = () => {
    setActiveGroup(null);
    setMobileOpen(false);
    setMobileGroup(null);
  };

  return (
    <header ref={headerRef} className="relative sticky top-0 z-50 border-b border-[#CCE9F8] bg-white/95 backdrop-blur">
      <div className="mx-auto flex h-[76px] max-w-[1540px] items-center justify-between gap-5 px-5 lg:px-8">
        <Link href="/" aria-label="Deeptrack home" onClick={closeAll} className="flex shrink-0 items-center">
          <Image src="/logos/deeptrack-high-resolution-logo-black-transparent.png" alt="Deeptrack" width={170} height={36} className="h-7 w-auto" priority />
        </Link>

        <nav className="hidden min-w-0 flex-1 items-center justify-center gap-3 xl:flex" aria-label="Primary navigation">
          {groups.map((group, index) => {
            const isOpen = activeGroup === index;
            return <button key={group.label} type="button" aria-expanded={isOpen} aria-controls="desktop-navigation-panel" onClick={() => setActiveGroup(isOpen ? null : index)} className="flex cursor-pointer items-center gap-1 whitespace-nowrap text-[12px] font-medium text-[#333333] transition-colors hover:text-[#0191DA] focus-visible:outline focus-visible:outline-2 focus-visible:outline-[#0191DA]">
              {group.label}<ChevronDown size={13} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} />
            </button>;
          })}
        </nav>

        <Link href="/contact" onClick={closeAll} className="hidden shrink-0 items-center gap-2 bg-[#0191DA] px-4 py-3 text-[12px] font-semibold text-white transition-colors hover:bg-[#34A7E1] sm:flex">Request an assessment <ArrowUpRight size={15} /></Link>

        <button type="button" className="grid h-10 w-10 place-items-center text-[#333333] xl:hidden" aria-label={mobileOpen ? "Close navigation" : "Open navigation"} aria-expanded={mobileOpen} onClick={() => setMobileOpen((open) => !open)}>
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div id="desktop-navigation-panel" aria-hidden={activeGroup === null} className={`absolute left-0 right-0 top-full hidden origin-top border-t border-[#CCE9F8] bg-white shadow-lg transition-all duration-200 xl:block ${activeGroup === null ? "pointer-events-none -translate-y-2 opacity-0" : "translate-y-0 opacity-100"}`}>
        <div className="mx-auto max-w-[960px] p-5">
          {activeGroup !== null && <div className="grid grid-cols-2 gap-3 md:grid-cols-4">{groups[activeGroup].items.map((item) => <NavDestination key={item.href} item={item} onNavigate={closeAll} />)}</div>}
        </div>
      </div>

      <div className={`absolute left-0 right-0 top-full z-40 max-h-[calc(100vh-76px)] overflow-y-auto border-t border-[#CCE9F8] bg-white px-5 py-6 shadow-lg transition-all duration-200 xl:hidden ${mobileOpen ? "translate-y-0 opacity-100" : "pointer-events-none -translate-y-2 opacity-0"}`}>
        <nav className="grid gap-2 lg:grid-cols-2" aria-label="Mobile navigation">
          {groups.map((group, index) => {
            const isOpen = mobileGroup === index;
            return <div key={group.label} className="border-b border-[#E6F4FB] py-3"><button type="button" aria-expanded={isOpen} onClick={() => setMobileGroup(isOpen ? null : index)} className="flex w-full items-center justify-between font-[family-name:var(--font-space-grotesk)] text-lg font-medium"><span>{group.label}</span><ChevronDown size={17} className={`transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`} /></button><div className={`grid overflow-hidden transition-all duration-200 ${isOpen ? "mt-3 max-h-64 opacity-100" : "max-h-0 opacity-0"}`}>{group.items.map((item) => <NavDestination key={item.href} item={item} onNavigate={closeAll} mobile />)}</div></div>;
          })}
        </nav>
        <Link href="/contact" onClick={closeAll} className="mt-6 inline-flex items-center gap-2 bg-[#0191DA] px-4 py-3 text-sm font-semibold text-white">Request an assessment <ArrowUpRight size={15} /></Link>
      </div>
    </header>
  );
}
