import { Faq } from '@/components/FAQ'
import { FinalCTA } from '@/components/FinalCTA'
import { JsonLd } from '@/components/JsonLd'
import { Offer } from '@/components/Offer'
import { PageHero } from '@/components/PageHero'
import { RelatedPages } from '@/components/RelatedPages'
import { SiteChrome } from '@/components/SiteChrome'
import { business } from '@/content/business'
import { images } from '@/content/images'
import { pages } from '@/content/pages'
import { getBreadcrumbJsonLd, getFaqJsonLd } from '@/lib/jsonld'
import { routes } from '@/lib/routes'
import { createPageMetadata } from '@/lib/seo'

const page = pages.schedule
const faqItems = business.faq.filter((item) => (
  item.question.includes('disponibilidad') ||
  item.question.includes('dura') ||
  item.question.includes('personas') ||
  item.question.includes('recuperaciones')
))

export const metadata = createPageMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: page.path
})

export default function HorariosYPreciosPage () {
  return (
    <SiteChrome>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Inicio', path: routes.home },
          { name: 'Horarios y precios', path: routes.schedule }
        ])}
      />
      <JsonLd data={getFaqJsonLd(faqItems)} />
      <main>
        <PageHero
          eyebrow={page.hero.eyebrow}
          title={page.hero.title}
          description={page.hero.description}
          primary={{ href: '#asistente', label: business.cta.trial, intent: 'trial' }}
          secondary={{ href: '#asistente', label: business.cta.availability, intent: 'availability' }}
          image={images.studio[2]}
          chips={['Lunes a sábado', 'Hasta 5 alumnos', 'Clase de prueba sin cargo']}
        />
        <Offer
          eyebrow='Grilla y planes'
          title='Cupos, turnos y cómo continuar después de la prueba'
          description='La grilla es de referencia. La disponibilidad de cupos puede variar según el horario. Los valores están publicados; el asistente te ayuda a elegir.'
          showOpeningHours
        />
        <Faq
          items={faqItems}
          description='Si el horario te encaja, el siguiente paso es una clase de prueba sin cargo.'
          ctaIntent='availability'
          ctaLabel={business.cta.availability}
        />
        <RelatedPages
          links={[
            { href: routes.trial, label: 'Clase de prueba', detail: 'Cómo es la primera visita y qué tenés que llevar.' },
            { href: routes.classes, label: 'Clases de Pilates', detail: 'Reformer, Mat o personalizado.' },
            { href: routes.villaCrespo, label: 'Cómo llegar', detail: 'Batalla del Pari 484, Villa Crespo.' }
          ]}
        />
        <FinalCTA
          title='Consultá disponibilidad y probá una clase'
          description='Te confirmamos el cupo. Si el horario no está, buscamos otra opción. La clase de prueba es sin cargo.'
          primaryIntent='availability'
          primaryLabel={business.cta.availability}
        />
      </main>
    </SiteChrome>
  )
}
