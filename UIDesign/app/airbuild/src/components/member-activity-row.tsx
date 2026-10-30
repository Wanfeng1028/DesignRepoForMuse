import { Avatar } from './avatar.tsx'

export type MemberActivityProps = {
  name: string
  role: string
  status: string
  time?: string
  /** orange "Action needed" style */
  actionNeeded?: boolean
  avatarColor?: string
  /** home-list badge (Pluso dot / Camo cup); chat avatars carry none */
  badge?: 'dot' | 'cup'
}

/** Member activity row: blob avatar + name + @role + status line + optional time. */
export function MemberActivityRow({ name, role, status, time, actionNeeded, avatarColor, badge }: MemberActivityProps) {
  return (
    <div className="flex items-center gap-3 py-2.5">
      <Avatar name={name} color={avatarColor} size={42} badge={badge} className="shrink-0" />
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-bold text-[#11110f]">
          {name} <span className="font-normal text-black/45">@{role}</span>
        </p>
        <p className={`truncate text-[14px] ${actionNeeded ? 'font-medium text-[#f97316]' : 'text-black/55'}`}>{status}</p>
      </div>
      {time ? <span className="shrink-0 text-[13px] text-black/40">{time}</span> : null}
    </div>
  )
}
