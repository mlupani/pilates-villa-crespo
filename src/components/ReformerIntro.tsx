import Image from 'next/image'
import { images } from '@/content/images'

export function ReformerIntro () {
  return (
    <section id='reformer' className='bg-paper px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16'>
        <div className='reveal img-ken relative aspect-[4/5] overflow-hidden rounded-[1.8rem] lg:aspect-[5/6]'>
          <Image
            src={images.classes.personal.src}
            alt={images.classes.personal.alt}
            fill
            sizes='(max-width: 1024px) 92vw, 42vw'
            quality={70}
            className='object-cover object-[center_40%]'
          />
        </div>
        <div className='reveal max-w-xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            La máquina
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            Conocé el Pilates Reformer
          </h2>
          <p className='mt-5 text-base leading-relaxed text-stone'>
            El Reformer es una máquina que permite trabajar fuerza, movilidad, control y equilibrio mediante diferentes niveles de resistencia.
          </p>
          <p className='mt-4 text-base leading-relaxed text-stone'>
            Las clases pueden adaptarse a las características y experiencia de cada persona. No hace falta saber usarla de antemano: te mostramos cómo acomodarte en la primera visita.
          </p>
        </div>
      </div>
    </section>
  )
}
