import Image from 'next/image'
import { SmartLink } from '@/components/SmartLink'
import { TrustChips } from '@/components/TrustChips'
import type { AssistantIntent } from '@/lib/assistant'

interface PageHeroLink {
  href: string
  label: string
  intent?: AssistantIntent
}

interface PageHeroImage {
  src: string
  alt: string
}

interface PageHeroProps {
  eyebrow: string
  title: string
  description: string
  primary: PageHeroLink
  secondary?: PageHeroLink
  image?: PageHeroImage
  chips?: string[]
}

export function PageHero ({
  eyebrow,
  title,
  description,
  primary,
  secondary,
  image,
  chips
}: PageHeroProps) {
  return (
    <section className='bg-cream px-5 pb-16 pt-10 md:px-8 md:pb-24 md:pt-16'>
      <div className='mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]'>
        <div className='hero-enter'>
          <p className='font-display text-sm font-semibold uppercase tracking-[0.28em] text-olive'>
            {eyebrow}
          </p>
          <h1 className='mt-4 max-w-3xl font-display text-4xl font-bold leading-[1.08] text-ink sm:text-5xl md:text-6xl'>
            {title}
          </h1>
          <p className='mt-5 max-w-xl text-base leading-relaxed text-stone md:text-lg'>
            {description}
          </p>
          {chips && chips.length > 0
            ? (
              <TrustChips items={chips} className='mt-6' />
              )
            : null}
          <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
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

        {image
          ? (
            <div className='hero-enter-delay img-ken relative aspect-[4/5] overflow-hidden rounded-[1.8rem] lg:aspect-[5/6]'>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority
                sizes='(max-width: 1024px) 92vw, 40vw'
                quality={75}
                className='object-cover object-[center_28%]'
              />
              <div className='absolute inset-0 bg-gradient-to-t from-ink/35 via-transparent to-ink/10' />
            </div>
            )
          : null}
      </div>
    </section>
  )
}
