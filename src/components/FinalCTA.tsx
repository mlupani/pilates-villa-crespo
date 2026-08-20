import Image from 'next/image'
import { business } from '@/content/business'
import { images } from '@/content/images'

export function FinalCTA () {
  return (
    <section id='reservar' className='relative overflow-hidden px-5 py-24 md:px-8 md:py-32'>
      <Image
        src={images.cta.src}
        alt={images.cta.alt}
        fill
        sizes='100vw'
        className='object-cover object-[center_35%]'
      />
      <div className='absolute inset-0 bg-ink/65' />
      <div className='relative mx-auto max-w-3xl text-center'>
        <h2 className='reveal font-display text-4xl font-bold leading-tight text-paper md:text-6xl'>
          ¿Querés empezar Pilates?
        </h2>
        <p className='reveal mx-auto mt-5 max-w-lg text-base font-medium leading-relaxed text-paper/90'>
          Escribinos y encontrá el horario que mejor se adapte a vos.
        </p>
        <div className='reveal mt-8'>
          <a href='#asistente' className='btn-primary'>
            Quiero reservar una clase
          </a>
        </div>
        <p className='reveal mt-8 text-xs font-medium uppercase tracking-[0.2em] text-paper/75'>
          {business.neighborhood} · {business.city}
        </p>
      </div>
    </section>
  )
}
