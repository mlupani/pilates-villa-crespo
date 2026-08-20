import Image from 'next/image'
import { business } from '@/content/business'
import { images } from '@/content/images'

export function Studio () {
  const [main, second, third, fourth] = images.studio

  return (
    <section id='espacio' className='bg-cream px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto grid max-w-6xl items-end gap-10 lg:grid-cols-[1.15fr_0.85fr]'>
        <div className='reveal'>
          <div className='grid grid-cols-2 gap-3 md:grid-cols-3 md:grid-rows-[minmax(240px,1fr)_minmax(240px,1fr)] md:h-[540px] md:gap-4'>
            <div className='img-zoom relative col-span-2 aspect-[16/11] overflow-hidden rounded-[1.5rem] md:col-span-2 md:row-span-2 md:aspect-auto'>
              <Image
                src={main.src}
                alt={main.alt}
                fill
                sizes='(max-width: 768px) 92vw, (max-width: 1024px) 70vw, 640px'
                quality={70}
                className='object-cover object-[center_28%]'
              />
            </div>
            <div className='img-zoom relative aspect-[4/3] overflow-hidden rounded-[1.4rem] md:aspect-auto'>
              <Image
                src={second.src}
                alt={second.alt}
                fill
                sizes='(max-width: 768px) 50vw, 30vw'
                quality={70}
                className='object-cover'
              />
            </div>
            <div className='img-zoom relative aspect-[4/3] overflow-hidden rounded-[1.4rem] md:aspect-auto'>
              <Image
                src={third.src}
                alt={third.alt}
                fill
                sizes='(max-width: 768px) 50vw, 30vw'
                quality={70}
                className='object-cover'
              />
            </div>
          </div>
          <div className='img-zoom relative mt-3 aspect-[16/7] overflow-hidden rounded-[1.4rem] md:mt-4'>
            <Image
              src={fourth.src}
              alt={fourth.alt}
              fill
              sizes='(max-width: 768px) 92vw, (max-width: 1024px) 70vw, 640px'
              quality={70}
              className='object-cover'
            />
          </div>
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

      <div className='reveal mx-auto mt-12 max-w-6xl md:mt-16'>
        <p className='mb-4 text-xs font-semibold uppercase tracking-[0.22em] text-olive'>
          {business.instagram}
        </p>
        <div className='flex gap-2 overflow-x-auto pb-1 md:grid md:grid-cols-5 md:gap-3 md:overflow-visible'>
          {images.instagram.map((post) => (
            <a
              key={post.src}
              href={business.instagramUrl}
              target='_blank'
              rel='noreferrer'
              className='img-zoom relative aspect-[4/5] w-[42vw] shrink-0 overflow-hidden rounded-[1rem] md:w-auto md:rounded-[1.3rem]'
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes='(max-width: 768px) 42vw, 20vw'
                quality={65}
                className='object-cover'
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
