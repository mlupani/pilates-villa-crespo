import { business } from '@/content/business'
import { images } from '@/content/images'
import {
  getEmail,
  getGeo,
  getMapsUrl,
  getSameAs,
  getTelephone,
  getVerifiedReviews
} from '@/lib/local'
import { getAbsoluteUrl, getSiteUrl } from '@/lib/site'

function absoluteAsset (path: string) {
  return getAbsoluteUrl(path)
}

function localBusinessNode () {
  const origin = getSiteUrl().origin
  const geo = getGeo()
  const telephone = getTelephone()
  const email = getEmail()
  const sameAs = getSameAs()
  const reviews = getVerifiedReviews()

  const node: Record<string, unknown> = {
    '@type': ['LocalBusiness', 'HealthClub', 'ExerciseGym'],
    '@id': `${origin}/#localbusiness`,
    name: business.name,
    alternateName: ['Pilates en Villa Crespo', business.shortName],
    description: business.seo.description,
    url: origin,
    image: [
      absoluteAsset(images.og.src),
      absoluteAsset(images.hero.src)
    ],
    logo: absoluteAsset(images.logo.src),
    address: {
      '@type': 'PostalAddress',
      streetAddress: business.local.streetAddress,
      addressLocality: business.local.city,
      addressRegion: business.local.region,
      postalCode: business.local.postalCode,
      addressCountry: business.local.country
    },
    hasMap: getMapsUrl(),
    areaServed: [
      {
        '@type': 'Neighborhood',
        name: business.local.neighborhood
      },
      {
        '@type': 'City',
        name: business.local.city
      },
      {
        '@type': 'AdministrativeArea',
        name: business.local.region
      }
    ],
    containedInPlace: {
      '@type': 'Neighborhood',
      name: business.local.neighborhood,
      containedInPlace: {
        '@type': 'City',
        name: business.local.city,
        containedInPlace: {
          '@type': 'AdministrativeArea',
          name: business.local.region,
          addressCountry: business.local.country
        }
      }
    },
    priceRange: '$$',
    knowsLanguage: 'es-AR',
    inLanguage: 'es-AR',
    currenciesAccepted: 'ARS',
    paymentAccepted: 'Cash, Transfer'
  }

  if (telephone) {
    const telE164 = telephone.startsWith('+') ? telephone : `+${telephone.replace(/^\+/, '')}`
    node.telephone = telE164
    node.contactPoint = {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      telephone: telE164,
      areaServed: 'AR',
      availableLanguage: ['Spanish']
    }
  }

  if (email) node.email = email
  if (sameAs.length > 0) node.sameAs = sameAs

  if (geo) {
    node.geo = {
      '@type': 'GeoCoordinates',
      latitude: geo.latitude,
      longitude: geo.longitude
    }
  }

  if (business.openingHoursSpecification.length > 0) {
    node.openingHoursSpecification = business.openingHoursSpecification.map((item) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: item.dayOfWeek,
      opens: item.opens,
      closes: item.closes
    }))
  }

  if (reviews.length > 0) {
    node.review = reviews.map((item) => ({
      '@type': 'Review',
      reviewBody: item.quote,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: item.rating,
        bestRating: 5
      },
      author: {
        '@type': 'Person',
        name: item.author
      },
      ...(item.datePublished ? { datePublished: item.datePublished } : {}),
      ...(item.source === 'google' ? { publisher: { '@type': 'Organization', name: 'Google' } } : {})
    }))
  }

  return node
}

function websiteNode () {
  const origin = getSiteUrl().origin

  return {
    '@type': 'WebSite',
    '@id': `${origin}/#website`,
    url: origin,
    name: business.name,
    description: business.seo.description,
    inLanguage: 'es-AR',
    publisher: {
      '@id': `${origin}/#localbusiness`
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${origin}/?q={search_term_string}`
      },
      // eslint-disable-next-line @typescript-eslint/naming-convention
      'query-input': 'required name=search_term_string'
    }
  }
}

export function getSiteJsonLd () {
  return {
    '@context': 'https://schema.org',
    '@graph': [websiteNode(), localBusinessNode()]
  }
}

export function getFaqJsonLd (items = business.faq) {
  return {
    '@context': 'https://schema.org',
    '@graph': [{
      '@type': 'FAQPage',
      '@id': `${getSiteUrl().origin}/#faq`,
      mainEntity: items.map((item) => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: {
          '@type': 'Answer',
          text: item.answer
        }
      }))
    }]
  }
}

export function getBreadcrumbJsonLd (items: Array<{ name: string, path: string }>) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: getAbsoluteUrl(item.path)
    }))
  }
}
