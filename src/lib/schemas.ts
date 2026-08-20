import { z } from 'zod'

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Ingresá tu nombre'),
  whatsapp: z.string().trim().min(8, 'Ingresá un WhatsApp válido'),
  message: z.string().trim().optional()
})

export const reservationSchema = z.object({
  name: z.string().trim().min(2, 'Ingresá tu nombre'),
  whatsapp: z.string().trim().min(8, 'Ingresá un WhatsApp válido'),
  day: z.string().trim().min(1, 'Elegí un día'),
  time: z.string().trim().min(1, 'Elegí un horario')
})

export type LeadFormValues = z.infer<typeof leadSchema>
export type ReservationFormValues = z.infer<typeof reservationSchema>

export const leadCaptureSchema = z.object({
  variant: z.enum(['lead', 'reserva']),
  name: z.string().trim().min(2),
  whatsapp: z.string().trim().min(8),
  message: z.string().trim().optional(),
  day: z.string().trim().optional(),
  time: z.string().trim().optional(),
  page_path: z.string().trim().min(1),
  occurred_at: z.string().trim().min(1)
})

export type LeadCaptureInput = z.infer<typeof leadCaptureSchema>

export const assistantClientRequestSchema = z.object({
  message: z.string().trim().min(1).max(4000),
  source: z.literal('website'),
  conversationId: z.string().trim().min(1).optional()
})

export const assistantResponseSchema = z.object({
  conversationId: z.string().trim().min(1),
  message: z.string().min(1),
  status: z.string().optional()
})

export const persistedAssistantSchema = z.object({
  conversationId: z.string().trim().min(1).nullable(),
  messages: z.array(z.object({
    id: z.string().min(1),
    role: z.enum(['user', 'assistant']),
    content: z.string().min(1),
    timestamp: z.string().min(1)
  })).min(1)
})

export type AssistantClientRequest = z.infer<typeof assistantClientRequestSchema>
export type AssistantResponse = z.infer<typeof assistantResponseSchema>
