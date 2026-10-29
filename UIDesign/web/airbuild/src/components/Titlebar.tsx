import type { ReactNode } from 'react'
import { tokens } from '../tokens/tokens.ts'
import { IconIPhone, IconPlus, IconShare, IconSidebarLeft, IconSidebarRight, IconX } from './icons.tsx'

export function TrafficLights() {
  return (
    <span style={{ display: 'flex', gap: 7, alignItems: 'center', flex: 'none' }}>
      {tokens.trafficLights.map((c) => (
        <span key={c} style={{ width: 17, height: 17, borderRadius: '50%', background: c,
          boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.08)' }} />
      ))}
    </span>
  )
}

function ControlCapsule({ children }: { children: ReactNode }) {
  return (
    <span style={{ flex: 'none', width: 64, height: 32, display: 'flex', alignItems: 'center', overflow: 'hidden',
      background: tokens.controlBg, borderRadius: 999, boxShadow: tokens.controlShadow }}>{children}</span>
  )
}

function CapsuleButton({ label, onClick, icon, divider }: { label: string; onClick?: () => void; icon: ReactNode; divider?: boolean }) {
  return (
    <button type="button" aria-label={label} onClick={onClick}
      style={{ position: 'relative', width: 32, height: 32, flex: '0 0 32px', display: 'grid', placeItems: 'center',
        padding: 0, color: 'rgba(0,0,0,0.78)', background: 'transparent', border: 'none', borderRadius: 999, cursor: 'pointer' }}>
      {divider ? <span style={{ position: 'absolute', left: 0, top: 6, width: 1, height: 20, background: 'rgba(0,0,0,0.1)' }} /> : null}
      {icon}
    </button>
  )
}

export function Titlebar({ grid, projectName, projectTint, projectIcon, deviceTabs, activeDevice, onSelectDevice, onCloseDevice, onNewDevice, sidebarCollapsed, previewCollapsed, onToggleSidebar, onTogglePreview }: {
  grid: string
  projectName: string
  projectTint: string
  projectIcon: ReactNode
  deviceTabs: string[]
  activeDevice: string
  onSelectDevice: (t: string) => void
  onCloseDevice: (t: string) => void
  onNewDevice: () => void
  sidebarCollapsed: boolean
  previewCollapsed: boolean
  onToggleSidebar: () => void
  onTogglePreview: () => void
}) {
  const sidebarZone = (
    <div style={sidebarCollapsed
      ? { position: 'absolute', left: 0, top: 0, bottom: 0, width: 170, zIndex: 4, display: 'flex', gap: 14, alignItems: 'center', padding: '4px 12px 0', background: 'transparent' }
      : { gridColumn: 1, display: 'flex', gap: 14, alignItems: 'center', padding: '4px 12px 0', background: 'rgba(226,228,226,0.56)', borderRight: '1px solid rgba(17,17,15,0.045)' }}>
      <TrafficLights />
      <ControlCapsule>
        <CapsuleButton label="Create a new project" icon={<IconPlus size={13} />} />
        <CapsuleButton label="Toggle left sidebar" onClick={onToggleSidebar} divider icon={<IconSidebarLeft size={16} />} />
      </ControlCapsule>
    </div>
  )
  const conversationZone = (
    <div style={{ gridColumn: 2, display: 'grid', placeItems: 'center', background: 'rgba(249,249,247,0.94)',
      padding: `4px ${previewCollapsed ? 48 : 10}px 0 ${sidebarCollapsed ? 174 : 10}px` }}>
      <button type="button" aria-label={`Current project: ${projectName}`} title={projectName}
        style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', padding: 0, overflow: 'visible',
          background: projectTint, border: 'none', borderRadius: '32%', cursor: 'pointer', color: 'rgba(17,17,15,0.75)',
          boxShadow: '0 2px 6px rgba(0,0,0,0.25)' }}>
        {projectIcon}
      </button>
    </div>
  )
  const previewZone = previewCollapsed
    ? (
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 48, zIndex: 6, display: 'flex',
        justifyContent: 'flex-end', alignItems: 'center', padding: '4px 8px 0 0', background: 'transparent' }}>
        <button type="button" aria-label="Toggle preview" onClick={onTogglePreview}
          style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', padding: 0, color: '#686868',
            background: tokens.controlBg, boxShadow: tokens.controlShadow, border: 'none', borderRadius: 999, cursor: 'pointer' }}>
          <span style={{ display: 'flex', opacity: 0.72 }}><IconSidebarRight size={17} /></span>
        </button>
      </div>
    )
    : (
      <div style={{ gridColumn: 3, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 6, alignItems: 'center',
        padding: '4px 8px 0 10px', background: 'rgba(249,249,247,0.94)' }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', overflow: 'hidden', minWidth: 0 }}>
          {deviceTabs.map((t) => {
            const isActive = t === activeDevice
            return (
              <button key={t} type="button" role="tab" aria-selected={isActive} onClick={() => onSelectDevice(t)}
                style={{ height: 36, minWidth: 76, maxWidth: 180, flex: '0 0 auto', display: 'grid',
                  gridTemplateColumns: 'auto minmax(0,1fr) auto', gap: 6, alignItems: 'center', padding: '0 9px',
                  color: isActive ? 'rgba(0,0,0,0.72)' : 'rgba(0,0,0,0.48)',
                  background: isActive ? 'transparent' : '#f7f7f5', border: '1px solid transparent', borderRadius: 9,
                  cursor: 'pointer', fontSize: 10 }}>
                <span style={{ display: 'flex', opacity: 0.45 }}><IconIPhone size={12} /></span>
                <strong style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{t}</strong>
                <span onClick={(e) => { e.stopPropagation(); onCloseDevice(t) }}
                  style={{ display: 'flex', opacity: isActive ? 0.3 : 0 }}><IconX size={9} /></span>
              </button>
            )
          })}
          <button type="button" aria-label="Open new preview tab" onClick={onNewDevice}
            style={{ width: 36, height: 36, flex: '0 0 36px', display: 'grid', placeItems: 'center', padding: 0,
              color: 'rgba(0,0,0,0.5)', background: 'transparent', border: 'none', borderRadius: 9, cursor: 'pointer' }}>
            <span style={{ display: 'flex', opacity: 0.48 }}><IconPlus size={14} /></span>
          </button>
        </div>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <ControlCapsule>
            <CapsuleButton label="Share build" icon={<IconShare size={16} />} />
            <CapsuleButton label="Toggle preview" onClick={onTogglePreview} divider icon={<IconSidebarRight size={16} />} />
          </ControlCapsule>
        </div>
      </div>
    )
  return (
    <div style={{ position: 'relative', zIndex: 50, display: 'grid', gridTemplateColumns: grid, alignItems: 'stretch',
      height: 40, flex: 'none', background: 'transparent', boxShadow: 'inset 0 1px rgba(255,255,255,0.8)' }}>
      {sidebarZone}
      {conversationZone}
      {previewZone}
      {previewCollapsed ? null : (
        <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: '58%', zIndex: 3, width: 1, background: 'rgba(17,17,15,0.22)', pointerEvents: 'none' }} />
      )}
    </div>
  )
}
