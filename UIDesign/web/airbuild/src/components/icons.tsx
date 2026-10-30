import type { SVGProps } from 'react'
import {
  ArrowUp as LucideArrowUp,
  BookOpen as LucideBookOpen,
  ChartColumn as LucideChartColumn,
  Check as LucideCheck,
  Clock as LucideClock,
  Coffee as LucideCoffee,
  CreditCard as LucideCreditCard,
  CircleUser as LucideCircleUser,
  House as LucideHouse,
  LayoutGrid as LucideLayoutGrid,
  MessageSquare as LucideMessageSquare,
  Plus as LucidePlus,
  Route as LucideRoute,
  Send as LucideSend,
  Settings as LucideSettings,
  Share as LucideShare,
  Smartphone as LucideSmartphone,
  X as LucideX,
  type LucideIcon,
} from 'lucide-react'

/**
 * Icons are Lucide (lucide-react 1.63.0), default strokeWidth 2.
 * Call sites keep the old `size` prop: this wrapper maps it through.
 * Deleted in v1.2 (were unused exports, audit section 2): IconBook,
 * IconDeviceInbound (no single Lucide equivalent — it only lived in the
 * unused iconMap, so deleting it also closes the one no-exact-match item),
 * IconLineDecrease, IconChevronLeft, IconDots, IconCloud, IconHand,
 * IconGlobe, IconFile, IconInfo, plus the unused iconMap itself.
 * REA fill/circle semantics resolved per "original form first":
 * account button uses CircleUser (REA person-circle), not plain User.
 */
type P = SVGProps<SVGSVGElement> & { size?: number }
function wrap(C: LucideIcon) {
  return (p: P) => {
    const { size = 16, ...rest } = p
    return <C size={size} {...rest} />
  }
}
export const IconPlus = wrap(LucidePlus)
export const IconGear = wrap(LucideSettings)
export const IconHouse = wrap(LucideHouse)
export const IconX = wrap(LucideX)
export const IconArrowUp = wrap(LucideArrowUp)
export const IconIPhone = wrap(LucideSmartphone)
export const IconPerson = wrap(LucideCircleUser)
export const IconCheck = wrap(LucideCheck)
export const IconChat = wrap(LucideMessageSquare)
export const IconCard = wrap(LucideCreditCard)
export const IconRoute = wrap(LucideRoute)
export const IconBookOpen = wrap(LucideBookOpen)
export const IconChart = wrap(LucideChartColumn)
export const IconShare = wrap(LucideShare)
/** Original "Share build" glyph is a paperplane (figma-icon-11.svg, 11px),
 * not a share-tray: Lucide Send is the paperplane form. */
export const IconPaperplane = wrap(LucideSend)
/**
 * v1.3 custom Lucide-geometry morphs (NOT Lucide exports, documented as
 * custom): the two REA raster icons with no single Lucide equivalent.
 * DeviceInbound geometry from the audit: phone rect 7,2,10,20 rx2, bottom
 * dot, top down-chevron. LineDecrease geometry from the audit: polyline
 * M3 17l5-6 4 3 5-7 4 4, no arrowhead (Lucide trending-down adds one).
 */
export function IconDeviceInbound({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="7" y="2" width="10" height="20" rx="2" />
      <path d="M9 5l3 3 3-3" />
      <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}
export function IconLineDecrease({ size = 15 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M3 17l5-6 4 3 5-7 4 4" />
    </svg>
  )
}
/** Vector redraw of the iOS status-bar wifi glyph (11x7 phone-status-icons slot,
 * v1.5). Redrawn geometry, not the official raster: three arcs + dot, stroke 1.2,
 * round caps. NOT a Lucide export: Lucide Wifi is a square 24x24 glyph, while
 * the original status icon is a wide 11x7 crop (figma-icon-10.svg, 11x7). */
export function WifiMark() {
  return (
    <svg width={11} height={7} viewBox="0 0 11 7" fill="none" stroke="#11110f" strokeWidth={1.2} strokeLinecap="round" aria-hidden>
      <path d="M0.8 4.5 Q5.5 -2.9 10.2 4.5" />
      <path d="M2.6 5 Q5.5 -0.6 8.4 5" />
      <path d="M4.2 5.4 Q5.5 2.2 6.8 5.4" />
      <circle cx={5.5} cy={6.2} r={0.7} fill="#11110f" stroke="none" />
    </svg>
  )
}
/** Vector redraw of the AirBuild four-petal mark (16px phone-app-logo slot).
 * Redrawn geometry, not the official asset: four lobes around a centre hole. */
export function CloverMark({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden>
      <g fill="currentColor">
        <circle cx="8" cy="8" r="5.2" />
        <circle cx="16" cy="8" r="5.2" />
        <circle cx="8" cy="16" r="5.2" />
        <circle cx="16" cy="16" r="5.2" />
      </g>
      <circle cx="12" cy="12" r="2.6" fill="#fff" />
    </svg>
  )
}
/** Mini project artwork icons (Lucide, replacing the old self-drawn minis). */
export const IconClockMini = wrap(LucideClock)
export const IconCupMini = wrap(LucideCoffee)
export const IconGridMini = wrap(LucideLayoutGrid)

export type ProjectIconKey = 'clock' | 'house' | 'cup' | 'grid'
export const projectIconMap: Record<ProjectIconKey, (p: P) => React.ReactNode> = {
  clock: IconClockMini, house: IconHouse, cup: IconCupMini, grid: IconGridMini,
}

/**
 * Panel toggle morph (audit M02/M03). Lucide ships panel-left/right only as
 * static icons, so the open/close morph is a Lucide-geometry custom SVG:
 * rect 3,4,18,16 rx2 + one divider line, strokeWidth 2, round caps.
 * The divider SLIDES (240ms, drawer easing) instead of hard-cutting:
 * left panel open x=9 -> closed x=4.5 (toward the panel edge), right panel
 * open x=15 -> closed x=19.5, with opacity 1 -> 0.5. Rect never moves.
 */
function PanelMorph({ side, open, size = 16 }: { side: 'left' | 'right'; open: boolean; size?: number }) {
  const lineX = side === 'left' ? 9 : 15
  const slide = open ? 0 : side === 'left' ? -4.5 : 4.5
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="4" width="18" height="16" rx="2" />
      <line
        x1={lineX} y1={4} x2={lineX} y2={20}
        style={{ transform: `translateX(${slide}px)`, opacity: open ? 1 : 0.5, transition: 'transform 240ms cubic-bezier(0.32,0.72,0,1), opacity 240ms cubic-bezier(0.32,0.72,0,1)' }}
      />
    </svg>
  )
}
export const PanelLeftToggle = (p: { open: boolean; size?: number }) => <PanelMorph side="left" {...p} />
export const PanelRightToggle = (p: { open: boolean; size?: number }) => <PanelMorph side="right" {...p} />
