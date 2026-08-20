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
  item.question.includes('clase de prueba') ||
  item.question.includes('ubicados') ||
  item.question.includes('reservar')
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
          primary={{ href: '#asistente', label: business.cta.trialMine }}
          secondary={{ href: routes.schedule, label: business.cta.schedule }}
          image={images.classes.mat}
        />
        <TrialGuide />
        <Location trialHref='#asistente' />
        <Faq
          items={faqItems}
          description='Si todavía te queda alguna duda, resolvela acá y después reservá. Te confirmamos el cupo antes de que vengas.'
          ctaHref='#asistente'
          ctaLabel={business.cta.trialMine}
        />
        <RelatedPages
          links={[
            { href: routes.reformer, label: 'Pilates Reformer', detail: 'Si ya sabés que querés probar la máquina.' },
            { href: routes.schedule, label: 'Horarios y precios', detail: 'Mirá la grilla antes de pedir un turno.' },
            { href: routes.villaCrespo, label: 'El estudio', detail: 'Dónde queda y cómo se llega.' }
          ]}
        />
        <FinalCTA
          title='Reservar mi clase de prueba'
          description='Dejanos tu nombre, WhatsApp y una preferencia de horario. Te confirmamos disponibilidad.'
          primaryHref='#asistente'
          primaryLabel={business.cta.trialMine}
        />
      </main>
    </SiteChrome>
  )
}
