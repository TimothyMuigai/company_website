import Image from "next/image";
import Link from "next/link";

export default function FinalCTASection() {
  return (
    <section className="relative overflow-hidden text-white">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/landingPage_deeptrack.png"
          alt="Background"
          fill
          className="object-cover"
          priority
        />
      </div>

      {/* Dark blue overlay */}
      {/* <div className="absolute inset-0 bg-gradient-to-br from-black via-[#0b2a45]/90 to-black" />

      {/* Vertical grid lines */}
      {/* <div className="absolute inset-0 opacity-25">
        <div className="h-full w-full bg-[linear-gradient(to_right,rgba(255,255,255,0.06)_1px,transparent_1px)] bg-[size:140px_100%]" />
      </div> */} 

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-28 pb-16">
        {/* CTA */}
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-wide text-gray-300">
            Get started
          </p>

          <h2 className="mt-4 text-4xl font-semibold leading-tight">
            Scale verification, not
            <br />
            headcount.
          </h2>

          <p className="mt-6 text-sm text-gray-300 leading-relaxed">
            Deeptrack is an AI-powered deepfake detection platform for finance,
            media, government, HR, and insurance—helping organizations verify
            digital content, prevent fraud, and protect trust.
          </p>

          <div className="mt-8 flex gap-4">
            <Link
              href="/contact"
              className="rounded-md bg-white px-4 py-2 text-sm font-medium text-black"
            >
              Get in touch
            </Link>

            <Link
              href="/about"
              className="rounded-md bg-white/10 px-4 py-2 text-sm text-white hover:bg-white/20"
            >
              About us
            </Link>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-32 text-sm text-gray-400">
        {/* Pages row */}
        <div className="border-t border-white/10 py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <span className="text-white">Pages</span>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/">Home</Link>
                <Link href="/use-cases">Use cases</Link>
                <Link href="/about">About</Link>
                <Link href="/careers">Careers</Link>
                <Link href="/contact">Contact</Link>
            </div>
            </div>
        </div>

        {/* Legal row */}
        <div className="border-t border-white/10 py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <span className="text-white">Legal</span>

            <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/privacy">Privacy policy</Link>
                <Link href="/terms">Terms & conditions</Link>
            </div>
            </div>
        </div>

        {/* Bottom row */}
        <div className="border-t border-white/10 pt-6 mt-6">
            <div className="flex flex-col-reverse items-center gap-6
                            md:flex-row md:justify-between md:items-center
                            text-xs text-gray-500">

            {/* Brand + copyright */}
            <div className="flex items-center gap-3">
                <Image
                src="/logos/deeptrack-high-resolution-logo-white-transparent.png"
                alt="deeptrack"
                width={100}
                height={24}
                />
                <span>© deeptrack 2025. All Rights Reserved</span>
            </div>

            {/* Socials */}
            <div className="flex gap-4">
                <a href="#" aria-label="Twitter" className="opacity-70 hover:opacity-100">
                <Image src="/social_icons/twitter.svg" alt="" width={16} height={16} 
                    className="
                    opacity-90
                    flex h-8 w-8 items-center justify-center
                    rounded-full
                    border border-white/20
                    bg-white
                    transition
                    hover:border-white/40
                    hover:bg-white
                    "
                />
                </a>
                <a href="#" aria-label="LinkedIn" className="opacity-70 hover:opacity-100">
                <Image src="/social_icons/linkedIn.svg" alt="" width={16} height={16} 
                    className="
                    opacity-90
                    flex h-8 w-8 items-center justify-center
                    rounded-full
                    border border-white/20
                    bg-white
                    transition
                    hover:border-white/40
                    hover:bg-white
                    "
                />
                </a>
            </div>

            </div>
        </div>
        </div>
      </div>
    </section>
  );
}
