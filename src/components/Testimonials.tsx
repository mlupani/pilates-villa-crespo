import { business } from '@/content/business'

export function Testimonials () {
  return (
    <section className='bg-cream px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='reveal max-w-2xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            Voces
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            Lo que dicen nuestras alumnas
          </h2>
        </div>

        <div className='mt-12 grid gap-6 md:grid-cols-3'>
          {business.testimonials.map((item) => (
            <blockquote
              key={item.author}
              className='reveal rounded-[1.5rem] bg-paper px-7 py-8 shadow-[0_10px_30px_rgba(31,27,24,0.04)]'
            >
              <p className='text-clay' aria-label={`${item.rating} estrellas`}>
                ★★★★★
              </p>
              <p className='mt-4 font-display text-2xl font-medium leading-snug text-ink'>
                “{item.quote}”
              </p>
              <footer className='mt-6 text-sm font-medium text-stone'>
                {item.author}
              </footer>
            </blockquote>
          ))}
        </div>
      </div>
    </section>
  )
}
