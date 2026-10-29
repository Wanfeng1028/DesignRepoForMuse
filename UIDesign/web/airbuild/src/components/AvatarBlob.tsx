/** Self-drawn circular blob avatar — NOT the official webp. Colour is an approximation. */
export function AvatarBlob({ name, color, bg, size = 28, sub }: { name: string; color: string; bg: string; size?: number; sub?: string }) {
  const initials = name.slice(0, 1).toUpperCase()
  return (
    <div
      aria-label={name}
      style={{ width: size, height: size, borderRadius: '50%', background: bg, color, flex: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: size * 0.42, fontWeight: 700,
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)', overflow: 'hidden', position: 'relative' }}
    >
      <span style={{ position: 'absolute', width: size * 0.62, height: size * 0.62, borderRadius: '50%', background: color, opacity: 0.28, top: size * 0.08, left: size * 0.19 }} />
      <span style={{ position: 'relative' }}>{initials}</span>
      {sub ? <span style={{ display: 'none' }}>{sub}</span> : null}
    </div>
  )
}
