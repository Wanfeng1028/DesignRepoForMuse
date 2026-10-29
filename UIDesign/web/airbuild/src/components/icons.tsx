import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }
function base({ size = 16, ...p }: P) {
  return { width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, ...p }
}
export const IconPlus = (p: P) => (<svg {...base(p)}><path d="M12 5v14M5 12h14" /></svg>)
export const IconGear = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="3" /><path d="M12 2v3M12 19v3M2 12h3M19 12h3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M19.1 4.9L17 7M7 17l-2.1 2.1" /></svg>)
export const IconHouse = (p: P) => (<svg {...base(p)}><path d="M3 11l9-7 9 7v9a1 1 0 0 1-1 1h-5v-6h-6v6H4a1 1 0 0 1-1-1z" /></svg>)
export const IconSidebarLeft = (p: P) => (<svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M9 4v16" /></svg>)
export const IconSidebarRight = (p: P) => (<svg {...base(p)}><rect x="3" y="4" width="18" height="16" rx="2" /><path d="M15 4v16" /></svg>)
export const IconX = (p: P) => (<svg {...base(p)}><path d="M6 6l12 12M18 6L6 18" /></svg>)
export const IconArrowUp = (p: P) => (<svg {...base(p)}><path d="M12 19V5M5 12l7-7 7 7" /></svg>)
export const IconBook = (p: P) => (<svg {...base(p)}><path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2z" /><path d="M4 19a2 2 0 0 1 2-2h13" /></svg>)
export const IconDeviceInbound = (p: P) => (<svg {...base(p)}><rect x="7" y="2" width="10" height="20" rx="2" /><path d="M12 18h.01M12 6l-2 2M12 6l2 2" /></svg>)
export const IconIPhone = (p: P) => (<svg {...base(p)}><rect x="7" y="2" width="10" height="20" rx="2.5" /><path d="M11 18.5h2" /></svg>)
export const IconLineDecrease = (p: P) => (<svg {...base(p)}><path d="M3 17l5-6 4 3 5-7 4 4" /></svg>)
export const IconPerson = (p: P) => (<svg {...base(p)}><circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-6 8-6s8 2 8 6" /></svg>)
export const IconChevronLeft = (p: P) => (<svg {...base(p)}><path d="M15 5l-7 7 7 7" /></svg>)
export const IconDots = (p: P) => (<svg {...base(p)}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none" /><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none" /></svg>)
export const IconCheck = (p: P) => (<svg {...base(p)}><path d="M4 12.5l5 5L20 6.5" /></svg>)
export const IconCloud = (p: P) => (<svg {...base(p)}><path d="M7 18a4.5 4.5 0 1 1 .8-8.93A6 6 0 0 1 19.5 11 3.75 3.75 0 0 1 18 18z" /></svg>)
export const IconHand = (p: P) => (<svg {...base(p)}><path d="M8 11V5.5a1.5 1.5 0 0 1 3 0V10m0-4.5a1.5 1.5 0 0 1 3 0V10m0-3.5a1.5 1.5 0 0 1 3 0v6a7 7 0 0 1-7 7h-.8a6 6 0 0 1-4.2-1.8L3 15" /></svg>)
export const IconGlobe = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M3 12h18M12 3c-2.5 2.6-3.8 5.7-3.8 9s1.3 6.4 3.8 9c2.5-2.6 3.8-5.7 3.8-9s-1.3-6.4-3.8-9z" /></svg>)
export const IconFile = (p: P) => (<svg {...base(p)}><path d="M6 2h8l4 4v16H6z" /><path d="M14 2v4h4" /></svg>)
export const IconInfo = (p: P) => (<svg {...base(p)}><circle cx="12" cy="12" r="9" /><path d="M12 11v5" /><circle cx="12" cy="7.5" r="1" fill="currentColor" stroke="none" /></svg>)
export const IconChat = (p: P) => (<svg {...base(p)}><path d="M4 5h16v11H9l-5 4z" /></svg>)
export const IconCard = (p: P) => (<svg {...base(p)}><rect x="2" y="5" width="20" height="14" rx="2" /><path d="M2 10h20" /></svg>)
export const IconRoute = (p: P) => (<svg {...base(p)}><circle cx="6" cy="19" r="2.5" /><circle cx="18" cy="5" r="2.5" /><path d="M8.5 19H18V7.5M18 7.5H8.5" /></svg>)
export const IconBookOpen = (p: P) => (<svg {...base(p)}><path d="M12 6c-1.5-1.5-4-2-8-2v16c4 0 6.5.5 8 2 1.5-1.5 4-2 8-2V4c-4 0-6.5.5-8 2z" /><path d="M12 6v16" /></svg>)
export const IconChart = (p: P) => (<svg {...base(p)}><path d="M4 20V10M10 20V4M16 20v-8M22 20H2" /></svg>)
export type IconName = 'plus' | 'gear' | 'house' | 'sidebar-left' | 'sidebar-right' | 'x' | 'arrow-up' | 'book' | 'device' | 'iphone' | 'decrease' | 'person'
export const iconMap: Record<IconName, (p: P) => React.ReactNode> = {
  plus: IconPlus, gear: IconGear, house: IconHouse, 'sidebar-left': IconSidebarLeft,
  'sidebar-right': IconSidebarRight, x: IconX, 'arrow-up': IconArrowUp, book: IconBook,
  device: IconDeviceInbound, iphone: IconIPhone, decrease: IconLineDecrease, person: IconPerson,
}
