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
/** iOS status-bar glyphs, v1.6: geometry from the verified iOS 26 UI Kit
 * status-bar spec (baoyu ios-frame.jsx, 402pt frame), rendered inside the
 * original phone-status-icons slot boxes (signal 11x8, wifi 11x7, battery
 * 16x8) with meet scaling, so the slot sizes stay original while the FORMS
 * become true iOS forms. NOT Lucide exports: Lucide has no status-bar
 * glyphs (its Wifi is a square 24x24, its Signal is not the 4-bar form).
 * Real-photo check (App Store iphone-03 phone screen): 4 signal bars,
 * wifi 2 arcs + dot at 17:12 ratio, battery outline at 27:13 ratio with
 * ~74% fill — all three match the spec, and the spec fill proportion
 * (20/27) matches the photo fill, replacing the v1.5 6px fill guess (R13).
 * Island stays the original slot 48x15 (spec 126x37 scaled by phone width
 * 270/402 = 85x25 would break mockup-internal proportions; see CHANGELOG).
 * No home indicator: the original mockup has none (spec 139x5 noted). */
export function SignalMark() {
  return (
    <svg width={11} height={8} viewBox="0 0 19 12" preserveAspectRatio="xMidYMax meet" aria-hidden>
      <rect x="0" y="7.5" width="3.2" height="4.5" rx="0.7" fill="#11110f" />
      <rect x="4.8" y="5" width="3.2" height="7" rx="0.7" fill="#11110f" />
      <rect x="9.6" y="2.5" width="3.2" height="9.5" rx="0.7" fill="#11110f" />
      <rect x="14.4" y="0" width="3.2" height="12" rx="0.7" fill="#11110f" />
    </svg>
  )
}
export function WifiMark() {
  return (
    <svg width={11} height={7} viewBox="0 0 17 12" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <path d="M8.5 3.2C10.8 3.2 12.9 4.1 14.4 5.6L15.5 4.5C13.7 2.7 11.2 1.5 8.5 1.5C5.8 1.5 3.3 2.7 1.5 4.5L2.6 5.6C4.1 4.1 6.2 3.2 8.5 3.2Z" fill="#11110f" />
      <path d="M8.5 6.8C9.9 6.8 11.1 7.3 12 8.2L13.1 7.1C11.8 5.9 10.2 5.1 8.5 5.1C6.8 5.1 5.2 5.9 3.9 7.1L5 8.2C5.9 7.3 7.1 6.8 8.5 6.8Z" fill="#11110f" />
      <circle cx="8.5" cy="10.5" r="1.5" fill="#11110f" />
    </svg>
  )
}
export function BatteryMark() {
  return (
    <svg width={16} height={8} viewBox="0 0 27 13" preserveAspectRatio="xMidYMid meet" aria-hidden>
      <rect x="0.5" y="0.5" width="23" height="12" rx="3.5" stroke="#11110f" strokeOpacity="0.35" fill="none" />
      <rect x="2" y="2" width="20" height="9" rx="2" fill="#11110f" />
      <path d="M25 4.5V8.5C25.8 8.2 26.5 7.2 26.5 6.5C26.5 5.8 25.8 4.8 25 4.5Z" fill="#11110f" fillOpacity="0.4" />
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
