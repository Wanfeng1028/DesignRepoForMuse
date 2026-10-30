import { ChevronLeftIcon, CloudIcon, CloverIcon, EllipsisIcon, PlusIcon } from './icons.tsx'
import { Pill } from './ui/pill.tsx'

export type ProjectIconProps = { label: string; swatch?: string }

/**
 * Project mark (Q4): own vector redraw of a tiny town — houses + trees on
 * the project swatch — replacing the letter block. No official bitmap used.
 * Position/size unchanged (38x38, rounded 12).
 */
export function ProjectMark({ label, swatch = '#dbe7d2' }: ProjectIconProps) {
  return (
    <span
      className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-[12px] shadow-sm"
      style={{ background: swatch }}
      aria-label={label}
    >
      <svg width="38" height="38" viewBox="0 0 38 38" aria-hidden>
        <rect x="0" y="26" width="38" height="12" fill="#8fb996" />
        <circle cx="7" cy="20" r="4" fill="#4c7a4f" />
        <rect x="6" y="22" width="2" height="5" fill="#6b4a2f" />
        <rect x="12" y="18" width="9" height="8" fill="#fdf8ec" />
        <path d="M11 18 16.5 12 22 18Z" fill="#b85c38" />
        <rect x="15" y="21" width="3" height="5" fill="#6b4a2f" />
        <circle cx="28" cy="18" r="4.5" fill="#4c7a4f" />
        <rect x="27" y="21" width="2" height="5" fill="#6b4a2f" />
        <rect x="23" y="20" width="7" height="6" fill="#e8e2d4" />
        <path d="M22.5 20 26.5 15 30.5 20Z" fill="#8a6d3b" />
        <circle cx="31" cy="8" r="3" fill="#f2c14e" />
      </svg>
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
      <button type="button" aria-label="Back" onClick={onBack} className="ab-glass flex h-[42px] w-[42px] items-center justify-center rounded-full">
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <div className="absolute left-1/2 top-1 flex -translate-x-1/2 flex-col items-center gap-1">
        <ProjectMark label={project} swatch={swatch} />
        <Pill className="px-2.5 py-0.5 text-[13px]">{project}</Pill>
      </div>
      <button type="button" aria-label="More" onClick={onMenu} className="ab-glass flex h-[42px] w-[42px] items-center justify-center rounded-full">
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
      <button type="button" aria-label="Cloud" className="ab-glass relative flex h-[42px] w-[42px] items-center justify-center rounded-full">
        <CloudIcon className="h-5 w-5" />
        <span className="absolute bottom-1.5 right-2 h-1.5 w-1.5 rounded-full bg-[#2ecb70]" aria-hidden />
      </button>
      <span className="text-[#11110f]/25" aria-hidden>
        <CloverIcon className="h-10 w-10" />
      </span>
      <button type="button" aria-label="New project" onClick={onAdd} className="ab-glass flex h-[42px] w-[42px] items-center justify-center rounded-full">
        <PlusIcon className="h-5 w-5" />
      </button>
    </header>
  )
}
