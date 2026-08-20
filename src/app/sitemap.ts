import type { MetadataRoute } from 'next'
import { getAbsoluteUrl, isIndexable } from '@/lib/site'
import { routes } from '@/lib/routes'

export default function sitemap (): MetadataRoute.Sitemap {
  if (!isIndexable()) return []

  return [
    { url: getAbsoluteUrl(routes.home), lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: getAbsoluteUrl(routes.villaCrespo), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: getAbsoluteUrl(routes.trial), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: getAbsoluteUrl(routes.classes), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: getAbsoluteUrl(routes.reformer), lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: getAbsoluteUrl(routes.schedule), lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 }
  ]
}
