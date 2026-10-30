import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils.ts'

export function Pill({ className, ...props }: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'ab-glass inline-flex items-center gap-1 rounded-full px-2 py-1 text-[10px] font-semibold text-[#11110f]',
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
