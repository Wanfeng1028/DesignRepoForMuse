import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Icon } from './icons'
import { ModelDots } from './Model'
import { Tabs, TabsList, TabsTrigger } from './ui/tabs'

export function ModelDot8({ color }: { color: string }) {
  // v1.5: 8px -> 7px (orig ~4-7px @390, erosion allowance; 7px is the top of range)
  return <span className="h-[7px] w-[7px] shrink-0 rounded-full" style={{ background: color }} />
}

export function ModelRow({
  name,
  desc,
  dot,
  right,
  last,
}: {
  name: string
  desc: string
  dot: string
  right: ReactNode
  last?: boolean
}) {
  return (
    <div className={cn('flex items-center gap-2.5 py-[11px]', !last && 'border-b border-dark-divider')}>
      <ModelDot8 color={dot} />
      <div className="min-w-0 flex-1">
        <div className="text-item font-semibold text-dark-text">{name}</div>
        <div className="text-secondary text-dark-sub">{desc}</div>
      </div>
      <div className="shrink-0">{right}</div>
    </div>
  )
}

export function ModelCost({ value }: { value: string }) {
  return (
    <div className="text-right">
      <div className="text-item font-bold text-dark-text">{value}</div>
      <div className="text-[11px] text-dark-sub">credits</div>
    </div>
  )
}

export function ModelSection({
  title,
  desc,
  children,
}: {
  title: string
  desc: string
  children: ReactNode
}) {
  return (
    <div className="px-5 pt-5">
      <div className="text-[15px] font-bold text-dark-text">{title}</div>
      <div className="mt-0.5 text-secondary text-dark-sub">{desc}</div>
      <div>{children}</div>
    </div>
  )
}

export function AutoCard({ recommended = true }: { recommended?: boolean }) {
  return (
    <div className="mx-5 mt-[14px] flex items-center gap-2.5 rounded-card bg-dark-row px-4 py-[13px]">
      <ModelDots />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <span className="text-[16px] font-bold text-dark-text">Auto</span>
          {recommended && (
            <span className="rounded-chip border border-dark-divider px-2 py-[1px] text-[11px] text-dark-sub">Recommended</span>
          )}
        </div>
        <div className="mt-[3px] text-secondary text-dark-sub">Picks a model for each message.</div>
      </div>
      {Icon.check('#f5f5f7')}
    </div>
  )
}

/** Thinking segmented control (Radix Tabs). No multiplier numbers are
 *  rendered under the segments: the source small print is unresolvable
 *  (see README residual). Segments and hint are props. */
export function ThinkingControl({
  segments,
  value,
  hint,
}: {
  segments: string[]
  value: string
  hint: string
}) {
  return (
    <div className="px-5 pt-5">
      <div className="text-item font-bold text-dark-text">Thinking</div>
      <Tabs value={value} className="mt-2.5">
        <TabsList className="flex w-full rounded-card bg-dark-card p-1">
          {segments.map((s) => (
            <TabsTrigger key={s} value={s}>
              {s}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>
      <div className="mt-2 text-secondary text-dark-sub">{hint}</div>
    </div>
  )
}
