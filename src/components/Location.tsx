import { MapPin } from 'lucide-react'
import { SmartLink } from '@/components/SmartLink'
import { business } from '@/content/business'
import {
  getEmail,
  getMapsEmbedUrl,
  getMapsUrl,
  getOpeningHoursSummary,
  getPublicProfiles,
  getTelephone,
  getWhatsAppUrl
} from '@/lib/local'
import { routes } from '@/lib/routes'

interface LocationProps {
  trialHref?: string
}

export function Location ({ trialHref = routes.trial }: LocationProps) {
  const whatsappUrl = getWhatsAppUrl()
  const telephone = getTelephone()
  const email = getEmail()
  const profiles = getPublicProfiles()
  const hours = getOpeningHoursSummary()

  return (
    <section id='ubicacion' className='bg-paper px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto max-w-6xl'>
        <div className='grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:items-center'>
          <div className='reveal'>
            <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
              Ubicación
            </p>
            <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
              En el corazón de Villa Crespo
            </h2>
            <p className='mt-5 max-w-xl text-base leading-relaxed text-stone'>
              El estudio está en {business.local.streetAddress}, {business.local.neighborhood}, {business.local.city}. Un espacio íntimo, fácil de llegar y pensado para que la clase sea el momento más calmo de tu día.
            </p>

            <ul className='mt-10 space-y-6'>
              {business.locationDetails.map((item) => (
                <li key={item.title} className='border-t border-line pt-5'>
                  <h3 className='font-display text-2xl font-medium text-ink'>
                    {item.title}
                  </h3>
                  <p className='mt-2 text-sm leading-relaxed text-stone'>
                    {item.description}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <address id='contacto' className='reveal not-italic rounded-[1.6rem] bg-cream px-6 py-8 shadow-[0_12px_40px_rgba(31,27,24,0.05)] md:px-8 md:py-10'>
            <span className='inline-flex size-11 items-center justify-center rounded-full bg-sand text-clay'>
              <MapPin className='size-5' strokeWidth={1.6} />
            </span>
            <p className='mt-6 text-xs font-semibold uppercase tracking-[0.22em] text-olive'>
              Contacto
            </p>
            <p className='mt-3 font-display text-3xl font-medium leading-tight text-ink'>
              {business.local.streetAddress}
            </p>
            <p className='mt-2 text-sm font-medium text-ink'>
              {business.local.neighborhood}, {business.local.city}
            </p>
            <p className='mt-1 text-sm text-stone'>
              {business.local.region} · {business.local.postalCode}
            </p>
            <p className='mt-4 text-sm leading-relaxed text-stone'>
              {business.addressNote}
            </p>

            <ul className='mt-6 space-y-2 text-sm text-stone'>
              {hours.map((item) => (
                <li key={item.days}>
                  {item.days}: {item.hours}
                </li>
              ))}
            </ul>

            <div className='mt-8 flex flex-col gap-3'>
              {whatsappUrl
                ? (
                  <a href={whatsappUrl} className='btn-primary'>
                    {business.cta.whatsapp}
                  </a>
                  )
                : (
                  <SmartLink href={trialHref} className='btn-primary'>
                    {business.cta.trial}
                  </SmartLink>
                  )}
              <a
                href={getMapsUrl()}
                target='_blank'
                rel='noreferrer'
                className='btn-outline'
              >
                {business.cta.directions}
              </a>
            </div>

            <ul className='mt-6 space-y-2 text-sm'>
              {telephone
                ? (
                  <li>
                    <a href={`tel:${telephone}`} className='text-stone hover:text-ink'>
                      Teléfono: {telephone}
                    </a>
                  </li>
                  )
                : null}
              {email
                ? (
                  <li>
                    <a href={`mailto:${email}`} className='text-stone hover:text-ink'>
                      {email}
                    </a>
                  </li>
                  )
                : null}
              {profiles.map((profile) => (
                <li key={profile.label}>
                  <a
                    href={profile.url}
                    target='_blank'
                    rel='noreferrer'
                    className='text-stone hover:text-ink'
                  >
                    {profile.label === 'Instagram' ? business.instagram : profile.label}
                  </a>
                </li>
              ))}
            </ul>
          </address>
        </div>

        <div className='reveal mt-10 overflow-hidden rounded-[1.6rem] border border-line'>
          <iframe
            title={`Mapa de ${business.name} en ${business.local.neighborhood}`}
            src={getMapsEmbedUrl()}
            className='h-72 w-full md:h-96'
            loading='lazy'
            allowFullScreen
            referrerPolicy='no-referrer-when-downgrade'
          />
        </div>
      </div>
    </section>
  )
}
