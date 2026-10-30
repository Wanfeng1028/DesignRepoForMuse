import type { ReactNode } from 'react'
import { ShareTrayIcon } from './icons.tsx'

export type WebsiteDraftCardProps = {
  url: string
  headline: ReactNode
  subline: string
  downloadLabel?: string
  footnoteTitle: string
  footnoteBody: string
  /** cover block colour (own abstract gradient; not the official photo) */
  coverTone?: string
  onDownload?: () => void
}

/**
 * Website draft (deliverable) card: browser chrome row (traffic lights + URL
 * pill + share), headline + download button, abstract cover block, footnote.
 * The cover is an own abstract gradient with a swan-free geometric motif —
 * the official photo is not copied.
 */
export function WebsiteDraftCard({
  url, headline, subline, downloadLabel = 'Download', footnoteTitle, footnoteBody, coverTone, onDownload,
}: WebsiteDraftCardProps) {
  return (
    <section className="-mx-4 rounded-[24px] border border-black/[0.06] bg-white px-5 py-5 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between">
        <span className="flex gap-2" aria-hidden>
          <span className="h-[14px] w-[14px] rounded-full bg-[#ff736a]" />
          <span className="h-[14px] w-[14px] rounded-full bg-[#ffbc2d]" />
          <span className="h-[14px] w-[14px] rounded-full bg-[#1ac332]" />
        </span>
        <span className="ab-glass rounded-full px-4 py-1.5 text-[15px] font-medium text-[#11110f]">{url}</span>
        <button type="button" aria-label="Share" className="ab-glass flex h-10 w-10 items-center justify-center rounded-full">
          <ShareTrayIcon className="h-5 w-5" />
        </button>
      </div>
      <div className="mt-5 grid grid-cols-[170px_1fr] gap-4">
        <div>
          <h3 className="text-[20px] font-bold leading-tight text-[#11110f]">{headline}</h3>
          <p className="mt-2.5 text-[11px] leading-snug text-black/45">{subline}</p>
          <button type="button" onClick={onDownload} className="mt-4 rounded-[10px] bg-black px-3 py-1.5 text-[11px] font-semibold text-white">
            {downloadLabel}
          </button>
        </div>
        <div
          className="relative flex aspect-square items-end overflow-hidden rounded-[12px] p-3.5"
          style={{ background: coverTone ?? 'linear-gradient(160deg,#333333,#171717)' }}
        >
          {/* C1: own vector swan abstraction on the dark cover (S1: square 1.00, not title-bar height). No official photo copied. */}
          <svg className="absolute inset-0 m-auto h-[70%] w-[70%]" viewBox="0 0 100 100" aria-hidden>
            <ellipse cx="48" cy="66" rx="26" ry="14" fill="#ffffff" opacity="0.92" />
            <path d="M62 62c6-4 8-14 6-24-1-7-6-12-11-11-3 1-3 5 0 6 2 1 4-1 5 1 2 4 0 12-4 18" fill="none" stroke="#ffffff" strokeWidth="6" strokeLinecap="round" opacity="0.92" />
            <circle cx="59" cy="28" r="2" fill="#1c2422" />
            <path d="M20 84h56" stroke="#ffffff" strokeWidth="1.5" strokeLinecap="round" opacity="0.4" />
            <path d="M28 90h40" stroke="#ffffff" strokeWidth="1.2" strokeLinecap="round" opacity="0.25" />
          </svg>
          <span className="relative whitespace-nowrap text-[9px] font-medium leading-snug text-white/90">3.0 available, built on iOS 26.</span>
        </div>
      </div>
      <div className="mt-4 rounded-[16px] bg-[#f4f4f4] p-4">
        <p className="text-[14px] font-bold text-[#11110f]">{footnoteTitle}</p>
        <p className="mt-1 text-[13px] leading-snug text-black/45">{footnoteBody}</p>
      </div>
    </section>
  )
}
