/**
 * Design intent: Editorial Trust System — open white fields, thin structural rules,
 * official Deeptrack palette, and a compact three-bar signal motif.
 */
import { Menu, X, ArrowUpRight } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Link, useLocation } from "wouter";
import { bookCallUrl } from "@/lib/content";

type LayoutProps = { children: ReactNode };

const navItems = [
  ["Services", "/services"],
  ["Work", "/case-studies"],
  ["Process", "/process"],
  ["Insights", "/insights"],
  ["About", "/about"],
];

export function SignalMark({ className = "" }: { className?: string }) {
  return (
    <span className={`signal-mark ${className}`} aria-hidden="true">
      <i />
      <i />
      <i />
    </span>
  );
}

export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <span className={`wordmark ${inverse ? "wordmark--inverse" : ""}`}>
      <span className="wordmark__type">deeptrack<span>studio</span></span>
    </span>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow"><SignalMark />{children}</p>;
}

export function PageHeader({ eyebrow, title, summary }: { eyebrow: string; title: string; summary: string }) {
  return (
    <section className="page-header">
      <div className="page-header__rule" />
      <div className="content-shell page-header__inner">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h1>{title}</h1>
        <p>{summary}</p>
      </div>
    </section>
  );
}

export function SectionHeading({ eyebrow, title, summary }: { eyebrow: string; title: string; summary?: string }) {
  return (
    <div className="section-heading">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2>{title}</h2>
      {summary ? <p>{summary}</p> : null}
    </div>
  );
}

export function SiteLayout({ children }: LayoutProps) {
  const [location] = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="site-frame">
      <header className="site-header">
        <div className="content-shell site-header__inner">
          <Link href="/" className="brand-link" aria-label="Deeptrack Studio home">
            <Wordmark />
            <span className="brand-link__sub">Applied AI engineering &amp; consulting</span>
          </Link>
          <nav className="desktop-nav" aria-label="Primary navigation">
            {navItems.map(([label, href]) => (
              <Link key={href} href={href} className={location === href ? "nav-link nav-link--active" : "nav-link"}>
                {label}
              </Link>
            ))}
          </nav>
          <div className="site-header__actions">
            <a className="button button--primary button--compact" href={bookCallUrl} target="_blank" rel="noreferrer">
              Start a project <ArrowUpRight size={15} />
            </a>
            <button className="menu-button" type="button" onClick={() => setMenuOpen((open) => !open)} aria-expanded={menuOpen} aria-label="Toggle navigation">
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
        {menuOpen ? (
          <nav className="mobile-nav" aria-label="Mobile navigation">
            {navItems.map(([label, href]) => (
              <Link key={href} href={href} onClick={() => setMenuOpen(false)} className="mobile-nav__link">
                {label}
              </Link>
            ))}
            <Link href="/contact" onClick={() => setMenuOpen(false)} className="mobile-nav__link">Contact</Link>
          </nav>
        ) : null}
      </header>
      <main>{children}</main>
      <footer className="site-footer">
        <div className="content-shell">
          <div className="footer-grid">
            <div>
              <Wordmark />
              <p className="footer-intro">A subsidiary of Deeptrack Inc. Built for applied AI work that needs technical depth, clear delivery, and practical ownership.</p>
            </div>
            <div>
              <p className="footer-label">Explore</p>
              <Link href="/services">Services</Link>
              <Link href="/case-studies">Case studies</Link>
              <Link href="/process">Process</Link>
              <Link href="/insights">Insights</Link>
            </div>
            <div>
              <p className="footer-label">Work with us</p>
              <Link href="/trust-security">Trust &amp; security</Link>
              <Link href="/faq">FAQ</Link>
              <Link href="/contact">Brief a project</Link>
              <a href={bookCallUrl} target="_blank" rel="noreferrer">Book a discovery call</a>
            </div>
            <div>
              <p className="footer-label">Contact</p>
              <a href="mailto:project@deeptrack.io">project@deeptrack.io</a>
              <a href="tel:+254720882406">+254 720 882 406</a>
              <p>Nairobi, Kenya<br />Global delivery</p>
            </div>
          </div>
          <div className="footer-bottom">
            <span>© {new Date().getFullYear()} Deeptrack Studio</span>
            <span>A subsidiary of Deeptrack Inc.</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
