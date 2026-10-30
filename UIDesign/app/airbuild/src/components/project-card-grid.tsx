import { Pill } from './ui/pill.tsx'

export type ProjectCardItem = { name: string; swatch: string; note?: string }
export type ProjectCardGridProps = { projects: ProjectCardItem[] }

/**
 * C3: own vector app-preview per project, replacing the letter blocks.
 * No official screenshot is copied: Hands Time = watch widget, Hourtown =
 * town map, Sleepy Coffee = cup, Casehot = sunset banner.
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
        <path d="M38 14c-2-3 2-4 0-7M48 14c-2-3 2-4 0-7" stroke="#9a8a76" strokeWidth="2" strokeLinecap="round" fill="none" />
        <path d="M30 20h36v22a12 12 0 0 1-12 12H42a12 12 0 0 1-12-12V20Z" fill="#ffffff" stroke="#d8cfbc" />
        <path d="M66 24h6a6 6 0 0 1 0 12h-6" fill="none" stroke="#d8cfbc" strokeWidth="3" />
        <ellipse cx="48" cy="60" rx="22" ry="3" fill="#d8cfbc" />
      </svg>
    )
  }
  if (name === 'Casehot') {
    return (
      <svg width="96" height="72" viewBox="0 0 96 72" aria-hidden>
        <rect x="4" y="4" width="88" height="64" rx="10" fill="#f0d9c8" />
        <circle cx="48" cy="44" r="14" fill="#f59e0b" />
        <rect x="4" y="44" width="88" height="24" rx="10" fill="#b85c38" opacity="0.55" />
        <path d="M10 52h76M16 58h64" stroke="#ffffff" strokeWidth="2" opacity="0.6" />
      </svg>
    )
  }
  // Hands Time (default): watch widget face.
  return (
    <svg width="96" height="72" viewBox="0 0 96 72" aria-hidden>
      <rect x="4" y="4" width="88" height="64" rx="10" fill="#e8e8e6" />
      <circle cx="48" cy="36" r="22" fill="#ffffff" stroke="#d4d4d0" />
      <path d="M48 36V22M48 36l10 6" stroke="#11110f" strokeWidth="2.5" strokeLinecap="round" />
      <circle cx="48" cy="36" r="2.5" fill="#11110f" />
      <path d="M48 16v3M48 53v3M28 36h3M65 36h3" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
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
