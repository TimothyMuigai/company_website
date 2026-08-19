/**
 * Deeptrack Studio content model.
 * Design intent: keep real claims and engagement information in one typed source
 * so the site remains maintainable as additional verified evidence is approved.
 */
export type Service = {
  id: string;
  number: string;
  title: string;
  summary: string;
  bestFor: string;
  outputs: string[];
  duration: string;
};

export type CaseStudy = {
  id: string;
  title: string;
  location: string;
  service: string;
  overview: string;
  challenge: string;
  delivery: string;
  clientContext: string;
};

export const bookCallUrl = "https://calendly.com/koyundibryan/30min";

export const services: Service[] = [
  {
    id: "engineering",
    number: "01",
    title: "AI Engineering",
    summary:
      "Custom AI and ML systems for difficult production problems—from document intelligence and translation engines to model fine-tuning and purpose-built workflows.",
    bestFor: "Teams that need a reliable technical path from problem definition to a production-ready system.",
    outputs: ["Technical architecture", "Working system or prototype", "Delivery checkpoints", "Documentation and handover"],
    duration: "Timeline scoped per engagement. We define the delivery path, milestones, dependencies, and decision points during the initial discovery conversation.",
  },
  {
    id: "strategy",
    number: "02",
    title: "AI Consulting & Strategy",
    summary:
      "Decision support for leadership teams evaluating where AI should create value, what to build, and what to buy.",
    bestFor: "Organizations that need a clear AI direction before committing budget, data, or internal delivery teams.",
    outputs: ["Readiness assessment", "Opportunity map", "Adoption roadmap", "Build-versus-buy guidance"],
    duration: "Timeline scoped per engagement. We define the delivery path, milestones, dependencies, and decision points during the initial discovery conversation.",
  },
  {
    id: "design",
    number: "03",
    title: "AI Design & Integration",
    summary:
      "AI-native product experiences and design systems integrated into live products, not isolated concept work.",
    bestFor: "Product teams that need AI capabilities to feel clear, usable, and coherent inside their existing experience.",
    outputs: ["Interaction design", "Design-system direction", "Integration specification", "Implementation support"],
    duration: "Timeline scoped per engagement. We define the delivery path, milestones, dependencies, and decision points during the initial discovery conversation.",
  },
  {
    id: "training",
    number: "04",
    title: "Executive AI Training",
    summary:
      "Practical AI literacy for the people making adoption decisions: workshops, board briefings, and departmental upskilling.",
    bestFor: "Leadership teams that need a grounded view of risks, operating choices, and adoption priorities.",
    outputs: ["Executive workshop", "Board briefing", "Decision framework", "Tailored discussion materials"],
    duration: "Timeline scoped per engagement. We define the delivery path, milestones, dependencies, and decision points during the initial discovery conversation.",
  },
  {
    id: "media",
    number: "05",
    title: "AI for Media & Motion",
    summary:
      "Applied AI for video, animation, training media, motion design, and synthetic or CGI media detection.",
    bestFor: "Media, communications, and training teams working with complex audiovisual production or verification challenges.",
    outputs: ["Workflow assessment", "Applied AI concept", "Detection or production prototype", "Implementation guidance"],
    duration: "Timeline scoped per engagement. We define the delivery path, milestones, dependencies, and decision points during the initial discovery conversation.",
  },
  {
    id: "research",
    number: "06",
    title: "Applied Research & Trust",
    summary:
      "Research, technical writing, and trust-system work at the edge of deepfakes, synthetic media, and responsible AI adoption.",
    bestFor: "Organizations that need rigorous thinking, research translation, or AI-trust expertise for a live strategic problem.",
    outputs: ["Research framing", "Technical brief", "Evaluation approach", "Executive or public-facing presentation"],
    duration: "Timeline scoped per engagement. We define the delivery path, milestones, dependencies, and decision points during the initial discovery conversation.",
  },
];

