/**
 * AirBuild mobile tokens. Values traced to:
 * - ~/workspace/airbuild-rea/AIRBUILD-REA-20261029.md table A (web chat model)
 *   for ink / muted / user blue #1987f7 / green #2ecb70 / task card #fffaf2 /
 *   status pill padding 3px 7px 999px 9px / SF Pro Rounded-first font stack.
 * - App Store screenshots for mobile-only geometry (bubble radius ~16px on
 *   phone, phone-frame 390x844, composer two-row layout). Where the web model
 *   and the phone screenshots differ, the phone screenshot wins for this set.
 */
export const tokens = {
  ink: '#11110f',
  muted: 'rgba(17, 17, 15, 0.46)',
  faint: 'rgba(17, 17, 15, 0.34)',
  canvas: '#f9f9f7',
  card: '#ffffff',
  tile: '#f4f4f2',
  hairline: 'rgba(0, 0, 0, 0.06)',
  userBlue: '#1987f7',
  onlineGreen: '#2ecb70',
  taskBg: '#fffaf2',
  taskLine: 'rgba(94, 74, 46, 0.12)',
  taskInk: '#53412e',
  taskMuted: '#88755e',
  actionOrange: '#f97316',
  bubbleRadius: 16,
  cardRadius: 20,
  fontStack:
    '"SF Pro Rounded", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", Arial, sans-serif',
} as const

export type Tokens = typeof tokens
