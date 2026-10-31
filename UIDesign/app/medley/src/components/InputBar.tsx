import { cn } from '../lib/utils'
import { Icon } from './icons'

export type MicVariant = 'circle' | 'plain' | 'stop' | 'stop-accent'

/**
 * InputBar, two variants (v1.5):
 * - single: one 56px pill row (orig Lisbon-en pill band 56.4px @390; was 52px).
 * - double: placeholder row (32px) + control row (56px) = 88px bar, matching
 *   the orig home-cn / lisbon-cn two-line bars (87-91px @390). Only those two
 *   screens use double; every other screen keeps single.
 * Stop sizes are per-screen measured values, not one shared size:
 * - stop (lisbon-cn, white): 34px circle + 9px square (v1.6 re-measure:
 *   orig white extent 52 crop rows x 45 crop wide = 36.2 x 31.3 phone px,
 *   midpoint 34; v1.5 29px read the JPEG white core only).
 * - stop-accent (lisbon-en, peach): 41px circle + 9px square (orig 41.0 / 9.2px).
 * Mic containers carry transition classes (M5 container transition): on a
 * runtime variant switch the circle keeps its shape and the inner glyph
 * crossfades/scales instead of hard-cutting. Static shots are unaffected.
 */
export function InputBar({
  dark,
  placeholder,
  modelLabel,
  sendDark,
  mic = 'circle',
  variant = 'single',
}: {
  dark: boolean
  placeholder: string
  modelLabel?: string
  sendDark?: boolean
  mic?: MicVariant
  variant?: 'single' | 'double'
}) {
  const sub = dark ? '#9a9ba2' : '#6b6c72'
  const dim = dark ? '#6b6c72' : '#9a9ba2'
  const bar =
    'flex items-center gap-2.5 rounded-input py-0 pl-[14px] pr-2 ' +
    // v1.9 glass (iOS 27 Liquid Glass chrome + glassy-liquid refs): large
    // chrome blur 50px + saturate 1.8; shadow 0 10px 26px rgba(0,0,0,0.16);
    // dark adds the 0.5px inner hairline as edge light. Fills stay the
    // measured solids — under an opaque fill backdrop blur is a no-op in
    // a static shot and only acts when content scrolls beneath in live
    // use, so the static colours do not move off their measured values.
    (dark
      ? 'bg-dark-input backdrop-blur-[50px] backdrop-saturate-[1.8] shadow-[0_10px_26px_rgba(0,0,0,0.16),inset_0_0_0_0.5px_rgba(255,255,255,0.06)]'
      : 'border border-light-divider bg-white backdrop-blur-[50px] backdrop-saturate-[1.8] shadow-[0_10px_26px_rgba(0,0,0,0.16)]')

  function MicButton() {
    if (mic === 'plain') {
      return <span className="flex shrink-0 pr-1.5 transition-all duration-200 active:scale-95">{Icon.mic(sub)}</span>
    }
    if (mic === 'stop') {
      return (
        <span
          className={cn(
            'flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-white transition-all duration-200 active:scale-95',
            variant === 'double' && 'self-start',
          )}
        >
          <span className="h-[9px] w-[9px] rounded-[2px] bg-[#111214] transition-all duration-200" />
        </span>
      )
    }
    if (mic === 'stop-accent') {
      return (
        <span className="flex h-[41px] w-[41px] shrink-0 items-center justify-center rounded-full bg-accent transition-all duration-200 active:scale-95">
          <span className="h-[9px] w-[9px] rounded-[2px] bg-[#111214] transition-all duration-200" />
        </span>
      )
    }
    return (
      <span
        className={cn(
          'flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white transition-all duration-200 active:scale-95',
          sendDark ? 'bg-black-btn' : dark ? 'bg-accent' : 'bg-black-btn',
          variant === 'double' && 'self-start',
        )}
      >
        {Icon.mic('#ffffff')}
      </span>
    )
  }

  function ModelPill() {
    if (!modelLabel) return null
    return (
      <span
        className={cn(
          'inline-flex items-center gap-1 rounded-[16px] px-2.5 py-1.5 text-[13px] font-semibold',
          dark ? 'bg-dark-row text-dark-sub' : 'bg-light-bubble text-light-sub',
        )}
      >
        {modelLabel}
        {Icon.chevronDown(sub, 14)}
      </span>
    )
  }

  if (variant === 'double') {
    // One rounded container, two rows inside: placeholder row on top,
    // control row below. Total 40 + 48 = 88px @390 (orig 87-91px).
    // v1.6 re-measure: orig split is ~40/47-48, not 32/56 — the 32px
    // placeholder row put its centred text ~6px too high on both double
    // screens, while the mic button sits top-aligned in its row (orig
    // stop/circle top = control-row top), so MicButton self-starts here.
    return (
      <div className="shrink-0 px-4 pt-3">
        <div
          className={cn(
            'rounded-input',
            // v1.9 glass: same stack as the single bar (see `bar` above).
            dark
              ? 'bg-dark-input backdrop-blur-[50px] backdrop-saturate-[1.8] shadow-[0_10px_26px_rgba(0,0,0,0.16),inset_0_0_0_0.5px_rgba(255,255,255,0.06)]'
              : 'border border-light-divider bg-white backdrop-blur-[50px] backdrop-saturate-[1.8] shadow-[0_10px_26px_rgba(0,0,0,0.16)]',
          )}
        >
          <div className="flex h-[40px] items-center pl-[14px] pr-2">
            <span className="flex-1 text-[15px]" style={{ color: dim }}>
              {placeholder}
            </span>
          </div>
          <div className="flex h-[48px] items-center gap-2.5 pl-[14px] pr-2">
            <span className="flex text-dark-sub">{Icon.plus(sub)}</span>
            <ModelPill />
            <span className="flex-1" />
            <MicButton />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="shrink-0 px-4 pt-3">
      <div className={cn(bar, 'h-[56px]')}>
        <span className="flex text-dark-sub">{Icon.plus(sub)}</span>
        <span className="flex-1 text-[15px]" style={{ color: dim }}>
          {placeholder}
        </span>
        <ModelPill />
        <MicButton />
      </div>
    </div>
  )
}
