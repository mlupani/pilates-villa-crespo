import { SmartLink } from '@/components/SmartLink'
import { business } from '@/content/business'

export function Convert () {
  return (
    <section id='empezar' className='bg-cream px-5 py-20 md:px-8 md:py-28'>
      <div className='reveal mx-auto max-w-3xl text-center'>
        <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
          Clase de prueba
        </p>
        <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
          ¿Querés probar una clase?
        </h2>
        <p className='mx-auto mt-5 max-w-xl text-base leading-relaxed text-stone'>
          Contanos un poco sobre vos y te ayudamos a encontrar una opción que se adapte a tus objetivos y disponibilidad. La clase de prueba es sin cargo.
        </p>
        <SmartLink href='#asistente' intent='start' className='btn-primary mt-8'>
          {business.cta.talk}
        </SmartLink>
      </div>
    </section>
  )
}
