import { Benefits } from '@/components/Benefits'
import { ClassLinks } from '@/components/ClassGuide'
import { Editorial } from '@/components/Editorial'
import { FinalCTA } from '@/components/FinalCTA'
import { JsonLd } from '@/components/JsonLd'
import { Location } from '@/components/Location'
import { PageHero } from '@/components/PageHero'
import { RelatedPages } from '@/components/RelatedPages'
import { SiteChrome } from '@/components/SiteChrome'
import { Testimonials } from '@/components/Testimonials'
import { business } from '@/content/business'
import { images } from '@/content/images'
import { pages } from '@/content/pages'
import { getBreadcrumbJsonLd } from '@/lib/jsonld'
import { routes } from '@/lib/routes'
import { createPageMetadata } from '@/lib/seo'

const page = pages.villaCrespo

export const metadata = createPageMetadata({
  title: page.seo.title,
  description: page.seo.description,
  path: page.path
})

export default function PilatesEnVillaCrespoPage () {
  return (
    <SiteChrome>
      <JsonLd
        data={getBreadcrumbJsonLd([
          { name: 'Inicio', path: routes.home },
          { name: 'Pilates en Villa Crespo', path: routes.villaCrespo }
        ])}
      />
      <main>
        <PageHero
          eyebrow={page.hero.eyebrow}
          title={page.hero.title}
          description={page.hero.description}
          primary={{ href: '#asistente', label: business.cta.trial, intent: 'trial' }}
          secondary={{ href: routes.schedule, label: business.cta.schedule }}
          image={images.studio[0]}
          chips={['Batalla del Pari 484', 'Hasta 5 alumnos', 'Clase de prueba sin cargo']}
        />
        <Editorial
          eyebrow='El barrio'
          title='Practicar cerca de casa, sin un formato de gym'
          paragraphs={[
            `Villa Crespo tiene ritmo propio: comercial, caminable y con buena conexión. El estudio está en ${business.local.streetAddress}, a pasos de Av. Warnes y Av. Honorio Pueyrredón, para que la clase entre en el día sin una odisea.`,
            'No es un espacio anónimo. Es un estudio íntimo, con máquinas Reformer y grupos reducidos, pensado para que cada visita sea un rato para vos: moverte, acomodar la postura y salir más liviana.',
            'Si vivís o trabajás en el barrio, o llegás por Subte B, podés sumarte sin experiencia previa. La primera clase sirve para conocer el lugar, la dinámica y si el horario te queda cómodo.'
          ]}
        />
        <Location />
        <Benefits />
        <ClassLinks />
        <Testimonials />
        <RelatedPages
          links={[
            { href: routes.classes, label: 'Clases de Pilates', detail: 'Reformer, Mat o personalizado: elegí la modalidad.' },
            { href: routes.schedule, label: 'Horarios y precios', detail: 'Mirá la grilla de referencia y consultá disponibilidad.' },
            { href: routes.trial, label: 'Clase de prueba', detail: 'El paso más simple para empezar en el estudio.' }
          ]}
        />
        <FinalCTA
          title='¿Listo para probar Pilates en Villa Crespo?'
          description={`Tu clase de prueba es sin cargo. Te confirmamos el cupo y cómo llegar a ${business.local.streetAddress}.`}
        />
      </main>
    </SiteChrome>
  )
}
