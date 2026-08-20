import { Heart, Sun, Users } from 'lucide-react'
import { business } from '@/content/business'

const icons = {
  users: Users,
  heart: Heart,
  sun: Sun
}

export function Benefits () {
  return (
    <section className='bg-cream px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='reveal max-w-2xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            El estudio
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            Pilates pensado para vos
          </h2>
          <p className='mt-5 max-w-xl text-base leading-relaxed text-stone'>
            Creemos que cada cuerpo es diferente. Por eso nuestras clases buscan acompañarte de manera personalizada, respetando tus objetivos, tu experiencia y tu ritmo.
          </p>
        </div>

        <ul className='mt-14 grid gap-10 md:grid-cols-3 md:gap-8'>
          {business.benefits.map((benefit) => {
            const Icon = icons[benefit.icon]

            return (
              <li key={benefit.number} className='reveal border-t border-line pt-6'>
                <span className='font-display text-3xl text-clay'>{benefit.number}</span>
                <div className='mt-5 flex items-center gap-3'>
                  <Icon className='size-4 text-olive' strokeWidth={1.5} />
                  <h3 className='font-display text-2xl font-medium text-ink'>
                    {benefit.title}
                  </h3>
                </div>
                <p className='mt-3 text-sm leading-relaxed text-stone'>
                  {benefit.description}
                </p>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
