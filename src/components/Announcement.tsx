import { SmartLink } from '@/components/SmartLink'
import { business } from '@/content/business'
import { cn } from '@/lib/utils'

interface AnnouncementProps {
  className?: string
}

export function Announcement ({ className }: AnnouncementProps) {
  const { announcement } = business
  if (!announcement.enabled) return null

  const content = (
    <span className='block px-5 py-2 text-center text-[11px] font-medium uppercase tracking-[0.16em] text-olive md:px-8'>
      {announcement.text}
    </span>
  )

  return (
    <div className={cn('border-b border-line bg-sand/90', className)}>
      {announcement.href
        ? (
          <SmartLink href={announcement.href} intent={announcement.intent} className='block transition-colors hover:bg-sand'>
            {content}
          </SmartLink>
          )
        : content}
    </div>
  )
}
