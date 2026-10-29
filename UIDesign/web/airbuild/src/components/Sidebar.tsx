import type { Agent } from '../data/demo.ts'
import { AvatarBlob } from './AvatarBlob.tsx'
import { IconGear, IconHouse, IconPerson } from './icons.tsx'

export function ProjectTile({ name, icon, tint, active }: { name: string; icon: string; tint: string; active?: boolean }) {
  return (
    <div style={{ aspectRatio: 1.25, borderRadius: 12, background: active ? 'rgba(255,255,255,0.72)' : 'rgba(255,255,255,0.34)',
      border: active ? '1px solid rgba(255,255,255,0.94)' : '1px solid transparent',
      boxShadow: active ? '0 5px 14px rgba(0,0,0,0.06)' : 'none',
      display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: 4, cursor: 'pointer' }}>
      <span style={{ width: 32, height: 32, borderRadius: '32%', background: tint, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16, filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))' }}>{icon}</span>
      <span style={{ fontSize: 9, fontWeight: 600, textAlign: 'center', padding: '0 4px' }}>{name}</span>
    </div>
  )
}

export function AgentRow({ agent, active }: { agent: Agent; active?: boolean }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '30px 1fr auto', gap: 7, minHeight: 42, padding: '4px 5px',
      borderRadius: 9, background: active ? 'rgba(255,255,255,0.5)' : 'transparent', alignItems: 'center', cursor: 'pointer' }}>
      <AvatarBlob name={agent.name} color={agent.color} bg={agent.bg} size={28} />
      <div style={{ minWidth: 0 }}>
        <div style={{ fontSize: 11, fontWeight: 600, lineHeight: 1.2 }}>{agent.name} <span style={{ fontWeight: 400, color: 'rgba(17,17,15,0.46)' }}>{agent.role}</span></div>
        <div style={{ fontSize: 8, color: 'rgba(0,0,0,0.34)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.bio}</div>
      </div>
      <span style={{ fontSize: 8, color: '#2ecb70' }}>{agent.status ?? ''}</span>
    </div>
  )
}

export function Sidebar({ agents, projects, activeAgentKey, activeProject }: {
  agents: Agent[]; projects: { name: string; icon: string; tint: string }[]; activeAgentKey?: string; activeProject?: string
}) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'rgba(226,228,226,0.56)',
      boxShadow: 'inset -1px 0 rgba(255,255,255,0.42)', overflow: 'hidden' }}>
      <div style={{ padding: '12px 10px 4px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(17,17,15,0.46)', marginBottom: 6 }}>Projects</div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
          {projects.map((p) => (<ProjectTile key={p.name} {...p} active={p.name === activeProject} />))}
        </div>
      </div>
      <div style={{ padding: '8px 10px 4px' }}>
        <div style={{ fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.06em', color: 'rgba(17,17,15,0.46)', marginBottom: 4 }}>Agents</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {agents.map((a) => (<AgentRow key={a.key} agent={a} active={a.key === activeAgentKey} />))}
        </div>
      </div>
      <div style={{ marginTop: 'auto', padding: 10, display: 'flex', gap: 8 }}>
        <button aria-label="Home" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.74)', background: 'rgba(255,255,255,0.64)', color: '#000000a6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.045)' }}><IconHouse size={17} /></button>
        <button aria-label="Account" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.74)', background: 'rgba(255,255,255,0.64)', color: '#000000a6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.045)' }}><IconPerson size={17} /></button>
        <button aria-label="Settings" style={{ width: 36, height: 36, borderRadius: '50%', border: '1px solid rgba(255,255,255,0.74)', background: 'rgba(255,255,255,0.64)', color: '#000000a6', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', boxShadow: '0 4px 14px rgba(0,0,0,0.045)' }}><IconGear size={17} /></button>
      </div>
    </div>
  )
}
