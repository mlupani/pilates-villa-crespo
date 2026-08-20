import { formatTime } from '@/lib/utils'
import type { AssistantMessage } from '@/lib/assistant'

interface ChatMessageProps {
  message: AssistantMessage
}

function AssistantContent ({ content }: { content: string }) {
  const segments = content.split(/(\*\*[^*\n]+\*\*)/g)

  return segments.map((segment, index) => {
    const bold = /^\*\*([^*\n]+)\*\*$/.exec(segment)
    if (bold) {
      return (
        <strong key={index} className='font-semibold'>
          {bold[1]}
        </strong>
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
