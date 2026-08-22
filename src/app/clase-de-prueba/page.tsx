import { Faq } from '@/components/FAQ'
import { FinalCTA } from '@/components/FinalCTA'
import { JsonLd } from '@/components/JsonLd'
import { Location } from '@/components/Location'
import { PageHero } from '@/components/PageHero'
import { RelatedPages } from '@/components/RelatedPages'
import { SiteChrome } from '@/components/SiteChrome'
import { TrialGuide } from '@/components/TrialGuide'
import { business } from '@/content/business'
import { images } from '@/content/images'
import { pages } from '@/content/pages'
import { getBreadcrumbJsonLd, getFaqJsonLd } from '@/lib/jsonld'
import { routes } from '@/lib/routes'
import { createPageMetadata } from '@/lib/seo'

const page = pages.trial
const faqItems = business.faq.filter((item) => (
  item.question.includes('experiencia') ||
  item.question.includes('llevar') ||
  item.question.includes('medias') ||
  item.question.includes('dura') ||
  item.question.includes('personas') ||
  item.question.includes('disponibilidad')
))

export const metadata = createPageMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: page.path
})

export default function ClaseDePruebaPage () {
  return (
    <SiteChrome>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Inicio', path: routes.home },
          { name: 'Clase de prueba', path: routes.trial }
        ])}
      />
      <JsonLd data={getFaqJsonLd(faqItems)} />
      <main>
        <PageHero
          eyebrow={page.hero.eyebrow}
          title={page.hero.title}
          description={page.hero.description}
          primary={{ href: '#asistente', label: business.cta.trialMine, intent: 'trial' }}
          secondary={{ href: routes.schedule, label: business.cta.schedule }}
          image={images.classes.mat}
          chips={['Sin cargo', 'Sin experiencia previa', 'Hasta 5 alumnos']}
        />
        <TrialGuide />
        <Location trialHref='#asistente' />
        <Faq
          items={faqItems}
          description='Si todavía te queda alguna duda, resolvela acá o escribinos. La clase de prueba es sin cargo.'
          ctaHref='#asistente'
          ctaLabel={business.cta.trialMine}
          ctaIntent='trial'
        />
        <RelatedPages
          links={[
            { href: routes.reformer, label: 'Pilates Reformer', detail: 'Si ya sabés que querés probar la máquina.' },
            { href: routes.schedule, label: 'Horarios y precios', detail: 'Mirá la grilla antes de pedir un turno.' },
            { href: routes.villaCrespo, label: 'El estudio', detail: 'Dónde queda y cómo se llega.' }
          ]}
        />
        <FinalCTA
          title='¿Querés probar una clase?'
          description='Contanos un poco sobre vos. Te ayudamos a encontrar un horario y confirmamos el cupo. La prueba es sin cargo.'
          primaryHref='#asistente'
          primaryLabel={business.cta.talk}
          primaryIntent='start'
        />
      </main>
    </SiteChrome>
  )
}
