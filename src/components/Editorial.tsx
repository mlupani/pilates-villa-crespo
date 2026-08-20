import { cn } from '@/lib/utils'

interface EditorialProps {
  eyebrow?: string
  title: string
  paragraphs: string[]
  tone?: 'cream' | 'paper'
}

export function Editorial ({
  eyebrow,
  title,
  paragraphs,
  tone = 'paper'
}: EditorialProps) {
  return (
    <section
      className={cn(
        'px-5 py-20 md:px-8 md:py-28',
        tone === 'paper' ? 'bg-paper' : 'bg-cream'
      )}
    >
      <div className='reveal mx-auto max-w-3xl'>
        {eyebrow
          ? (
            <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
              {eyebrow}
            </p>
            )
          : null}
        <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
          {title}
        </h2>
        <div className='mt-8 space-y-5'>
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className='text-base leading-relaxed text-stone md:text-lg'>
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </section>
  )
}
