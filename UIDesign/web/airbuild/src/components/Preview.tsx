import { useState } from 'react'
import { tokens } from '../tokens/tokens.ts'
import { AvatarBlob } from './AvatarBlob.tsx'
import { CloverMark, IconGear, IconIPhone, IconLineDecrease, IconX, projectIconMap } from './icons.tsx'

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
              background: isActive ? 'transparent' : hovered ? '#f2f2f0' : '#f7f7f5', color: isActive ? '#11110f' : 'rgba(17,17,15,0.46)',
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
  { key: 'ato', name: 'Ato', role: '@product', text: 'Session ready to review', time: '10:24', color: '#97c151' },
  { key: 'pluso', name: 'Pluso', role: '@developer', text: 'Build is ready to test', time: 'Now', color: '#52ccdb' },
  { key: 'colo', name: 'Colo', role: '@design', text: 'The design is ready.', time: '09:41', color: '#855dfe' },
  { key: 'camo', name: 'Camo', role: '@gaming', text: 'New app released', time: '09:12', color: '#f9d01f' },
  { key: 'ampo', name: 'Ampo', role: '@appstore', text: 'Latest build ready to test', time: '08:58', color: '#4db7da' },
  { key: 'leto', name: 'Leto', role: '@website', text: 'Sync issue is fixed.', time: '08:30', color: '#f8ad43' },
]

export function PhonePreview() {
  const tiles: { label: string; icon: 'clock' | 'house' | 'grid' }[] = [
    { label: 'Focus', icon: 'clock' }, { label: 'Town', icon: 'house' }, { label: 'Stats', icon: 'grid' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <div style={{ position: 'relative', flex: 1, display: 'grid', placeItems: 'center', padding: '6px 24px 14px', overflow: 'hidden' }}>
        <div aria-hidden style={{ position: 'absolute', width: 'min(58%, 300px)', height: 45, bottom: '8%', left: '50%', transform: 'translateX(-50%)', background: 'rgba(0,0,0,0.18)', filter: 'blur(30px)', borderRadius: '50%' }} />
        <div style={{ position: 'relative', zIndex: 2, width: 'min(270px, calc(100% - 28px))', minWidth: 180, aspectRatio: 0.51, borderRadius: 38,
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
          <div style={{ height: 42, display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 13px' }}>
            <button type="button" aria-label="App settings" style={{ width: 30, height: 30, display: 'grid', placeItems: 'center', padding: 0, background: tokens.controlBg, boxShadow: tokens.controlShadow, border: 'none', borderRadius: '50%', cursor: 'pointer', color: '#686868', backdropFilter: 'blur(4px) saturate(1.45)', WebkitBackdropFilter: 'blur(4px) saturate(1.45)' }}>
              <span style={{ display: 'flex', opacity: 0.72, filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.52))' }}><IconGear size={15} /></span>
            </button>
            <span style={{ display: 'flex', color: '#11110f' }}><CloverMark size={16} /></span>
            <button type="button" aria-label="App menu" style={{ width: 30, height: 30, display: 'grid', placeItems: 'center', padding: 0, background: tokens.controlBg, boxShadow: tokens.controlShadow, border: 'none', borderRadius: '50%', cursor: 'pointer', color: '#686868', backdropFilter: 'blur(4px) saturate(1.45)', WebkitBackdropFilter: 'blur(4px) saturate(1.45)' }}>
              <span style={{ display: 'flex', opacity: 0.72, filter: 'drop-shadow(0 1px 0 rgba(255,255,255,0.52))' }}><IconLineDecrease size={15} /></span>
            </button>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 8, padding: '8px 14px 12px' }}>
            {tiles.map((n) => {
              const Mini = projectIconMap[n.icon]
              return (
                <div key={n.label} style={{ background: '#fff', border: '1px solid rgba(17,17,15,0.045)', borderRadius: '32%', aspectRatio: 1, display: 'grid', placeItems: 'center', color: 'rgba(17,17,15,0.75)' }}>
                  <span style={{ display: 'flex', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.16))' }}><Mini size={44} /></span>
                </div>
              )
            })}
          </div>
          <div className="ab-phone-feed" style={{ display: 'flex', flexDirection: 'column', padding: '6px 12px 16px', overflowY: 'auto', scrollbarWidth: 'none' }}>
            {phoneFeed.map((r, i) => (
              <div key={r.key}>
                <div style={{ height: 48, minHeight: 48, display: 'grid', gridTemplateColumns: '26px minmax(0,1fr) auto', columnGap: 7, alignItems: 'center', padding: '5px 0' }}>
                  <AvatarBlob name={r.name} color={r.color} size={26} />
                  <span style={{ minWidth: 0, display: 'grid', gap: 2 }}>
                    <span style={{ display: 'block', fontSize: 9, fontWeight: 600, color: '#11110f', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.name} <em style={{ marginLeft: 2, fontSize: 7, fontStyle: 'normal', fontWeight: 400, color: tokens.muted }}>{r.role}</em></span>
                    <span style={{ display: 'block', fontSize: 8, color: tokens.muted, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{r.text}</span>
                  </span>
                  <span style={{ fontSize: 6.5, color: tokens.muted, alignSelf: 'start', paddingTop: 2 }}>{r.time}</span>
                </div>
                {i < phoneFeed.length - 1 ? <div style={{ marginLeft: 33, height: 1, background: 'rgba(17,17,15,0.045)' }} /> : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
