import type { ReactNode } from 'react'
import { cn } from '../lib/utils'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { BrandDots, ModelDot } from './Model'
import { Icon } from './icons'

export function TopBar({
  dark,
  left,
  center,
  right,
}: {
  dark: boolean
  left?: ReactNode
  center?: ReactNode
  right?: ReactNode
}) {
  return (
    <div className={cn('flex h-12 shrink-0 items-center justify-between px-6', dark ? 'text-dark-text' : 'text-light-text')}>
      <div className="flex w-[72px] items-center">{left}</div>
      <div className="flex flex-1 items-center justify-center">{center}</div>
      <div className="flex w-[72px] items-center justify-end gap-4">{right}</div>
    </div>
  )
}

/** Auto model pill. The menu is a real Radix dropdown (closed by default,
 *  so the static screen matches the collage); options are props, not copy. */
export function ModelPill({
  dark,
  label,
  options = [],
}: {
  dark: boolean
  label: string
  options?: string[]
}) {
  const sub = dark ? '#9a9ba2' : '#6b6c72'
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          type="button"
          className={cn(
            'inline-flex items-center gap-1.5 rounded-chip px-3 py-[7px] text-[14px] font-semibold',
            dark ? 'bg-dark-input text-dark-text' : 'bg-light-bubble text-light-text',
          )}
        >
          {label === 'Auto' || label === '自动' ? <BrandDots size={6} /> : <ModelDot model={label} size={8} />}
          {label}
          <span className="morph-chevron flex">{Icon.chevronDown(sub)}</span>
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {[label, ...options].map((o) => (
          <DropdownMenuItem key={o}>{o}</DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
