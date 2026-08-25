import type { MetadataRoute } from 'next'
import { business } from '@/content/business'

export default function manifest (): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: 'Pilates VC',
    description: business.seo.description,
    start_url: '/',
    display: 'standalone',
    background_color: '#f6f1ea',
    theme_color: '#f6f1ea',
    lang: 'es-AR',
    icons: [
      {
        src: '/logo.png',
        sizes: '417x417',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/logo.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable'
      },
      {
        src: '/logo.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  }
}
