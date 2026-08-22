import Image from 'next/image'
import { business } from '@/content/business'
import { images } from '@/content/images'

export function Studio () {
  const [main, second, third] = images.studio

  return (
    <section id='espacio' className='bg-cream px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[1.2fr_0.8fr]'>
        <div className='reveal grid gap-3 md:grid-cols-3 md:grid-rows-[minmax(280px,1fr)_minmax(180px,auto)] md:h-[560px] md:gap-4'>
          <figure className='img-ken relative col-span-2 aspect-[16/11] overflow-hidden rounded-[1.5rem] md:col-span-2 md:row-span-2 md:aspect-auto'>
            <Image
              src={main.src}
              alt={main.alt}
              fill
              sizes='(max-width: 768px) 92vw, (max-width: 1024px) 70vw, 640px'
              quality={70}
              className='object-cover object-[center_28%]'
            />
            {main.caption
              ? (
                <figcaption className='absolute bottom-4 left-4 rounded-full bg-ink/55 px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-paper backdrop-blur-sm'>
                  {main.caption}
                </figcaption>
                )
              : null}
          </figure>
          <figure className='img-ken relative aspect-[4/3] overflow-hidden rounded-[1.4rem] md:aspect-auto'>
            <Image
              src={second.src}
              alt={second.alt}
              fill
              sizes='(max-width: 768px) 50vw, 30vw'
              quality={70}
              className='object-cover'
            />
            {second.caption
              ? (
                <figcaption className='absolute bottom-3 left-3 rounded-full bg-ink/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper backdrop-blur-sm'>
                  {second.caption}
                </figcaption>
                )
              : null}
          </figure>
          <figure className='img-ken relative aspect-[4/3] overflow-hidden rounded-[1.4rem] md:aspect-auto'>
            <Image
              src={third.src}
              alt={third.alt}
              fill
              sizes='(max-width: 768px) 50vw, 30vw'
              quality={70}
              className='object-cover'
            />
            {third.caption
              ? (
                <figcaption className='absolute bottom-3 left-3 rounded-full bg-ink/55 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.16em] text-paper backdrop-blur-sm'>
                  {third.caption}
                </figcaption>
                )
              : null}
          </figure>
        </div>

        <div className='reveal pb-2'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            El espacio
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            Un lugar para desconectar y conectar con tu cuerpo.
          </h2>
          <p className='mt-5 text-base leading-relaxed text-stone'>
            Un espacio íntimo y cerrado en Villa Crespo, con máquinas de Pilates Reformer, pensado para que cada clase sea un momento para vos.
          </p>
          <p className='mt-6 inline-flex rounded-full border border-line px-4 py-2 text-xs font-medium uppercase tracking-[0.18em] text-stone'>
            {business.neighborhood} · {business.city}
          </p>
          <div className='mt-8'>
            <a href='#ubicacion' className='btn-outline'>
              Ver ubicación
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
