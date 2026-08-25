import type { Metadata } from 'next'
import { business } from '@/content/business'
import { images } from '@/content/images'
import { getAbsoluteUrl, isIndexable } from '@/lib/site'

export interface PageMetadataInput {
  title: string
  description: string
  path?: string
  /** Use on the homepage so the title template is not appended twice. */
  absoluteTitle?: boolean
  ogTitle?: string
  noIndex?: boolean
}

export function createPageMetadata ({
  title,
  description,
  path = '/',
  absoluteTitle = false,
  ogTitle,
  noIndex = false
}: PageMetadataInput): Metadata {
  const canonical = getAbsoluteUrl(path)
  const url = getAbsoluteUrl(path)
  const indexable = isIndexable() && !noIndex
  const socialTitle = ogTitle ?? title
  const ogImageUrl = getAbsoluteUrl(images.og.src)

  return {
    title: absoluteTitle ? { absolute: title } : title,
    description,
    alternates: {
      canonical
    },
    robots: {
      index: indexable,
      follow: indexable,
      nocache: !indexable,
      googleBot: {
        index: indexable,
        follow: indexable,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1
      }
    },
    openGraph: {
      title: socialTitle,
      description,
      url,
      locale: 'es_AR',
      type: 'website',
      siteName: business.name,
      images: [
        {
          url: ogImageUrl,
          width: images.og.width,
          height: images.og.height,
          alt: images.og.alt
        }
      ]
    },
    twitter: {
      card: 'summary_large_image',
      title: socialTitle,
      description,
      images: [ogImageUrl]
    }
  }
}
