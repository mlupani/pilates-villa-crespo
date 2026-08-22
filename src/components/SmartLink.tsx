import Link from 'next/link'
import type { ReactNode } from 'react'
import { assistantIntents, type AssistantIntent } from '@/lib/assistant'

interface SmartLinkProps {
  href: string
  className?: string
  children: ReactNode
  onClick?: () => void
  intent?: AssistantIntent
}

export function SmartLink ({ href, className, children, onClick, intent }: SmartLinkProps) {
  const message = intent ? assistantIntents[intent] : undefined
  const resolvedHref = intent ? '#asistente' : href
  const external = resolvedHref.startsWith('http')
  const hashOnly = resolvedHref.startsWith('#')

  if (external) {
    return (
      <a href={resolvedHref} className={className} target='_blank' rel='noreferrer' onClick={onClick}>
        {children}
      </a>
    )
  }

  if (hashOnly) {
    return (
      <a
        href={resolvedHref}
        className={className}
        data-intent={message}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }

  return (
    <Link href={resolvedHref} className={className} onClick={onClick}>
      {children}
    </Link>
  )
}
