import { AtmosphereMarquee } from '@/components/AtmosphereMarquee'
import { Benefits } from '@/components/Benefits'
import { Classes } from '@/components/Classes'
import { Community } from '@/components/Community'
import { Convert } from '@/components/Convert'
import { Faq } from '@/components/FAQ'
import { FinalCTA } from '@/components/FinalCTA'
import { FirstTime } from '@/components/FirstTime'
import { Hero } from '@/components/Hero'
import { JsonLd } from '@/components/JsonLd'
import { Location } from '@/components/Location'
import { Offer } from '@/components/Offer'
import { ReformerIntro } from '@/components/ReformerIntro'
import { SiteChrome } from '@/components/SiteChrome'
import { Studio } from '@/components/Studio'
import { Testimonials } from '@/components/Testimonials'
import { business } from '@/content/business'
import { getFaqJsonLd } from '@/lib/jsonld'
import { createPageMetadata } from '@/lib/seo'

export const metadata = createPageMetadata({
  title: business.seo.title,
  description: business.seo.description,
  path: '/',
  absoluteTitle: true
})

export default function Home () {
  return (
    <SiteChrome variant='landing'>
      <JsonLd data={getFaqJsonLd()} />
      <main>
        <Hero />
        <Benefits />
        <AtmosphereMarquee />
        <FirstTime />
        <Classes />
        <ReformerIntro />
        <Studio />
        <Community />
        <Location trialHref='#asistente' />
        <Testimonials />
        <Offer />
        <Convert />
        <Faq />
        <FinalCTA />
      </main>
    </SiteChrome>
  )
}
