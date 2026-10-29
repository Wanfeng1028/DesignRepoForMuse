import type { Agent, TaskCardData } from '../data/demo.ts'
import { AvatarBlob } from './AvatarBlob.tsx'
import { IconCheck } from './icons.tsx'

export function TaskCard({ task }: { task: TaskCardData }) {
  return (
    <div style={{ background: '#fffaf2', border: '1px solid rgba(94,74,46,0.12)', borderRadius: 12, padding: 12, fontSize: 10, marginTop: 8 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: 8 }}>
        <span style={{ color: '#53412e', fontSize: 11, fontWeight: 600 }}>{task.title}</span>
        <span style={{ color: '#88755e' }}>{task.status}</span>
      </div>
      <div style={{ height: 4, borderRadius: 999, background: '#e9e0d4', margin: '8px 0', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${task.progress}%`, background: '#72a682', transition: 'width 450ms' }} />
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {task.steps.map((s) => (
          <div key={s.label} style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
            <span className={s.state === 'active' ? 'ab-task-active-dot' : undefined}
              style={{ width: 12, height: 12, borderRadius: '50%', flex: 'none', display: 'flex', alignItems: 'center', justifyContent: 'center',
                border: s.state === 'done' ? 'none' : `1px solid ${s.state === 'active' ? '#c49b65' : '#d8cfc1'}`,
                background: s.state === 'done' ? '#467458' : s.state === 'active' ? '#c49b65' : 'transparent', color: '#fff' }}>
              {s.state === 'done' ? <IconCheck size={9} /> : null}
            </span>
            <span style={{ color: s.state === 'todo' ? 'rgba(17,17,15,0.55)' : '#11110f' }}>{s.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function AgentMessage({ agent, text, task, index = 0 }: { agent: Agent; text: string; task?: TaskCardData; index?: number }) {
  return (
    <div className="ab-message-in" style={{ display: 'flex', gap: 8, animationDelay: `${index * 40}ms` }}>
      <AvatarBlob name={agent.name} color={agent.color} bg={agent.bg} size={28} />
      <div style={{ minWidth: 0, flex: 1 }}>
        <div style={{ fontSize: 10, fontWeight: 600, margin: '0 0 5px 2px' }}>{agent.name} <span style={{ fontWeight: 400, color: 'rgba(17,17,15,0.46)' }}>{agent.role}</span></div>
        <div className="ab-agent-bubble" style={{ display: 'inline-block', maxWidth: '92%' }}>{text}</div>
        {task ? <div style={{ maxWidth: '92%' }}><TaskCard task={task} /></div> : null}
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
      <AvatarBlob name={agent.name} color={agent.color} bg={agent.bg} size={28} />
      <div style={{ background: '#fff', border: '1px solid rgba(0,0,0,0.045)', borderRadius: 13, padding: '9px 11px', display: 'flex', gap: 4 }}>
        {[0, 160, 320].map((d) => (<span key={d} className="ab-typing-dot" style={{ animationDelay: `${d}ms` }} />))}
      </div>
    </div>
  )
}
