import { business } from '@/content/business'
import { SectionCta } from '@/components/SectionCta'
import { getGoogleBusinessUrl, getPublishedTestimonials } from '@/lib/local'
import { routes } from '@/lib/routes'

interface TestimonialsProps {
  primaryHref?: string
  secondaryHref?: string
}

export function Testimonials ({
  primaryHref = routes.trial,
  secondaryHref = routes.schedule
}: TestimonialsProps) {
  const items = getPublishedTestimonials()
  const googleBusinessUrl = getGoogleBusinessUrl()

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

        {items.length > 0
          ? (
            <div className='mt-12 grid gap-6 md:grid-cols-3'>
              {items.map((item) => (
                <blockquote
                  key={item.id}
                  className='reveal rounded-[1.5rem] bg-paper px-7 py-8 shadow-[0_10px_30px_rgba(31,27,24,0.04)]'
                >
                  <p className='text-clay' aria-label={`${item.rating} estrellas`}>
                    {'★'.repeat(item.rating)}
                  </p>
                  <p className='mt-4 font-display text-2xl font-medium leading-snug text-ink'>
                    “{item.quote}”
                  </p>
                  <footer className='mt-6 text-sm font-medium text-stone'>
                    {item.author}
                    {item.neighborhood
                      ? ` · ${item.neighborhood}`
                      : null}
                    {item.source === 'google'
                      ? (
                        <span className='mt-1 block text-xs font-normal uppercase tracking-[0.14em] text-olive'>
                          Google
                        </span>
                        )
                      : null}
                  </footer>
                </blockquote>
              ))}
            </div>
            )
          : (
            <p className='reveal mt-8 max-w-xl text-base leading-relaxed text-stone'>
              Pronto vamos a compartir reseñas de alumnas. Si ya nos visitaste, podés dejar tu opinión en Google cuando el perfil esté publicado.
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

        <SectionCta
          title='¿Lista para probar una clase?'
          description='Reservá una clase de prueba en Villa Crespo y sentí cómo es practicar en un grupo reducido.'
          primary={{ href: primaryHref, label: business.cta.trial }}
          secondary={{ href: secondaryHref, label: business.cta.schedule }}
        />
      </div>
    </section>
  )
}
