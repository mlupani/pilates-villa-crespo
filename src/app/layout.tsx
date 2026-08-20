import type { Metadata, Viewport } from 'next'
import { Cormorant_Garamond as CormorantGaramond, Figtree } from 'next/font/google'
import { business } from '@/content/business'
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

const siteUrl = new URL('https://pilatesvillacrespo.demo')
const shareImage = {
  url: '/logo.jpg',
  width: 417,
  height: 417,
  alt: 'Logo de Pilates Villa Crespo',
  type: 'image/jpeg'
}

export const viewport: Viewport = {
  themeColor: '#f6f1ea',
  width: 'device-width',
  initialScale: 1
}

export const metadata: Metadata = {
  metadataBase: siteUrl,
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
  alternates: {
    canonical: '/'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
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
  icons: {
    icon: [{ url: '/logo.jpg', type: 'image/jpeg', sizes: '417x417' }],
    apple: [{ url: '/logo.jpg', type: 'image/jpeg', sizes: '417x417' }],
    shortcut: '/logo.jpg'
  },
  openGraph: {
    title: business.seo.title,
    description: business.seo.description,
    url: '/',
    locale: 'es_AR',
    type: 'website',
    siteName: business.name,
    images: [shareImage]
  },
  twitter: {
    card: 'summary_large_image',
    title: business.seo.title,
    description: business.seo.description,
    images: [shareImage]
  },
  other: {
    'og:image:type': 'image/jpeg'
  }
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'HealthClub',
  name: business.name,
  description: business.seo.description,
  image: '/logo.jpg',
  logo: '/logo.jpg',
  url: siteUrl.href,
  telephone: business.whatsapp === 'WHATSAPP_NUMBER' ? undefined : business.whatsapp,
  address: {
    '@type': 'PostalAddress',
    addressLocality: business.neighborhood,
    addressRegion: business.city,
    addressCountry: 'AR'
  },
  areaServed: {
    '@type': 'City',
    name: `${business.neighborhood}, ${business.city}`
  },
  sameAs: [business.instagramUrl]
}

export default function RootLayout ({ children }: LayoutProps<'/'>) {
  return (
    <html
      lang='es-AR'
      className={`${display.variable} ${sans.variable} h-full antialiased`}
    >
      <body className='min-h-full bg-cream font-sans text-ink'>
        <script
          type='application/ld+json'
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {children}
      </body>
    </html>
  )
}
