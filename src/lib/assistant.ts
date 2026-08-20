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
  action: Intent | 'whatsapp' | 'scroll-clases' | 'scroll-espacio'
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
  '¿dónde están?': 'ubicacion',
  'donde estan': 'ubicacion',
  'quiero reservar': 'reserva'
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
        text: `Tenemos diferentes horarios durante la semana. Para encontrar el que mejor se adapte a vos, puedo ayudarte a consultar disponibilidad 😊\n\n${business.schedule.map((slot) => `• ${slot.day}: ${slot.hours}`).join('\n')}`,
        cta: { label: 'Consultar horarios', action: 'whatsapp' },
        form: 'lead'
      }
    case 'precios':
      return {
        text: 'Los planes dependen de la cantidad de clases por semana. Si querés, puedo ayudarte a encontrar la opción que mejor se adapte a vos.',
        cta: { label: 'Consultar planes', action: 'whatsapp' },
        form: 'lead'
      }
    case 'clases':
      return {
        text: 'Trabajamos con clases de Pilates orientadas a fuerza, movilidad, postura y bienestar. También podemos orientarte según tu experiencia y objetivos.\n\n• Pilates Reformer\n• Pilates Mat\n• Pilates Personalizado',
        cta: { label: 'Conocer las clases', action: 'scroll-clases' }
      }
    case 'ubicacion':
      return {
        text: `Estamos en ${business.address} 📍`,
        cta: { label: 'Ver ubicación', action: 'scroll-espacio' }
      }
    case 'primera-vez':
      return {
        text: '¡No hay problema! 😊 No necesitás experiencia previa. Podemos orientarte para encontrar una clase adecuada para comenzar.',
        cta: { label: 'Quiero empezar', action: 'reserva' }
      }
    case 'reserva':
      return {
        text: '¡Genial! Para ayudarte con la reserva necesito algunos datos.',
        form: 'reserva'
      }
    default:
      return {
        text: 'Puedo ayudarte con horarios, precios, clases, ubicación o una reserva. ¿Qué te gustaría saber?',
        quickReplies: [
          'Ver horarios',
          'Consultar precios',
          'Conocer las clases',
          '¿Dónde están?',
          'Quiero reservar'
        ]
      }
  }
}

export const welcomeMessage = 'Hola 👋 Soy el asistente de Pilates Villa Crespo. ¿En qué puedo ayudarte?'

export const quickReplies = [
  'Ver horarios',
  'Consultar precios',
  'Conocer las clases',
  '¿Dónde están?',
  'Quiero reservar'
]

export const successReservationMessage =
  '¡Perfecto! Recibimos tu consulta. Te contactaremos por WhatsApp para confirmar disponibilidad.'

export const successLeadMessage =
  '¡Gracias! Recibimos tus datos. Te vamos a escribir por WhatsApp para seguir con tu consulta.'
