'use client'

import { useState, useSyncExternalStore } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/Logo'
import { business } from '@/content/business'
import { cn } from '@/lib/utils'

const SCROLL_SHOW_AT = 16

function subscribeScroll (onStoreChange: () => void) {
  window.addEventListener('scroll', onStoreChange, { passive: true })
  return () => window.removeEventListener('scroll', onStoreChange)
}

function getScrollSnapshot () {
  return window.scrollY > SCROLL_SHOW_AT
}

function getScrollServerSnapshot () {
  return false
}

export function Navbar () {
  const [open, setOpen] = useState(false)
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    getScrollSnapshot,
    getScrollServerSnapshot
  )
  const visible = scrolled || open

  return (
    <header
      className={cn(
        'z-40 border-b bg-cream/85 pt-[env(safe-area-inset-top)] backdrop-blur-md',
        'fixed inset-x-0 top-0 md:sticky',
        'transition-[transform,opacity] duration-400 ease-soft',
        'motion-reduce:transition-none',
        visible
          ? 'translate-y-0 border-line opacity-100'
          : 'pointer-events-none -translate-y-full border-transparent opacity-0 md:pointer-events-auto md:translate-y-0 md:border-line md:opacity-100'
      )}
    >
      <nav className='mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5 md:px-8'>
        <a href='#inicio' className='block h-16 w-16 shrink-0 md:h-[4.75rem] md:w-[4.75rem]' aria-label='Pilates Villa Crespo'>
          <Logo priority className='size-full' />
        </a>

        <ul className='hidden items-center gap-8 text-sm text-stone md:flex'>
          {business.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className='transition-colors duration-300 hover:text-ink'
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className='flex items-center gap-3'>
          <a href='#reservar' className='btn-primary hidden px-5 py-2.5 text-[13px] md:inline-flex'>
            Reservar una clase
          </a>
          <button
            type='button'
            className='inline-flex size-10 items-center justify-center rounded-full border border-line text-ink md:hidden'
            aria-expanded={open}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </nav>

      <div
        className={cn(
          'border-t border-line bg-cream md:hidden',
          open ? 'block' : 'hidden'
        )}
        hidden={!open}
      >
        <ul className='flex flex-col gap-1 px-5 py-4 text-sm'>
          {business.nav.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className='block rounded-xl px-3 py-3 text-stone transition-colors hover:bg-sand/50 hover:text-ink'
                onClick={() => setOpen(false)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href='#reservar'
              className='btn-primary mt-2 w-full'
              onClick={() => setOpen(false)}
            >
              Reservar una clase
            </a>
          </li>
        </ul>
      </div>
    </header>
  )
}
