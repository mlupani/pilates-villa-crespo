'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { SmartLink } from '@/components/SmartLink'
import { business, type FaqItem } from '@/content/business'
import { routes } from '@/lib/routes'
import { cn } from '@/lib/utils'

interface FaqProps {
  items?: FaqItem[]
  description?: string
  ctaHref?: string
  ctaLabel?: string
}

export function Faq ({
  items = business.faq,
  description = 'Si es tu primera vez, no hace falta experiencia. Reservá una clase de prueba y te orientamos en todo.',
  ctaHref = routes.trial,
  ctaLabel = business.cta.trial
}: FaqProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id='faq' className='bg-cream px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto grid max-w-6xl gap-10 lg:grid-cols-[0.8fr_1.2fr]'>
        <div className='reveal lg:sticky lg:top-28 lg:self-start'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            Preguntas
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            Preguntas frecuentes
          </h2>
          <p className='mt-5 max-w-sm text-sm leading-relaxed text-stone'>
            {description}
          </p>
          <SmartLink href={ctaHref} className='btn-primary mt-8 hidden lg:inline-flex'>
            {ctaLabel}
          </SmartLink>
        </div>

        <div className='reveal divide-y divide-line border-y border-line'>
          {items.map((item, index) => {
            const open = openIndex === index

            return (
              <div key={item.question}>
                <button
                  type='button'
                  className='flex w-full items-center justify-between gap-6 py-5 text-left'
                  aria-expanded={open}
                  onClick={() => setOpenIndex(open ? null : index)}
                >
                  <span className='font-display text-xl font-medium text-ink md:text-2xl'>
                    {item.question}
                  </span>
                  <Plus
                    className={cn(
                      'size-5 shrink-0 text-clay transition-transform duration-300',
                      open && 'rotate-45'
                    )}
                  />
                </button>
                <div
                  className={cn(
                    'grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]',
                    open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'
                  )}
                >
                  <p className='overflow-hidden text-sm leading-relaxed text-stone'>
                    <span className='block pb-5'>{item.answer}</span>
                  </p>
                </div>
              </div>
            )
          })}
        </div>
        <div className='reveal mt-8 lg:hidden'>
          <SmartLink href={ctaHref} className='btn-primary w-full'>
            {ctaLabel}
          </SmartLink>
        </div>
      </div>
    </section>
  )
}
