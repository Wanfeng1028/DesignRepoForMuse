import { useState } from 'react'
import { ArrowUpIcon, HandIcon, PlusIcon } from './icons.tsx'

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
    <div className="rounded-[24px] border border-black/[0.06] bg-white p-2.5 shadow-[0_10px_28px_rgba(0,0,0,0.08)]">
      <div className="flex gap-2">
        <button type="button" aria-label="Quick actions" className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#f4f4f2] text-[#11110f]">
          <HandIcon className="h-6 w-6" />
        </button>
        <button type="button" aria-label="Attach" className="flex h-11 w-11 items-center justify-center rounded-[12px] bg-[#f4f4f2] text-black/50">
          <PlusIcon className="h-6 w-6" />
        </button>
      </div>
      <div className="mt-2 flex items-center gap-2 pl-1">
        <input
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder={placeholder}
          aria-label="Message input"
          className="min-w-0 flex-1 bg-transparent py-2 text-[15px] text-[#11110f] outline-none placeholder:text-black/35"
        />
        <button
          type="button"
          aria-label="Send"
          onClick={() => onSend?.(value)}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#1987f7] text-white shadow-[0_4px_12px_rgba(25,135,247,0.4)]"
        >
          <ArrowUpIcon className="h-5 w-5" />
        </button>
      </div>
    </div>
  )
}
