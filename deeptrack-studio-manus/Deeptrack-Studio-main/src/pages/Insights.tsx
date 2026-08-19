/** Design intent: Replace empty thought-leadership placeholders with useful, clearly labelled field briefs. */
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { PageHeader, SignalMark, SiteLayout } from "@/components/SiteLayout";
import { bookCallUrl, insights } from "@/lib/content";

export default function Insights() {
  return (
    <SiteLayout>
      <Seo title="AI Trust & Applied AI Insights | Deeptrack Studio" description="Field briefs on AI readiness, synthetic-media verification, applied AI architecture, and practical AI-trust decisions." path="/insights" schema={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Deeptrack Studio Insights & Research" }} />
      <PageHeader eyebrow="Insights & research" title="Applied research at the technical edge of AI trust." summary="Working notes and field briefs drawn from the same questions that shape our engineering, research, and executive advisory work." />
      <section className="section section--open"><div className="content-shell insights-layout"><div className="insights-intro"><div className="insights-intro__signal"><SignalMark /><span>Research index / 03</span></div><p className="micro-label">Field briefs</p><h2>Useful before the call, not content for content's sake.</h2><p>These short pieces are designed to help leaders and delivery teams frame decisions around adoption, applied systems, and synthetic-media trust.</p><div className="insights-intro__facts"><p><span>01</span>Operating decision</p><p><span>02</span>Trust boundary</p><p><span>03</span>Delivery path</p></div></div><div className="insight-list">{insights.map((insight, index) => <Link key={insight.title} href={`/insights/${insight.slug}`} className="insight-row"><span>{String(index + 1).padStart(2, "0")}</span><div><p className="micro-label">{insight.label}</p><h3>{insight.title}</h3><p>{insight.summary}</p></div><ArrowRight size={19} /></Link>)}</div></div></section>
      <section className="section section--tint"><div className="content-shell proof-callout"><div><p className="micro-label">Research requests</p><h2>Need a technical brief or executive discussion grounded in a live AI-trust question?</h2></div><div className="proof-callout__evidence"><p className="micro-label">Bring a useful starting point</p><p><span>01</span>The decision you need to make</p><p><span>02</span>The operating constraint</p><p><span>03</span>The timeline that matters</p></div><a className="button button--primary" href={bookCallUrl} target="_blank" rel="noreferrer">Start a research conversation <ArrowRight size={17} /></a></div></section>
    </SiteLayout>
  );
}
