import { business } from '@/content/business'
import { trialGuide } from '@/content/pages'
import { isPendingValue } from '@/lib/site'

export function TrialGuide () {
  const duration = business.trialClass.duration

  return (
    <section className='bg-paper px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='reveal max-w-2xl'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            Cómo funciona
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            De la reserva a tu primera clase
          </h2>
        </div>

        <ol className='mt-12 grid gap-8 md:grid-cols-3'>
          {business.bookingSteps.map((step) => (
            <li key={step.number} className='reveal border-t border-line pt-6'>
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

        <div className='mt-16 grid gap-8 lg:grid-cols-2'>
          <article className='reveal rounded-[1.6rem] bg-cream px-6 py-8 md:px-8'>
            <h2 className='font-display text-3xl font-medium text-ink'>
              Qué esperar
            </h2>
            {trialGuide.expect.map((paragraph) => (
              <p key={paragraph} className='mt-4 text-sm leading-relaxed text-stone'>
                {paragraph}
              </p>
            ))}
          </article>
          <article className='reveal rounded-[1.6rem] bg-cream px-6 py-8 md:px-8'>
            <h2 className='font-display text-3xl font-medium text-ink'>
              Antes de venir
            </h2>
            <dl className='mt-6 space-y-5'>
              <div className='border-t border-line pt-5'>
                <dt className='font-display text-xl font-medium text-ink'>
                  ¿Hace falta experiencia?
                </dt>
                <dd className='mt-2 text-sm leading-relaxed text-stone'>
                  No. Las clases están pensadas para todos los niveles. Si es tu primera vez, te orientamos para que empieces con calma.
                </dd>
              </div>
              <div className='border-t border-line pt-5'>
                <dt className='font-display text-xl font-medium text-ink'>
                  ¿Qué llevo?
                </dt>
                <dd className='mt-2 text-sm leading-relaxed text-stone'>
                  {business.trialClass.bring}
                </dd>
              </div>
              <div className='border-t border-line pt-5'>
                <dt className='font-display text-xl font-medium text-ink'>
                  ¿Dónde es?
                </dt>
                <dd className='mt-2 text-sm leading-relaxed text-stone'>
                  {business.local.streetAddress}, {business.local.neighborhood}, {business.local.city}. {business.addressNote}
                </dd>
              </div>
              <div className='border-t border-line pt-5'>
                <dt className='font-display text-xl font-medium text-ink'>
                  Duración
                </dt>
                <dd className='mt-2 text-sm leading-relaxed text-stone'>
                  {isPendingValue(duration)
                    ? 'Te confirmamos la duración exacta al reservar tu clase.'
                    : duration}
                </dd>
              </div>
            </dl>
          </article>
        </div>
      </div>
    </section>
  )
}
