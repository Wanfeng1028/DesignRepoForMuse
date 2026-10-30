/**
 * Avatar — own vector redraws of illustrated characters, one per member.
 * The official portraits are bitmaps and are never copied; each member gets
 * a distinct figure (head colour, hair, accessory) on their own blob colour,
 * replacing the previous uniform smiley circle (A1-A7).
 * Blob colours are sampled from the official screenshots (v1.8): iphone-03
 * chat grid + ipad-01 member column (Pluso cyan #50e2f1, Ampo blue #1fb0df
 * with pink face, Camo #ffb11b, Qesto #ff5ec0, Ato #9bc24d, Leto #ff8b60,
 * Colo deep purple #8a5fe0 with pink face). Pluso is monochrome cyan (no
 * dark head disc in the original); the file-card sender is a separate
 * purple/orange figure, not Ampo.
 */
import type { ReactNode } from 'react'

export type AvatarProps = {
  name: string
  /** background blob colour (sampled, see header) */
  color?: string
  size?: number
  className?: string
  /** home-list badge only (chat avatars carry none in the original):
   *  'dot' = Pluso orange unread dot, 'cup' = Camo coffee-cup badge */
  badge?: 'dot' | 'cup'
}

const FALLBACK: Record<string, string> = {
  Pluso: '#50e2f1',
  Camo: '#ffb11b',
  Qesto: '#ff5ec0',
  Ato: '#9bc24d',
  Ampo: '#1fb0df',
  Leto: '#ff8b60',
  Colo: '#8a5fe0',
}

/** Per-member figure: head colour, hair colour/shape, accessory, mouth. */
type Variant = {
  head: string
  hair: string
  hairPath: string
  accessory?: ReactNode
  mouth: string
}

const VARIANTS: Record<string, Variant> = {
  // Cyan blob, monochrome: face is the blob colour itself (iphone-03 grid
  // shows no dark head disc), darker cyan cap on top, open smile.
  Pluso: { head: '#50e2f1', hair: '#2aa8c0', hairPath: 'M11 13c0-4 4-6 9-6s9 2 9 6c-2-2-3-3-5-3-1-2-3-2-4 0-2-1-4 0-5 2-2 0-3 0-4 1Z', mouth: 'M15 26c1.5 2.5 3.5 3.5 5 3.5s3.5-1 5-3.5' },
  // Blue blob, pink face, blue cap (iphone-03 grid: blue #1fb0df top,
  // white/pink face below; ipad-01 member column agrees).
  Ampo: { head: '#fdccc8', hair: '#1fb0df', hairPath: 'M11 14c1-5 6-7 11-6 4 1 7 3 7 6-3-1-5-1-7 0-2-2-5-2-7 0-2 1-4 1-4 0Z', mouth: 'M15 26h10' },
  // Deep purple blob, pink face, beret + palette dots (iphone-04 tile:
  // purple #8f5fe6/#8460ce, face #ff96cf).
  Colo: {
    head: '#ff96cf', hair: '#7c3aed', hairPath: 'M10 13c2-5 7-7 10-7s8 2 10 7c-3-2-6-3-10-3s-7 1-10 3Z', mouth: 'M15 25c1.5 2 3.5 3 5 3s3.5-1 5-3',
    accessory: (<><circle cx="17" cy="7.5" r="1.3" fill="#f472b6" /><circle cx="21" cy="6.5" r="1.3" fill="#34d399" /><circle cx="25" cy="7.5" r="1.3" fill="#facc15" /></>),
  },
  // Green blob, pale pink face, curly top (iphone-06 tile face #fccccc).
  Ato: { head: '#fccccc', hair: '#be185d', hairPath: 'M11 14c0-3 2-4 3-2 1-3 4-3 5-1 1-2 4-2 5 1 2-1 3 1 2 3-2-2-4-3-7-3s-6 1-8 2Z', mouth: 'M15 26c1.5 2.5 3.5 3.5 5 3.5s3.5-1 5-3.5' },
  // Yellow blob, brown cap figure.
  Camo: { head: '#fde68a', hair: '#92400e', hairPath: 'M10 14c1-5 5-8 10-8s9 3 10 8H10Z', mouth: 'M16 26c1 1.5 2.5 2 4 2s3-.5 4-2' },
  // Vivid pink blob, dark curly figure.
  Qesto: { head: '#fbcfe8', hair: '#831843', hairPath: 'M11 14c-1-3 1-5 3-3 0-3 3-4 5-2 2-2 5-1 5 2 2-1 4 1 3 3-3-2-6-3-9-3s-5 1-7 3Z', mouth: 'M15 25c1.5 2 3.5 3 5 3s3.5-1 5-3' },
  // Peach-orange blob, glasses figure.
  Leto: {
    head: '#ffedd5', hair: '#431407', hairPath: 'M11 13c0-4 4-6 9-6s9 2 9 6c-4-2-14-2-18 0Z', mouth: 'M15 26h10',
    accessory: (<><circle cx="14.5" cy="20" r="3.4" fill="none" stroke="#11110f" strokeWidth="1.2" /><circle cx="25.5" cy="20" r="3.4" fill="none" stroke="#11110f" strokeWidth="1.2" /><path d="M18 20h4" stroke="#11110f" strokeWidth="1.2" /></>),
  },
  // File-card sender (right-edge avatar in iphone-03): purple blob
  // #865eff sliver + orange figure with dark hair. Not Ampo.
  Sender: { head: '#fb923c', hair: '#1f2937', hairPath: 'M11 14c1-5 6-7 11-6 4 1 7 3 7 6-3-1-5-1-7 0-2-2-5-2-7 0-2 1-4 1-4 0Z', mouth: 'M15 26h10' },
}

