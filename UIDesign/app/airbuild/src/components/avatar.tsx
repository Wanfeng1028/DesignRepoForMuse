/**
 * Avatar — own redrawn circular blob character. The official portraits are
 * bitmaps with no vector source, so exact colours cannot be reproduced; these
 * are approximations in the same "coloured blob + simple face" idiom.
 */
export type AvatarProps = {
  name: string
  /** background blob colour (approx.) */
  color?: string
  size?: number
  className?: string
}

const FALLBACK: Record<string, string> = {
  Pluso: '#45c8d8',
  Camo: '#f5c518',
  Qesto: '#f27ba7',
  Ato: '#8fd14f',
  Ampo: '#9b7bf3',
  Leto: '#f59e0b',
  Colo: '#a78bfa',
}

export function Avatar({ name, color, size = 40, className }: AvatarProps) {
  const bg = color ?? FALLBACK[name] ?? '#9ca3af'
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" className={className} aria-label={name} role="img">
      <circle cx="20" cy="20" r="20" fill={bg} />
      <circle cx="20" cy="20" r="19" fill="none" stroke="rgba(0,0,0,0.06)" />
      <circle cx="14" cy="17" r="2" fill="#11110f" />
      <circle cx="26" cy="17" r="2" fill="#11110f" />
      <path d="M14 24c1.5 2.5 3.5 3.5 6 3.5s4.5-1 6-3.5" stroke="#11110f" strokeWidth="1.8" strokeLinecap="round" fill="none" />
      <circle cx="10.5" cy="22" r="2.2" fill="rgba(255,255,255,0.35)" />
      <circle cx="29.5" cy="22" r="2.2" fill="rgba(255,255,255,0.35)" />
    </svg>
  )
}
