/** Design intent: Long-form, crawlable editorial field briefs with clear hierarchy and useful internal conversion paths. */
import { ArrowRight, Check } from "lucide-react";
import { Link, useParams } from "wouter";
import { Seo } from "@/components/Seo";
import { Eyebrow, SignalMark, SiteLayout } from "@/components/SiteLayout";
import { bookCallUrl, insights } from "@/lib/content";

export default function InsightArticle() {
  const { slug } = useParams<{ slug: string }>();
  const article = insights.find((item) => item.slug === slug);

  if (!article) {
    return (
      <SiteLayout>
        <section className="section section--open"><div className="content-shell closing-cta"><Eyebrow>Insight not found</Eyebrow><h1>This field brief is not available.</h1><Link href="/insights" className="button button--primary">Return to insights <ArrowRight size={17} /></Link></div></section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <Seo
        title={`${article.title} | Deeptrack Studio`}
        description={article.seoDescription}
        path={`/insights/${article.slug}`}
        schema={{ "@context": "https://schema.org", "@type": "Article", headline: article.title, description: article.seoDescription, mainEntityOfPage: `https://studio.deeptrack.io/insights/${article.slug}`, datePublished: "2026-08-18", dateModified: "2026-08-18", author: { "@type": "Organization", name: "Deeptrack Studio" }, publisher: { "@type": "Organization", name: "Deeptrack Studio" } }}
      />
      <article>
        <header className="article-hero"><div className="content-shell article-hero__inner"><Eyebrow>{article.label}</Eyebrow><p className="article-hero__meta">Published 18 August 2026 · Deeptrack Studio</p><h1>{article.title}</h1><p>{article.summary}</p></div></header>
        <div className="content-shell article-layout"><aside className="article-aside"><div className="article-aside__signal"><SignalMark /><span>Field brief / 01</span></div><p className="micro-label">In this brief</p>{article.sections.map((section, index) => <a key={section.heading} href={`#section-${index + 1}`}>0{index + 1} {section.heading}</a>)}</aside><div className="article-body"><p className="article-intro">{article.introduction}</p>{article.sections.map((section, index) => <section id={`section-${index + 1}`} key={section.heading}><p className="micro-label">0{index + 1}</p><h2>{section.heading}</h2>{section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}</section>)}<div className="article-takeaways"><div className="article-takeaways__head"><SignalMark /><p className="micro-label">Practical takeaways</p></div>{article.takeaways.map((takeaway) => <p key={takeaway}><Check size={16} />{takeaway}</p>)}</div></div></div>
      </article>
      <section className="section section--tint"><div className="content-shell proof-callout"><div><p className="micro-label">Bring the operating context</p><h2>Need to turn a question like this into an accountable next step?</h2></div><p>Deeptrack Studio works with teams that need a technically grounded view of their specific constraints, decisions, and delivery path.</p><a className="button button--primary" href={bookCallUrl} target="_blank" rel="noreferrer">Start a discovery call <ArrowRight size={17} /></a></div></section>
    </SiteLayout>
  );
}
