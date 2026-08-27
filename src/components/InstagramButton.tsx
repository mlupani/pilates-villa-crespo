import { business } from '@/content/business'

interface InstagramButtonProps {
  className?: string
}

export function InstagramButton ({ className }: InstagramButtonProps) {
  const href = business.instagramUrl
  // business.instagramUrl is always defined (hardcoded fallback), but guard anyway
  if (!href || href.includes('TODO')) return null

  return (
    <a
      href={href}
      target='_blank'
      rel='noreferrer'
      aria-label='Abrir Instagram de Pilates Villa Crespo'
      className={
        className ??
        'inline-flex size-14 items-center justify-center rounded-full bg-gradient-to-br from-[#feda75] via-[#d62976] to-[#4f5bd5] text-white shadow-[0_12px_30px_rgba(214,41,118,0.35)] transition-transform duration-300 [@media(hover:hover)]:hover:-translate-y-0.5'
      }
    >
      <svg
        viewBox='0 0 24 24'
        className='size-[22px]'
        fill='none'
        stroke='currentColor'
        strokeWidth='1.7'
        aria-hidden='true'
      >
        <rect x='3' y='3' width='18' height='18' rx='5' />
        <circle cx='12' cy='12' r='4' />
        <circle cx='17.5' cy='6.5' r='1' fill='currentColor' stroke='none' />
      </svg>
    </a>
  )
}
