'use client'

import { sendGAEvent } from '@next/third-parties/google'
import {
  classifyClick,
  getGaMeasurementId,
  type AnalyticsEventName,
  type AnalyticsParams
} from '@/lib/analytics'

const DEDUPE_WINDOW_MS = 800

interface DedupeEntry {
  key: string
  at: number
}

let lastEvent: DedupeEntry | null = null

function compactParams (params: AnalyticsParams) {
  return Object.fromEntries(
    Object.entries(params).filter(([, value]) => value !== undefined && value !== '')
  )
}

function contextParams (): Pick<AnalyticsParams, 'page_path' | 'page_title'> {
  if (typeof window === 'undefined') return {}

  return {
    page_path: window.location.pathname,
    page_title: document.title
  }
}

function shouldSkip (key: string) {
  const now = Date.now()
  if (lastEvent && lastEvent.key === key && now - lastEvent.at < DEDUPE_WINDOW_MS) {
    return true
  }

  lastEvent = { key, at: now }
  return false
}

export function track (name: AnalyticsEventName, params: AnalyticsParams = {}) {
  if (typeof window === 'undefined') return
  if (!getGaMeasurementId()) return

  const payload = compactParams({
    ...contextParams(),
    ...params
  })
  const key = [name, payload.page_path, payload.link_url, payload.source, payload.lead_type]
    .filter(Boolean)
    .join('|')

  if (shouldSkip(key)) return

  sendGAEvent('event', name, payload)
}

export function trackPageView (pathname: string) {
  if (!getGaMeasurementId()) return
  sendGAEvent('event', 'page_view', compactParams({
    page_path: pathname,
    page_title: typeof document === 'undefined' ? undefined : document.title
  }))
}

export function bindClickTracking () {
  function onClick (event: MouseEvent) {
    const target = (event.target as HTMLElement | null)?.closest('a')
    if (!target) return
    if (target.dataset.track === 'off') return

    const href = target.getAttribute('href')
    if (!href) return

    const classified = classifyClick(href)
    if (!classified) return

    const socialContact = classified.params.contact_method
    if (
      classified.name === 'click_contacto' &&
      (socialContact === 'instagram' || socialContact === 'facebook' || socialContact === 'google') &&
      !target.closest('footer, address, #contacto, #ubicacion')
    ) {
      return
    }

    const section = target.closest('[id]')?.id
    const linkText = (target.innerText || target.getAttribute('aria-label') || '')
      .replace(/\s+/g, ' ')
      .trim()
      .slice(0, 80)

    track(classified.name, {
      ...classified.params,
      link_url: href,
      link_text: linkText,
      section
    })
  }

  document.addEventListener('click', onClick, true)
  return () => document.removeEventListener('click', onClick, true)
}
