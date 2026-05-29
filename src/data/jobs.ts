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
    id: '4',
    slug: 'software-engineering-intern-fullstack',
    title: 'Software Engineering Intern — Fullstack',
    department: 'Engineering',
    location: 'Nairobi, Kenya (Hybrid)',
    employmentType: 'Part-time / Full-time',
    summary: 'Ship production-grade features for Deeptrack’s core platform across frontend and backend.',
    description:
      'You will be embedded in the product team, shipping features across Deeptrack’s core platform — from the Sentinel KYC/KYB identity flow to the Gotham enterprise API dashboard. You will write code that goes to production, not toy projects.',
    responsibilities: [
      "Build and iterate on React-based frontend interfaces for Deeptrack's SaaS products",
      'Develop backend logic and API integrations using Convex and Node.js',
      'Implement authentication flows, webhooks, and third-party integrations (e.g. KYC APIs)',
      'Collaborate with the product designer and AI researchers on new feature specs',
      'Write clean, documented, review-ready code — no cowboy commits',
    ],
    requirements: [
      'Strong JavaScript/TypeScript foundations — you know why promises exist',
      'Hands-on React experience; ability to build from Figma designs',
      'Comfort with REST APIs, database schemas, and version control (Git)',
      'Bonus: experience with Convex, Tailwind CSS, or AWS/GCP',
      'Currently pursuing or recently completed a degree in CS, Engineering, or related field',
      'A bias for action — you ship, iterate, and ask questions later',
    ],
    postedAt: '2026-01-10',
  },
  {
    id: '5',
    slug: 'data-science-intern',
    title: 'Data Science Intern',
    department: 'AI / Research',
    location: 'Nairobi, Kenya (Hybrid / Remote)',
    employmentType: 'Part-time / Full-time',
    summary: 'Work with deepfake detection models, benchmarks, and dataset curation for Gotham.',
    description:
      'You will work directly with our Principal AI Researcher on the models that power Gotham — Deeptrack’s enterprise deepfake detection engine. This means training runs, dataset curation, evaluation benchmarks, and performance analysis.',
    responsibilities: [
      'Run experiments on deepfake detection models trained against FaceForensics++ and real-world data',
      'Design and execute evaluation pipelines measuring precision, recall, and generalisation',
      'Curate, clean, and augment datasets for model retraining and fine-tuning',
      'Research and prototype improvements — temporal attention, multimodal signals, adversarial robustness',
      'Produce clear, reproducible research notes and model cards',
    ],
    requirements: [
      'Strong Python skills; familiarity with PyTorch or TensorFlow',
      'Understanding of computer vision fundamentals and deep learning architectures (CNNs, ViTs)',
      'Experience with model evaluation metrics and statistical analysis',
      'Bonus: prior work with video/image forensics, GANs, or diffusion models',
      'Bonus: knowledge of C2PA or content provenance standards',
      'Currently pursuing or recently completed a degree in CS, Data Science, AI/ML, or related field',
      'Intellectually rigorous — you question assumptions and document your reasoning',
    ],
    postedAt: '2026-01-10',
  },
  {
    id: '6',
    slug: 'devops-cloud-engineering-intern',
    title: 'DevOps / Cloud Engineering Intern',
    department: 'Operations / Infrastructure',
    location: 'Nairobi, Kenya (Hybrid / Remote)',
    employmentType: 'Part-time / Full-time',
    summary: 'Help scale and secure Deeptrack’s AWS/GCP infrastructure and CI/CD workflows.',
    description:
      'You will work with our Cloud Engineer to keep Deeptrack’s infrastructure fast, reliable, and secure. We run production workloads on AWS and GCP, and we are scaling fast.',
    responsibilities: [
      'Manage and improve CI/CD pipelines using GitHub Actions for backend, frontend, and ML model deployments',
      'Provision and maintain cloud resources on AWS and GCP (compute, storage, networking, IAM)',
      'Containerise services with Docker and contribute to orchestration improvements',
      'Set up and maintain monitoring, alerting, and incident response runbooks',
      'Identify and implement cloud cost optimisation opportunities',
      'Document infrastructure architecture and runbooks for the engineering team',
    ],
    requirements: [
      'Solid understanding of Linux, networking basics, and cloud fundamentals',
      'Hands-on experience with AWS or GCP (EC2, S3, IAM, Lambda, or equivalents)',
      'Familiarity with Docker and container-based workflows',
      'Experience with GitHub Actions or other CI/CD tooling',
      'Bonus: Terraform or infrastructure-as-code experience',
      'Bonus: experience with database management (Turso, PostgreSQL, or similar)',
      'Currently pursuing or recently completed a degree in CS, Engineering, IT, or related field',
      'You take ownership — if something is broken, you fix it before moving on',
    ],
    postedAt: '2026-01-10',
  },
];
