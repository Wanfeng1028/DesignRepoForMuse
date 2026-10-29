import { useState } from 'react'
import { IconIPhone, IconX } from './icons.tsx'

export function PreviewTabs({ tabs, active, onSelect, onClose }: { tabs: string[]; active: string; onSelect: (t: string) => void; onClose?: (t: string) => void }) {
  return (
    <div style={{ display: 'flex', gap: 6, padding: '10px 12px 8px', overflow: 'hidden' }}>
      {tabs.map((t) => {
        const isActive = t === active
        return (
          <button key={t} onClick={() => onSelect(t)}
            style={{ height: 36, minWidth: 76, maxWidth: 180, padding: '0 10px', borderRadius: 9, border: 'none', cursor: 'pointer',
              background: isActive ? 'transparent' : '#f7f7f5', color: isActive ? '#11110f' : 'rgba(17,17,15,0.6)',
              fontSize: 12, fontWeight: 500, display: 'flex', alignItems: 'center', gap: 6, whiteSpace: 'nowrap' }}>
            <IconIPhone size={12} />
            <span style={{ overflow: 'hidden', textOverflow: 'ellipsis' }}>{t}</span>
            <span onClick={(e) => { e.stopPropagation(); onClose?.(t) }} style={{ opacity: isActive ? 0.3 : 0, display: 'flex' }}><IconX size={9} /></span>
          </button>
        )
      })}
    </div>
  )
}

export function PhonePreview({ projectName = 'Hourtown' }: { projectName?: string }) {
  const [tab, setTab] = useState(projectName)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <PreviewTabs tabs={['Hourtown', 'Hands Time']} active={tab} onSelect={setTab} />
      <div style={{ flex: 1, display: 'flex', alignItems: 'flex-start', justifyContent: 'center', paddingTop: 6, overflow: 'hidden' }}>
        <div style={{ width: 210, height: 430, borderRadius: 34, background: 'rgba(255,255,255,0.98)', border: '1px solid #d8d8d6',
          boxShadow: '0 24px 48px rgba(0,0,0,0.24), inset 0 0 0 1px #fefefe', overflow: 'hidden', display: 'flex', flexDirection: 'column', flex: 'none' }}>
          <div style={{ height: 26, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 14px', fontSize: 9, fontWeight: 600 }}>
            <span>9:41</span>
            <span style={{ width: 56, height: 14, borderRadius: 999, background: '#11110f' }} />
            <span style={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
              <span style={{ width: 3, height: 4, background: '#11110f', borderRadius: 1 }} />
              <span style={{ width: 3, height: 6, background: '#11110f', borderRadius: 1 }} />
              <span style={{ width: 3, height: 8, background: '#11110f', borderRadius: 1 }} />
              <span style={{ width: 16, height: 9, border: '1px solid #11110f', borderRadius: 2, marginLeft: 3, position: 'relative' }}>
                <span style={{ position: 'absolute', left: 1, top: 1, bottom: 1, width: 10, background: '#11110f', borderRadius: 1 }} />
              </span>
            </span>
          </div>
          <div style={{ height: 36, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 12px', borderBottom: '1px solid rgba(60,60,67,0.08)' }}>
            <span style={{ fontSize: 12, fontWeight: 700 }}>{tab}</span>
            <span style={{ fontSize: 9, color: '#727279' }}>Today</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: 10 }}>
            {['Focus', 'Town', 'Stats'].map((n, i) => (
              <div key={n} style={{ background: '#fff', border: '1px solid #e7e7e7', borderRadius: '32%', aspectRatio: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <span style={{ fontSize: 16 }}>{['◷', '⌂', '▣'][i]}</span>
                <span style={{ fontSize: 8, fontWeight: 600 }}>{n}</span>
              </div>
            ))}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {[{ n: 'Ato', t: 'Session ready to review', time: '10:24' }, { n: 'Pluso', t: 'Build is ready to test', time: 'Now' }].map((r) => (
              <div key={r.n} style={{ height: 48, display: 'flex', alignItems: 'center', gap: 7, padding: '0 12px', borderBottom: '1px solid rgba(60,60,67,0.08)' }}>
                <span style={{ width: 26, height: 26, borderRadius: '50%', background: '#dbeafe', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 10, fontWeight: 700, flex: 'none' }}>{r.n[0]}</span>
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 9, fontWeight: 600, color: '#242426' }}>{r.n}</span>
                  <span style={{ display: 'block', fontSize: 8, color: '#727279', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.t}</span>
                </span>
                <span style={{ fontSize: 6.5, color: '#96969c' }}>{r.time}</span>
              </div>
            ))}
          </div>
          <div style={{ marginTop: 'auto', padding: 10, display: 'flex', justifyContent: 'center' }}>
            <span style={{ width: 90, height: 4, borderRadius: 999, background: '#d8d8d6' }} />
          </div>
        </div>
      </div>
    </div>
  )
}
