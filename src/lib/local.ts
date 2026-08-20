import { business, type Testimonial } from '@/content/business'
import { isPendingValue } from '@/lib/site'
import { formatOpeningDays } from '@/lib/utils'

export function hasLocalValue (value: string | null | undefined) {
  return !isPendingValue(value)
}

export function getTelephone () {
  return hasLocalValue(business.local.telephone) ? business.local.telephone : null
}

export function getWhatsAppNumber () {
  return hasLocalValue(business.local.whatsapp) ? business.local.whatsapp : null
}

export function getEmail () {
  return hasLocalValue(business.local.email) ? business.local.email : null
}

export function getGeo () {
  const { latitude, longitude } = business.local.geo
  if (!hasLocalValue(latitude) || !hasLocalValue(longitude)) return null

  return {
    latitude: Number(latitude),
    longitude: Number(longitude)
  }
}

export function getSameAs () {
  return Object.values(business.profiles)
    .map((profile) => profile.url)
    .filter((url) => hasLocalValue(url))
}

export function getGoogleBusinessUrl () {
  return hasLocalValue(business.profiles.googleBusiness.url)
    ? business.profiles.googleBusiness.url
    : null
}

export function getPublicProfiles () {
  return Object.values(business.profiles).filter((profile) => hasLocalValue(profile.url))
}

export function getLocalGeoMeta () {
  const geo = getGeo()
  const other: Record<string, string> = {
    'geo.region': 'AR-C',
    'geo.placename': `${business.local.neighborhood}, ${business.local.city}`
  }

  if (geo) {
    other['geo.position'] = `${geo.latitude};${geo.longitude}`
    other.ICBM = `${geo.latitude}, ${geo.longitude}`
  }

  return other
}

export function getMapsUrl () {
  return business.local.mapsUrl
}

export function getMapsEmbedUrl () {
  if (hasLocalValue(business.local.mapsEmbedUrl)) {
    return business.local.mapsEmbedUrl
  }

  const query = encodeURIComponent(business.local.addressFormatted)
  return `https://maps.google.com/maps?q=${query}&hl=es&z=16&output=embed`
}

export function getWhatsAppUrl (message?: string) {
  const number = getWhatsAppNumber()
  if (!number) return null

  const text = encodeURIComponent(
    message ?? `Hola, quiero reservar una clase de prueba en ${business.name}.`
  )

  return `https://wa.me/${number}?text=${text}`
}

export function getPublishedTestimonials (): Testimonial[] {
  return business.testimonials.filter((item) => item.published)
}

export function getVerifiedReviews (): Testimonial[] {
  return getPublishedTestimonials().filter((item) => item.verified)
}

export function getOpeningHoursSummary () {
  return business.openingHoursSpecification.map((item) => ({
    days: formatOpeningDays(item.dayOfWeek),
    hours: `${item.opens} a ${item.closes}`
  }))
}

export function getFullAddress () {
  return [
    business.local.streetAddress,
    business.local.neighborhood,
    business.local.city,
    business.local.postalCode
  ].join(', ')
}
