import { business } from '@/content/business'

export type Intent =
  | 'horarios'
  | 'precios'
  | 'clases'
  | 'ubicacion'
  | 'primera-vez'
  | 'reserva'
  | 'fallback'

export interface AssistantCta {
  label: string
  action: Intent | 'whatsapp' | 'scroll-clases' | 'scroll-espacio' | 'scroll-horarios' | 'scroll-ubicacion'
}

export interface AssistantReply {
  text: string
  cta?: AssistantCta
  form?: 'reserva' | 'lead'
  quickReplies?: string[]
}

function normalize (value: string) {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[¿?¡!.,]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
}

const intentKeywords: Record<Exclude<Intent, 'fallback'>, string[]> = {
  reserva: [
    'reserv',
    'anotar',
    'anotarme',
    'inscrib',
    'agendar',
    'turno',
    'quiero ir',
    'probar una',
    'quiero una clase',
    'quiero empezar',
    'quiero comenzar'
  ],
  precios: [
    'precio',
    'cuesta',
    'sale',
    'vale',
    'plan',
    'valor',
    'cuanto',
    'costo',
    'pago',
    'abono',
    'tarifa'
  ],
  horarios: [
    'horario',
    'hora',
    'cuando',
    'disponib',
    'a que hora',
    'que dias'
  ],
  ubicacion: [
    'donde',
    'ubic',
    'direccion',
    'llegar',
    'villa crespo',
    'mapa',
    'estan',
    'queda'
  ],
  'primera-vez': [
    'nunca',
    'nueva',
    'nuevo',
    'primera vez',
    'experiencia',
    'principiante',
    'no hice',
    'soy nueva',
    'primera clase'
  ],
  clases: [
    'clase',
    'pilates',
    'reformer',
    'mat',
    'tipo',
    'modalidad',
    'que hacen'
  ]
}

const quickReplyIntents: Record<string, Intent> = {
  'ver horarios': 'horarios',
  'consultar precios': 'precios',
  'conocer las clases': 'clases',
  'ver las clases': 'clases',
  '¿dónde están?': 'ubicacion',
  'donde estan': 'ubicacion',
  'quiero reservar': 'reserva',
  'reservar una clase de prueba': 'reserva'
}

export function detectIntent (input: string): Intent {
  const quick = quickReplyIntents[normalize(input)]
  if (quick) return quick

  const text = normalize(input)
  const order: Array<Exclude<Intent, 'fallback'>> = [
    'reserva',
    'precios',
    'horarios',
    'ubicacion',
    'primera-vez',
    'clases'
  ]

  for (const intent of order) {
    if (intentKeywords[intent].some((keyword) => text.includes(keyword))) {
      return intent
    }
  }

  return 'fallback'
}

export function getAssistantReply (input: string): AssistantReply {
  const intent = detectIntent(input)

  switch (intent) {
    case 'horarios':
      return {
        text: `Tenemos horarios de lunes a sábado. Para encontrar el que mejor se adapte a vos, puedo ayudarte a consultar disponibilidad 😊\n\n${business.schedule.map((slot) => `• ${slot.day}: ${slot.hours}`).join('\n')}`,
        cta: { label: 'Ver horarios', action: 'scroll-horarios' },
        form: 'lead'
      }
    case 'precios':
      return {
        text: 'Los planes dependen de la cantidad de clases por semana. Si querés, te ayudo a encontrar la opción que mejor se adapte a vos y a reservar una clase de prueba.',
        cta: { label: 'Consultar planes', action: 'whatsapp' },
        form: 'lead'
      }
    case 'clases':
      return {
        text: 'Trabajamos con clases de Pilates orientadas a fuerza, movilidad, postura y bienestar. No necesitás experiencia previa.\n\n• Pilates Reformer — todos los niveles\n• Pilates Mat — ideal para comenzar\n• Pilates Personalizado — objetivos específicos',
        cta: { label: 'Ver las clases', action: 'scroll-clases' }
      }
    case 'ubicacion':
      return {
        text: `Estamos en ${business.local.streetAddress}, ${business.local.neighborhood}, ${business.local.city} (${business.local.postalCode}) 📍\n\nA pasos de Av. Warnes y Av. Honorio Pueyrredón.`,
        cta: { label: 'Ver ubicación', action: 'scroll-ubicacion' }
      }
    case 'primera-vez':
      return {
        text: '¡No hay problema! 😊 No necesitás experiencia previa. Las clases son para todos los niveles y te acompañamos desde la primera visita.',
        cta: { label: 'Reservar una clase de prueba', action: 'reserva' }
      }
    case 'reserva':
      return {
        text: '¡Genial! Para reservar tu clase de prueba necesito algunos datos.',
        form: 'reserva'
      }
    default:
      return {
        text: 'Puedo ayudarte con horarios, precios, clases, ubicación o una reserva. ¿Qué te gustaría saber?',
        quickReplies: [
          'Ver horarios',
          'Consultar precios',
          'Ver las clases',
          '¿Dónde están?',
          'Reservar una clase de prueba'
        ]
      }
  }
}

export const welcomeMessage = 'Hola 👋 Soy el asistente de Pilates Villa Crespo. ¿Querés reservar una clase de prueba o consultar horarios?'

export const quickReplies = [
  'Ver horarios',
  'Consultar precios',
  'Ver las clases',
  '¿Dónde están?',
  'Reservar una clase de prueba'
]

export const successReservationMessage =
  '¡Perfecto! Recibimos tu consulta. Te contactaremos por WhatsApp para confirmar disponibilidad.'

export const successLeadMessage =
  '¡Gracias! Recibimos tus datos. Te vamos a escribir por WhatsApp para seguir con tu consulta.'
