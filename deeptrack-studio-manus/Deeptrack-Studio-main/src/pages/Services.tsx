/** Design intent: Long-form editorial service landscape instead of generic cards. */
import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { PageHeader, SectionHeading, SiteLayout } from "@/components/SiteLayout";
import { bookCallUrl, services } from "@/lib/content";

export default function Services() {
  return (
    <SiteLayout>
      <Seo
        title="AI Engineering, Strategy & Trust Services | Deeptrack Studio"
        description="Explore Deeptrack Studio's applied AI engineering, strategy, design, executive training, media, and AI-trust service lines, each scoped through a tailored proposal."
        path="/services"
        schema={{ "@context": "https://schema.org", "@type": "ItemList", name: "Deeptrack Studio services", itemListElement: services.map((service, index) => ({ "@type": "ListItem", position: index + 1, name: service.title, description: service.summary })) }}
      />
      <PageHeader eyebrow="Capabilities" title="Six service lines. One engineering standard." summary="Every engagement is shaped around the real operational problem, not a prebuilt agency package." />
      <section className="section section--open">
        <div className="content-shell service-detail-list">
          {services.map((service) => (
            <article key={service.id} id={service.id} className="service-detail">
              <div className="service-detail__meta"><span>{service.number}</span><p>{service.bestFor}</p></div>
              <div className="service-detail__body">
                <h2>{service.title}</h2>
                <p className="service-detail__summary">{service.summary}</p>
                <div className="service-detail__facts">
                  <div><p className="micro-label">What you receive</p>{service.outputs.map((output) => <p key={output}><Check size={15} />{output}</p>)}</div>
                  <div><p className="micro-label">Timeline</p><p>{service.duration}</p><p className="micro-label service-detail__commercial-label">Commercial model</p><p>Contact us for a tailored proposal.</p></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <section className="section section--tint">
        <div className="content-shell split-intro split-intro--lineup">
          <SectionHeading eyebrow="Engagement pathways" title="Start with a decision. Continue only when the work warrants it." summary="Commercial terms and the delivery timeline are scoped after the problem is understood—not before." />
          <div className="path-list">
            {["Diagnostic — define the problem, constraints, and decision path.", "Advisory — create a practical adoption, research, or product direction.", "Delivery sprint — move a bounded system or workflow forward with visible checkpoints.", "Multi-phase build — design, implement, review, and hand over a larger applied AI system."].map((path, index) => <p key={path}><span>0{index + 1}</span>{path}</p>)}
          </div>
        </div>
        <div className="content-shell engagement-policy">
          <div><p className="micro-label">Commercial model</p><h2>Contact us for a tailored proposal.</h2></div>
          <div><p className="micro-label">Timeline</p><p>Scoped per engagement. We define the delivery path, milestones, dependencies, and decision points during the initial discovery conversation.</p></div>
        </div>
      </section>
      <section className="section section--open section--closing">
        <div className="content-shell closing-cta">
          <p className="micro-label">Not sure where to begin?</p>
          <h2>We can scope the right service line with you.</h2>
          <div><a className="button button--primary" href={bookCallUrl} target="_blank" rel="noreferrer">Start a discovery call <ArrowRight size={17} /></a><Link className="text-link" href="/contact">Send a project brief <ArrowRight size={16} /></Link></div>
        </div>
      </section>
    </SiteLayout>
  );
}
