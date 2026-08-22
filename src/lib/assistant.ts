export interface AssistantMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export const STORAGE_KEY = 'pilates-assistant:v1'
export const MAX_STORED_MESSAGES = 50

export const welcomeMessage =
  'Hola. Soy el asistente de Pilates Villa Crespo. Puedo ayudarte con la clase de prueba, horarios, planes o cómo llegar.'

export const assistantIntents = {
  trial: 'Hola, quiero consultar por una clase de prueba.',
  availability: 'Hola, quiero consultar disponibilidad para una clase.',
  plan: 'Hola, no sé qué plan elegir y necesito orientación.',
  start: 'Hola, quiero probar una clase. Contame un poco sobre mí y ayúdenme a encontrar una opción.',
  location: 'Hola, quiero consultar cómo llegar al estudio.'
} as const

export type AssistantIntent = keyof typeof assistantIntents

export const quickReplies = [
  'Quiero probar una clase',
  'Consultar disponibilidad',
  'Ayudame a elegir un plan',
  '¿Dónde están?'
]

export function createWelcomeMessage (): AssistantMessage {
  return {
    id: 'welcome',
    role: 'assistant',
    content: welcomeMessage,
    timestamp: new Date().toISOString()
  }
}

export function createMessage (
  role: AssistantMessage['role'],
  content: string
): AssistantMessage {
  return {
    id: crypto.randomUUID(),
    role,
    content,
    timestamp: new Date().toISOString()
  }
}
