import Image from 'next/image'
import { business } from '@/content/business'
import { images } from '@/content/images'

export function About () {
  const { instructor } = business

  return (
    <section id='profesora' className='bg-paper px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto grid max-w-6xl items-center gap-10 md:grid-cols-[0.85fr_1.15fr] md:gap-16'>
        <div className='reveal img-zoom relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-[1.8rem]'>
          <Image
            src={images.instructor.src}
            alt={images.instructor.alt}
            fill
            sizes='(max-width: 768px) 92vw, 28rem'
            className='object-cover object-[center_20%]'
          />
        </div>

        <div className='reveal'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            {instructor.role}
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            Hola, soy {instructor.name}
          </h2>
          <p className='mt-5 max-w-xl text-base leading-relaxed text-stone'>
            {instructor.bio}
          </p>
          <div className='mt-8 flex flex-wrap gap-3 text-xs font-medium uppercase tracking-[0.16em] text-stone'>
            <span className='rounded-full bg-cream px-4 py-2'>{instructor.role}</span>
            <span className='rounded-full bg-cream px-4 py-2'>{instructor.highlight}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
