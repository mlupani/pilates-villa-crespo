import { envOrPlaceholder } from '@/lib/site'

/**
 * Fuente centralizada de NAP y datos del negocio.
 * Completá en `.env` las variables NEXT_PUBLIC_* (teléfono, WhatsApp, email,
 * coordenadas, Google Business Profile, Facebook, embed de Maps).
 * Los valores TODO_* no se publican en schema ni como enlaces hasta completarlos.
 */

export interface NavLink {
  href: string
  label: string
}

export interface Benefit {
  number: string
  title: string
  description: string
  icon: 'users' | 'heart' | 'sun'
}

export interface ClassItem {
  id: string
  name: string
  description: string
  forWhom: string
  imageKey: 'reformer' | 'mat' | 'personal'
}

export interface LocationDetail {
  title: string
  description: string
}

export interface BookingStep {
  number: string
  title: string
  description: string
}

/** Reseña reutilizable. `published` la muestra en la web; `verified` la incluye en schema. */
export interface Testimonial {
  id: string
  quote: string
  author: string
  rating: 1 | 2 | 3 | 4 | 5
  source: 'web' | 'google'
  verified: boolean
  published: boolean
  neighborhood?: string
  datePublished?: string
}

export interface SocialProfile {
  label: string
  url: string
}

export interface FaqItem {
  question: string
  answer: string
}

export interface PricePlan {
  name: string
  detail: string
  amount: string
}

export interface ScheduleSlot {
  day: string
  hours: string
}

export interface OpeningHoursSpecification {
  dayOfWeek: string | string[]
  opens: string
  closes: string
}

const local = {
  streetAddress: 'Batalla del Pari 484',
  neighborhood: 'Villa Crespo',
  city: 'Buenos Aires',
  region: 'Ciudad Autónoma de Buenos Aires',
  postalCode: 'C1414D',
  country: 'AR',
  countryName: 'Argentina',
  addressFormatted: 'Batalla del Pari 484, Villa Crespo, Buenos Aires, Argentina',
  telephone: envOrPlaceholder(process.env.NEXT_PUBLIC_TELEPHONE ?? process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, 'TODO_TELEPHONE'),
  whatsapp: envOrPlaceholder(process.env.NEXT_PUBLIC_WHATSAPP_NUMBER, 'TODO_WHATSAPP'),
  email: envOrPlaceholder(process.env.NEXT_PUBLIC_EMAIL, 'TODO_EMAIL'),
  geo: {
    latitude: envOrPlaceholder(process.env.NEXT_PUBLIC_GEO_LATITUDE, 'TODO_GEO_LATITUDE'),
    longitude: envOrPlaceholder(process.env.NEXT_PUBLIC_GEO_LONGITUDE, 'TODO_GEO_LONGITUDE')
  },
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Batalla+del+Pari+484+Villa+Crespo+Buenos+Aires',
  mapsEmbedUrl: envOrPlaceholder(process.env.NEXT_PUBLIC_MAPS_EMBED_URL, 'TODO_MAPS_EMBED_URL')
}

const profiles = {
  instagram: {
    label: 'Instagram',
    url: 'https://instagram.com/pilates.villacrespo'
  },
  googleBusiness: {
    label: 'Google Business Profile',
    url: envOrPlaceholder(process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL, 'TODO_GOOGLE_BUSINESS_URL')
  },
  facebook: {
    label: 'Facebook',
    url: envOrPlaceholder(process.env.NEXT_PUBLIC_FACEBOOK_URL, 'TODO_FACEBOOK_URL')
  }
} satisfies Record<string, SocialProfile>

