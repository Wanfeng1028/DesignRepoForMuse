import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils.ts'

export function Pill({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full border border-black/[0.06] bg-white px-2.5 py-1 text-[13px] font-semibold text-[#11110f] shadow-[0_2px_8px_rgba(0,0,0,0.05)]',
        className,
      )}
      {...props}
    />
  )
}

export function StatusPill({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-[7px] py-[3px] text-[9px] font-semibold text-[#167b3d] bg-[#e7f8ed]',
        className,
      )}
      {...props}
    />
  )
}
