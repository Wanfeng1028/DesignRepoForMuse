import { useState } from 'react'
import { ArrowUpIcon, HandSolidIcon, PlusIcon } from './icons.tsx'

export type ComposerProps = {
  placeholder?: string
  initialValue?: string
  onSend?: (text: string) => void
}

/**
 * Composer: white rounded card. Row 1: hand button + + button (pale tiles).
 * Row 2: text input + blue circular send arrow. Matches iphone-06 bottom bar.
 */
export function Composer({ placeholder = 'Message', initialValue = '', onSend }: ComposerProps) {
  const [value, setValue] = useState(initialValue)
  return (
    <div className="rounded-[32px] border border-black/[0.06] bg-white p-3.5 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
      <div className="flex gap-2.5">
        <button type="button" aria-label="Quick actions" className="relative flex h-[68px] w-[68px] items-center justify-center rounded-[16px] bg-[#f4f4f2] text-[#11110f]">
          <HandSolidIcon className="h-8 w-8" />
          <span className="absolute left-1/2 top-1/2 h-2 w-2 -translate-x-1/2 -translate-y-[2px] rounded-full bg-white" aria-hidden />
        </button>
        <button type="button" aria-label="Attach" className="flex h-[68px] w-[68px] items-center justify-center rounded-[16px] bg-[#f4f4f2] text-black/50">
          <PlusIcon className="h-7 w-7" />
        </button>
      </div>
      <div className="mt-2.5 flex items-center gap-2 pl-1">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Message input"
          className="min-w-0 flex-1 bg-transparent py-3 text-[12px] text-[#11110f] outline-none placeholder:text-black/35"
        />
        <button
          type="button"
          aria-label="Send"
          onClick={() => onSend?.(value)}
          className="flex h-[35px] w-[35px] shrink-0 items-center justify-center rounded-full bg-[#0088fe] text-white shadow-[0_4px_12px_rgba(0,136,254,0.4)]"
        >
          <ArrowUpIcon className="h-4 w-4" />
        </button>
      </div>
    </div>
  )
}
