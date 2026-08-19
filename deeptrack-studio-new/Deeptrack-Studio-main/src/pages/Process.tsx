/** Design intent: A transparent delivery narrative organized as a sequence of decisions. */
import { ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { PageHeader, SectionHeading, SiteLayout } from "@/components/SiteLayout";
import { bookCallUrl, processSteps } from "@/lib/content";

export default function Process() {
  return (
    <SiteLayout>
      <Seo title="Applied AI Engagement Process | Deeptrack Studio" description="See how Deeptrack Studio scopes, designs, delivers, reviews, and hands over applied AI engagements with clear technical decision points." path="/process" schema={{ "@context": "https://schema.org", "@type": "WebPage", name: "Deeptrack Studio engagement process" }} />
      <PageHeader eyebrow="How we work" title="Six steps. No surprise at the handover." summary="The same operating discipline applies to a focused two-week engagement and a multi-month build." />
      <section className="section section--open"><div className="content-shell process-page"><div className="process-page__rail">{processSteps.map(([number]) => <span key={number}>{number}</span>)}</div><div>{processSteps.map(([number, title, detail]) => <article className="process-page__step" key={number}><span>{number}</span><h2>{title}</h2><p>{detail}</p></article>)}</div></div></section>
      <section className="section section--tint"><div className="content-shell split-intro"><SectionHeading eyebrow="What you can expect" title="A working relationship structured around clear decisions." summary="The point of the process is to make scope, responsibilities, technical design, and ownership visible before they become a delivery risk." /><div className="checked-list">{["A defined proposal before work begins", "Technical design reviewed before implementation", "Visible checkpoints during delivery", "Documentation and ownership at handover"].map((item) => <p key={item}><Check size={17} />{item}</p>)}</div></div></section>
      <section className="section section--open section--closing"><div className="content-shell closing-cta"><p className="micro-label">Ready to frame the work?</p><h2>Start with a discovery call—not a generic sales pitch.</h2><div><a className="button button--primary" href={bookCallUrl} target="_blank" rel="noreferrer">Book a discovery call <ArrowRight size={17} /></a><Link className="text-link" href="/contact">Send a project brief <ArrowRight size={16} /></Link></div></div></section>
    </SiteLayout>
  );
}
