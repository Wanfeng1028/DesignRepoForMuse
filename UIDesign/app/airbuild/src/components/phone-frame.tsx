import type { ReactNode } from 'react'
import { cn } from '../lib/utils.ts'

export type PhoneFrameProps = {
  children: ReactNode
  /** logical phone width; gallery default 390, wide check 430 */
  width?: number
  height?: number
  className?: string
  label?: string
}

/** Phone frame: 390x844 logical size, rounded bezel, status bar. */
export function PhoneFrame({ children, width = 390, height = 844, className, label }: PhoneFrameProps) {
  return (
    <figure className={cn('shrink-0', className)}>
      <div
        className="relative overflow-hidden bg-[#f4f4f4] shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
        style={{ width, height, borderRadius: 52, border: '10px solid #1c1c1e', boxSizing: 'border-box' }}
      >
        <div className="flex h-full flex-col">
          <div className="relative flex items-center justify-between px-7 pt-3 pb-1 text-[13px] font-semibold text-[#11110f]">
            <span>13:00</span>
            <span className="absolute left-1/2 top-2.5 h-[26px] w-[110px] -translate-x-1/2 rounded-full bg-black" aria-hidden />
            <span className="flex items-end gap-1" aria-hidden>
              <span className="flex items-end gap-[2px]"><span className="block w-[3px] rounded-[1px] bg-black" style={{ height: 4 }} /><span className="block w-[3px] rounded-[1px] bg-black" style={{ height: 6 }} /><span className="block w-[3px] rounded-[1px] bg-black" style={{ height: 8 }} /><span className="block w-[3px] rounded-[1px] bg-black" style={{ height: 10 }} /></span>
              <svg className="ml-1" width="16" height="11" viewBox="0 0 16 11" aria-hidden>
                <path d="M1.5 8.5a9 9 0 0 1 13 0" fill="none" stroke="black" strokeWidth="1.6" strokeLinecap="round" />
                <path d="M4 6a5.5 5.5 0 0 1 8 0" fill="none" stroke="black" strokeWidth="1.6" strokeLinecap="round" />
                <circle cx="8" cy="4" r="1.3" fill="black" />
              </svg>
              <span className="ml-1 inline-block h-[11px] w-[22px] rounded-[3px] border border-black/40 px-[2px]"><span className="block h-full w-3/4 rounded-[1px] bg-black/80" /></span>
            </span>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </div>
      </div>
      {label ? <figcaption className="mt-4 text-center text-xs text-neutral-500">{label}</figcaption> : null}
    </figure>
  )
}
