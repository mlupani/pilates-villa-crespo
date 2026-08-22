import Image from 'next/image'
import { SmartLink } from '@/components/SmartLink'
import { TrustChips } from '@/components/TrustChips'
import { business } from '@/content/business'
import { images } from '@/content/images'

const chips = ['Hasta 5 alumnos por clase', 'No necesitás experiencia previa', 'Clase de prueba sin cargo']

export function Hero () {
  const announcement = business.announcement

  return (
    <section id='inicio' className='relative h-svh min-h-svh overflow-hidden md:h-auto'>
      <div className='absolute inset-0'>
        <Image
          src={images.hero.src}
          alt={images.hero.alt}
          fill
          priority
          fetchPriority='high'
          sizes='100vw'
          quality={75}
          className='hero-image object-cover object-[center_48%]'
        />
      </div>

      <video
        aria-hidden='true'
        autoPlay
        muted
        loop
        playsInline
        preload='metadata'
        poster={images.hero.poster}
        className='absolute inset-0 size-full object-cover md:hidden'
      >
        <source src={images.hero.video} type='video/mp4' />
      </video>

      <div className='absolute inset-0 bg-gradient-to-b from-ink/50 via-ink/42 to-ink/78' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,27,24,0.12),rgba(31,27,24,0.5))]' />

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
