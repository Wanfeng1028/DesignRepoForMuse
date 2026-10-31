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

/**
 * Phone frame: 390x844 logical size, rounded bezel, status bar.
 *
 * Status bar (v1.10, C line): iOS 26 UI Kit + Figma status-bar spec
 * (baoyu-design ios-frame.jsx, 402pt frame), scaled by 390/402 = 0.9701 for
 * LAYOUT geometry. Two deliberate non-blind-copy decisions, both recorded in
 * CHANGELOG v1.10:
 * - Type sizes stay at spec values (time 17px / weight 590 / line-height
 *   22px): iOS point sizes are device-independent, scaling them to 16.5px
 *   would invent a size that exists on no iPhone.
 * - Home indicator keeps solid black: the spec's light-mode
 *   rgba(0,0,0,0.25) reads as pale grey on the #f4f4f4 canvas, while the real
 *   device indicator reads near-black; real appearance wins per task rule.
 * App Store marketing shots show no measurable status bar (angled photos,
 * bezel-cropped tops), so the spec governs here; see CHANGELOG v1.10.
 */
const SCALE = 390 / 402

export function PhoneFrame({ children, width = 390, height = 844, className, label }: PhoneFrameProps) {
  const statusPad = `${(21 * SCALE).toFixed(1)}px ${(24 * SCALE).toFixed(1)}px ${(19 * SCALE).toFixed(1)}px`
  const islandW = 126 * SCALE
  const islandH = 37 * SCALE
  const islandTop = 11 * SCALE
  const islandR = 24 * SCALE
  const sigW = 19 * SCALE
  const sigH = 12 * SCALE
  const wifiW = 17 * SCALE
  const wifiH = 12 * SCALE
  const batW = 27 * SCALE
  const batH = 13 * SCALE
  return (
    <figure className={cn('shrink-0', className)}>
      <div
        className="relative overflow-hidden bg-[#f4f4f4] shadow-[0_24px_60px_rgba(0,0,0,0.25)]"
        style={{ width, height, borderRadius: 52, border: '10px solid #1c1c1e', boxSizing: 'border-box' }}
      >
        <div className="flex h-full flex-col">
          <div
            className="relative flex items-center justify-center text-[#000]"
            style={{ gap: 154 * SCALE, padding: statusPad, boxSizing: 'border-box', width: '100%' }}
          >
            <div className="flex flex-1 items-center justify-center" style={{ height: 22, paddingTop: 1.5 }}>
              <span style={{ fontFamily: '-apple-system, "SF Pro", system-ui', fontWeight: 590, fontSize: 17, lineHeight: '22px', color: '#000' }}>13:00</span>
            </div>
            <span
              className="absolute left-1/2 -translate-x-1/2 rounded-full bg-black"
              style={{ width: islandW, height: islandH, top: islandTop, borderRadius: islandR }}
              aria-hidden
            />
            <div className="flex flex-1 items-center justify-center" style={{ height: 22, gap: 7 * SCALE, paddingTop: 1, paddingRight: 1 }}>
              <svg width={sigW} height={sigH} viewBox="0 0 19 12" aria-hidden>
                <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill="#000" />
                <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill="#000" />
                <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill="#000" />
                <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill="#000" />
              </svg>
              <svg width={wifiW} height={wifiH} viewBox="0 0 17 12" aria-hidden>
                <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill="#000" />
                <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill="#000" />
                <circle cx="8.5" cy="10.5" r="1.5" fill="#000" />
              </svg>
              <svg width={batW} height={batH} viewBox="0 0 27 13" aria-hidden>
                <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="#000" strokeOpacity="0.35" fill="none" />
                <rect x="2" y="2" width="20" height="9" rx="2" fill="#000" />
                <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill="#000" fillOpacity="0.4" />
              </svg>
            </div>
          </div>
          <div className="flex min-h-0 flex-1 flex-col">{children}</div>
        </div>
        {/* iOS Home indicator (system chrome, not app UI): spec 139x5 at 402,
            scaled by 0.9701 -> 134.8, rendered 135x5; 8px above the inner-screen
            bottom (spec paddingBottom 8), overlays content like the real one.
            Colour kept solid black (see header comment: spec 0.25 reads pale
            grey on this canvas, real device reads near-black). */}
        <div className="pointer-events-none absolute bottom-2 left-1/2 z-50 h-[5px] w-[135px] -translate-x-1/2 rounded-full bg-black" aria-hidden />
      </div>
      {label ? <figcaption className="mt-4 text-center text-xs text-neutral-500">{label}</figcaption> : null}
    </figure>
  )
}
