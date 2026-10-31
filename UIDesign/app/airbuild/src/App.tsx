import { useEffect, useRef, useState } from 'react'
import { cn } from './lib/utils.ts'
import { AirDailyCard, SalesReportCard } from './components/briefing-cards.tsx'
import { ChevronMorphIcon, HandSolidIcon, PlusCheckMorphIcon, TaskCheckMorphIcon } from './components/icons.tsx'
import { Avatar } from './components/avatar.tsx'
import { Composer } from './components/composer.tsx'
import { DetailPanel } from './components/detail-panel.tsx'
import { FileCard } from './components/file-card.tsx'
import { MemberActivityRow } from './components/member-activity-row.tsx'
import { Message, MessageList, Typing } from './components/message.tsx'
import { PhoneFrame } from './components/phone-frame.tsx'
import { ProjectCardGrid } from './components/project-card-grid.tsx'
import { TaskListCard } from './components/task-list-card.tsx'
import { ChatTopBar, HomeTopBar } from './components/top-bar.tsx'
import { WebsiteDraftCard } from './components/website-draft-card.tsx'
import { applyLiquidGlass } from './lib/liquid-glass.ts'

const PROJECTS = [
  { name: 'Hands Time', swatch: '#e8e8e6' },
  { name: 'Hourtown', swatch: '#dbe7d2' },
  { name: 'Sleepy Coffee', swatch: '#e6e0d2' },
  { name: 'Casehot', swatch: '#f0d9c8', note: 'Please check the banner...' },
]

const MEMBERS = [
  { name: 'Pluso', role: 'Developer', status: 'Action needed', actionNeeded: true, time: 'Now', avatarColor: '#50e2f1', badge: 'dot' as const },
  { name: 'Camo', role: 'Copywriter', status: 'The launch copy is ready to review.', avatarColor: '#ffb11b', badge: 'cup' as const },
  { name: 'Qesto', role: 'Support', status: "I've replied to the latest support requests.", avatarColor: '#ff5ec0' },
  { name: 'Ato', role: 'Product Manager', status: 'The new screens are ready to review.', time: '10:24', avatarColor: '#9bc24d' },
  { name: 'Ampo', role: 'APP Publisher', status: 'The release plan is ready to review.', avatarColor: '#1fb0df' },
  { name: 'Leto', role: 'Code Reviewer', status: 'The sync issue is fixed.', avatarColor: '#ff8b60' },
]

function HomeScreen({ onProjectTap }: { onProjectTap?: (name: string) => void }) {
  return (
    <PhoneFrame label="Home — iphone-01">
      <HomeTopBar />
      <div className="flex min-h-0 flex-1 flex-col gap-3 overflow-hidden px-4 pt-2">
        <ProjectCardGrid projects={PROJECTS} onSelect={onProjectTap} />
        <div className="flex justify-center gap-1.5" aria-hidden>
          <span className="h-1.5 w-1.5 rounded-full bg-black" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
          <span className="h-1.5 w-1.5 rounded-full bg-black/20" />
        </div>
        <div className="min-h-0 flex-1">
          {MEMBERS.map((m) => <MemberActivityRow key={m.name} {...m} />)}
        </div>
      </div>
    </PhoneFrame>
  )
}

function ChatScreen({ onBack }: { onBack?: () => void }) {
  return (
    <PhoneFrame label="Chat thread — iphone-03">
      <ChatTopBar project="Hourtown" swatch="#dbe7d2" onBack={onBack} />
      <MessageList>
        <Message author="Pluso" role="Developer" avatarColor="#50e2f1">
          I&rsquo;ve put together a direction for the first-session experience. The town stays at the center, with just enough guidance to help someone get started.
        </Message>
        <div className="flex items-center justify-end">
          <div className="w-[74%]"><FileCard filename="First Focus Experience.md" meta="Markdown · 2.4kb" /></div>
          <Avatar name="Sender" color="#865eff" size={36} className="-ml-2 shrink-0" />
        </div>
        <Message author="Ampo" role="Product manager" avatarColor="#1fb0df">
          I&rsquo;ll keep the same visual language across both sizes. On iPad, the wider canvas gives the town more space while keeping the session controls easy to reach.
        </Message>
        <div className="flex items-end gap-2 pr-8">
          <Avatar name="Ato" color="#8fd14f" size={32} className="shrink-0" />
          <div className="min-w-0 flex-1"><TaskListCard
            title="Make the first session rewarding"
            items={[
              { label: 'Define the first-session flow' },
              { label: 'Build the completion reveal' },
              { label: 'Check the layout on iPhone and iPad' },
            ]}
          /></div>
        </div>
        <Message kind="user">
          Yes. Keep the soft green palette. And please make sure the town has room to breathe on iPad rather than just stretching the phone layout.
        </Message>
      </MessageList>
    </PhoneFrame>
  )
}

