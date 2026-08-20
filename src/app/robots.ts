import type { MetadataRoute } from 'next'
import { getSiteUrl, isIndexable } from '@/lib/site'

export default function robots (): MetadataRoute.Robots {
  const origin = getSiteUrl().origin

  if (!isIndexable()) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/'
      },
      host: origin
    }
  }

  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/']
    },
    sitemap: `${origin}/sitemap.xml`,
    host: origin
  }
}
