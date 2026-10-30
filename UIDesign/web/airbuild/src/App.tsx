import { useState } from 'react'
import { AppWindow, ScaleCanvas } from './components/AppWindow.tsx'
import { BottomModuleBar } from './components/BottomModuleBar.tsx'
import { AgentRow, ProjectTile } from './components/Sidebar.tsx'
import { AgentMessage, TypingRow, UserMessage } from './components/Message.tsx'
import { FollowUpComposer } from './components/FollowUpComposer.tsx'
import { PhonePreview } from './components/Preview.tsx'
import { ServiceModuleColumn } from './components/ServiceModuleColumn.tsx'
import { StatusPill } from './components/ui/badge.tsx'
import { Button } from './components/ui/button.tsx'
import { Input } from './components/ui/input.tsx'
import { Separator } from './components/ui/separator.tsx'
import { agents, projects, thread } from './data/demo.ts'

function Section({ id, title, note, children }: { id: string; title: string; note?: string; children: React.ReactNode }) {
  return (
    <section id={id} style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, margin: '0 0 4px' }}>{title}</h2>
      {note ? <p style={{ fontSize: 12, color: 'rgba(17,17,15,0.55)', margin: '0 0 16px', maxWidth: 860 }}>{note}</p> : null}
      {children}
    </section>
  )
}

