import { useState } from 'react'
import { IconArrowUp, IconPlus } from './icons.tsx'

export function FollowUpComposer({ placeholder = 'Send follow-up', onSend }: { placeholder?: string; onSend?: (v: string) => void }) {
  const [value, setValue] = useState('')
  return (
    <form
      onSubmit={(e) => { e.preventDefault(); if (value.trim()) { onSend?.(value.trim()); setValue('') } }}
      style={{ height: 32, borderRadius: 999, margin: '0 14px 10px', background: 'rgba(255,255,255,0.94)',
        border: '1px solid rgba(0,0,0,0.075)', boxShadow: '0 10px 28px rgba(0,0,0,0.065), inset 0 1px rgba(255,255,255,0.78)',
        backdropFilter: 'blur(16px)', WebkitBackdropFilter: 'blur(16px)',
        display: 'grid', gridTemplateColumns: '24px minmax(0,1fr) 24px', gap: 4, alignItems: 'center', padding: 3, flex: 'none' }}
    >
      <button type="button" aria-label="Attach" style={{ width: 24, height: 24, borderRadius: '50%', border: 'none', background: '#ededeb', color: 'rgba(0,0,0,0.55)', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
        <span style={{ display: 'flex', opacity: 0.58 }}><IconPlus size={14} /></span>
      </button>
      <input className="ab-followup-input" value={value} onChange={(e) => setValue(e.target.value)} placeholder={placeholder}
        style={{ flex: 1, border: 'none', outline: 'none', background: 'transparent', fontSize: 12, lineHeight: '16px', minWidth: 0, color: '#191919', padding: 4 }} />
      <button type="submit" aria-label="Send" style={{ width: 24, height: 24, borderRadius: '50%', border: 'none', background: '#1987f7', color: '#fff', display: 'grid', placeItems: 'center', cursor: 'pointer' }}>
        <IconArrowUp size={13} />
      </button>
    </form>
  )
}