type DynMsg = { id: number; kind: 'user' | 'agent'; text: string }

function BriefingScreen({ onBack }: { onBack?: () => void }) {
  // v1.11 send flow (briefing only — iphone-03's chat thread has no
  // composer in the original, so no send flow is wired there): send appends
  // a user bubble with the REA message-in entrance, shows the typing
  // indicator (REA showTyping: 3 x 5px dots, 800ms, 0/160/320ms delays),
  // then appends the agent reply whole — REA presentMessage adds the whole
  // message at once, so no per-character streaming is faked. The reply is
  // demo copy, labelled as such in code. There is no stop button: no stop
  // glyph exists in any phone screenshot, and REA's stopConversation only
  // halts the web demo playback. While typing, the composer locks.
  // The cards row is a horizontal snap pager (the peeking second card is
  // the scroll affordance); at rest scrollLeft is 0, pixels unchanged.
  const [dyn, setDyn] = useState<DynMsg[]>([])
  const [typing, setTyping] = useState(false)
  const [locked, setLocked] = useState(false)
  const listRef = useRef<HTMLDivElement>(null)
  const idRef = useRef(1)
  const timers = useRef<number[]>([])
  useEffect(() => () => { timers.current.forEach((t) => window.clearTimeout(t)) }, [])
  const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const scrollBottom = () => {
    const el = listRef.current
    if (el) el.scrollTo({ top: el.scrollHeight, behavior: reduced() ? 'auto' : 'smooth' })
  }
  const handleSend = (text: string) => {
    if (locked) return
    const t = text.trim()
    if (!t) return
    setDyn((d) => [...d, { id: idRef.current++, kind: 'user', text: t }])
    setLocked(true)
    setTyping(true)
    requestAnimationFrame(scrollBottom)
    timers.current.push(window.setTimeout(() => {
      setTyping(false)
      // Demo reply copy (not original text): the original second message is
      // already rendered above as the initial bare2 message.
      setDyn((d) => [...d, { id: idRef.current++, kind: 'agent', text: 'Hands Time is still leading — I’ll pull the latest numbers and flag anything that needs a closer look.' }])
      requestAnimationFrame(scrollBottom)
      setLocked(false)
    }, reduced() ? 0 : 1200))
  }
  return (
    <PhoneFrame label="Daily briefing — iphone-06">
      <ChatTopBar project="Ato" swatch="#cfe8a8" mark="person" avatarColor="#9bc24d" compact onBack={onBack} />
      <MessageList innerRef={listRef} className="gap-1.5 py-2">
        <Message bare author="Ato" role="Product Manager" avatarColor="#9bc24d">
          Your daily report is ready. Hands Time led growth, while two new Mood reviews raised questions.
        </Message>
        <div className="ab-pager flex gap-3 overflow-x-auto -mr-4 pr-4" role="region" aria-label="Report cards — swipe to switch">
          <div className="w-[67%] shrink-0">
            <AirDailyCard
              headline="Hands Time led the growth. Mood deserves a closer look."
              body="On Sep 13, your three apps recorded 360 downloads and $58 in estimated proceeds. Hands Time contributed most of the increase."
              date="Sep 14, 2026"
              glance="Downloads and estimated proceeds for Sep 13, compared with the last seven days of downloads."
            />
          </div>
          <div className="w-[67%] shrink-0">
            <SalesReportCard
              title={<>Hands Time <HandSolidIcon className="inline h-3.5 w-3.5 align-baseline" /><br />Sales Report</>}
              body="Downloads are growing steadily over the past few months, showing a consistent upward trend that reflects stronger user engagement."
              stats={[
                { value: '1204', label: 'Downloads', delta: '+18%' },
                { value: '$386', label: 'Est. Proceeds', delta: '+10%' },
                { value: '4.8', label: 'US App Store' },
              ]}
              series={[0.18, 0.5, 0.75, 0.3, 0.5]}
            />
          </div>
        </div>
        <Message bare author="Ato" role="Product Manager" avatarColor="#9bc24d">
          Check Mood&rsquo;s first-entry flow. Both reviews mention difficulty starting. Try the latest version before deciding changes.
        </Message>
        {dyn.map((m) => m.kind === 'user' ? (
          <Message key={m.id} kind="user" animate>{m.text}</Message>
        ) : (
          <Message key={m.id} bare author="Ato" role="Product Manager" avatarColor="#9bc24d" animate>{m.text}</Message>
        ))}
        {typing ? <Typing author="Ato" avatarColor="#9bc24d" /> : null}
      </MessageList>
      <div className="px-4 pb-2">
        <Composer initialValue="Any updates on Hands Time?" onSend={handleSend} disabled={locked} />
      </div>
    </PhoneFrame>
  )
}

