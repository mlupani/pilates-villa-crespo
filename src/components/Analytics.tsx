'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { bindClickTracking, trackPageView } from '@/lib/track'

export function Analytics () {
  const pathname = usePathname()
  const skipInitialPageView = useRef(true)

  useEffect(() => bindClickTracking(), [])

  useEffect(() => {
    if (skipInitialPageView.current) {
      skipInitialPageView.current = false
      return
    }

    trackPageView(pathname)
  }, [pathname])

  return null
}
