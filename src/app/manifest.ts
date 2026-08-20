import type { MetadataRoute } from 'next'
import { business } from '@/content/business'

export default function manifest (): MetadataRoute.Manifest {
  return {
    name: business.name,
    short_name: 'Pilates VC',
    description: business.seo.description,
    start_url: '/',
    display: 'browser',
    background_color: '#f6f1ea',
    theme_color: '#f6f1ea',
    lang: 'es-AR',
    icons: [
      {
        src: '/logo.jpg',
        sizes: '417x417',
        type: 'image/jpeg',
        purpose: 'any'
      }
    ]
  }
}
