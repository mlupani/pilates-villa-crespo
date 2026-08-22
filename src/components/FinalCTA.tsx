import Image from 'next/image'
import { SmartLink } from '@/components/SmartLink'
import { TrustChips } from '@/components/TrustChips'
import { business } from '@/content/business'
import { images } from '@/content/images'
import type { AssistantIntent } from '@/lib/assistant'

interface FinalCTAProps {
  title?: string
  description?: string
  primaryHref?: string
  primaryLabel?: string
  primaryIntent?: AssistantIntent
}

export function FinalCTA ({
  title = '¿Listo para probar Pilates?',
  description = 'Conocé Pilates Villa Crespo y descubrí una forma de entrenar adaptada a vos. Tu clase de prueba es sin cargo.',
  primaryHref = '#asistente',
  primaryLabel = business.cta.trial,
  primaryIntent = 'trial'
}: FinalCTAProps) {
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
      <div className='absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/62 to-ink/80' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,27,24,0.15),rgba(31,27,24,0.45))]' />
      <div className='relative mx-auto max-w-3xl text-center'>
        <h2 className='reveal font-display text-4xl font-bold leading-tight text-paper md:text-6xl'>
          {title}
        </h2>
        <p className='reveal mx-auto mt-5 max-w-lg text-base font-medium leading-relaxed text-paper/90'>
          {description}
        </p>
        <TrustChips
          items={['Clase de prueba sin cargo', 'Hasta 5 alumnos', 'Sin experiencia previa']}
          tone='light'
          className='reveal mt-7 justify-center'
        />
        <div className='reveal mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row'>
          <SmartLink href={primaryHref} intent={primaryIntent} className='btn-primary'>
            {primaryLabel}
          </SmartLink>
        </div>
        <p className='reveal mt-8 text-xs font-medium uppercase tracking-[0.2em] text-paper/75'>
          {business.local.streetAddress} · {business.local.neighborhood}, {business.local.city}
        </p>
      </div>
    </section>
  )
}
