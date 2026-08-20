import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond as CormorantGaramond, Figtree } from 'next/font/google'
import { JsonLd } from '@/components/JsonLd'
import { Analytics } from '@/components/Analytics'
import { business } from '@/content/business'
import { getSiteJsonLd } from '@/lib/jsonld'
import { getLocalGeoMeta } from '@/lib/local'
import { getSiteUrl, isIndexable } from '@/lib/site'
import './globals.css'

const display = CormorantGaramond({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap'
})

const sans = Figtree({
  subsets: ['latin'],
  variable: '--font-figtree',
  display: 'swap'
})

const indexable = isIndexable()

export const viewport: Viewport = {
  themeColor: '#f6f1ea',
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover'
}

export const metadata: Metadata = {
  metadataBase: getSiteUrl(),
  title: {
    default: business.seo.title,
    template: `%s | ${business.name}`
  },
  description: business.seo.description,
  applicationName: business.name,
  authors: [{ name: business.name }],
  creator: business.name,
  publisher: business.name,
  category: 'health',
  keywords: business.seo.keywords,
  referrer: 'origin-when-cross-origin',
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
  formatDetection: {
    email: false,
    address: false,
    telephone: false
  },
  openGraph: {
    title: business.seo.title,
    description: business.seo.description,
    url: '/',
    locale: 'es_AR',
    type: 'website',
    siteName: business.name
  },
  twitter: {
    card: 'summary_large_image',
    title: business.seo.title,
    description: business.seo.description
  },
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined,
  other: getLocalGeoMeta()
}

export default function RootLayout ({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='es-AR'
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className='min-h-full bg-cream font-sans text-ink'>
        <JsonLd data={getSiteJsonLd()} />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
