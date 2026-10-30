import { HandSolidIcon } from './icons.tsx'
import { Pill } from './ui/pill.tsx'

export type ProjectCardItem = { name: string; swatch: string; note?: string }
export type ProjectCardGridProps = { projects: ProjectCardItem[] }

/**
 * C3: own vector app-preview per project, replacing the letter blocks.
 * No official screenshot is copied. Structure follows ipad-01: Hands Time =
 * two widgets (Dot Counter + Angle clock), Hourtown = town map, Sleepy
 * Coffee = list, Casehot = note + phone.
 */
function ProjectPreview({ name }: { name: string }) {
  if (name === 'Hourtown') {
    return (
      <svg width="96" height="72" viewBox="0 0 96 72" aria-hidden>
        <rect x="4" y="4" width="88" height="64" rx="10" fill="#dbe7d2" />
        <path d="M4 36h88M48 4v64" stroke="#ffffff" strokeWidth="3" />
        <rect x="14" y="12" width="14" height="10" fill="#fdf8ec" /><path d="M13 12l8-6 8 6Z" fill="#b85c38" />
        <rect x="62" y="44" width="14" height="10" fill="#e8e2d4" /><path d="M61 44l8-6 8 6Z" fill="#8a6d3b" />
        <circle cx="70" cy="18" r="6" fill="#4c7a4f" /><circle cx="24" cy="52" r="6" fill="#4c7a4f" />
        <path d="M48 36c6 2 12 2 18 0" stroke="#8fb996" strokeWidth="2" fill="none" />
      </svg>
    )
  }
  if (name === 'Sleepy Coffee') {
    return (
      <svg width="96" height="72" viewBox="0 0 96 72" aria-hidden>
        <rect x="4" y="4" width="88" height="64" rx="10" fill="#e6e0d2" />
        <path d="M14 16h48M14 26h48M14 36h34" stroke="#8a7a66" strokeWidth="3" strokeLinecap="round" />
        <circle cx="66" cy="16" r="3" fill="#b85c38" /><circle cx="66" cy="26" r="3" fill="#b85c38" />
        <path d="M14 50h58" stroke="#d8cfbc" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 58h46" stroke="#d8cfbc" strokeWidth="2" strokeLinecap="round" />
      </svg>
    )
  }
  if (name === 'Casehot') {
    return (
      <svg width="96" height="72" viewBox="0 0 96 72" aria-hidden>
        <rect x="4" y="4" width="88" height="64" rx="10" fill="#f0d9c8" />
        <rect x="14" y="14" width="42" height="26" rx="8" fill="#ffffff" />
        <path d="M14 40h50M14 48h36" stroke="#ffffff" strokeWidth="2" opacity="0.7" />
        <circle cx="48" cy="52" r="10" fill="#f59e0b" opacity="0.85" />
      </svg>
    )
  }
  // Hands Time (default): Dot Counter widget + Angle clock widget.
  return (
    <svg width="96" height="72" viewBox="0 0 96 72" aria-hidden>
      <rect x="4" y="4" width="88" height="64" rx="10" fill="#e8e8e6" />
      <rect x="12" y="14" width="32" height="44" rx="9" fill="#ffffff" stroke="#d4d4d0" />
      <circle cx="20" cy="26" r="3" fill="#11110f" /><circle cx="28" cy="26" r="3" fill="#11110f" /><circle cx="36" cy="26" r="3" fill="#d4d4d0" />
      <text x="28" y="48" fontSize="13" fontWeight="700" fill="#11110f" textAnchor="middle">29</text>
      <rect x="52" y="14" width="32" height="44" rx="9" fill="#ffffff" stroke="#d4d4d0" />
      <circle cx="68" cy="36" r="13" fill="none" stroke="#11110f" strokeWidth="1.6" />
      <path d="M68 36V27M68 36l7 4" stroke="#11110f" strokeWidth="1.8" strokeLinecap="round" />
      <circle cx="68" cy="36" r="1.6" fill="#11110f" />
    </svg>
  )
}

/** Small floating badge pinned to a tile corner (own vector marks). */
function TileBadge({ name }: { name: string }) {
  if (name === 'Hands Time') {
    return (
      <span className="absolute bottom-2 left-1/2 flex h-7 w-7 -translate-x-1/2 items-center justify-center rounded-full bg-[#11110f] text-white shadow" aria-hidden>
        <HandSolidIcon className="h-4 w-4" />
      </span>
    )
  }
  if (name === 'Hourtown') {
    return (
      <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-lg bg-white shadow ring-1 ring-black/10" aria-hidden>
        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M2 12h12M8 2v12" stroke="#4c7a4f" strokeWidth="1.6" /><circle cx="8" cy="7" r="2" fill="#4c7a4f" /></svg>
      </span>
    )
  }
  if (name === 'Sleepy Coffee') {
    return (
      <span className="absolute bottom-2 right-2 flex h-7 w-7 items-center justify-center rounded-full bg-white shadow ring-1 ring-black/10" aria-hidden>
        <svg width="16" height="16" viewBox="0 0 16 16"><path d="M3 4h9v6a4.5 4.5 0 0 1-4.5 4.5h0A4.5 4.5 0 0 1 3 10V4Z" fill="#6b4a2f" /><path d="M12 5h1a2 2 0 0 1 0 4h-1" fill="none" stroke="#6b4a2f" strokeWidth="1.4" /></svg>
      </span>
    )
  }
  if (name === 'Casehot') {
    return (
      <>
        <span className="absolute bottom-2 left-2 h-4 w-4 rounded-full bg-[#0088fe] ring-2 ring-white" aria-hidden />
        <span className="absolute bottom-2 right-2 flex h-9 w-6 items-center justify-center rounded-md bg-white shadow ring-1 ring-black/10" aria-hidden>
          <svg width="12" height="16" viewBox="0 0 12 16"><rect x="1" y="1" width="10" height="14" rx="2" fill="#f0d9c8" /><path d="M3 5h6M3 8h6" stroke="#b85c38" strokeWidth="1.2" /></svg>
        </span>
      </>
    )
  }
  return null
}

/** 2x2 project card grid: vector preview tile + centred pill label overlapping the bottom edge. */
export function ProjectCardGrid({ projects }: ProjectCardGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {projects.map((p) => (
        <div key={p.name} className="relative">
          <div className="flex h-[132px] items-center justify-center rounded-[20px] border border-black/[0.05] shadow-[0_4px_14px_rgba(0,0,0,0.04)]" style={{ background: `linear-gradient(160deg, ${p.swatch}, #ffffff 130%)` }}>
            <ProjectPreview name={p.name} />
          </div>
          <TileBadge name={p.name} />
          {p.note ? (
            <span className="absolute right-2 top-2 max-w-[120px] rounded-[10px] bg-white px-2 py-1 text-[10px] leading-tight text-[#11110f] shadow">{p.note}</span>
          ) : null}
          <div className="flex justify-center">
            <Pill className="-mt-3 relative px-2.5 py-1 text-[13px]">{p.name}</Pill>
          </div>
        </div>
      ))}
    </div>
  )
}
