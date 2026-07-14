import { MetadataRoute } from 'next'

import { features } from '@/data/blog'
import { jobs } from '@/data/jobs'

const BASE_URL = 'https://www.deeptrack.io'
const now = new Date()

const staticPages: MetadataRoute.Sitemap = [
  {
    url: BASE_URL,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: `${BASE_URL}/productApi`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/sentinel`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/nacha`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.9,
  },
  {
    url: `${BASE_URL}/resources/nacha-2026-checklist`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.65,
  },
  {
    url: `${BASE_URL}/research`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/news`,
    lastModified: now,
    changeFrequency: 'daily',
    priority: 0.8,
  },
  {
    url: `${BASE_URL}/about`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/about/company-and-culture`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/about/leadership`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/about/technology`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.6,
  },
  {
    url: `${BASE_URL}/contact`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/legal`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/legal/terms-of-use`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/legal/service-level-agreement`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/legal/privacy-policy`,
    lastModified: now,
    changeFrequency: 'yearly',
    priority: 0.3,
  },
  {
    url: `${BASE_URL}/solution/audio-authentication`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/solution/gotham`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/solution/image-authentication`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/use-case/media-use-case`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/use-case/insurance-use-case`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/use-case/government-use-case`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/use-case/finance-use-case`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: `${BASE_URL}/use-case/executive-identity-shielding`,
    lastModified: now,
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  // NOTE: /console removed — login-protected pages waste crawl budget
]

export default function sitemap(): MetadataRoute.Sitemap {
  const blogPages: MetadataRoute.Sitemap = features.map((feature) => ({
    url: `${BASE_URL}${feature.link}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.6,
  }))

  const careerPages: MetadataRoute.Sitemap = jobs.map((job) => ({
    url: `${BASE_URL}/career/${job.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }))

  return [...staticPages, ...blogPages, ...careerPages]
}