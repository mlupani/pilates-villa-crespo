import Image from 'next/image'
import { Heart, Sparkles, Sun, Users } from 'lucide-react'
import { business } from '@/content/business'
import { images } from '@/content/images'

const icons = {
  users: Users,
  heart: Heart,
  sun: Sun,
  sparkles: Sparkles
}

export function Benefits () {
  return (
    <section id='estudio' className='relative overflow-hidden bg-cream px-5 py-20 md:px-8 md:py-28'>
      <div
        className='organic-blob -left-24 top-16 size-[22rem] md:size-[28rem]'
        aria-hidden='true'
      />
      <div
        className='organic-blob -right-16 bottom-8 size-[16rem] opacity-25 md:size-[22rem]'
        aria-hidden='true'
      />

      <div className='relative mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-16'>
        <div className='reveal relative mx-auto w-full max-w-md lg:max-w-none'>
          <div className='organic-blob -left-6 -top-8 size-28 md:size-36' aria-hidden='true' />
          <div className='img-ken organic-frame relative aspect-[4/5] overflow-hidden'>
            <Image
              src={images.benefits.src}
              alt={images.benefits.alt}
              fill
              sizes='(max-width: 1024px) 92vw, 42vw'
              quality={70}
              className='object-cover object-[center_22%]'
            />
          </div>
        </div>

        <div>
          <div className='reveal max-w-xl'>
            <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
              El estudio
            </p>
            <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
              Un espacio íntimo, con atención cercana
            </h2>
            <p className='mt-5 text-base leading-relaxed text-stone'>
              {business.audience}
            </p>
          </div>

          <ul className='mt-10 grid gap-0 sm:grid-cols-2 sm:gap-x-8'>
            {business.benefits.map((benefit, index) => {
              const Icon = icons[benefit.icon]

              return (
                <li
                  key={benefit.number}
                  className={`reveal border-t border-line py-6 ${index === 1 ? 'reveal-2' : ''} ${index >= 2 ? 'reveal-3 sm:border-b' : ''}`}
                >
                  <span className='font-display text-2xl text-clay'>{benefit.number}</span>
                  <div className='mt-3 flex items-center gap-3'>
                    <Icon className='size-4 text-olive' strokeWidth={1.5} />
                    <h3 className='font-display text-xl font-medium text-ink'>
                      {benefit.title}
                    </h3>
                  </div>
                  <p className='mt-2 text-sm leading-relaxed text-stone'>
                    {benefit.description}
                  </p>
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
