import type { ReactNode } from 'react'
import { AirMarkIcon, HandSolidIcon } from './icons.tsx'
import { Card } from './ui/card.tsx'

export type AirDailyCardProps = {
  headline: string
  body: string
  date: string
  glance: string
  onShare?: () => void
}

/** Folded page corner: the original curl is a large peel — bottom leg ~84px,
 *  right leg ~56px on a 227px card — not the 20px triangle v1.6 used. Own CSS
 *  suggestion of the peel (gradient underside + soft drop shadow), no bitmap. */
function FoldCorner() {
  return (
    <span
      aria-hidden
      className="pointer-events-none absolute bottom-0 right-0"
      style={{
        width: 84,
        height: 56,
        background: 'linear-gradient(215deg, #ffffff 0%, #f2f2ee 55%, #e6e6e0 100%)',
        clipPath: 'polygon(0 100%, 100% 0, 100% 100%)',
        filter: 'drop-shadow(-2px -2px 3px rgba(0,0,0,0.10))',
      }}
    />
  )
}

/** The Air Daily report card: eyebrow row, headline, body, date pills +
 *  avatar cluster, teal cover block, At a glance. Order matches iphone-06:
 *  the pills sit between body and photo, not as plain text at the bottom. */
export function AirDailyCard({ headline, body, date, glance, onShare }: AirDailyCardProps) {
  return (
    <Card className="relative overflow-hidden rounded-[15px] p-3">
      <FoldCorner />
      <div className="flex items-center justify-between text-[10px] font-semibold text-black/70">
        <span className="flex items-center gap-1"><AirMarkIcon className="h-3.5 w-3.5 text-black/70" /> Made in airbuild</span>
        <button type="button" onClick={onShare} className="rounded-full bg-[#f4f4f2] px-2 py-0.5 text-[10px] font-medium">Share</button>
      </div>
      <h3 className="mt-1.5 text-[13px] font-bold leading-tight text-[#11110f]">{headline}</h3>
      <p className="mt-1.5 text-[11px] leading-snug text-black/55">{body}</p>
      <div className="mt-2 flex items-center gap-2">
        <span className="flex items-center gap-1" aria-hidden>
          <span className="flex h-[22px] w-[22px] items-center justify-center rounded-md bg-white shadow-sm ring-1 ring-black/10"><HandSolidIcon className="h-3.5 w-3.5" /></span>
          <span className="h-[6px] w-[6px] rounded-full bg-[#64a2f7]" />
          <span className="h-[6px] w-[6px] rounded-full bg-[#cb2c19]" />
        </span>
        <span className="rounded-full bg-[#f4f4f2] px-2 py-0.5 text-[10px] font-medium text-black/55">{date}</span>
        <span className="rounded-full bg-[#f4f4f2] px-2 py-0.5 text-[10px] font-medium text-black/55">The Air Daily</span>
      </div>
      <div className="relative mt-2 flex h-[77px] flex-col justify-end overflow-hidden rounded-[14px] p-3" style={{ background: 'linear-gradient(160deg,#3f707e,#386b79)' }}>
        {/* C2: own vector dandelion abstraction (stem + seed head) instead of the official photo; no bitmap copied. */}
        <svg className="absolute right-3 top-2 h-[72px] w-[72px] opacity-90" viewBox="0 0 72 72" aria-hidden>
          <path d="M36 68C36 52 36 44 36 34" stroke="#e8e2c8" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M36 34 22 20M36 34 50 20M36 34 28 16M36 34 44 16M36 34V12" stroke="#f7efb5" strokeWidth="1.2" strokeLinecap="round" opacity="0.85" />
          <circle cx="36" cy="32" r="4" fill="#f7efb5" />
          <circle cx="22" cy="20" r="1.8" fill="#f7efb5" /><circle cx="50" cy="20" r="1.8" fill="#f7efb5" />
          <circle cx="28" cy="16" r="1.8" fill="#f7efb5" /><circle cx="44" cy="16" r="1.8" fill="#f7efb5" />
          <circle cx="36" cy="12" r="1.8" fill="#f7efb5" />
        </svg>
        <p className="relative text-[16px] font-bold text-white">The Air Daily</p>
        <p className="relative text-[12px] text-white/85">A little perspective on your apps</p>
      </div>
      <p className="mt-1.5 text-[14px] font-bold text-[#11110f]">At a glance</p>
      <p className="mt-1 text-[12px] leading-snug text-black/55">{glance}</p>
    </Card>
  )
}

