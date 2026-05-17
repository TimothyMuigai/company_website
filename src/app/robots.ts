import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/portal/', '/api/'],
      },
    ],
    sitemap: 'https://deeptrack.io/sitemap.xml',
    host: 'https://deeptrack.io',
  }
}
