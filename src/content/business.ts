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
  icon: 'users' | 'heart' | 'sun' | 'sparkles'
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
  featured?: boolean
}

export interface Announcement {
  enabled: boolean
  text: string
  href?: string
  intent?: 'trial' | 'availability' | 'plan' | 'start' | 'location'
}

export interface ScheduleSlot {
  day: string
  lines: string[]
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
  tagline: 'Clases en grupos reducidos, adaptadas a tu nivel y objetivos.',
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
  audience: 'Las clases se adaptan a tu experiencia, características y objetivos. Podés empezar aunque nunca hayas hecho Pilates.',
  announcement: {
    enabled: true,
    text: 'Clase de prueba sin cargo',
    href: '#asistente',
    intent: 'trial'
  } satisfies Announcement,
  atmosphere: ['Reformer', 'Clase de prueba sin cargo', 'Villa Crespo'],
  community: {
    eyebrow: 'La comunidad',
    title: 'Hay lugar para todos los ritmos',
    description: 'La puntual, la que llega justo, la que pregunta todo. El estudio se construye entre quienes vienen a moverse, no contra un ideal de alumna perfecta.',
    cta: 'Seguinos en Instagram'
  },
  cta: {
    trial: 'Quiero probar una clase',
    trialMine: 'Quiero probar una clase',
    trialReformer: 'Quiero probar una clase',
    trialShort: 'Probar una clase',
    availability: 'Consultar disponibilidad',
    schedule: 'Ver horarios',
    classes: 'Conocé cómo son las clases',
    directions: 'Cómo llegar',
    howToArrive: 'Consultar cómo llegar',
    whatsapp: 'Escribir por WhatsApp',
    knowMore: 'Conocer más',
    talk: 'Hablar con nosotros',
    choosePlan: 'Ayudame a elegir',
    consult: 'Tengo una consulta'
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
      description: 'Hasta 5 alumnos por clase, para una experiencia más personalizada.',
      icon: 'users'
    },
    {
      number: '02',
      title: 'Adaptado a vos',
      description: 'Las clases se adaptan a la experiencia, características y objetivos de cada persona.',
      icon: 'heart'
    },
    {
      number: '03',
      title: 'No necesitás experiencia',
      description: 'Podés comenzar aunque nunca hayas hecho Pilates.',
      icon: 'sun'
    },
    {
      number: '04',
      title: 'Clase de prueba sin cargo',
      description: 'Conocé el estudio y nuestra forma de trabajar antes de empezar.',
      icon: 'sparkles'
    }
  ] satisfies Benefit[],
  classes: [
    {
      id: 'reformer',
      name: 'Pilates Reformer',
      description: 'Trabajo de fuerza, movilidad, control y equilibrio en máquina, con un enfoque clásico y contemporáneo. Clases de 50 minutos, en grupos de hasta 5 alumnos o en modalidad individual.',
      forWhom: 'Hasta 5 alumnos · 50 minutos',
      imageKey: 'reformer'
    },
    {
      id: 'personal',
      name: 'Pilates Personalizado',
      description: 'Una sesión individual, 100% adaptada a tus objetivos, ritmos y necesidades, con seguimiento cercano.',
      forWhom: 'Modalidad individual',
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
      published: false
    },
    {
      id: 'lucia',
      quote: 'Después de probar varios lugares, encontré acá un espacio donde realmente me siento cómoda.',
      author: 'Lucía',
      rating: 5,
      source: 'web',
      verified: false,
      published: false
    },
    {
      id: 'carolina',
      quote: 'Los grupos reducidos hacen toda la diferencia.',
      author: 'Carolina',
      rating: 5,
      source: 'web',
      verified: false,
      published: false
    }
  ] satisfies Testimonial[],
  faq: [
    {
      question: '¿Necesito experiencia previa?',
      answer: 'No. Podés comenzar aunque nunca hayas hecho Pilates. Las clases se adaptan a las características y objetivos de cada persona.'
    },
    {
      question: '¿Cuánto dura una clase?',
      answer: 'Las clases duran 50 minutos.'
    },
    {
      question: '¿Cuántas personas hay por clase?',
      answer: 'Trabajamos con grupos de hasta 5 alumnos, para poder acompañarte de cerca durante toda la clase.'
    },
    {
      question: '¿Qué tengo que llevar?',
      answer: 'Ropa cómoda y una botellita de agua. El resto lo tenemos en el estudio.'
    },
    {
      question: '¿Tengo que usar medias antideslizantes?',
      answer: 'No es obligatorio. Si preferís usarlas, traelas. Si no, te recibimos igual.'
    },
    {
      question: '¿Qué son los horarios libres?',
      answer: 'Son horarios flexibles según tu disponibilidad. Además de los turnos fijos de la grilla, podés tener horarios libres: nos decís qué días y franjas te quedan cómodas y buscamos el mejor hueco. Ideal si tu semana cambia o querés sumar más frecuencia sin atarte a un único horario.'
    },
    {
      question: '¿Cómo funcionan las recuperaciones?',
      answer: 'Las recuperaciones se coordinan según disponibilidad. Podés tener horario fijo o horario libre. Cuando alguien avisa que falta, se libera un lugar y lo avisamos en el grupo de alumnas —sobre todo quienes tienen horarios libres pueden tomarlo— para que no se pierda el cupo. Escribinos por el asistente y te explicamos cómo funciona en tu caso.'
    },
    {
      question: '¿Cómo aprovecho un lugar que se libera cuando alguien falta?',
      answer: 'Cuando una alumna avisa que no viene, queda un hueco en ese horario. Lo avisamos en el grupo donde están todas y cualquier alumna puede tomarlo, en especial quienes tienen horarios libres. Es una forma simple de sumar una clase y no perder la tuya.'
    },
    {
      question: '¿Cómo consulto disponibilidad?',
      answer: 'Mirá la grilla de horarios en la web y consultanos por el asistente. Podés consultar por un horario fijo o por horarios libres según tu disponibilidad. La disponibilidad de cupos puede variar según el horario; te confirmamos el lugar antes de que vengas.'
    }
  ] satisfies FaqItem[],
  schedule: [
    {
      day: 'Lunes a viernes',
      lines: ['08:00 · 09:00 · 10:00 · 11:00', '17:00 · 18:00 · 19:00 · 20:00']
    },
    {
      day: 'Sábados',
      lines: ['09:00 a 13:00']
    }
  ] satisfies ScheduleSlot[],
  prices: [
    { name: '4 clases por mes', detail: 'Ideal para empezar con calma.', amount: '$58.500' },
    { name: '8 clases por mes', detail: 'La opción más elegida para una práctica regular.', amount: '$69.500', featured: true },
    { name: '12 clases por mes', detail: 'Si ya tenés el hábito y querés más frecuencia.', amount: '$85.000' }
  ] satisfies PricePlan[],
  trialClass: {
    duration: '50 minutos',
    bring: 'Ropa cómoda y una botellita de agua. Si preferís medias antideslizantes, traelas. El resto lo tenemos en el estudio.'
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
      title: 'Contanos qué buscás',
      description: 'Abrí el asistente. Te preguntamos objetivos, experiencia y si hay algo que debamos tener en cuenta.'
    },
    {
      number: '02',
      title: 'Elegí días y horarios',
      description: 'Indicá qué te queda cómodo. La disponibilidad de cupos puede variar según el horario.'
    },
    {
      number: '03',
      title: 'Te confirmamos el lugar',
      description: 'Una persona del estudio confirma el cupo de tu clase de prueba, sin cargo, en Batalla del Pari 484.'
    }
  ] satisfies BookingStep[],
  seo: {
    title: 'Pilates en Villa Crespo',
    description: 'Estudio de Pilates en Villa Crespo. Grupos de hasta 5 alumnos, clases de 50 minutos y clase de prueba sin cargo. Sin experiencia previa. Reservá tu lugar.',
    keywords: [
      'Pilates Villa Crespo',
      'Pilates en Villa Crespo',
      'clases de Pilates Villa Crespo',
      'estudio de Pilates Villa Crespo',
      'Pilates Reformer',
      'pilates grupos reducidos',
      'clase prueba pilates',
      'pilates CABA',
      'estudio pilates Buenos Aires'
    ]
  }
}