export const business = {
  name: 'Pilates Villa Crespo',
  shortName: 'Pilates',
  tagline: 'Un espacio para moverte mejor, sentirte mejor.',
  local,
  profiles,
  neighborhood: local.neighborhood,
  city: local.city,
  region: local.region,
  country: local.country,
  countryName: local.countryName,
  instagram: '@pilates.villacrespo',
  instagramUrl: profiles.instagram.url,
  whatsapp: local.whatsapp,
  contact: {
    telephone: local.telephone,
    email: local.email
  },
  geo: local.geo,
  openingHoursSpecification: [
    { dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'], opens: '08:00', closes: '21:00' },
    { dayOfWeek: ['Saturday'], opens: '09:00', closes: '13:00' }
  ] as OpeningHoursSpecification[],
  address: local.addressFormatted,
  addressLine: local.streetAddress,
  postalCode: local.postalCode,
  addressNote: 'A pasos de Av. Warnes y Av. Honorio Pueyrredón, en Villa Crespo. Llegá en Subte B, colectivo o auto.',
  mapsUrl: local.mapsUrl,
  audience: 'Las clases son para todos los niveles: si nunca hiciste Pilates, si estás volviendo a moverte o si ya practicás y buscás un espacio más cuidado.',
  instructor: {
    name: 'Valentina',
    role: 'Profesora de Pilates',
    highlight: 'Experiencia + formación',
    bio: 'Mi objetivo es acompañarte a incorporar el movimiento como parte de tu bienestar, con clases cuidadas, cercanas y adaptadas a cada persona.'
  },
  cta: {
    trial: 'Reservar una clase de prueba',
    trialMine: 'Reservar mi clase de prueba',
    trialReformer: 'Probar una clase de Reformer',
    trialShort: 'Reservar una clase',
    availability: 'Consultar disponibilidad',
    schedule: 'Ver horarios',
    directions: 'Cómo llegar',
    whatsapp: 'Reservar por WhatsApp',
    knowMore: 'Conocer más'
  },
  nav: [
    { href: '/clases-de-pilates', label: 'Clases' },
    { href: '/horarios-y-precios', label: 'Horarios' },
    { href: '/pilates-en-villa-crespo', label: 'Villa Crespo' }
  ] satisfies NavLink[],
  benefits: [
    {
      number: '01',
      title: 'Grupos reducidos',
      description: 'Más atención y seguimiento durante cada clase.',
      icon: 'users'
    },
    {
      number: '02',
      title: 'Atención personalizada',
      description: 'Ejercicios adaptados a tus necesidades y objetivos.',
      icon: 'heart'
    },
    {
      number: '03',
      title: 'Un espacio cálido',
      description: 'Un ambiente tranquilo donde puedas disfrutar del movimiento.',
      icon: 'sun'
    }
  ] satisfies Benefit[],
  classes: [
    {
      id: 'reformer',
      name: 'Pilates Reformer',
      description: 'Fortalecé, mejorá tu postura y trabajá todo el cuerpo con máquinas Reformer, en grupos reducidos.',
      forWhom: 'Todos los niveles',
      imageKey: 'reformer'
    },
    {
      id: 'mat',
      name: 'Pilates Mat',
      description: 'Trabajo integral de fuerza, movilidad y control corporal. Una base clara para empezar o complementar Reformer.',
      forWhom: 'Ideal para comenzar',
      imageKey: 'mat'
    },
    {
      id: 'personal',
      name: 'Pilates Personalizado',
      description: 'Una sesión 100% adaptada a tus objetivos, ritmos y necesidades, con seguimiento cercano.',
      forWhom: 'Objetivos específicos',
      imageKey: 'personal'
    }
  ] satisfies ClassItem[],
  testimonials: [
    // published: true las muestra en la web. verified: true las incluye en Review schema.
    // Reemplazar o completar con reseñas reales; no marcar verified hasta confirmar la fuente.
    {
      id: 'mariana',
      quote: 'Me encanta el ambiente y la atención. Las clases son súper personalizadas y siempre salgo sintiéndome mejor.',
      author: 'Mariana',
      rating: 5,
      source: 'web',
      verified: false,
      published: true
    },
    {
      id: 'lucia',
      quote: 'Después de probar varios lugares, encontré acá un espacio donde realmente me siento cómoda.',
      author: 'Lucía',
      rating: 5,
      source: 'web',
      verified: false,
      published: true
    },
    {
      id: 'carolina',
      quote: 'Los grupos reducidos hacen toda la diferencia.',
      author: 'Carolina',
      rating: 5,
      source: 'web',
      verified: false,
      published: true
    }
  ] satisfies Testimonial[],
  faq: [
    {
      question: '¿Necesito experiencia previa?',
      answer: 'No. Las clases están pensadas para todos los niveles. Si es tu primera vez, te orientamos para que empieces con calma y confianza.'
    },
    {
      question: '¿Qué tengo que llevar a la clase?',
      answer: 'Ropa cómoda, medias antideslizantes si las preferís, y una botellita de agua. El resto lo tenemos en el estudio.'
    },
    {
      question: '¿Cómo son los grupos?',
      answer: 'Trabajamos con grupos reducidos para poder acompañarte de cerca durante toda la clase y cuidar cada detalle de tu práctica.'
    },
    {
      question: '¿Puedo hacer una clase de prueba?',
      answer: 'Sí. Podés reservar una clase de prueba para conocer el estudio, la dinámica y ver si el horario te queda cómodo. Te confirmamos disponibilidad por WhatsApp o desde el asistente de esta web.'
    },
    {
      question: '¿Dónde están ubicados?',
      answer: 'Estamos en Batalla del Pari 484, Villa Crespo, Buenos Aires (C1414D). A pasos de Av. Warnes y Av. Honorio Pueyrredón. En la web tenés el mapa y cómo llegar.'
    },
    {
      question: '¿Cómo puedo reservar?',
      answer: 'Elegí un horario, dejá tu nombre y WhatsApp desde Reservar una clase de prueba, o escribinos directo. Te confirmamos disponibilidad a la brevedad.'
    },
    {
      question: '¿Qué horarios tienen?',
      answer: 'Tenemos horarios de lunes a sábado, por la mañana y por la tarde. La grilla puede variar, así que lo mejor es consultar disponibilidad para encontrar el que mejor te quede.'
    }
  ] satisfies FaqItem[],
  schedule: [
    { day: 'Lunes a viernes', hours: '8:00 · 9:30 · 18:00 · 19:30' },
    { day: 'Sábados', hours: '9:00 · 10:30' }
  ] satisfies ScheduleSlot[],
  prices: [
    { name: '4 clases', detail: 'Ideal para empezar con calma.', amount: 'TODO_PRICE' },
    { name: '8 clases', detail: 'La opción más elegida para una práctica regular.', amount: 'TODO_PRICE' },
    { name: 'Clase personalizada', detail: 'Una sesión pensada 100% para vos.', amount: 'TODO_PRICE' }
  ] satisfies PricePlan[],
  trialClass: {
    duration: 'TODO_CLASS_DURATION',
    bring: 'Ropa cómoda, medias antideslizantes si las preferís, y una botellita de agua. El resto lo tenemos en el estudio.'
  },
  locationDetails: [
    {
      title: 'Barrio',
      description: 'Estamos en Batalla del Pari 484, Villa Crespo. Un estudio íntimo, de fácil acceso y a pasos de Av. Warnes y Av. Honorio Pueyrredón.'
    },
    {
      title: 'Cómo llegar',
      description: 'Subte B (estaciones Dorrego o Malabia) y colectivos por Warnes, Honorio Pueyrredón y Corrientes. Si venís en auto, el barrio tiene opciones para estacionar en las calles de alrededor.'
    },
    {
      title: 'Primera visita',
      description: 'Llegá unos minutos antes. Te recibimos, te contamos cómo es la clase y te acompañamos en cada paso.'
    }
  ] satisfies LocationDetail[],
  bookingSteps: [
    {
      number: '01',
      title: 'Elegí un horario',
      description: 'Mirá la grilla y pensá qué día te queda más cómodo.'
    },
    {
      number: '02',
      title: 'Reservá tu clase de prueba',
      description: 'Dejanos tu nombre y WhatsApp. Sin experiencia previa.'
    },
    {
      number: '03',
      title: 'Te confirmamos el lugar',
      description: 'Te escribimos para confirmar disponibilidad. El estudio está en Batalla del Pari 484.'
    }
  ] satisfies BookingStep[],
  seo: {
    title: 'Pilates Villa Crespo | Clases de Reformer en CABA',
    description: 'Estudio de Pilates en Villa Crespo, Buenos Aires. Clases de Reformer y Mat en grupos reducidos, para todos los niveles. Reservá una clase de prueba.',
    keywords: [
      'Pilates Villa Crespo',
      'Pilates Reformer',
      'clases de Pilates en Buenos Aires',
      'estudio de Pilates Villa Crespo'
    ]
  }
}
