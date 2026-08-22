import { cn } from '@/lib/utils'

interface TrustChipsProps {
  items: string[]
  tone?: 'light' | 'dark'
  className?: string
}

export function TrustChips ({ items, tone = 'dark', className }: TrustChipsProps) {
  return (
    <ul className={cn('flex flex-wrap gap-2', className)}>
      {items.map((item) => (
        <li
          key={item}
          className={cn(
            'rounded-full border px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.14em]',
            tone === 'light'
              ? 'border-paper/35 bg-ink/25 text-paper backdrop-blur-sm'
              : 'border-line bg-paper/70 text-stone'
          )}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}