export const caseStudies: CaseStudy[] = [
  {
    id: "math-ai-benin",
    title: "Math AI",
    location: "Benin",
    service: "AI Engineering",
    overview:
      "An applied AI system built to support mathematics learning and problem-solving, guiding students through problems step by step rather than only returning final answers.",
    challenge:
      "The work required an approach that supports method and reasoning, not only answer generation.",
    delivery:
      "A learning-oriented AI workflow designed around real-time guidance during problem solving.",
    clientContext: "Education-focused applied AI engagement",
  },
  {
    id: "design-systems-dallas",
    title: "Design Systems",
    location: "Dallas, USA",
    service: "AI Design & Integration",
    overview:
      "An AI-driven design system integrated into the client's product, Bundlesbets, to create a consistent and scalable UI foundation.",
    challenge:
      "The product needed a durable system to prevent inconsistency as its user experience evolved.",
    delivery:
      "A design-system direction integrated into the live product environment.",
    clientContext: "Bundlesbets product-design engagement",
  },
  {
    id: "media-cgi-detection-mexico",
    title: "Media CGI Detection",
    location: "Mexico",
    service: "Applied Research & Trust",
    overview:
      "Synthetic and CGI media detection work designed to flag manipulated footage before it reaches broadcast or publication.",
    challenge:
      "Publishing and broadcast workflows need a verification layer before content is distributed, not after damage is done.",
    delivery:
      "An applied detection engagement grounded in Deeptrack's synthetic-media trust focus.",
    clientContext: "Mexico-based media verification engagement",
  },
  {
    id: "language-translation-japan",
    title: "Language Translation",
    location: "Japan",
    service: "AI Engineering",
    overview:
      "An Amharic–Swahili–Japanese translation system built for Mitsumi to support three-way communication across under-served language pairs.",
    challenge:
      "The required language combination is not a priority for many off-the-shelf translation tools.",
    delivery:
      "A custom translation system designed around the specific language pairs required by the client.",
    clientContext: "Mitsumi communication-system engagement",
  },
  {
    id: "deepfake-symposium-singapore",
    title: "Deepfake Symposium",
    location: "Singapore",
    service: "Applied Research & Trust",
    overview:
      "A research and speaking engagement sharing applied deepfake-detection findings with an international research audience.",
    challenge:
      "Applied research needs to remain connected to evolving synthetic-media risks and detection practice.",
    delivery:
      "Research communication and knowledge exchange focused on practical detection approaches.",
    clientContext: "International research and speaking engagement",
  },
  {
    id: "async-agent-api-uae",
    title: "Async Agent API Service",
    location: "UAE",
    service: "AI Engineering",
    overview:
      "Design and implementation of an asynchronous agent API service for a UAE-based client handling long-running agent tasks.",
    challenge:
      "Long-running AI-agent tasks do not fit simple request-response API patterns.",
    delivery:
      "An architecture designed around reliable asynchronous job handling.",
    clientContext: "UAE-based applied AI platform engagement",
  },
  {
    id: "ai-readiness-kenya",
    title: "AI Readiness for CEOs",
    location: "Kenya",
    service: "AI Consulting & Strategy",
    overview:
      "Executive AI-readiness advisory delivered with Centric Essentials Consulting to help leadership teams shape a practical adoption roadmap.",
    challenge:
      "Executive teams need a way to avoid both AI skepticism and unstructured overinvestment.",
    delivery:
      "A decision framework for AI adoption grounded in actual organizational capacity.",
    clientContext: "Leadership advisory delivered with Centric Essentials Consulting",
  },
];

export const processSteps = [
  ["01", "Discovery call", "We scope the real problem before discussing a solution."],
  ["02", "Scoping & proposal", "Commercial terms and timeline are scoped per engagement, with deliverables, milestones, dependencies, and responsibilities set out before work begins."],
  ["03", "Technical design", "Architecture and operating assumptions are reviewed before implementation."],
  ["04", "Delivery", "Work proceeds through visible checkpoints instead of a single final reveal."],
  ["05", "Review & iteration", "We test against the practical production problem, not only a polished demonstration."],
  ["06", "Handover", "Documentation and ownership are part of the delivery, not an afterthought."],
];

