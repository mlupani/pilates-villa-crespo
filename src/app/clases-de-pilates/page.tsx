import { ClassGuide } from '@/components/ClassGuide'
import { Editorial } from '@/components/Editorial'
import { FinalCTA } from '@/components/FinalCTA'
import { JsonLd } from '@/components/JsonLd'
import { PageHero } from '@/components/PageHero'
import { RelatedPages } from '@/components/RelatedPages'
import { SiteChrome } from '@/components/SiteChrome'
import { business } from '@/content/business'
import { images } from '@/content/images'
import { pages } from '@/content/pages'
import { getBreadcrumbJsonLd } from '@/lib/jsonld'
import { routes } from '@/lib/routes'
import { createPageMetadata } from '@/lib/seo'

const page = pages.classes

export const metadata = createPageMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: page.path
})

export default function ClasesDePilatesPage () {
  return (
    <SiteChrome>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Inicio', path: routes.home },
          { name: 'Clases de Pilates', path: routes.classes }
        ])}
      />
      <main>
        <PageHero
          eyebrow={page.hero.eyebrow}
          title={page.hero.title}
          description={page.hero.description}
          primary={{ href: '#asistente', label: business.cta.trial, intent: 'trial' }}
          secondary={{ href: routes.reformer, label: 'Conocer Reformer' }}
          image={images.classes.personal}
          chips={['Reformer', 'Mat', 'Personalizado']}
        />
        <Editorial
          eyebrow='Cómo elegir'
          title='No hay una clase “mejor”: hay una que se adapta a vos'
          paragraphs={[
            'En el estudio trabajamos tres modalidades: Pilates Reformer, Pilates Mat y Pilates Personalizado. Las tres apuntan a fuerza, movilidad y control, con grupos de hasta 5 alumnos o seguimiento uno a uno.',
            'Si es tu primera vez, no hace falta decidirlo todo ahora. En una clase de prueba sin cargo vemos juntas qué te queda más cómodo. Si ya sabés que te interesa la máquina, podés ir directo a Reformer.'
          ]}
          tone='cream'
        />
        <ClassGuide />
        <RelatedPages
          links={[
            { href: routes.reformer, label: 'Pilates Reformer', detail: 'Cómo es la máquina, la clase y la primera visita.' },
            { href: routes.schedule, label: 'Horarios y precios', detail: 'Consultá disponibilidad y planes.' },
            { href: routes.villaCrespo, label: 'El estudio en Villa Crespo', detail: 'Ubicación, cómo llegar y el espacio.' }
          ]}
        />
        <FinalCTA
          title='Probá una clase y después elegís con más claridad'
          description='Sin experiencia previa. Tu clase de prueba es sin cargo.'
        />
      </main>
    </SiteChrome>
  )
}
