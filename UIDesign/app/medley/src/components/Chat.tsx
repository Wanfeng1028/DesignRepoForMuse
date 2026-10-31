import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Icon } from './icons'
import { ModelDot } from './Model'

export function UserBubble({ dark, children, className }: { dark: boolean; children: ReactNode; className?: string }) {
  return (
    <div className="my-2 flex justify-end">
      <div
        className={cn(
          // v1.9 glass: backdrop blur 50px + saturate 1.8 assigned to the
          // bubble material. Under the measured opaque fills this is a
          // no-op in a static shot (fills stay exactly #191a1e / #edeef0);
          // it is recorded here so the material is glass in live use
          // rather than a second solid. No translucency, no extra shadow:
          // bubbles are message content, and iOS 27's own placement rule
          // keeps glass off content backgrounds.
          'max-w-[85%] rounded-bubble rounded-tr-[6px] px-4 py-3 text-body leading-[1.35] backdrop-blur-[50px] backdrop-saturate-[1.8]',
          dark ? 'bg-dark-bubble text-dark-text' : 'bg-light-bubble text-light-text',
          className,
        )}
      >
        {children}
      </div>
    </div>
  )
}

export function AiMeta({
  dark,
  model,
  sub,
  dot = true,
}: {
  dark: boolean
  model: string
  sub?: string
  /** v1.5: lisbon-cn orig has NO dot on either AiMeta row (en orig has dots);
   *  the two screens must not share one dot logic, so cn passes dot={false}. */
  dot?: boolean
}) {
  return (
    <div className="my-4 mb-2">
      <div className={cn('flex items-center gap-1.5 text-[12px] font-semibold', dark ? 'text-dark-text' : 'text-light-text')}>
        {dot && <ModelDot model={model} />}
        {model}
      </div>
      {sub && (
        <div className={cn('mt-1 flex items-center gap-1.5 text-[12px]', dark ? 'text-dark-sub' : 'text-light-sub')}>
          <span>{sub}</span>
          {Icon.chevronRight(dark ? '#9a9ba2' : '#6b6c72', 14)}
        </div>
      )}
    </div>
  )
}

export function ActionRow({ dark, credits }: { dark: boolean; credits?: string }) {
  const c = dark ? '#9a9ba2' : '#6b6c72'
  return (
    <div className="my-3 flex items-center gap-4">
      {credits ? (
        <span className={cn('mr-auto text-[13px]', dark ? 'text-dark-sub' : 'text-light-sub')}>{credits}</span>
      ) : (
        <span className="mr-auto" />
      )}
      {Icon.copy(c)}
      {Icon.refresh(c)}
      {Icon.like(c)}
      {Icon.dislike(c)}
      {Icon.more(c)}
    </div>
  )
}

export function SuggestionRow({
  dark,
  icon,
  text,
  badge,
}: {
  dark: boolean
  icon: ReactNode
  text: string
  badge?: string
}) {
  return (
    <div
      className={cn(
        'flex items-center gap-3 border-b py-3 text-item font-medium',
        dark ? 'border-dark-divider text-dark-text' : 'border-light-divider text-light-text',
      )}
    >
      <span className={cn('flex', dark ? 'text-dark-sub' : 'text-light-sub')}>{icon}</span>
      <span className="flex-1">{text}</span>
      {badge && (
        <span
          className={cn(
            'rounded-[6px] border px-1.5 py-0.5 text-[11px] font-bold',
            dark ? 'border-dark-divider text-dark-sub' : 'border-light-divider text-light-sub',
          )}
        >
          {badge}
        </span>
      )}
    </div>
  )
}

/** Sources chip: badge letters are props (Lisbon T/L/V confirmed; train
 *  letters unresolvable, so that screen passes empty badges). */
export function SourcesChip({
  dark,
  badges,
  countLabel,
  className,
}: {
  dark: boolean
  badges: string[]
  countLabel: string
  className?: string
}) {
  return (
    <div
      className={cn(
        'mt-[14px] inline-flex items-center gap-1 rounded-chip border px-3 py-[5px] text-caption',
        dark ? 'border-dark-divider text-dark-sub' : 'border-light-divider text-light-sub',
        className,
      )}
    >
      {badges.map((b) => (
        <span
          key={b}
          className={cn(
            'inline-flex h-4 w-4 shrink-0 items-center justify-center rounded text-[10px] font-bold',
            dark ? 'bg-dark-row text-dark-text' : 'bg-light-bubble text-light-text',
          )}
        >
          {b}
        </span>
      ))}
      <span className="ml-1">{countLabel}</span>
    </div>
  )
}
