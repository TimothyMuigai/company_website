import type { Metadata } from 'next'

const BASE_URL = 'https://www.deeptrack.io'

export interface BlogPost {
  slug: string
  legacyId?: string
  title: string
  description: string
  keywords: string[]
  author: string
  date: string
  readTime: string
  image: string
  category: string
}

export const blogPosts: BlogPost[] = [
  {
    slug: 'the-state-of-ai-fraud-2025',
    legacyId: '0',
    title: 'The State of AI Fraud Should Alarm Every Enterprise Leader',
    description:
      'As AI technology advances, AI-driven fraud is rising fast. An overview of deepfakes, voice cloning, and AI-generated phishing, and how enterprises can defend against them.',
    keywords: [
      'AI fraud',
      'deepfake detection',
      'voice cloning fraud',
      'AI-generated phishing',
      'enterprise AI security',
      'synthetic media fraud',
    ],
    author: 'Hillary Nyakundi',
    date: '2025-02-12',
    readTime: '5 min read',
    image: '/blogs_research/deeptrack-blog-1.png',
    category: 'AI Fraud',
  },
  {
    slug: 'the-age-of-coordinated-attacks',
    legacyId: '1',
    title: 'The Age of Coordinated Attacks',
    description:
      'How synthetic media and AI tooling are enabling coordinated fraud campaigns at scale, and what enterprises need to know to stay ahead of multi-vector deepfake attacks.',
    keywords: [
      'coordinated deepfake attacks',
      'synthetic media campaigns',
      'AI fraud rings',
      'enterprise threat detection',
      'deepfake fraud prevention',
    ],
    author: 'Hillary Nyakundi',
    date: '2025-03-10',
    readTime: '6 min read',
    image: '/blogs_research/deeptrack-blog-1.png',
    category: 'Threat Intelligence',
  },
  {
    slug: 'the-gotham-blog',
    legacyId: '2',
    title: 'Introducing Deeptrack Gotham: Enterprise Media Verification at Scale',
    description:
      'Deeptrack Gotham brings credit-based scanning, bulk processing, and compliance-ready reporting to enterprise media verification. Here is what it means for your team.',
    keywords: [
      'Deeptrack Gotham',
      'media verification platform',
      'deepfake detection SaaS',
      'enterprise content authenticity',
      'bulk media scanning',
    ],
    author: 'Hillary Nyakundi',
    date: '2025-04-18',
    readTime: '4 min read',
    image: '/blogs_research/deeptrack-blog-1.png',
    category: 'Product',
  },
]

export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug)
}

export function getBlogPostMetadata(post: BlogPost): Metadata {
  const url = `${BASE_URL}/blog/${post.slug}`
  return {
    title: `${post.title} | Deeptrack Blog`,
    description: post.description,
    keywords: post.keywords,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: 'article',
      publishedTime: post.date,
      authors: [post.author],
      images: [
        {
          url: post.image,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image],
    },
  }
}