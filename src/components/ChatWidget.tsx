'use client'

import { useEffect, useRef, useState } from 'react'
import { Send, Sparkles, X } from 'lucide-react'
import { ChatMessage, type ChatMessageItem } from '@/components/ChatMessage'
import { LeadForm } from '@/components/LeadForm'
import { Logo } from '@/components/Logo'
import { QuickReplies } from '@/components/QuickReplies'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { business } from '@/content/business'
import { getWhatsAppUrl } from '@/lib/local'
import { analyticsEvents } from '@/lib/analytics'
import { track } from '@/lib/track'
import {
  getAssistantReply,
  quickReplies,
  successLeadMessage,
  successReservationMessage,
  welcomeMessage,
  type AssistantCta
} from '@/lib/assistant'
import { cn } from '@/lib/utils'

function createId () {
  return `${Date.now()}-${Math.random().toString(16).slice(2)}`
}

function delay () {
  return 500 + Math.floor(Math.random() * 300)
}

const welcome: ChatMessageItem = {
  id: 'welcome',
  role: 'assistant',
  content: welcomeMessage,
  timestamp: new Date(),
  quickReplies
}

export function ChatWidget () {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [typing, setTyping] = useState(false)
  const [messages, setMessages] = useState<ChatMessageItem[]>([welcome])
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const openSource = useRef<'fab' | 'hash' | 'link'>('fab')
  const hasInteracted = useRef(false)

  useEffect(() => {
    function openAssistant (source: 'hash' | 'link') {
      openSource.current = source
      setOpen(true)
    }

    function onHash () {
      if (window.location.hash === '#asistente') openAssistant('hash')
    }

    function onClick (event: MouseEvent) {
      const target = (event.target as HTMLElement).closest('a[href="#asistente"]')
      if (!target) return
      event.preventDefault()
      openAssistant('link')
    }

    onHash()
    window.addEventListener('hashchange', onHash)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('hashchange', onHash)
      document.removeEventListener('click', onClick)
    }
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, typing, open])

  useEffect(() => {
    if (open) inputRef.current?.focus()
  }, [open])

  useEffect(() => {
    if (!open) {
      hasInteracted.current = false
      return
    }

    track(analyticsEvents.assistantOpen, {
      funnel_step: 'conversion',
      source: openSource.current
    })
  }, [open])

  function pushAssistant (reply: ReturnType<typeof getAssistantReply>) {
    setTyping(true)
    window.setTimeout(() => {
      setMessages((current) => [
        ...current,
        {
          id: createId(),
          role: 'assistant',
          content: reply.text,
          timestamp: new Date(),
          cta: reply.cta,
          form: reply.form,
          quickReplies: reply.quickReplies
        }
      ])
      setTyping(false)
    }, delay())
  }

  function sendText (text: string) {
    const value = text.trim()
    if (!value || typing) return

    setMessages((current) => [
      ...current,
      {
        id: createId(),
        role: 'user',
        content: value,
        timestamp: new Date()
      }
    ])
    setInput('')
    if (!hasInteracted.current) {
      hasInteracted.current = true
      track(analyticsEvents.assistantInteract, {
        funnel_step: 'conversion',
        interaction_type: 'message',
        source: openSource.current
      })
    }
    pushAssistant(getAssistantReply(value))
  }

  function handleCta (cta: AssistantCta) {
    if (cta.action === 'whatsapp') {
      track(analyticsEvents.clickWhatsapp, {
        funnel_step: 'conversion',
        contact_method: 'whatsapp',
        source: 'assistant'
      })
      const url = getWhatsAppUrl()
      if (url) window.location.href = url
      return
    }
    if (cta.action === 'scroll-clases') {
      setOpen(false)
      document.getElementById('clases')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (cta.action === 'scroll-espacio') {
      setOpen(false)
      document.getElementById('espacio')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (cta.action === 'scroll-horarios') {
      track(analyticsEvents.clickVerHorarios, {
        funnel_step: 'interes',
        source: 'assistant'
      })
      setOpen(false)
      document.getElementById('horarios')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (cta.action === 'scroll-ubicacion') {
      setOpen(false)
      document.getElementById('ubicacion')?.scrollIntoView({ behavior: 'smooth' })
      return
    }
    if (cta.action === 'reserva') {
      if (!hasInteracted.current) {
        hasInteracted.current = true
        track(analyticsEvents.assistantInteract, {
          funnel_step: 'conversion',
          interaction_type: 'cta',
          source: openSource.current
        })
      }
      pushAssistant(getAssistantReply('Quiero reservar'))
    }
  }

  const last = messages[messages.length - 1]

  return (
    <>
      {open
        ? (
          <section
            className='chat-panel pointer-events-auto fixed top-3 right-3 left-3 z-50 flex h-[calc(100svh-1.5rem)] flex-col overflow-hidden rounded-[1.6rem] border border-line bg-cream shadow-[0_24px_80px_rgba(31,27,24,0.18)] md:inset-auto md:top-auto md:right-6 md:bottom-24 md:left-auto md:h-[600px] md:w-[380px]'
            aria-label='Asistente de Pilates Villa Crespo'
          >
            <header className='flex items-center justify-between border-b border-line bg-paper px-4 py-3'>
              <div className='flex items-center gap-2.5'>
                <span className='size-10 shrink-0 overflow-hidden'>
                  <Logo className='size-full' />
                </span>
                <div>
                  <p className='font-display text-lg leading-tight font-semibold text-ink'>
                    {business.name}
                  </p>
                  <p className='text-xs text-olive'>
                    <span className='mr-1 inline-block size-1.5 rounded-full bg-olive' />
                    En línea
                  </p>
                </div>
              </div>
              <button
                type='button'
                className='inline-flex size-8 items-center justify-center rounded-full text-stone hover:bg-sand'
                aria-label='Cerrar chat'
                onClick={() => setOpen(false)}
              >
                <X size={16} />
              </button>
            </header>

            <div className='flex-1 space-y-4 overflow-y-auto px-4 py-4'>
              {messages.map((message) => (
                <div key={message.id}>
                  <ChatMessage message={message} onCta={handleCta} />
                  {message.form
                    ? (
                      <LeadForm
                        variant={message.form}
                        onSubmit={() => {
                          pushAssistant({
                            text: message.form === 'reserva'
                              ? successReservationMessage
                              : successLeadMessage
                          })
                        }}
                      />
                      )
                    : null}
                </div>
              ))}

              {last?.quickReplies
                ? (
                  <QuickReplies
                    replies={last.quickReplies}
                    onSelect={sendText}
                  />
                  )
                : null}

              {typing
                ? (
                  <div className='flex w-fit gap-1 rounded-2xl bg-sand/70 px-3 py-2'>
                    <span className='typing-dot size-1.5 rounded-full bg-stone' />
                    <span className='typing-dot size-1.5 rounded-full bg-stone' />
                    <span className='typing-dot size-1.5 rounded-full bg-stone' />
                  </div>
                  )
                : null}
              <div ref={bottomRef} />
            </div>

            <form
              className='border-t border-line bg-paper p-3'
              onSubmit={(event) => {
                event.preventDefault()
                sendText(input)
              }}
            >
              <div className='flex items-center gap-2 rounded-full border border-line bg-cream px-3'>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(event) => setInput(event.target.value)}
                  placeholder='Escribí tu consulta...'
                  className='h-11 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-stone/60'
                />
                <button
                  type='submit'
                  className='inline-flex size-8 items-center justify-center rounded-full bg-clay text-paper transition-colors hover:bg-clay-dark'
                  aria-label='Enviar'
                >
                  <Send size={14} />
                </button>
              </div>
            </form>
          </section>
          )
        : null}

      <div
        id='asistente'
        className={cn(
          'fab-dock pointer-events-auto flex flex-col items-end gap-3',
          open && 'max-md:hidden'
        )}
      >
        {!open
          ? (
            <p className='rounded-full bg-paper px-3 py-2 text-xs font-medium text-ink shadow-[0_8px_24px_rgba(31,27,24,0.1)]'>
              ¿Reservamos tu clase de prueba?
            </p>
            )
          : null}
        <div className='flex items-center gap-3'>
          <WhatsAppButton />
          <button
            type='button'
            className='inline-flex size-14 items-center justify-center rounded-full bg-clay text-paper shadow-[0_12px_30px_rgba(154,98,72,0.35)] transition-transform duration-300 [@media(hover:hover)]:hover:-translate-y-0.5'
            aria-label={open ? 'Cerrar asistente' : 'Abrir asistente'}
            onClick={() => {
              if (!open) openSource.current = 'fab'
              setOpen((value) => !value)
            }}
          >
            {open ? <X size={22} /> : <Sparkles size={22} />}
          </button>
        </div>
      </div>
    </>
  )
}
