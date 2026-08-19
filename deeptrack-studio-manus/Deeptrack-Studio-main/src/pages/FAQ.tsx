/** Design intent: Use the template accordion for direct, readable objection handling. */
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Seo } from "@/components/Seo";
import { PageHeader, SignalMark, SiteLayout } from "@/components/SiteLayout";
import { faqs } from "@/lib/content";

export default function FAQ() {
  return (
    <SiteLayout>
      <Seo title="Deeptrack Studio FAQ | Applied AI Engagements" description="Answers about Deeptrack Studio's applied AI engagements, scoping, timing, security expectations, ownership, and global delivery." path="/faq" schema={{ "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) }} />
      <PageHeader eyebrow="Frequently asked questions" title="How engagements actually work." summary="Straight answers about scope, timing, security expectations, and what it is like to work with Deeptrack Studio." />
      <section className="section section--open"><div className="content-shell faq-layout"><aside className="faq-layout__intro"><div className="faq-layout__signal"><SignalMark /><span>Engagement clarity / 06</span></div><p>If your question is specific to your operating context, a discovery conversation is the quickest way to get a useful answer.</p><div className="faq-layout__evidence"><span>Scope</span><span>Timing</span><span>Ownership</span></div></aside><Accordion type="single" collapsible className="faq-accordion">{faqs.map((faq, index) => <AccordionItem key={faq.question} value={`item-${index}`}><AccordionTrigger className="faq-accordion__trigger">{faq.question}</AccordionTrigger><AccordionContent className="faq-accordion__content">{faq.answer}</AccordionContent></AccordionItem>)}</Accordion></div></section>
    </SiteLayout>
  );
}
