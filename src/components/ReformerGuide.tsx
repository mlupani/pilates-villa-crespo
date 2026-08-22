import Image from 'next/image'
import { images } from '@/content/images'
import { reformerGuide } from '@/content/pages'
import { routes } from '@/lib/routes'
import { business } from '@/content/business'
import { SmartLink } from '@/components/SmartLink'

const blocks = [
  { title: 'Qué es Pilates Reformer', paragraphs: reformerGuide.what },
  { title: 'Cómo son las clases', paragraphs: reformerGuide.how },
  { title: 'Para quién puede ser adecuado', paragraphs: reformerGuide.who },
  { title: 'Qué esperar en una primera clase', paragraphs: reformerGuide.firstClass }
]

export function ReformerGuide () {
  const photos = [images.classes.reformer, images.studio[0], images.studio[2]]

  return (
    <section className='bg-paper px-5 py-20 md:px-8 md:py-28'>
      <div className='mx-auto grid max-w-6xl gap-14 lg:grid-cols-[1.05fr_0.95fr]'>
        <div className='space-y-12'>
          {blocks.map((block) => (
            <article key={block.title} className='reveal border-t border-line pt-8'>
              <h2 className='font-display text-3xl font-semibold text-ink md:text-4xl'>
                {block.title}
              </h2>
              {block.paragraphs.map((paragraph) => (
                <p key={paragraph} className='mt-4 text-base leading-relaxed text-stone'>
                  {paragraph}
                </p>
              ))}
            </article>
          ))}
          <div className='flex flex-col gap-3 sm:flex-row'>
            <SmartLink href='#asistente' intent='trial' className='btn-primary'>
              {business.cta.trial}
            </SmartLink>
            <SmartLink href={routes.schedule} className='btn-outline'>
              {business.cta.schedule}
            </SmartLink>
          </div>
        </div>

        <div className='grid gap-3 sm:grid-cols-2 lg:grid-cols-1'>
          {photos.map((photo) => (
            <div key={photo.src} className='img-zoom relative aspect-[4/5] overflow-hidden rounded-[1.5rem]'>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes='(max-width: 1024px) 50vw, 32vw'
                quality={70}
                className='object-cover'
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
