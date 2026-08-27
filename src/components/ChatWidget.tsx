'use client'

import { useEffect, useRef, useState } from 'react'
import { QueryClient, QueryClientProvider, useMutation } from '@tanstack/react-query'
import { Send, Sparkles, X } from 'lucide-react'
import { ChatMessage } from '@/components/ChatMessage'
import { Logo } from '@/components/Logo'
import { QuickReplies } from '@/components/QuickReplies'
import { InstagramButton } from '@/components/InstagramButton'
import { WhatsAppButton } from '@/components/WhatsAppButton'
import { business } from '@/content/business'
import { analyticsEvents } from '@/lib/analytics'
import { checkAssistantAvailability, sendAssistantMessage } from '@/lib/assistant-client'
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
  const [availability, setAvailability] = useState<'checking' | 'available' | 'unavailable'>('checking')
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const panelRef = useRef<HTMLElement>(null)
  const scrollContainerRef = useRef<HTMLDivElement>(null)
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
    checkAssistantAvailability()
      .then((ok) => {
        if (!cancelled) setAvailability(ok ? 'available' : 'unavailable')
      })
      .catch(() => {
        if (!cancelled) setAvailability('unavailable')
      })
    return () => {
      cancelled = true
    }
  }, [])

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
    if (availability !== 'available') return

    function openAssistant (source: 'fab' | 'hash' | 'link', intent?: string | null) {
      if (availability !== 'available') return
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
  }, [hydrated, availability])

  useEffect(() => {
    if (!open) return
    // Scroll only the internal container, never the page — avoids pushing fixed panel with keyboard
    const container = scrollContainerRef.current
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' })
    } else {
      bottomRef.current?.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [messages, sendMessage.isPending, open, error])

  useEffect(() => {
    if (open) {
      // preventScroll avoids the browser trying to scroll the fixed panel into view when keyboard opens
      try {
        inputRef.current?.focus({ preventScroll: true })
      } catch {
        inputRef.current?.focus()
      }
    }
  }, [open])

  // Mobile keyboard fix: keep panel anchored to visual viewport instead of shifting upward
  useEffect(() => {
    if (!open) return
    const vv = window.visualViewport
    if (!vv) return
    const panel = panelRef.current
    if (!panel) return

    // Only apply on mobile (panel is fullscreen-ish)
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (!isMobile) return

    let raf = 0
    function syncViewport () {
      const viewport = window.visualViewport
      const el = panelRef.current
      if (!viewport || !el) return
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        // viewport.height is the visible area above the keyboard when resizes-content / dvh is active
        const topInset = 12 // 0.75rem = top-3
        const bottomInset = 12
        const available = viewport.height - topInset - bottomInset
        // Clamp to positive and keep max-height as dvh fallback
        if (available > 200) {
          el.style.height = `${available}px`
          el.style.maxHeight = `${available}px`
          // Keep panel visually at top of visual viewport if browser uses overlay keyboard
          const offsetTop = viewport.offsetTop || 0
          el.style.top = `${offsetTop + topInset}px`
          el.style.bottom = 'auto'
        }
      })
    }

    syncViewport()
    vv.addEventListener('resize', syncViewport)
    vv.addEventListener('scroll', syncViewport)
    window.addEventListener('orientationchange', syncViewport)

    return () => {
      cancelAnimationFrame(raf)
      vv.removeEventListener('resize', syncViewport)
      vv.removeEventListener('scroll', syncViewport)
      window.removeEventListener('orientationchange', syncViewport)
      const el = panelRef.current
      if (el) {
        el.style.height = ''
        el.style.maxHeight = ''
        el.style.top = ''
        el.style.bottom = ''
      }
    }
  }, [open])

  // Lock background scroll on mobile when assistant is open (prevents body scroll + rubber-band shifting)
  useEffect(() => {
    if (!open) return
    const isMobile = window.matchMedia('(max-width: 767px)').matches
    if (!isMobile) return
    const prevOverflow = document.body.style.overflow
    const prevOverscroll = document.documentElement.style.overscrollBehavior
    document.body.style.overflow = 'hidden'
    document.documentElement.style.overscrollBehavior = 'none'
    return () => {
      document.body.style.overflow = prevOverflow
      document.documentElement.style.overscrollBehavior = prevOverscroll
    }
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

  const isAssistantAvailable = availability === 'available'

  return (
    <>
      {isAssistantAvailable && open
        ? (
          <section
            ref={panelRef}
            className='chat-panel pointer-events-auto fixed inset-x-3 top-3 bottom-3 z-50 flex h-auto max-h-[calc(100dvh-1.5rem)] flex-col overflow-hidden rounded-[1.6rem] border border-line bg-cream shadow-[0_24px_80px_rgba(31,27,24,0.18)] md:inset-auto md:top-auto md:right-6 md:bottom-24 md:left-auto md:h-[600px] md:max-h-[min(600px,calc(100dvh-8rem))] md:w-[380px]'
            aria-label='Asistente de Pilates Villa Crespo'
            aria-busy={pending}
          >
            <header className='flex shrink-0 items-center justify-between border-b border-line bg-paper px-4 py-3'>
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

            <div ref={scrollContainerRef} className='flex-1 space-y-4 overflow-y-auto overscroll-contain px-4 py-4 [scrollbar-gutter:stable]'>
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
              className='shrink-0 border-t border-line bg-paper p-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]'
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
                  onFocus={() => {
                    // Ensure viewport sync runs after keyboard animation starts
                    requestAnimationFrame(() => {
                      scrollContainerRef.current?.scrollTo({
                        top: scrollContainerRef.current.scrollHeight,
                        behavior: 'smooth'
                      })
                    })
                  }}
                  placeholder={pending ? 'Esperando respuesta...' : 'Escribí tu consulta...'}
                  disabled={pending}
                  maxLength={4000}
                  enterKeyHint='send'
                  autoComplete='off'
                  autoCorrect='off'
                  spellCheck={false}
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

      {/* Mobile: Instagram fixed bottom-left to avoid overloading right side */}
      <div
        className={cn(
          'pointer-events-auto fixed bottom-[max(1rem,env(safe-area-inset-bottom,0px))] left-[max(1rem,env(safe-area-inset-left,0px))] z-50 md:hidden',
          isAssistantAvailable && open && 'max-md:hidden'
        )}
        aria-hidden={isAssistantAvailable && open ? true : undefined}
      >
        <InstagramButton />
      </div>

      <div
        id='asistente'
        className={cn(
          'fab-dock pointer-events-auto flex flex-col items-end gap-3',
          isAssistantAvailable && open && 'max-md:hidden'
        )}
      >
        {isAssistantAvailable && !open
          ? (
            <p className='rounded-full bg-paper px-3 py-2 text-xs font-medium text-ink shadow-[0_8px_24px_rgba(31,27,24,0.1)]'>
              ¿Probamos una clase sin cargo?
            </p>
            )
          : null}
        <div className='flex items-center gap-3'>
          {/* Desktop: Instagram left of WhatsApp */}
          <span className='hidden md:inline-flex'>
            <InstagramButton />
          </span>
          <WhatsAppButton />
          {isAssistantAvailable
            ? (
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
              )
            : null}
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
