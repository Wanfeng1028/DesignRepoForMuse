import type { ReactNode } from 'react'
import { cn } from '../lib/utils.ts'
import { Avatar } from './avatar.tsx'

export type MessageProps = {
  author?: string
  role?: string
  children: ReactNode
  /** 'agent' = white bubble left, 'user' = blue bubble right */
  kind?: 'agent' | 'user'
  avatarColor?: string
}

/** Chat message row: avatar + author line + bubble. User bubbles carry no avatar/author line. */
export function Message({ author, role, children, kind = 'agent', avatarColor }: MessageProps) {
  if (kind === 'user') {
    return (
      <div className="flex justify-end pl-16">
        <div className="rounded-[20px] bg-[#0088fe] px-4 py-3 text-[15px] leading-[1.35] text-white shadow-[0_5px_16px_rgba(0,0,0,0.05)]">
          {children}
        </div>
      </div>
    )
  }
  return (
    <div className="flex items-end gap-2 pr-8">
      <Avatar name={author ?? 'Agent'} color={avatarColor} size={32} className="shrink-0" />
      <div className="min-w-0">
        <p className="mb-1 ml-1 text-[13px] font-semibold text-[#11110f]">
          {author} {role ? <span className="font-normal text-black/45">@{role}</span> : null}
        </p>
        <div className="rounded-[20px] border border-black/[0.045] bg-white px-4 py-3 text-[15px] leading-[1.35] text-[#11110f] shadow-[0_5px_16px_rgba(0,0,0,0.025)]">
          {children}
        </div>
      </div>
    </div>
  )
}

/** Typing indicator: avatar + white bubble with three animated dots. */
export function Typing({ author, avatarColor }: { author: string; avatarColor?: string }) {
  return (
    <div className="flex items-end gap-2 pr-8" aria-label={`${author} is typing`}>
      <Avatar name={author ?? 'Agent'} color={avatarColor} size={32} className="shrink-0" />
      <div className="flex items-center gap-1.5 rounded-[20px] border border-black/[0.045] bg-white px-3.5 py-3 shadow-[0_5px_16px_rgba(0,0,0,0.025)]">
        <span className="ab-typing-dot block h-[5px] w-[5px] rounded-full bg-black/50" />
        <span className="ab-typing-dot block h-[6px] w-[6px] rounded-full bg-black/50" />
        <span className="ab-typing-dot block h-[6px] w-[6px] rounded-full bg-black/50" />
      </div>
    </div>
  )
}

export function MessageList({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn('flex flex-1 flex-col gap-4 overflow-hidden px-4 py-3 [&>*]:shrink-0', className)}>{children}</div>
}
