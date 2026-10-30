import { useState } from 'react'
import { CheckIcon, ChevronMorphIcon, HandSolidIcon } from './icons.tsx'
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

/** Generic store glyphs (own redraws, not Apple assets): App Store "A" of three strokes, TestFlight three-blade propeller. */
function StoreGlyph({ kind }: { kind: string }) {
  if (kind === 'TestFlight') {
    return (
      <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
        <rect width="24" height="24" rx="6" fill="#0088fe" />
        <g fill="#fff">
          <ellipse cx="12" cy="6.5" rx="1.7" ry="3.4" />
          <ellipse cx="12" cy="6.5" rx="1.7" ry="3.4" transform="rotate(120 12 12)" />
          <ellipse cx="12" cy="6.5" rx="1.7" ry="3.4" transform="rotate(240 12 12)" />
        </g>
        <circle cx="12" cy="12" r="2" fill="#0088fe" />
        <circle cx="12" cy="12" r="1" fill="#fff" />
      </svg>
    )
  }
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" aria-hidden>
      <rect width="24" height="24" rx="6" fill="#0088fe" />
      <path d="M8 19 12 5l4 14M9.8 14.5h4.4" stroke="#fff" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  )
}

/**
 * App detail panel (bottom-sheet style): grabber, title + check button,
 * status card, store cards, Versions card, Progress card.
 */
export function DetailPanel({ title, status, updated, iconLabel, stores, versions, progress }: DetailPanelProps) {
  // M1: the title chevron is a real toggle (panel sections collapse); its
  // rotation morphs with a CSS transition instead of cutting. Default open,
  // so the gallery screenshot is unchanged.
  const [open, setOpen] = useState(true)
  return (
    <section className="flex flex-col rounded-t-[32px] bg-[#f4f4f4] px-4 pt-2 pb-4">
      <span className="mx-auto mb-3 h-1 w-10 rounded-full bg-black/15" aria-hidden />
      <div className="flex items-center justify-between">
        <span className="w-11" aria-hidden />
        <h2 className="flex items-center gap-1 text-[17px] font-bold text-[#11110f]">
          {title}
          <button type="button" aria-label="Toggle details" aria-expanded={open} onClick={() => setOpen((v) => !v)} className="flex items-center">
            <ChevronMorphIcon open={open} className="h-4 w-4 text-black/40" />
          </button>
        </h2>
        <button type="button" aria-label="Done" className="ab-glass flex h-11 w-11 items-center justify-center rounded-full">
          <CheckIcon className="h-6 w-6" />
        </button>
      </div>
      <Card className="mt-4 flex items-center gap-3 rounded-[20px] p-4">
        <span className="relative flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-[14px] bg-[#eef0ea] text-[#11110f]" aria-hidden>
          <HandSolidIcon className="h-7 w-7" />
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
      {open ? (<>
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
      </>) : null}
      <span className="sr-only">{iconLabel}</span>
    </section>
  )
}
