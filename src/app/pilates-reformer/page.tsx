import { FinalCTA } from '@/components/FinalCTA'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { ReformerGuide } from '@/components/ReformerGuide'
import { RelatedPages } from '@/components/RelatedPages'
import { SiteChrome } from '@/components/SiteChrome'
import { business } from '@/content/business'
import { images } from '@/content/images'
import { pages } from '@/content/pages'
import { getBreadcrumbJsonLd } from '@/lib/jsonld'
import { routes } from '@/lib/routes'
import { createPageMetadata } from '@/lib/seo'

const page = pages.reformer

export const metadata = createPageMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: page.path
})

export default function PilatesReformerPage () {
  return (
    <SiteChrome>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Inicio', path: routes.home },
          { name: 'Clases de Pilates', path: routes.classes },
          { name: 'Pilates Reformer', path: routes.reformer }
        ])}
      />
      <main>
        <PageHero
          eyebrow={page.hero.eyebrow}
          title={page.hero.title}
          description={page.hero.description}
          primary={{ href: '#asistente', label: business.cta.trial, intent: 'trial' }}
          secondary={{ href: routes.schedule, label: business.cta.schedule }}
          image={images.classes.reformer}
          chips={['Hasta 5 alumnos', '50 minutos', 'Clase de prueba sin cargo']}
        />
        <ReformerGuide />
        <RelatedPages
          title='Si Reformer te cierra, el siguiente paso es simple'
          links={[
            { href: routes.trial, label: 'Clase de prueba', detail: 'Conocé la máquina en una primera visita, sin experiencia previa.' },
            { href: routes.schedule, label: 'Horarios y precios', detail: 'Mirá la grilla y consultá si hay cupo.' },
            { href: routes.classes, label: 'Otras clases', detail: 'También hay Mat y sesiones personalizadas.' }
          ]}
        />
        <FinalCTA
          title='Probar una clase de Reformer'
          description='Te mostramos la máquina, el ritmo de la clase y si el horario te queda cómodo. Grupos de hasta 5 alumnos. La prueba es sin cargo.'
        />
      </main>
    </SiteChrome>
  )
}
