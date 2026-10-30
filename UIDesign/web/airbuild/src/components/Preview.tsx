import { useState } from 'react'
import { AvatarBlob } from './AvatarBlob.tsx'
import { IconIPhone, IconX, projectIconMap } from './icons.tsx'

export function PreviewTabs({ tabs, active, onSelect, onClose }: { tabs: string[]; active: string; onSelect: (t: string) => void; onClose?: (t: string) => void }) {
  const [hoverTab, setHoverTab] = useState<string | null>(null)
  return (
    <div style={{ display: 'flex', gap: 4, alignItems: 'center', overflow: 'hidden' }}>
      {tabs.map((t) => {
        const isActive = t === active
        const hovered = hoverTab === t
        return (
          <button key={t} onClick={() => onSelect(t)}
            onMouseEnter={() => setHoverTab(t)} onMouseLeave={() => setHoverTab(null)}
            style={{ height: 36, minWidth: 76, maxWidth: 180, padding: '0 9px', borderRadius: 9, border: '1px solid transparent', cursor: 'pointer',
              background: isActive ? 'transparent' : hovered ? '#f2f2f0' : '#f7f7f5', color: isActive ? '#11110f' : 'rgba(0,0,0,0.48)',
              fontSize: 10, fontWeight: 500, display: 'grid', gridTemplateColumns: 'auto minmax(0,1fr) auto', gap: 6, alignItems: 'center', whiteSpace: 'nowrap' }}>
            <span style={{ display: 'flex', opacity: 0.45 }}><IconIPhone size={12} /></span>
            <strong style={{ overflow: 'hidden', textOverflow: 'ellipsis', fontWeight: 500 }}>{t}</strong>
            <span onClick={(e) => { e.stopPropagation(); onClose?.(t) }} style={{ opacity: isActive || hovered ? 0.3 : 0, display: 'flex' }}><IconX size={9} /></span>
          </button>
        )
      })}
    </div>
  )
}

const phoneFeed = [
  { key: 'ato', name: 'Ato', text: 'Session ready to review', time: '10:24', color: '#2f7d4f', bg: '#cdeed9' },
  { key: 'pluso', name: 'Pluso', text: 'Build is ready to test', time: 'Now', color: '#0b6fa4', bg: '#cdeaff' },
]

export function PhonePreview({ projectName = 'Hourtown' }: { projectName?: string }) {
  const tiles: { label: string; icon: 'clock' | 'house' | 'grid' }[] = [
    { label: 'Focus', icon: 'clock' }, { label: 'Town', icon: 'house' }, { label: 'Stats', icon: 'grid' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ flex: 1, display: 'grid', placeItems: 'center', padding: '6px 24px 14px', overflow: 'hidden' }}>
        <div style={{ width: 'min(270px, calc(100% - 28px))', minWidth: 180, aspectRatio: 0.51, borderRadius: 38,
          background: 'rgba(255,255,255,0.98)', border: '7px solid #d8d8d6',
          boxShadow: '0 24px 48px rgba(0,0,0,0.24), inset 0 0 0 1px #fefefe', overflow: 'hidden',
          display: 'grid', gridTemplateRows: '34px 42px auto 1fr', flex: 'none' }}>
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 16px 2px', fontSize: 8, fontWeight: 700 }}>
            <span>9:41</span>
            <span style={{ position: 'absolute', left: '50%', top: 7, transform: 'translateX(-50%)', width: 48, height: 15, borderRadius: 999, background: '#050505' }} />
            <span style={{ display: 'flex', alignItems: 'flex-end', gap: 1 }}>
              <span style={{ width: 3, height: 4, background: '#11110f', borderRadius: 1 }} />
              <span style={{ width: 3, height: 6, background: '#11110f', borderRadius: 1 }} />
              <span style={{ width: 3, height: 8, background: '#11110f', borderRadius: 1 }} />
              <span style={{ width: 16, height: 8, border: '1px solid #11110f', borderRadius: 2, marginLeft: 3, position: 'relative', boxSizing: 'border-box' }}>
                <span style={{ position: 'absolute', left: 1, top: 1, bottom: 1, width: 6, background: '#11110f', borderRadius: 1 }} />
              </span>
            </span>
          </div>
          <div style={{ height: 42, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 13px', borderBottom: '1px solid rgba(60,60,67,0.08)' }}>
            <span style={{ fontSize: 12, fontWeight: 700 }}>{projectName}</span>
            <span style={{ fontSize: 9, color: '#727279' }}>Today</span>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: 10 }}>
            {tiles.map((n) => {
              const Mini = projectIconMap[n.icon]
              return (
                <div key={n.label} style={{ background: '#fff', border: '1px solid #e7e7e7', borderRadius: '32%', aspectRatio: 1, display: 'grid', placeItems: 'center', alignContent: 'center', gap: 2, color: 'rgba(17,17,15,0.75)' }}>
                  <Mini size={19} />
                  <span style={{ fontSize: 8, fontWeight: 600, color: '#11110f' }}>{n.label}</span>
                </div>
              )
            })}
          </div>
          <div style={{ display: 'flex', flexDirection: 'column' }}>
            {phoneFeed.map((r, i) => (
              <div key={r.key}>
                <div style={{ height: 48, display: 'flex', alignItems: 'center', gap: 7, padding: '0 12px' }}>
                  <AvatarBlob name={r.name} color={r.color} bg={r.bg} size={26} />
                  <span style={{ flex: 1, minWidth: 0 }}>
                    <span style={{ display: 'block', fontSize: 9, fontWeight: 600, color: '#242426' }}>{r.name}</span>
                    <span style={{ display: 'block', fontSize: 8, color: '#727279', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.text}</span>
                  </span>
                  <span style={{ fontSize: 6.5, color: '#96969c' }}>{r.time}</span>
                </div>
                {i < phoneFeed.length - 1 ? <div style={{ marginLeft: 33, height: 1, background: 'rgba(60,60,67,0.08)' }} /> : null}
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
