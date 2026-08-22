import { getGoogleBusinessUrl, getPublishedTestimonials } from '@/lib/local'

export function Testimonials () {
  const items = getPublishedTestimonials()
  const googleBusinessUrl = getGoogleBusinessUrl()
  const [featured, ...rest] = items

  if (items.length === 0 && !googleBusinessUrl) return null

  return (
    <section className='bg-cream px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='reveal max-w-2xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            Voces
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            Lo que dicen quienes practican acá
          </h2>
        </div>

        {featured
          ? (
            <div className='mt-12 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]'>
              <blockquote className='reveal rounded-[1.8rem] bg-paper px-8 py-10 shadow-[0_10px_30px_rgba(31,27,24,0.04)] md:px-12 md:py-14'>
                <p className='text-clay' aria-label={`${featured.rating} estrellas`}>
                  {'★'.repeat(featured.rating)}
                </p>
                <p className='mt-6 font-display text-3xl font-medium leading-snug text-ink md:text-5xl'>
                  “{featured.quote}”
                </p>
                <footer className='mt-8 text-sm font-medium text-stone'>
                  {featured.author}
                  {featured.neighborhood ? ` · ${featured.neighborhood}` : null}
                </footer>
              </blockquote>

              {rest.length > 0
                ? (
                  <div className='grid gap-6'>
                    {rest.map((item, index) => (
                      <blockquote
                        key={item.id}
                        className={`reveal rounded-[1.5rem] bg-paper px-7 py-8 shadow-[0_10px_30px_rgba(31,27,24,0.04)] ${index === 1 ? 'reveal-2' : ''}`}
                      >
                        <p className='text-clay' aria-label={`${item.rating} estrellas`}>
                          {'★'.repeat(item.rating)}
                        </p>
                        <p className='mt-4 font-display text-2xl font-medium leading-snug text-ink'>
                          “{item.quote}”
                        </p>
                        <footer className='mt-6 text-sm font-medium text-stone'>
                          {item.author}
                          {item.neighborhood ? ` · ${item.neighborhood}` : null}
                        </footer>
                      </blockquote>
                    ))}
                  </div>
                  )
                : null}
            </div>
            )
          : (
            <p className='reveal mt-8 max-w-xl text-base leading-relaxed text-stone'>
              Pronto vamos a compartir reseñas de quienes vienen al estudio. Si ya nos visitaste, podés dejar tu opinión en Google cuando el perfil esté publicado.
            </p>
            )}

        {googleBusinessUrl
          ? (
            <p className='reveal mt-8 text-sm text-stone'>
              <a href={googleBusinessUrl} target='_blank' rel='noreferrer' className='font-semibold text-clay hover:text-clay-dark'>
                Ver reseñas en Google
              </a>
            </p>
            )
          : null}
      </div>
    </section>
  )
}
