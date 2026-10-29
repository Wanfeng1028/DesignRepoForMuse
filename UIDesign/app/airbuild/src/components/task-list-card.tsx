import { TaskListIcon } from './icons.tsx'

export type TaskItem = { label: string; done?: boolean; active?: boolean }
export type TaskListCardProps = {
  title: string
  items: TaskItem[]
  actionLabel?: string
  onAction?: () => void
}

/** Task checklist card: warm #fffaf2 ground, title row, circle items, optional action link. */
export function TaskListCard({ title, items, actionLabel = 'View task', onAction }: TaskListCardProps) {
  return (
    <section className="rounded-[16px] border border-[rgba(94,74,46,0.12)] bg-[#fffaf2] p-3.5 shadow-[0_5px_16px_rgba(0,0,0,0.025)]">
      <h3 className="flex items-center gap-2 text-[15px] font-bold text-[#53412e]">
        <TaskListIcon className="h-5 w-5 shrink-0" />
        {title}
      </h3>
      <ul className="mt-3 space-y-2.5">
        {items.map((item) => (
          <li key={item.label} className="flex items-start gap-2.5 text-[14px] leading-snug text-[#53412e]">
            <span
              className="mt-0.5 flex h-[15px] w-[15px] shrink-0 items-center justify-center rounded-full border border-[#d8cfc1] text-[10px] text-white"
              style={{ background: item.done ? '#467458' : item.active ? '#c49b65' : 'transparent' }}
              aria-hidden
            >
              {item.done ? '✓' : ''}
            </span>
            {item.label}
          </li>
        ))}
      </ul>
      {onAction ? (
        <div className="mt-3 flex justify-end">
          <button type="button" onClick={onAction} className="text-[12px] font-medium text-[#88755e]">
            {actionLabel} ›
          </button>
        </div>
      ) : null}
    </section>
  )
}
