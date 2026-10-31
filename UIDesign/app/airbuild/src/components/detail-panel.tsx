import { useEffect, useRef, useState } from 'react'
import { BrushIcon, CheckIcon, ChevronMorphIcon, HandSolidIcon } from './icons.tsx'
import { Card } from './ui/card.tsx'

const SHEET_CURVE = 'cubic-bezier(0.32,0.72,0,1)'
/** Dismiss when dragged past this many px, or flicked faster than this. */
const DISMISS_DY = 120
const DISMISS_VELOCITY = 0.65

function prefersReducedMotion(): boolean {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

export type VersionRow = { label: string; value: string; sub?: string; action?: string }
export type ProgressStep = { title: string; sub?: string; done: boolean }
export type DetailPanelProps = {
  title: string
  status: string
  updated: string
  iconLabel: string
  stores: string[]
  versions: VersionRow[]
  progress: ProgressStep[]
  /** v1.11: fired after the dismiss animation (or immediately under
   *  reduced motion). The parent shows a demo-only reopen control. */
  onDismiss?: () => void
}

/** Generic store glyphs (own redraws, not Apple assets): App Store "A" of three strokes, TestFlight three-blade propeller. */
function StoreGlyph({ kind }: { kind: string }) {
  // Sampled vertical gradient (iphone-05 App Store glyph: #8cd3f1 top,
  // #3e97db mid, #1b79f3 bottom); TestFlight uses the same blue family
  // (its top-left #8ad5ff was sampled, full ramp not separately resolved).
  const gid = kind === 'TestFlight' ? 'ab-store-tf' : 'ab-store-as'
  const grad = (
    <defs>
      <linearGradient id={gid} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" stopColor="#8cd3f1" />
        <stop offset="0.5" stopColor="#3e97db" />
        <stop offset="1" stopColor="#1b79f3" />
      </linearGradient>
    </defs>
  )
  if (kind === 'TestFlight') {
    return (
      <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden>
        {grad}
        <rect width="24" height="24" rx="6" fill={`url(#${gid})`} />
        <g fill="#fff">
          <ellipse cx="12" cy="6.5" rx="1.7" ry="3.4" />
          <ellipse cx="12" cy="6.5" rx="1.7" ry="3.4" transform="rotate(120 12 12)" />
          <ellipse cx="12" cy="6.5" rx="1.7" ry="3.4" transform="rotate(240 12 12)" />
        </g>
        <circle cx="12" cy="12" r="2" fill="#0088fe" />
        <circle cx="12" cy="12" r="1" fill="#fff" />
      </svg>
    )
  }
  return (
    <svg width="30" height="30" viewBox="0 0 24 24" aria-hidden>
      {grad}
      <rect width="24" height="24" rx="6" fill={`url(#${gid})`} />
      <path d="M8 19 12 5l4 14M9.8 14.5h4.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/**
 * App detail panel (bottom-sheet style): grabber, title + chevron morph
 * (now a light-gray circle badge with a white chevron, as in iphone-05),
 * check button, status card (paintbrush badge, not a check), store cards,
 * Versions card, Progress card (done=false is a hollow blue ring).
 */
export function DetailPanel({ title, status, updated, iconLabel, stores, versions, progress, onDismiss }: DetailPanelProps) {
  // M1: the title chevron is a real toggle (panel sections collapse); its
  // rotation morphs with a CSS transition instead of cutting. Default open,
  // so the gallery screenshot is unchanged.
  const [open, setOpen] = useState(true)
  // v1.11 sheet presentation: the panel is a bottom sheet (grabber in the
  // original iphone-05). It springs up on mount (500ms iOS curve), follows
  // the grabber drag 1:1 downward (upward pull damped x0.3), and on release
  // springs back or dismisses past the threshold / on flick. No dim
  // backdrop is added: the original panel sits on the same #f4f4f4 canvas,
  // so a dim would change the rest pixels. Drag is grabber-only — the
  // panel body carries tappable controls (chevron, Done, store cards) that
  // a full-panel drag would hijack. At rest (animation settled) the panel
  // is at translateY(0): screenshots identical to v1.10.
  const sectionRef = useRef<HTMLElement>(null)
  const [dragY, setDragY] = useState(900)
  const [dragging, setDragging] = useState(false)
  const [leaving, setLeaving] = useState(false)
  const dragRef = useRef<{ startY: number; lastY: number; lastT: number; height: number } | null>(null)
  const dismissTimer = useRef<number | null>(null)
  useEffect(() => {
    const h = sectionRef.current?.offsetHeight ?? 844
    if (prefersReducedMotion()) { setDragY(0); return }
    setDragY(h)
    const raf = requestAnimationFrame(() => requestAnimationFrame(() => setDragY(0)))
    return () => { cancelAnimationFrame(raf); if (dismissTimer.current !== null) window.clearTimeout(dismissTimer.current) }
  }, [])
  const dismiss = () => {
    if (leaving) return
    if (prefersReducedMotion()) { onDismiss?.(); return }
    const h = sectionRef.current?.offsetHeight ?? 844
    setLeaving(true)
    setDragY(h)
    dismissTimer.current = window.setTimeout(() => onDismiss?.(), 360)
  }
  const onGrabberDown = (e: React.PointerEvent) => {
    if (leaving) return
    (e.target as HTMLElement).setPointerCapture(e.pointerId)
    dragRef.current = { startY: e.clientY, lastY: e.clientY, lastT: performance.now(), height: sectionRef.current?.offsetHeight ?? 844 }
    setDragging(true)
  }
  const onGrabberMove = (e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d || !dragging) return
    const dy = e.clientY - d.startY
    d.lastY = e.clientY
    d.lastT = performance.now()
    setDragY(dy < 0 ? dy * 0.3 : dy)
  }
  const onGrabberUp = (e: React.PointerEvent) => {
    const d = dragRef.current
    if (!d || !dragging) return
    dragRef.current = null
    setDragging(false)
    const dy = e.clientY - d.startY
    const dt = Math.max(1, performance.now() - d.lastT)
    const velocity = Math.abs(e.clientY - d.lastY) / dt
    if (dy > DISMISS_DY || (dy > 40 && velocity > DISMISS_VELOCITY)) dismiss()
    else setDragY(0)
  }
  const sheetTransition = prefersReducedMotion()
    ? 'none'
    : dragging
      ? 'none'
      : leaving
        ? `transform 350ms ${SHEET_CURVE}`
        : `transform 500ms ${SHEET_CURVE}`
  return (
    <section
      ref={sectionRef}
      className="flex flex-col rounded-t-[32px] bg-[#f4f4f4] px-4 pt-2 pb-4"
      style={{ transform: `translateY(${dragY}px)`, transition: sheetTransition }}
    >
      {/* Grabber block totals 16px (h-4, no margin) exactly as v1.10's
          4px bar + 12px margin, so the panel geometry is unchanged; the
          bar sits at the top of the block (items-start), as before. */}
      <div
        className="mx-auto flex h-4 w-16 cursor-grab touch-none items-start justify-center active:cursor-grabbing"
        aria-label="Detail sheet handle — drag down to dismiss"
        onPointerDown={onGrabberDown}
        onPointerMove={onGrabberMove}
        onPointerUp={onGrabberUp}
        onPointerCancel={() => { dragRef.current = null; setDragging(false); setDragY(0) }}
      >
        <span className="h-1 w-10 rounded-full bg-black/15" aria-hidden />
      </div>
      <div className="flex items-center justify-between">
        <span className="w-11" aria-hidden />
        <h2 className="flex items-center gap-1.5 text-[12px] font-bold text-[#11110f]">
          {title}
          <button type="button" aria-label="Toggle details" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="flex h-[24px] w-[24px] items-center justify-center rounded-full bg-[#cfcfcf] text-black/60">
            <ChevronMorphIcon open={open} className="h-[14px] w-[14px]" />
          </button>
        </h2>
        <button type="button" aria-label="Done" onClick={dismiss} className="ab-glass flex h-11 w-11 items-center justify-center rounded-full">
          <CheckIcon className="h-6 w-6" />
        </button>
      </div>
      <Card className="mt-4 flex items-center gap-3 rounded-[20px] p-3.5">
        <span className="relative flex h-[56px] w-[56px] shrink-0 items-center justify-center rounded-[14px] bg-[#f6f6f6] text-[#11110f]" aria-hidden>
          <HandSolidIcon className="h-7 w-7" />
          <span className="absolute -bottom-1 -right-1 flex h-6 w-6 items-center justify-center rounded-full bg-[#0088fe] text-white shadow"><BrushIcon className="h-3.5 w-3.5" /></span>
        </span>
        <span>
          <span className="flex items-center gap-1.5 text-[12px] font-bold text-[#11110f]">
            <span className="h-[10px] w-[10px] rounded-full bg-[#34c759]" aria-hidden /> {status}
          </span>
          <span className="mt-0.5 block text-[9px] text-black/45">{updated}</span>
        </span>
      </Card>
      <div className="mt-3 grid grid-cols-2 gap-2.5">
        {stores.map((store) => (
          <Card key={store} className="rounded-[20px] p-3.5">
            <StoreGlyph kind={store} />
            <p className="mt-2 text-[15px] font-semibold text-[#11110f]">{store}</p>
          </Card>
        ))}
      </div>
      {open ? (<>
      <h3 className="mt-4 mb-2 px-1 text-[12px] font-semibold text-black/45">Versions</h3>
      <Card className="divide-y divide-black/[0.06] rounded-[20px] px-3.5">
        {versions.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-3 py-3">
            <span className="text-[12px] text-black/45">{row.label}</span>
            <span className="text-right">
              <span className="block text-[14px] font-semibold text-[#11110f]">{row.value}</span>
              {row.action ? <span className="block text-[11px] font-medium text-[#0088fe]">{row.action}</span> : null}
              {row.sub ? <span className="block text-[11px] text-black/45">{row.sub}</span> : null}
            </span>
          </div>
        ))}
      </Card>
      <h3 className="mt-4 mb-2 px-1 text-[12px] font-semibold text-black/45">Progress</h3>
      <Card className="divide-y divide-black/[0.06] rounded-[20px] px-3.5">
        {progress.map((step) => (
          <div key={step.title} className="flex items-start gap-3.5 py-3">
            {step.done ? (
              <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#34c759] text-white" aria-hidden>
                <CheckIcon className="h-4 w-4" />
              </span>
            ) : (
              <span className="h-6 w-6 shrink-0 rounded-full border-[2px] border-[#0088fe] bg-transparent" aria-label="In progress" />
            )}
            <span>
              <span className="block text-[13px] font-medium text-[#11110f]">{step.title}</span>
              {step.sub ? <span className="block text-[11px] text-black/45">{step.sub}</span> : null}
            </span>
          </div>
        ))}
      </Card>
      </>) : null}
      <span className="sr-only">{iconLabel}</span>
    </section>
  )
}
