import { About } from '@/components/About'
import { Benefits } from '@/components/Benefits'
import { ChatWidget } from '@/components/ChatWidget'
import { Classes } from '@/components/Classes'
import { Faq } from '@/components/FAQ'
import { FinalCTA } from '@/components/FinalCTA'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { Navbar } from '@/components/Navbar'
import { Studio } from '@/components/Studio'
import { Testimonials } from '@/components/Testimonials'

export default function Home () {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Benefits />
        <Classes />
        <Studio />
        <About />
        <Testimonials />
        <Faq />
        <FinalCTA />
      </main>
      <Footer />
      <ChatWidget />
    </>
  )
}
