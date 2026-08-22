import Image from 'next/image'
import { SmartLink } from '@/components/SmartLink'
import { business } from '@/content/business'
import { images } from '@/content/images'

export function FirstTime () {
  return (
    <section id='primera-vez' className='bg-paper px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16'>
        <div className='reveal'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            Primera visita
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            ¿Es tu primera vez?
          </h2>
          <p className='mt-5 max-w-xl text-base leading-relaxed text-stone'>
            No necesitás tener experiencia previa para comenzar.
          </p>
          <p className='mt-4 max-w-xl text-base leading-relaxed text-stone'>
            Las clases se adaptan a las características y objetivos de cada persona, y además hay una clase de prueba sin cargo para que conozcas el estudio y nuestra forma de trabajar.
          </p>
          <SmartLink href='#asistente' intent='trial' className='btn-primary mt-8'>
            {business.cta.trial}
          </SmartLink>
        </div>

        <div className='reveal img-ken relative aspect-[4/5] overflow-hidden rounded-[1.8rem] lg:aspect-[5/6]'>
          <Image
            src={images.classes.mat.src}
            alt={images.classes.mat.alt}
            fill
            sizes='(max-width: 1024px) 92vw, 40vw'
            quality={70}
            className='object-cover object-[center_24%]'
          />
          <div className='absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent' />
          <p className='absolute bottom-5 left-5 right-5 font-display text-2xl font-medium text-paper'>
            Probá una clase sin cargo.
          </p>
        </div>
      </div>
    </section>
  )
}
