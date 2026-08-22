import Image from 'next/image'
import { business } from '@/content/business'
import { images } from '@/content/images'

export function Community () {
  const { community } = business

  return (
    <section className='bg-cream px-5 pb-20 md:px-8 md:pb-28'>
      <div className='mx-auto grid max-w-6xl items-center gap-10 lg:grid-cols-[0.9fr_1.1fr]'>
        <div className='reveal'>
          <p className='text-xs font-semibold uppercase tracking-[0.28em] text-olive'>
            {community.eyebrow}
          </p>
          <h2 className='mt-4 font-display text-4xl font-semibold leading-tight text-ink md:text-5xl'>
            {community.title}
          </h2>
          <p className='mt-5 max-w-md text-base leading-relaxed text-stone'>
            {community.description}
          </p>
          <a
            href={business.instagramUrl}
            target='_blank'
            rel='noreferrer'
            className='btn-outline mt-8'
          >
            {community.cta}
          </a>
        </div>

        <div className='reveal grid grid-cols-3 gap-3 pt-8 md:gap-4 md:pt-12'>
          {images.community.map((post, index) => (
            <a
              key={post.src}
              href={business.instagramUrl}
              target='_blank'
              rel='noreferrer'
              className={`img-zoom relative aspect-[3/4] overflow-hidden rounded-[1.2rem] md:rounded-[1.5rem] ${index === 1 ? '-translate-y-4 md:-translate-y-8' : ''} ${index === 2 ? 'translate-y-3 md:translate-y-6' : ''}`}
            >
              <Image
                src={post.src}
                alt={post.alt}
                fill
                sizes='(max-width: 768px) 30vw, 18vw'
                quality={65}
                className='object-cover'
              />
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
