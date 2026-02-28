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

      {/* Content */}
      <div className="relative max-w-7xl mx-auto px-6 pt-7 pb-10">
        {/* CTA */}
        <div className="max-w-xl">
          <p className="text-xs uppercase tracking-wide text-gray-300">
            Get started
          </p>

          <h2 className="mt-4 text-4xl font-light leading-tight">
            Scale verification, not
            <br />
            headcount.
          </h2>

          <p className="mt-6 text-sm text-gray-300 leading-relaxed">
            Deeptrack is an AI-powered deepfake detection platform for finance,
            media, government, HR, and insurance helping organizations verify
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
        <div className="mt-22 text-sm text-gray-400">
          {/* Pages row */}
          <div className="py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <span className="text-white">Pages</span>
              {/* Trailing line */}
              <div className="flex-1 h-px bg-white/10" />
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link href="/">Home</Link>
                <Link href="/#industries">Use cases</Link>
                <Link href="/about">About</Link>
                <Link href="/career">Careers</Link>
                <Link href="/contact">Contact</Link>
                <Link href="/test-files/fileAbout">Test about</Link>
              </div>
            </div>
          </div>

          {/* Legal row */}
          <div className="py-4">
            <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
              <span className="text-white">Legal</span>
              {/* Trailing line */}
              <div className="flex-1 h-px bg-white/10" />
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <Link href="https://app.eu.vanta.com/deeptrack.io/trust/ykzpe8x33wwv9mki8rjv61">Deeptrack&apos;s Trust Center</Link>
                {/* <Link href="/legal/privacy-policy">Privacy Policy</Link>
                <Link href="/legal/terms-of-use">Terms of Use</Link>
                <Link href="/legal/service-level-agreement">Service Level Agreement</Link> */}
                <Link href="https://docs.google.com/document/d/1jSyNPxKrabOBlZxi8kf0eRsjsAyo6G5vFCLDhY6ockE/edit?pli=1&tab=t.0" target="_blank" rel="noopener noreferrer">Legal Center</Link>
              </div>
            </div>
          </div>

          {/* Bottom row */}
          <div className="mt-6">
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
                <span className="text-sm">© deeptrack 2025. All Rights Reserved</span>
              </div>

              {/* Socials */}
              <div className="flex items-center gap-4 pt-3">
                {/* Twitter */}
                <a
                  target='_blank' href="https://x.com/deeptrck"
                  aria-label="Twitter"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 hover:border-white/40 hover:text-white transition"
                >
                  <Image
                    src="/social_icons/twitter.svg"
                    alt="Twitter"
                    width={16}
                    height={16}
                    className="opacity-80 invert brightness-0"
                  />
                </a>

                {/* LinkedIn */}
                <a
                  target='_blank' href="https://www.linkedin.com/company/deeptrck/"
                  aria-label="LinkedIn"
                  className="flex items-center justify-center w-9 h-9 rounded-full border border-white/20 hover:border-white/40 hover:text-white transition"
                >
                  <Image
                    src="/social_icons/linkedIn.svg"
                    alt="LinkedIn"
                    width={16}
                    height={16}
                    className="opacity-80 invert brightness-0"
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
