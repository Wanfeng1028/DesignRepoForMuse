import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

function SignalIcon({ dark }: { dark: boolean }) {
  const c = dark ? '#f5f5f7' : '#17181c'
  return (
    <svg width="18" height="12" viewBox="0 0 18 12" fill={c} aria-hidden>
      <rect x="0" y="7" width="2.5" height="5" rx="1" />
      <rect x="4.5" y="5" width="2.5" height="7" rx="1" />
      <rect x="9" y="2" width="2.5" height="10" rx="1" />
      <rect x="13.5" y="0" width="2.5" height="12" rx="1" />
    </svg>
  )
}

function WifiIcon({ dark }: { dark: boolean }) {
  const c = dark ? '#f5f5f7' : '#17181c'
  return (
    <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke={c} strokeWidth="1.4" strokeLinecap="round" aria-hidden>
      <path d="M1 4.5C4 1.5 12 1.5 15 4.5" />
      <path d="M3.5 7.5C5.5 5.5 10.5 5.5 12.5 7.5" />
      <circle cx="8" cy="10.2" r="1.1" fill={c} stroke="none" />
    </svg>
  )
}

function BatteryIcon({ dark }: { dark: boolean }) {
  const c = dark ? '#f5f5f7' : '#17181c'
  return (
    <svg width="25" height="12" viewBox="0 0 25 12" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="21" height="11" rx="3.5" fill={c} />
      <path d="M23 4v4a2.2 2.2 0 0 0 0-4z" fill={c} />
    </svg>
  )
}

export function StatusBar({ dark, time = '10:24' }: { dark: boolean; time?: string }) {
  return (
    <div className={cn('flex h-11 shrink-0 items-center justify-between px-6 pl-7 text-status font-semibold', dark ? 'text-dark-text' : 'text-light-text')}>
      <span>{time}</span>
      <span className="flex items-center gap-1.5">
        <SignalIcon dark={dark} />
        <WifiIcon dark={dark} />
        <BatteryIcon dark={dark} />
      </span>
    </div>
  )
}

export function HomeIndicator({ dark }: { dark: boolean }) {
  return (
    <div className="flex h-5 shrink-0 items-center justify-center">
      <div className={cn('h-[5px] w-[134px] rounded-full', dark ? 'bg-[#3a3b40]' : 'bg-[#c9cacc]')} />
    </div>
  )
}

export function Phone({
  theme,
  children,
  className,
}: {
  theme: 'dark' | 'light'
  children: ReactNode
  className?: string
}) {
  const dark = theme === 'dark'
  return (
    <div
      className={cn(
        'phone-frame flex h-[852px] w-[390px] shrink-0 flex-col overflow-hidden rounded-phone border-2 border-[#1c1c1e] font-sans shadow-[0_12px_40px_rgba(0,0,0,0.45)]',
        dark ? 'bg-dark-bg text-dark-text' : 'bg-light-bg text-light-text',
        className,
      )}
    >
      <StatusBar dark={dark} />
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <HomeIndicator dark={dark} />
    </div>
  )
}
