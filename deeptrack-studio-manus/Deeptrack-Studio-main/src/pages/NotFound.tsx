/** Design intent: Editorial Trust System — retain clear navigation and brand hierarchy even on error states. */
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { SiteLayout } from "@/components/SiteLayout";

export default function NotFound() {
  return (
    <SiteLayout>
      <section className="section section--open">
        <div className="content-shell closing-cta" style={{ minHeight: "52vh", paddingTop: "80px" }}>
          <p className="micro-label">404 — Page not found</p>
          <h1 style={{ margin: "0 0 25px", fontFamily: '"Space Grotesk", sans-serif', fontSize: "clamp(44px, 6vw, 76px)", letterSpacing: "-.075em", lineHeight: ".96" }}>The route is missing. The next step is not.</h1>
          <div><Link className="button button--primary" href="/">Return to the studio <ArrowRight size={17} /></Link><Link className="text-link" href="/contact">Brief a project <ArrowRight size={16} /></Link></div>
        </div>
      </section>
    </SiteLayout>
  );
}
