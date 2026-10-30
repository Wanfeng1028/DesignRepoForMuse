import type { ReactNode } from "react";
import { cn } from "../lib/utils";

type IconProps = { className?: string; size?: number };

function base(size: number, color: string, strokeWidth = 2) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: color,
    strokeWidth,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
}

/** Line icons in the Medley mobile screens' style: 2px round strokes. */
export const Icon = {
  /** v1.6: home top-bar menu measured 15.9 CSS bars / 2.07 stroke / 4.84
   * pitch (HD5 home-en) — 24px box with bars at y7/12/17 (pitch 5), not the
   * old 20px / y6/12/18 (bars 13.3, pitch 5.0, stroke 1.67). All nav-bar
   * usages (home, drawer, chat-info backdrop) share this form. */
  menu: (c: string, s = 24) => (
    <svg {...base(s, c)}><path d="M4 7h16M4 12h16M4 17h16" /></svg>
  ),
  back: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M15 18l-6-6 6-6" /></svg>
  ),
  close: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M18 6L6 18M6 6l12 12" /></svg>
  ),
  plus: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M12 5v14M5 12h14" /></svg>
  ),
  mic: (c: string, s = 20) => (
    <svg {...base(s, c)}><rect x="9" y="2" width="6" height="12" rx="3" /><path d="M5 10a7 7 0 0 0 14 0M12 19v3" /></svg>
  ),
  check: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M20 6L9 17l-5-5" /></svg>
  ),
  chevronDown: (c: string, s = 16) => (
    <svg {...base(s, c)}><path d="M6 9l6 6 6-6" /></svg>
  ),
  chevronRight: (c: string, s = 16) => (
    <svg {...base(s, c)}><path d="M9 18l6-6-6-6" /></svg>
  ),
  search: (c: string, s = 20) => (
    <svg {...base(s, c)}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /></svg>
  ),
  edit: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M12 20h9" /><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4z" /></svg>
  ),
  clock: (c: string, s = 20) => (
    <svg {...base(s, c)}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>
  ),
  /** v1.3 P2-6: home top-bar clock is a dashed ring + hands in the original
   * (ov-home-en top-right), not the solid-ring clock used elsewhere. */
  clockDashed: (c: string, s = 18) => (
    <svg {...base(s, c)}><circle cx="12" cy="12" r="9" strokeDasharray="2.5 3" /><path d="M12 7v5l3 2" /></svg>
  ),
  /** v1.6: Lucide 1.63.0 lock — verbatim geometry (picker Fable "Pro+"
   * badge carries a lock glyph before the pill in the original). */
  lock: (c: string, s = 20) => (
    <svg {...base(s, c)}><rect width="18" height="11" x="3" y="11" rx="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></svg>
  ),
  /** v1.6: Lucide 1.63.0 list-checks — verbatim geometry (drawer "Agent
   * tasks" icon is a check-list, not three dots, per the OV drawer zoom). */
  listChecks: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M13 5h8" /><path d="M13 12h8" /><path d="M13 19h8" /><path d="m3 17 2 2 4-4" /><path d="m3 7 2 2 4-4" /></svg>
  ),
  /** v1.3 S11: Lucide 1.63.0 pause — two rounded rects, verbatim geometry. */
  pause: (c: string, s = 20) => (
    <svg {...base(s, c)}><rect x="14" y="3" width="5" height="18" rx="1" /><rect x="5" y="3" width="5" height="18" rx="1" /></svg>
  ),
  /** v1.3 S11: Lucide 1.63.0 square — 18x18 rounded rect, verbatim. */
  square: (c: string, s = 20) => (
    <svg {...base(s, c)}><rect width="18" height="18" x="3" y="3" rx="2" /></svg>
  ),
  /** v1.3 I2: Lucide 1.63.0 circle-check — circle r10 + check, verbatim. */
  checkCircle: (c: string, s = 20) => (
    <svg {...base(s, c)}><circle cx="12" cy="12" r="10" /><path d="m16 9-5.5 5.5L8 12" /></svg>
  ),
  /** v1.3 P2-5: router notice glyph is a shield outline in the original
   * (ov-router), not "!". Lucide 1.63.0 shield path, verbatim. */
  shield: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" /></svg>
  ),
  /** v1.3 sweep: Kyoto "Show map" icon is a folded map, not a pin.
   * Lucide 1.63.0 map, verbatim. */
  map: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z" /><path d="M15 5.764v15" /><path d="M9 3.236v15" /></svg>
  ),
  /** v1.3 sweep: Kyoto weather glyphs. Lucide 1.63.0 sun / cloud-rain, verbatim. */
  sun: (c: string, s = 20) => (
    <svg {...base(s, c)}><circle cx="12" cy="12" r="4" /><path d="M12 2v2" /><path d="M12 20v2" /><path d="m4.93 4.93 1.41 1.41" /><path d="m17.66 17.66 1.41 1.41" /><path d="M2 12h2" /><path d="M20 12h2" /><path d="m6.34 17.66-1.41 1.41" /><path d="m19.07 4.93-1.41 1.41" /></svg>
  ),
  cloudRain: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" /><path d="M16 14v6" /><path d="M8 14v6" /><path d="M12 16v6" /></svg>
  ),
  /** v1.3 sweep: Train suggestion arrow. Lucide 1.63.0 corner-up-right, verbatim. */
  cornerUpRight: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="m15 14 5-5-5-5" /><path d="M4 20v-7a4 4 0 0 1 4-4h12" /></svg>
  ),
  copy: (c: string, s = 18) => (
    <svg {...base(s, c)}><rect x="9" y="9" width="12" height="12" rx="2" /><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" /></svg>
  ),
  refresh: (c: string, s = 18) => (
    <svg {...base(s, c)}><path d="M21 12a9 9 0 1 1-2.6-6.4M21 3v6h-6" /></svg>
  ),
  like: (c: string, s = 18) => (
    <svg {...base(s, c)}><path d="M7 10v12M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z" /></svg>
  ),
  dislike: (c: string, s = 18) => (
    <svg {...base(s, c)}><path d="M17 14V2M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z" /></svg>
  ),
  more: (c: string, s = 18) => (
    <svg {...base(s, c)}><circle cx="12" cy="12" r="1" /><circle cx="19" cy="12" r="1" /><circle cx="5" cy="12" r="1" /></svg>
  ),
  info: (c: string, s = 20) => (
    <svg {...base(s, c)}><circle cx="12" cy="12" r="9" /><path d="M12 16v-4M12 8h.01" /></svg>
  ),
  gear: (c: string, s = 20) => (
    <svg {...base(s, c)}><circle cx="12" cy="12" r="3" /><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 1 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 1 1-4 0v-.09a1.65 1.65 0 0 0-1-1.51 1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 1 1-2.83-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 1 1 0-4h.09a1.65 1.65 0 0 0 1.51-1 1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 1 1 2.83-2.83l.06.06a1.65 1.65 0 0 0 1.82.33h.01a1.65 1.65 0 0 0 1-1.51V3a2 2 0 1 1 4 0v.09a1.65 1.65 0 0 0 1 1.51h.01a1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 1 1 2.83 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82v.01a1.65 1.65 0 0 0 1.51 1H21a2 2 0 1 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
  ),
  send: (c: string, s = 20) => (
    <svg width={s} height={s} viewBox="0 0 24 24" fill="none" stroke={c} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7" /></svg>
  ),
  news: (c: string, s = 20) => (
    <svg {...base(s, c)}><rect x="5" y="3" width="14" height="18" rx="2" /><path d="M8 7h8M8 11h8M8 15h5" /></svg>
  ),
  pdf: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M7 3h7l5 5v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1z" /><path d="M14 3v5h5M9 13h6M9 17h6" /></svg>
  ),
  image: (c: string, s = 20) => (
    <svg {...base(s, c)}><rect x="3" y="5" width="18" height="14" rx="2" /><circle cx="9" cy="10" r="1.5" /><path d="M21 16l-5-5L5 19" /></svg>
  ),
  cards: (c: string, s = 20) => (
    <svg {...base(s, c)}><rect x="3" y="7" width="13" height="12" rx="2" /><path d="M7 7V5a2 2 0 0 1 2-2h11v12" /></svg>
  ),
  mapPin: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
  ),
  calendar: (c: string, s = 20) => (
    <svg {...base(s, c)}><rect x="3" y="5" width="18" height="16" rx="2" /><path d="M16 3v4M8 3v4M3 11h18" /></svg>
  ),
  folder: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" /></svg>
  ),
  searchOrbit: (c: string, s = 20) => (
    <svg {...base(s, c)}><circle cx="11" cy="11" r="7" /><path d="M21 21l-4.3-4.3" /><path d="M4 4a8 8 0 0 1 3-1.5" /></svg>
  ),
  download: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M12 3v10" /><path d="M7 10l5 5 5-5" /><path d="M4 19h16" /></svg>
  ),
  trash: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M4 7h16" /><path d="M9 7V5h6v2" /><path d="M6 7l1 13h10l1-13" /><path d="M10 11v5M14 11v5" /></svg>
  ),
  logout: (c: string, s = 20) => (
    <svg {...base(s, c)}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></svg>
  ),
};

export function IconWrap({ children, className }: { children: ReactNode; className?: string }) {
  return <span className={cn("inline-flex shrink-0", className)}>{children}</span>;
}

export type { IconProps };
