import { useState } from 'react'
import { tokens } from '../tokens/tokens.ts'
import { IconArrowUp, IconPlus } from './icons.tsx'

export function FollowUpComposer({ placeholder = 'Send follow-up', onSend }: { placeholder?: string; onSend?: (v: string) => void }) {
  const [value, setValue] = useState('')
  const [hoverAttach, setHoverAttach] = useState(false)
  const [hoverSend, setHoverSend] = useState(false)
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (value.trim()) { onSend?.(value.trim()); setValue('') } }}
      style={{ height: 32, borderRadius: 999, margin: '0 14px 10px', background: tokens.controlBg,
        border: 'none', boxShadow: tokens.controlShadow, backdropFilter: 'blur(4px) saturate(1.45)', WebkitBackdropFilter: 'blur(4px) saturate(1.45)',
        display: 'grid', gridTemplateColumns: '24px minmax(0,1fr) 24px', gap: 4, alignItems: 'center', padding: 3, flex: 'none' }}
    >
      <button type="button" aria-label="Attach" className="ab-composer-attach" onMouseEnter={() => setHoverAttach(true)} onMouseLeave={() => setHoverAttach(false)}
        style={{ width: 24, height: 24, borderRadius: '50%', border: 'none', background: tokens.controlBg, boxShadow: tokens.controlShadow, color: '#686868', display: 'grid', placeItems: 'center', cursor: 'pointer', backdropFilter: 'blur(4px) saturate(1.45)', WebkitBackdropFilter: 'blur(4px) saturate(1.45)', filter: hoverAttach ? 'brightness(1.035)' : 'none' }}>
        <span style={{ display: 'flex', opacity: 0.72 }}><IconPlus size={14} /></span>
      </button>
      <input className="ab-followup-input" value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder}
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 12, lineHeight: '16px', minWidth: 0, color: '#11110f', padding: 4 }} />
      <button type="submit" aria-label="Send" className="ab-composer-send" disabled={!value.trim()} onMouseEnter={() => setHoverSend(true)} onMouseLeave={() => setHoverSend(false)}
        style={{ width: 24, height: 24, borderRadius: '50%', border: 'none', background: '#1987f7', color: '#fff', display: 'grid', placeItems: 'center', cursor: value.trim() ? 'pointer' : 'default', filter: hoverSend && value.trim() ? 'brightness(1.035)' : 'none' }}>
        <span style={{ display: 'flex', opacity: 0.72 }}><IconArrowUp size={13} /></span>
      </button>
    </form>
  )
}
