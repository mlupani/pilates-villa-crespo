export const routes = {
  home: '/',
  villaCrespo: '/pilates-en-villa-crespo',
  classes: '/clases-de-pilates',
  reformer: '/pilates-reformer',
  schedule: '/horarios-y-precios',
  trial: '/clase-de-prueba'
} as const

export type AppRoute = typeof routes[keyof typeof routes]
