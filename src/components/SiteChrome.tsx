import type { ReactNode } from 'react'
import { ChatWidget } from '@/components/ChatWidget'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { cn } from '@/lib/utils'

interface SiteChromeProps {
  children: ReactNode
  variant?: 'landing' | 'page'
}

export function SiteChrome ({ children, variant = 'page' }: SiteChromeProps) {
  return (
    <>
      <Navbar variant={variant} />
      <div
        className={cn(
          variant === 'page' && 'pt-[calc(4.75rem+env(safe-area-inset-top))] md:pt-0'
        )}
      >
        {children}
      </div>
      <Footer />
      <ChatWidget />
    </>
  )
}
