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
    id: '1',
    slug: 'senior-software-engineer',
    title: 'Senior Software Engineer',
    department: 'Engineering',
    location: 'Remote (Nairobi, Kenya )',
    employmentType: 'Full-time',
    summary: 'Build core verification services and scale our platform.',
    description:
      'Work on backend services, APIs, and data processing to improve media verification and inference correctness at scale.',
    responsibilities: [
      'Design and implement backend services',
      'Own API and data models',
      'Mentor junior engineers',
    ],
    requirements: [
      '5+ years engineering experience',
      'Strong Node/TypeScript skills',
      'Experience with distributed systems',
    ],
    postedAt: '2025-12-01',
  },
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
      'Monitor global news, social platforms, and research for deepfake-related incidents',
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
    id: '2',
    slug: 'product-designer',
    title: 'Product Designer',
    department: 'Design',
    location: 'Nairobi, Kenya (hybrid)',
    employmentType: 'Full-time',
    summary: 'Lead product design across web and embedded experiences.',
    description:
      'Shape product experiences, run research, and produce high-fidelity designs and prototypes.',
    responsibilities: [
      'Lead UX research and design sprints',
      'Produce prototypes and design systems',
    ],
    requirements: [
      '3+ years product design experience',
      'Strong portfolio of product work',
    ],
    postedAt: '2025-11-15',
  },
];
