import { Card } from './ui/card.tsx'

export type AirDailyCardProps = {
  headline: string
  body: string
  date: string
  glance: string
  onShare?: () => void
}

/** The Air Daily report card: eyebrow row, headline, body, teal cover block, At a glance. */
export function AirDailyCard({ headline, body, date, glance, onShare }: AirDailyCardProps) {
  return (
    <Card className="overflow-hidden rounded-[24px] p-4">
      <div className="flex items-center justify-between text-[10px] font-semibold text-black/45">
        <span>▦ Made in AirBuild</span>
        <button type="button" onClick={onShare} className="rounded-full bg-[#f4f4f2] px-2 py-0.5 text-[10px] font-medium">Share</button>
      </div>
      <h3 className="mt-3 text-[17px] font-bold leading-tight text-[#11110f]">{headline}</h3>
      <p className="mt-2 text-[12px] leading-relaxed text-black/55">{body}</p>
      <div className="mt-3 flex h-[150px] flex-col justify-end rounded-[14px] p-3" style={{ background: 'linear-gradient(160deg,#2e7d7b,#1f4f4a)' }}>
        <p className="text-[17px] font-bold text-white">The Air Daily</p>
        <p className="text-[12px] text-white/85">A little perspective on your apps</p>
      </div>
      <p className="mt-3 text-[14px] font-bold text-[#11110f]">At a glance</p>
      <p className="mt-1 text-[12px] leading-snug text-black/55">{glance}</p>
      <p className="mt-2 text-[10px] text-black/40">{date}</p>
    </Card>
  )
}

export type SalesStat = { value: string; label: string; delta: string }
export type SalesReportCardProps = {
  title: string
  body: string
  stats: SalesStat[]
  /** weekly points 0..1, rendered as an SVG line chart */
  series: number[]
}

/** Sales Report card: headline, body, stat row (downloads / proceeds), SVG line chart. */
export function SalesReportCard({ title, body, stats, series }: SalesReportCardProps) {
  const w = 280
  const h = 80
  const x = (i: number) => 14 + (i / (series.length - 1)) * (w - 28)
  const y = (v: number) => h - 8 - v * (h - 20)
  const pts = series.map((v, i) => `${x(i)},${y(v)}`).join(' ')
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  return (
    <Card className="rounded-[24px] p-4">
      <div className="flex items-center justify-between text-[10px] font-semibold text-black/45">
        <span>▦ Made in AirBuild</span>
        <span>Share</span>
      </div>
      <h3 className="mt-3 text-[17px] font-bold leading-tight text-[#11110f]">{title}</h3>
      <p className="mt-2 text-[12px] leading-relaxed text-black/55">{body}</p>
      <div className="mt-3 grid grid-cols-2 gap-3 border-y border-black/[0.06] py-3">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-[18px] font-bold text-[#11110f]">{s.value}</p>
            <p className="text-[11px] text-black/45">{s.label} · <span className="text-[#167b3d]">{s.delta}</span></p>
          </div>
        ))}
      </div>
      <p className="mt-3 text-[12px] font-bold text-[#11110f]">Performance</p>
      <svg viewBox={`0 0 ${w} ${h + 14}`} className="mt-1 w-full" role="img" aria-label="Downloads trend">
        <polyline points={pts} fill="none" stroke="#0088fe" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" />
        {series.map((v, i) => (
          <circle key={i} cx={x(i)} cy={y(v)} r="2.5" fill="#0088fe" />
        ))}
        {days.map((d, i) => (
          <text key={d} x={x(i)} y={h + 10} fontSize="8" fill="rgba(0,0,0,0.4)" textAnchor={i === 0 ? 'start' : i === days.length - 1 ? 'end' : 'middle'}>{d}</text>
        ))}
      </svg>
    </Card>
  )
}
