import type { MetadataRoute } from 'next'
import { getAbsoluteUrl, isIndexable } from '@/lib/site'
import { routes } from '@/lib/routes'

const LAST_MODIFIED = new Date('2026-08-24T00:00:00.000Z')

export default function sitemap (): MetadataRoute.Sitemap {
  if (!isIndexable()) return []

  return [
    { url: getAbsoluteUrl(routes.home), lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 1 },
    { url: getAbsoluteUrl(routes.villaCrespo), lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.9 },
    { url: getAbsoluteUrl(routes.trial), lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.9 },
    { url: getAbsoluteUrl(routes.classes), lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: getAbsoluteUrl(routes.reformer), lastModified: LAST_MODIFIED, changeFrequency: 'monthly', priority: 0.8 },
    { url: getAbsoluteUrl(routes.schedule), lastModified: LAST_MODIFIED, changeFrequency: 'weekly', priority: 0.8 }
  ]
}
