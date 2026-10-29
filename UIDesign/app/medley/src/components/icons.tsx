import type { ReactNode } from 'react'

function svgProps(color: string, size = 20) {
  return {
    width: size,
    height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }
}

type IconFn = (c: string, s?: number) => ReactNode

export const Icon: Record<string, IconFn> = {
  menu: (c) => (<svg {...svgProps(c)}><path d="M4 6h16M4 12h16M4 18h16" /></svg>),
  back: (c) => (<svg {...svgProps(c)}><path d="M15 18l-6-6 6-6" /></svg>),
  close: (c) => (<svg {...svgProps(c)}><path d="M18 6L6 18M6 6l12 12" /></svg>),
  plus: (c) => (<svg {...svgProps(c)}><path d="M12 5v14M5 12h14" /></svg>),
  mic: (c) => (<svg {...svgProps(c)}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 19v3" /></svg>),
  check: (c, s = 20) => (<svg {...svgProps(c, s)}><path d="M20 6L9 17l-5-5" /></svg>),
  chevronDown: (c, s = 16) => (<svg {...svgProps(c, s)}><path d="M6 9l6 6 6-6" /></svg>),
  chevronRight: (c, s = 16) => (<svg {...svgProps(c, s)}><path d="M9 18l6-6-6-6" /></svg>),
  search: (c) => (<svg {...svgProps(c)}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>),
  edit: (c) => (<svg {...svgProps(c)}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>),
  clock: (c) => (<svg {...svgProps(c)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>),
  copy: (c, s = 18) => (<svg {...svgProps(c, s)}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>),
  refresh: (c, s = 18) => (<svg {...svgProps(c, s)}><path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v6h-6" /></svg>),
  like: (c, s = 18) => (<svg {...svgProps(c, s)}><path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /></svg>),
  dislike: (c, s = 18) => (<svg {...svgProps(c, s)}><path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" /></svg>),
  more: (c, s = 18) => (<svg {...svgProps(c, s)}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>),
  info: (c) => (<svg {...svgProps(c)}><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>),
  gear: (c) => (<svg {...svgProps(c)}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>),
  send: (c) => (<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>),
  news: (c) => (<svg {...svgProps(c)}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>),
  pdf: (c) => (<svg {...svgProps(c)}><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>),
  image: (c) => (<svg {...svgProps(c)}><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="1.5" /><path d="M21 16l-5-5L5 19" /></svg>),
  cards: (c) => (<svg {...svgProps(c)}><rect x="3" y="7" width="13" height="12" rx="2" /><path d="M7 7V5a2 2 0 0 1 2-2h11v12" /></svg>),
  mapPin: (c, s = 20) => (<svg {...svgProps(c, s)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>),
  calendar: (c, s = 20) => (<svg {...svgProps(c, s)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></svg>),
  folder: (c) => (<svg {...svgProps(c)}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>),
  searchOrbit: (c) => (<svg {...svgProps(c)}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /><path d="M4 4a8 8 0 0 1 3-1.5" /></svg>),
  download: (c) => (<svg {...svgProps(c)}><path d="M12 3v10" /><path d="M7 10l5 5 5-5" /><path d="M4 19h16" /></svg>),
  trash: (c) => (<svg {...svgProps(c)}><path d="M4 7h16" /><path d="M9 7V5h6v2" /><path d="M6 7l1 13h10l1-13" /><path d="M10 11v5M14 11v5" /></svg>),
  logout: (c) => (<svg {...svgProps(c)}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>),
}