const GENERIC: Variant = {
  head: '#fde68a', hair: '#44403c', hairPath: 'M11 13c0-4 4-6 9-6s9 2 9 6c-2-2-3-3-5-3-1-2-3-2-4 0-2-1-4 0-5 2-2 0-3 0-4 1Z', mouth: 'M15 26c1.5 2.5 3.5 3.5 5 3.5s3.5-1 5-3.5',
}

export function Avatar({ name, color, size = 40, className, badge }: AvatarProps) {
  const bg = color ?? FALLBACK[name] ?? '#9ca3af'
  const v = VARIANTS[name] ?? GENERIC
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-label={name} role="img">
      <circle cx="20" cy="20" r="20" fill={bg} />
      <circle cx="20" cy="20" r="19" fill="none" stroke="rgba(0,0,0,0.06)" />
      {/* illustrated figure: head + hair + face, distinct per member */}
      <circle cx="20" cy="21" r="9.5" fill={v.head} />
      <path d={v.hairPath} fill={v.hair} />
      {v.accessory}
      <circle cx="16.5" cy="21" r="1.5" fill="#11110f" />
      <circle cx="23.5" cy="21" r="1.5" fill="#11110f" />
      <path d={v.mouth} stroke="#11110f" strokeWidth="1.5" strokeLinecap="round" fill="none" />
      <circle cx="12.5" cy="24" r="1.8" fill="rgba(255,255,255,0.35)" />
      <circle cx="27.5" cy="24" r="1.8" fill="rgba(255,255,255,0.35)" />
      {badge === 'dot' ? (<><circle cx="33" cy="7" r="5" fill="#ffffff" /><circle cx="33" cy="7" r="4" fill="#ea943f" /></>) : null}
      {badge === 'cup' ? (
        <g>
          <circle cx="33" cy="7" r="8" fill="#ffffff" stroke="rgba(0,0,0,0.08)" />
          <path d="M29.5 4.5h6v3.5a3 3 0 0 1-3 3h0a3 3 0 0 1-3-3Z" fill="#6b4a2f" />
          <path d="M35.5 5.5h0.8a1.4 1.4 0 0 1 0 2.8h-0.8" fill="none" stroke="#6b4a2f" strokeWidth="1" />
        </g>
      ) : null}
    </svg>
  )
}
