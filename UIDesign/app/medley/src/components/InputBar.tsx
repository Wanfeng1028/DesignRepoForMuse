import { cn } from '../lib/utils'
import { Icon } from './icons'

export type MicVariant = 'circle' | 'plain' | 'stop' | 'stop-accent'

export function InputBar({
  dark,
  placeholder,
  modelLabel,
  sendDark,
  mic = 'circle',
}: {
  dark: boolean
  placeholder: string
  modelLabel?: string
  sendDark?: boolean
  mic?: MicVariant
}) {
  const sub = dark ? '#9a9ba2' : '#6b6c72'
  const dim = dark ? '#6b6c72' : '#9a9ba2'
  return (
    <div className="shrink-0 px-4 pt-3">
      <div
        className={cn(
          'flex h-[52px] items-center gap-2.5 rounded-input py-0 pl-[14px] pr-2',
          dark ? 'bg-dark-input' : 'border border-light-divider bg-white shadow-[0_2px_12px_rgba(0,0,0,0.06)]',
        )}
      >
        <span className="flex text-dark-sub">{Icon.plus(sub)}</span>
        <span className="flex-1 text-[15px]" style={{ color: dim }}>
          {placeholder}
        </span>
        {modelLabel && (
          <span
            className={cn(
              'inline-flex items-center gap-1 rounded-[16px] px-2.5 py-1.5 text-[13px] font-semibold',
              dark ? 'bg-dark-row text-dark-sub' : 'bg-light-bubble text-light-sub',
            )}
          >
            {modelLabel}
            {Icon.chevronDown(sub, 14)}
          </span>
        )}
        {mic === 'plain' ? (
          <span className="flex shrink-0 pr-1.5">{Icon.mic(sub)}</span>
        ) : mic === 'stop' ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white">
            <span className="h-3 w-3 rounded-[2px] bg-[#111214]" />
          </span>
        ) : mic === 'stop-accent' ? (
          <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-accent">
            <span className="h-3 w-3 rounded-[2px] bg-[#111214]" />
          </span>
        ) : (
          <span
            className={cn('flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white', sendDark ? 'bg-black-btn' : dark ? 'bg-accent' : 'bg-black-btn')}
          >
            {Icon.mic('#ffffff')}
          </span>
        )}
      </div>
    </div>
  )
}
