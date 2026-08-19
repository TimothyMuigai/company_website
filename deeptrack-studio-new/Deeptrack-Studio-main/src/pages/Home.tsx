/**
 * Design intent: Editorial Trust System — asymmetrical high-key hero, concrete proof,
 * and evidence bands using only the approved Deeptrack palette.
 */
import { ArrowRight, Check, ShieldCheck } from "lucide-react";
import { Link } from "wouter";
import { organizationSchema, Seo } from "@/components/Seo";
import { Eyebrow, SectionHeading, SiteLayout } from "@/components/SiteLayout";
import { bookCallUrl, caseStudies, processSteps, services } from "@/lib/content";

const heroImage = "/assets/deeptrack-hero-signal-field.jpg";
const evidenceImage = "/assets/deeptrack-case-evidence.jpg";
const audiencePaths = [
  ["Financial & identity teams", "Applied verification, identity-assurance, and technically demanding risk workflows.", "/trust-security", "Trust & security"],
  ["Media & publishing teams", "Synthetic-media questions, verification workflows, and content-handling decisions.", "/case-studies#media-cgi-detection-mexico", "Media CGI Detection"],
  ["Product & platform teams", "AI-native product surfaces, design systems, and implementation-oriented technical work.", "/services#design", "AI Design & Integration"],
  ["Executive teams", "AI readiness, operating priorities, and board-level decision support before major investment.", "/services#strategy", "AI Consulting & Strategy"],
] as const;

export default function Home() {
  return (
    <SiteLayout>
      <Seo
        title="Deeptrack Studio | Applied AI Engineering & Consulting"
        description="Applied AI engineering, strategy, design, executive training, and trust work for organizations solving technically demanding product and operating problems."
        path="/"
        schema={{ "@context": "https://schema.org", "@graph": [organizationSchema, { "@type": "WebSite", name: "Deeptrack Studio", url: "https://studio.deeptrack.io" }] }}
      />
      <section className="hero">
        <img src={heroImage} className="hero__image" alt="Abstract Deeptrack signal field" />
        <div className="content-shell hero__inner">
          <div className="hero__copy">
            <Eyebrow>Applied AI engineering &amp; consulting — Global</Eyebrow>
            <h1>Bring us the problem before you choose the platform.</h1>
            <p>Deeptrack Studio is the applied engineering and consulting arm of Deeptrack Inc. We help teams shape, design, and deliver AI systems when the work needs more than a generic vendor playbook.</p>
            <div className="hero__actions">
              <a className="button button--primary" href={bookCallUrl} target="_blank" rel="noreferrer" data-umami-event="discovery-call-home">Start with a discovery call <ArrowRight size={17} /></a>
              <Link className="text-link" href="/case-studies">Review the work <ArrowRight size={16} /></Link>
            </div>
          </div>
          <dl className="hero__facts" aria-label="Deeptrack Studio at a glance">
            <div><dt>8+</dt><dd>Engagements across Africa, the Americas, and Asia</dd></div>
            <div><dt>6</dt><dd>Applied AI capability lines, from strategy to delivery</dd></div>
            <div><dt>Nairobi</dt><dd>Global delivery with a local operating base</dd></div>
          </dl>
        </div>
      </section>

      <section className="section section--open">
        <div className="content-shell split-intro">
          <SectionHeading eyebrow="What we do" title="Technical depth is a delivery standard, not a service category." summary="The work can begin with a decision, a system, a product surface, or a research question. The standard stays the same: clear scope, accountable technical design, visible delivery, and documented handover." />
          <aside className="side-note">
            <p className="side-note__label">Start here</p>
            <p>Not sure which service line fits? We use the first conversation to understand the real operating problem before proposing a path.</p>
            <Link href="/contact" className="text-link">Brief a project <ArrowRight size={16} /></Link>
          </aside>
        </div>
        <div className="content-shell service-landscape">
          {services.map((service) => (
            <Link key={service.id} href={`/services#${service.id}`} className="service-line">
              <span className="service-line__number">{service.number}</span>
              <h3>{service.title}</h3>
              <p>{service.summary}</p>
              <ArrowRight className="service-line__arrow" size={18} />
            </Link>
          ))}
        </div>
      </section>

      <section className="section section--tint">
        <div className="content-shell audience-section">
          <SectionHeading eyebrow="Who we help" title="Different operating contexts. The same need for technical clarity." summary="Deeptrack Studio works when a team needs to make a consequential decision or deliver a system that cannot be reduced to a generic AI template." />
          <div className="audience-grid">
            {audiencePaths.map(([title, detail, href, linkText], index) => (
              <article className="audience-card" key={title}>
                <span>0{index + 1}</span>
                <h3>{title}</h3>
                <p>{detail}</p>
                <Link href={href} className="text-link">{linkText} <ArrowRight size={15} /></Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section--tint">
        <div className="content-shell evidence-intro">
          <SectionHeading eyebrow="Proof of work" title="Built around real engagements, not hypothetical outcomes." summary="A sample of systems, research, product work, and advisory delivered across multiple operating contexts." />
          <img src={evidenceImage} alt="Abstract verification and evidence trail" className="evidence-intro__image" />
        </div>
        <div className="content-shell case-list case-list--home">
          {caseStudies.slice(0, 4).map((caseStudy) => (
            <Link key={caseStudy.id} href={`/case-studies#${caseStudy.id}`} className="case-row">
              <span className="case-row__meta">{caseStudy.service}</span>
              <h3>{caseStudy.title}<span> — {caseStudy.location}</span></h3>
              <p>{caseStudy.overview}</p>
              <ArrowRight size={18} />
            </Link>
          ))}
          <Link href="/case-studies" className="text-link text-link--standalone">Explore all case studies <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="section section--open">
        <div className="content-shell process-overview">
          <SectionHeading eyebrow="How we work" title="A delivery process that leaves no surprise for the final week." summary="From discovery through handover, the work is organized around decisions, technical review, and visible checkpoints." />
          <div className="process-list">
            {processSteps.map(([number, title, detail]) => (
              <div className="process-list__item" key={number}>
                <span>{number}</span><h3>{title}</h3><p>{detail}</p>
              </div>
            ))}
          </div>
          <Link href="/process" className="text-link text-link--standalone">See the full process <ArrowRight size={16} /></Link>
        </div>
      </section>

      <section className="section section--black">
        <div className="content-shell trust-strip">
          <div>
            <Eyebrow>For complex and sensitive work</Eyebrow>
            <h2>Clarity about access, ownership, and handover is part of the engagement—not a footnote.</h2>
          </div>
          <div className="trust-strip__points">
            {["Scope access before delivery", "Agree ownership in writing", "Document the handover"].map((point) => <p key={point}><Check size={16} />{point}</p>)}
          </div>
          <Link href="/trust-security" className="button button--light"><ShieldCheck size={17} /> Trust &amp; security</Link>
        </div>
      </section>

      <section className="section section--open section--closing">
        <div className="content-shell closing-cta">
          <Eyebrow>Start with the real problem</Eyebrow>
          <h2>Get a scoped technical response, not a generic AI pitch.</h2>
          <div>
            <a className="button button--primary" href={bookCallUrl} target="_blank" rel="noreferrer">Book a discovery call <ArrowRight size={17} /></a>
            <Link className="text-link" href="/contact" data-umami-event="project-brief-home">Send a project brief <ArrowRight size={16} /></Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
