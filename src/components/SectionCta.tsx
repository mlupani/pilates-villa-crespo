import { SmartLink } from '@/components/SmartLink'

interface SectionCtaLink {
  href: string
  label: string
}

interface SectionCtaProps {
  title: string
  description?: string
  primary: SectionCtaLink
  secondary?: SectionCtaLink
}

export function SectionCta ({ title, description, primary, secondary }: SectionCtaProps) {
  return (
    <div className='reveal mt-12 flex flex-col items-start gap-5 border-t border-line pt-8 md:mt-16 md:flex-row md:items-center md:justify-between'>
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
        <SmartLink href={primary.href} className='btn-primary'>
          {primary.label}
        </SmartLink>
        {secondary
          ? (
            <SmartLink href={secondary.href} className='btn-outline'>
              {secondary.label}
            </SmartLink>
            )
          : null}
      </div>
    </div>
  )
}
