import { CheckIcon, TaskGlyphIcon } from './icons.tsx'

export type TaskItem = { label: string; done?: boolean; active?: boolean }
export type TaskListCardProps = {
  title: string
  items: TaskItem[]
  actionLabel?: string
  onAction?: () => void
}

/** Task checklist card: white ground, title row, circle items, optional action link. */
export function TaskListCard({ title, items, actionLabel = 'View task', onAction }: TaskListCardProps) {
  return (
    <section className="rounded-[20px] border border-black/[0.06] bg-white p-4 shadow-[0_5px_16px_rgba(0,0,0,0.025)]">
      <h3 className="flex items-center gap-2 text-[13px] font-bold text-[#11110f]">
        <TaskGlyphIcon className="h-5 w-5 shrink-0" />
        {title}
      </h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-2.5 text-[12px] leading-snug text-[#11110f]">
            <span
              className="mt-0.5 flex h-[16px] w-[16px] shrink-0 items-center justify-center rounded-full border border-black/20 text-[10px] text-white"
              style={{ background: item.done ? '#467458' : item.active ? '#c49b65' : 'transparent' }}
              aria-hidden
            >
              {item.done ? <CheckIcon className="h-3 w-3" /> : null}
            </span>
            {item.label}
          </li>
        ))}
      </ul>
      {onAction ? (
        <div className="mt-3 flex justify-end">
          <button type="button" onClick={onAction} className="text-[12px] font-medium text-black/50">
            {actionLabel} ›
          </button>
        </div>
      ) : null}
    </section>
  )
}
