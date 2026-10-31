/** AirBuild chat-window tokens. v1.3 decision: where the base stylesheet and
 * the Shadow DOM override layer disagree, the SHADOW layer wins, because it
 * is the layer that actually renders on the homepage (shadow <style> is
 * appended after the <link>, and carries !important). v1.2 chose base values
 * for these rows; v1.3 corrects them. See CHANGELOG v1.3. */
export const tokens = {
  canvas: { width: 1200, height: 668, radius: 18 },
  windowBg: 'rgba(244,246,244,0.42)',
  windowFilter: 'blur(34px) saturate(1.24)',
  ink: '#11110f',
  muted: 'rgba(17,17,15,0.46)',
  hairline: 'rgba(17,17,15,0.045)',
  divider: 'rgba(17,17,15,0.045)',
  blue: '#1987f7',
  green: '#2ecb70',
  sidebar: { width: 198, bg: 'rgba(226,228,226,0.56)' },
  conversation: { minWidth: 320, bg: 'rgba(249,249,247,0.54)', titleBg: 'rgba(249,249,247,0.54)' },
  preview: { minWidth: 310, widthPct: 42, bg: 'rgba(246,247,245,0.36)', tabBg: '#f7f7f5', tabHeight: 36 },
  font: '"SF Pro Rounded", "SF Pro Display", -apple-system, BlinkMacSystemFont, "Helvetica Neue", sans-serif',
  agentBubble: { bg: '#ffffff', border: 'rgba(0,0,0,0.045)', shadow: '0 5px 16px rgba(0,0,0,0.025)', padding: '10px 12px', radius: 13, fontSize: 12, lineHeight: 1.38 },
  userBubble: { bg: '#1987f7', maxWidth: 'min(78%, 310px)' },
  agentRow: { grid: '30px 1fr auto', gap: 7, minHeight: 42, padding: '4px 5px', radius: 9, nameSize: 11, bioSize: 8 },
  projectTile: { aspect: 1.25, radius: 12, bg: 'rgba(255,255,255,0.34)', iconSize: 32, iconRadius: '32%' },
  composer: { height: 32, radius: 999, margin: '0 14px 10px', bg: 'linear-gradient(325deg, rgba(255,255,255,0.78), rgba(245,247,250,0.24))', shadow: 'inset 0 1px 0 rgba(255,255,255,0.38), 0 3px 8px rgba(0,0,0,0.08)' },
  taskCard: { bg: '#fffaf2', border: 'rgba(17,17,15,0.045)', radius: 12, padding: 12, fontSize: 10, titleColor: '#53412e', titleSize: 11 },
  statusPill: { padding: '3px 7px', radius: 999, fontSize: 9, successColor: '#167b3d', successBg: '#e7f8ed' },
  toast: { bottom: 16, bg: 'rgba(18,18,18,0.88)', radius: 999, padding: '10px 14px' },
  drawerMs: 240,
  messageInMs: 260,
  trafficLights: ['#ff5f57', '#febc2e', '#28c840'],
  /** Shared floating-control material: base shared block + shadow override.
   * Shadow inset is 0 1px (not the base shared block's 1px 1px); shadow wins. */
  controlBg: 'linear-gradient(325deg, rgba(255,255,255,0.78), rgba(245,247,250,0.24))',
  controlShadow: 'inset 0 1px 0 rgba(255,255,255,0.38), inset -1px -1px 1px rgba(255,255,255,0.40), 0 3px 8px rgba(0,0,0,0.08)',
  /** Sidebar footer buttons: shadow layer puts them in the shared gradient
   * list, so they share the control material (v1.2's flat base row is out). */
  footerBg: 'linear-gradient(325deg, rgba(255,255,255,0.78), rgba(245,247,250,0.24))',
  footerBorder: 'none',
  footerShadow: 'inset 0 1px 0 rgba(255,255,255,0.38), inset -1px -1px 1px rgba(255,255,255,0.40), 0 3px 8px rgba(0,0,0,0.08)',
} as const
export type Tokens = typeof tokens
