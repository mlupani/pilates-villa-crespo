'use client'

import { useEffect, useRef } from 'react'
import { usePathname } from 'next/navigation'
import { GoogleAnalytics } from '@next/third-parties/google'
import { getGaMeasurementId } from '@/lib/analytics'
import { bindClickTracking, trackPageView } from '@/lib/track'

export function Analytics () {
  const pathname = usePathname()
  const gaId = getGaMeasurementId()
  const skipInitialPageView = useRef(true)

  useEffect(() => bindClickTracking(), [])

  useEffect(() => {
    if (skipInitialPageView.current) {
      skipInitialPageView.current = false
      return
    }

    trackPageView(pathname)
  }, [pathname])

  if (!gaId) return null

  return <GoogleAnalytics gaId={gaId} />
}
