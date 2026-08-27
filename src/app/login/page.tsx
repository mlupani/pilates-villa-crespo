import type { Metadata } from 'next'
import Link from 'next/link'
import { Logo } from '@/components/Logo'
import { business } from '@/content/business'
import { routes } from '@/lib/routes'

export const metadata: Metadata = {
  title: 'Iniciar sesión',
  description: `Iniciá sesión en ${business.name} para gestionar tus clases y reservas.`,
  robots: {
    index: false,
    follow: false
  }
}

export default function LoginPage () {
  return (
    <main className='flex min-h-dvh items-center justify-center bg-cream px-5 py-10 md:px-8 md:py-16'>
      <div className='w-full max-w-[420px]'>
        <div className='rounded-[2rem] border border-line bg-paper px-6 py-8 shadow-[0_16px_48px_rgba(31,27,24,0.08)] md:px-8 md:py-10'>
          {/* Logo arriba de "Iniciar sesión" */}
          <div className='flex flex-col items-center text-center'>
            <Link
              href={routes.home}
              aria-label={`${business.name} — Volver al inicio`}
              className='inline-flex rounded-2xl transition-opacity hover:opacity-90'
            >
              <Logo className='size-20 md:size-[84px]' priority />
            </Link>
            <p className='mt-4 text-[11px] font-semibold uppercase tracking-[0.18em] text-stone/70'>
              {business.name}
            </p>
            <h1 className='mt-2 font-display text-[28px] font-medium leading-none tracking-tight text-ink md:text-[32px]'>
              Iniciar sesión
            </h1>
            <p className='mt-2 max-w-[28ch] text-sm leading-relaxed text-stone'>
              Bienvenida de vuelta. Ingresá tus datos para continuar.
            </p>
          </div>

          <form className='mt-8 space-y-5'>
            <div className='space-y-2'>
              <label htmlFor='email' className='text-sm font-medium text-ink'>
                Email
              </label>
              <input
                id='email'
                name='email'
                type='email'
                autoComplete='email'
                required
                placeholder='tu@email.com'
                className='w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-stone/50 outline-none transition-colors focus:border-clay focus:ring-4 focus:ring-clay/15'
              />
            </div>

            <div className='space-y-2'>
              <div className='flex items-center justify-between'>
                <label htmlFor='password' className='text-sm font-medium text-ink'>
                  Contraseña
                </label>
                <Link href='#' className='text-xs font-medium text-stone underline decoration-stone/30 underline-offset-4 hover:text-ink hover:decoration-ink/30'>
                  ¿Olvidaste tu contraseña?
                </Link>
              </div>
              <input
                id='password'
                name='password'
                type='password'
                autoComplete='current-password'
                required
                placeholder='••••••••'
                className='w-full rounded-2xl border border-line bg-white px-4 py-3 text-sm text-ink placeholder:text-stone/50 outline-none transition-colors focus:border-clay focus:ring-4 focus:ring-clay/15'
              />
            </div>

            <label className='flex cursor-pointer items-center gap-2.5 py-1 text-sm text-stone'>
              <input
                type='checkbox'
                name='remember'
                className='size-4 rounded border-line text-clay focus:ring-clay/20'
              />
              Recordarme
            </label>

            <button type='submit' className='btn-primary w-full py-3.5 text-sm'>
              Ingresar
            </button>

            <p className='text-center text-sm text-stone'>
              ¿No tenés cuenta?{' '}
              <Link href='#asistente' className='font-semibold text-ink underline decoration-line underline-offset-4 hover:decoration-ink/20'>
                Escribinos
              </Link>
            </p>
          </form>
        </div>

        <p className='mt-6 text-center text-xs leading-relaxed text-stone/70'>
          <Link href={routes.home} className='font-medium text-stone underline decoration-stone/20 underline-offset-4 hover:text-ink'>
            ← Volver al inicio
          </Link>
          <span className='mx-2 opacity-40'>·</span>
          {business.local.addressFormatted}
        </p>
      </div>
    </main>
  )
}
