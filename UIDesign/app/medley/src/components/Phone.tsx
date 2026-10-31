import type { ReactNode } from 'react'
import { cn } from '../lib/utils'

/**
 * v1.9 status-bar glyphs: redrawn from the iOS 26 UI Kit / Figma status bar
 * spec (baoyu-design ios-frame.jsx, 402pt frame), scaled x0.9701 to this
 * 390pt set. Rendered sizes: signal 18.4x11.6, wifi 16.5x11.6, battery
 * 26.2x12.6; cluster gap 6.8px. Paths are verbatim from the spec.
 * Deliberate deviations from the spec, decided on photo evidence (see
 * CHANGELOG v1.9): the spec frame's 21/24/19px padding (bar total ~61px)
 * does NOT match this app's screenshots — status ink top measures
 * ~14px and the TopBar ink top ~52-54px in the HD strips, which fit a
 * 37px bar, not a 61px one. So the glyph SHAPES follow the spec but the
 * bar height stays app-measured (37px, was 32px) and the time stays at
 * the 13px token: the spec's 17px time measures 48.7px wide / 12.1px cap
 * in SF Pro Text, while both originals measure ~35px wide / ~9px cap,
 * which is the 13px token (37.2px wide / 9.3px cap). Time weight 590 in
 * the spec resolves to the 600 Semibold static font here, so
 * font-semibold is kept.
 */
function SignalIcon({ dark }: { dark: boolean }) {
  const c = dark ? '#f5f5f7' : '#17181c'
  return (
    <svg width="18.4" height="11.6" viewBox="0 0 19 12" fill={c} aria-hidden>
      <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" />
      <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" />
      <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" />
      <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" />
    </svg>
  )
}

function WifiIcon({ dark }: { dark: boolean }) {
  const c = dark ? '#f5f5f7' : '#17181c'
  return (
    <svg width="16.5" height="11.6" viewBox="0 0 17 12" fill={c} aria-hidden>
      <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" />
      <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" />
      <circle cx="8.5" cy="10.5" r="1.5" />
    </svg>
  )
}

function BatteryIcon({ dark }: { dark: boolean }) {
  const c = dark ? '#f5f5f7' : '#17181c'
  return (
    <svg width="26.2" height="12.6" viewBox="0 0 27 13" fill="none" aria-hidden>
      <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke={c} strokeOpacity="0.35" fill="none" />
      <rect x="2" y="2" width="20" height="9" rx="2" fill={c} />
      <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill={c} fillOpacity="0.4" />
    </svg>
  )
}

export function StatusBar({ dark, time = '10:24' }: { dark: boolean; time?: string }) {
  return (
    <div className={cn('relative z-10 flex h-[37px] shrink-0 items-center justify-between pl-7 pr-8 text-status font-semibold', dark ? 'text-dark-text' : 'text-light-text')}>
      <span>{time}</span>
      <span className="flex items-center gap-[6.8px]">
        <SignalIcon dark={dark} />
        <WifiIcon dark={dark} />
        <BatteryIcon dark={dark} />
      </span>
    </div>
  )
}

export function HomeIndicator({ dark }: { dark: boolean }) {
  // v1.9: spec home bar 139x5 @402pt -> 134.8x4.9 @390pt, rounded 135x5.
  // The old 104x3.5 came from a scaled-collage read; 134-135 is also the
  // HIG home-indicator width on 390pt iPhones.
  return (
    <div className="relative z-10 flex h-5 shrink-0 items-center justify-center">
      <div className={cn('h-[5px] w-[135px] rounded-full', dark ? 'bg-[#515558]' : 'bg-[#bababa]')} />
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
      // v1.9: content-box so the app content is exactly 390px wide and
      // the 2px gallery bezel sits OUTSIDE it (outer 394x856). With the
      // old border-box frame the framed screenshots had only 386px of
      // content, which wrapped the welcome sub-line ("...Kimi and / GLM")
      // that is one line in the original. Bare mode (border-width 0)
      // is unchanged at 390 wide. NOTE: this must be an inline style,
      // not a Tailwind arbitrary class: Tailwind v4 utilities live in a
      // cascade layer, so the unlayered `* { box-sizing: border-box }`
      // in index.css beats `[box-sizing:content-box]`.
      style={{ boxSizing: 'content-box' }}
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
