'use client'

import { useState, type FormEvent } from 'react'
import { captureLead } from '@/lib/leads'
import { leadSchema, reservationSchema } from '@/lib/schemas'

interface LeadFormProps {
  variant: 'lead' | 'reserva'
  onSubmit: () => void
}

export function LeadForm ({ variant, onSubmit }: LeadFormProps) {
  const [name, setName] = useState('')
  const [whatsapp, setWhatsapp] = useState('')
  const [message, setMessage] = useState('')
  const [day, setDay] = useState('')
  const [time, setTime] = useState('')
  const [error, setError] = useState('')
  const [sent, setSent] = useState(false)

  function handleSubmit (event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    const result = variant === 'reserva'
      ? reservationSchema.safeParse({ name, whatsapp, day, time })
      : leadSchema.safeParse({ name, whatsapp, message })

    if (!result.success) {
      setError(result.error.issues[0]?.message ?? 'Revisá los datos')
      return
    }

    setError('')
    setSent(true)
    captureLead({
      variant,
      ...result.data,
      page_path: window.location.pathname,
      occurred_at: new Date().toISOString()
    })
    onSubmit()
  }

  if (sent) return null

  return (
    <form
      onSubmit={handleSubmit}
      className='mt-2 space-y-3 rounded-2xl border border-line bg-paper p-3'
    >
      <label className='block text-xs font-medium text-stone'>
        Nombre
        <input
          value={name}
          onChange={(event) => setName(event.target.value)}
          className='mt-1 w-full rounded-xl border border-line bg-cream px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-clay/40'
          autoComplete='name'
        />
      </label>
      <label className='block text-xs font-medium text-stone'>
        WhatsApp
        <input
          value={whatsapp}
          onChange={(event) => setWhatsapp(event.target.value)}
          className='mt-1 w-full rounded-xl border border-line bg-cream px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-clay/40'
          inputMode='tel'
          autoComplete='tel'
        />
      </label>
      {variant === 'reserva'
        ? (
          <>
            <label className='block text-xs font-medium text-stone'>
              Preferencia de día
              <select
                value={day}
                onChange={(event) => setDay(event.target.value)}
                className='mt-1 w-full rounded-xl border border-line bg-cream px-3 py-2 text-sm text-ink outline-none'
              >
                <option value=''>Elegí un día</option>
                <option>Lunes</option>
                <option>Martes</option>
                <option>Miércoles</option>
                <option>Jueves</option>
                <option>Viernes</option>
                <option>Sábado</option>
              </select>
            </label>
            <label className='block text-xs font-medium text-stone'>
              Preferencia de horario
              <select
                value={time}
                onChange={(event) => setTime(event.target.value)}
                className='mt-1 w-full rounded-xl border border-line bg-cream px-3 py-2 text-sm text-ink outline-none'
              >
                <option value=''>Elegí un horario</option>
                <option>Mañana</option>
                <option>Tarde</option>
                <option>8:00</option>
                <option>9:30</option>
                <option>18:00</option>
                <option>19:30</option>
              </select>
            </label>
          </>
          )
        : (
          <label className='block text-xs font-medium text-stone'>
            Mensaje opcional
            <textarea
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              rows={2}
              className='mt-1 w-full resize-none rounded-xl border border-line bg-cream px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-clay/40'
            />
          </label>
          )}
      {error ? <p className='text-xs text-clay'>{error}</p> : null}
      <button type='submit' className='btn-primary w-full py-2.5 text-xs'>
        {variant === 'reserva' ? 'Reservar clase de prueba' : 'Quiero que me contacten'}
      </button>
    </form>
  )
}
