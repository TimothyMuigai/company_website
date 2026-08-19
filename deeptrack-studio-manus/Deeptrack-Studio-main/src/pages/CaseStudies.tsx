/** Design intent: Evidence-led project records with clear problem, delivery, and context fields. */
import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Seo } from "@/components/Seo";
import { PageHeader, SiteLayout } from "@/components/SiteLayout";
import { bookCallUrl, caseStudies } from "@/lib/content";

export default function CaseStudies() {
  return (
    <SiteLayout>
      <Seo
        title="Applied AI Case Studies | Deeptrack Studio"
        description="Selected Deeptrack Studio engagements across applied AI engineering, AI design, AI strategy, synthetic media trust, and research."
        path="/case-studies"
        schema={{ "@context": "https://schema.org", "@type": "CollectionPage", name: "Deeptrack Studio case studies", mainEntity: { "@type": "ItemList", itemListElement: caseStudies.map((item, index) => ({ "@type": "ListItem", position: index + 1, name: `${item.title} — ${item.location}`, description: item.overview })) } }}
      />
      <PageHeader eyebrow="Selected work" title="The full picture behind each engagement." summary="These are summaries of real work. Where client constraints limit what can be shared, the focus remains on the problem, delivery orientation, and operating context." />
      <section className="section section--open">
        <div className="content-shell case-study-list">
          <div className="case-study-list__evidence"><p className="micro-label">Evidence standard</p><p>Each published record names the work context, the practical problem, and the delivery orientation. Client-specific architectures, detailed metrics, and named references are shared only when the relevant permissions and diligence context allow it.</p></div>
          {caseStudies.map((caseStudy, index) => (
            <article id={caseStudy.id} key={caseStudy.id} className="case-study-record">
              <header><span>{String(index + 1).padStart(2, "0")}</span><p>{caseStudy.service}</p><p>{caseStudy.location}</p></header>
              <div className="case-study-record__core"><h2>{caseStudy.title}</h2><p>{caseStudy.overview}</p></div>
              <div className="case-study-record__detail"><div><p className="micro-label">Why it mattered</p><p>{caseStudy.challenge}</p></div><div><p className="micro-label">Delivery orientation</p><p>{caseStudy.delivery}</p></div><div><p className="micro-label">Engagement context</p><p>{caseStudy.clientContext}</p></div></div>
            </article>
          ))}
        </div>
      </section>
      <section className="section section--tint">
        <div className="content-shell proof-callout"><div><p className="micro-label">A note on evidence</p><h2>Comparable proof is most useful when it reflects the work that can be shared responsibly.</h2></div><p>Detailed technical and commercial evidence is scoped appropriately for each conversation. Start by showing us the problem you need to solve.</p><a className="button button--primary" href={bookCallUrl} target="_blank" rel="noreferrer">Discuss a similar problem <ArrowRight size={17} /></a></div>
      </section>
    </SiteLayout>
  );
}
