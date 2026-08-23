import { getImageProps } from 'next/image'
import { SmartLink } from '@/components/SmartLink'
import { TrustChips } from '@/components/TrustChips'
import { business } from '@/content/business'
import { images } from '@/content/images'

const chips = ['Hasta 5 alumnos por clase', 'No necesitás experiencia previa', 'Clase de prueba sin cargo']

export function Hero () {
  const announcement = business.announcement
  const shared = {
    alt: images.hero.alt,
    sizes: '100vw',
    quality: 75
  }
  const { props: desktop } = getImageProps({
    ...shared,
    src: images.hero.src,
    width: images.hero.width,
    height: images.hero.height
  })
  const { props: mobile } = getImageProps({
    ...shared,
    src: images.hero.mobile,
    width: images.hero.mobileWidth,
    height: images.hero.mobileHeight
  })

  return (
    <section id='inicio' className='relative h-svh min-h-svh overflow-hidden md:h-auto'>
      <picture>
        <source media='(min-width: 768px)' srcSet={desktop.srcSet} sizes={desktop.sizes} />
        <img
          {...mobile}
          alt={images.hero.alt}
          fetchPriority='high'
          decoding='async'
          className='hero-image absolute inset-0 size-full object-cover object-[center_42%] md:object-[78%_center]'
        />
      </picture>

      <div className='absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/42 to-ink/78 md:hidden' />
      <div className='absolute inset-0 hidden bg-gradient-to-r from-ink/78 via-ink/45 to-ink/20 md:block' />
      <div className='absolute inset-0 hidden bg-gradient-to-t from-ink/55 via-transparent to-ink/20 md:block' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,27,24,0.12),rgba(31,27,24,0.5))] md:bg-none' />

      {announcement.enabled
        ? (
          <SmartLink
            href={announcement.href ?? '#asistente'}
            intent={announcement.intent}
            className='hero-enter absolute left-1/2 top-[max(1rem,env(safe-area-inset-top))] z-10 w-[min(92vw,28rem)] -translate-x-1/2 rounded-full border border-paper/30 bg-ink/35 px-4 py-2 text-center text-[11px] font-semibold uppercase tracking-[0.14em] text-paper backdrop-blur-md md:hidden'
          >
            {announcement.text}
          </SmartLink>
          )
        : null}

      <div className='relative mx-auto flex h-full min-h-svh max-w-6xl flex-col justify-center px-5 pb-24 pt-[max(4.5rem,env(safe-area-inset-top))] md:px-8 md:pb-24 md:pt-28'>
        <p className='hero-enter font-display text-sm font-semibold uppercase tracking-[0.28em] text-paper/90'>
          Estudio de Pilates · {business.neighborhood}
        </p>
        <h1 className='hero-enter-delay mt-4 max-w-3xl font-display text-[2.7rem] font-bold leading-[1.05] text-paper sm:text-6xl md:text-7xl'>
          Pilates Reformer en Villa Crespo
        </h1>
        <p className='hero-enter-late mt-5 max-w-xl text-base font-medium leading-relaxed text-paper/90 sm:text-lg'>
          {business.tagline}
        </p>

        <TrustChips items={chips} tone='light' className='hero-enter-late mt-5 md:mt-6' />

        <div className='hero-enter-late mt-6 flex flex-col gap-3 sm:flex-row md:mt-8'>
          <SmartLink href='#asistente' intent='trial' className='btn-primary'>
            {business.cta.trial}
          </SmartLink>
          <a href='#clases' className='btn-secondary'>
            {business.cta.classes}
          </a>
        </div>
      </div>

      <a
        href='#estudio'
        className='hero-enter-late absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-paper/80 md:bottom-10'
      >
        <span className='text-[10px] font-semibold uppercase tracking-[0.22em]'>
          Conocé el estudio
        </span>
        <span className='block h-8 w-px origin-top bg-paper/80 scroll-cue' />
      </a>
    </section>
  )
}
