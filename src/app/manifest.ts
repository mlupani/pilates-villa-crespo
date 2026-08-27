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
        src: '/favicon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'any'
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable'
      }
    ]
  }
}
