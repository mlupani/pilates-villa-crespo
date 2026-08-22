import { SmartLink } from '@/components/SmartLink'
import type { AssistantIntent } from '@/lib/assistant'

interface SectionCtaLink {
  href: string
  label: string
  intent?: AssistantIntent
}

interface SectionCtaProps {
  title: string
  description?: string
  primary: SectionCtaLink
  secondary?: SectionCtaLink
}

export function SectionCta ({ title, description, primary, secondary }: SectionCtaProps) {
  return (
    <div className='reveal mt-12 flex flex-col items-start gap-5 rounded-[1.6rem] border border-line bg-sand/40 px-6 py-8 md:mt-16 md:flex-row md:items-center md:justify-between md:px-8'>
      <div className='max-w-xl'>
        <p className='font-display text-2xl font-medium text-ink md:text-3xl'>
          {title}
        </p>
        {description
          ? (
            <p className='mt-2 text-sm leading-relaxed text-stone'>
              {description}
            </p>
            )
          : null}
      </div>
      <div className='flex flex-wrap gap-3'>
        <SmartLink href={primary.href} intent={primary.intent} className='btn-primary'>
          {primary.label}
        </SmartLink>
        {secondary
          ? (
            <SmartLink href={secondary.href} intent={secondary.intent} className='btn-outline'>
              {secondary.label}
            </SmartLink>
            )
          : null}
      </div>
    </div>
  )
}
