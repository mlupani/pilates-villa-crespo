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
  item.question.includes('horarios') ||
  item.question.includes('reservar') ||
  item.question.includes('clase de prueba') ||
  item.question.includes('grupos')
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
          primary={{ href: routes.trial, label: business.cta.trial }}
          secondary={{ href: '#asistente', label: business.cta.availability }}
          image={images.studio[3]}
        />
        <Offer
          eyebrow='Grilla y planes'
          title='Cupos, turnos y cómo continuar después de la prueba'
          description='La grilla es de referencia y puede variar. Los planes están listos en la web; los valores se confirman al consultar, sin compromiso de abono hasta que te cierre el horario.'
          showOpeningHours
          primaryHref={routes.trial}
          primaryLabel={business.cta.trial}
        />
        <Faq
          items={faqItems}
          description='Si el horario te encaja, el siguiente paso es reservar una clase de prueba. Te confirmamos disponibilidad.'
        />
        <RelatedPages
          links={[
            { href: routes.trial, label: 'Clase de prueba', detail: 'Cómo es la primera visita y qué tenés que llevar.' },
            { href: routes.classes, label: 'Clases de Pilates', detail: 'Reformer, Mat o personalizado.' },
            { href: routes.villaCrespo, label: 'Cómo llegar', detail: 'Batalla del Pari 484, Villa Crespo.' }
          ]}
        />
        <FinalCTA
          title='Consultá disponibilidad y reservá tu lugar'
          description='Te confirmamos el cupo por WhatsApp. Si el horario no está, buscamos otra opción.'
        />
      </main>
    </SiteChrome>
  )
}
