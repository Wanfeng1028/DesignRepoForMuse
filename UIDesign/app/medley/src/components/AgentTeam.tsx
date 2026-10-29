import { cn } from '../lib/utils'

export function AgentStatus({ label }: { label: string }) {
  const running = label === 'Running'
  const done = label === 'Done'
  const color = running ? '#3fa34d' : done ? '#f5f5f7' : '#9a9ba2'
  return (
    <span className="inline-flex shrink-0 items-center gap-[5px] text-[13px] text-dark-sub">
      <span className="h-[7px] w-[7px] rounded-full" style={{ background: color }} />
      {label}
    </span>
  )
}

/** Agent team row: role, model, task, status, elapsed time are all props.
 *  Inline dot colours follow the standing convention (Running green,
 *  Done white, Queued grey); at 3px in the source they are not
 *  independently resolvable, see README residual. */
export function AgentRow({
  role,
  model,
  task,
  status,
  time,
}: {
  role: string
  model: string
  task: string
  status: string
  time: string
}) {
  return (
    <div className="mt-2.5 rounded-card bg-dark-card px-4 py-[13px]">
      <div className="flex items-center justify-between gap-2.5">
        <span className="text-[14px]">
          <span className="font-bold">{role}</span>
          <span className="text-dark-sub"> · {model}</span>
        </span>
        <AgentStatus label={status} />
      </div>
      <div className="mt-1.5 flex items-center justify-between gap-2.5">
        <div className="text-[14px] text-dark-sub">{task}</div>
        <span className="shrink-0 text-[13px] text-dark-sub">{time}</span>
      </div>
    </div>
  )
}

export function CreditsProgress({ label, step, percent }: { label: string; step: string; percent: string }) {
  return (
    <div>
      <div className="mt-4 h-1 rounded-full bg-dark-divider">
        <div className={cn('h-full rounded-full bg-dark-text')} style={{ width: percent }} />
      </div>
      <div className="mt-2 flex justify-between text-[13px] text-dark-sub">
        <span>{label}</span>
        <span>{step}</span>
      </div>
    </div>
  )
}
