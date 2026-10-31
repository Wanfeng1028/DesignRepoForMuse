import { useState } from 'react'
import { ArrowUpIcon, HandSolidIcon, PlusIcon } from './icons.tsx'

export type ComposerProps = {
  placeholder?: string
  initialValue?: string
  onSend?: (text: string) => void
  /** v1.11: while the agent is "typing" the composer locks (no queueing). */
  disabled?: boolean
}

/**
 * Composer: white rounded card. Row 1: hand button + + button (pale tiles).
 * Row 2: text input + blue circular send arrow. Matches iphone-06 bottom bar.
 * v1.11 behaviour (screenshots at rest unchanged): Enter sends; a sent
 * message clears the input (standard iOS composer behaviour); an empty
 * send is a no-op and the button keeps its original blue — the original
 * never shows a dimmed send button, so no dimmed empty state is invented.
 * The hand / + tiles keep their press state only: their destination
 * panels are not in the screenshot set, so nothing is wired to them.
 */
export function Composer({ placeholder = 'Message', initialValue = '', onSend, disabled }: ComposerProps) {
  const [value, setValue] = useState(initialValue)
  const send = () => {
    if (disabled) return
    if (!value.trim()) return
    onSend?.(value)
    setValue('')
  }
  return (
    <div className="rounded-[32px] border border-black/[0.045] bg-white p-3.5 shadow-[0_10px_28px_rgba(0,0,0,0.065)]">
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
          onKeyDown={(e) => { if (e.key === 'Enter') send() }}
          placeholder={placeholder}
          aria-label="Message input"
          disabled={disabled}
          className="min-w-0 flex-1 bg-transparent py-3 text-[12px] text-[#11110f] outline-none placeholder:text-black/35"
        />
        <button
          type="button"
          aria-label="Send"
          onClick={send}
          disabled={disabled}
          className="flex h-[34px] w-[34px] shrink-0 items-center justify-center rounded-full bg-[#268eff] text-white shadow-[0_4px_12px_rgba(38,142,255,0.4)] disabled:opacity-50"
        >
          <ArrowUpIcon className="h-[22px] w-[22px]" />
        </button>
      </div>
    </div>
  )
}
