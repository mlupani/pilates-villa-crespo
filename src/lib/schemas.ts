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
