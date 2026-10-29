import type { ReactNode } from 'react'
import { cn } from '../../lib/utils.ts'

export function StatusPill({ children, tone = 'success', className }: { children: ReactNode; tone?: 'success' | 'neutral'; className?: string }) {
  return (
    <span className={cn('inline-flex items-center rounded-full text-[9px] leading-none', className)}
      style={{ padding: '3px 7px', background: tone === 'success' ? '#e7f8ed' : 'rgba(17,17,15,0.06)', color: tone === 'success' ? '#167b3d' : 'rgba(17,17,15,0.6)' }}>
      {children}
    </span>
  )
}
