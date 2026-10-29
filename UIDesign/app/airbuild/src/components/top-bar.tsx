import { ChevronLeftIcon, CloudIcon, CloverIcon, EllipsisIcon, PlusIcon } from './icons.tsx'
import { Pill } from './ui/pill.tsx'

export type ProjectIconProps = { label: string; swatch?: string }

/** Squircle project tile used above the centre pill (chat top bar). */
export function ProjectMark({ label, swatch = '#dbe7d2' }: ProjectIconProps) {
  return (
    <span
      className="flex h-[38px] w-[38px] items-center justify-center rounded-[12px] text-[14px] font-bold text-[#11110f] shadow-sm"
      style={{ background: swatch }}
      aria-hidden
    >
      {label.slice(0, 1)}
    </span>
  )
}

export type ChatTopBarProps = {
  project: string
  swatch?: string
  onBack?: () => void
  onMenu?: () => void
}

/** Chat top bar: back chevron (left circle) + centred project pill + … menu (right circle). */
export function ChatTopBar({ project, swatch, onBack, onMenu }: ChatTopBarProps) {
  return (
    <header className="relative flex items-start justify-between px-4 pt-2 pb-4">
      <button type="button" aria-label="Back" onClick={onBack} className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white border border-black/[0.05] shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <div className="absolute left-1/2 top-1 flex -translate-x-1/2 flex-col items-center gap-1">
        <ProjectMark label={project} swatch={swatch} />
        <Pill className="px-2.5 py-0.5 text-[13px]">{project}</Pill>
      </div>
      <button type="button" aria-label="More" onClick={onMenu} className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white border border-black/[0.05] shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <EllipsisIcon className="h-5 w-5" />
      </button>
    </header>
  )
}

export type HomeTopBarProps = { onAdd?: () => void }

/** Home top bar: cloud icon (left circle) + four-leaf mark (centre) + + (right circle). */
export function HomeTopBar({ onAdd }: HomeTopBarProps) {
  return (
    <header className="flex items-center justify-between px-4 pt-2 pb-1">
      <button type="button" aria-label="Cloud" className="relative flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white border border-black/[0.05] shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <CloudIcon className="h-5 w-5" />
        <span className="absolute bottom-1.5 right-2 h-1.5 w-1.5 rounded-full bg-[#2ecb70]" aria-hidden />
      </button>
      <span className="text-[#11110f]/25" aria-hidden>
        <CloverIcon className="h-10 w-10" />
      </span>
      <button type="button" aria-label="New project" onClick={onAdd} className="flex h-[42px] w-[42px] items-center justify-center rounded-full bg-white border border-black/[0.05] shadow-[0_2px_10px_rgba(0,0,0,0.06)]">
        <PlusIcon className="h-5 w-5" />
      </button>
    </header>
  )
}
