export type Job = {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  employmentType: string;
  summary: string;
  description?: string;
  docUrl?: string;
  responsibilities?: string[];
  requirements?: string[];
  postedAt?: string;
};

export const jobs: Job[] = [
  {
    id: '3',
    slug: 'deepfakes-synthetic-media-research-intern',
    title: 'Deepfakes & Synthetic Media Research Intern',
    department: 'Research & Editorial',
    location: 'Remote / Hybrid',
    employmentType: 'Part-time / Full-time (flexible)',
    summary: 'Support our Deepfakes News & Research Center by tracking, verifying, and summarizing deepfake incidents.',
    description:
      'Join Deeptrack to monitor and verify deepfake incidents worldwide, draft briefs and summaries, and help publish findings.',
    responsibilities: [
      'Monitor global news, social platforms, and research for deepfake related incidents',
      'Log and summarize cases in a structured database',
      'Assist with media verification using Deeptrack tools',
      'Draft short news briefs, weekly summaries, or reports',
      'Tag and classify cases (type, impact, region, verification status)',
      'Support publication on blog, newsletter, or LinkedIn',
    ],
    requirements: [
      'Currently pursuing or recently completed a major in journalism, communications, media studies, international relations or a related field',
      'Strong research and writing skills (clear, structured summaries)',
      'Interest in AI, deepfakes, misinformation or digital trust',
      'Ability to analyze sources critically and flag questionable content',
      'High ethical standards and respect for sensitive content',
    ],
    postedAt: '2026-01-06',
    docUrl: '/files/pdfs/deepfakes-research-internship.pdf',
  },
  {
    id: '7',
    slug: 'chair-of-the-board',
    title: 'Chair of the Board',
    department: 'Board / Governance',
    location: 'Remote with periodic travel',
    employmentType: 'Non-executive leadership',
    summary: 'Provide independent stewardship, strategic guidance, and effective governance as Deeptrack scales its enterprise due-diligence platform.',
    description:
      'Deeptrack is seeking an experienced Chair to lead an effective, thoughtful, and accountable Board. The Chair will partner with executive leadership to strengthen governance, strategic focus, and stakeholder confidence.',
    responsibilities: [
      'Set a clear, well-governed agenda for Board discussions and decisions',
      'Support constructive challenge, sound judgment, and accountability across the Board',
      'Partner with executive leadership on long-term strategy, risk, and organisational readiness',
      'Represent Deeptrack with investors, partners, and other senior stakeholders when appropriate',
    ],
    requirements: [
      'Significant experience chairing or serving on a technology, risk, finance, or mission-led company board',
      'Strong understanding of governance, fiduciary responsibility, enterprise risk, and oversight',
      'Independent judgment, high integrity, and the ability to build trust across diverse stakeholders',
      'Experience supporting a growing company through scale, fundraising, or strategic change',
    ],
    postedAt: '2026-08-20',
  },
];
