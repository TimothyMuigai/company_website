// import Image from "next/image";

// export default function Navbar() {
//   return (
//     <nav className="flex items-center justify-between px-8 py-6 mx-12 ">
//       {/* Logo */}
//       <div className="flex items-center">
//         <Image
//           src="/logos/deeptrack-high-resolution-logo-white-transparent.png"
//           alt="Deeptrack logo"
//           width={70}
//           height={32}
//           priority
//           className="h-auto w-auto"
//         />
//       </div>

//       {/* Links */}
//       <div className="hidden md:flex gap-8 text-sm text-white/70">
//         <a href="#" className="hover:text-white transition">Use cases</a>
//         <a href="#" className="hover:text-white transition">About</a>
//         <a href="#" className="hover:text-white transition">Careers</a>
//         <a href="#" className="hover:text-white transition">Contact</a>
//       </div>

//       {/* CTA */}
//       <button className="rounded-md border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition">
//         Get started
//       </button>
//     </nav>
//   );
// }
"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* Navbar */}
      <nav className="relative z-50 flex items-center justify-between px-6 md:px-12 py-6">
        {/* Logo */}
        <div className={`flex items-center transition-opacity ${open ? "opacity-0 pointer-events-none" : "opacity-100"}`}>
          <Image
            src="/logos/deeptrack-high-resolution-logo-white-transparent.png"
            alt="Deeptrack logo"
            width={120}
    height={56}
            priority
          />
        </div>

        {/* Desktop links */}
        <div className="hidden md:flex gap-8 text-sm text-white/70">
          <Link href="/use-cases" className="hover:text-white transition">
            Use cases
          </Link>
          <Link href="/about" className="hover:text-white transition">
            About
          </Link>
          <Link href="/careers" className="hover:text-white transition">
            Careers
          </Link>
          <Link href="/contact" className="hover:text-white transition">
            Contact
          </Link>
        </div>

        {/* Desktop CTA */}
        <button className="hidden md:inline-flex rounded-md border border-white/20 px-4 py-2 text-sm text-white hover:bg-white/10 transition">
          Get started
        </button>

        {/* Mobile menu button */}
        <button
          onClick={() => setOpen(true)}
          className="md:hidden text-white"
          aria-label="Open menu"
        >
          ☰
        </button>
      </nav>

      {/* Overlay */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
          onClick={() => setOpen(false)}
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className={`fixed top-0 right-0 z-50 h-full w-72 bg-black text-white transform transition-transform duration-300
        ${open ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between px-6 py-6 border-b border-white/10">
          <Image
            src="/logos/deeptrack-high-resolution-logo-white-transparent.png"
            alt="Deeptrack logo"
            width={120}
    height={56}
          />
          <button onClick={() => setOpen(false)} aria-label="Close menu">
            ✕
          </button>
        </div>

        <nav className="flex flex-col gap-6 px-6 py-8 text-sm">
          <Link href="/use-cases" onClick={() => setOpen(false)}>
            Use cases
          </Link>
          <Link href="/about" onClick={() => setOpen(false)}>
            About
          </Link>
          <Link href="/careers" onClick={() => setOpen(false)}>
            Careers
          </Link>
          <Link href="/contact" onClick={() => setOpen(false)}>
            Contact
          </Link>

          <button className="mt-6 rounded-md border border-white/20 px-4 py-2 text-sm hover:bg-white/10 transition">
            Get started
          </button>
        </nav>
      </aside>
    </>
  );
}
