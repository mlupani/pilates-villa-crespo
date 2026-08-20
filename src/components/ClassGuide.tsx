import Image from 'next/image'
import { SmartLink } from '@/components/SmartLink'
import { classGuide } from '@/content/pages'
import { images } from '@/content/images'
import { routes } from '@/lib/routes'
import { business } from '@/content/business'

const imageById = {
  reformer: images.classes.reformer,
  mat: images.classes.mat,
  personal: images.classes.personal
} as const

export function ClassGuide () {
  return (
    <section className='bg-paper px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto max-w-6xl space-y-20'>
        {classGuide.map((item, index) => {
          const image = imageById[item.id]
          const reverse = index % 2 === 1

          return (
            <article
              key={item.id}
              id={`pilates-${item.id === 'personal' ? 'personalizado' : item.id}`}
              className='grid items-center gap-10 lg:grid-cols-2'
            >
              <div className={`img-zoom relative aspect-[4/5] overflow-hidden rounded-[1.6rem] ${reverse ? 'lg:order-2' : ''}`}>
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes='(max-width: 1024px) 92vw, 50vw'
                  quality={70}
                  className='object-cover object-[center_30%]'
                />
              </div>
              <div className={reverse ? 'lg:order-1' : undefined}>
                <p className='text-xs font-semibold uppercase tracking-[0.16em] text-olive'>
                  {item.forWhom}
                </p>
                <h2 className='mt-3 font-display text-4xl font-semibold leading-tight text-ink'>
                  {item.name}
                </h2>
                <p className='mt-5 text-base leading-relaxed text-stone'>
                  {item.what}
                </p>
                <p className='mt-4 text-base leading-relaxed text-stone'>
                  {item.who}
                </p>
                <p className='mt-4 text-base leading-relaxed text-stone'>
                  {item.next}
                </p>
                <div className='mt-8 flex flex-col gap-3 sm:flex-row'>
                  {item.id === 'reformer'
                    ? (
                      <SmartLink href={routes.reformer} className='btn-outline'>
                        Conocer más
                      </SmartLink>
                      )
                    : null}
                  <SmartLink href={routes.trial} className='btn-primary'>
                    Probar una clase
                  </SmartLink>
                </div>
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export function ClassLinks () {
  return (
    <section className='bg-paper px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='reveal max-w-2xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            Modalidades
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            Qué clases hay en el estudio
          </h2>
        </div>
        <div className='mt-12 grid gap-6 md:grid-cols-3'>
          {business.classes.map((item) => {
            const href = item.id === 'reformer'
              ? routes.reformer
              : `${routes.classes}#pilates-${item.id === 'personal' ? 'personalizado' : item.id}`

            return (
              <article
                key={item.id}
                className='reveal rounded-[1.5rem] border border-line bg-cream px-6 py-7'
              >
                <p className='text-xs font-semibold uppercase tracking-[0.16em] text-olive'>
                  {item.forWhom}
                </p>
                <h3 className='mt-3 font-display text-2xl font-medium text-ink'>
                  {item.name}
                </h3>
                <p className='mt-3 text-sm leading-relaxed text-stone'>
                  {item.description}
                </p>
                <SmartLink href={href} className='mt-5 inline-flex text-sm font-semibold text-clay hover:text-clay-dark'>
                  Conocer más
                </SmartLink>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