function DraftScreen({ onBack }: { onBack?: () => void }) {
  return (
    <PhoneFrame label="Website draft — iphone-04">
      <ChatTopBar project="Colo" swatch="#c9b8f5" mark="person" avatarColor="#8a5fe0" onBack={onBack} />
      <MessageList className="gap-3 py-2">
        <Message kind="user" wide>Design a website for Hands Time. Keep it simple and let the app speak for itself.</Message>
        <Message bare author="Colo" role="Designer" avatarColor="#8a5fe0">I kept the layout simple. Here&rsquo;s the first draft.</Message>
        <WebsiteDraftCard
          url="handstime.app"
          headline={<>Shape time<br />with your hands</>}
          subline="A minimal time widget for iPhone"
          footnoteTitle="Time Flies, Memories Stay."
          footnoteBody="Personalise backgrounds with your favourite images and colours."
        />
        <Message kind="user" wide>Keep it simple and focus on the app.</Message>
      </MessageList>
    </PhoneFrame>
  )
}

function DetailScreen() {
  // v1.11: after the sheet dismisses, a demo-only reopen control appears
  // (labelled as such). It is not original UI and never shows at rest.
  const [show, setShow] = useState(true)
  return (
    <PhoneFrame label="Detail panel — iphone-05">
      <div className="flex min-h-0 flex-1 flex-col justify-end">
        {show ? (
        <DetailPanel
          onDismiss={() => setShow(false)}
          title="Hands Time"
          status="Ready to test"
          updated="Updated 12h ago"
          iconLabel="Hands Time app icon"
          stores={['App Store', 'TestFlight']}
          versions={[
            { label: 'Version', value: '3.1.5', action: 'Prepare for Submission' },
            { label: 'Internal Test', value: '3.1.5 (373)', sub: '1 week ago' },
            { label: 'External Test', value: '-', sub: 'No build yet' },
          ]}
          progress={[
            { title: 'First Build', sub: 'com.time.JustTime', done: true },
            { title: 'Create app', done: true },
            { title: 'Upload to TestFlight', sub: 'Build 3.1.5 (373)', done: true },
            { title: 'Prepare Version', sub: 'Build 3.1.5 (373) is ready to test', done: false },
          ]}
        />
        ) : (
          <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4">
            <button type="button" onClick={() => setShow(true)} className="text-[15px] font-medium text-[#0088fe]">Show detail panel</button>
            <p className="text-[10px] text-black/35">Demo control — not part of the original panel</p>
          </div>
        )}
      </div>
    </PhoneFrame>
  )
}

function ComponentsScreen() {
  const [morphOn, setMorphOn] = useState(false)
  return (
    <PhoneFrame label="Component inventory">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-4 py-3">
        <Typing author="Pluso" avatarColor="#50e2f1" />
        <FileCard filename="First Focus Experience.md" meta="Markdown · 2.4kb" />
        <TaskListCard title="Make the first session rewarding" items={[{ label: 'Define the first-session flow' }, { label: 'Build the completion reveal', active: true }, { label: 'Check the layout on iPhone and iPad' }]} />
        {/* Morphing demo (M1/M2/M5): one toggle animates all three pairs; no icon ever hard-cuts. */}
        <div className="rounded-[20px] border border-black/[0.06] bg-white p-4">
          <div className="flex items-center justify-between">
            <p className="text-[13px] font-bold text-[#11110f]">State transitions (morphing)</p>
            <button type="button" onClick={() => setMorphOn((v) => !v)} className="rounded-full bg-[#11110f] px-3 py-1 text-[12px] font-medium text-white">
              {morphOn ? 'On' : 'Off'}
            </button>
          </div>
          <div className="mt-3 flex items-center justify-around text-[#11110f]">
            <span className="flex flex-col items-center gap-1 text-[10px] text-black/45"><ChevronMorphIcon open={!morphOn} className="h-6 w-6" />chevron</span>
            <span className="flex flex-col items-center gap-1 text-[10px] text-black/45"><PlusCheckMorphIcon checked={morphOn} className="h-6 w-6" />plus / check</span>
            <span className="flex flex-col items-center gap-1 text-[10px] text-black/45"><TaskCheckMorphIcon checked={morphOn} className="h-6 w-6" />task</span>
          </div>
        </div>
        <Composer placeholder="Message" />
      </div>
    </PhoneFrame>
  )
}

const SCREEN_KEYS = ['home', 'chat', 'briefing', 'draft', 'detail', 'components']

