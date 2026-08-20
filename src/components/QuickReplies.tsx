interface QuickRepliesProps {
  replies: string[]
  onSelect: (reply: string) => void
}

export function QuickReplies ({ replies, onSelect }: QuickRepliesProps) {
  return (
    <div className='flex flex-wrap gap-2'>
      {replies.map((reply) => (
        <button
          key={reply}
          type='button'
          className='rounded-full border border-line bg-paper px-3 py-1.5 text-xs font-medium text-ink transition-colors duration-300 hover:border-clay/30 hover:bg-sand'
          onClick={() => onSelect(reply)}
        >
          {reply}
        </button>
      ))}
    </div>
  )
}