export type SalesStat = { value: string; label: string; delta?: string }
export type SalesReportCardProps = {
  title: ReactNode
  body: string
  stats: SalesStat[]
  /** weekly points 0..1 (Mon..Fri), rendered as a dotted area chart */
  series: number[]
  onShare?: () => void
}

/** Sales Report card: headline, body, stat row, Performance area chart,
 *  Discovery & Monetization bars. Matches iphone-06's second card, which
 *  v1.6 truncated after Performance. */
export function SalesReportCard({ title, body, stats, series, onShare }: SalesReportCardProps) {
  const w = 280
  const h = 22
  const x = (i: number) => 14 + (i / (series.length - 1)) * (w - 28)
  const y = (v: number) => h - 8 - v * (h - 20)
  const pts = series.map((v, i) => `${x(i)},${y(v)}`).join(' ')
  const area = `14,${h - 8} ${pts} ${x(series.length - 1)},${h - 8}`
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri']
  const ticks = ['100k', '50k', '20k', '10k', '0']
  return (
    <Card className="relative overflow-hidden rounded-[15px] p-3">
      <FoldCorner />
      <div className="flex items-center justify-between text-[10px] font-semibold text-black/70">
        <span className="flex items-center gap-1"><AirMarkIcon className="h-3.5 w-3.5 text-black/70" /> Made in airbuild</span>
        <button type="button" onClick={onShare} className="rounded-full bg-[#f4f4f2] px-2 py-0.5 text-[10px] font-medium">Share</button>
      </div>
      <h3 className="mt-1.5 text-[13px] font-bold leading-tight text-[#11110f]">{title}</h3>
      <p className="mt-0.5 text-[11px] leading-snug text-black/55">{body}</p>
      <div className="mt-1.5 grid grid-cols-3 gap-2 border-y border-black/[0.06] py-1">
        {stats.map((s) => (
          <div key={s.label}>
            <p className="text-[16px] font-bold text-[#11110f]">{s.value}</p>
            <p className="text-[9px] leading-snug text-black/45">{s.label}{s.delta ? <> · <span className="text-[#167b3d]">{s.delta}</span></> : null}</p>
          </div>
        ))}
      </div>
      <p className="mt-1 text-[12px] font-bold text-[#11110f]">Performance</p>
      <div className="mt-0.5 flex items-baseline justify-between gap-2">
        <p className="whitespace-nowrap text-[7px] font-medium text-black/40">A STRONGER FINISH TO THE WORK</p>
        <p className="whitespace-nowrap text-[8px] text-black/45">Daily first downloads</p>
      </div>
      <div className="mt-1 flex gap-1.5">
        <div className="flex flex-col justify-between py-0.5 text-right text-[7px] leading-none text-black/40" aria-hidden>
          {ticks.map((t) => <span key={t}>{t}</span>)}
        </div>
        <svg viewBox={`0 0 ${w} ${h + 14}`} className="w-full flex-1" role="img" aria-label="Downloads trend">
          <polygon points={area} fill="rgba(0,136,254,0.12)" />
          <polyline points={pts} fill="none" stroke="#0088fe" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" strokeDasharray="1.5 4" />
          {days.map((d, i) => (
            <text key={d} x={x(i)} y={h + 10} fontSize="8" fill="rgba(0,0,0,0.4)" textAnchor={i === 0 ? 'start' : i === days.length - 1 ? 'end' : 'middle'}>{d}</text>
          ))}
        </svg>
      </div>
      <p className="mt-1 text-[12px] font-bold text-[#11110f]">Discovery &amp; Monetization</p>
      <div className="mt-0.5 flex items-baseline justify-between gap-2">
        <p className="whitespace-nowrap text-[7px] font-medium text-black/40">FROM DISCOVERY TO DOWNLOAD</p>
        <p className="whitespace-nowrap text-[8px] text-black/45">Product page conversion: 14%</p>
      </div>
      <div className="mt-1.5 space-y-0.5">
        {[
          { label: 'Search', w: '100%' },
          { label: 'Browse', w: '88%' },
          { label: 'Referrals', w: '72%' },
        ].map((b) => (
          <div key={b.label} className="flex items-center gap-2">
            <span className="w-14 shrink-0 text-[10px] text-black/55">{b.label}</span>
            <span className="h-2.5 rounded-sm" style={{ width: b.w, background: '#0088fe' }} />
          </div>
        ))}
      </div>
    </Card>
  )
}
