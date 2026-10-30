import type { Agent, TaskCardData } from '../data/demo.ts'
import { tokens } from '../tokens/tokens.ts'
import { AvatarBlob } from './AvatarBlob.tsx'

/**
 * Task-step morph (audit M01). The done check is the Lucide check geometry
 * (M20 6 9 17l-5-5) drawn as its own SVG so the stroke can be animated:
 * dash draw 260ms (message-in duration) instead of a hard pop-in.
 * todo -> active is a background/border-color transition (.ab-task-dot).
 */
function CheckDraw() {
  return (
    <svg width={9} height={9} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" className="ab-check-draw" aria-hidden>
      <path d="M20 6 9 17l-5-5" pathLength={100} />
    </svg>
  )
}

export function TaskCard({ task }: { task: TaskCardData }) {
  return (
    <div style={{ background: '#fffaf2', border: '1px solid rgba(17,17,15,0.045)', borderRadius: 12, padding: 12, fontSize: 10, lineHeight: 'normal', marginTop: 9 }}>
      <span style={{ display: 'block', color: '#53412e', fontSize: 11, fontWeight: 600 }}>{task.title}</span>
      <span style={{ display: 'block', marginTop: 3, color: '#88755e' }}>{task.status}</span>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, margin: '12px 0' }}>
        {task.steps.map((s) => (
          <div key={s.label} style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
            <span className={`ab-task-dot${s.state === 'active' ? ' ab-task-active-dot' : ''}`}
              style={{ width: 12, height: 12, borderRadius: '50%', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: s.state === 'done' ? '1px solid #72a682' : `1px solid ${s.state === 'active' ? '#c49b65' : '#d8cfc1'}`,
                background: s.state === 'done' ? '#72a682' : s.state === 'active' ? '#c49b65' : 'transparent', color: '#fff' }}>
              {s.state === 'done' ? <CheckDraw /> : null}
            </span>
            <span style={{ color: s.state === 'done' ? '#467458' : s.state === 'active' ? '#53412e' : '#88755e' }}>{s.label}</span>
          </div>
        ))}
      </div>
      <div style={{ height: 4, borderRadius: 3, background: '#e9e0d4', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${task.progress}%`, background: '#72a682', transition: 'width 450ms' }} />
      </div>
    </div>
  )
}

export function AgentMessage({ agent, text, task, index = 0 }: { agent: Agent; text: string; task?: TaskCardData; index?: number }) {
  return (
    <div className="ab-message-in" style={{ display: 'flex', gap: 8, alignItems: 'flex-end', animationDelay: `${index * 40}ms` }}>
      <AvatarBlob name={agent.name} color={agent.color} size={28} />
      <div style={{ minWidth: 0, flex: 1, maxWidth: 'min(84%, 330px)' }}>
        <div style={{ fontSize: 10, fontWeight: 600, lineHeight: 'normal', margin: '0 2px 5px' }}>{agent.name} <span style={{ fontWeight: 400, color: tokens.muted }}>{agent.role}</span></div>
        <div className="ab-agent-bubble" style={{ display: 'inline-block' }}>{text}</div>
        {task ? <TaskCard task={task} /> : null}
      </div>
    </div>
  )
}

export function UserMessage({ text, index = 0 }: { text: string; index?: number }) {
  return (
    <div className="ab-message-in" style={{ display: 'flex', justifyContent: 'flex-end', animationDelay: `${index * 40}ms` }}>
      <div className="ab-user-bubble">{text}</div>
    </div>
  )
}

export function TypingRow({ agent }: { agent: Agent }) {
  return (
    <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
      <AvatarBlob name={agent.name} color={agent.color} size={28} />
      <div style={{ background: '#fff', borderRadius: 13, padding: '9px 11px', display: 'flex', gap: 3 }}>
        {[0, 160, 320].map((d) => (<span key={d} className="ab-typing-dot" style={{ animationDelay: `${d}ms` }} />))}
      </div>
    </div>
  )
}
