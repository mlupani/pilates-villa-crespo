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
  imageKey: 'reformer' | 'mat' | 'personal'
}

export interface Testimonial {
  quote: string
  author: string
  rating: 5
}

export interface FaqItem {
  question: string
  answer: string
}

export interface PricePlan {
  name: string
  detail: string
}

export interface ScheduleSlot {
  day: string
  hours: string
}

export const business = {
  name: 'Pilates Villa Crespo',
  shortName: 'Pilates',
  neighborhood: 'Villa Crespo',
  city: 'Buenos Aires',
  tagline: 'Un espacio para moverte mejor, sentirte mejor.',
  instagram: '@pilates.villacrespo',
  instagramUrl: 'https://instagram.com/pilates.villacrespo',
  whatsapp: 'WHATSAPP_NUMBER',
  address: 'Villa Crespo, Buenos Aires',
  mapsUrl: 'https://www.google.com/maps/search/?api=1&query=Villa+Crespo+Buenos+Aires',
  instructor: {
    name: 'Valentina',
    role: 'Profesora de Pilates',
    highlight: 'Experiencia + formación',
    bio: 'Mi objetivo es acompañarte a incorporar el movimiento como parte de tu bienestar, con clases cuidadas, cercanas y adaptadas a cada persona.'
  },
  nav: [
    { href: '#inicio', label: 'Inicio' },
    { href: '#clases', label: 'Clases' },
    { href: '#espacio', label: 'El espacio' },
    { href: '#faq', label: 'Preguntas frecuentes' }
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
      description: 'Fortalecé, mejorá tu postura y trabajá todo el cuerpo.',
      imageKey: 'reformer'
    },
    {
      id: 'mat',
      name: 'Pilates Mat',
      description: 'Trabajo integral de fuerza, movilidad y control corporal.',
      imageKey: 'mat'
    },
    {
      id: 'personal',
      name: 'Pilates Personalizado',
      description: 'Una experiencia adaptada completamente a tus objetivos.',
      imageKey: 'personal'
    }
  ] satisfies ClassItem[],
  testimonials: [
    {
      quote: 'Me encanta el ambiente y la atención. Las clases son súper personalizadas y siempre salgo sintiéndome mejor.',
      author: 'Mariana',
      rating: 5
    },
    {
      quote: 'Después de probar varios lugares, encontré acá un espacio donde realmente me siento cómoda.',
      author: 'Lucía',
      rating: 5
    },
    {
      quote: 'Los grupos reducidos hacen toda la diferencia.',
      author: 'Carolina',
      rating: 5
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
      question: '¿Dónde están ubicados?',
      answer: 'Estamos en Villa Crespo, Buenos Aires. Escribinos y te compartimos la dirección exacta y la mejor forma de llegar.'
    },
    {
      question: '¿Cómo puedo reservar?',
      answer: 'Podés escribirnos por WhatsApp, usar el asistente de esta web o el botón Reservar una clase. Te confirmamos disponibilidad a la brevedad.'
    },
    {
      question: '¿Qué horarios tienen?',
      answer: 'Tenemos horarios durante la semana, por la mañana y por la tarde. La disponibilidad varía, así que lo mejor es consultarnos para encontrar el que mejor te quede.'
    }
  ] satisfies FaqItem[],
  schedule: [
    { day: 'Lunes a viernes', hours: '8:00 · 9:30 · 18:00 · 19:30' },
    { day: 'Sábados', hours: '9:00 · 10:30' }
  ] satisfies ScheduleSlot[],
  prices: [
    { name: '4 clases', detail: 'Ideal para empezar con calma.' },
    { name: '8 clases', detail: 'La opción más elegida para una práctica regular.' },
    { name: 'Clase personalizada', detail: 'Una sesión pensada 100% para vos.' }
  ] satisfies PricePlan[],
  seo: {
    title: 'Pilates Villa Crespo | Pilates Reformer en Buenos Aires',
    description: 'Clases de Pilates Reformer en Villa Crespo, Buenos Aires. Grupos reducidos, atención personalizada y un estudio boutique para cuidar tu cuerpo y bienestar.',
    keywords: [
      'Pilates Villa Crespo',
      'Pilates Reformer',
      'Pilates Buenos Aires',
      'clases de Pilates',
      'estudio de Pilates Villa Crespo',
      'Pilates grupos reducidos',
      'Reformer Buenos Aires'
    ]
  }
}

export function getWhatsAppUrl (message?: string) {
  const text = encodeURIComponent(
    message ?? `Hola, quiero consultar por una clase en ${business.name}.`
  )

  return `https://wa.me/${business.whatsapp}?text=${text}`
}
