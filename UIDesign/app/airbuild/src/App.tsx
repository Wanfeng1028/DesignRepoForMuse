import { AirDailyCard, SalesReportCard } from './components/briefing-cards.tsx'
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

const PROJECTS = [
  { name: 'Hands Time', swatch: '#e8e8e6' },
  { name: 'Hourtown', swatch: '#dbe7d2' },
  { name: 'Sleepy Coffee', swatch: '#e6e0d2' },
  { name: 'Casehot', swatch: '#f0d9c8', note: 'Please check the banner...' },
]

const MEMBERS = [
  { name: 'Pluso', role: 'Developer', status: 'Action needed', actionNeeded: true, time: 'Now', avatarColor: '#45c8d8' },
  { name: 'Camo', role: 'Copywriter', status: 'The launch copy is ready to review.', avatarColor: '#f5c518' },
  { name: 'Qesto', role: 'Support', status: "I've replied to the latest support requests.", avatarColor: '#f27ba7' },
  { name: 'Ato', role: 'Product Manager', status: 'The new screens are ready to review.', time: '10:24', avatarColor: '#8fd14f' },
  { name: 'Ampo', role: 'APP Publisher', status: 'The release plan is ready to review.', avatarColor: '#9b7bf3' },
  { name: 'Leto', role: 'Code Reviewer', status: 'The sync issue is fixed.', avatarColor: '#f59e0b' },
]

function HomeScreen() {
  return (
    <PhoneFrame label="Home — iphone-01">
      <HomeTopBar />
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-4 pt-3">
        <ProjectCardGrid projects={PROJECTS} />
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

function ChatScreen() {
  return (
    <PhoneFrame label="Chat thread — iphone-03">
      <ChatTopBar project="Hourtown" swatch="#dbe7d2" />
      <MessageList>
        <Message author="Pluso" role="Developer" avatarColor="#45c8d8">
          I&rsquo;ve put together a direction for the first-session experience. The town stays at the center, with just enough guidance to help someone get started.
        </Message>
        <div className="relative flex justify-end">
          <div className="w-[68%]"><FileCard filename="First Focus Experience.md" meta="Markdown · 2.4kb" /></div>
          <Avatar name="Ampo" color="#9b7bf3" size={36} className="absolute right-0 top-1/2 shrink-0 -translate-y-1/2" />
        </div>
        <Message author="Ampo" role="Product manager" avatarColor="#9b7bf3">
          I&rsquo;ll keep the same visual language across both sizes. On iPad, the wider canvas gives the town more space while keeping the session controls easy to reach.
        </Message>
        <div className="pr-10"><TaskListCard
          title="Make the first session rewarding"
          items={[
            { label: 'Define the first-session flow' },
            { label: 'Build the completion reveal' },
            { label: 'Check the layout on iPhone and iPad' },
          ]}
          onAction={() => undefined}
        /></div>
        <Message kind="user">
          Yes. Keep the soft green palette. And please make sure the town has room to breathe on iPad rather than just stretching the phone layout.
        </Message>
      </MessageList>
    </PhoneFrame>
  )
}

function BriefingScreen() {
  return (
    <PhoneFrame label="Daily briefing — iphone-06">
      <ChatTopBar project="Ato" swatch="#cfe8a8" />
      <MessageList>
        <Message author="Ato" role="Product Manager" avatarColor="#8fd14f">
          Your daily report is ready. Hands Time led growth, while two new Mood reviews raised questions.
        </Message>
        <div className="flex gap-3 overflow-hidden -mr-4 pr-4">
          <div className="w-[62%] shrink-0">
            <AirDailyCard
              headline="Hands Time led the growth. Mood deserves a closer look."
              body="On Sep 13, your three apps recorded 360 downloads and $58 in estimated proceeds. Hands Time contributed most of the increase."
              date="Sep 14, 2026 · The Air Daily"
              glance="Downloads and estimated proceeds for Sep 13, compared with the last seven days of downloads."
            />
          </div>
          <div className="w-[62%] shrink-0">
            <SalesReportCard
              title="Hands Time — Sales Report"
              body="Downloads are growing steadily over the past few months, showing a consistent upward trend that reflects stronger user engagement."
              stats={[
                { value: '1204', label: 'Downloads', delta: '+18%' },
                { value: '$386', label: 'Est. Proceeds', delta: '+22%' },
              ]}
              series={[0.15, 0.3, 0.25, 0.45, 0.55, 0.5, 0.7, 0.85]}
            />
          </div>
        </div>
        <Message author="Ato" role="Product Manager" avatarColor="#8fd14f">
          Check Mood&rsquo;s first-entry flow. Both reviews mention difficulty starting. Try the latest version before deciding changes.
        </Message>
      </MessageList>
      <div className="px-4 pb-5">
        <Composer initialValue="Any updates on Hands Time?" />
      </div>
    </PhoneFrame>
  )
}

function DraftScreen() {
  return (
    <PhoneFrame label="Website draft — iphone-04">
      <ChatTopBar project="Colo" swatch="#c9b8f5" />
      <MessageList>
        <Message kind="user">Design a website for Hands Time. Keep it simple and let the app speak for itself.</Message>
        <Message author="Colo" role="Designer" avatarColor="#a78bfa">I kept the layout simple. Here&rsquo;s the first draft.</Message>
        <WebsiteDraftCard
          url="handstime.app"
          headline="Shape time with your hands"
          subline="A minimal time widget for iPhone"
          footnoteTitle="Time Flies, Memories Stay."
          footnoteBody="Personalise backgrounds with your favourite images and colours."
        />
        <Message kind="user">Keep it simple and focus on the app.</Message>
      </MessageList>
    </PhoneFrame>
  )
}

function DetailScreen() {
  return (
    <PhoneFrame label="Detail panel — iphone-05">
      <div className="flex min-h-0 flex-1 flex-col justify-end">
        <DetailPanel
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
          ]}
        />
      </div>
    </PhoneFrame>
  )
}

function ComponentsScreen() {
  return (
    <PhoneFrame label="Component inventory">
      <div className="flex min-h-0 flex-1 flex-col gap-4 overflow-hidden px-4 py-3">
        <Typing author="Pluso" avatarColor="#45c8d8" />
        <FileCard filename="First Focus Experience.md" meta="Markdown · 2.4kb" />
        <TaskListCard title="Make the first session rewarding" items={[{ label: 'Define the first-session flow' }, { label: 'Build the completion reveal', active: true }, { label: 'Check the layout on iPhone and iPad' }]} />
        <Composer placeholder="Message" />
      </div>
    </PhoneFrame>
  )
}

const SCREENS: Record<string, () => React.ReactElement> = {
  home: HomeScreen,
  chat: ChatScreen,
  briefing: BriefingScreen,
  draft: DraftScreen,
  detail: DetailScreen,
  components: ComponentsScreen,
}

export default function App() {
  const screen = new URLSearchParams(window.location.search).get('screen')
  if (screen && SCREENS[screen]) {
    const Single = SCREENS[screen]
    return (
      <main className="flex min-h-screen items-start justify-center bg-[#e9e9e6]">
        <Single />
      </main>
    )
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
