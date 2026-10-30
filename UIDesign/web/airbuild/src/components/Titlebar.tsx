import { useState, type ReactNode } from 'react'
import { tokens } from '../tokens/tokens.ts'
import { IconDeviceInbound, IconIPhone, IconPaperplane, IconPlus, IconX, PanelLeftToggle, PanelRightToggle } from './icons.tsx'

export function TrafficLights() {
  return (
    <span style={{ display: 'flex', gap: 7, alignItems: 'center', flex: 'none' }}>
      {tokens.trafficLights.map((c) => (
        <span key={c} className="ab-traffic-light" style={{ width: 17, height: 17, borderRadius: '50%', background: c,
          boxShadow: 'inset 0 0 0 0.5px rgba(0,0,0,0.15), 0 1px 2px rgba(0,0,0,0.08)' }} />
      ))}
    </span>
  )
}

function ControlCapsule({ children }: { children: ReactNode }) {
  return (
    <span style={{ flex: 'none', width: 64, height: 32, display: 'flex', alignItems: 'center', overflow: 'hidden',
      background: tokens.controlBg, borderRadius: 999, boxShadow: tokens.controlShadow,
      backdropFilter: 'blur(4px) saturate(1.45)', WebkitBackdropFilter: 'blur(4px) saturate(1.45)' }}>{children}</span>
  )
}

