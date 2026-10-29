import { Pill } from './ui/pill.tsx'

export type ProjectCardItem = { name: string; swatch: string; note?: string }
export type ProjectCardGridProps = { projects: ProjectCardItem[] }

/** 2x2 project card grid: pale tile + centred pill label overlapping the bottom edge. */
export function ProjectCardGrid({ projects }: ProjectCardGridProps) {
  return (
    <div className="grid grid-cols-2 gap-3">
      {projects.map((p) => (
        <div key={p.name} className="relative">
          <div className="flex h-[132px] items-center justify-center rounded-[20px] bg-white border border-black/[0.05] shadow-[0_4px_14px_rgba(0,0,0,0.04)]" style={{ background: `linear-gradient(160deg, ${p.swatch}, #ffffff 130%)` }}>
            <span className="text-[28px] font-bold text-black/70" aria-hidden>{p.name.slice(0, 1)}</span>
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
