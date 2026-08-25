import Image from 'next/image'
import { ArrowUpRight } from 'lucide-react'
import { SmartLink } from '@/components/SmartLink'
import { business } from '@/content/business'
import { images } from '@/content/images'
import { routes } from '@/lib/routes'

const classFacts = [
  'Pilates Reformer',
  'Enfoque clásico y contemporáneo',
  'Clases de 50 minutos',
  'Grupal o individual',
  'Hasta 5 alumnos',
  'Se adapta a tu nivel'
]

function classHref (id: string) {
  if (id === 'reformer') return routes.reformer
  if (id === 'personal') return `${routes.classes}#pilates-personalizado`
  return `${routes.classes}#pilates-${id}`
}

export function Classes () {
  const [reformer, ...others] = business.classes
  const reformerImage = images.classes[reformer.imageKey]

  return (
    <section id='clases' className='bg-cream px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='reveal max-w-2xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            Cómo son las clases
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            Una hora para vos, con seguimiento cercano
          </h2>
          <p className='mt-5 max-w-xl text-base leading-relaxed text-stone'>
            Reformer es el corazón del estudio, con sesiones personalizadas según lo que necesites.
          </p>
        </div>

        <ul className='reveal mt-8 flex flex-wrap gap-2'>
          {classFacts.map((fact) => (
            <li
              key={fact}
              className='rounded-full border border-line bg-paper px-3 py-1.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-stone'
            >
              {fact}
            </li>
          ))}
        </ul>

        <article className='reveal mt-12 grid overflow-hidden rounded-[1.8rem] bg-paper shadow-[0_12px_40px_rgba(31,27,24,0.05)] lg:grid-cols-[1.15fr_0.85fr]'>
          <div className='img-ken relative min-h-[320px] aspect-[4/5] lg:aspect-auto lg:min-h-[520px]'>
            <Image
              src={reformerImage.src}
              alt={reformerImage.alt}
              fill
              sizes='(max-width: 1024px) 92vw, 55vw'
              quality={70}
              className='object-cover object-[center_32%]'
            />
          </div>
          <div className='flex flex-col justify-center px-6 py-8 md:px-10 md:py-12'>
            <p className='text-xs font-semibold uppercase tracking-[0.16em] text-olive'>
              {reformer.forWhom}
            </p>
            <h3 className='mt-3 font-display text-3xl font-medium text-ink md:text-4xl'>
              {reformer.name}
            </h3>
            <p className='mt-4 text-sm leading-relaxed text-stone md:text-base'>
              {reformer.description}
            </p>
            <div className='mt-8 flex flex-wrap gap-3'>
              <SmartLink href='#asistente' intent='trial' className='btn-primary'>
                {business.cta.trial}
              </SmartLink>
              <SmartLink href={classHref(reformer.id)} className='btn-outline'>
                {business.cta.knowMore}
              </SmartLink>
            </div>
          </div>
        </article>

        <div className='mt-8 rounded-2xl border border-clay/15 bg-paper px-5 py-5 md:px-6'>
          <p className='text-xs font-semibold uppercase tracking-[0.14em] text-clay'>
            Horarios libres y cupos que se liberan
          </p>
          <p className='mt-2 text-sm leading-relaxed text-stone'>
            Además de la grilla fija, podés tener <span className='font-semibold text-ink'>horarios libres</span> según tu disponibilidad. Cuando alguien avisa que falta, se libera un lugar y lo avisamos en el grupo de alumnas: cualquier alumna —sobre todo quienes tienen horarios libres— puede tomar ese hueco.
          </p>
        </div>

        <div className='mt-6 grid gap-6 md:grid-cols-2'>
          {others.map((item, index) => {
            const image = images.classes[item.imageKey]

            return (
              <article
                key={item.id}
                className={`reveal group overflow-hidden rounded-[1.6rem] bg-paper shadow-[0_12px_40px_rgba(31,27,24,0.05)] ${index === 1 ? 'reveal-2' : ''}`}
              >
                <div className='img-zoom relative aspect-[16/11]'>
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes='(max-width: 768px) 92vw, 45vw'
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
                    {business.cta.knowMore}
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