function CapsuleButton({ label, onClick, icon, divider, dividerColor = 'rgba(0,0,0,0.1)' }: { label: string; onClick?: () => void; icon: ReactNode; divider?: boolean; dividerColor?: string }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button type="button" aria-label={label} onClick={onClick}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ position: 'relative', width: 32, height: 32, flex: '0 0 32px', display: 'grid', placeItems: 'center',
        padding: 0, color: '#11110f', background: hovered ? 'rgba(255,255,255,0.22)' : 'transparent', border: 'none', borderRadius: 999, cursor: 'pointer' }}>
      {divider ? <span style={{ position: 'absolute', left: 0, top: 6, width: 1, height: 20, background: dividerColor }} /> : null}
      <span style={{ display: 'flex', opacity: 0.72 }}>{icon}</span>
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
  const [hoverTab, setHoverTab] = useState<string | null>(null)
  const [hoverNewTab, setHoverNewTab] = useState(false)
  const [hoverStrip, setHoverStrip] = useState(false)
  const [hoverBright, setHoverBright] = useState(false)
  const sidebarZone = (
    <div style={sidebarCollapsed
      ? { position: 'absolute', left: 0, top: 0, bottom: 0, width: 170, zIndex: 4, display: 'flex', gap: 14, alignItems: 'center', padding: '4px 12px 0', background: 'transparent' }
      : { gridColumn: 1, display: 'flex', gap: 14, alignItems: 'center', padding: '4px 12px 0', background: 'rgba(226,228,226,0.56)', borderRight: '1px solid rgba(17,17,15,0.045)', boxShadow: 'inset -1px 0 rgba(255,255,255,0.42)' }}>
      <TrafficLights />
      <ControlCapsule>
        <CapsuleButton label="Create a new project" icon={<IconPlus size={13} />} />
        <CapsuleButton label="Toggle left sidebar" onClick={onToggleSidebar} divider icon={<PanelLeftToggle open={!sidebarCollapsed} size={16} />} />
      </ControlCapsule>
    </div>
  )
  const conversationZone = (
    <div style={{ gridColumn: 2, display: 'grid', placeItems: 'center', background: tokens.conversation.titleBg,
      padding: `4px ${previewCollapsed ? 48 : 10}px 0 ${sidebarCollapsed ? 174 : 10}px`,
      transition: 'padding-left 240ms cubic-bezier(0.32,0.72,0,1), padding-right 240ms cubic-bezier(0.32,0.72,0,1)' }}>
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
          onMouseEnter={() => setHoverStrip(true)} onMouseLeave={() => setHoverStrip(false)}
          style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', padding: 0, color: '#686868',
            background: tokens.controlBg, boxShadow: tokens.controlShadow, border: 'none', borderRadius: 999, cursor: 'pointer',
            backdropFilter: 'blur(4px) saturate(1.45)', WebkitBackdropFilter: 'blur(4px) saturate(1.45)',
            filter: hoverStrip ? 'brightness(1.035)' : 'none' }}>
          <span style={{ display: 'flex', opacity: 0.72 }}><PanelRightToggle open={!previewCollapsed} size={17} /></span>
        </button>
      </div>
    )
    : (
      <div style={{ gridColumn: 3, display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 6, alignItems: 'center',
        padding: '4px 8px 0 10px', background: tokens.preview.bg }}>
        <div style={{ display: 'flex', gap: 4, alignItems: 'center', overflow: 'hidden', minWidth: 0 }}>
          {deviceTabs.map((t) => {
            const isActive = t === activeDevice
            const hovered = hoverTab === t
            return (
              <button key={t} type="button" role="tab" aria-selected={isActive} onClick={() => onSelectDevice(t)}
                onMouseEnter={() => setHoverTab(t)} onMouseLeave={() => setHoverTab(null)}
                style={{ height: 36, minWidth: 76, maxWidth: 180, flex: '0 0 auto', display: 'grid',
                  gridTemplateColumns: 'auto minmax(0,1fr) auto', gap: 6, alignItems: 'center', padding: '0 9px',
                  color: isActive ? '#11110f' : 'rgba(17,17,15,0.46)',
                  background: isActive ? 'transparent' : hovered ? '#f2f2f0' : '#f7f7f5', border: '1px solid transparent', borderRadius: 9,
                  cursor: 'pointer', fontSize: 10 }}>
                <span style={{ display: 'flex', opacity: 0.45 }}><IconIPhone size={12} /></span>
                <strong style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontWeight: 500 }}>{t}</strong>
                <span onClick={(e) => { e.stopPropagation(); onCloseDevice(t) }}
                  style={{ display: 'flex', opacity: isActive || hovered ? 0.3 : 0, transition: 'opacity 120ms ease' }}><IconX size={9} /></span>
              </button>
            )
          })}
          <button type="button" aria-label="Open new preview tab" onClick={onNewDevice}
            onMouseEnter={() => setHoverNewTab(true)} onMouseLeave={() => setHoverNewTab(false)}
            style={{ width: 36, height: 36, flex: '0 0 36px', display: 'grid', placeItems: 'center', padding: 0,
              color: 'rgba(17,17,15,0.46)', background: hoverNewTab ? 'rgba(255,255,255,0.5)' : 'transparent', border: 'none', borderRadius: 9, cursor: 'pointer' }}>
            <span style={{ display: 'flex', opacity: 0.48 }}><IconPlus size={14} /></span>
          </button>
        </div>
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <ControlCapsule>
            <CapsuleButton label="Share build" icon={<IconPaperplane size={11} />} />
            <CapsuleButton label="Send preview to iPhone" divider dividerColor="rgba(0,0,0,0.09)" icon={<IconDeviceInbound size={16} />} />
          </ControlCapsule>
          <button type="button" aria-label="Toggle preview" onClick={onTogglePreview}
            onMouseEnter={() => setHoverBright(true)} onMouseLeave={() => setHoverBright(false)}
            style={{ width: 32, height: 32, display: 'grid', placeItems: 'center', padding: 0, color: '#686868',
              background: tokens.controlBg, boxShadow: tokens.controlShadow, border: 'none', borderRadius: 999, cursor: 'pointer',
              backdropFilter: 'blur(4px) saturate(1.45)', WebkitBackdropFilter: 'blur(4px) saturate(1.45)',
              filter: hoverBright ? 'brightness(1.035)' : 'none' }}>
            <span style={{ display: 'flex', opacity: 0.72 }}><PanelRightToggle open={!previewCollapsed} size={17} /></span>
          </button>
        </div>
      </div>
    )
  return (
    <div style={{ position: 'relative', zIndex: 50, display: 'grid', gridTemplateColumns: grid, alignItems: 'stretch',
      height: 40, flex: 'none', background: 'transparent', boxShadow: 'inset 0 1px rgba(255,255,255,0.8)',
      transition: 'grid-template-columns 240ms cubic-bezier(0.32,0.72,0,1)' }}>
      {sidebarZone}
      {conversationZone}
      {previewZone}
      {previewCollapsed ? null : (
        <div aria-hidden style={{ position: 'absolute', top: 0, bottom: 0, left: '58%', zIndex: 3, width: 1, background: tokens.hairline, pointerEvents: 'none' }} />
      )}
    </div>
  )
}
