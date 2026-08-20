export function cn (...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ')
}

export function formatTime (date: Date) {
  return date.toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

const dayLabels: Record<string, string> = {
  Monday: 'Lunes',
  Tuesday: 'Martes',
  Wednesday: 'Miércoles',
  Thursday: 'Jueves',
  Friday: 'Viernes',
  Saturday: 'Sábado',
  Sunday: 'Domingo'
}

export function formatOpeningDays (days: string | string[]) {
  const list = Array.isArray(days) ? days : [days]
  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday']
  const isWeekdays = weekdays.length === list.length && weekdays.every((day) => list.includes(day))

  if (isWeekdays) return 'Lunes a viernes'

  return list.map((day) => dayLabels[day] ?? day).join(', ')
}
