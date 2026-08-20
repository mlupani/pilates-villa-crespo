import Image from 'next/image'
import { business } from '@/content/business'
import { images } from '@/content/images'

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
          loading='eager'
          sizes='100vw'
          className='hero-image object-cover object-[center_48%]'
        />
      </div>

      <video
        aria-hidden='true'
        autoPlay
        muted
        loop
        playsInline
        preload='auto'
        poster={images.hero.poster}
        className='absolute inset-0 size-full object-cover md:hidden'
      >
        <source src={images.hero.video} type='video/mp4' />
      </video>

      <div className='absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/45 to-ink/70' />
      <div className='absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(31,27,24,0.18),rgba(31,27,24,0.42))]' />

      <div className='relative mx-auto flex h-full min-h-svh max-w-6xl flex-col justify-center px-5 pb-28 pt-[max(1.25rem,env(safe-area-inset-top))] md:px-8 md:pb-24 md:pt-28'>
        <p className='hero-enter font-display text-sm font-semibold uppercase tracking-[0.28em] text-paper/90'>
          Pilates Reformer en Villa Crespo
        </p>
        <h1 className='hero-enter-delay mt-4 max-w-3xl font-display text-[2.7rem] font-bold leading-[1.05] text-paper sm:text-6xl md:text-7xl'>
          Un espacio para moverte mejor, sentirte mejor.
        </h1>
        <p className='hero-enter-late mt-5 max-w-xl text-base font-medium leading-relaxed text-paper/90 sm:text-lg'>
          Clases de Pilates con máquinas Reformer, en grupos reducidos, con atención personalizada y un ambiente cálido y tranquilo.
        </p>

        <div className='hero-enter-late mt-8 flex flex-col gap-3 sm:flex-row'>
          <a href='#asistente' className='btn-primary'>
            Quiero probar una clase
          </a>
          <a href='#clases' className='btn-secondary'>
            Conocer las clases
          </a>
        </div>

        <p className='hero-enter-late mt-8 text-xs font-medium uppercase tracking-[0.18em] text-paper/75'>
          Reformer · Grupos reducidos · {business.neighborhood}
        </p>
      </div>
    </section>
  )
}
