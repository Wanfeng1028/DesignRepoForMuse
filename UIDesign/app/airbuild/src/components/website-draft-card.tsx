import { ShareIcon } from './icons.tsx'

export type WebsiteDraftCardProps = {
  url: string
  headline: string
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
    <section className="rounded-[24px] border border-black/[0.06] bg-white p-4 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
      <div className="flex items-center justify-between">
        <span className="flex gap-1.5" aria-hidden>
          <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
          <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
          <span className="h-3 w-3 rounded-full bg-[#28c840]" />
        </span>
        <span className="rounded-full bg-[#f4f4f2] px-3 py-1 text-[13px] font-semibold text-[#11110f]">{url}</span>
        <button type="button" aria-label="Share" className="flex h-8 w-8 items-center justify-center rounded-full bg-[#f4f4f2]">
          <ShareIcon className="h-4 w-4" />
        </button>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div>
          <h3 className="text-[17px] font-bold leading-tight text-[#11110f]">{headline}</h3>
          <p className="mt-2 text-[12px] leading-snug text-black/45">{subline}</p>
          <button type="button" onClick={onDownload} className="mt-3 rounded-md bg-black px-2.5 py-1.5 text-[12px] font-semibold text-white">
            {downloadLabel}
          </button>
        </div>
        <div
          className="flex min-h-[118px] items-end rounded-[14px] p-2.5"
          style={{ background: coverTone ?? 'linear-gradient(160deg,#3a4a44,#1c2422)' }}
        >
          <span className="text-[10px] font-medium leading-snug text-white/90">3.0 available, built on iOS 26.</span>
        </div>
      </div>
      <div className="mt-3 rounded-[12px] bg-[#f9f9f7] p-3">
        <p className="text-[12px] font-bold text-[#11110f]">{footnoteTitle}</p>
        <p className="mt-0.5 text-[12px] leading-snug text-black/45">{footnoteBody}</p>
      </div>
    </section>
  )
}
