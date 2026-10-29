import { useEffect, useRef, useState, type ReactNode } from 'react'
import { agents, projects, thread } from '../data/demo.ts'
import { projectIconMap } from './icons.tsx'
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
  const [deviceTabs, setDeviceTabs] = useState<string[]>(['iOS 26.5'])
  const [activeDevice, setActiveDevice] = useState('iOS 26.5')
  const grid = sbCollapsed
    ? pvCollapsed ? '0px minmax(320px,1fr) 0px' : '0px minmax(320px,1fr) minmax(310px,42%)'
    : pvCollapsed ? '198px minmax(320px,1fr) 0px' : '198px minmax(320px,1fr) minmax(310px,42%)'
  const project = projects.find((p) => p.name === title) ?? projects[1]
  const ProjectIcon = projectIconMap[project.icon]
  const closeDevice = (t: string) => {
    if (deviceTabs.length <= 1) return
    const next = deviceTabs.filter((d) => d !== t)
    setDeviceTabs(next)
    if (activeDevice === t) setActiveDevice(next[0])
  }
  return (
    <div className="ab-window" style={{ position: 'relative' }}>
      <Titlebar grid={grid} projectName={project.name} projectTint={project.tint}
        projectIcon={<ProjectIcon size={19} />}
        deviceTabs={deviceTabs} activeDevice={activeDevice} onSelectDevice={setActiveDevice}
        onCloseDevice={closeDevice}
        onNewDevice={() => { if (!deviceTabs.includes('iPadOS 26.5')) { setDeviceTabs([...deviceTabs, 'iPadOS 26.5']); setActiveDevice('iPadOS 26.5') } }}
        sidebarCollapsed={sbCollapsed} previewCollapsed={pvCollapsed}
        onToggleSidebar={() => setSbCollapsed(!sbCollapsed)} onTogglePreview={() => setPvCollapsed(!pvCollapsed)} />
      <div className="ab-drawer" style={{ display: 'grid', gridTemplateColumns: grid, height: 628, transition: 'grid-template-columns 240ms cubic-bezier(0.32,0.72,0,1)' }}>
        <div style={{ overflow: 'hidden' }}>
          <Sidebar agents={agents} projects={projects} activeAgentKey="ato" activeProject={project.name} />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', background: 'rgba(249,249,247,0.92)', minWidth: 320, overflow: 'hidden', borderRight: pvCollapsed ? 'none' : '1px solid rgba(17,17,15,0.22)' }}>
          <div className="ab-scroll" style={{ flex: 1, overflowY: 'auto', padding: '18px 16px 14px', display: 'flex', flexDirection: 'column', gap: 14 }}>
            {thread.map((m, i) => m.kind === 'agent'
              ? <AgentMessage key={i} agent={agents.find((a) => a.key === m.agentKey) ?? agents[0]} text={m.text} task={m.task} index={i} />
              : m.kind === 'user' ? <UserMessage key={i} text={m.text} index={i} /> : <TypingRow key={i} agent={agents.find((a) => a.key === m.agentKey) ?? agents[0]} />)}
            {showTyping ? <TypingRow agent={agents[1]} /> : null}
          </div>
          <FollowUpComposer onSend={onSend} />
        </div>
        <div className="ab-preview-bg" style={{ overflow: 'hidden', minWidth: pvCollapsed ? 0 : 310 }}>
          {pvCollapsed ? null : showServiceColumn ? <ServiceModuleColumn /> : <PhonePreview projectName={project.name} />}
        </div>
      </div>
      {showToast ? <Toast text={showToast} /> : null}
    </div>
  )
}
