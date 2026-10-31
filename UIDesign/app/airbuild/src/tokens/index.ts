/**
 * AirBuild mobile tokens. Values traced to:
 * - ~/workspace/airbuild-rea/AIRBUILD-REA-20261029.md table A (web chat model)
 *   for ink / muted / user blue #0088fe / green #2ecb70 / task card #ffffff /
 *   status pill padding 3px 7px 999px 9px / SF Pro Rounded-first font stack.
 * - App Store screenshots for mobile-only geometry (phone bubble radius
 *   13px: round-8 corner fit on iphone-03 user + agent bubbles, ~32 orig px
 *   ≈ 12.1pt, REA web bubble radius 13px; phone-frame 390x844, composer
 *   two-row layout). Where the web model and the phone screenshots differ,
 *   the phone screenshot wins for this set.
 */
export const tokens = {
  ink: '#11110f',
  muted: 'rgba(17, 17, 15, 0.46)',
  faint: 'rgba(17, 17, 15, 0.34)',
  canvas: '#f4f4f4',
  card: '#ffffff',
  tile: '#f4f4f2',
  hairline: 'rgba(0, 0, 0, 0.06)',
  userBlue: '#0088fe',
  onlineGreen: '#34c759',
  taskBg: '#ffffff',
  taskLine: 'rgba(0, 0, 0, 0.06)',
  taskInk: '#11110f',
  taskMuted: 'rgba(17, 17, 15, 0.55)',
  actionOrange: '#f97316',
  bubbleRadius: 13,
  cardRadius: 20,
  /** frosted-glass material (round 9 / v1.10, B line): floating-control
   *  gradient (REA). The live material is the .ab-glass CSS class:
   *  gradient + small-control frost tier blur 10px saturate 1.5 (REA
   *  blur 34px is the large chat-window value) + rim-light set + REA
   *  floating shadow, upgraded at runtime with SVG displacement
   *  (src/lib/liquid-glass.ts, strength 16 / cab 2). This token documents
   *  the same gradient for non-CSS consumers. Not referenced by components
   *  today. Font tokens are untouched: on Apple devices the stack still
   *  resolves to SF; see CHANGELOG v1.10 for the SF render evidence. */
  glass: 'linear-gradient(325deg, rgba(255, 255, 255, 0.78), rgba(255, 255, 255, 0.48) 48%, rgba(245, 247, 250, 0.24))',
  fontStack:
    '"SF Pro Rounded", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
  /** v1.11 motion tokens (document the CSS values in index.css; the CSS
   *  is the live value, this object is the single prose source of truth):
   *  - pushPop / sheet: the iOS drawer curve cubic-bezier(0.32,0.72,0,1)
   *    (REA: drawer 240ms with this curve); phone push uses 400ms and
   *    sheet enter 500ms / dismiss 350ms of the same curve.
   *  - messageIn: REA verbatim — 260ms cubic-bezier(0.22,1,0.36,1),
   *    from opacity 0 / translateY(8px) scale(0.985).
   *  - typing: REA verbatim — 800ms alternate, delays 0/160/320ms.
   *  - press: 100ms down, 350ms iOS-curve release, scale 0.97 + opacity 0.85.
   *  - springParams: no spring solver is used — every motion is a timed
   *    cubic-bezier; nothing here claims a mass/stiffness/damping value
   *    that was not measured. Reduced motion kills all of it (CSS media
   *    query + JS matchMedia, REA precedent: render everything at once). */
  motion: {
    pushPop: '400ms cubic-bezier(0.32,0.72,0,1)',
    sheetEnter: '500ms cubic-bezier(0.32,0.72,0,1)',
    sheetDismiss: '350ms cubic-bezier(0.32,0.72,0,1)',
    sheetDismissThreshold: '120px or flick > 0.65px/ms',
    messageIn: '260ms cubic-bezier(0.22,1,0.36,1)',
    typing: '800ms alternate, delays 0/160/320ms',
    press: '100ms down / 350ms cubic-bezier(0.32,0.72,0,1) release, scale 0.97 + opacity 0.85',
    springParams: 'unmeasured — timed cubic-bezier curves only, no solver values claimed',
  },
} as const

export type Tokens = typeof tokens
