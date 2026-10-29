import { tokens } from '../tokens/tokens.ts'
import { IconPlus, IconSidebarLeft, IconSidebarRight } from './icons.tsx'

export function TrafficLights() {
  return (
    <span style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      {tokens.trafficLights.map((c) => (
        <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c, boxShadow: 'inset 0 0 0 1px rgba(0,0,0,0.08)' }} />
      ))}
    </span>
  )
}

export function Titlebar({ title, onToggleSidebar, onTogglePreview, previewCollapsed }: {
  title: string; onToggleSidebar?: () => void; onTogglePreview?: () => void; previewCollapsed?: boolean
}) {
  return (
    <div style={{ height: 48, display: 'flex', alignItems: 'center', gap: 10, padding: '0 12px',
      background: tokens.conversation.titleBg, borderBottom: `1px solid ${tokens.divider}`, flex: 'none' }}>
      <TrafficLights />
      <button aria-label="New" style={{ width: 28, height: 28, borderRadius: '50%', border: 'none', background: 'rgba(255,255,255,0.64)', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#000000a6' }}>
        <IconPlus size={15} />
      </button>
      <button aria-label="Toggle sidebar" onClick={onToggleSidebar} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#686868', display: 'flex' }}>
        <IconSidebarLeft size={16} />
      </button>
      <div style={{ flex: 1, textAlign: 'center', fontSize: 12, fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{title}</div>
      <button aria-label="Toggle preview" onClick={onTogglePreview} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#686868', display: 'flex' }}>
        <IconSidebarRight size={16} />
      </button>
      <span style={{ fontSize: 11, color: tokens.muted, display: previewCollapsed ? 'none' : undefined }}>Preview</span>
    </div>
  )
}
