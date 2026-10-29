/** Self-drawn blob-character avatar — NOT the official webp portrait. Colour and face are approximations of the "round blob character" morphology; the exact official artwork is not reproduced. */
function lighten(hex: string, mix = 0.55): string {
  const m = hex.replace('#', '')
  const r = parseInt(m.slice(0, 2), 16), g = parseInt(m.slice(2, 4), 16), b = parseInt(m.slice(4, 6), 16)
  const c = (v: number) => Math.round(v + (255 - v) * mix)
  return `rgb(${c(r)}, ${c(g)}, ${c(b)})`
}
export function AvatarBlob({ name, color, bg, size = 28 }: { name: string; color: string; bg: string; size?: number }) {
  const eye = Math.max(2, Math.round(size * 0.11))
  const gap = Math.round(size * 0.16)
  const blob = lighten(color)
  return (
    <div
      aria-label={name}
      style={{ width: size, height: size, borderRadius: '50%', background: bg, flex: 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.06)', overflow: 'hidden', position: 'relative' }}
    >
      <span style={{ position: 'absolute', width: size * 0.66, height: size * 0.62, top: size * 0.2, left: size * 0.17,
        borderRadius: '48% 52% 55% 45% / 55% 48% 52% 45%', background: blob }} />
      <span style={{ position: 'absolute', top: size * 0.38, left: `calc(50% - ${gap}px)`, width: eye, height: eye, borderRadius: '50%', background: '#1c1c1a' }} />
      <span style={{ position: 'absolute', top: size * 0.38, left: `calc(50% + ${gap - eye}px)`, width: eye, height: eye, borderRadius: '50%', background: '#1c1c1a' }} />
    </div>
  )
}
