/** Credits chart: ~20 stacked bars, brown-gold base + pink + teal tips,
 *  matching the measured #8c553c column body. Heights are props. */
export function CreditsChart({ bars }: { bars: number[] }) {
  return (
    <div className="relative">
      <div className="absolute bottom-0 left-[60%] top-0 z-[1] border-l border-dashed border-light-dim" />
      <div className="mt-1 flex h-[110px] items-end gap-[3px]">
        {bars.map((h, i) => (
          <div key={i} className="flex flex-1 flex-col-reverse" style={{ height: h }}>
            <div className="bg-chart-amber" style={{ height: Math.round(h * 0.55) }} />
            <div className="bg-chart-pink" style={{ height: Math.round(h * 0.3) }} />
            <div className="rounded-t-[2px] bg-chart-teal" style={{ height: Math.max(2, Math.round(h * 0.15)) }} />
          </div>
        ))}
      </div>
    </div>
  )
}

export function CreditsRow({
  name,
  sub,
  amount,
  pct,
  last,
}: {
  name: string
  sub: string
  amount: string
  pct: string
  last?: boolean
}) {
  return (
    <div className={`flex items-center justify-between py-3 ${last ? '' : 'border-b border-light-divider'}`}>
      <div>
        <div className="text-[15px] font-medium text-light-text">{name}</div>
        <div className="mt-0.5 text-secondary text-light-sub">{sub}</div>
      </div>
      <div className="text-right">
        <div className="text-[15px] font-bold text-light-text">{amount}</div>
        <div className="mt-0.5 text-secondary text-light-sub">{pct}</div>
      </div>
    </div>
  )
}
