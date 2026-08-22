import type { ReactNode } from 'react'
import { ChatWidget } from '@/components/ChatWidget'
import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { business } from '@/content/business'
import { cn } from '@/lib/utils'

interface SiteChromeProps {
  children: ReactNode
  variant?: 'landing' | 'page'
}

export function SiteChrome ({ children, variant = 'page' }: SiteChromeProps) {
  const announcement = business.announcement.enabled

  return (
    <>
      <Navbar variant={variant} />
      <div
        className={cn(
          variant === 'page' && (announcement
            ? 'pt-[calc(7.25rem+env(safe-area-inset-top))] md:pt-0'
            : 'pt-[calc(5.25rem+env(safe-area-inset-top))] md:pt-0')
        )}
      >
        {children}
      </div>
      <Footer />
      <ChatWidget />
    </>
  )
}
