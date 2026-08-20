export interface AssistantMessage {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

export const STORAGE_KEY = 'pilates-assistant:v1'
export const MAX_STORED_MESSAGES = 50

export const welcomeMessage =
  'Hola 👋 Soy el asistente de Pilates Villa Crespo. ¿Querés reservar una clase de prueba o consultar horarios?'

export const quickReplies = [
  'Ver horarios',
  'Consultar precios',
  'Ver las clases',
  '¿Dónde están?',
  'Reservar una clase de prueba'
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
