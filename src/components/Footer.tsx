import { Logo } from '@/components/Logo'
import { business, getWhatsAppUrl } from '@/content/business'

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
  return (
    <footer className='border-t border-line bg-cream px-5 py-14 md:px-8'>
      <div className='mx-auto grid max-w-6xl gap-10 md:grid-cols-[1.2fr_1fr_1fr]'>
        <div>
          <a href='#inicio' className='inline-block h-24 w-24' aria-label='Pilates Villa Crespo'>
            <Logo className='size-full' />
          </a>
          <p className='mt-3 max-w-xs text-sm leading-relaxed text-stone'>
            Un espacio íntimo para moverte mejor, en el corazón de Villa Crespo.
          </p>
        </div>

        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-olive'>
            Navegación
          </p>
          <ul className='mt-4 space-y-2 text-sm text-stone'>
            <li><a href='#inicio' className='hover:text-ink'>Inicio</a></li>
            <li><a href='#clases' className='hover:text-ink'>Clases</a></li>
            <li><a href='#faq' className='hover:text-ink'>Preguntas frecuentes</a></li>
            <li><a href='#reservar' className='hover:text-ink'>Contacto</a></li>
          </ul>
        </div>

        <div>
          <p className='text-xs font-semibold uppercase tracking-[0.22em] text-olive'>
            Contacto
          </p>
          <ul className='mt-4 space-y-3 text-sm text-stone'>
            <li>
              <a
                href={business.instagramUrl}
                target='_blank'
                rel='noreferrer'
                className='inline-flex items-center gap-2 hover:text-ink'
              >
                <InstagramIcon />
                {business.instagram}
              </a>
            </li>
            <li>
              <a href={getWhatsAppUrl()} className='hover:text-ink'>
                WhatsApp
              </a>
            </li>
            <li>{business.address}</li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
