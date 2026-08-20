import Link from 'next/link'
import type { ReactNode } from 'react'

interface SmartLinkProps {
  href: string
  className?: string
  children: ReactNode
  onClick?: () => void
}

export function SmartLink ({ href, className, children, onClick }: SmartLinkProps) {
  const external = href.startsWith('http')
  const hashOnly = href.startsWith('#')

  if (external) {
    return (
      <a href={href} className={className} target='_blank' rel='noreferrer' onClick={onClick}>
        {children}
      </a>
    )
  }

  if (hashOnly) {
    return (
      <a href={href} className={className} onClick={onClick}>
        {children}
      </a>
    )
  }

  return (
    <Link href={href} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
