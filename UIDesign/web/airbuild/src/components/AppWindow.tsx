import { useEffect, useRef, useState, type ReactNode } from 'react'
import { agents, projects, thread } from '../data/demo.ts'
import { AgentMessage, TypingRow, UserMessage } from './Message.tsx'
import { FollowUpComposer } from './FollowUpComposer.tsx'
import { PhonePreview } from './Preview.tsx'
import { Sidebar } from './Sidebar.tsx'
import { Titlebar } from './Titlebar.tsx'
import { Toast } from './Toast.tsx'
import { ServiceModuleColumn } from './ServiceModuleColumn.tsx'

export type AppWindowProps = {
  title?: string
  sidebarCollapsed?: boolean
  previewCollapsed?: boolean
  showServiceColumn?: boolean
  showTyping?: boolean
  showToast?: string
  onSend?: (v: string) => void
  children?: ReactNode
}

/** Fixed 1200x668 canvas, scaled as a whole — never reflowed. */
export function ScaleCanvas({ children, maxWidth }: { children: ReactNode; maxWidth?: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [scale, setScale] = useState(1)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ro = new ResizeObserver(() => setScale(Math.min(1, el.clientWidth / 1200)))
    ro.observe(el)
    setScale(Math.min(1, el.clientWidth / 1200))
    return () => ro.disconnect()
  }, [])
  return (
    <div ref={ref} style={{ width: '100%', maxWidth: maxWidth ?? 1200, overflow: 'hidden', height: 668 * scale }}>
      <div style={{ transform: `scale(${scale})`, transformOrigin: 'top left' }}>{children}</div>
    </div>
  )
}

export function AppWindow({ title = 'Hourtown', sidebarCollapsed = false, previewCollapsed = false, showServiceColumn = false, showTyping = false, showToast, onSend }: AppWindowProps) {
  const [sbCollapsed, setSbCollapsed] = useState(sidebarCollapsed)
  const [pvCollapsed, setPvCollapsed] = useState(previewCollapsed)
  const grid = sbCollapsed
    ? pvCollapsed ? '0px minmax(320px,1fr) 48px' : '0px minmax(320px,1fr) minmax(310px,42%)'
    : pvCollapsed ? '198px minmax(320px,1fr) 48px' : '198px minmax(320px,1fr) minmax(310px,42%)'
  return (
    <div className="ab-window" style={{ position: 'relative' }}>
      <Titlebar title={title} onToggleSidebar={() => setSbCollapsed(!sbCollapsed)} onTogglePreview={() => setPvCollapsed(!pvCollapsed)} previewCollapsed={pvCollapsed} />
      <div className="ab-drawer" style={{ display: 'grid', gridTemplateColumns: grid, height: 620, transition: 'grid-template-columns 240ms cubic-bezier(0.32,0.72,0,1)' }}>
        <div style={{ overflow: 'hidden' }}>
          <Sidebar agents={agents} projects={projects} activeAgentKey="ato" activeProject="Hourtown" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(249,249,247,0.92)', minWidth: 320, overflow: 'hidden', paddingLeft: sbCollapsed ? 0 : 0 }}>
          <div className="ab-scroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 14px', paddingLeft: sbCollapsed ? 190 : 16, display: 'flex', flexDirection: 'column', gap: 14 }}>
            {thread.map((m, i) => m.kind === 'agent'
              ? <AgentMessage key={i} agent={agents.find((a) => a.key === m.agentKey) ?? agents[0]} text={m.text} task={m.task} index={i} />
              : m.kind === 'user' ? <UserMessage key={i} text={m.text} index={i} /> : <TypingRow key={i} agent={agents.find((a) => a.key === m.agentKey) ?? agents[0]} />)}
            {showTyping ? <TypingRow agent={agents[1]} /> : null}
          </div>
          <FollowUpComposer onSend={onSend} />
        </div>
        <div className="ab-preview-bg" style={{ overflow: 'hidden', borderLeft: '1px solid rgba(17,17,15,0.22)', minWidth: pvCollapsed ? 48 : 310 }}>
          {pvCollapsed
            ? <div style={{ writingMode: 'vertical-rl', padding: 14, fontSize: 11, fontWeight: 600, color: 'rgba(17,17,15,0.5)' }}>Preview</div>
            : showServiceColumn ? <ServiceModuleColumn /> : <PhonePreview />}
        </div>
      </div>
      {showToast ? <Toast text={showToast} /> : null}
    </div>
  )
}
