import { AirMarkIcon, ChevronLeftIcon, CloudIcon, EllipsisIcon, PlusIcon } from './icons.tsx'
import { Avatar } from './avatar.tsx'
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
  /** 'project' = town mark (iphone-03 chat); 'person' = member avatar tile
   *  (iphone-06 Ato / iphone-04 Colo top bars centre on the speaker, not a project) */
  mark?: 'project' | 'person'
  avatarColor?: string
  /** compact bottom padding, used where the 844 frame must also fit a second
   *  message below a tall cards row (briefing) */
  compact?: boolean
  onBack?: () => void
  onMenu?: () => void
}

/** Chat top bar: back chevron (left circle) + centred mark + pill + … menu (right circle). */
export function ChatTopBar({ project, swatch, mark = 'project', avatarColor, compact, onBack, onMenu }: ChatTopBarProps) {
  return (
    <header className={`relative flex items-start justify-between px-4 pt-2 ${compact ? 'pb-1' : 'pb-4'}`}>
      <button type="button" aria-label="Back" onClick={onBack} className="ab-glass flex h-[46px] w-[46px] items-center justify-center rounded-full">
        <ChevronLeftIcon className="h-5 w-5" />
      </button>
      <div className="absolute left-1/2 top-1 flex -translate-x-1/2 flex-col items-center gap-1">
        {mark === 'person' ? (
          <span className="flex h-[38px] w-[38px] items-center justify-center overflow-hidden rounded-[12px] shadow-sm" style={{ background: avatarColor }} aria-label={project}>
            <Avatar name={project} color={avatarColor} size={38} />
          </span>
        ) : (
          <ProjectMark label={project} swatch={swatch} />
        )}
        <Pill className="px-2 py-0.5 text-[10px]">{project}</Pill>
      </div>
      <button type="button" aria-label="More" onClick={onMenu} className="ab-glass flex h-[46px] w-[46px] items-center justify-center rounded-full">
        <EllipsisIcon className="h-5 w-5" />
      </button>
    </header>
  )
}

export type HomeTopBarProps = { onAdd?: () => void }

/** Home top bar: cloud icon (left circle, green sync arc at the bottom — the
 *  original shows an arc, not a dot) + four-petal mark (centre) + + (right circle). */
export function HomeTopBar({ onAdd }: HomeTopBarProps) {
  return (
    <header className="flex items-center justify-between px-4 pt-2 pb-1">
      <button type="button" aria-label="Cloud" className="ab-glass relative flex h-[46px] w-[46px] items-center justify-center rounded-full">
        <CloudIcon className="h-5 w-5" />
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 46 46" aria-hidden>
          <path d="M6.5 26A17 17 0 0 0 14.5 37.7" fill="none" stroke="#2ecb70" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M14.5 37.7A17 17 0 0 0 31.5 37.7" fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
      </button>
      <span className="text-[#e0e0dc]" aria-hidden>
        <AirMarkIcon className="h-10 w-10" />
      </span>
      <button type="button" aria-label="New project" onClick={onAdd} className="ab-glass flex h-[46px] w-[46px] items-center justify-center rounded-full">
        <PlusIcon className="h-5 w-5" />
      </button>
    </header>
  )
}
