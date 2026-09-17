import { formatTime } from '@/lib/utils'
import { business } from '@/content/business'
import { WhatsAppIcon } from '@/components/WhatsAppButton'
import type { AssistantMessage } from '@/lib/assistant'

interface ChatMessageProps {
  message: AssistantMessage
}

const WA_LINK_RE = /https?:\/\/(?:www\.)?wa\.me\/\S+/

function AssistantContent ({ content }: { content: string }) {
  const segments = content.split(/(\*\*[^*\n]+\*\*|https?:\/\/(?:www\.)?wa\.me\/\S+)/g)

  return segments.map((segment, index) => {
    const bold = /^\*\*([^*\n]+)\*\*$/.exec(segment)
    if (bold) {
      return (
        <strong key={index} className='font-semibold'>
          {bold[1]}
        </strong>
      )
    }

    if (WA_LINK_RE.test(segment)) {
      const trailing = /[.,;:!?)]+$/.exec(segment)?.[0] ?? ''
      const href = trailing ? segment.slice(0, -trailing.length) : segment
      return (
        <span key={index} className='mt-2 mb-1 block'>
          <a
            href={href}
            className='inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 text-xs font-semibold text-white shadow-[0_8px_20px_rgba(37,211,102,0.35)] transition-transform duration-300 [@media(hover:hover)]:hover:-translate-y-0.5'
          >
            <WhatsAppIcon className='size-4' />
            {business.cta.whatsapp}
          </a>
          {trailing}
        </span>
      )
    }

    return <span key={index}>{segment}</span>
  })
}

export function ChatMessage ({ message }: ChatMessageProps) {
  const isUser = message.role === 'user'

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
          {isUser
            ? message.content
            : <AssistantContent content={message.content} />}
        </div>
        <time className='px-1 text-[10px] text-stone/80' dateTime={message.timestamp}>
          {formatTime(new Date(message.timestamp))}
        </time>
      </div>
    </article>
  )
}
