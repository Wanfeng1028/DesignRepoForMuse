import type { SVGProps } from 'react'
import {
  ArrowUp,
  Check,
  ChevronDown,
  ChevronLeft,
  Clover,
  Cloud,
  Ellipsis,
  FileText,
  Hand,
  ListChecks,
  Plus,
  Share,
} from 'lucide-react'

/**
 * Icons — Lucide (lucide-react 1.63.0, verified against the installed package:
 * clover / hand / list-checks / cloud / file-text paths read from
 * node_modules/lucide-react/dist/esm/icons/*.mjs). All strokes use Lucide's
 * default width 2, replacing the previous 1.6-2.2 mixed self-drawn set.
 * Brand glyphs (App Store / TestFlight) stay self-drawn vectors in
 * detail-panel.tsx: Lucide has no brand icons and official bitmaps are
 * never copied. The old HandIcon palm dot is dropped: Lucide hand has no
 * dot (decision recorded in CHANGELOG v1.6).
 */
export const ChevronLeftIcon = ChevronLeft
export const EllipsisIcon = Ellipsis
export const CloudIcon = Cloud
export const CloverIcon = Clover
export const PlusIcon = Plus
export const HandIcon = Hand
export const ArrowUpIcon = ArrowUp
export const DocIcon = FileText
export const CheckIcon = Check
export const ShareIcon = Share
export const TaskListIcon = ListChecks
export const ChevronDownIcon = ChevronDown

type P = SVGProps<SVGSVGElement>

/** Solid black hand silhouette (own redraw) for the detail app-icon tile: the original is a solid black hand, not an outline. */
export function HandSolidIcon(props: P) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M8.6 12.2V6.4a1.9 1.9 0 0 1 3.8 0v4.1V5.2a1.9 1.9 0 0 1 3.8 0v5.3V6.6a1.9 1.9 0 0 1 3.8 0v4.6a3.4 3.4 0 0 1 .6 1.9v1.4a6.4 6.4 0 0 1-6.4 6.4h-1a5.4 5.4 0 0 1-3.8-1.6l-3.3-3.3a2.1 2.1 0 0 1 2.5-3.4Z" />
    </svg>
  )
}

/** AirBuild four-petal mark (own vector redraw): four rounded petals around a
 *  square hole, pale solid fill, no stem. The home top-bar centre mark and the
 *  briefing eyebrow use this — Lucide clover (outline + stem) is visibly wrong
 *  against iphone-01/ipad-01, where the mark is a pale solid. */
export function AirMarkIcon(props: P) {
  return (
    <svg width="24" height="24" viewBox="0 0 40 40" fill="currentColor" aria-hidden {...props}>
      <rect x="2" y="2" width="16" height="16" rx="8" />
      <rect x="22" y="2" width="16" height="16" rx="8" />
      <rect x="2" y="22" width="16" height="16" rx="8" />
      <rect x="22" y="22" width="16" height="16" rx="8" />
    </svg>
  )
}

/** iOS share glyph (own vector redraw): arrow up out of a tray. Lucide Share
 *  (three nodes) is the wrong glyph class against iphone-04's chrome. */
export function ShareTrayIcon(props: P) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <path d="M12 15V4m0 0 3.5 3.5M12 4 8.5 7.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M5 11v8a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1v-8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/** Paintbrush glyph (own vector redraw) for the detail status-card badge:
 *  iphone-05's badge carries a diagonal brush, not a check. */
export function BrushIcon(props: P) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" aria-hidden {...props}>
      <path d="M17.5 3.5c1.2 1.2 1 3-.3 4.6L9.6 16.2c-.5.5-1.2.7-1.9.5l-2.4-.6c-.7-.2-1-1-.6-1.6l1.4-2.2c.3-.5.8-.8 1.4-.8l7.4-7.2c1.3-1.2 3-1.3 4.2-.3Z" />
      <path d="M6.5 18.5c-1.3.3-2.3 1.3-2.6 2.6-.1.6.4 1.1 1 1 .9-.2 1.7-.9 2.1-1.9.2-.7-.1-1.4-.5-1.7Z" />
    </svg>
  )
}

/** Task-list title glyph (own vector redraw): two rows of circle + line, the
 *  first circle checked. Lucide list-checks (checks on lines) misses the
 *  circles visible in iphone-03's task card title. */
export function TaskGlyphIcon(props: P) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="5" cy="7" r="2.6" fill="currentColor" />
      <path d="m3.8 7 1 1 1.6-1.8" stroke="#fff" strokeWidth="1.1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M11 7h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      <circle cx="5" cy="17" r="2.6" stroke="currentColor" strokeWidth="1.8" />
      <path d="M11 17h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
export function ChevronMorphIcon({ open, ...props }: P & { open: boolean }) {
  return (
    <ChevronDown
      {...props}
      className={`ab-morph ${props.className ?? ''}`}
      style={{ transform: open ? 'rotate(0deg)' : 'rotate(180deg)', ...props.style }}
    />
  )
}

/** M2 — plus/check morph in one slot: plus strokes fade + shrink while the check draws in (stroke-dashoffset). Not a direct path interpolation (node counts differ), so it is a custom stroke animation. */
export function PlusCheckMorphIcon({ checked, ...props }: P & { checked: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <g
        className="ab-morph"
        style={{ opacity: checked ? 0 : 1, transform: checked ? 'scale(0.4)' : 'scale(1)', transformOrigin: '12px 12px' }}
      >
        <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </g>
      <path
        d="m5 12.5 4.5 4.5L19 7.5"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="20"
        className="ab-morph"
        style={{ strokeDashoffset: checked ? 0 : 20, opacity: checked ? 1 : 0 }}
      />
    </svg>
  )
}

/** M5 — task circle/check morph: ring stays, check draws in (stroke-dashoffset). Requires the SVG check, not the old text glyph. */
export function TaskCheckMorphIcon({ checked, ...props }: P & { checked: boolean }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden {...props}>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="m8 12.5 2.5 2.5L16.5 9"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeDasharray="12"
        className="ab-morph"
        style={{ strokeDashoffset: checked ? 0 : 12, opacity: checked ? 1 : 0 }}
      />
    </svg>
  )
}
