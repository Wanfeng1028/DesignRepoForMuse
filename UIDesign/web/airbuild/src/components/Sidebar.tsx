import type { Agent } from '../data/demo.ts'
import { tokens } from '../tokens/tokens.ts'
import { AvatarBlob } from './AvatarBlob.tsx'
import { IconBookOpen, IconGear, IconHouse, IconPerson, projectIconMap, type ProjectIconKey } from './icons.tsx'

export function ProjectTile({ name, icon, tint, active }: { name: string; icon: ProjectIconKey; tint: string; active?: boolean }) {
  const Mini = projectIconMap[icon]
  return (
    <button type="button" aria-label={`Open ${name}`} title={name}
      style={{ aspectRatio: 1.25, borderRadius: 12, background: active ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.34)',
        border: active ? '1px solid rgba(255,255,255,0.94)' : '1px solid transparent',
        boxShadow: active ? '0 5px 14px rgba(0,0,0,0.06)' : 'none',
        display: 'grid', placeItems: 'center', padding: 0, cursor: 'pointer', minWidth: 0 }}>
      <span style={{ width: 32, height: 32, borderRadius: '32%', background: tint, display: 'grid', placeItems: 'center',
        color: 'rgba(17,17,15,0.75)', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))' }}>
        <Mini size={19} />
      </span>
    </button>
  )
}

export function AgentRow({ agent, active }: { agent: Agent; active?: boolean }) {
  return (
    <button type="button" aria-label={`Message ${agent.name}`}
      style={{ width: '100%', display: 'grid', gridTemplateColumns: '30px minmax(0,1fr) auto', gap: 7, minHeight: 42, padding: '4px 5px',
        borderRadius: 9, background: active ? 'rgba(255,255,255,0.5)' : 'transparent', border: 'none', alignItems: 'center',
        cursor: 'pointer', textAlign: 'left', color: tokens.ink }}>
      <AvatarBlob name={agent.name} color={agent.color} bg={agent.bg} size={28} />
      <span style={{ minWidth: 0, display: 'grid', gap: 2 }}>
        <strong style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11, fontWeight: 600 }}>
          {agent.name} <em style={{ color: 'rgba(0,0,0,0.4)', fontStyle: 'normal', fontWeight: 400 }}>{agent.role}</em>
        </strong>
        <small style={{ overflow: 'hidden', color: 'rgba(0,0,0,0.34)', fontSize: 8, textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.status}</small>
      </span>
      <span style={{ fontSize: 8, color: '#2ecb70', lineHeight: 1 }}>{agent.online ? '●' : ''}</span>
    </button>
  )
}

export function Sidebar({ agents, projects, activeAgentKey, activeProject }: {
  agents: Agent[]; projects: { name: string; icon: ProjectIconKey; tint: string }[]; activeAgentKey?: string; activeProject?: string
}) {
  const footBtn: React.CSSProperties = { width: 36, height: 36, borderRadius: '50%', border: 'none',
    background: tokens.controlBg, boxShadow: tokens.controlShadow, color: '#000000a6',
    display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'rgba(226,228,226,0.56)',
      borderRight: '1px solid rgba(17,17,15,0.045)', boxShadow: 'inset -1px 0 rgba(255,255,255,0.42)',
      overflow: 'hidden', padding: '8px 12px 9px', boxSizing: 'border-box' }}>
      <div>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 3px 9px',
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(0,0,0,0.38)' }}>
          <span>Projects</span>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
          {projects.map((p) => (<ProjectTile key={p.name} {...p} active={p.name === activeProject} />))}
        </div>
      </div>
      <div style={{ marginTop: 10 }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '0 3px 9px',
          fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(0,0,0,0.38)' }}>
          <span>Agents</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {agents.map((a) => (<AgentRow key={a.key} agent={a} active={a.key === activeAgentKey} />))}
        </div>
      </div>
      <div style={{ marginTop: 'auto', padding: '10px 0 1px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 7, alignItems: 'center' }}>
        <button type="button" aria-label="Account"
          style={{ minWidth: 0, height: 36, display: 'flex', alignItems: 'center', justifyContent: 'flex-start', gap: 7,
            padding: '4px 11px 4px 5px', overflow: 'hidden', borderRadius: 999, fontSize: 11, border: 'none',
            background: tokens.controlBg, boxShadow: tokens.controlShadow, color: '#686868', cursor: 'pointer' }}>
          <span style={{ display: 'flex', opacity: 0.78, flex: 'none' }}><IconPerson size={17} /></span>
          <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>Account</span>
        </button>
        <div style={{ display: 'flex', gap: 5 }}>
          <button type="button" aria-label="Home" title="Home" style={footBtn}><span style={{ display: 'flex', opacity: 0.74 }}><IconHouse size={17} /></span></button>
          <button type="button" aria-label="Settings" title="Settings" style={footBtn}><span style={{ display: 'flex', opacity: 0.74 }}><IconGear size={17} /></span></button>
          <button type="button" aria-label="Activity" title="Activity" style={footBtn}><span style={{ display: 'flex', opacity: 0.74 }}><IconBookOpen size={17} /></span></button>
        </div>
      </div>
    </div>
  )
}
