import { CheckIcon, ChevronDownIcon, HandIcon } from './icons.tsx'
import { Card } from './ui/card.tsx'

export type VersionRow = { label: string; value: string; sub?: string; action?: string }
export type ProgressStep = { title: string; sub?: string; done: boolean }
export type DetailPanelProps = {
  title: string
  status: string
  updated: string
  iconLabel: string
  stores: string[]
  versions: VersionRow[]
  progress: ProgressStep[]
}

/** Generic store glyphs (own redraws): storefront awning + propeller. Not Apple assets. */
function StoreGlyph({ kind }: { kind: string }) {
  if (kind === 'TestFlight') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#0088fe" />
        <path d="M12 4v7m0 0-4.5 3.5M12 11l4.5 3.5M12 11v9" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" />
        <circle cx="12" cy="11" r="1.6" fill="#fff" />
      </svg>
    )
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="6" fill="#0088fe" />
      <path d="M7 9h10M8 9l1.5 3h5L16 9M9.5 12v5m5-5v5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

/**
 * App detail panel (bottom-sheet style): grabber, title + check button,
 * status card, store cards, Versions card, Progress card.
 */
export function DetailPanel({ title, status, updated, iconLabel, stores, versions, progress }: DetailPanelProps) {
  return (
    <section className="flex flex-col rounded-t-[32px] bg-[#f4f4f4] px-4 pt-2 pb-4">
      <span className="mx-auto mb-3 h-1 w-10 rounded-full bg-black/15" aria-hidden />
      <div className="flex items-center justify-between">
        <span className="w-11" aria-hidden />
        <h2 className="flex items-center gap-1 text-[17px] font-bold text-[#11110f]">
          {title}
          <ChevronDownIcon className="h-4 w-4 text-black/40" />
        </h2>
        <button type="button" aria-label="Done" className="flex h-11 w-11 items-center justify-center rounded-full bg-white border border-black/[0.05] shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
          <CheckIcon className="h-6 w-6" />
        </button>
      </div>
      <Card className="mt-4 flex items-center gap-3 rounded-[20px] p-4">
        <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-[#eef0ea]" aria-hidden>
          <HandIcon className="h-7 w-7" />
          <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-[#0088fe] text-white shadow"><CheckIcon className="h-3 w-3" /></span>
        </span>
        <span>
          <span className="flex items-center gap-1.5 text-[16px] font-bold text-[#11110f]">
            <span className="h-2 w-2 rounded-full bg-[#2ecb70]" aria-hidden /> {status}
          </span>
          <span className="mt-0.5 block text-[14px] text-black/45">{updated}</span>
        </span>
      </Card>
      <div className="mt-3 grid grid-cols-2 gap-3">
        {stores.map((store) => (
          <Card key={store} className="rounded-[20px] p-4">
            <StoreGlyph kind={store} />
            <p className="mt-2 text-[16px] font-semibold text-[#11110f]">{store}</p>
          </Card>
        ))}
      </div>
      <h3 className="mt-5 mb-2 px-1 text-[15px] font-semibold text-black/45">Versions</h3>
      <Card className="divide-y divide-black/[0.06] rounded-[20px] px-3.5">
        {versions.map((row) => (
          <div key={row.label} className="flex items-start justify-between gap-3 py-3.5">
            <span className="text-[15px] text-black/45">{row.label}</span>
            <span className="text-right">
              <span className="block text-[16px] font-semibold text-[#11110f]">{row.value}</span>
              {row.action ? <span className="block text-[13px] font-medium text-[#0088fe]">{row.action}</span> : null}
              {row.sub ? <span className="block text-[13px] text-black/45">{row.sub}</span> : null}
            </span>
          </div>
        ))}
      </Card>
      <h3 className="mt-5 mb-2 px-1 text-[15px] font-semibold text-black/45">Progress</h3>
      <Card className="divide-y divide-black/[0.06] rounded-[20px] px-3.5">
        {progress.map((step) => (
          <div key={step.title} className="flex items-start gap-3.5 py-3.5">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#2ecb70] text-white" aria-hidden>
              <CheckIcon className="h-4 w-4" />
            </span>
            <span>
              <span className="block text-[15px] font-medium text-[#11110f]">{step.title}</span>
              {step.sub ? <span className="block text-[13px] text-black/45">{step.sub}</span> : null}
            </span>
          </div>
        ))}
      </Card>
      <span className="sr-only">{iconLabel}</span>
    </section>
  )
}
