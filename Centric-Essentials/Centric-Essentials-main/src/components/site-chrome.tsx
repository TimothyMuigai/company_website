import { Link } from "@tanstack/react-router";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/team", label: "Team" },
  { to: "/services", label: "Services" },
  { to: "/events", label: "Events" },
  { to: "/case-studies", label: "Case Studies" },
  { to: "/insights", label: "Insights" },
  { to: "/partners", label: "Partners & Funders" },
  { to: "/careers", label: "Careers" },
  { to: "/contact", label: "Contact" },
] as const;

export function SiteHeader() {
  return (
    <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col">
          <div className="flex items-center justify-between h-16">
            <Link to="/" className="text-lg font-bold tracking-tighter uppercase">
              Centric Essentials
            </Link>
            <div className="flex items-center gap-8">
              <Link
                to="/contact"
                className="text-[11px] font-mono uppercase tracking-widest hover:text-primary transition-colors"
              >
                Book Consultation
              </Link>
            </div>
          </div>
          <div className="hidden lg:flex items-center justify-between py-3 border-t border-border/50 text-[10px] font-mono uppercase tracking-tighter text-muted-foreground">
            {NAV.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: item.to === "/" }}
                activeProps={{ className: "font-bold text-primary" }}
                className="hover:text-foreground transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}

export function SiteFooter() {
  return (
    <footer className="py-20 border-t border-border">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1">
            <div className="text-lg font-bold tracking-tighter uppercase mb-6">
              Centric Essentials
            </div>
            <p className="text-xs text-muted-foreground leading-loose">
              Nairobi / London / Dubai / Singapore / New York
            </p>
          </div>
          <div className="grid grid-cols-3 col-span-3 gap-12 md:pl-20">
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest mb-6">Practice</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/services" className="hover:text-primary transition-colors">Services</Link></li>
                <li><Link to="/case-studies" className="hover:text-primary transition-colors">Case Studies</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest mb-6">Firm</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/about" className="hover:text-primary transition-colors">About Us</Link></li>
                <li><Link to="/who-we-serve" className="hover:text-primary transition-colors">Who We Serve</Link></li>
                <li><Link to="/partners" className="hover:text-primary transition-colors">Partners & Funders</Link></li>
                <li><Link to="/careers" className="hover:text-primary transition-colors">Careers</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-[10px] font-mono uppercase tracking-widest mb-6">Contact</h4>
              <ul className="space-y-3 text-sm">
                <li><Link to="/contact" className="hover:text-primary transition-colors">Book a Consultation</Link></li>
                <li><Link to="/insights" className="hover:text-primary transition-colors">Insights</Link></li>
                <li className="text-muted-foreground">www.centricessentialsconsulting.co.ke</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row justify-between pt-12 border-t border-border text-[10px] font-mono uppercase tracking-widest text-muted-foreground gap-4">
          <div>&copy; {new Date().getFullYear()} Centric Essentials Consulting</div>
          <div className="flex gap-8">
            <span>Privacy</span>
            <span>Terms</span>
            <span>Compliance</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export function PageHeader({
  eyebrow,
  title,
  intro,
}: {
  eyebrow: string;
  title: React.ReactNode;
  intro?: string;
}) {
  return (
    <section className="pt-24 pb-20 px-6 border-b border-border">
      <div className="max-w-7xl mx-auto">
        <div className="inline-block h-px w-12 bg-primary mb-8 animate-line" />
        <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-8">
          <div className="max-w-3xl">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-primary block mb-6">
              {eyebrow}
            </span>
            <h1 className="text-5xl md:text-7xl font-bold tracking-tighter leading-[0.95] text-balance animate-reveal">
              {title}
            </h1>
          </div>
          {intro && (
            <p className="text-lg text-muted-foreground max-w-md leading-relaxed">{intro}</p>
          )}
        </div>
      </div>
    </section>
  );
}

export function CTABand({
  title = "Start the Conversation",
  body = "Schedule a scoping session with our lead facilitators to assess your organization's needs.",
  ctaLabel = "Book a Consultation",
}: {
  title?: string;
  body?: string;
  ctaLabel?: string;
}) {
  return (
    <section className="py-28 bg-primary text-primary-foreground">
      <div className="max-w-4xl mx-auto px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tighter mb-6 text-balance">
          {title}
        </h2>
        <p className="text-lg mb-10 opacity-90 max-w-2xl mx-auto">{body}</p>
        <Link
          to="/contact"
          className="inline-block px-10 py-4 bg-background text-foreground font-bold uppercase tracking-widest text-xs hover:-translate-y-[2px] transition-transform"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
