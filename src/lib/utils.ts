export function cn (...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function formatTime (date: Date) {
  return date.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}
