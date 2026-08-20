import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SmartLink } from '@/components/SmartLink'
import { business } from '@/content/business'
import { images } from '@/content/images'
import { routes } from '@/lib/routes'

function classHref (id: string) {
  if (id === 'reformer') return routes.reformer
  if (id === 'personal') return `${routes.classes}#pilates-personalizado`
  return `${routes.classes}#pilates-${id}`
}

export function Classes () {
  return (
    <section id='clases' className='bg-paper px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='reveal max-w-2xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            Modalidades
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            Encontrá la clase de Pilates ideal para vos
          </h2>
          <p className='mt-5 max-w-xl text-base leading-relaxed text-stone'>
            Reformer, Mat o una sesión personalizada. Todas se adaptan a tu nivel: no hace falta haber practicado antes.
          </p>
        </div>

        <div className='mt-12 grid gap-6 md:grid-cols-3'>
          {business.classes.map((item) => {
            const image = images.classes[item.imageKey]

            return (
              <article
                key={item.id}
                className='reveal group overflow-hidden rounded-[1.6rem] bg-cream shadow-[0_12px_40px_rgba(31,27,24,0.05)]'
              >
                <div className='img-zoom relative aspect-[4/5]'>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes='(max-width: 768px) 92vw, 33vw'
                    quality={70}
                    className='object-cover object-[center_30%]'
                  />
                </div>
                <div className='px-6 py-6'>
                  <p className='text-xs font-semibold uppercase tracking-[0.16em] text-olive'>
                    {item.forWhom}
                  </p>
                  <h3 className='mt-2 font-display text-2xl font-medium text-ink'>
                    {item.name}
                  </h3>
                  <p className='mt-2 text-sm leading-relaxed text-stone'>
                    {item.description}
                  </p>
                  <SmartLink
                    href={classHref(item.id)}
                    className='mt-5 inline-flex items-center gap-1 text-sm font-semibold text-clay transition-colors duration-300 hover:text-clay-dark'
                  >
                    Conocer más
                    <ArrowUpRight className='size-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5' />
                  </SmartLink>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
