'use client'

import { useEffect, useRef, useState } from 'react'
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { Send, Sparkles, X } from 'lucide-react'
import { ChatMessage } from '@/components/ChatMessage'
import { Logo } from '@/components/Logo'
import { QuickReplies } from '@/components/QuickReplies'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { business } from '@/content/business'
import { analyticsEvents } from '@/lib/analytics'
import { sendAssistantMessage } from '@/lib/assistant-client'
import { quickReplies } from '@/lib/assistant'
import { track } from '@/lib/track'
import { cn } from '@/lib/utils'
import { useAssistantStore } from '@/stores/assistant-store'

function createQueryClient () {
  return new QueryClient({
    defaultOptions: {
      mutations: { retry: 0 }
    }
  })
}

function ChatWidgetPanel () {
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [hydrated, setHydrated] = useState(false)
  const [error, setError] = useState('')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const openSource = useRef<'fab' | 'hash' | 'link'>('fab')
  const hasInteracted = useRef(false)

  const pendingIntent = useRef<string | null>(null)

  const messages = useAssistantStore((state) => state.messages)
  const addUserMessage = useAssistantStore((state) => state.addUserMessage)
  const addAssistantMessage = useAssistantStore((state) => state.addAssistantMessage)
  const setConversationId = useAssistantStore((state) => state.setConversationId)

  const sendMessage = useMutation({
    mutationFn: sendAssistantMessage,
    onSuccess: (data) => {
      setConversationId(data.conversationId)
      addAssistantMessage(data.message)
      setError('')
    },
    onError: () => {
      setError('No pudimos responder ahora. Probá de nuevo en un momento.')
    }
  })

  useEffect(() => {
    let cancelled = false

    async function hydrate () {
      try {
        await useAssistantStore.persist.rehydrate()
      } finally {
        if (!cancelled) setHydrated(true)
      }
    }

    hydrate().catch(() => undefined)

    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    if (!hydrated) return

    function openAssistant (source: 'fab' | 'hash' | 'link', intent?: string | null) {
      openSource.current = source
      if (intent?.trim()) pendingIntent.current = intent.trim()
      setOpen(true)
    }

    function onHash () {
      if (window.location.hash === '#asistente') openAssistant('hash')
    }

    function onClick (event: MouseEvent) {
      const target = (event.target as HTMLElement).closest('a[href="#asistente"]')
      if (!target) return
      event.preventDefault()
      openAssistant('link', target.getAttribute('data-intent'))
    }

    onHash()
    window.addEventListener('hashchange', onHash)
    document.addEventListener('click', onClick)
    return () => {
      window.removeEventListener('hashchange', onHash)
      document.removeEventListener('click', onClick)
    }
  }, [hydrated])

  useEffect(() => {
    if (!open) return
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, sendMessage.isPending, open, error])

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

  const pending = sendMessage.isPending
  const last = messages[messages.length - 1]
  const showQuickReplies = Boolean(last && last.role === 'assistant' && !pending)

  function sendText (text: string) {
    const value = text.trim()
    if (!value || sendMessage.isPending) return

    addUserMessage(value)
    setInput('')
    setError('')

    if (!hasInteracted.current) {
      hasInteracted.current = true
      track(analyticsEvents.assistantInteract, {
        funnel_step: 'conversion',
        interaction_type: 'message',
        source: openSource.current
      })
    }

    sendMessage.mutate({
      message: value,
      source: 'website',
      conversationId: useAssistantStore.getState().conversationId ?? undefined
    })
  }

  const sendTextRef = useRef(sendText)

  useEffect(() => {
    sendTextRef.current = sendText
  })

  useEffect(() => {
    if (!open || !hydrated) return
    const intent = pendingIntent.current
    if (!intent) return
    pendingIntent.current = null

    const lastUser = [...useAssistantStore.getState().messages]
      .reverse()
      .find((message) => message.role === 'user')
    if (lastUser?.content === intent) return

    sendTextRef.current(intent)
  }, [open, hydrated])

  return (
    <>
      {open
        ? (
          <section
            className='chat-panel pointer-events-auto fixed top-3 right-3 left-3 z-50 flex h-[calc(100svh-1.5rem)] flex-col overflow-hidden rounded-[1.6rem] border border-line bg-cream shadow-[0_24px_80px_rgba(31,27,24,0.18)] md:inset-auto md:top-auto md:right-6 md:bottom-24 md:left-auto md:h-[600px] md:w-[380px]'
            aria-label='Asistente de Pilates Villa Crespo'
            aria-busy={pending}
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
                <ChatMessage key={message.id} message={message} />
              ))}

              {showQuickReplies
                ? (
                  <QuickReplies
                    replies={quickReplies}
                    onSelect={sendText}
                  />
                  )
                : null}

              {pending
                ? (
                  <div className='flex w-fit gap-1 rounded-2xl bg-sand/70 px-3 py-2'>
                    <span className='typing-dot size-1.5 rounded-full bg-stone' />
                    <span className='typing-dot size-1.5 rounded-full bg-stone' />
                    <span className='typing-dot size-1.5 rounded-full bg-stone' />
                  </div>
                  )
                : null}

              {error
                ? (
                  <p className='rounded-2xl bg-clay/8 px-3 py-2 text-xs text-clay' role='alert'>
                    {error}
                  </p>
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
                  placeholder={pending ? 'Esperando respuesta...' : 'Escribí tu consulta...'}
                  disabled={pending}
                  maxLength={4000}
                  className='h-11 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-stone/60 disabled:opacity-70'
                />
                <button
                  type='submit'
                  disabled={pending || !input.trim()}
                  className='inline-flex size-8 items-center justify-center rounded-full bg-clay text-paper transition-colors hover:bg-clay-dark disabled:opacity-50'
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
              ¿Probamos una clase sin cargo?
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

export function ChatWidget () {
  const [queryClient] = useState(createQueryClient)

  return (
    <QueryClientProvider client={queryClient}>
      <ChatWidgetPanel />
    </QueryClientProvider>
  )
}
