import Image from 'next/image'
import { business } from '@/content/business'
import { images } from '@/content/images'
import { routes } from '@/lib/routes'

export function Hero () {
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

      <div className='absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink/70' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,27,24,0.18),rgba(31,27,24,0.42))]' />

      <div className='relative mx-auto flex h-full min-h-svh max-w-6xl flex-col justify-center px-5 pb-28 pt-[max(1.25rem,env(safe-area-inset-top))] md:px-8 md:pb-24 md:pt-28'>
        <p className='hero-enter font-display text-sm font-semibold uppercase tracking-[0.28em] text-paper/90'>
          Estudio de Pilates · {business.neighborhood}
        </p>
        <h1 className='hero-enter-delay mt-4 max-w-3xl font-display text-[2.7rem] font-bold leading-[1.05] text-paper sm:text-6xl md:text-7xl'>
          Clases de Pilates en Villa Crespo
        </h1>
        <p className='hero-enter-late mt-5 max-w-xl text-base font-medium leading-relaxed text-paper/90 sm:text-lg'>
          {business.tagline} Reformer, grupos reducidos y atención personalizada. No necesitás experiencia previa.
        </p>

        <div className='hero-enter-late mt-8 flex flex-col gap-3 sm:flex-row'>
          <a href='#asistente' className='btn-primary'>
            {business.cta.trial}
          </a>
          <a href={routes.schedule} className='btn-secondary'>
            {business.cta.schedule}
          </a>
        </div>

        <p className='hero-enter-late mt-8 text-xs font-medium uppercase tracking-[0.18em] text-paper/75'>
          Reformer · Todos los niveles · {business.neighborhood}, {business.city}
        </p>
      </div>
    </section>
  )
}