export const faqs = [
  {
    question: "How do we know whether Deeptrack Studio is the right fit?",
    answer:
      "Bring the problem, current constraints, and intended outcome. The discovery conversation is used to determine whether the work fits the Studio's engineering, strategy, design, training, media, or applied-research capabilities before a proposal is prepared.",
  },
  {
    question: "Do you publish fixed prices?",
    answer:
      "Contact us for a tailored proposal. The commercial model is scoped around the problem, agreed deliverables, dependencies, and delivery responsibilities before work begins.",
  },
  {
    question: "How long does an engagement take?",
    answer:
      "Timeline is scoped per engagement. We define the delivery path, milestones, dependencies, and decision points during the initial discovery conversation.",
  },
  {
    question: "How are data, access, and ownership handled?",
    answer:
      "Data handling, access requirements, hosting expectations, confidentiality, and ownership are agreed in writing before delivery. The goal is a handover that leaves the client with clarity and ownership rather than unnecessary long-term dependency.",
  },
  {
    question: "Can Deeptrack Studio work with teams outside Kenya?",
    answer:
      "Yes. Deeptrack Studio is based in Nairobi and has delivered engagements across Africa, the Americas, and Asia. The delivery model, working hours, and stakeholder cadence are agreed during scoping.",
  },
  {
    question: "What should we bring to a discovery call?",
    answer:
      "A concise description of the problem, the operating context, the decision you need to make, the timeline you are working toward, and any relevant constraints is enough to begin. You do not need a finalized brief before the conversation.",
  },
];

export type InsightArticle = {
  slug: string;
  label: string;
  title: string;
  summary: string;
  seoDescription: string;
  introduction: string;
  sections: Array<{ heading: string; paragraphs: string[] }>;
  takeaways: string[];
};

