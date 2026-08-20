import Image from 'next/image'
import { images } from '@/content/images'
import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  priority?: boolean
}

export function Logo ({ className, priority = false }: LogoProps) {
  return (
    <Image
      src={images.logo.src}
      alt={images.logo.alt}
      width={images.logo.width}
      height={images.logo.height}
      priority={priority}
      className={cn('object-contain', className)}
      sizes='96px'
    />
  )
}
