import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { Icon } from './icons'

export function Radio({ selected }: { selected?: boolean }) {
  return (
    <span
      className={cn(
        'flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2',
        selected ? 'border-dark-text' : 'border-dark-sub',
      )}
    >
      {selected && <span className="h-2.5 w-2.5 rounded-full bg-dark-text" />}
    </span>
  )
}

export function PlanCard({
  name,
  monthly,
  yearly,
  selected,
  badge,
  children,
}: {
  name: string
  monthly: string
  yearly: string
  selected?: boolean
  badge?: string
  children?: ReactNode
}) {
  return (
    <div className="mt-2.5 rounded-card border border-transparent bg-dark-card px-4 py-[14px]">
      <div className="flex items-center gap-2.5">
        <Radio selected={selected} />
        <span className="text-[16px] font-bold">{name}</span>
        {badge && (
          <span className="rounded-[12px] bg-dark-text px-2 py-[3px] text-[11px] font-bold text-light-text">{badge}</span>
        )}
        <span className="ml-auto text-right">
          <span className="block text-[16px] font-bold">{monthly}</span>
          <span className="mt-0.5 block text-caption text-dark-sub">{yearly}</span>
        </span>
      </div>
      {children}
    </div>
  )
}

export function PlanFeature({ text }: { text: string }) {
  return (
    <div className="ml-[30px] mt-2 flex gap-2 text-[13px] leading-[1.45]">
      <span className="shrink-0">{Icon.check('#f5f5f7', 16)}</span>
      <span>{text}</span>
    </div>
  )
}

export function BillingToggle({ monthlyLabel, yearlyLabel, saveLabel }: { monthlyLabel: string; yearlyLabel: string; saveLabel: string }) {
  return (
    <div className="flex rounded-button bg-dark-input p-1">
      <span className="flex-1 py-[9px] text-center text-[14px] font-semibold text-dark-sub">{monthlyLabel}</span>
      <span className="flex flex-1 items-center justify-center gap-1.5 rounded-chip bg-dark-text py-[9px] text-[14px] font-bold text-light-text">
        {yearlyLabel}
        <span className="rounded-[10px] bg-accent px-[7px] py-[2px] text-[11px] font-bold text-white">{saveLabel}</span>
      </span>
    </div>
  )
}
