import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/utils.ts'

export function Card({ className, ...props }: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('bg-white border border-black/[0.06] shadow-[0_5px_16px_rgba(0,0,0,0.025)] rounded-[20px]', className)}
      {...props}
    />
  )
}
