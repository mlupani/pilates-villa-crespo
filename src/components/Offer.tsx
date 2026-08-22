import { business } from '@/content/business'
import { SectionCta } from '@/components/SectionCta'
import { SmartLink } from '@/components/SmartLink'
import { formatOpeningDays } from '@/lib/utils'

interface OfferProps {
  eyebrow?: string
  title?: string
  description?: string
  showOpeningHours?: boolean
  showSteps?: boolean
}

export function Offer ({
  eyebrow = 'Horarios y planes',
  title = 'Encontrá tu momento para practicar',
  description = 'Mirá la grilla y el plan que mejor se adapte a tu ritmo. La disponibilidad de cupos puede variar según el horario.',
  showOpeningHours = false,
  showSteps = false
}: OfferProps) {
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

        <div className='mt-12 overflow-hidden rounded-[1.8rem] border border-line bg-cream'>
          <div className='grid lg:grid-cols-2'>
            <article className='reveal px-6 py-8 md:px-10 md:py-10'>
              <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-olive'>
                Grilla
              </p>
              <h3 className='mt-2 font-display text-3xl font-medium text-ink'>
                Horarios de clases
              </h3>
              <p className='mt-2 text-sm leading-relaxed text-stone'>
                La disponibilidad de cupos puede variar según el horario.
              </p>
              <ul className='mt-8 divide-y divide-line border-y border-line'>
                {business.schedule.map((slot) => (
                  <li key={slot.day} className='flex flex-col gap-2 py-5'>
                    <span className='font-display text-2xl font-medium text-ink'>
                      {slot.day}
                    </span>
                    <span className='space-y-1 text-sm font-medium tracking-wide text-stone'>
                      {slot.lines.map((line) => (
                        <span key={line} className='block'>
                          {line}
                        </span>
                      ))}
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
              <SmartLink href='#asistente' intent='availability' className='btn-primary mt-8'>
                {business.cta.availability}
              </SmartLink>
            </article>

            <article className='reveal border-t border-line bg-paper/60 px-6 py-8 md:px-10 md:py-10 lg:border-l lg:border-t-0'>
              <p className='text-[11px] font-semibold uppercase tracking-[0.2em] text-olive'>
                Planes
              </p>
              <h3 className='mt-2 font-display text-3xl font-medium text-ink'>
                Elegí la frecuencia que mejor se adapte a vos
              </h3>
              <p className='mt-2 text-sm leading-relaxed text-stone'>
                Empezá con una clase de prueba sin cargo y después elegí el plan.
              </p>
              <ul className='mt-8 space-y-4'>
                {business.prices.map((plan) => (
                  <li
                    key={plan.name}
                    className={plan.featured
                      ? 'rounded-[1.2rem] border border-clay/30 bg-cream px-5 py-5'
                      : 'border-t border-line pt-5 first:border-t-0 first:pt-0'}
                  >
                    <div className='flex flex-wrap items-baseline justify-between gap-3'>
                      <p className='font-display text-xl font-medium text-ink'>
                        {plan.name}
                      </p>
                      <p className='font-display text-2xl font-medium text-ink'>
                        {plan.amount}
                      </p>
                    </div>
                    {plan.featured
                      ? (
                        <p className='mt-1 text-[11px] font-semibold uppercase tracking-[0.14em] text-clay'>
                          La más elegida
                        </p>
                        )
                      : null}
                    <p className='mt-1 text-sm leading-relaxed text-stone'>
                      {plan.detail}
                    </p>
                  </li>
                ))}
              </ul>
              <div className='mt-8 border-t border-line pt-6'>
                <p className='font-display text-xl font-medium text-ink'>
                  ¿No sabés qué plan elegir?
                </p>
                <p className='mt-2 text-sm leading-relaxed text-stone'>
                  Contanos qué días y horarios tenés disponibles y te ayudamos a encontrar una opción que se adapte a vos.
                </p>
                <SmartLink href='#asistente' intent='plan' className='btn-outline mt-5'>
                  {business.cta.choosePlan}
                </SmartLink>
              </div>
            </article>
          </div>
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
          description='Consultá disponibilidad. El asistente te pregunta el día y el horario; una persona del estudio confirma el cupo.'
          primary={{ href: '#asistente', label: business.cta.availability, intent: 'availability' }}
        />
      </div>
    </section>
  )
}
