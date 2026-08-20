import { business } from '@/content/business'
import { SectionCta } from '@/components/SectionCta'
import { getWhatsAppUrl } from '@/lib/local'
import { routes } from '@/lib/routes'
import { isPendingValue } from '@/lib/site'
import { formatOpeningDays } from '@/lib/utils'

interface OfferProps {
  eyebrow?: string
  title?: string
  description?: string
  showOpeningHours?: boolean
  showSteps?: boolean
  primaryHref?: string
  primaryLabel?: string
}

export function Offer ({
  eyebrow = 'Horarios y planes',
  title = 'Encontrá tu momento para practicar',
  description = 'Mirá la grilla, elegí el plan que mejor se adapte a tu ritmo y reservá una clase de prueba. Te confirmamos disponibilidad.',
  showOpeningHours = false,
  showSteps = true,
  primaryHref = routes.trial,
  primaryLabel = business.cta.trial
}: OfferProps) {
  const whatsappUrl = getWhatsAppUrl()

  return (
    <section id='horarios' className='bg-paper px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='reveal max-w-2xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            {eyebrow}
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            {title}
          </h2>
          <p className='mt-5 max-w-xl text-base leading-relaxed text-stone'>
            {description}
          </p>
        </div>

        <div className='mt-12 grid gap-6 lg:grid-cols-2'>
          <article className='reveal rounded-[1.6rem] bg-cream px-6 py-8 md:px-8'>
            <h3 className='font-display text-3xl font-medium text-ink'>
              Horarios de clase
            </h3>
            <p className='mt-2 text-sm leading-relaxed text-stone'>
              Grilla de referencia. Los cupos se confirman al reservar.
            </p>
            <ul className='mt-8 divide-y divide-line border-y border-line'>
              {business.schedule.map((slot) => (
                <li key={slot.day} className='flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6'>
                  <span className='font-display text-xl font-medium text-ink'>
                    {slot.day}
                  </span>
                  <span className='text-sm text-stone'>
                    {slot.hours}
                  </span>
                </li>
              ))}
            </ul>
            {showOpeningHours && business.openingHoursSpecification.length > 0
              ? (
                <div className='mt-8'>
                  <p className='text-xs font-semibold uppercase tracking-[0.16em] text-olive'>
                    Horario de atención
                  </p>
                  <ul className='mt-3 space-y-2 text-sm text-stone'>
                    {business.openingHoursSpecification.map((item) => (
                      <li key={`${item.opens}-${item.closes}`}>
                        {formatOpeningDays(item.dayOfWeek)} · {item.opens} a {item.closes}
                      </li>
                    ))}
                  </ul>
                </div>
                )
              : null}
          </article>

          <article className='reveal rounded-[1.6rem] bg-cream px-6 py-8 md:px-8'>
            <h3 className='font-display text-3xl font-medium text-ink'>
              Planes
            </h3>
            <p className='mt-2 text-sm leading-relaxed text-stone'>
              Empezá con una clase de prueba y después elegí la frecuencia que te sirva.
            </p>
            <ul className='mt-8 space-y-5'>
              {business.prices.map((plan) => (
                <li key={plan.name} className='border-t border-line pt-5'>
                  <div className='flex flex-wrap items-baseline justify-between gap-3'>
                    <p className='font-display text-xl font-medium text-ink'>
                      {plan.name}
                    </p>
                    <p className='text-sm font-medium text-olive'>
                      {isPendingValue(plan.amount) ? 'Consultar valor' : plan.amount}
                    </p>
                  </div>
                  <p className='mt-1 text-sm leading-relaxed text-stone'>
                    {plan.detail}
                  </p>
                </li>
              ))}
            </ul>
            <p className='mt-6 text-xs font-medium uppercase tracking-[0.16em] text-olive'>
              Los valores se confirman al consultar disponibilidad
            </p>
          </article>
        </div>

        {showSteps
          ? (
            <ol className='reveal mt-12 grid gap-8 border-t border-line pt-10 md:grid-cols-3'>
              {business.bookingSteps.map((step) => (
                <li key={step.number}>
                  <span className='font-display text-3xl text-clay'>{step.number}</span>
                  <h3 className='mt-4 font-display text-2xl font-medium text-ink'>
                    {step.title}
                  </h3>
                  <p className='mt-2 text-sm leading-relaxed text-stone'>
                    {step.description}
                  </p>
                </li>
              ))}
            </ol>
            )
          : null}

        <SectionCta
          title='¿Qué horario te queda mejor?'
          description='Reservá una clase de prueba o consultá disponibilidad. Te confirmamos el cupo por WhatsApp.'
          primary={{ href: primaryHref, label: primaryLabel }}
          secondary={whatsappUrl
            ? { href: whatsappUrl, label: business.cta.availability }
            : undefined}
        />
      </div>
    </section>
  )
}
