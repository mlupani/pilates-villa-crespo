import Image from 'next/image'
import { Logo } from '@/components/Logo'
import { SmartLink } from '@/components/SmartLink'
import { business } from '@/content/business'
import { getEmail, getPublicProfiles, getTelephone, getWhatsAppUrl } from '@/lib/local'
import { routes } from '@/lib/routes'

function InstagramIcon () {
  return (
    <svg
      viewBox='0 0 24 24'
      className='size-4'
      fill='none'
      stroke='currentColor'
      strokeWidth='1.5'
      aria-hidden='true'
    >
      <rect x='3' y='3' width='18' height='18' rx='5' />
      <circle cx='12' cy='12' r='4' />
      <circle cx='17.5' cy='6.5' r='0.8' fill='currentColor' stroke='none' />
    </svg>
  )
}

export function Footer () {
  const whatsappUrl = getWhatsAppUrl()
  const telephone = getTelephone()
  const email = getEmail()
  const profiles = getPublicProfiles()

  return (
    <footer>
      <div className='border-t border-line bg-cream px-5 py-14 md:px-8'>
      <div className='mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]'>
        <div>
          <SmartLink href={routes.home} className='inline-block h-24 w-24'>
            <span className='sr-only'>{business.name}</span>
            <Logo className='size-full' />
          </SmartLink>
          <p className='mt-3 max-w-xs text-sm leading-relaxed text-stone'>
            Estudio de Pilates en Villa Crespo, Buenos Aires. Un espacio íntimo para moverte mejor, con o sin experiencia previa.
          </p>
        </div>

        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-olive'>
            Navegación
          </p>
          <ul className='mt-4 space-y-2 text-sm text-stone'>
            <li><SmartLink href={routes.home} className='hover:text-ink'>Inicio</SmartLink></li>
            <li><SmartLink href={routes.villaCrespo} className='hover:text-ink'>Pilates en Villa Crespo</SmartLink></li>
            <li><SmartLink href={routes.classes} className='hover:text-ink'>Clases de Pilates</SmartLink></li>
            <li><SmartLink href={routes.reformer} className='hover:text-ink'>Pilates Reformer</SmartLink></li>
            <li><SmartLink href={routes.schedule} className='hover:text-ink'>Horarios y precios</SmartLink></li>
            <li><SmartLink href={routes.trial} className='hover:text-ink'>Clase de prueba</SmartLink></li>
            <li><SmartLink href={`${routes.villaCrespo}#contacto`} className='hover:text-ink'>Contacto</SmartLink></li>
          </ul>
        </div>

        <address className='not-italic'>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-olive'>
            Contacto
          </p>
          <ul className='mt-4 space-y-3 text-sm text-stone'>
            <li>
              <SmartLink href={`${routes.villaCrespo}#ubicacion`} className='hover:text-ink'>
                {business.local.streetAddress}
              </SmartLink>
            </li>
            <li>
              {business.local.neighborhood}, {business.local.city}
            </li>
            <li>
              {business.local.region} · {business.local.postalCode}
            </li>
            {telephone
              ? (
                <li>
                  <a href={`tel:${telephone}`} className='hover:text-ink'>
                    {telephone}
                  </a>
                </li>
                )
              : null}
            {whatsappUrl
              ? (
                <li>
                  <a href={whatsappUrl} className='hover:text-ink'>
                    WhatsApp
                  </a>
                </li>
                )
              : null}
            {email
              ? (
                <li>
                  <a href={`mailto:${email}`} className='hover:text-ink'>
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
                  className={profile.label === 'Instagram'
                    ? 'inline-flex items-center gap-2 hover:text-ink'
                    : 'hover:text-ink'}
                >
                  {profile.label === 'Instagram'
                    ? (
                      <>
                        <InstagramIcon />
                        {business.instagram}
                      </>
                      )
                    : profile.label}
                </a>
              </li>
            ))}
          </ul>
        </address>
      </div>
      </div>
      <div className='bg-black'>
        <a
          href='https://novaluptech.com'
          target='_blank'
          rel='noreferrer'
          className='flex items-center justify-center gap-2 px-5 py-2.5 text-[11px] tracking-[0.12em] text-white/40 transition-colors hover:text-white/70'
        >
          <Image
            src='/novalup.png'
            alt=''
            width={20}
            height={20}
            className='size-5 rounded-full'
          />
          Desarrollado por Novalup Tech · Web + IA
        </a>
      </div>
    </footer>
  )
}
