import { business } from '@/content/business'

export function AtmosphereMarquee () {
  const line = business.atmosphere.join('  ·  ')
  const loop = `${line}  ·  ${line}  ·  `

  return (
    <div className='marquee border-y border-line bg-paper py-4' aria-hidden='true'>
      <div className='marquee-track font-display text-xl font-medium tracking-[0.08em] text-olive/80 md:text-2xl'>
        <span className='pr-8 whitespace-nowrap'>{loop}</span>
        <span className='pr-8 whitespace-nowrap'>{loop}</span>
      </div>
    </div>
  )
}
