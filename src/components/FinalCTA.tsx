import Image from 'next/image'
import { SmartLink } from '@/components/SmartLink'
import { business } from '@/content/business'
import { images } from '@/content/images'
import { getWhatsAppUrl } from '@/lib/local'
import { routes } from '@/lib/routes'

interface FinalCTAProps {
  title?: string
  description?: string
  primaryHref?: string
  primaryLabel?: string
}

export function FinalCTA ({
  title = 'Reservá tu clase de prueba en Villa Crespo',
  description = 'Sin experiencia previa. Te confirmamos horario y disponibilidad. El estudio está en Batalla del Pari 484.',
  primaryHref = routes.trial,
  primaryLabel = business.cta.trial
}: FinalCTAProps) {
  const whatsappUrl = getWhatsAppUrl()

  return (
    <section id='reservar' className='relative overflow-hidden px-5 py-24 md:px-8 md:py-32'>
      <Image
        src={images.cta.src}
        alt={images.cta.alt}
        fill
        sizes='100vw'
        quality={65}
        className='object-cover object-[center_35%]'
      />
      <div className='absolute inset-0 bg-ink/65' />
      <div className='relative mx-auto max-w-3xl text-center'>
        <h2 className='reveal font-display text-4xl font-bold leading-tight text-paper md:text-6xl'>
          {title}
        </h2>
        <p className='reveal mx-auto mt-5 max-w-lg text-base leading-relaxed text-paper/90'>
          {description}
        </p>
        <div className='reveal mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <SmartLink href={primaryHref} className='btn-primary'>
            {primaryLabel}
          </SmartLink>
          {whatsappUrl
            ? (
              <a href={whatsappUrl} className='btn-secondary'>
                {business.cta.whatsapp}
              </a>
              )
            : null}
        </div>
        <p className='reveal mt-8 text-xs font-medium uppercase tracking-[0.2em] text-paper/75'>
          {business.local.streetAddress} · {business.local.neighborhood}, {business.local.city}
        </p>
      </div>
    </section>
  )
}
