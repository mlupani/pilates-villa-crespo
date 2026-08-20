import { SmartLink } from '@/components/SmartLink'

interface RelatedLink {
  href: string
  label: string
  detail: string
}

interface RelatedPagesProps {
  title?: string
  links: RelatedLink[]
}

export function RelatedPages ({ title = 'Seguí conociendo el estudio', links }: RelatedPagesProps) {
  return (
    <section className='bg-cream px-5 py-16 md:px-8 md:py-20'>
      <div className='mx-auto max-w-6xl'>
        <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
          También te puede servir
        </p>
        <h2 className='mt-4 font-display text-3xl font-semibold text-ink md:text-4xl'>
          {title}
        </h2>
        <ul className='mt-10 grid gap-4 md:grid-cols-3'>
          {links.map((link) => (
            <li key={link.href}>
              <SmartLink
                href={link.href}
                className='block rounded-[1.4rem] border border-line bg-paper px-6 py-6 transition-colors duration-300 hover:border-clay/25 hover:bg-sand/30'
              >
                <p className='font-display text-2xl font-medium text-ink'>
                  {link.label}
                </p>
                <p className='mt-2 text-sm leading-relaxed text-stone'>
                  {link.detail}
                </p>
              </SmartLink>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
