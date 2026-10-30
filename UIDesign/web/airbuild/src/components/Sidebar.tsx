import { useState } from 'react'
import type { Agent } from '../data/demo.ts'
import { tokens } from '../tokens/tokens.ts'
import { AvatarBlob } from './AvatarBlob.tsx'
import { IconBookOpen, IconGear, IconHouse, IconPerson, projectIconMap, type ProjectIconKey } from './icons.tsx'

export function ProjectTile({ name, icon, tint, active }: { name: string; icon: ProjectIconKey; tint: string; active?: boolean }) {
  const Mini = projectIconMap[icon]
  const [hovered, setHovered] = useState(false)
  return (
    <button type="button" aria-label={`Open ${name}`} title={name}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ aspectRatio: 1.25, borderRadius: 12,
        background: active ? 'rgba(255,255,255,0.72)' : hovered ? 'rgba(255,255,255,0.5)' : 'rgba(255,255,255,0.34)',
        border: active ? '1px solid rgba(17,17,15,0.045)' : '1px solid transparent',
        boxShadow: active ? '0 5px 14px rgba(0,0,0,0.06)' : 'none',
        transform: hovered && !active ? 'translateY(-1px)' : 'none',
        transition: 'background 140ms ease, border-color 140ms ease, transform 140ms ease',
        display: 'grid', placeItems: 'center', padding: 0, cursor: 'pointer', minWidth: 0 }}>
      <span style={{ width: 32, height: 32, borderRadius: '32%', background: tint, display: 'grid', placeItems: 'center',
        color: 'rgba(17,17,15,0.75)', filter: 'drop-shadow(0 2px 3px rgba(0,0,0,0.2))' }}>
        <Mini size={19} />
      </span>
    </button>
  )
}

export function AgentRow({ agent, active }: { agent: Agent; active?: boolean }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button type="button" aria-label={`Message ${agent.name}`}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ width: '100%', display: 'grid', gridTemplateColumns: '30px minmax(0,1fr) auto', gap: 7, minHeight: 42, padding: '4px 5px',
        borderRadius: 9, background: active || hovered ? 'rgba(255,255,255,0.5)' : 'transparent', border: 'none', alignItems: 'center',
        cursor: 'pointer', textAlign: 'left', color: tokens.ink }}>
      <AvatarBlob name={agent.name} color={agent.color} size={28} ring />
      <span style={{ minWidth: 0, display: 'grid', gap: 2 }}>
        <strong style={{ minWidth: 0, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', fontSize: 11, fontWeight: 600, lineHeight: 'normal' }}>
          {agent.name} <em style={{ color: tokens.muted, fontStyle: 'normal', fontWeight: 400 }}>{agent.role}</em>
        </strong>
        <small style={{ overflow: 'hidden', color: tokens.muted, fontSize: 8, lineHeight: 'normal', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{agent.status}</small>
      </span>
      <span style={{ fontSize: 8, color: '#2ecb70', lineHeight: 1 }}>{agent.online ? '●' : ''}</span>
    </button>
  )
}

function FootBtn({ label, title, children }: { label: string; title: string; children: React.ReactNode }) {
  const [hovered, setHovered] = useState(false)
  return (
    <button type="button" aria-label={label} title={title}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      style={{ width: 32, height: 32, borderRadius: '50%', boxSizing: 'border-box',
        border: 'none',
        background: tokens.footerBg, boxShadow: tokens.footerShadow, color: '#686868',
        backdropFilter: 'blur(4px) saturate(1.45)', WebkitBackdropFilter: 'blur(4px) saturate(1.45)',
        filter: hovered ? 'brightness(1.035)' : 'none',
        display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', flex: 'none' }}>
      {children}
    </button>
  )
}

export function Sidebar({ agents, projects, activeAgentKey, activeProject }: {
  agents: Agent[]; projects: { name: string; icon: ProjectIconKey; tint: string }[]; activeAgentKey?: string; activeProject?: string
}) {
  const [hoverAccount, setHoverAccount] = useState(false)
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'rgba(226,228,226,0.56)',
      borderRight: '1px solid rgba(17,17,15,0.045)', boxShadow: 'inset -1px 0 rgba(255,255,255,0.42)',
      overflow: 'hidden', padding: '8px 9px 9px', boxSizing: 'border-box' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }} aria-label="Projects">
        {projects.map((p) => (<ProjectTile key={p.name} {...p} active={p.name === activeProject} />))}
      </div>
      <div style={{ marginTop: 9, display: 'flex', flexDirection: 'column', gap: 3 }} aria-label="AI team">
        {agents.map((a) => (<AgentRow key={a.key} agent={a} active={a.key === activeAgentKey} />))}
      </div>
      <div style={{ marginTop: 'auto', padding: '10px 0 1px', display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 5, alignItems: 'center' }}>
        <button type="button" aria-label="Account" title="Account"
          onMouseEnter={() => setHoverAccount(true)} onMouseLeave={() => setHoverAccount(false)}
          style={{ width: 32, height: 32, display: 'flex', alignItems: 'center', justifyContent: 'center',
            padding: 3, overflow: 'hidden', borderRadius: 999, fontSize: 11, border: 'none',
            background: tokens.controlBg, boxShadow: tokens.controlShadow, color: '#686868', cursor: 'pointer',
            backdropFilter: 'blur(4px) saturate(1.45)', WebkitBackdropFilter: 'blur(4px) saturate(1.45)',
            filter: hoverAccount ? 'brightness(1.035)' : 'none' }}>
          <span style={{ display: 'flex', opacity: 0.72, flex: 'none' }}><IconPerson size={17} /></span>
        </button>
        <div style={{ display: 'flex', gap: 3 }}>
          <FootBtn label="Home" title="Home"><span style={{ display: 'flex', opacity: 0.72 }}><IconHouse size={17} /></span></FootBtn>
          <FootBtn label="Settings" title="Settings"><span style={{ display: 'flex', opacity: 0.72 }}><IconGear size={17} /></span></FootBtn>
          <FootBtn label="Activity" title="Activity"><span style={{ display: 'flex', opacity: 0.72 }}><IconBookOpen size={17} /></span></FootBtn>
        </div>
      </div>
    </div>
  )
}
