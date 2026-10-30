/**
 * Vector-redrawn illustrated member figures. NOT official bitmaps, NOT
 * letter blocks: each roster member gets a distinct hand-drawn SVG face on
 * a SATURATED disc. v1.4 corrects the v1.2 pale-tint flattening: the
 * original discs are saturated (ipad-01 sidebar discs + REA roster
 * portraits, pixel-sampled, see CHANGELOG v1.4), so the disc is the
 * member colour itself, not a pale tint with a lightened blob patch.
 * Ato green + sprout, Pluso cyan open smile, Colo purple + freckles,
 * Camo yellow happy-arc eyes, Ampo blue + glasses, Leto orange + blush
 * and dark hair tuft (pink belongs to Qesto, who is not in this roster).
 * Unknown names fall back to the plain smile figure.
 * Geometry is drawn in a 28x28 viewBox and scales with `size`.
 * `ring` renders the original agent-row inset 1px rgba(0,0,0,0.06) ring;
 * message / typing / feed avatars have no ring in the original.
 */

const DARK = '#1c1c1a'
type Face = { eyes: React.ReactNode; mouth: React.ReactNode; extra?: React.ReactNode }
function faces(): Record<string, Face> {
  const dot = (cx: number, cy: number, r = 1.7) => <circle key={`${cx}-${cy}`} cx={cx} cy={cy} r={r} fill={DARK} />
  const smile = (d: string) => <path d={d} fill="none" stroke={DARK} strokeWidth={1.6} strokeLinecap="round" />
  const arcEye = (cx: number, cy: number) => <path key={`a${cx}`} d={`M ${cx - 2} ${cy + 1} Q ${cx} ${cy - 2.2} ${cx + 2} ${cy + 1}`} fill="none" stroke={DARK} strokeWidth={1.6} strokeLinecap="round" />
  return {
    ato: {
      eyes: <>{dot(10.5, 14)}{dot(17.5, 14)}</>,
      mouth: smile('M 11 18.5 Q 14 21 17 18.5'),
      extra: <path d="M 14 7.5 C 14 5.5 15.5 4.5 17.5 4.5 C 17.5 6.5 16 7.5 14 7.5 Z" fill="#2f7d4f" />,
    },
    pluso: {
      eyes: <>{dot(10.5, 13.5, 1.9)}{dot(17.5, 13.5, 1.9)}</>,
      mouth: <path d="M 10.5 17.5 Q 14 21.5 17.5 17.5 Q 14 19 10.5 17.5 Z" fill={DARK} />,
    },
    colo: {
      eyes: <>{dot(10.5, 14)}{dot(17.5, 14)}</>,
      mouth: smile('M 11.5 18 Q 14 20 16.5 18'),
      extra: <><circle cx={9} cy={16.5} r={0.9} fill="#b45309" /><circle cx={19} cy={16.5} r={0.9} fill="#b45309" /></>,
    },
    camo: {
      eyes: <>{arcEye(10.5, 14.5)}{arcEye(17.5, 14.5)}</>,
      mouth: <path d="M 10.5 17 Q 14 21 17.5 17 Q 14 18.5 10.5 17 Z" fill={DARK} />,
    },
    ampo: {
      eyes: <>{dot(10.5, 14)}{dot(17.5, 14)}</>,
      mouth: smile('M 11 18.5 Q 14 20.5 17 18.5'),
      extra: <g fill="none" stroke={DARK} strokeWidth={1.2}><circle cx={10.5} cy={14} r={3.4} /><circle cx={17.5} cy={14} r={3.4} /><path d="M 13.9 14 H 14.1 M 7.1 13.5 L 5.5 12.5 M 20.9 13.5 L 22.5 12.5" /></g>,
    },
    leto: {
      eyes: <>{dot(10.5, 14)}{dot(17.5, 14)}</>,
      mouth: smile('M 11 18.5 Q 14 21 17 18.5'),
      extra: <><path d="M 14 7 C 12 5 11 4 9.5 4.5 C 11 5.5 12.5 6.5 14 7 Z" fill={DARK} /><circle cx={8.5} cy={17} r={1.4} fill="#f472b6" /><circle cx={19.5} cy={17} r={1.4} fill="#f472b6" /></>,
    },
  }
}

export function AvatarBlob({ name, color, size = 28, ring = false }: { name: string; color: string; size?: number; ring?: boolean }) {
  const key = name.toLowerCase()
  const face = faces()[key] ?? {
    eyes: <><circle cx={10.5} cy={14} r={1.7} fill={DARK} /><circle cx={17.5} cy={14} r={1.7} fill={DARK} /></>,
    mouth: <path d="M 11 18.5 Q 14 21 17 18.5" fill="none" stroke={DARK} strokeWidth={1.6} strokeLinecap="round" />,
  }
  return (
    <svg width={size} height={size} viewBox="0 0 28 28" aria-label={name} style={{ flex: 'none', display: 'block', borderRadius: '50%' }}>
      <circle cx={14} cy={14} r={14} fill={color} />
      {ring ? <circle cx={14} cy={14} r={13.5} fill="none" stroke="rgba(0,0,0,0.06)" /> : null}
      {face.extra}
      {face.eyes}
      {face.mouth}
    </svg>
  )
}