export default function App() {
  const [toast, setToast] = useState('Message sent')
  const [sent, setSent] = useState<string[]>([])
  return (
    <div style={{ maxWidth: 1240, margin: '0 auto', padding: '32px 20px 80px' }}>
      <header style={{ marginBottom: 32 }}>
        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#1987f7' }}>UIDesign / web / airbuild</p>
        <h1 style={{ fontSize: 34, fontWeight: 800, margin: '6px 0' }}>AirBuild — desktop / web design system</h1>
        <p style={{ fontSize: 13, color: 'rgba(17,17,15,0.6)', maxWidth: 860, lineHeight: 1.6 }}>
          Fixed 1200×668 canvas, scaled as a whole (never reflowed). Tokens from AIRBUILD-REA-20261029.md table A.
          Gallery copy is demo content only — see README “Residuals”. Official bitmap assets are not used;
          icons are redrawn SVG and avatars are self-drawn blob approximations.
        </p>
        <nav style={{ display: 'flex', gap: 16, fontSize: 12, flexWrap: 'wrap' }}>
          {['window', 'collapsed', 'messages', 'preview', 'services', 'primitives', 'tokens'].map((s) => (
            <a key={s} href={`#${s}`} style={{ color: '#1987f7' }}>{s}</a>
          ))}
        </nav>
      </header>

      <Section id="window" title="1 · App window — three columns" note="Sidebar 198px / conversation min 320px 1fr / preview min 310px 42%. Window background rgba(244,246,244,0.42) + blur(34px) saturate(1.24), radius 18px. Titlebar is 40px in the same three zones: sidebar zone (traffic lights 17px + control capsule), conversation zone (centred 32px project icon), preview zone (device tabs + action capsule). Toggle the titlebar sidebar/preview icons to see both collapsed states live.">
        <div data-window="main"><ScaleCanvas><AppWindow showToast={toast} onSend={(v) => { setSent([...sent, v]); setToast('Message sent') }} /></ScaleCanvas></div>
        {sent.length ? <p style={{ fontSize: 12, marginTop: 10 }}>Sent via composer (demo state): {sent.join(' · ')}</p> : null}
        <div style={{ marginTop: 12 }}><Button onClick={() => setToast(toast ? '' : 'Message sent')}>{toast ? 'Hide toast' : 'Show toast'}</Button></div>
      </Section>

      <Section id="collapsed" title="2 · Collapsed states" note="sidebar-collapsed: sidebar width 0. preview-collapsed: preview width 0, only a 48px titlebar-preview strip remains. Drawer motion 240ms cubic-bezier(0.32,0.72,0,1).">
        <div style={{ display: 'grid', gap: 24 }}>
          <div data-window="sidebar-collapsed"><ScaleCanvas><AppWindow sidebarCollapsed title="Hourtown — sidebar collapsed" /></ScaleCanvas></div>
          <div data-window="preview-collapsed"><ScaleCanvas><AppWindow previewCollapsed title="Hourtown — preview collapsed" /></ScaleCanvas></div>
        </div>
      </Section>

      <Section id="messages" title="3 · Messages" note="Agent bubble #fff / 13px radius / 12px·1.38; user bubble white on #1987f7, max-width min(78%, 310px); task card #fffaf2; typing = three 5px dots, 800ms stagger 0/160/320ms; message entry 260ms cubic-bezier(.22,1,.36,1).">
        <div style={{ background: 'rgba(249,249,247,0.92)', borderRadius: 18, padding: '18px 16px', display: 'flex', flexDirection: 'column', gap: 14, maxWidth: 720 }}>
          {thread.map((m, i) => m.kind === 'agent' ? <AgentMessage key={i} agent={agents.find((a) => a.key === m.agentKey) ?? agents[0]} text={m.text} task={m.task} index={i} /> : m.kind === 'user' ? <UserMessage key={i} text={m.text} index={i} /> : <TypingRow key={i} agent={agents.find((a) => a.key === m.agentKey) ?? agents[0]} />)}
          <TypingRow agent={agents[1]} />
          <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}><StatusPill>Ready to test</StatusPill><StatusPill tone="neutral">Updated 12h ago</StatusPill></div>
          <FollowUpComposer />
        </div>
      </Section>

      <Section id="preview" title="4 · Preview tabs + iPhone preview" note="Preview tabs live in the titlebar (36px high, 76–180px wide, 9px radius, 10px device label, #f7f7f5, active transparent) — see section 1. The phone below is the standalone stage: 270px wide, aspect 0.51, 7px #d8d8d6 frame, 38px radius, 0 24px 48px shadow (alpha 0.24); statusbar 8px/700, appbar 42px; feed rows 48px, avatar 26px, name 9px/600 #11110f + @role em 7px muted, divider inset from left 33px; appbar = 30px gear button + 16px mark + 30px menu button.">
        <div style={{ background: 'rgba(246,247,245,0.36)', borderRadius: 18, height: 560, maxWidth: 720, overflow: 'hidden' }}><PhonePreview /></div>
      </Section>

      <Section id="services" title="5 · Service module column (original) + bottom bar (adapted)" note="Original per the user photo: right-hand column — AirFeedback / AirPayment / AirRouter / AirKnowledge / AirTraffic, coloured mini-icon + round action button per row. The bottom bar below is explicitly labelled 改编（非原版） and is NOT the original.">
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 24, alignItems: 'start' }}>
          <div style={{ height: 420, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(17,17,15,0.08)' }}><ServiceModuleColumn /></div>
          <div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 16 }}>
              {projects.map((p) => (<ProjectTile key={p.name} {...p} active={p.name === 'Hourtown'} />))}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 2, background: 'rgba(226,228,226,0.56)', borderRadius: 12, padding: 10 }}>
              {agents.slice(0, 3).map((a) => (<AgentRow key={a.key} agent={a} active={a.key === 'ato'} />))}
            </div>
          </div>
        </div>
        <div style={{ marginTop: 20, borderRadius: 12, overflow: 'hidden', border: '1px solid rgba(17,17,15,0.08)' }}>
          <BottomModuleBar />
        </div>
      </Section>

      <Section id="primitives" title="6 · UI primitives (shadcn-style, Radix)" note="Button (Radix Slot), Input, StatusPill, Separator (Radix). Capsule radius 999px per the user's login-interface rule applied to controls here.">
        <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap', background: '#fff', borderRadius: 12, padding: 16 }}>
          <Button>Default</Button><Button variant="blue">Send</Button><Button variant="ghost">Ghost</Button>
          <div style={{ width: 220 }}><Input placeholder="Search…" /></div>
          <StatusPill>Ready to test</StatusPill>
        </div>
        <Separator style={{ margin: '16px 0' }} />
        <p style={{ fontSize: 12, color: 'rgba(17,17,15,0.55)' }}>Separator above is the Radix separator primitive.</p>
      </Section>

      <Section id="tokens" title="7 · Tokens" note="Table A values, rendered as swatches. Dark table B is stored only in src/tokens/dark-tokens.ts and is not rendered as a main style.">
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
          {[['ink', '#11110f'], ['blue', '#1987f7'], ['green', '#2ecb70'], ['sidebar', 'rgba(226,228,226,0.56)'], ['conversation', 'rgba(249,249,247,0.92)'], ['task', '#fffaf2'], ['success bg', '#e7f8ed']].map(([n, c]) => (
            <div key={n} style={{ display: 'flex', alignItems: 'center', gap: 8, background: '#fff', borderRadius: 999, padding: '6px 10px 6px 6px', fontSize: 11 }}>
              <span style={{ width: 22, height: 22, borderRadius: '50%', background: c, border: '1px solid rgba(0,0,0,0.08)' }} />{n} · {c}
            </div>
          ))}
        </div>
      </Section>
    </div>
  )
}