export const insights: InsightArticle[] = [
  {
    slug: "ai-readiness-assessment",
    label: "Field brief",
    title: "What an AI readiness assessment should make clear",
    summary:
      "A practical decision framework for leadership teams: where value is plausible, what capabilities are required, and which risks need attention before investment.",
    seoDescription: "A practical Deeptrack Studio field brief on what an AI readiness assessment should clarify before leaders commit to an AI investment.",
    introduction: "An AI readiness assessment should help a leadership team make a better operating decision. It is not a vendor scorecard, a list of tools, or a promise that every workflow needs automation. The useful question is whether a specific problem is ready for a specific intervention—and what needs to be true for that work to succeed.",
    sections: [
      {
        heading: "Start with the operating decision",
        paragraphs: [
          "The most useful assessment begins with a decision the organization needs to make: improve a workflow, reduce a specific risk, help a team process information more consistently, or understand whether an investment is justified.",
          "Starting with a named decision prevents the conversation from becoming a general discussion about AI. It also gives the team a way to define the outcome, constraints, affected stakeholders, and the evidence that would make the work worth continuing.",
        ],
      },
      {
        heading: "Separate capability from readiness",
        paragraphs: [
          "A capable model does not automatically mean an organization is ready to use it responsibly. Readiness includes the workflow around the model: the data that can be accessed, the people who will act on outputs, the operating controls, the escalation path, and the way performance will be reviewed.",
          "This distinction helps leaders avoid two common mistakes: rejecting a useful intervention because the organization is not ready today, or committing to a technically impressive system before the operating environment can support it.",
        ],
      },
      {
        heading: "Make the delivery path explicit",
        paragraphs: [
          "An assessment should leave a team with a practical next step. That may be a focused discovery sprint, a narrow prototype, a data-quality improvement, a governance decision, an executive workshop, or a decision not to proceed yet.",
          "The output is useful when it identifies the first accountable action rather than only describing the opportunity landscape.",
        ],
      },
    ],
    takeaways: ["Name the decision before naming the technology.", "Assess the operating workflow, not only the model capability.", "Leave with a concrete, accountable next step."],
  },
  {
    slug: "synthetic-media-verification",
    label: "Trust note",
    title: "Synthetic-media verification is an operating question",
    summary:
      "Detection becomes useful when it is placed inside the decisions, handoffs, and escalation paths where manipulated content can cause harm.",
    seoDescription: "A Deeptrack Studio trust note on designing synthetic-media verification as an operating workflow, not only as a detection tool.",
    introduction: "Synthetic-media verification is often discussed as though detection accuracy alone settles the problem. In practice, the useful question is what happens when a team receives a signal: who sees it, what threshold matters, how it is reviewed, and what action follows.",
    sections: [
      {
        heading: "Place verification before the point of harm",
        paragraphs: [
          "A verification system is most valuable when it sits where a consequential decision is about to happen. For a publisher, that may be an editorial handoff. For a financial institution, it may be a review point in an identity or fraud workflow. For a communications team, it may be before external distribution.",
          "The placement determines what evidence is available, how quickly an issue must be resolved, and whether the signal can genuinely reduce risk.",
        ],
      },
      {
        heading: "Design for review, not only alerts",
        paragraphs: [
          "A system that raises an alert without a review process creates a new burden rather than a reliable control. Teams need context, an escalation path, a clear accountable owner, and a way to record how a decision was made.",
          "That is why verification should be treated as a system-design problem: detection, human review, policy, and evidence need to work together.",
        ],
      },
      {
        heading: "Measure the workflow that surrounds the model",
        paragraphs: [
          "A technical evaluation can describe model behavior, but an operational evaluation should also ask whether teams can respond effectively. Are the right inputs available? Is the review fast enough? Are decisions documented? Can feedback improve the process?",
          "Those questions turn a detection capability into a practical trust layer.",
        ],
      },
    ],
    takeaways: ["Place verification before the irreversible decision.", "Pair detection signals with an accountable review process.", "Evaluate the workflow around the model, not only the model itself."],
  },
  {
    slug: "design-system-before-demo",
    label: "Engineering note",
    title: "Design the system before designing the demo",
    summary:
      "A concise view of why technical architecture, access boundaries, evaluation criteria, and handover requirements belong early in applied AI work.",
    seoDescription: "A Deeptrack Studio engineering note on defining technical architecture, access boundaries, evaluation, and handover before an applied AI demo.",
    introduction: "A good demo can make an applied AI idea feel inevitable. It can also conceal the hard questions that determine whether the work will survive contact with a real operating environment. Architecture, access, evaluation, and ownership are not implementation details to defer—they shape whether the system can be delivered responsibly.",
    sections: [
      {
        heading: "Architecture is a decision record",
        paragraphs: [
          "Technical architecture should make the important choices visible: what the system is intended to do, what it will not do, where inputs come from, how outputs are used, where the boundaries are, and which assumptions have to hold.",
          "Reviewing those choices early gives a client and delivery team something concrete to agree on before implementation moves too far ahead of the operating reality.",
        ],
      },
      {
        heading: "Access and evaluation belong in the first scope",
        paragraphs: [
          "Many AI projects become difficult not because the concept is unclear, but because access to relevant data, systems, environments, or stakeholders was never resolved. A useful scope identifies those requirements early and treats them as delivery dependencies.",
          "The same is true of evaluation. Teams should define what useful performance means before a demo becomes the default measure of success.",
        ],
      },
      {
        heading: "Handover changes how you build",
        paragraphs: [
          "If a client needs to own a system after delivery, documentation, configuration clarity, operating procedures, and technical decision records cannot be postponed to the end. They have to be part of the work from the beginning.",
          "A well-designed handover is evidence that the project was built for a real team, not only for a presentation.",
        ],
      },
    ],
    takeaways: ["Make the technical decisions visible before implementation begins.", "Treat access and evaluation as delivery dependencies.", "Build the handover into the system, not after it."],
  },
];
