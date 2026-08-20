import { formatTime } from '@/lib/utils'
import type { AssistantCta } from '@/lib/assistant'
import { getWhatsAppUrl } from '@/lib/local'

export interface ChatMessageItem {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
  cta?: AssistantCta
  form?: 'reserva' | 'lead'
  quickReplies?: string[]
}

interface ChatMessageProps {
  message: ChatMessageItem
  onCta?: (cta: AssistantCta) => void
}

export function ChatMessage ({ message, onCta }: ChatMessageProps) {
  const isUser = message.role === 'user'
  const showCta = Boolean(
    message.cta &&
    !isUser &&
    (message.cta.action !== 'whatsapp' || getWhatsAppUrl())
  )

  return (
    <article className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div className={`max-w-[85%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div
          className={
            isUser
              ? 'rounded-2xl rounded-br-md bg-clay px-4 py-3 text-sm leading-relaxed text-paper'
              : 'rounded-2xl rounded-bl-md bg-sand/70 px-4 py-3 text-sm leading-relaxed whitespace-pre-line text-ink'
          }
        >
          {message.content}
        </div>
        {showCta
          ? (
            <button
              type='button'
              className='mt-1 rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-semibold text-clay transition-colors hover:bg-sand'
              onClick={() => onCta?.(message.cta!)}
            >
              {message.cta!.label}
            </button>
            )
          : null}
        <time className='px-1 text-[10px] text-stone/80'>
          {formatTime(message.timestamp)}
        </time>
      </div>
    </article>
  )
}
