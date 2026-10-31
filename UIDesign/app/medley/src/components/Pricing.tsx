import type { ReactNode } from 'react'
import { useState } from 'react'
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
    <div className="mt-2.5 rounded-card border border-transparent bg-dark-card px-4 py-3">
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
  // v1.5: 13px -> 12px. The orig Pro feature line is single-line; at 13px the
  // VM's wider Noto font wraps "K3" onto a second line (278px vs 264px text
  // width). 12px fits single-line in the VM (257px); the orig device font
  // size for this line was never pixel-measured, so this is recorded as a
  // VM-metric accommodation, not a confirmed orig size.
  return (
    <div className="ml-[30px] mt-1.5 flex gap-2 text-[12px] leading-[1.45]">
      <span className="shrink-0">{Icon.check('#f5f5f7', 16)}</span>
      <span>{text}</span>
    </div>
  )
}

/**
 * v1.9 interaction line: the billing period is a segmented control, not a
 * static label. Default is yearly (matches the reference, where Yearly is
 * selected). The indicator is an absolutely-positioned pill that slides
 * on the iOS curve; in the default yearly state its geometry equals the
 * old static yearly span exactly, so verification shots are unchanged.
 */
export function BillingToggle({ monthlyLabel, yearlyLabel, saveLabel }: { monthlyLabel: string; yearlyLabel: string; saveLabel: string }) {
  const [billing, setBilling] = useState<'monthly' | 'yearly'>('yearly')
  return (
    <div className="relative flex rounded-button bg-dark-input p-1">
      <span
        aria-hidden
        className="absolute bottom-1 top-1 w-[calc(50%-4px)] rounded-chip bg-dark-pill transition-transform duration-300 ease-[cubic-bezier(0.32,0.72,0,1)]"
        style={{ transform: billing === 'yearly' ? 'translateX(100%)' : 'translateX(0)' }}
      />
      <button
        data-testid="billing-monthly"
        onClick={() => setBilling('monthly')}
        className={`relative flex-1 py-[9px] text-center text-[14px] transition-all duration-200 active:scale-[0.98] ${billing === 'monthly' ? 'font-bold text-white' : 'font-semibold text-dark-sub'}`}
      >
        {monthlyLabel}
      </button>
      <button
        data-testid="billing-yearly"
        onClick={() => setBilling('yearly')}
        className={`relative flex flex-1 items-center justify-center gap-1.5 py-[9px] text-[14px] transition-all duration-200 active:scale-[0.98] ${billing === 'yearly' ? 'font-bold text-white' : 'font-semibold text-dark-sub'}`}
      >
        {yearlyLabel}
        <span className="text-[11px] font-semibold text-dark-sub">{saveLabel}</span>
      </button>
    </div>
  )
}