function ScreenByKey({ screen, onProjectTap, onBack }: { screen: string; onProjectTap: (name: string) => void; onBack: () => void }) {
  switch (screen) {
    case 'home': return <HomeScreen onProjectTap={onProjectTap} />
    case 'chat': return <ChatScreen onBack={onBack} />
    case 'briefing': return <BriefingScreen onBack={onBack} />
    case 'draft': return <DraftScreen onBack={onBack} />
    case 'detail': return <DetailScreen />
    case 'components': return <ComponentsScreen />
    default: return <HomeScreen onProjectTap={onProjectTap} />
  }
}

/**
 * v1.11 single-screen navigation shell (only active with ?screen=; the
 * gallery below stays static). A stack of one phone: tapping a home project
 * tile pushes its chat thread, the chat/briefing/draft back chevron pops.
 * Push: incoming slides from the right (100% -> 0), outgoing shifts left
 * (-30%) and dims to 0.94; pop reverses. Both 400ms of the iOS curve
 * cubic-bezier(0.32,0.72,0,1). Screens remount on navigation (gallery demo:
 * no cross-screen state is persisted — a briefing send flow resets when
 * you leave and come back). At rest there is no transform, so single-screen
 * screenshots are unchanged. Reduced motion commits instantly.
 * Member rows are NOT wired: a member DM thread is not in the screenshot
 * set (the chat screen is a project thread), so wiring one would invent a
 * screen. The + button (new project) and … menu are likewise press-only:
 * their destination screens are not evidenced.
 */
function SingleNav({ initial }: { initial: string }) {
  const [stack, setStack] = useState<string[]>([initial])
  const [trans, setTrans] = useState<{ prev: string; next: string; dir: 'push' | 'pop'; nextStack: string[] } | null>(null)
  const timers = useRef<number[]>([])
  useEffect(() => () => { timers.current.forEach((t) => window.clearTimeout(t)) }, [])
  const reduced = () => typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const go = (next: string, dir: 'push' | 'pop', nextStack: string[]) => {
    if (trans) return
    const cur = stack[stack.length - 1]
    if (next === cur) return
    if (reduced()) { setStack(nextStack); return }
    setTrans({ prev: cur, next, dir, nextStack })
    timers.current.push(window.setTimeout(() => { setStack(nextStack); setTrans(null) }, 400))
  }
  const push = (name: string) => { void name; go('chat', 'push', [...stack, 'chat']) }
  const back = () => {
    const cur = stack[stack.length - 1]
    if (cur === 'home') return
    if (stack.length > 1) go(stack[stack.length - 2], 'pop', stack.slice(0, -1))
    else go('home', 'pop', ['home'])
  }
  const current = stack[stack.length - 1]
  return (
    <main className="flex min-h-screen items-start justify-center bg-[#e9e9e6]">
      <div className="relative" style={{ width: 390 }}>
        {trans ? (
          <>
            <div className={cn('absolute inset-x-0 top-0 z-10', trans.dir === 'push' ? 'ab-nav-push-out' : 'ab-nav-pop-out')}>
              <ScreenByKey screen={trans.prev} onProjectTap={push} onBack={back} />
            </div>
            <div className={cn('relative z-20', trans.dir === 'push' ? 'ab-nav-push-in' : 'ab-nav-pop-in')}>
              <ScreenByKey screen={trans.next} onProjectTap={push} onBack={back} />
            </div>
          </>
        ) : (
          <ScreenByKey screen={current} onProjectTap={push} onBack={back} />
        )}
      </div>
    </main>
  )
}

export default function App() {
  // Liquid Glass refraction (v1.10): upgrade .ab-glass backdrop-filters in
  // place after mount; the CSS class remains the no-JS fallback.
  useEffect(() => applyLiquidGlass(), [])
  const screen = new URLSearchParams(window.location.search).get('screen')
  if (screen && SCREEN_KEYS.includes(screen)) {
    return <SingleNav initial={screen} />
  }
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-[#11110f]">AirBuild — mobile component gallery</h1>
        <p className="mt-2 max-w-2xl text-sm leading-relaxed text-black/55">
          AirBuild-style mobile components in a 390×844 phone frame: home, chat thread, daily briefing,
          website draft and app detail panel. All copy on this page is demo content only; components
          themselves take their text through props. See README for sources and residuals.
        </p>
        <p className="mt-2 text-xs text-black/45">
          Components: phone-frame · top-bar (chat + home) · message (agent / user / typing) · file-card ·
          task-list-card · website-draft-card · detail-panel · briefing-cards · composer ·
          member-activity-row · project-card-grid · avatar · ui (button / card / pill).
        </p>
      </header>
      <div className="flex flex-wrap items-start justify-center gap-10">
        <HomeScreen />
        <ChatScreen />
        <BriefingScreen />
        <DraftScreen />
        <DetailScreen />
        <ComponentsScreen />
      </div>
    </main>
  )
}
